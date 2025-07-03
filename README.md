# 📸 SnapFeeds App

Project ini adalah aplikasi Next.js yang dikembangkan menggunakan Docker dan Docker Compose, sehingga kamu tidak perlu install Node.js atau dependencies secara manual.

---

## 🚀 Fitur Utama
- ✅ Dibuat dengan Next.js + TypeScript
- 🐳 Jalankan dengan Docker Compose
- 💻 Development environment siap pakai
- ⚡ Hot reload otomatis saat ada perubahan file

---

## 🧰 Prasyarat

Sebelum memulai, pastikan kamu sudah meng-install:
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/install/)

---

## 📦 Cara Menjalankan (Development)

```bash
# 1. Clone repository
git clone https://github.com/RadidDesfandri/snapfeeds.git
cd snapfeeds

# 2. Jalankan docker-compose
docker-compose up --build

# 3. Untuk masuk ke dalam container jalankan ini:
docker-compose exec snapfeeds-app sh

# 4. Untuk menghentikan project
docker-compose down


