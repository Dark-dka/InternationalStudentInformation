# Vite.js dan React.js ga O'tkazish

Loyha Vite.js dan oddiy React.js (Create React App) ga muvaffaqiyatli o'tkazildi.

## O'zgarishlar

### O'chirilgan fayllar:
- `vite.config.ts` - Vite konfiguratsiyasi
- `index.html` (root) - Vite uchun HTML
- `src/main.tsx` - Vite entry point

### Yangi fayllar:
- `public/index.html` - Create React App uchun HTML
- `src/index.tsx` - React entry point
- `src/index.css` - Asosiy CSS
- `public/manifest.json` - PWA manifest
- `public/robots.txt` - SEO robots

### O'zgartirilgan fayllar:
- `package.json` - react-scripts qo'shildi, vite o'chirildi
- `tsconfig.json` - Create React App uchun sozlandi
- `src/services/api.ts` - `import.meta.env` dan `process.env` ga o'zgartirildi
- `.gitignore` - React build papkasi qo'shildi

## Yangi Buyruqlar

### Development:
```bash
npm start
```
Server `http://localhost:3000` da ishga tushadi.

### Production Build:
```bash
npm run build
```
Build papkasi `build/` da yaratiladi.

### Test:
```bash
npm test
```

## Environment Variables

Endi `.env` faylida quyidagicha ishlatiladi:
```
REACT_APP_API_URL=http://localhost:8000/api
```

Eslatma: `REACT_APP_` prefiksi majburiy!

## O'rnatish

Agar node_modules o'chirilgan bo'lsa:
```bash
npm install
```

Keyin:
```bash
npm start
```
