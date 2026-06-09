from rest_framework import serializers
from .models import Receipt, Category


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name_en', 'name_th', 'icon', 'color']


class ReceiptSerializer(serializers.ModelSerializer):
    category_details = CategorySerializer(source='category', read_only=True)
    
    class Meta:
        model = Receipt
        fields = [
            'id', 'user', 'merchant', 'amount', 'date', 
            'category', 'category_details', 'note', 'method', 
            'original_language', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'user', 'created_at', 'updated_at']


class ReceiptCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Receipt
        fields = [
            'merchant', 'amount', 'date', 'category', 
            'note', 'method', 'original_language'
        ]
