# O'rnatish Qo'llanmasi

## Tez Boshlash

### 1. Backend O'rnatish

```bash
cd backend
python -m venv venv
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

pip install -r requirements.txt
python manage.py migrate
python manage.py create_demo_data
python manage.py runserver
```

### 2. Frontend O'rnatish

Yangi terminal oynasida:

```bash
npm install
npm run dev
```

### 3. Tizimga Kirish

1. Brauzerda `http://localhost:5173` ga kiring
2. Login:
   - Username: `admin`
   - Password: `admin`

## Muammolar

### CORS Xatosi
Agar CORS xatosi bo'lsa, `backend/student_management/settings.py` da `CORS_ALLOWED_ORIGINS` ni tekshiring.

### Port Xatosi
Agar port band bo'lsa:
- Backend: `python manage.py runserver 8001` (boshqa port)
- Frontend: `.env` faylida `VITE_API_URL=http://localhost:8001/api` qo'shing

### Ma'lumotlar Bazasi
Agar ma'lumotlar ko'rinmasa:
```bash
python manage.py create_demo_data
```

## Production uchun

1. `SECRET_KEY` ni o'zgartiring
2. `DEBUG=False` qiling
3. PostgreSQL yoki MySQL ishlating
4. Environment variables ishlating
