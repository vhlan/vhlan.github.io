# FinCare PWA 🏦

Aplikasi keuangan pribadi berbasis PWA (Progressive Web App) — bisa diinstall ke homescreen, jalan offline penuh, dan mendukung push notification.

---

## 🚀 Deploy ke GitHub Pages

### Langkah 1 — Buat Repository
```
1. Buka github.com → New repository
2. Nama repo: fincare (atau terserah)
3. Set ke Public
4. Klik "Create repository"
```

### Langkah 2 — Upload Semua File
Struktur folder yang harus diupload:
```
fincare-pwa/
├── index.html        ← App utama
├── manifest.json     ← PWA manifest
├── sw.js             ← Service Worker
├── pwa-test.html     ← Halaman cek fitur PWA
├── .nojekyll         ← Wajib! Agar GitHub Pages tidak blokir sw.js
└── icons/
    ├── icon-72x72.png
    ├── icon-96x96.png
    ├── icon-128x128.png
    ├── icon-144x144.png
    ├── icon-152x152.png
    ├── icon-192x192.png
    ├── icon-384x384.png
    └── icon-512x512.png
```

Upload via GitHub web UI:
```
1. Buka repo → klik "uploading an existing file"
2. Drag & drop semua file (termasuk folder icons/)
3. Klik "Commit changes"
```

Atau via Git CLI:
```bash
git init
git add .
git commit -m "Initial PWA commit"
git branch -M main
git remote add origin https://github.com/USERNAME/fincare.git
git push -u origin main
```

### Langkah 3 — Aktifkan GitHub Pages
```
1. Buka repo → Settings → Pages
2. Source: "Deploy from a branch"
3. Branch: main / root (/)
4. Klik Save
5. Tunggu 1-2 menit → URL muncul:
   https://USERNAME.github.io/fincare/
```

> ⚠️ **Penting:** GitHub Pages otomatis menggunakan HTTPS — ini wajib untuk PWA & Service Worker berjalan!

---

## 📱 Cara Install ke Homescreen

### Android (Chrome)
- Buka URL app di Chrome
- Muncul banner "Tambahkan ke layar utama" → Klik
- Atau: menu ⋮ → "Tambahkan ke layar utama"

### iPhone / iPad (Safari)
- Buka URL di Safari (bukan Chrome)
- Tap ikon Share (kotak dengan panah atas)
- Scroll → "Add to Home Screen"
- Klik "Add"

### Desktop (Chrome/Edge)
- Lihat ikon install (⊕) di address bar kanan
- Atau klik tombol **"Install App"** yang muncul di topbar aplikasi

---

## 🔔 Setup Push Notification (Opsional)

Push notification memerlukan backend server untuk mengirim notifikasi. File `sw.js` sudah siap menerima push — yang perlu Anda lakukan:

### 1. Generate VAPID Keys
```bash
npm install -g web-push
web-push generate-vapid-keys
```

Output:
```
Public Key:  BEl62iUYgUivxIkv69yViEuiBIa-...
Private Key: abc123...
```

### 2. Ganti Public Key di index.html
```javascript
// Cari baris ini di index.html:
const VAPID_PUBLIC_KEY = 'BEl62iUYgUivxIkv69yViEuiBIa-...';
// Ganti dengan Public Key Anda
```

### 3. Backend untuk Kirim Push
Contoh minimal dengan Node.js:
```javascript
const webpush = require('web-push');
webpush.setVapidDetails(
  'mailto:email@anda.com',
  'PUBLIC_KEY_ANDA',
  'PRIVATE_KEY_ANDA'
);

// subscription = objek dari browser (tersimpan di IndexedDB app)
webpush.sendNotification(subscription, JSON.stringify({
  title: 'FinCare',
  body: 'Jangan lupa catat pengeluaran hari ini!',
  icon: '/icons/icon-192x192.png'
}));
```

> Untuk GitHub Pages (static hosting), push notification dari server tidak bisa dijalankan langsung. Gunakan layanan seperti **Firebase Cloud Messaging (FCM)** atau deploy backend sederhana ke **Railway / Render / Vercel**.

### Notifikasi Lokal (Tanpa Server)
Fitur notifikasi lokal sudah berjalan tanpa backend:
- ✅ Budget hampir habis → otomatis notifikasi
- ✅ Reminder mingguan → toast + notifikasi jika belum transaksi 7 hari

---

## ✅ Fitur PWA yang Sudah Diimplementasi

| Fitur | Status | Keterangan |
|-------|--------|------------|
| Install ke Homescreen | ✅ | Tombol muncul otomatis di topbar |
| Offline Penuh | ✅ | Cache-First untuk semua aset + CDN |
| Push Notification | ✅ | SW siap, perlu VAPID key & backend |
| Notifikasi Lokal | ✅ | Budget alert & reminder tanpa backend |
| Splash Screen | ✅ | Via manifest background_color + icon |
| Ikon Lengkap | ✅ | 8 ukuran + Apple touch icons |
| Update Banner | ✅ | Muncul otomatis saat ada SW baru |
| Offline Banner | ✅ | Banner merah saat koneksi putus |
| App Shortcuts | ✅ | Shortcut ke Dashboard & Transaksi |
| Theme Color | ✅ | Status bar biru di Android |

---

## 🛠️ Troubleshooting

**PWA tidak bisa diinstall?**
- Pastikan akses via HTTPS (GitHub Pages sudah HTTPS otomatis)
- Coba di Chrome Android atau Chrome Desktop
- Buka DevTools → Application → Manifest untuk cek error

**Service Worker tidak aktif?**
- Pastikan `sw.js` ada di root folder (sejajar `index.html`)
- Buka DevTools → Application → Service Workers
- Klik "Update" jika ada

**Offline tidak jalan?**
- Buka DevTools → Application → Cache Storage — pastikan cache berisi file
- Test: DevTools → Network → pilih "Offline" → refresh

**Push notification tidak muncul?**
- Pastikan permission sudah "granted" di browser
- Cek `VAPID_PUBLIC_KEY` sudah diganti
- Di GitHub Pages tanpa backend: hanya notifikasi lokal yang berjalan
