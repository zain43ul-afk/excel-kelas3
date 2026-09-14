(() => {
  "use strict";


  const GAME_VERSION = "team-v5-chat-teacher-monitor";

  function makeScenario(id,title,goal,phases,core,detail,advanced){
    if(core.length!==16 || detail.length!==4 || advanced.length!==4){
      throw new Error(`Bank algoritma ${id} harus memiliki 16 langkah inti + 4 detail + 4 lanjutan.`);
    }
    const steps=[];
    core.forEach((t,i)=>{
      steps.push({l:0,t});
      if(i===2) steps.push({l:1,t:detail[0]});
      if(i===4) steps.push({l:2,t:advanced[0]});
      if(i===6) steps.push({l:1,t:detail[1]});
      if(i===8) steps.push({l:2,t:advanced[1]});
      if(i===10) steps.push({l:1,t:detail[2]});
      if(i===12) steps.push({l:2,t:advanced[2]});
      if(i===14) steps.push({l:1,t:detail[3]});
      if(i===15) steps.push({l:2,t:advanced[3]});
    });
    return {id,title,goal,phases,steps};
  }

  function portalScenario(id,title,p){
    return makeScenario(id,title,p.goal,
      ["membuka portal","masuk akun","membuka fitur","memproses data","memastikan hasil"],
      [
        "Buka browser",
        `Masukkan alamat ${p.portal}`,
        `Buka halaman ${p.entry}`,
        "Masukkan username akun sekolah",
        "Masukkan password",
        "Klik tombol Login",
        `Buka menu ${p.menu}`,
        `Pilih ${p.item}`,
        `Baca petunjuk ${p.task}`,
        `Klik ${p.action}`,
        p.resource,
        p.confirm,
        `Tunggu ${p.process}`,
        `Klik ${p.finalAction}`,
        `Buka ${p.status}`,
        `Pastikan ${p.success}`
      ],
      [
        "Pastikan perangkat terhubung ke internet sebelum melanjutkan",
        "Pastikan akun yang digunakan adalah akun milik sendiri",
        "Periksa kembali data atau file yang dipilih",
        "Baca ringkasan tindakan sebelum menyelesaikan proses"
      ],
      [
        "Tunggu halaman selesai dimuat sebelum memasukkan data",
        "Periksa alamat situs agar tidak masuk ke halaman palsu",
        "Jangan menutup tab ketika proses masih berjalan",
        "Logout jika portal digunakan pada komputer bersama"
      ]
    );
  }

  function documentScenario(id,title,p){
    return makeScenario(id,title,p.goal,
      ["membuka aplikasi","menyiapkan isi","memformat dokumen","menjalankan perintah","memeriksa hasil"],
      [
        "Nyalakan komputer",
        `Buka ${p.app}`,
        p.open,
        p.titleStep,
        p.contentStep,
        p.format1,
        p.format2,
        p.insertStep,
        p.reviewStep,
        p.layoutStep,
        p.menuStep,
        p.optionStep,
        p.previewStep,
        p.executeStep,
        p.waitStep,
        p.verifyStep
      ],
      [
        "Pastikan file yang dibuka adalah file yang benar",
        "Simpan perubahan sementara sebelum melanjutkan",
        "Periksa kembali pengaturan utama yang dipilih",
        "Pastikan hasil akhir sesuai tujuan tugas"
      ],
      [
        "Tunggu aplikasi selesai dimuat",
        "Gunakan Undo jika perubahan format keliru",
        "Periksa nama dan lokasi file keluaran",
        "Tutup aplikasi setelah pekerjaan selesai dan tersimpan"
      ]
    );
  }

  function fileScenario(id,title,p){
    return makeScenario(id,title,p.goal,
      ["membuka lokasi file","memilih sumber","menentukan tujuan","memproses file","memastikan hasil"],
      [
        "Nyalakan komputer",
        "Buka File Explorer",
        p.sourceOpen,
        p.sourceCheck,
        p.select,
        p.command,
        p.destinationOpen,
        p.destinationPrepare,
        p.execute,
        p.wait,
        p.verifyCount,
        p.verifyContent,
        p.cleanup1,
        p.cleanup2,
        p.finalCheck,
        p.finish
      ],
      [
        "Periksa kapasitas penyimpanan sebelum memproses file",
        "Pastikan nama folder tujuan mudah dikenali",
        "Jangan membatalkan proses saat file sedang diproses",
        "Bandingkan hasil dengan sumber setelah proses selesai"
      ],
      [
        "Urutkan tampilan file agar sumber lebih mudah ditemukan",
        "Periksa ekstensi file sebelum menjalankan perintah",
        "Buka satu file contoh untuk memastikan hasil dapat digunakan",
        "Tutup File Explorer setelah pekerjaan selesai"
      ]
    );
  }

  function communicationScenario(id,title,p){
    return makeScenario(id,title,p.goal,
      ["membuka layanan","menentukan penerima","menulis informasi","menambahkan kelengkapan","mengirim dan memeriksa"],
      [
        "Buka browser atau aplikasi komunikasi",
        `Buka ${p.service}`,
        p.login,
        p.start,
        p.recipient,
        p.subject,
        p.body,
        p.extraOpen,
        p.extraSelect,
        p.extraWait,
        p.reviewRecipient,
        p.reviewContent,
        p.send,
        p.wait,
        p.verify,
        p.finish
      ],
      [
        "Pastikan koneksi internet stabil",
        "Periksa kembali identitas penerima",
        "Pastikan lampiran atau informasi tambahan sudah benar",
        "Baca ulang pesan sebelum dikirim"
      ],
      [
        "Pastikan alamat layanan komunikasi benar",
        "Hindari membagikan informasi pribadi yang tidak diperlukan",
        "Tunggu semua lampiran selesai diproses",
        "Logout jika menggunakan perangkat bersama"
      ]
    );
  }

  function securityScenario(id,title,p){
    return makeScenario(id,title,p.goal,
      ["mengenali situasi","memeriksa bukti","mengamankan akun","melakukan tindakan","memastikan keamanan"],
      [
        p.start,
        p.observe,
        p.source,
        p.check1,
        p.check2,
        p.openOfficial,
        p.loginOfficial,
        p.securityMenu,
        p.action1,
        p.action2,
        p.confirm,
        p.review,
        p.report,
        p.save,
        p.verify,
        p.finish
      ],
      [
        "Catat informasi penting tanpa menyebarkan data pribadi",
        "Gunakan situs atau aplikasi resmi untuk melakukan pemeriksaan",
        "Periksa kembali perubahan keamanan sebelum disimpan",
        "Beritahu guru atau pengelola jika menemukan hal mencurigakan"
      ],
      [
        "Jangan mengklik tautan mencurigakan selama pemeriksaan",
        "Jangan pernah membagikan password atau kode OTP",
        "Keluar dari sesi lain jika akun diduga pernah diakses orang lain",
        "Simpan bukti seperlunya untuk pelaporan"
      ]
    );
  }

  function codeScenario(id,title,p){
    return makeScenario(id,title,p.goal,
      ["menyiapkan proyek","menulis instruksi","menjalankan program","memperbaiki kesalahan","menyimpan hasil"],
      [
        `Buka ${p.app}`,
        p.newProject,
        p.nameProject,
        p.prepare,
        p.step1,
        p.step2,
        p.step3,
        p.step4,
        p.run,
        p.observe,
        p.findBug,
        p.fixBug,
        p.runAgain,
        p.verify,
        p.save,
        p.finish
      ],
      [
        "Pastikan nama variabel, blok, atau elemen ditulis konsisten",
        "Periksa urutan instruksi sebelum program dijalankan",
        "Uji bagian yang baru diperbaiki sebelum melanjutkan",
        "Simpan proyek dengan nama yang mudah dikenali"
      ],
      [
        "Baca pesan kesalahan jika program gagal",
        "Bandingkan hasil program dengan tujuan yang diminta",
        "Gunakan satu perubahan setiap kali melakukan debugging",
        "Tutup proyek setelah file berhasil tersimpan"
      ]
    );
  }

  function mediaScenario(id,title,p){
    return makeScenario(id,title,p.goal,
      ["membuka media","melakukan penyuntingan","menambahkan elemen","meninjau hasil","mengekspor file"],
      [
        `Buka ${p.app}`,
        p.import,
        p.select,
        p.edit1,
        p.edit2,
        p.adjust,
        p.add,
        p.position,
        p.review,
        p.preview,
        p.exportOpen,
        p.exportOption,
        p.exportName,
        p.exportRun,
        p.verify,
        p.finish
      ],
      [
        "Simpan salinan proyek sebelum melakukan perubahan besar",
        "Pastikan elemen utama tidak terpotong atau tertutup",
        "Periksa kualitas media pada tampilan pratinjau",
        "Gunakan nama file yang sesuai dengan tugas"
      ],
      [
        "Gunakan Undo jika hasil penyuntingan tidak sesuai",
        "Periksa volume, ukuran, atau resolusi sesuai jenis media",
        "Tunggu proses ekspor sampai benar-benar selesai",
        "Buka file hasil ekspor untuk mengecek hasil akhir"
      ]
    );
  }

  function deviceScenario(id,title,p){
    return makeScenario(id,title,p.goal,
      ["menyiapkan perangkat","membuka pengaturan","membuat koneksi","menguji perangkat","menyelesaikan proses"],
      [
        p.prepare1,
        p.prepare2,
        p.openSettings,
        p.openMenu,
        p.enable,
        p.search,
        p.select,
        p.auth,
        p.connect,
        p.wait,
        p.test1,
        p.test2,
        p.adjust,
        p.save,
        p.verify,
        p.finish
      ],
      [
        "Pastikan perangkat tujuan berada dalam jangkauan atau terhubung",
        "Periksa nama perangkat sebelum memilih",
        "Gunakan pengaturan yang sesuai dengan kebutuhan tugas",
        "Pastikan koneksi tetap aktif setelah pengujian"
      ],
      [
        "Tunggu sistem selesai mendeteksi perangkat",
        "Batalkan koneksi jika nama perangkat tidak sesuai",
        "Ulangi pengujian setelah mengubah pengaturan",
        "Matikan fitur koneksi yang tidak diperlukan setelah selesai"
      ]
    );
  }

  function dataScenario(id,title,p){
    return makeScenario(id,title,p.goal,
      ["membuka data","menentukan rentang","mengolah data","memeriksa hasil","menyimpan perubahan"],
      [
        `Buka ${p.app}`,
        p.open,
        p.inspect,
        p.select,
        p.menu,
        p.option1,
        p.option2,
        p.execute,
        p.observe,
        p.check1,
        p.correct,
        p.check2,
        p.format,
        p.save,
        p.reopen,
        p.verify
      ],
      [
        "Pastikan baris judul tidak ikut berubah secara keliru",
        "Periksa kembali rentang data yang dipilih",
        "Bandingkan hasil sebelum dan sesudah pengolahan",
        "Simpan file dengan nama yang mudah dikenali"
      ],
      [
        "Buat salinan data sebelum melakukan perubahan besar",
        "Periksa apakah ada sel kosong yang memengaruhi hasil",
        "Gunakan Undo jika hasil pengolahan tidak sesuai",
        "Tutup file setelah perubahan berhasil tersimpan"
      ]
    );
  }

  function schoolScenario(id,title,p){
    return makeScenario(id,title,p.goal,
      ["membuka layanan sekolah","memilih kegiatan","mengisi kebutuhan","menyelesaikan tugas","memastikan hasil"],
      [
        p.open,
        p.login,
        p.dashboard,
        p.menu,
        p.item,
        p.read,
        p.prepare,
        p.input1,
        p.input2,
        p.review,
        p.action,
        p.wait,
        p.confirm,
        p.status,
        p.record,
        p.finish
      ],
      [
        "Pastikan akun dan kelas yang dipilih sudah benar",
        "Baca semua petunjuk sebelum mulai mengisi",
        "Periksa kembali jawaban atau file sebelum dikirim",
        "Pastikan status kegiatan sudah berubah setelah selesai"
      ],
      [
        "Pastikan koneksi internet stabil sebelum memulai",
        "Jangan membuka halaman lain saat proses pengiriman berlangsung",
        "Simpan bukti keberhasilan jika diperlukan",
        "Logout jika menggunakan komputer milik sekolah"
      ]
    );
  }

  const SCENARIOS = [
    // 1–5: portal / layanan web
    portalScenario("submit-task","Mengumpulkan Tugas di Platform Sekolah",{
      goal:"Susun langkah mengumpulkan tugas hingga statusnya benar-benar terkirim.",
      portal:"platform sekolah",entry:"login",menu:"Mata Pelajaran",item:"Informatika",task:"tugas yang akan dikumpulkan",
      action:"Unggah File",resource:"Buka folder penyimpanan lalu pilih file tugas",confirm:"Klik Open untuk memilih file",
      process:"unggahan file selesai",finalAction:"Kirim Tugas",status:"halaman tugas",success:"status tugas berubah menjadi Terkirim"
    }),
    portalScenario("download-material","Mengunduh Materi Pelajaran",{
      goal:"Susun langkah menemukan dan mengunduh materi dari portal sekolah.",
      portal:"portal pembelajaran",entry:"login",menu:"Materi",item:"materi Informatika",task:"deskripsi materi",
      action:"Unduh Materi",resource:"Pilih lokasi penyimpanan jika browser memintanya",confirm:"Konfirmasi nama file unduhan",
      process:"unduhan selesai",finalAction:"Buka File",status:"folder Downloads",success:"file materi dapat dibuka"
    }),
    portalScenario("online-registration","Mengisi Formulir Pendaftaran Kegiatan",{
      goal:"Susun proses mengisi formulir kegiatan sekolah sampai pendaftaran tercatat.",
      portal:"situs kegiatan sekolah",entry:"pendaftaran",menu:"Daftar Kegiatan",item:"kegiatan yang akan diikuti",task:"syarat pendaftaran",
      action:"Isi Formulir",resource:"Lengkapi data yang diminta pada formulir",confirm:"Centang pernyataan bahwa data sudah benar",
      process:"validasi formulir selesai",finalAction:"Kirim Pendaftaran",status:"halaman konfirmasi",success:"nomor atau status pendaftaran muncul"
    }),
    portalScenario("join-meeting","Bergabung ke Pertemuan Daring",{
      goal:"Susun langkah masuk ke ruang pertemuan daring dengan akun sekolah.",
      portal:"layanan konferensi sekolah",entry:"masuk",menu:"Pertemuan",item:"jadwal pertemuan hari ini",task:"waktu dan aturan pertemuan",
      action:"Gabung",resource:"Pilih mikrofon dan kamera yang akan digunakan",confirm:"Atur mikrofon menjadi mute sebelum masuk",
      process:"koneksi ke ruang pertemuan terbentuk",finalAction:"Gabung Sekarang",status:"ruang pertemuan",success:"nama akun tampil sebagai peserta"
    }),
    portalScenario("library-loan","Memesan Buku di Perpustakaan Digital",{
      goal:"Susun langkah mencari dan memesan buku melalui perpustakaan digital sekolah.",
      portal:"perpustakaan digital",entry:"akun anggota",menu:"Katalog Buku",item:"buku yang dibutuhkan",task:"informasi ketersediaan buku",
      action:"Pinjam / Pesan",resource:"Pilih durasi atau metode peminjaman yang tersedia",confirm:"Periksa judul dan penulis buku",
      process:"permintaan peminjaman diproses",finalAction:"Konfirmasi Peminjaman",status:"Riwayat Peminjaman",success:"buku tercatat sebagai dipinjam atau dipesan"
    }),

    // 6–10: dokumen / office
    documentScenario("print-doc","Mencetak Dokumen di Laboratorium",{
      goal:"Susun proses mencetak dokumen sampai hasil cetak diperiksa.",app:"aplikasi pengolah kata",
      open:"Buka dokumen yang akan dicetak",titleStep:"Periksa judul dokumen",contentStep:"Periksa isi dan halaman dokumen",
      format1:"Perbaiki bagian yang salah jika ada",format2:"Simpan perubahan dokumen",insertStep:"Buka menu File",
      reviewStep:"Pilih Print",layoutStep:"Pilih printer yang digunakan",menuStep:"Tentukan halaman yang dicetak",
      optionStep:"Tentukan jumlah salinan",previewStep:"Periksa Print Preview",executeStep:"Klik Print",
      waitStep:"Tunggu proses pencetakan selesai",verifyStep:"Ambil dan periksa hasil cetakan"
    }),
    documentScenario("word-report","Memformat Laporan di Pengolah Kata",{
      goal:"Susun langkah memformat laporan agar rapi lalu menyimpannya.",app:"aplikasi pengolah kata",
      open:"Buka file laporan",titleStep:"Pilih teks judul laporan",contentStep:"Atur ukuran dan jenis huruf judul",
      format1:"Pilih isi paragraf",format2:"Atur spasi dan perataan paragraf",insertStep:"Tambahkan nomor halaman",
      reviewStep:"Periksa konsistensi heading",layoutStep:"Atur margin halaman",menuStep:"Buka pemeriksaan ejaan",
      optionStep:"Perbaiki kesalahan ejaan yang ditemukan",previewStep:"Tinjau seluruh dokumen dari awal sampai akhir",
      executeStep:"Klik Save",waitStep:"Tunggu penyimpanan selesai",verifyStep:"Pastikan perubahan tetap ada setelah file dibuka kembali"
    }),
    documentScenario("slide-deck","Membuat Presentasi Sederhana",{
      goal:"Susun proses membuat presentasi sampai siap ditampilkan.",app:"aplikasi presentasi",
      open:"Buat presentasi kosong",titleStep:"Buat slide judul",contentStep:"Ketik judul dan identitas penyaji",
      format1:"Tambahkan slide isi",format2:"Ketik poin-poin utama",insertStep:"Sisipkan gambar pendukung",
      reviewStep:"Atur ukuran gambar agar proporsional",layoutStep:"Pilih tata letak slide yang konsisten",menuStep:"Atur transisi sederhana",
      optionStep:"Periksa urutan slide",previewStep:"Jalankan Slide Show untuk pratinjau",executeStep:"Simpan presentasi",
      waitStep:"Tunggu file selesai disimpan",verifyStep:"Buka kembali file dan pastikan semua slide tampil"
    }),
    documentScenario("export-pdf","Mengekspor Dokumen Menjadi PDF",{
      goal:"Susun langkah mengubah dokumen menjadi PDF dan memeriksa hasilnya.",app:"aplikasi pengolah dokumen",
      open:"Buka dokumen sumber",titleStep:"Periksa judul dan identitas dokumen",contentStep:"Periksa isi terakhir sebelum ekspor",
      format1:"Pastikan gambar tidak keluar dari halaman",format2:"Pastikan nomor halaman sudah benar",insertStep:"Buka menu File",
      reviewStep:"Pilih Export atau Save As",layoutStep:"Pilih format PDF",menuStep:"Pilih lokasi penyimpanan",
      optionStep:"Ketik nama file PDF",previewStep:"Periksa opsi halaman yang akan diekspor",executeStep:"Klik Save / Export",
      waitStep:"Tunggu proses pembuatan PDF selesai",verifyStep:"Buka PDF dan periksa setiap halamannya"
    }),
    documentScenario("create-table-doc","Membuat Tabel di Dokumen",{
      goal:"Susun langkah membuat tabel data sederhana di dokumen.",app:"aplikasi pengolah kata",
      open:"Buat dokumen kosong",titleStep:"Ketik judul tabel",contentStep:"Letakkan kursor di bawah judul",
      format1:"Buka menu Insert",format2:"Pilih Table",insertStep:"Tentukan jumlah baris dan kolom",
      reviewStep:"Isi judul setiap kolom",layoutStep:"Masukkan data ke dalam tabel",menuStep:"Pilih seluruh tabel",
      optionStep:"Atur lebar kolom",previewStep:"Periksa keterbacaan data",executeStep:"Simpan dokumen",
      waitStep:"Tunggu penyimpanan selesai",verifyStep:"Buka kembali dokumen dan pastikan tabel tidak berubah"
    }),

    // 11–15: manajemen file
    fileScenario("flash-backup","Mencadangkan File ke Flashdisk",{
      goal:"Susun langkah membuat backup file ke flashdisk secara aman.",
      sourceOpen:"Hubungkan flashdisk lalu buka File Explorer",sourceCheck:"Buka folder sumber yang akan dicadangkan",
      select:"Pilih file yang akan dicadangkan",command:"Salin file yang dipilih",destinationOpen:"Buka drive flashdisk",
      destinationPrepare:"Buat dan buka folder Backup",execute:"Tempel file ke folder Backup",wait:"Tunggu proses penyalinan selesai",
      verifyCount:"Bandingkan jumlah file sumber dan hasil backup",verifyContent:"Buka satu file hasil backup sebagai contoh",
      cleanup1:"Tutup file contoh",cleanup2:"Klik Safely Remove Hardware",finalCheck:"Pilih Eject dan tunggu pesan aman",
      finish:"Lepaskan flashdisk dari port USB"
    }),
    fileScenario("organize-folders","Mengorganisasi File ke Dalam Folder",{
      goal:"Susun langkah merapikan file berdasarkan jenisnya ke folder yang sesuai.",
      sourceOpen:"Buka folder yang berisi file campuran",sourceCheck:"Amati jenis file yang ada",
      select:"Pilih file dokumen terlebih dahulu",command:"Potong file dokumen",destinationOpen:"Buat folder Dokumen",
      destinationPrepare:"Buka folder Dokumen",execute:"Tempel file dokumen",wait:"Tunggu pemindahan selesai",
      verifyCount:"Kembali ke folder awal dan pilih file gambar",verifyContent:"Pindahkan file gambar ke folder Gambar",
      cleanup1:"Pindahkan file lain ke folder yang sesuai",cleanup2:"Urutkan folder berdasarkan nama",finalCheck:"Periksa bahwa tidak ada file tertinggal secara keliru",
      finish:"Tutup File Explorer"
    }),
    fileScenario("compress-zip","Membuat Arsip ZIP",{
      goal:"Susun langkah menggabungkan beberapa file menjadi satu arsip ZIP.",
      sourceOpen:"Buka folder yang berisi file sumber",sourceCheck:"Periksa file yang akan dimasukkan ke arsip",
      select:"Pilih semua file yang diperlukan",command:"Klik kanan pada file yang dipilih",destinationOpen:"Pilih perintah Compress / Send to ZIP",
      destinationPrepare:"Tentukan nama arsip ZIP",execute:"Jalankan proses kompresi",wait:"Tunggu arsip selesai dibuat",
      verifyCount:"Pastikan file ZIP muncul di folder",verifyContent:"Buka arsip ZIP untuk melihat isinya",
      cleanup1:"Bandingkan isi ZIP dengan file sumber",cleanup2:"Tutup jendela arsip",finalCheck:"Periksa ukuran dan nama file ZIP",
      finish:"Simpan arsip pada lokasi yang ditentukan"
    }),
    fileScenario("extract-zip","Mengekstrak Arsip ZIP",{
      goal:"Susun langkah mengekstrak file ZIP ke folder baru.",
      sourceOpen:"Buka folder yang berisi file ZIP",sourceCheck:"Pilih arsip ZIP yang akan diekstrak",
      select:"Klik kanan pada file ZIP",command:"Pilih Extract All",destinationOpen:"Tentukan folder tujuan ekstraksi",
      destinationPrepare:"Buat folder tujuan jika belum tersedia",execute:"Klik Extract",wait:"Tunggu proses ekstraksi selesai",
      verifyCount:"Buka folder hasil ekstraksi",verifyContent:"Periksa file hasil ekstraksi",
      cleanup1:"Buka satu file contoh",cleanup2:"Tutup file contoh setelah berhasil",finalCheck:"Pastikan semua file yang dibutuhkan tersedia",
      finish:"Tutup jendela hasil ekstraksi"
    }),
    fileScenario("move-project","Memindahkan File Proyek ke Folder Kelas",{
      goal:"Susun langkah memindahkan file proyek ke folder kelas yang benar.",
      sourceOpen:"Buka folder tempat file proyek tersimpan",sourceCheck:"Periksa nama dan versi file proyek",
      select:"Pilih file proyek yang benar",command:"Potong file proyek",destinationOpen:"Buka folder Kelas",
      destinationPrepare:"Buka subfolder mata pelajaran Informatika",execute:"Tempel file proyek",wait:"Tunggu proses pemindahan selesai",
      verifyCount:"Pastikan file tidak lagi berada di folder sumber",verifyContent:"Pastikan file sudah muncul di folder tujuan",
      cleanup1:"Buka file untuk memastikan tidak rusak",cleanup2:"Tutup file setelah diperiksa",finalCheck:"Periksa kembali nama file dan lokasi folder",
      finish:"Tutup File Explorer"
    }),

    // 16–20: komunikasi
    communicationScenario("email-attachment","Mengirim Email dengan Lampiran",{
      goal:"Susun proses mengirim email beserta file lampiran.",service:"layanan email sekolah",
      login:"Login menggunakan akun sekolah",start:"Klik Tulis / Compose",recipient:"Masukkan alamat email penerima",
      subject:"Ketik subjek email",body:"Tulis isi pesan",extraOpen:"Klik Lampirkan File",extraSelect:"Pilih file yang akan dilampirkan",
      extraWait:"Tunggu lampiran selesai diunggah",reviewRecipient:"Periksa kembali alamat penerima",reviewContent:"Baca ulang isi dan lampiran",
      send:"Klik Kirim / Send",wait:"Tunggu notifikasi pengiriman",verify:"Buka folder Terkirim dan pastikan email ada",
      finish:"Tutup atau logout dari email"
    }),
    communicationScenario("class-chat-file","Mengirim File ke Grup Kelas",{
      goal:"Susun proses membagikan file ke grup kelas yang tepat.",service:"aplikasi pesan kelas",
      login:"Masuk menggunakan akun sekolah",start:"Buka daftar percakapan",recipient:"Pilih grup kelas yang benar",
      subject:"Baca pesan terakhir agar memahami konteks",body:"Ketik keterangan singkat untuk file",extraOpen:"Klik ikon Lampiran",
      extraSelect:"Pilih file yang akan dibagikan",extraWait:"Tunggu file selesai dimuat",reviewRecipient:"Pastikan nama grup kelas benar",
      reviewContent:"Periksa nama file dan keterangan",send:"Klik Kirim",wait:"Tunggu tanda pesan berhasil terkirim",
      verify:"Pastikan file muncul di percakapan",finish:"Tutup percakapan setelah selesai"
    }),
    communicationScenario("calendar-event","Membuat Jadwal di Kalender Digital",{
      goal:"Susun langkah membuat jadwal tugas atau pertemuan di kalender digital.",service:"kalender digital",
      login:"Masuk menggunakan akun sekolah",start:"Klik Buat Acara",recipient:"Tentukan judul acara",
      subject:"Pilih tanggal acara",body:"Tentukan jam mulai dan selesai",extraOpen:"Tambahkan deskripsi kegiatan",
      extraSelect:"Tambahkan pengingat",extraWait:"Tambahkan peserta jika diperlukan",reviewRecipient:"Periksa tanggal dan zona waktu",
      reviewContent:"Baca ulang judul serta deskripsi acara",send:"Klik Simpan",wait:"Tunggu acara dibuat",
      verify:"Buka tanggal tersebut dan pastikan acara tampil",finish:"Tutup kalender"
    }),
    communicationScenario("meeting-invite","Mengirim Undangan Pertemuan Daring",{
      goal:"Susun langkah membuat dan mengirim undangan pertemuan daring.",service:"layanan konferensi daring",
      login:"Masuk dengan akun sekolah",start:"Pilih Buat Pertemuan",recipient:"Ketik judul pertemuan",
      subject:"Tentukan tanggal dan waktu",body:"Tambahkan deskripsi singkat",extraOpen:"Tambahkan peserta",
      extraSelect:"Masukkan alamat email peserta",extraWait:"Buat tautan pertemuan",reviewRecipient:"Periksa daftar peserta",
      reviewContent:"Periksa waktu dan tautan pertemuan",send:"Klik Simpan dan Kirim Undangan",wait:"Tunggu notifikasi undangan terkirim",
      verify:"Periksa jadwal pertemuan pada kalender",finish:"Salin tautan jika diperlukan"
    }),
    communicationScenario("share-folder","Membagikan Folder Cloud kepada Teman",{
      goal:"Susun langkah membagikan folder cloud dengan izin yang tepat.",service:"penyimpanan cloud sekolah",
      login:"Masuk menggunakan akun sekolah",start:"Buka folder yang akan dibagikan",recipient:"Klik tombol Bagikan / Share",
      subject:"Masukkan alamat email teman",body:"Pilih tingkat akses Viewer atau Editor",extraOpen:"Tambahkan pesan singkat",
      extraSelect:"Periksa daftar penerima",extraWait:"Tunggu sistem memvalidasi alamat penerima",reviewRecipient:"Pastikan tidak ada alamat yang salah",
      reviewContent:"Pastikan tingkat akses sudah sesuai",send:"Klik Kirim",wait:"Tunggu notifikasi berbagi berhasil",
      verify:"Buka pengaturan berbagi dan periksa nama penerima",finish:"Tutup pengaturan berbagi"
    }),

    // 21–25: keamanan digital
    securityScenario("verify-phishing","Memeriksa Pesan yang Diduga Phishing",{
      goal:"Susun proses memeriksa pesan mencurigakan tanpa mengambil risiko.",
      start:"Jangan klik tautan pada pesan yang mencurigakan",observe:"Baca isi pesan tanpa membuka lampiran",
      source:"Periksa nama dan alamat pengirim",check1:"Perhatikan bahasa mendesak atau ancaman pada pesan",
      check2:"Bandingkan alamat tautan dengan domain resmi",openOfficial:"Buka situs resmi melalui alamat yang diketik sendiri",
      loginOfficial:"Masuk ke akun dari situs resmi bila perlu",securityMenu:"Buka pusat keamanan atau notifikasi akun",
      action1:"Periksa apakah ada pemberitahuan resmi yang sama",action2:"Ubah password jika akun diduga terancam",
      confirm:"Simpan perubahan keamanan",review:"Periksa aktivitas login terbaru",report:"Laporkan pesan sebagai phishing",
      save:"Simpan bukti seperlunya",verify:"Pastikan pesan sudah ditandai atau diblokir",finish:"Beritahu guru jika pesan berkaitan dengan akun sekolah"
    }),
    securityScenario("change-password","Mengganti Password Akun Sekolah",{
      goal:"Susun langkah mengganti password dengan aman melalui situs resmi.",
      start:"Buka situs resmi akun sekolah",observe:"Pastikan alamat situs menggunakan domain resmi",
      source:"Login menggunakan akun sendiri",check1:"Buka menu Profil atau Akun",check2:"Pilih Keamanan",
      openOfficial:"Buka menu Ubah Password",loginOfficial:"Masukkan password lama",securityMenu:"Buat password baru yang kuat",
      action1:"Ketik ulang password baru",action2:"Pastikan password baru tidak sama dengan akun lain",
      confirm:"Klik Simpan Perubahan",review:"Tunggu konfirmasi password berhasil diubah",report:"Periksa sesi login aktif",
      save:"Keluar dari sesi yang tidak dikenal",verify:"Login kembali menggunakan password baru",finish:"Simpan password dengan cara yang aman tanpa membagikannya"
    }),
    securityScenario("enable-2fa","Mengaktifkan Verifikasi Dua Langkah",{
      goal:"Susun proses mengaktifkan verifikasi dua langkah untuk akun.",
      start:"Buka situs resmi akun",observe:"Login menggunakan username dan password",
      source:"Buka pengaturan akun",check1:"Pilih menu Keamanan",check2:"Cari Verifikasi Dua Langkah",
      openOfficial:"Klik Aktifkan",loginOfficial:"Konfirmasi password akun",securityMenu:"Pilih metode verifikasi yang tersedia",
      action1:"Ikuti langkah menghubungkan metode verifikasi",action2:"Masukkan kode verifikasi yang diterima",
      confirm:"Klik Konfirmasi",review:"Simpan kode pemulihan di tempat aman",report:"Periksa perangkat tepercaya",
      save:"Simpan pengaturan keamanan",verify:"Logout lalu login kembali untuk menguji verifikasi",finish:"Pastikan kode verifikasi tidak dibagikan kepada siapa pun"
    }),
    securityScenario("review-permissions","Meninjau Izin Aplikasi pada Akun",{
      goal:"Susun langkah memeriksa dan mencabut izin aplikasi yang tidak diperlukan.",
      start:"Buka halaman resmi pengaturan akun",observe:"Login ke akun sendiri",
      source:"Buka menu Keamanan dan Privasi",check1:"Pilih daftar Aplikasi Terhubung",check2:"Baca nama setiap aplikasi",
      openOfficial:"Pilih aplikasi yang tidak lagi digunakan",loginOfficial:"Periksa jenis akses yang dimiliki aplikasi",securityMenu:"Tentukan apakah akses masih diperlukan",
      action1:"Klik Hapus Akses jika tidak diperlukan",action2:"Konfirmasi pencabutan izin",
      confirm:"Kembali ke daftar aplikasi",review:"Periksa aplikasi lain satu per satu",report:"Catat aplikasi yang tidak dikenal",
      save:"Ubah password bila menemukan akses mencurigakan",verify:"Pastikan aplikasi yang dicabut sudah hilang dari daftar",finish:"Tutup pengaturan akun"
    }),
    securityScenario("report-account","Melaporkan Akun Mencurigakan",{
      goal:"Susun proses mengumpulkan bukti seperlunya dan melaporkan akun mencurigakan.",
      start:"Jangan membalas pesan dari akun mencurigakan",observe:"Buka profil akun tanpa mengklik tautan di bio",
      source:"Periksa nama pengguna dan informasi profil",check1:"Catat perilaku yang dianggap mencurigakan",check2:"Ambil tangkapan layar bila diperlukan",
      openOfficial:"Buka menu Laporkan pada platform",loginOfficial:"Pilih alasan pelaporan yang sesuai",securityMenu:"Tambahkan keterangan singkat jika diminta",
      action1:"Periksa kembali bukti yang akan dikirim",action2:"Kirim laporan",
      confirm:"Tunggu konfirmasi laporan diterima",review:"Blokir akun jika diperlukan",report:"Beritahu guru jika akun menghubungi siswa sekolah",
      save:"Simpan bukti sampai laporan ditangani",verify:"Pastikan akun sudah diblokir atau dibatasi",finish:"Jangan menyebarkan ulang konten mencurigakan"
    }),

    // 26–30: coding / logika
    codeScenario("python-basic","Menjalankan Program Python Sederhana",{
      goal:"Susun proses menulis, menjalankan, memperbaiki, dan menyimpan program Python.",app:"editor Python",
      newProject:"Buat file Python baru",nameProject:"Simpan sementara dengan nama latihan.py",prepare:"Letakkan kursor pada editor kode",
      step1:"Ketik variabel nama",step2:"Ketik perintah input sederhana",step3:"Ketik perintah print untuk menampilkan hasil",step4:"Periksa indentasi dan tanda petik",
      run:"Jalankan program",observe:"Amati keluaran pada terminal",findBug:"Cari baris yang salah jika muncul error",
      fixBug:"Perbaiki kesalahan kode",runAgain:"Jalankan program kembali",verify:"Pastikan keluaran sesuai instruksi",
      save:"Simpan file Python",finish:"Tutup editor setelah file tersimpan"
    }),
    codeScenario("html-page","Membuat Halaman HTML Dasar",{
      goal:"Susun proses membuat halaman HTML, menguji, memperbaiki, lalu menyimpannya.",app:"editor kode",
      newProject:"Buat file baru",nameProject:"Simpan dengan nama index.html",prepare:"Ketik struktur dasar HTML",
      step1:"Tambahkan tag title",step2:"Tambahkan heading pada body",step3:"Tambahkan satu paragraf",step4:"Simpan perubahan",
      run:"Buka index.html pada browser",observe:"Periksa tampilan halaman",findBug:"Cari tag yang belum ditutup jika tampilan salah",
      fixBug:"Perbaiki struktur tag HTML",runAgain:"Muat ulang halaman browser",verify:"Pastikan heading dan paragraf tampil benar",
      save:"Simpan perubahan terakhir",finish:"Tutup editor dan browser setelah selesai"
    }),
    codeScenario("scratch-animation","Membuat Animasi Sederhana di Scratch",{
      goal:"Susun langkah membuat animasi sprite sederhana dan mengujinya.",app:"Scratch",
      newProject:"Buat proyek baru",nameProject:"Beri nama proyek Animasi Pertama",prepare:"Pilih sprite yang akan digunakan",
      step1:"Tambahkan blok ketika bendera hijau diklik",step2:"Tambahkan blok gerak",step3:"Tambahkan blok tunggu",step4:"Tambahkan blok berkata",
      run:"Klik bendera hijau",observe:"Amati gerakan sprite",findBug:"Periksa urutan blok jika animasi tidak sesuai",
      fixBug:"Susun ulang blok yang keliru",runAgain:"Klik bendera hijau kembali",verify:"Pastikan sprite bergerak sesuai rencana",
      save:"Simpan proyek",finish:"Tutup proyek setelah tersimpan"
    }),
    codeScenario("flowchart","Membuat Flowchart Keputusan Sederhana",{
      goal:"Susun proses membuat flowchart dari mulai sampai keputusan dan hasil.",app:"aplikasi diagram",
      newProject:"Buat diagram baru",nameProject:"Beri nama Flowchart Kelulusan",prepare:"Tambahkan simbol Mulai",
      step1:"Tambahkan simbol Input Nilai",step2:"Tambahkan simbol keputusan Nilai ≥ 75",step3:"Buat cabang Ya dan Tidak",step4:"Tambahkan keluaran Lulus dan Remedial",
      run:"Hubungkan semua simbol dengan panah",observe:"Baca alur dari Mulai",findBug:"Cari panah yang menuju simbol yang salah",
      fixBug:"Perbaiki koneksi yang keliru",runAgain:"Telusuri kembali kedua cabang",verify:"Pastikan kedua cabang berakhir dengan jelas",
      save:"Simpan diagram",finish:"Ekspor diagram jika diminta"
    }),
    codeScenario("pseudocode-test","Menguji Pseudocode Menghitung Rata-Rata",{
      goal:"Susun proses menulis pseudocode, menguji data contoh, dan memperbaiki logika.",app:"editor teks",
      newProject:"Buat dokumen pseudocode baru",nameProject:"Ketik judul Algoritma Rata-Rata",prepare:"Tuliskan langkah Mulai",
      step1:"Tuliskan input tiga nilai",step2:"Tuliskan proses menjumlahkan nilai",step3:"Tuliskan proses membagi jumlah dengan tiga",step4:"Tuliskan output rata-rata dan Selesai",
      run:"Gunakan tiga angka contoh untuk menguji pseudocode",observe:"Hitung hasil mengikuti setiap langkah",findBug:"Bandingkan hasil dengan perhitungan manual",
      fixBug:"Perbaiki langkah jika hasil berbeda",runAgain:"Uji dengan data contoh lain",verify:"Pastikan hasil kedua pengujian benar",
      save:"Simpan dokumen pseudocode",finish:"Tutup dokumen"
    }),

    // 31–35: multimedia
    mediaScenario("crop-image","Memotong dan Menyimpan Foto",{
      goal:"Susun langkah memotong foto lalu mengekspor hasilnya.",app:"editor gambar",
      import:"Buka foto yang akan diedit",select:"Pilih alat Crop",edit1:"Atur area potongan",edit2:"Pastikan objek utama berada di dalam area",
      adjust:"Terapkan Crop",add:"Atur kecerahan seperlunya",position:"Periksa komposisi gambar",review:"Bandingkan dengan gambar awal",
      preview:"Perbesar tampilan untuk memeriksa detail",exportOpen:"Buka menu Export",exportOption:"Pilih format JPG atau PNG",
      exportName:"Ketik nama file baru",exportRun:"Klik Export",verify:"Buka file hasil ekspor",finish:"Pastikan foto tidak terpotong secara keliru"
    }),
    mediaScenario("poster-design","Membuat Poster Digital Sederhana",{
      goal:"Susun langkah membuat poster dari kanvas kosong sampai diekspor.",app:"aplikasi desain",
      import:"Buat desain poster baru",select:"Pilih ukuran poster",edit1:"Tambahkan judul utama",edit2:"Tambahkan teks informasi",
      adjust:"Pilih ukuran huruf yang mudah dibaca",add:"Tambahkan gambar atau ikon pendukung",position:"Atur posisi semua elemen",
      review:"Periksa jarak dan keseimbangan elemen",preview:"Tinjau poster dalam ukuran penuh",exportOpen:"Klik Download / Export",
      exportOption:"Pilih format PNG",exportName:"Ketik nama file poster",exportRun:"Mulai unduhan",verify:"Buka poster yang telah diunduh",finish:"Pastikan seluruh teks terbaca"
    }),
    mediaScenario("record-audio","Merekam dan Menyimpan Audio",{
      goal:"Susun langkah merekam suara, memeriksa, lalu menyimpan hasil rekaman.",app:"aplikasi perekam suara",
      import:"Pilih mikrofon yang akan digunakan",select:"Periksa indikator input mikrofon",edit1:"Klik Record",edit2:"Mulai berbicara sesuai naskah",
      adjust:"Jaga jarak suara dari mikrofon",add:"Klik Stop setelah selesai",position:"Putar hasil rekaman",
      review:"Dengarkan apakah suara terdengar jelas",preview:"Ulangi rekaman jika ada bagian yang tidak jelas",exportOpen:"Buka menu Simpan",
      exportOption:"Pilih format audio yang tersedia",exportName:"Ketik nama file audio",exportRun:"Klik Save",verify:"Putar file hasil simpan",finish:"Pastikan durasi dan suara sesuai"
    }),
    mediaScenario("trim-video","Memotong Video Pendek",{
      goal:"Susun langkah memotong bagian awal dan akhir video lalu mengekspornya.",app:"editor video",
      import:"Impor video sumber",select:"Tarik video ke timeline",edit1:"Tentukan titik awal yang diperlukan",edit2:"Potong bagian sebelum titik awal",
      adjust:"Tentukan titik akhir yang diperlukan",add:"Potong bagian setelah titik akhir",position:"Rapikan posisi klip pada timeline",
      review:"Putar video dari awal",preview:"Periksa transisi awal dan akhir",exportOpen:"Buka menu Export",
      exportOption:"Pilih resolusi yang sesuai",exportName:"Ketik nama file video",exportRun:"Mulai ekspor",verify:"Putar file hasil ekspor",finish:"Pastikan bagian yang tidak diperlukan sudah hilang"
    }),
    mediaScenario("scan-document","Memindai Dokumen Menjadi Gambar/PDF",{
      goal:"Susun proses memindai dokumen sampai file hasil scan tersimpan dan terbaca.",app:"aplikasi pemindai",
      import:"Letakkan dokumen pada pemindai",select:"Pilih sumber scanner",edit1:"Pilih jenis warna",edit2:"Pilih ukuran halaman",
      adjust:"Jalankan Preview Scan",add:"Atur area pemindaian",position:"Luruskan area dokumen bila perlu",
      review:"Periksa apakah seluruh halaman masuk",preview:"Jalankan Scan",exportOpen:"Buka pilihan penyimpanan",
      exportOption:"Pilih PDF atau gambar",exportName:"Ketik nama file scan",exportRun:"Simpan hasil scan",verify:"Buka file hasil scan",finish:"Pastikan teks dapat dibaca dengan jelas"
    }),

    // 36–40: perangkat
    deviceScenario("wifi-connect","Menghubungkan Komputer ke Wi-Fi",{
      goal:"Susun proses menghubungkan komputer ke jaringan Wi-Fi yang benar.",
      prepare1:"Nyalakan komputer",prepare2:"Pastikan adaptor Wi-Fi tersedia",openSettings:"Buka pengaturan jaringan",
      openMenu:"Pilih menu Wi-Fi",enable:"Aktifkan Wi-Fi",search:"Tunggu daftar jaringan muncul",select:"Pilih nama jaringan sekolah",
      auth:"Masukkan password Wi-Fi jika diminta",connect:"Klik Connect",wait:"Tunggu proses koneksi",
      test1:"Periksa ikon jaringan",test2:"Buka browser untuk menguji koneksi",adjust:"Muat satu halaman web",
      save:"Pilih Remember Network jika diizinkan",verify:"Pastikan status jaringan Connected",finish:"Tutup pengaturan jaringan"
    }),
    deviceScenario("bluetooth-pair","Memasangkan Perangkat Bluetooth",{
      goal:"Susun langkah memasangkan komputer dengan perangkat Bluetooth.",
      prepare1:"Nyalakan komputer",prepare2:"Nyalakan perangkat Bluetooth tujuan",openSettings:"Buka Settings",
      openMenu:"Pilih Bluetooth & Devices",enable:"Aktifkan Bluetooth",search:"Klik Add Device",select:"Pilih nama perangkat tujuan",
      auth:"Konfirmasi kode pasangan jika muncul",connect:"Klik Pair / Connect",wait:"Tunggu proses pemasangan",
      test1:"Periksa status Connected",test2:"Uji perangkat sesuai fungsinya",adjust:"Atur volume atau opsi perangkat bila perlu",
      save:"Simpan perangkat sebagai perangkat tepercaya jika sesuai",verify:"Putus lalu sambungkan kembali untuk menguji",finish:"Tutup Settings"
    }),
    deviceScenario("printer-setup","Menghubungkan Printer ke Komputer",{
      goal:"Susun langkah menambahkan printer dan menguji hasil cetak.",
      prepare1:"Nyalakan komputer",prepare2:"Nyalakan printer",openSettings:"Hubungkan printer melalui kabel atau jaringan",
      openMenu:"Buka Settings lalu Printers & Scanners",enable:"Klik Add Device",search:"Tunggu printer terdeteksi",
      select:"Pilih nama printer yang benar",auth:"Klik Add Device",connect:"Tunggu instalasi printer",
      wait:"Pastikan printer berstatus Ready",test1:"Buka pengaturan printer",test2:"Pilih Print Test Page",
      adjust:"Atur printer default jika diperlukan",save:"Simpan pengaturan",verify:"Periksa hasil test page",finish:"Pastikan printer siap digunakan"
    }),
    deviceScenario("projector-setup","Menghubungkan Laptop ke Proyektor",{
      goal:"Susun proses menampilkan layar laptop pada proyektor.",
      prepare1:"Nyalakan laptop",prepare2:"Nyalakan proyektor",openSettings:"Hubungkan kabel HDMI atau perangkat nirkabel",
      openMenu:"Pilih input yang sesuai pada proyektor",enable:"Buka pengaturan Display pada laptop",search:"Tunggu layar kedua terdeteksi",
      select:"Pilih mode Duplicate",auth:"Konfirmasi perubahan tampilan",connect:"Buka materi presentasi",
      wait:"Tunggu gambar muncul pada layar proyektor",test1:"Periksa ketajaman tampilan",test2:"Periksa apakah seluruh layar terlihat",
      adjust:"Atur resolusi jika tampilan terpotong",save:"Simpan pengaturan tampilan",verify:"Jalankan satu slide untuk menguji",finish:"Pastikan presentasi siap dimulai"
    }),
    deviceScenario("software-update","Memperbarui Aplikasi Secara Aman",{
      goal:"Susun langkah memperbarui aplikasi melalui sumber resmi.",
      prepare1:"Hubungkan komputer ke internet",prepare2:"Simpan pekerjaan yang sedang dibuka",openSettings:"Buka aplikasi yang akan diperbarui",
      openMenu:"Buka menu Help atau Settings",enable:"Pilih Check for Updates",search:"Tunggu pemeriksaan versi",
      select:"Baca informasi versi baru",auth:"Pastikan pembaruan berasal dari aplikasi resmi",connect:"Klik Download / Update",
      wait:"Tunggu unduhan pembaruan selesai",test1:"Izinkan instalasi jika diminta",test2:"Tunggu instalasi selesai",
      adjust:"Restart aplikasi jika diperlukan",save:"Buka kembali aplikasi",verify:"Periksa nomor versi terbaru",finish:"Pastikan aplikasi dapat digunakan normal"
    }),

    // 41–45: data / spreadsheet
    dataScenario("sort-data","Mengurutkan Data di Spreadsheet",{
      goal:"Susun langkah mengurutkan data tanpa merusak hubungan antarbaris.",app:"spreadsheet",
      open:"Buka file data",inspect:"Periksa judul kolom dan isi tabel",select:"Klik satu sel di dalam tabel",
      menu:"Buka menu Data",option1:"Pilih Sort",option2:"Pilih kolom yang menjadi dasar pengurutan",
      execute:"Pilih urutan A–Z atau Z–A lalu jalankan",observe:"Periksa hasil pengurutan",check1:"Pastikan setiap baris tetap utuh",
      correct:"Undo jika baris menjadi tidak sesuai",check2:"Ulangi Sort dengan rentang yang benar",format:"Periksa kembali data teratas dan terbawah",
      save:"Simpan file",reopen:"Tutup lalu buka kembali file",verify:"Pastikan urutan data tetap tersimpan"
    }),
    dataScenario("filter-data","Menyaring Data dengan Filter",{
      goal:"Susun langkah menampilkan hanya data yang memenuhi kriteria.",app:"spreadsheet",
      open:"Buka file data",inspect:"Periksa judul kolom",select:"Pilih seluruh tabel atau satu sel pada tabel",
      menu:"Buka menu Data",option1:"Aktifkan Filter",option2:"Klik tombol filter pada kolom yang dipilih",
      execute:"Pilih kriteria yang ingin ditampilkan",observe:"Periksa baris yang masih terlihat",check1:"Pastikan data yang tampil memenuhi kriteria",
      correct:"Ubah kriteria jika hasil belum sesuai",check2:"Bersihkan filter untuk menampilkan semua data",format:"Aktifkan kembali filter yang benar",
      save:"Simpan file jika diperlukan",reopen:"Periksa jumlah baris hasil filter",verify:"Pastikan hasil sesuai pertanyaan"
    }),
    dataScenario("make-chart","Membuat Grafik dari Data",{
      goal:"Susun langkah membuat grafik yang sesuai dari tabel spreadsheet.",app:"spreadsheet",
      open:"Buka file yang berisi tabel",inspect:"Periksa kolom kategori dan nilai",select:"Blok data yang akan dibuat grafik",
      menu:"Buka menu Insert",option1:"Pilih Chart / Grafik",option2:"Pilih jenis grafik yang sesuai",
      execute:"Buat grafik",observe:"Periksa kategori dan nilai pada grafik",check1:"Pastikan judul grafik sesuai",
      correct:"Perbaiki rentang data jika grafik salah",check2:"Tambahkan label data jika diperlukan",format:"Atur ukuran grafik agar mudah dibaca",
      save:"Simpan file",reopen:"Buka kembali file",verify:"Pastikan grafik tetap tampil dengan data yang benar"
    }),
    dataScenario("vlookup-data","Menggunakan VLOOKUP untuk Mencari Data",{
      goal:"Susun langkah menggunakan tabel referensi untuk mengambil data.",app:"spreadsheet",
      open:"Buka file latihan VLOOKUP",inspect:"Periksa tabel referensi dan nilai pencarian",select:"Klik sel tempat hasil akan ditampilkan",
      menu:"Ketik =VLOOKUP(",option1:"Pilih sel nilai pencarian",option2:"Pilih rentang tabel referensi",
      execute:"Masukkan nomor kolom dan FALSE lalu tutup kurung",observe:"Tekan Enter",check1:"Periksa hasil yang muncul",
      correct:"Periksa kembali rumus jika muncul error",check2:"Perbaiki referensi atau nomor kolom",format:"Salin rumus jika diperlukan",
      save:"Simpan file",reopen:"Buka kembali lembar kerja",verify:"Pastikan hasil pencarian tetap benar"
    }),
    dataScenario("remove-duplicates","Menghapus Data Duplikat",{
      goal:"Susun proses menghapus data duplikat sambil menjaga data asli tetap aman.",app:"spreadsheet",
      open:"Buka file data",inspect:"Amati kolom yang mungkin memiliki data ganda",select:"Buat salinan sheet sebagai cadangan",
      menu:"Pilih tabel pada sheet salinan",option1:"Buka menu Data",option2:"Pilih Remove Duplicates",
      execute:"Pilih kolom yang digunakan untuk menentukan duplikat",observe:"Jalankan penghapusan duplikat",check1:"Baca jumlah data yang dihapus",
      correct:"Bandingkan jumlah baris dengan sheet cadangan",check2:"Undo jika kolom kriteria salah",format:"Ulangi dengan kolom yang tepat bila diperlukan",
      save:"Simpan file",reopen:"Buka kembali file",verify:"Pastikan data unik tetap lengkap"
    }),

    // 46–50: alur kegiatan sekolah
    schoolScenario("online-quiz","Mengerjakan Kuis Daring",{
      goal:"Susun langkah mengerjakan kuis daring sampai jawaban berhasil dikirim.",
      open:"Buka portal pembelajaran sekolah",login:"Login menggunakan akun siswa",dashboard:"Buka kelas Informatika",
      menu:"Pilih menu Kuis",item:"Buka kuis yang sedang aktif",read:"Baca petunjuk dan batas waktu",
      prepare:"Klik Mulai Kuis",input1:"Baca soal pertama dan pilih jawaban",input2:"Kerjakan soal berikutnya sampai selesai",
      review:"Gunakan halaman ringkasan untuk memeriksa jawaban",action:"Klik Kirim Jawaban",wait:"Tunggu proses pengiriman",
      confirm:"Konfirmasi pengiriman jika diminta",status:"Pastikan status kuis Selesai",record:"Catat nilai jika langsung ditampilkan",
      finish:"Kembali ke halaman kelas"
    }),
    schoolScenario("join-class","Bergabung ke Kelas Daring",{
      goal:"Susun langkah masuk ke kelas daring menggunakan kode kelas.",
      open:"Buka platform kelas daring",login:"Login menggunakan akun sekolah",dashboard:"Buka halaman utama kelas",
      menu:"Klik tombol Bergabung ke Kelas",item:"Siapkan kode kelas dari guru",read:"Periksa kembali kode kelas",
      prepare:"Masukkan kode kelas",input1:"Klik Gabung",input2:"Tunggu proses masuk ke kelas",
      review:"Periksa nama mata pelajaran dan guru",action:"Buka halaman Stream / Beranda",wait:"Tunggu konten kelas dimuat",
      confirm:"Periksa pengumuman terbaru",status:"Pastikan kelas muncul pada daftar kelas",record:"Simpan informasi kelas jika diperlukan",
      finish:"Tutup halaman setelah selesai"
    }),
    schoolScenario("submit-group-project","Mengumpulkan Proyek Kelompok",{
      goal:"Susun langkah menyiapkan dan mengumpulkan satu file proyek kelompok.",
      open:"Buka folder proyek kelompok",login:"Periksa versi file paling terbaru",dashboard:"Pastikan nama anggota tercantum pada proyek",
      menu:"Ubah nama file sesuai format yang diminta",item:"Buka portal pembelajaran",read:"Login dan buka tugas Proyek Kelompok",
      prepare:"Baca kembali ketentuan pengumpulan",input1:"Klik Tambah / Unggah File",input2:"Pilih file proyek kelompok",
      review:"Periksa nama file yang tampil",action:"Tunggu upload selesai lalu klik Kirim",wait:"Tunggu proses pengiriman",
      confirm:"Konfirmasi penyerahan tugas",status:"Pastikan status berubah menjadi Diserahkan",record:"Ambil bukti status jika diperlukan",
      finish:"Beritahu anggota kelompok bahwa proyek sudah terkirim"
    }),
    schoolScenario("digital-attendance","Mengisi Kehadiran Digital",{
      goal:"Susun langkah mengisi presensi digital menggunakan akun sendiri.",
      open:"Buka portal presensi sekolah",login:"Login menggunakan akun siswa",dashboard:"Buka menu Kehadiran",
      menu:"Pilih tanggal hari ini",item:"Pilih mata pelajaran yang sedang berlangsung",read:"Baca aturan presensi",
      prepare:"Klik Isi Kehadiran",input1:"Pilih status Hadir",input2:"Isi keterangan jika diminta",
      review:"Periksa nama, kelas, dan tanggal",action:"Klik Simpan Presensi",wait:"Tunggu proses penyimpanan",
      confirm:"Baca notifikasi presensi berhasil",status:"Buka riwayat kehadiran",record:"Pastikan kehadiran hari ini tercatat",
      finish:"Logout jika menggunakan komputer bersama"
    }),
    schoolScenario("qr-resource","Mengakses Materi dari QR Code",{
      goal:"Susun langkah memindai QR materi sekolah dan memastikan sumbernya aman.",
      open:"Buka aplikasi pemindai QR pada perangkat",login:"Arahkan kamera ke QR yang diberikan guru",dashboard:"Tunggu tautan terbaca",
      menu:"Periksa alamat situs pada hasil pemindaian",item:"Pastikan domain sesuai sumber sekolah atau sumber yang dijelaskan guru",
      read:"Buka tautan jika alamat sudah benar",prepare:"Tunggu halaman materi selesai dimuat",input1:"Baca judul materi",
      input2:"Periksa apakah materi sesuai dengan pelajaran",review:"Gunakan menu materi untuk menemukan bagian yang diminta",
      action:"Buka atau unduh sumber yang ditugaskan",wait:"Tunggu proses pemuatan atau unduhan",confirm:"Buka materi yang dipilih",
      status:"Pastikan file atau halaman dapat dibaca",record:"Simpan materi pada folder pelajaran jika diperlukan",finish:"Tutup halaman yang tidak diperlukan"
    })
  ];

  if(SCENARIOS.length!==50) throw new Error(`Bank algoritma harus berjumlah 50, saat ini ${SCENARIOS.length}.`);

  const GAME = {
    panel:null, student:null, groupIndex:0, groupNo:1, slot:0, members:[],
    scenario:null, steps:[], assigned:[], board:{}, meta:{}, chat:[], selected:null,
    demo:false, completed:false, lastHint:"Belum diuji.", rootRef:null,
    teacherMonitor:{className:null,groupNo:1,groupRef:null,countRefs:[],counts:[0,0,0,0,0],messages:[],groupMeta:{}}
  };

  const CSS = `
    .alg-team-shell{padding:0 0 28px;background:#f8fafc;min-height:100%}
    .alg-team-body{padding:22px;display:grid;grid-template-columns:minmax(0,1fr) 315px;gap:18px}
    .alg-card{background:#fff;border:1px solid #dbe4f0;border-radius:18px;box-shadow:0 10px 30px rgba(15,23,42,.05)}
    .alg-hero{padding:18px 20px;margin-bottom:16px;background:linear-gradient(135deg,#eef2ff,#f5f3ff);border:1px solid #c7d2fe;border-radius:18px}
    .alg-hero h3{margin:0 0 7px;font-size:22px;color:#312e81}.alg-hero p{margin:0;color:#475569;line-height:1.55}
    .alg-badges{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}.alg-badge{padding:7px 10px;border-radius:999px;background:#fff;border:1px solid #c7d2fe;font-size:12px;font-weight:800;color:#4338ca}
    .alg-section{padding:18px;margin-bottom:16px}.alg-section-head{display:flex;justify-content:space-between;gap:12px;align-items:flex-start;margin-bottom:12px}.alg-section h4{margin:0;color:#0f172a;font-size:17px}.alg-section p{margin:4px 0 0;color:#64748b;font-size:13px;line-height:1.45}
    .alg-my-cards{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
    .alg-my-card{border:2px solid #c7d2fe;background:#eef2ff;border-radius:14px;padding:13px;cursor:pointer;transition:.18s;text-align:left;color:#1e293b}
    .alg-my-card:hover{transform:translateY(-1px);border-color:#6366f1}.alg-my-card.selected{border-color:#4f46e5;background:#e0e7ff;box-shadow:0 0 0 3px rgba(99,102,241,.12)}
    .alg-my-card.placed{opacity:.45;cursor:default}.alg-my-card b{display:block;color:#4338ca;font-size:11px;margin-bottom:5px}.alg-my-card span{font-weight:750;line-height:1.35}
    .alg-board{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}
    .alg-slot{min-height:72px;border:1.5px dashed #94a3b8;background:#f8fafc;border-radius:12px;padding:9px;display:grid;grid-template-columns:30px 1fr;gap:8px;align-items:center;cursor:pointer}
    .alg-slot:hover{border-color:#6366f1;background:#f5f3ff}.alg-slot.filled{border-style:solid;background:#fff}.alg-slot.mine{border-color:#818cf8;background:#eef2ff}.alg-slot.correct-final{border-color:#22c55e;background:#f0fdf4}
    .alg-slot-no{width:28px;height:28px;border-radius:9px;background:#e2e8f0;display:grid;place-items:center;font-weight:900;color:#475569}.alg-slot.mine .alg-slot-no{background:#4f46e5;color:#fff}
    .alg-slot-text{font-size:12px;font-weight:750;line-height:1.35;color:#1e293b}.alg-slot-owner{display:block;font-size:10px;font-weight:600;color:#64748b;margin-top:3px}
    .alg-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:14px}.alg-btn{border:0;border-radius:12px;padding:11px 15px;font-weight:850;cursor:pointer}
    .alg-btn.primary{background:#4f46e5;color:#fff}.alg-btn.secondary{background:#e2e8f0;color:#334155}.alg-btn.success{background:#16a34a;color:#fff}.alg-btn:disabled{opacity:.45;cursor:not-allowed}
    .alg-feedback{margin-top:12px;padding:12px 14px;border-radius:12px;background:#fff7ed;border:1px solid #fed7aa;color:#9a3412;font-weight:700;font-size:13px}.alg-feedback.ok{background:#f0fdf4;border-color:#bbf7d0;color:#166534}
    .alg-side{display:flex;flex-direction:column;gap:14px}.alg-side-card{padding:16px}.alg-side-card h4{margin:0 0 10px}
    .alg-member{display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid #eef2f7}.alg-member:last-child{border-bottom:0}
    .alg-avatar{width:30px;height:30px;border-radius:50%;background:#e0e7ff;color:#4338ca;display:grid;place-items:center;font-weight:900}.alg-member div{min-width:0}.alg-member b{display:block;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.alg-member small{color:#64748b}
    .alg-stat-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}.alg-stat{padding:10px;border-radius:12px;background:#f8fafc;border:1px solid #e2e8f0}.alg-stat strong{display:block;font-size:20px;color:#312e81}.alg-stat span{font-size:10px;color:#64748b;font-weight:700}
    .alg-rule{font-size:12px;color:#475569;line-height:1.55}.alg-rule b{color:#1e293b}
    .alg-wait{padding:10px;border-radius:12px;background:#eff6ff;border:1px solid #bfdbfe;color:#1d4ed8;font-size:12px;font-weight:750;margin-top:10px}
    .alg-phase{font-size:11px;color:#64748b;margin-top:7px;padding-top:7px;border-top:1px dashed #cbd5e1}
    @media(max-width:900px){.alg-team-body{grid-template-columns:1fr}.alg-board{grid-template-columns:1fr}.alg-my-cards{grid-template-columns:1fr}}
  `;

  const safeId=s=>String(s||"").replace(/[^a-zA-Z0-9_-]/g,"_");
  const esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
  function hash(s){let h=2166136261;for(const c of String(s)){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}return Math.abs(h>>>0)}
  function injectCss(){if(document.getElementById("algTeamCss"))return;const x=document.createElement("style");x.id="algTeamCss";x.textContent=CSS;document.head.appendChild(x)}

  function seededShuffle(arr,seed){
    const a=[...arr]; let x=(seed||1)>>>0;
    const rnd=()=>{x=(Math.imul(x,1664525)+1013904223)>>>0;return x/4294967296};
    for(let i=a.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));[a[i],a[j]]=[a[j],a[i]]}
    return a;
  }


  function currentSessionId(){
    try{
      const s=JSON.parse(localStorage.getItem("kelasExcelSettings")||"{}");
      return String(s.sessionId||"default-session");
    }catch(_){
      return "default-session";
    }
  }

  function scenarioForGroup(className,groupIndex){
    const session=currentSessionId();
    const shuffled=seededShuffle(SCENARIOS,hash(`${GAME_VERSION}-${className}-${session}`));
    return shuffled[groupIndex % shuffled.length];
  }

  function getStudent(){
    const demo=(document.getElementById("studentIdentity")?.textContent||"").includes("Demonstrasi Guru");
    if(demo)return{name:"Demonstrasi Guru",className:"DEMO",demo:true};
    const name=(document.querySelector("#studentIdentity .student-hello")?.textContent||"").replace(/^Halo,\s*/,"").trim()
      || document.getElementById("studentSelect")?.value || "Siswa";
    const className=document.getElementById("classSelect")?.value || "Kelas";
    return{name,className,demo:false};
  }
  function roster(){return [...(document.getElementById("studentSelect")?.options||[])].map(o=>o.value).filter(Boolean)}

  function buildFiveGroups(names){
    const groups=Array.from({length:5},()=>[]);
    const base=Math.floor(names.length/5), rem=names.length%5;
    let cursor=0;
    for(let g=0;g<5;g++){
      const size=base+(g<rem?1:0);
      groups[g]=names.slice(cursor,cursor+size);
      cursor+=size;
    }
    return groups;
  }

  function stepsForGroup(scenario,size){
    if(size<=4)return scenario.steps.filter(x=>x.l===0);
    if(size===5)return scenario.steps.filter(x=>x.l<=1);
    return scenario.steps.filter(x=>x.l<=2);
  }

  function setup(){
    GAME.student=getStudent();GAME.demo=GAME.student.demo;
    const r=roster();
    if(GAME.demo && !r.length){
      GAME.groupIndex=0;GAME.groupNo=1;GAME.members=["Demonstrasi Guru","Anggota 2","Anggota 3","Anggota 4","Anggota 5"];
    }else{
      const groups=buildFiveGroups(r);
      let gi=groups.findIndex(g=>g.includes(GAME.student.name));
      if(gi<0)gi=0;
      GAME.groupIndex=gi;GAME.groupNo=gi+1;GAME.members=groups[gi];
    }
    GAME.slot=Math.max(0,GAME.members.indexOf(GAME.student.name));
    GAME.scenario=scenarioForGroup(GAME.student.className,GAME.groupIndex);
    GAME.steps=stepsForGroup(GAME.scenario,GAME.members.length);

    const ids=GAME.steps.map((_,i)=>i);
    const shuffled=seededShuffle(ids,hash(`${GAME_VERSION}-${GAME.student.className}-${GAME.groupNo}-${GAME.scenario.id}`));
    GAME.assigned=shuffled.slice(GAME.slot*4,GAME.slot*4+4).sort((a,b)=>hash(`${a}-card`)-hash(`${b}-card`));
  }

  function occupied(){return new Set(Object.values(GAME.board).map(x=>Number(x.stepId)))}
  function mineStats(){return GAME.meta?.members?.[safeId(GAME.student.name)]||{}}
  function currentPhase(index){
    const n=GAME.steps.length, phase=Math.min(4,Math.floor(index/(n/5)));
    return GAME.scenario.phases[phase]||"bagian akhir algoritma";
  }


  function formatClock(ts){
    const d=new Date(Number(ts)||Date.now());
    const hh=String(d.getHours()).padStart(2,"0");
    const mm=String(d.getMinutes()).padStart(2,"0");
    return `${hh}.${mm}`;
  }


  function memberIndexByName(name,members=GAME.members){
    const idx=(members||[]).indexOf(name);
    return idx>=0?idx:0;
  }
  function memberLabelByName(name,members=GAME.members){
    const idx=memberIndexByName(name,members);
    return `Anggota ${idx+1}`;
  }

  function sendableMessage(v){
    return String(v||"").replace(/\s+/g," ").trim().slice(0,300);
  }

  function render(){
    const panel=GAME.panel;if(!panel||!panel.isConnected)return;
    const used=occupied(), mineCount=Object.values(GAME.board).filter(x=>x.owner===GAME.student.name).length;
    const full=Object.keys(GAME.board).length===GAME.steps.length, stats=mineStats();
    const header=panel.querySelector(".l2-window-header");
    const members=GAME.members.map((m,i)=>`<div class="alg-member"><span class="alg-avatar">${i+1}</span><div><b>${esc(m)}</b><small>${m===GAME.student.name?"Anda · ":""}4 kartu</small></div></div>`).join("");
    const memberStrip=GAME.members.map((m,i)=>`<div class="alg-member-chip member-${i}"><span class="alg-avatar">${i+1}</span><div><b>${esc(m)}</b><small>${m===GAME.student.name?"Anda · ":""}Anggota ${i+1} · 4 kartu</small></div></div>`).join("");
    const chatHtml=(GAME.chat||[]).length
      ? GAME.chat.map(msg=>{
          const mi=memberIndexByName(msg.name);
          return `<div class="alg-msg member-${mi} ${msg.name===GAME.student.name?"mine":""}"><div class="alg-msg-meta"><div><b>${esc(msg.name||"Anggota")}</b><span class="alg-role-label">Anggota ${mi+1}</span></div><span>${formatClock(msg.at)}</span></div><div class="alg-msg-text">${esc(msg.text||"")}</div></div>`;
        }).join("")
      : '<div class="alg-chat-empty">Belum ada pesan. Gunakan chat ini untuk mendiskusikan urutan langkah algoritma.</div>';
    const cards=GAME.assigned.map(id=>`<button class="alg-my-card ${GAME.selected===id?"selected":""} ${used.has(id)?"placed":""}" data-card="${id}" ${used.has(id)?"disabled":""}><b>KARTU MILIK ANDA</b><span>${esc(GAME.steps[id]?.t||"")}</span></button>`).join("");
    const board=Array.from({length:GAME.steps.length},(_,i)=>{
      const x=GAME.board[i], mine=x?.owner===GAME.student.name;
      return `<div class="alg-slot ${x?"filled":""} ${mine?"mine":""} ${GAME.completed?"correct-final":""}" data-slot="${i}">
        <span class="alg-slot-no">${i+1}</span><div>${x?`<span class="alg-slot-text">${esc(GAME.steps[x.stepId]?.t||"")}</span><small class="alg-slot-owner">${mine?"Kartu Anda":`oleh ${esc(x.owner||"anggota")}`}</small>`:`<span class="alg-slot-text" style="color:#94a3b8">Klik untuk menempatkan kartu</span>`}</div>
      </div>`;
    }).join("");

    const size=GAME.members.length;
    const body=document.createElement("div");body.className="alg-team-shell";
    body.innerHTML=`<div class="alg-team-body"><main>
      <section class="alg-hero">
        <h3>🎯 Kelompok ${GAME.groupNo}: ${esc(GAME.scenario.title)}</h3>
        <p>${esc(GAME.scenario.goal)}</p>
        <div class="alg-badges">
          <span class="alg-badge">${size} anggota</span>
          <span class="alg-badge">${GAME.steps.length} langkah</span>
          <span class="alg-badge">4 kartu / siswa</span>
          <span class="alg-badge">Bank 50 algoritma</span><span class="alg-badge">Diacak tiap sesi</span>
        </div>
      </section>

      <section class="alg-card alg-member-strip">
        <div class="alg-member-strip-head">
          <h4>👥 Anggota Kelompok</h4>
          <span>${size} siswa × 4 kartu = ${GAME.steps.length} langkah</span>
        </div>
        <div class="alg-member-row">${memberStrip}</div>
      </section>

      <section class="alg-card alg-section">
        <div class="alg-section-head"><div><h4>1. Empat kartu Anda</h4><p>Jelaskan isi kartu kepada kelompok, lalu sepakati posisinya. Anggota lain tidak dapat memindahkan kartu Anda.</p></div><b>${mineCount}/4 ditempatkan</b></div>
        <div class="alg-my-cards">${cards}</div>
        ${GAME.selected!==null?'<div class="alg-wait">Kartu dipilih. Klik slot kosong pada papan.</div>':""}
      </section>

      <section class="alg-card alg-section">
        <div class="alg-section-head"><div><h4>2. Papan algoritma kelompok</h4><p>Papan memiliki tepat <b>${GAME.steps.length} slot</b> karena kelompok ini berisi <b>${size} siswa</b>.</p></div><b>${Object.keys(GAME.board).length}/${GAME.steps.length} terisi</b></div>
        <div class="alg-board">${board}</div>
        <div class="alg-actions">
          <button class="alg-btn primary" id="algTest" ${full?"":"disabled"}>▶ Uji Algoritma</button>
          <button class="alg-btn secondary" id="algClearMine" ${mineCount?"":"disabled"}>↶ Ambil Semua Kartu Saya</button>
          ${GAME.completed?'<button class="alg-btn success" id="algFinish">✓ Simpan Nilai & Selesai</button>':""}
        </div>
        <div class="${GAME.completed?"alg-feedback ok":"alg-feedback"}">${esc(GAME.lastHint)}</div>
      </section>
    </main>

    <aside class="alg-side">
      <section class="alg-card alg-chat-card">
        <div class="alg-chat-head">
          <div>
            <h4>💬 Chat Kelompok</h4>
            <p>Gunakan area ini untuk menyampaikan isi kartu, mendiskusikan urutan, dan memberi usulan revisi.</p>
          </div>
          <span class="alg-badge">${(GAME.chat||[]).length} pesan</span>
        </div>
        <div id="algChatList" class="alg-chat-list">${chatHtml}</div>
        <div class="alg-chat-form">
          <textarea id="algChatInput" placeholder="Tulis pesan untuk kelompok, misalnya: kartu saya sepertinya cocok di langkah 7"></textarea>
          <button class="alg-btn primary" id="algSendChat">Kirim</button>
        </div>
      </section>
      <section class="alg-card alg-side-card">
        <h4>📊 Kontribusi Saya</h4>
        <div class="alg-stat-grid">
          <div class="alg-stat"><strong>${stats.placements||0}</strong><span>Penempatan</span></div>
          <div class="alg-stat"><strong>${stats.revisions||0}</strong><span>Revisi</span></div>
          <div class="alg-stat"><strong>${stats.tests||0}</strong><span>Uji</span></div>
          <div class="alg-stat"><strong>${mineCount}/4</strong><span>Kartu di papan</span></div>
        </div>
      </section>
      <section class="alg-card alg-side-card">
        <h4>Aturan Permainan</h4>
        <div class="alg-rule">
          <b>1.</b> Kelas otomatis dibagi menjadi 5 kelompok seimbang.<br>
          <b>2.</b> Kelompok 4 orang mendapat 16 langkah.<br>
          <b>3.</b> Kelompok 5 orang mendapat 20 langkah.<br>
          <b>4.</b> Kelompok 6 orang mendapat 24 langkah.<br>
          <b>5.</b> Sampaikan isi kartu melalui chat kelompok atau diskusi langsung.<br>
          <b>6.</b> Setiap kelompok mendapat algoritma berbeda dari bank 50 soal.<br>
          <b>7.</b> Bank diacak ulang saat sesi/materi baru dimulai.<br>
          <b>8.</b> Setiap siswa selalu memegang tepat 4 kartu.
        </div>
      </section>
    </aside></div>`;

    [...panel.children].forEach(el=>{if(el!==header)el.remove()});panel.appendChild(body);
    bind();
  }

  async function bump(delta){
    const key=safeId(GAME.student.name);
    if(GAME.demo){
      GAME.meta.members ||= {};GAME.meta.members[key]={...(GAME.meta.members[key]||{})};
      Object.entries(delta).forEach(([k,v])=>GAME.meta.members[key][k]=(GAME.meta.members[key][k]||0)+v);return;
    }
    const ref=GAME.rootRef.child(`members/${key}`);
    for(const [k,v] of Object.entries(delta))await ref.child(k).transaction(n=>(Number(n)||0)+v);
    await ref.update({name:GAME.student.name,slot:GAME.slot,lastSeen:Date.now()});
  }

  async function place(id,pos){
    if(GAME.board[pos])return;
    if(GAME.demo){GAME.board[pos]={stepId:id,owner:GAME.student.name};await bump({placements:1});render();return}
    const snap=await GAME.rootRef.child(`board/${pos}`).once("value");if(snap.exists())return;
    await GAME.rootRef.child(`board/${pos}`).set({stepId:id,owner:GAME.student.name,at:Date.now()});
    await bump({placements:1});
  }

  async function removeAt(pos){
    const x=GAME.board[pos];if(!x||x.owner!==GAME.student.name)return;
    if(GAME.demo){delete GAME.board[pos];await bump({revisions:1});render();return}
    await GAME.rootRef.child(`board/${pos}`).remove();await bump({revisions:1});
  }

  async function clearMine(){
    const own=Object.entries(GAME.board).filter(([,x])=>x.owner===GAME.student.name);if(!own.length)return;
    if(GAME.demo){own.forEach(([p])=>delete GAME.board[p]);await bump({revisions:own.length});render();return}
    const updates={};own.forEach(([p])=>updates[p]=null);
    await GAME.rootRef.child("board").update(updates);await bump({revisions:own.length});
  }

  async function test(){
    if(Object.keys(GAME.board).length!==GAME.steps.length)return;
    await bump({tests:1});
    const arr=Array.from({length:GAME.steps.length},(_,i)=>Number(GAME.board[i]?.stepId));
    const wrong=arr.findIndex((id,i)=>id!==i);

    if(wrong<0){
      GAME.completed=true;
      GAME.lastHint=`✓ Algoritma benar. Kelompok ${GAME.groupNo} berhasil menyusun seluruh ${GAME.steps.length} langkah.`;
      if(!GAME.demo)await GAME.rootRef.update({completed:true,completedAt:Date.now(),scenarioId:GAME.scenario.id,stepCount:GAME.steps.length,version:GAME_VERSION});
      render();return;
    }

    GAME.completed=false;
    GAME.lastHint=`✕ Belum benar. Masalah pertama terdeteksi di sekitar posisi ${wrong+1}, pada tahap ${currentPhase(wrong)}. Periksa hubungan langkah sebelum dan sesudahnya.`;
    render();
  }

  function individualScore(){
    const s=mineStats();
    const placement=Math.min(16,(s.placements||0)*4);
    const revision=Math.min(6,(s.revisions||0)*2);
    const testing=Math.min(8,(s.tests||0)*4);
    return Math.max(70,Math.min(100,70+placement+revision+testing));
  }

  async function finish(){
    if(GAME.demo){GAME.lastHint="✓ Mode demonstrasi selesai. Pada akun siswa, hasil akan tersimpan ke dashboard guru.";render();return}

    let progress={};try{progress=JSON.parse(localStorage.getItem("kelasExcelProgress"))||{}}catch(_){}
    const rec=Object.values(progress).find(r=>r&&r.name===GAME.student.name&&r.className===GAME.student.className);
    if(!rec){GAME.lastHint="Algoritma benar, tetapi data progres siswa tidak ditemukan. Muat ulang lalu login kembali.";render();return}

    rec.completedExercises ||= Array(8).fill(false);
    rec.exerciseScores ||= Array(8).fill(null);
    rec.exerciseCompletedAt ||= Array(8).fill(null);
    rec.exerciseCompletedSeconds ||= Array(8).fill(null);
    rec.exerciseStartedAt ||= Array(8).fill(null);
    rec.exerciseState ||= {};

    rec.completedExercises[6]=true;
    rec.exerciseScores[6]=individualScore();
    rec.exerciseCompletedAt[6]=Date.now();
    const start=Number(rec.exerciseStartedAt[6])||Date.now();
    rec.exerciseCompletedSeconds[6]=Math.max(1,Math.min(3600,Math.floor((Date.now()-start)/1000)));
    rec.exerciseState[6]={
      ...(rec.exerciseState[6]||{}),
      teamAlgorithm:{
        version:GAME_VERSION,
        groupNo:GAME.groupNo,
        groupSize:GAME.members.length,
        scenarioId:GAME.scenario.id,
        scenarioTitle:GAME.scenario.title,
        stepCount:GAME.steps.length,
        contribution:mineStats()
      }
    };

    const nums=rec.exerciseScores.filter(Number.isFinite);
    rec.score=Math.round(nums.reduce((a,b)=>a+b,0)/Math.max(1,nums.length));
    localStorage.setItem("kelasExcelProgress",JSON.stringify(progress));

    try{
      await firebase.database().ref(`kelasExcel/progress/${safeId(`${rec.className}::${rec.name}`)}`).set(rec);
    }catch(_){}

    GAME.lastHint=`✓ Nilai individu ${rec.exerciseScores[6]}/100 tersimpan. Muat ulang halaman agar status Latihan 7 pada menu diperbarui.`;
    render();
  }


  async function pushChatMessage(raw){
    const text=sendableMessage(raw);
    if(!text) return false;

    const payload={name:GAME.student.name,text,at:Date.now()};
    if(GAME.demo){
      GAME.chat ||= [];
      GAME.chat.push(payload);
      if(GAME.chat.length>50) GAME.chat=GAME.chat.slice(-50);
      render();
      const box=GAME.panel?.querySelector("#algChatList"); if(box) box.scrollTop=box.scrollHeight;
      return true;
    }

    if(!GAME.rootRef) return false;
    const ref=GAME.rootRef.child("chat").push();
    await ref.set(payload);
    return true;
  }

  function bind(){
    const p=GAME.panel;
    p.querySelectorAll("[data-card]").forEach(b=>b.addEventListener("click",()=>{GAME.selected=Number(b.dataset.card);render()}));
    p.querySelectorAll("[data-slot]").forEach(s=>s.addEventListener("click",async()=>{
      const pos=Number(s.dataset.slot),x=GAME.board[pos];
      if(x?.owner===GAME.student.name){GAME.selected=null;await removeAt(pos);return}
      if(x||GAME.selected===null)return;
      const id=GAME.selected;GAME.selected=null;await place(id,pos);
    }));
    p.querySelector("#algTest")?.addEventListener("click",test);
    p.querySelector("#algClearMine")?.addEventListener("click",clearMine);
    p.querySelector("#algFinish")?.addEventListener("click",finish);
    const chatInput=p.querySelector("#algChatInput");
    const sendBtn=p.querySelector("#algSendChat");
    const doSend=async()=>{
      if(!chatInput) return;
      const ok=await pushChatMessage(chatInput.value);
      if(ok){
        chatInput.value="";
        const box=GAME.panel?.querySelector("#algChatList");
        if(box) box.scrollTop=box.scrollHeight;
        chatInput.focus();
      }
    };
    sendBtn?.addEventListener("click",doSend);
    chatInput?.addEventListener("keydown",e=>{
      if(e.key==="Enter" && !e.shiftKey){
        e.preventDefault();
        doSend();
      }
    });
    const box=p.querySelector("#algChatList");
    if(box) requestAnimationFrame(()=>{box.scrollTop=box.scrollHeight;});
  }

  function disconnect(){
    if(GAME.rootRef){try{GAME.rootRef.off()}catch(_){}}
    GAME.rootRef=null;
  }

  function connect(){
    disconnect();
    if(GAME.demo||!window.firebase?.database){GAME.board={};GAME.meta={members:{}};GAME.chat=[];render();return}

    GAME.rootRef=firebase.database().ref(`kelasExcel/algorithmTeamV3/${safeId(GAME.student.className)}/${safeId(currentSessionId())}/group_${GAME.groupNo}`);
    GAME.rootRef.child("board").on("value",snap=>{GAME.board=snap.val()||{};render()});
    GAME.rootRef.child("chat").limitToLast(60).on("value",snap=>{
      const v=snap.val()||{};
      GAME.chat=Object.values(v).sort((a,b)=>(Number(a.at)||0)-(Number(b.at)||0));
      render();
    });
    GAME.rootRef.on("value",snap=>{
      const v=snap.val()||{};
      GAME.meta=v;
      GAME.completed=!!v.completed;
      if(GAME.completed)GAME.lastHint=`✓ Kelompok ${GAME.groupNo} telah menyelesaikan ${GAME.steps.length} langkah dengan benar.`;
      render();
    });
    GAME.rootRef.update({
      version:GAME_VERSION,
      groupNo:GAME.groupNo,
      groupSize:GAME.members.length,
      scenarioId:GAME.scenario.id,
      scenarioTitle:GAME.scenario.title,
      stepCount:GAME.steps.length,
      bankSize:SCENARIOS.length,
      sessionId:currentSessionId()
    });
    GAME.rootRef.child(`members/${safeId(GAME.student.name)}`).update({name:GAME.student.name,slot:GAME.slot,lastSeen:Date.now()});
  }


  function teacherSelectedClassFromDom(){
    return document.querySelector("[data-teacher-class].active")?.dataset.teacherClass
      || document.querySelector("[data-teacher-class]")?.dataset.teacherClass
      || "3P";
  }

  function teacherRosterForClass(className){
    // Ambil roster dari pilihan login siswa tanpa bergantung pada variabel privat app.js.
    const selectedClass=document.getElementById("classSelect")?.value;
    if(selectedClass===className){
      const names=[...(document.getElementById("studentSelect")?.options||[])].map(o=>o.value).filter(Boolean);
      if(names.length) return names;
    }
    // Fallback: daftar anggota akan diambil dari metadata Firebase grup.
    return [];
  }

  function teacherStopMonitorListeners(){
    const tm=GAME.teacherMonitor;
    if(tm.groupRef){try{tm.groupRef.off()}catch(_){} tm.groupRef=null;}
    (tm.countRefs||[]).forEach(ref=>{try{ref.off()}catch(_){}});
    tm.countRefs=[];
  }

  function teacherGroupMembersFromMeta(meta){
    const members=Object.values(meta?.members||{})
      .filter(x=>x&&x.name)
      .sort((a,b)=>(Number(a.slot)||0)-(Number(b.slot)||0))
      .map(x=>x.name);
    return members;
  }

  function teacherMessageHtml(messages,members){
    if(!messages?.length) return '<div class="alg-teacher-empty">Belum ada chat pada kelompok ini.</div>';
    return messages.map(msg=>{
      let idx=(members||[]).indexOf(msg.name);
      if(idx<0) idx=0;
      return `<div class="alg-teacher-msg member-${idx}">
        <div class="alg-teacher-msg-head">
          <div><b>${esc(msg.name||"Anggota")}</b><span class="alg-role-label">Anggota ${idx+1}</span></div>
          <span>${formatClock(msg.at)}</span>
        </div>
        <div class="alg-teacher-msg-text">${esc(msg.text||"")}</div>
      </div>`;
    }).join("");
  }

  function renderTeacherMonitor(){
    const host=document.getElementById("algorithmTeacherMonitor");
    if(!host) return;
    const tm=GAME.teacherMonitor;
    const members=teacherGroupMembersFromMeta(tm.groupMeta);
    const groupNo=tm.groupNo||1;
    const meta=tm.groupMeta||{};
    const tabs=Array.from({length:5},(_,i)=>`
      <button class="alg-teacher-group-tab ${groupNo===i+1?"active":""}" data-alg-teacher-group="${i+1}">
        <b>Kelompok ${i+1}</b>
        <span>${tm.className||"Kelas"}</span>
        <em>${tm.counts?.[i]||0} pesan</em>
      </button>`).join("");
    const legend=members.length
      ? members.map((m,i)=>`<div class="alg-teacher-legend-row member-${i}"><span class="alg-teacher-legend-dot" style="--member-ink:var(--member-ink);--member-border:var(--member-border)"></span><span><b>${esc(m)}</b> · Anggota ${i+1}</span></div>`).join("")
      : '<div class="alg-teacher-empty" style="height:auto;padding:10px">Belum ada anggota yang masuk ke kelompok ini.</div>';

    host.innerHTML=`
      <div class="alg-teacher-monitor-head">
        <div>
          <h3>💬 Pemantauan Chat Kelompok — Latihan Algoritma</h3>
          <p>Pilih kelompok untuk melihat diskusi siswa secara real-time. Warna pesan mengikuti nomor anggota kelompok.</p>
        </div>
        <span class="alg-teacher-live"><i></i>Realtime</span>
      </div>
      <div class="alg-teacher-group-tabs">${tabs}</div>
      <div class="alg-teacher-monitor-body">
        <div class="alg-teacher-chat">
          <div id="algTeacherChatList" class="alg-teacher-chat-list">${teacherMessageHtml(tm.messages,members)}</div>
        </div>
        <aside class="alg-teacher-info">
          <h4>Informasi Kelompok ${groupNo}</h4>
          <div class="alg-teacher-info-card"><small>Soal algoritma</small><b>${esc(meta.scenarioTitle||"Belum dimulai")}</b></div>
          <div class="alg-teacher-info-card"><small>Jumlah langkah</small><b>${meta.stepCount||0} langkah · ${meta.groupSize||members.length||0} siswa</b></div>
          <div class="alg-teacher-info-card"><small>Status</small><b>${meta.completed?"✓ Sudah benar":"Belum selesai"}</b></div>
          <h4 style="margin-top:16px">Anggota</h4>
          <div class="alg-teacher-member-legend">${legend}</div>
        </aside>
      </div>`;

    host.querySelectorAll("[data-alg-teacher-group]").forEach(btn=>btn.addEventListener("click",()=>{
      const next=Number(btn.dataset.algTeacherGroup)||1;
      if(next===tm.groupNo) return;
      tm.groupNo=next;
      teacherListenSelectedGroup();
      renderTeacherMonitor();
    }));

    const box=host.querySelector("#algTeacherChatList");
    if(box) requestAnimationFrame(()=>{box.scrollTop=box.scrollHeight;});
  }

  function teacherListenCounts(){
    const tm=GAME.teacherMonitor;
    (tm.countRefs||[]).forEach(ref=>{try{ref.off()}catch(_){}});
    tm.countRefs=[];
    tm.counts=[0,0,0,0,0];
    if(!window.firebase?.database || !tm.className) return;
    const session=safeId(currentSessionId());
    for(let i=1;i<=5;i++){
      const ref=firebase.database().ref(`kelasExcel/algorithmTeamV3/${safeId(tm.className)}/${session}/group_${i}/chat`);
      ref.on("value",snap=>{
        tm.counts[i-1]=snap.numChildren();
        renderTeacherMonitor();
      });
      tm.countRefs.push(ref);
    }
  }

  function teacherListenSelectedGroup(){
    const tm=GAME.teacherMonitor;
    if(tm.groupRef){try{tm.groupRef.off()}catch(_){} tm.groupRef=null;}
    tm.messages=[];
    tm.groupMeta={};
    if(!window.firebase?.database || !tm.className) return;

    const session=safeId(currentSessionId());
    tm.groupRef=firebase.database().ref(`kelasExcel/algorithmTeamV3/${safeId(tm.className)}/${session}/group_${tm.groupNo}`);
    tm.groupRef.on("value",snap=>{
      const data=snap.val()||{};
      tm.groupMeta=data;
      const raw=data.chat||{};
      tm.messages=Object.values(raw).sort((a,b)=>(Number(a.at)||0)-(Number(b.at)||0)).slice(-80);
      renderTeacherMonitor();
    });
  }

  function ensureTeacherMonitor(){
    const teacherView=document.getElementById("teacherView");
    if(!teacherView || !teacherView.classList.contains("active")) return;

    const dashboard=teacherView.querySelector(".teacher-dashboard");
    if(!dashboard) return;

    let host=document.getElementById("algorithmTeacherMonitor");
    if(!host){
      host=document.createElement("section");
      host.id="algorithmTeacherMonitor";
      host.className="alg-teacher-monitor";

      const classPanel=dashboard.querySelector(".teacher-class-panel");
      if(classPanel) classPanel.insertAdjacentElement("afterend",host);
      else dashboard.appendChild(host);
    }

    const cls=teacherSelectedClassFromDom();
    const tm=GAME.teacherMonitor;
    if(tm.className!==cls){
      teacherStopMonitorListeners();
      tm.className=cls;
      tm.groupNo=1;
      tm.counts=[0,0,0,0,0];
      tm.messages=[];
      tm.groupMeta={};
      teacherListenCounts();
      teacherListenSelectedGroup();
    }
    renderTeacherMonitor();
  }

  function mount(panel){
    injectCss();setup();GAME.panel=panel;GAME.selected=null;GAME.completed=false;GAME.chat=[];
    GAME.lastHint=`Belum diuji. Kelompok ${GAME.groupNo} harus menyusun ${GAME.steps.length} langkah.`;
    const h=panel.querySelector(".l2-window-header h3");if(h)h.textContent="Algoritma Kelompok";
    render();connect();
  }

  function watch(){
    ensureTeacherMonitor();
    const panel=document.getElementById("exercisePanel");
    if(!panel||panel.classList.contains("hidden"))return;
    const title=panel.querySelector(".l2-window-header h3")?.textContent.trim();
    const already=!!panel.querySelector(".alg-team-shell");
    if((title==="Algoritma"||title==="Algoritma Kelompok")&&!already)mount(panel);

    document.querySelectorAll(".exercise-card,.student-ex-card").forEach(card=>{
      if(card.textContent.includes("Algoritma")){
        const p=card.querySelector("p");
        if(p)p.textContent="Permainan 5 kelompok dengan kasus berbeda · 4 kartu langkah per siswa.";
      }
    });
  }


  document.addEventListener("click",e=>{
    const tab=e.target.closest?.("[data-teacher-class]");
    if(tab){
      setTimeout(()=>{
        const tm=GAME.teacherMonitor;
        const cls=tab.dataset.teacherClass;
        if(cls && cls!==tm.className){
          teacherStopMonitorListeners();
          tm.className=cls;
          tm.groupNo=1;
          tm.counts=[0,0,0,0,0];
          tm.messages=[];
          tm.groupMeta={};
          teacherListenCounts();
          teacherListenSelectedGroup();
          ensureTeacherMonitor();
        }
      },50);
    }
  });

  new MutationObserver(watch).observe(document.documentElement,{childList:true,subtree:true});
  window.addEventListener("load",()=>setTimeout(watch,250));
})();