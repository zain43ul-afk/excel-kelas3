KELAS EXCEL INTERAKTIF — REBUILD

Isi paket:
- index.html
- style.css
- app.js
- firebase-config.js

Fitur yang sudah dibuat ulang:
1. Tampilan “Kelas Excel Interaktif” dengan 8 sub-latihan dalam satu ruang kelas.
2. Ruang Siswa dan Ruang Guru.
3. Kelas 3P, 3Q, 3R, 3S, 3T dengan total 128 slot siswa.
4. Guru dapat membuka/mengunci Latihan 1–8.
5. Guru dapat melihat siswa belum mulai, sedang mengerjakan, selesai, progres, waktu, nilai, dan reset per siswa.
6. Tombol Keluar siswa terkunci sampai guru menekan “Materi selesai”.
7. Setelah login siswa, website meminta fullscreen. Jika siswa keluar fullscreen sebelum materi selesai, muncul pengunci untuk kembali fullscreen.
8. Timer 60 menit dan nilai:
   <20 menit = 90
   <30 menit = 80
   <40 menit = 70
   <50 menit = 60
   <=60 menit = 50
   tidak selesai / melewati 60 menit = 40
9. Latihan 1: grid 20×20, klik alamat sel.
10. Latihan 2: SUM & AVERAGE, Enter menampilkan hasil, contoh =SUM(B2:F2) -> 24, latihan vertikal, dan 5 soal angka.
11. Latihan 3: 30 soal rumus/kata/link, case-sensitive, panduan Caps Lock dan Shift.
12. Latihan 4: SUMIF.
13. Latihan 5: AVERAGEIF.
14. Latihan 6: VLOOKUP.
15. Latihan 7: algoritma.
16. Latihan 8: coding.
17. Panduan bergaya simulasi Excel dan keyboard.

CATATAN NAMA SISWA
Nama asli 128 siswa tidak berhasil dipulihkan dari memori. Saat ini app.js membuat placeholder:
“Siswa 3P 01”, “Siswa 3P 02”, dst.
Jika file Data Kelas.xlsx tersedia, ganti konstanta ROSTER / CLASS_COUNTS di app.js dengan nama asli.

SINKRONISASI ANTAR-KOMPUTER
Secara default website memakai localStorage sehingga dapat langsung diuji tanpa backend.
Agar kontrol guru/progres siswa benar-benar sinkron antar-komputer:
1. Buat project Firebase.
2. Aktifkan Realtime Database.
3. Salin konfigurasi web Firebase.
4. Tempel pada firebase-config.js.
5. Host semua file melalui HTTPS.

Contoh rules untuk pengujian kelas tertutup (JANGAN dipakai jangka panjang pada situs publik):
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
Untuk produksi, gunakan Firebase Authentication / rules yang lebih ketat.

KEAMANAN LOGIN GURU
Login guru pada rebuild ini masih dilakukan di frontend agar perilakunya sama seperti website statis.
Artinya kredensial dapat terlihat oleh orang yang memeriksa source code browser.
Untuk deployment publik yang serius, autentikasi guru sebaiknya dipindah ke backend atau Firebase Authentication.

MENJALANKAN
- Untuk uji sederhana: buka index.html.
- Untuk Firebase/realtime: jalankan dari web hosting/localhost HTTP(S), bukan sekadar file://.
