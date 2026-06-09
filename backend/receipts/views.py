from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from django.db.models import Sum, Q
from django.utils import timezone
from .models import Receipt, Category
from .serializers import ReceiptSerializer, ReceiptCreateSerializer, CategorySerializer
from .services import GeminiService


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]


class ReceiptViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]
    
    def get_queryset(self):
        return Receipt.objects.filter(
            user=self.request.user,
            is_deleted=False
        ).select_related('category')
    
    def get_serializer_class(self):
        if self.action == 'create':
            return ReceiptCreateSerializer
        return ReceiptSerializer
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    def destroy(self, request, *args, **kwargs):
        receipt = self.get_object()
        receipt.is_deleted = True
        receipt.deleted_at = timezone.now()
        receipt.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    @action(detail=False, methods=['get'])
    def monthly_totals(self, request):
        from django.utils import timezone
        from datetime import datetime
        
        now = timezone.now()
        year = request.query_params.get('year', now.year)
        month = request.query_params.get('month', now.month)
        
        receipts = self.get_queryset().filter(
            date__year=year,
            date__month=month
        )
        
        totals = receipts.values('category__name_en').annotate(
            total=Sum('amount')
        ).order_by('-total')
        
        return Response(totals)
    
    @action(detail=False, methods=['get'])
    def recent(self, request):
        limit = int(request.query_params.get('limit', 10))
        receipts = self.get_queryset()[:limit]
        serializer = self.get_serializer(receipts, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['post'])
    def scan(self, request):
        """
        Scan receipt image using Gemini API
        """
        if 'image' not in request.FILES:
            return Response(
                {'error': 'No image file provided'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        image_file = request.FILES['image']
        
        # Read image data
        image_data = image_file.read()
        
        # Use Gemini service to scan
        gemini_service = GeminiService()
        result = gemini_service.scan_receipt(image_data)
        
        if result['success']:
            return Response(result['data'])
        else:
            return Response(
                {'error': result['error']},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
