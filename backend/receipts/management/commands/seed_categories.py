from django.core.management.base import BaseCommand
from receipts.models import Category


class Command(BaseCommand):
    help = 'Seed categories data'

    def handle(self, *args, **options):
        categories_data = [
            {
                'name_en': 'groceries',
                'name_th': 'ของชำ',
                'icon': '🛒',
                'color': '#10B981'
            },
            {
                'name_en': 'dining',
                'name_th': 'อาหาร',
                'icon': '🍽️',
                'color': '#F59E0B'
            },
            {
                'name_en': 'utilities',
                'name_th': 'สาธารณูปโภค',
                'icon': '💡',
                'color': '#3B82F6'
            },
            {
                'name_en': 'shopping',
                'name_th': 'ช้อปปิ้ง',
                'icon': '🛍️',
                'color': '#EC4899'
            },
            {
                'name_en': 'transport',
                'name_th': 'การเดินทาง',
                'icon': '🚗',
                'color': '#6366F1'
            },
            {
                'name_en': 'health',
                'name_th': 'สุขภาพ',
                'icon': '💊',
                'color': '#EF4444'
            },
            {
                'name_en': 'entertainment',
                'name_th': 'บันเทิง',
                'icon': '🎬',
                'color': '#8B5CF6'
            },
            {
                'name_en': 'other',
                'name_th': 'อื่นๆ',
                'icon': '📦',
                'color': '#6B7280'
            },
        ]

        created_count = 0
        for cat_data in categories_data:
            category, created = Category.objects.get_or_create(
                name_en=cat_data['name_en'],
                defaults={
                    'name_th': cat_data['name_th'],
                    'icon': cat_data['icon'],
                    'color': cat_data['color']
                }
            )
            if created:
                created_count += 1
                self.stdout.write(
                    self.style.SUCCESS(f'Created category: {category.name_en}')
                )
            else:
                self.stdout.write(
                    self.style.WARNING(f'Category already exists: {category.name_en}')
                )

        self.stdout.write(
            self.style.SUCCESS(f'\nSuccessfully seeded {created_count} categories')
        )
