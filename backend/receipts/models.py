from django.db import models
from django.conf import settings
import uuid


class Category(models.Model):
    name_en = models.CharField(max_length=50, unique=True)
    name_th = models.CharField(max_length=50, unique=True)
    icon = models.CharField(max_length=10)  # Emoji or icon code
    color = models.CharField(max_length=7)  # Hex color code
    
    def get_name(self, language):
        return self.name_en if language == 'en' else self.name_th
    
    def __str__(self):
        return f"{self.name_en} / {self.name_th}"
    
    class Meta:
        db_table = 'categories'


class Receipt(models.Model):
    METHOD_CHOICES = [
        ('camera', 'Camera'),
        ('manual', 'Manual'),
    ]
    
    LANGUAGE_CHOICES = [
        ('en', 'English'),
        ('th', 'Thai'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='receipts',
        db_index=True
    )
    merchant = models.CharField(max_length=255)  # Store name (as-is: Thai or English)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField(db_index=True)  # Transaction date
    category = models.ForeignKey(Category, on_delete=models.PROTECT)
    note = models.TextField(null=True, blank=True)  # Manual additional conditions
    method = models.CharField(max_length=10, choices=METHOD_CHOICES)
    original_language = models.CharField(max_length=2, choices=LANGUAGE_CHOICES)
    
    # Soft delete fields
    is_deleted = models.BooleanField(default=False, db_index=True)
    deleted_at = models.DateTimeField(null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'receipts'
        indexes = [
            models.Index(fields=['user', 'date']),
            models.Index(fields=['user', 'category']),
            models.Index(fields=['-created_at']),
            models.Index(fields=['is_deleted']),
        ]
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.merchant} - {self.amount}"
