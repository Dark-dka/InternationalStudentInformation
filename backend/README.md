# International Student Information Management System - Backend

Django va Django REST Framework asosida qurilgan backend API.

## O'rnatish

1. Virtual environment yaratish (tavsiya etiladi):
```bash
python -m venv venv
```

2. Virtual environmentni faollashtirish:
- Windows:
```bash
venv\Scripts\activate
```
- Linux/Mac:
```bash
source venv/bin/activate
```

3. Kerakli paketlarni o'rnatish:
```bash
pip install -r requirements.txt
```

4. Ma'lumotlar bazasini yaratish:
```bash
python manage.py migrate
```

5. Demo foydalanuvchi va ma'lumotlarni yaratish:
```bash
python manage.py create_demo_data
```

Bu buyruq quyidagilarni yaratadi:
- Foydalanuvchi: `admin` / Parol: `admin`
- Bir nechta demo talaba ma'lumotlari

## Ishga tushirish

Development serverini ishga tushirish:
```bash
python manage.py runserver
```

Server `http://localhost:8000` da ishga tushadi.

## API Endpoints

### Authentication
- `POST /api/auth/login/` - Tizimga kirish
  - Body: `{"username": "admin", "password": "admin"}`
  - Response: `{"access": "...", "refresh": "...", "user": {...}}`

- `POST /api/auth/refresh/` - Token yangilash
  - Body: `{"refresh": "..."}`

### Students
- `GET /api/students/` - Barcha talabalar ro'yxati
  - Query params: `?search=...` - Qidiruv
- `GET /api/students/{id}/` - Bitta talaba ma'lumotlari
- `POST /api/students/` - Yangi talaba qo'shish
- `PUT /api/students/{id}/` - Talaba ma'lumotlarini yangilash
- `PATCH /api/students/{id}/` - Talaba ma'lumotlarini qisman yangilash
- `DELETE /api/students/{id}/` - Talabani o'chirish
- `GET /api/students/stats/` - Statistika (dashboard uchun)

## Ma'lumotlar bazasi

Dastlab SQLite ishlatiladi (`db.sqlite3`). Production uchun PostgreSQL yoki MySQL tavsiya etiladi.

## Admin Panel

Admin panelga kirish:
- URL: `http://localhost:8000/admin/`
- Foydalanuvchi: `admin`
- Parol: `admin`

## CORS

Frontend `http://localhost:5173` (Vite default port) uchun sozlangan. Boshqa portlar kerak bo'lsa, `settings.py` da `CORS_ALLOWED_ORIGINS` ni yangilang.
