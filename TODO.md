# Ghost Clone — Build Progress

## ✅ Core Files
- [x] `package.json`
- [x] `.env.example`
- [x] `.gitignore`
- [x] `README.md`
- [x] `server.js`
- [x] `database.sql`

## ✅ Config & Middleware
- [x] `config/db.js`
- [x] `middleware/auth.js`

## ✅ Utils
- [x] `utils/markdown.js`
- [x] `utils/helpers.js`

## ✅ Routes
- [x] `routes/setup.js`
- [x] `routes/auth.js`
- [x] `routes/admin.js`
- [x] `routes/public.js`

## ✅ Views — Public
- [x] `views/public/layout.ejs` (partial header/footer)
- [x] `views/public/home.ejs`
- [x] `views/public/post.ejs`
- [x] `views/public/tag.ejs`
- [x] `views/404.ejs`

## ✅ Views — Admin
- [x] `views/admin/setup.ejs`
- [x] `views/admin/login.ejs`
- [x] `views/admin/dashboard.ejs`
- [x] `views/admin/posts.ejs`
- [x] `views/admin/editor.ejs`

## ✅ Assets
- [x] `public/css/ghost.css`
- [x] `public/css/admin.css`
- [x] `public/js/editor.js`

## 🚀 Deploy Steps (untuk user)
1. Upload folder `ghost-clone/` ke Hostinger
2. Buat file `.env` dari `.env.example`, isi credentials
3. Set Node app: root=`ghost-clone`, startup=`server.js`
4. Jalankan `npm install` via panel
5. Start app
6. Buka `/setup` → bikin admin pertama
7. Login → mulai nulis
