# Aplikasi Mahasiswa

Aplikasi dibuat untuk tujuan latihan integrasi data dari API ke front-end.

## Fitur

Berikut adalah endpoint yang tersedia:

- GET /mahasiswa untuk memberikan data user dummy yang ada di database.
- GET /mahasiswa/:id untuk mencari data 1 mahasiswa berdasarkan ID.
- POST /mahasiswa untuk membuat mahasiswa baru.
- PUT /mahasiswa:id untuk mengubah data mahasiswa yang sudah ada.
- DELETE /mahasiswa:id untuk menghapus mahasiswa.

## Cara Menjalankan Aplikasi

1. Masuk ke direktori /backend

 ```powershell
   cd backend
```

2. Install NPM dengan command berikut:

 ```powershell
   cp env.example .env
```

3. Copy isi file dari .env.example ke dalam file .env.

 ```powershell
   cp env.example .env
```

4. Projek ini menggunakan Prisma sebagai ORM. Untuk variabel DATABASE_URL pada .env bisa diisi dengan url seperti di bawah (contoh berikut menggunakan MySQL sebagai databasenya, silahkan disesuaikan dengan preferensi masing-masing).

 ```powershell
   DATABASE_URL="mysql://<db_user>:<db_password>@<db_host>:<db_port>/<db_name>"
```

5. Generate Prisma Client

 ```powershell
   npx prisma generate
```

6. Migrate database

 ```powershell
   npx prisma migrate deploy
```

7. Jalankan server

 ```powershell
   node index.js
```

8. Jalankan front-end, bisa menggunakan Go Live pada /frontend/index.html