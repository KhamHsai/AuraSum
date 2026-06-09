import google.generativeai as genai
from django.conf import settings
import base64
import re


class GeminiService:
    def __init__(self):
        api_key = settings.env.get('GEMINI_API_KEY', '')
        if api_key:
            genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel('gemini-1.5-flash')
    
    def scan_receipt(self, image_data):
        """
        Scan receipt image and extract transaction data using Gemini API
        """
        try:
            # Prepare the image for Gemini
            image_parts = [
                {
                    "mime_type": "image/jpeg",
                    "data": image_data
                }
            ]
            
            # Prompt for receipt extraction
            prompt = """
            Analyze this receipt image and extract the following information in JSON format:
            {
                "merchant": "store/restaurant name",
                "amount": "total amount as number (e.g., 185.00)",
                "date": "transaction date in YYYY-MM-DD format",
                "category": "one of: groceries, dining, utilities, shopping, transport, health, entertainment, other",
                "items": ["list of items if visible"],
                "language": "en or th based on receipt language"
            }
            
            Only return the JSON, no other text.
            """
            
            response = self.model.generate_content([prompt, image_parts[0]])
            result = response.text
            
            # Clean up the response (remove markdown code blocks if present)
            result = result.strip()
            if result.startswith('```json'):
                result = result[7:]
            if result.startswith('```'):
                result = result[3:]
            if result.endswith('```'):
                result = result[:-3]
            result = result.strip()
            
            # Parse the JSON response
            import json
            data = json.loads(result)
            
            # Validate and clean the data
            cleaned_data = {
                'merchant': data.get('merchant', '').strip(),
                'amount': self._parse_amount(data.get('amount', '0')),
                'date': self._parse_date(data.get('date', '')),
                'category': self._validate_category(data.get('category', 'other')),
                'original_language': data.get('language', 'en')
            }
            
            return {
                'success': True,
                'data': cleaned_data
            }
            
        except Exception as e:
            return {
                'success': False,
                'error': str(e)
            }
    
    def _parse_amount(self, amount_str):
        """Extract numeric amount from string"""
        try:
            # Remove currency symbols and commas
            cleaned = re.sub(r'[^\d.]', '', str(amount_str))
            return float(cleaned) if cleaned else 0.0
        except:
            return 0.0
    
    def _parse_date(self, date_str):
        """Parse date string to YYYY-MM-DD format"""
        from datetime import datetime
        try:
            # Try common date formats
            formats = [
                '%Y-%m-%d',
                '%d/%m/%Y',
                '%m/%d/%Y',
                '%d-%m-%Y',
                '%Y/%m/%d',
            ]
            
            for fmt in formats:
                try:
                    dt = datetime.strptime(date_str, fmt)
                    return dt.strftime('%Y-%m-%d')
                except:
                    continue
            
            # If no format matches, return today's date
            return datetime.now().strftime('%Y-%m-%d')
        except:
            from datetime import datetime
            return datetime.now().strftime('%Y-%m-%d')
    
    def _validate_category(self, category):
        """Validate category against allowed values"""
        allowed = ['groceries', 'dining', 'utilities', 'shopping', 'transport', 'health', 'entertainment', 'other']
        return category if category in allowed else 'other'
    
    def translate_text(self, text, target_language='en'):
        """
        Translate text to target language using Gemini
        """
        try:
            prompt = f"Translate this text to {target_language}. Only return the translation, no other text: {text}"
            response = self.model.generate_content(prompt)
            return response.text.strip()
        except Exception as e:
            return text  # Return original if translation fails
