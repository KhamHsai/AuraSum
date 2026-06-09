# AuraSum Backend API

Django REST API for AuraSum - AI-powered receipt tracking application.

## Features

- **User Authentication**: Email/password registration and login
- **Receipt Management**: CRUD operations for receipts
- **AI Receipt Scanning**: Gemini API integration for automatic receipt data extraction
- **Category Management**: Pre-seeded expense categories (bilingual: EN/TH)
- **Soft Delete**: Records are marked as deleted instead of hard deletion
- **Monthly Analytics**: Calculate monthly spending by category

## Tech Stack

- Django 5.0.6
- Django REST Framework 3.15.1
- PostgreSQL (production) / SQLite (development)
- Google Generative AI (Gemini 1.5 Flash)
- Python 3.12+

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Environment Configuration

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Edit `.env` with your settings:

```env
# Database Configuration
DB_ENGINE=django.db.backends.sqlite3
DB_NAME=db.sqlite3

# For PostgreSQL (production):
# DB_ENGINE=django.db.backends.postgresql
# DB_NAME=aurasum
# DB_USER=postgres
# DB_PASSWORD=your_password
# DB_HOST=localhost
# DB_PORT=5432

# Django Secret Key
SECRET_KEY=your-secret-key-here

# Debug Mode
DEBUG=True

# Allowed Hosts
ALLOWED_HOSTS=localhost,127.0.0.1

# Gemini API Key (get from https://makersuite.google.com/app/apikey)
GEMINI_API_KEY=your-gemini-api-key-here

# CORS Settings
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

### 3. Run Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 4. Seed Categories

```bash
python manage.py seed_categories
```

### 5. Create Superuser (Optional)

```bash
python manage.py createsuperuser
```

### 6. Run Development Server

```bash
python manage.py runserver
```

The API will be available at `http://127.0.0.1:8000/api/`

## API Endpoints

### Authentication

- `POST /api/auth/register/` - Register new user
- `POST /api/auth/login/` - Login user
- `GET /api/auth/profile/` - Get current user profile

### Categories

- `GET /api/categories/` - List all categories
- `GET /api/categories/{id}/` - Get category details

### Receipts

- `GET /api/receipts/` - List user's receipts
- `POST /api/receipts/` - Create new receipt
- `GET /api/receipts/{id}/` - Get receipt details
- `PUT /api/receipts/{id}/` - Update receipt
- `DELETE /api/receipts/{id}/` - Soft delete receipt
- `POST /api/receipts/scan/` - Scan receipt image with AI
- `GET /api/receipts/monthly_totals/` - Get monthly spending by category
- `GET /api/receipts/recent/` - Get recent receipts

### Admin Panel

- `http://127.0.0.1:8000/admin/` - Django admin panel

## API Usage Examples

### Register User

```bash
curl -X POST http://127.0.0.1:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "password_confirm": "password123",
    "name": "John Doe",
    "avatar_initials": "JD",
    "currency": "THB",
    "language": "en"
  }'
```

### Login

```bash
curl -X POST http://127.0.0.1:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Create Receipt

```bash
curl -X POST http://127.0.0.1:8000/api/receipts/ \
  -H "Content-Type: application/json" \
  -d '{
    "merchant": "Starbucks",
    "amount": 185.00,
    "date": "2025-06-09",
    "category": 2,
    "method": "manual",
    "original_language": "en"
  }'
```

### Scan Receipt

```bash
curl -X POST http://127.0.0.1:8000/api/receipts/scan/ \
  -F "image=@receipt.jpg"
```

## Database Schema

### User Model
- `id` (UUID)
- `email` (unique)
- `password` (hashed)
- `name`
- `avatar_initials`
- `currency` (THB/USD/EUR)
- `language` (en/th)
- `is_deleted` (soft delete)
- `deleted_at`
- `created_at`
- `updated_at`

### Receipt Model
- `id` (UUID)
- `user` (foreign key)
- `merchant`
- `amount` (decimal)
- `date`
- `category` (foreign key)
- `note` (optional)
- `method` (camera/manual)
- `original_language` (en/th)
- `is_deleted` (soft delete)
- `deleted_at`
- `created_at`
- `updated_at`

### Category Model
- `id` (auto)
- `name_en` (English name)
- `name_th` (Thai name)
- `icon` (emoji)
- `color` (hex)

## Data Retention

- Receipts are soft deleted (marked with `is_deleted=True`)
- Automated cleanup task hard-deletes records older than 1 year
- Run cleanup manually: `python manage.py cleanup_old_data`

## Deployment

### Production Checklist

1. Set `DEBUG=False` in `.env`
2. Generate strong `SECRET_KEY`
3. Configure PostgreSQL database
4. Set `ALLOWED_HOSTS` to production domain
5. Configure CORS for production frontend
6. Use Gunicorn as WSGI server
7. Set up Nginx reverse proxy
8. Configure SSL/HTTPS

### Example Production Deployment (Render/Railway)

1. Push code to GitHub
2. Connect repository to Render/Railway
3. Set environment variables in dashboard
4. Deploy automatically on push

## Project Structure

```
backend/
├── aurasum/              # Django project settings (renamed from config)
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
├── users/               # User authentication app
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   └── urls.py
│   └── migrations/
│       └── 0001_create_user_table.py  # Descriptive migration names
├── receipts/            # Receipt management app
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   ├── urls.py
│   ├── services.py      # Gemini API integration
│   └── management/      # Management commands
│   └── migrations/
│       ├── 0001_create_category_and_receipt_tables.py
│       └── 0002_add_receipt_indexes_and_foreign_key.py
├── manage.py
├── requirements.txt
├── .env.example
└── .gitignore
```

## Troubleshooting

### Migration Issues

If you encounter migration errors:

```bash
python manage.py migrate --fake-initial
python manage.py migrate --run-syncdb
```

### Gemini API Errors

Make sure your `GEMINI_API_KEY` is valid and has the correct permissions.

### CORS Errors

Ensure your frontend URL is in `CORS_ALLOWED_ORIGINS` in `.env`.

## License

MIT
