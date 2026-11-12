# Karyawan AI Super System

PWA dashboard awal (frontend) untuk workspace AI bisnis.

## Fitur yang sudah berjalan
- Dashboard responsif Android/desktop
- Navigasi AI Manager, Content Creator, AI Sales, Analyst, Automation
- Generator berbasis template lokal (tanpa API)
- Salin dan unduh hasil TXT
- Riwayat tersimpan di localStorage perangkat
- PWA manifest + service worker offline cache

## Status penting
Ini **starter frontend yang berfungsi**, bukan AI cloud otomatis. Output generator saat ini adalah template lokal. AI sungguhan perlu backend server dan provider API. Jangan menyimpan API key rahasia di `app.js` atau frontend.

## Jalankan
Buka `index.html` atau deploy folder ini ke GitHub Pages. Untuk service worker/PWA, gunakan HTTPS (GitHub Pages sudah HTTPS).

## Struktur
- `index.html`
- `style.css`
- `app.js`
- `manifest.json`
- `sw.js`
- `icons/icon.svg`

## Tahap berikutnya
Backend aman (misalnya Node.js), endpoint AI, autentikasi, database, scheduler, dan integrasi sosial sesuai API resmi masing-masing platform.
