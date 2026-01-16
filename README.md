# International Student Information Management System

Xalqaro talabalar ma'lumotlarini boshqarish tizimi. React/TypeScript frontend va Django/Python backend.

## Loyha Strukturasi

```
InternationalStudentInformation/
├── backend/                 # Django backend
│   ├── student_management/  # Django loyha sozlamalari
│   ├── students/           # Students app
│   ├── manage.py
│   └── requirements.txt
├── src/                    # React frontend
│   ├── components/
│   ├── services/
│   └── ...
└── README.md
```

## O'rnatish va Ishga tushirish

### Backend (Django)

1. Backend papkasiga o'ting:
```bash
cd backend
```

2. Virtual environment yaratish (tavsiya etiladi):
```bash
python -m venv venv
```

3. Virtual environmentni faollashtirish:
- Windows:
```bash
venv\Scripts\activate
```
- Linux/Mac:
```bash
source venv/bin/activate
```

4. Kerakli paketlarni o'rnatish:
```bash
pip install -r requirements.txt
```

5. Ma'lumotlar bazasini yaratish:
```bash
python manage.py migrate
```

6. Demo ma'lumotlarni yaratish:
```bash
python manage.py create_demo_data
```

7. Serverni ishga tushirish:
```bash
python manage.py runserver
```

Backend `http://localhost:8000` da ishga tushadi.

### Frontend (React)

1. Asosiy papkada, kerakli paketlarni o'rnatish:
```bash
npm install
```

2. Development serverini ishga tushirish:
```bash
npm run dev
```

Frontend `http://localhost:5173` da ishga tushadi.

## Foydalanish

1. Backend va frontend serverlarini ishga tushiring
2. Brauzerda `http://localhost:5173` ga kiring
3. Tizimga kirish:
   - Username: `admin`
   - Password: `admin`

## API Endpoints

### Authentication
- `POST /api/auth/login/` - Tizimga kirish

### Students
- `GET /api/students/` - Barcha talabalar
- `GET /api/students/{id}/` - Bitta talaba
- `POST /api/students/` - Yangi talaba qo'shish
- `PUT /api/students/{id}/` - Talaba ma'lumotlarini yangilash
- `DELETE /api/students/{id}/` - Talabani o'chirish
- `GET /api/students/stats/` - Statistika

## Texnologiyalar

### Frontend
- React 18
- TypeScript
- Material-UI (MUI)
- Vite
- React Router

### Backend
- Django 5.0
- Django REST Framework
- JWT Authentication
- SQLite (development)

## Rivojlantirish

### Environment Variables

Frontend uchun `.env` fayl yaratish (ixtiyoriy):
```
VITE_API_URL=http://localhost:8000/api
```

## Muammolar va Yechimlar

Agar CORS xatosi bo'lsa, `backend/student_management/settings.py` da `CORS_ALLOWED_ORIGINS` ni tekshiring.
