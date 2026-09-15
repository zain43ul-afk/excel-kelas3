/* ============================================================
   KELAS EXCEL INTERAKTIF — MAIN.JS V21
   Optimized bundle.

   Bagian 1: app.js
   Bagian 2: algoritm.js V20 + embedded algorithm-team-game.js

   firebase-config.js sengaja tetap terpisah agar konfigurasi Firebase
   dapat diubah tanpa menyentuh bundle aplikasi.
   ============================================================ */

/* ========================== APP CORE ========================== */
(() => {
  "use strict";

  const EXERCISES = [
    ["Mencari Letak Angka","Pilih alamat sel pada grid 20×20."],
    ["SUM & AVERAGE","Latihan penjumlahan dan rata-rata seperti di Excel."],
    ["Menulis Rumus, Kata & Link","30 soal dengan kapitalisasi dan simbol yang harus tepat."],
    ["SUMIF, AVERAGEIF, SUMIFS & AVERAGEIFS","Praktik fungsi berdasarkan satu atau beberapa kriteria."],
    ["IF","Latihan logika IF untuk menghasilkan keputusan dari sebuah syarat."],
    ["VLOOKUP","Mencari data pada tabel referensi."],
    ["Algoritma","Menyusun langkah pemecahan masalah."],
    ["Coding","Mengetik kode dasar secara tepat."]
  ];

  // Data siswa diambil dari file Data Kelas yang diberikan.
  const CLASS_COUNTS = {"3P": 26, "3Q": 26, "3R": 25, "3S": 26, "3T": 25};
  const ROSTER = {
  "3P": [
    "Abdur Rouuf",
    "Annas Fadil Nur R.",
    "Arman Maulana Mahendra",
    "Azka Raksi Khiar R.",
    "M. Asyraf Azharullah",
    "M. Fadhil Faizul A.",
    "Mohammad Azam A. Y.",
    "Mohammad Rehan Rifai",
    "Muhammad Farid H.",
    "Muhammad Yudha M.",
    "Naufal Ridho Pratama",
    "Naufal Nuur Raditya",
    "Robeth Alif Alfurqon",
    "Ailla Nur Hasanah",
    "Aisha Silmi H.",
    "Almira Naura Hafizhah",
    "Asyifa Dewi Sa'ada",
    "Azizatul Auliana Safitri",
    "Clarissa Annora Jasmin",
    "Destian Agustin R.",
    "Gavenara Naswa Cinta K.",
    "Griselda Azka Zhao N.",
    "Intan Asiyani Putri",
    "Nina Lidyaningrum",
    "Reva Ayuni",
    "Talitha Natahania S."
  ],
  "3Q": [
    "Bayu Samudra",
    "Faia Faiur R.",
    "Febri Firmansyah",
    "Haafidz Miftahul H.",
    "Hanifan Akbar R.",
    "Jiddan Maulana A.",
    "M. Khansaapta H.",
    "M. Munif Devandhi",
    "M. Naufal Zaidan",
    "M. Safi'ul Kholqi",
    "M. Tajudin Niko",
    "Oktavian Saira P.",
    "Wisnu Eko P.",
    "Afza Khoirun Nisa",
    "Ananda Sabra Mafaza",
    "Chairunnisa Ardena R.",
    "Cinta Novelia Pratiwi",
    "Fayza Adila Husna",
    "Mada Alfatun Jannah",
    "Maulidia Zahrotun N.",
    "Miftakhul Hidayatulloh",
    "Nayila Zahra Indraswati",
    "Regina Putri Eka P.",
    "Sulistya Fatimah A. Z.",
    "Wafa Cindy Widiyawati",
    "Yuan Meyfitri"
  ],
  "3R": [
    "Abid Gusmadani",
    "Ahmad Fauzan A.",
    "Ahmad Nabil A.",
    "Ahmad Ismudin",
    "Daniala Mahira A.",
    "Faiq Hartono",
    "Irsyad Habibus Sholeh",
    "M. Alhafiz Zain",
    "Naufal Fairuz Zain",
    "Naovandy Nardyanto",
    "Reza Ahmad D.",
    "Wira Dildar D.",
    "Alisya Yasmin Candrawati Y.",
    "Anastasia Vania F.",
    "Anastasia Putri Y.",
    "Fathwa K. M.",
    "Feby Namira A. W. P.",
    "Ghina Zahrotun N.",
    "Krisfianza A. R.",
    "Najwa Nayla F. T.",
    "Nayra Najwa A. N.",
    "Shofi Maulida F.",
    "Tazkia Rahma Zahirah",
    "Viqy Ayu M. Z.",
    "Yenfelia Ningrum"
  ],
  "3S": [
    "Ahmad Adib A. A.",
    "Ahmad Faaliq W.",
    "Ahmad Tsahib Z.",
    "Anandika Octa P.",
    "Anastya Bella K.",
    "Evan Andika P.",
    "Farel Ahza S.",
    "Fiska Anugrah P.",
    "Lingga Afif P. F.",
    "Moh. Abdul Wafi",
    "Muhammad Haikal",
    "Rendita Eka R. A.",
    "Wildan Aditya P.",
    "Aileen Zivana A.",
    "Cella Maharani",
    "Hasya Ghiena B.",
    "Ilma Fatimatuz Z.",
    "Naila Fawaidatu R.",
    "Natasya Sania F.",
    "Risma Muhitul H.",
    "Salfana Azza Z.",
    "Silvi Aulia A. S.",
    "Syifa Nur Aini R.",
    "Wilda Nimal M.",
    "Yunia Indah A.",
    "Zhievana Ayclya A."
  ],
  "3T": [
    "Abdullah Azzam",
    "Ahmad Tahfied A.",
    "Ahmad Wavik K. F.",
    "Azka Asfarizal M.",
    "Indrawan Nashrul F.",
    "M. Zakky Ainu F.",
    "Muhammad Abiyu E.",
    "Muhammad Irvan A. R.",
    "Muhammad Sarifatul A.",
    "Muhammad Zidan A.",
    "Rozaki Alvin Brian",
    "Wildan Az Zaky",
    "Adelia Haryafika I. D.",
    "Akhanza Dhihni A. A.",
    "Aliyana Natasha L. M.",
    "Andini Miftaqul M. A.",
    "Annisa Devinta A.",
    "Apriliana Ariza S.",
    "Fatimatuz Zahra",
    "Fira Harum Permata",
    "Hasnaeni Pratika",
    "Istiara Fitri",
    "Nadia Rahmadani",
    "Najwa Aprilia F. Z.",
    "Syarifa Firda A. N."
  ]
};

  const TEACHER = { username:"hafidzzainulmustofa", password:"admin123" };
  const CURRENT_PROGRESS_VERSION = "attempt-v4-nullfix";

  const DEFAULT_SETTINGS = {
    unlocked:[true,false,false,false,false,false,false,false],
    materialFinished:false,
    studentExitLocked:true,
    sessionId:"per-exercise-v2"
  };

  const L1_TARGETS = ["A2","C7","D3","F12","H5","J10","L16","N8","Q14","T20"];

  const L2_ROWS = [
    {item:"Beras", vals:[5,4,6,3,6], total:24, avg:4.8, row:2},
    {item:"Gula", vals:[2,3,4,5,6], total:20, avg:4, row:3},
    {item:"Minyak", vals:[7,5,6,4,3], total:25, avg:5, row:4},
    {item:"Telur", vals:[6,8,5,7,4], total:30, avg:6, row:5},
    {item:"Susu", vals:[3,4,2,5,6], total:20, avg:4, row:6}
  ];

  const L3_ITEMS = [
    "=SUM(B2:F2)",
    "=AVERAGE(B2:F2)",
    '=SUMIF(A2:A10,"Buku",B2:B10)',
    '=AVERAGEIF(A2:A10,"Lulus",B2:B10)',
    "=VLOOKUP(A2,$G$2:$H$10,2,FALSE)",
    "=LEFT(A2,3)",
    "=MID(A2,2,4)",
    "=RIGHT(A2,3)",
    '=IF(B2>=75,"Lulus","Remedial")',
    "=COUNT(B2:B20)",
    "Microsoft Excel",
    "Kelas Excel Interaktif",
    "SUM dan AVERAGE",
    "Data Siswa Kelas 3P",
    "Belajar Informatika",
    "Ruang Guru",
    "Ruang Siswa",
    "Latihan Rumus Excel",
    "Caps Lock",
    "Shift + 4",
    "https://www.google.com",
    "https://www.microsoft.com",
    "https://www.youtube.com",
    "https://chatgpt.com",
    "https://www.wikipedia.org",
    "https://drive.google.com",
    "https://docs.google.com",
    "https://sheets.google.com",
    "https://classroom.google.com",
    "https://www.bing.com"
  ];

  const SUMIF_DATA = [
    ["Buku",4],["Pensil",3],["Buku",7],["Penggaris",5],["Pensil",6],["Buku",9]
  ];
  const SUMIF_Q = [
    {label:'Jumlah kategori "Buku"', formula:'=SUMIF(A2:A7,"Buku",B2:B7)', result:20},
    {label:'Jumlah kategori "Pensil"', formula:'=SUMIF(A2:A7,"Pensil",B2:B7)', result:9},
    {label:'Jumlah kategori "Penggaris"', formula:'=SUMIF(A2:A7,"Penggaris",B2:B7)', result:5},
    {label:'Jumlah nilai >5', formula:'=SUMIF(B2:B7,">5",B2:B7)', result:22},
    {label:'Jumlah nilai <=4', formula:'=SUMIF(B2:B7,"<=4",B2:B7)', result:7}
  ];

  const AVGIF_DATA = [
    ["Lulus",80],["Lulus",90],["Remedial",60],["Lulus",70],["Remedial",65],["Lulus",100]
  ];
  const AVGIF_Q = [
    {label:'Rata-rata kategori "Lulus"', formula:'=AVERAGEIF(A2:A7,"Lulus",B2:B7)', result:85},
    {label:'Rata-rata kategori "Remedial"', formula:'=AVERAGEIF(A2:A7,"Remedial",B2:B7)', result:62.5},
    {label:'Rata-rata nilai >=80', formula:'=AVERAGEIF(B2:B7,">=80",B2:B7)', result:90},
    {label:'Rata-rata nilai <70', formula:'=AVERAGEIF(B2:B7,"<70",B2:B7)', result:62.5},
    {label:'Rata-rata nilai >60', formula:'=AVERAGEIF(B2:B7,">60",B2:B7)', result:81}
  ];

  const VLOOKUP_TABLE = [
    ["BRG001","Buku",12000],
    ["BRG002","Pensil",3000],
    ["BRG003","Penggaris",5000],
    ["BRG004","Penghapus",2500],
    ["BRG005","Spidol",8000]
  ];
  const VLOOKUP_Q = [
    {label:"Cari nama BRG001", formula:"=VLOOKUP(E2,$A$2:$C$6,2,FALSE)", result:"Buku", lookup:"BRG001"},
    {label:"Cari harga BRG002", formula:"=VLOOKUP(E3,$A$2:$C$6,3,FALSE)", result:"3000", lookup:"BRG002"},
    {label:"Cari nama BRG003", formula:"=VLOOKUP(E4,$A$2:$C$6,2,FALSE)", result:"Penggaris", lookup:"BRG003"},
    {label:"Cari harga BRG004", formula:"=VLOOKUP(E5,$A$2:$C$6,3,FALSE)", result:"2500", lookup:"BRG004"},
    {label:"Cari nama BRG005", formula:"=VLOOKUP(E6,$A$2:$C$6,2,FALSE)", result:"Spidol", lookup:"BRG005"}
  ];

  const ALGO_CORRECT = [
    "Mulai",
    "Masukkan nilai siswa",
    "Periksa apakah nilai ≥ 75",
    'Jika ya, tampilkan "Lulus"',
    'Jika tidak, tampilkan "Remedial"',
    "Selesai"
  ];

  const CODE_TASKS = [
    `console.log("Halo, Excel!");`,
    `let nilai = 80;`,
    `if (nilai >= 75) console.log("Lulus");`,
    `<h1>Kelas Excel Interaktif</h1>`,
    `for (let i = 1; i <= 5; i++) console.log(i);`
  ];

  let settings = structuredClone(DEFAULT_SETTINGS);
  let allProgress = {};
  let currentUser = null;
  let currentExercise = 0;
  let timerInterval = null;
  let guideSlides = [];
  let guideIndex = 0;
  let l1InlineGuideIndex = 0;
  let db = null;
  let realtime = false;
  let teacherSelectedClass = "3P";
  let teacherRecapMode = "progress";
  let teacherAccessPreview = Array(8).fill(true);
  let teacherRefreshInterval = null;
  let teacherDemoMode = false;

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const now = () => Date.now();

  function normalizeUnlocked(value){
    if(Array.isArray(value)){
      return Array.from({length:8},(_,i)=>value[i]===true);
    }
    if(value && typeof value === "object"){
      return Array.from({length:8},(_,i)=>value[i]===true || value[String(i)]===true);
    }
    return [...DEFAULT_SETTINGS.unlocked];
  }

  function normalizeStudentExitLocked(value){
    if(typeof value?.studentExitLocked==="boolean") return !!value.studentExitLocked;
    if(typeof value?.materialFinished==="boolean") return !value.materialFinished;
    return true;
  }

  function canStudentExit(){
    return !!teacherDemoMode || !settings.studentExitLocked;
  }

  function syncExitLockState(){
    settings.studentExitLocked = normalizeStudentExitLocked(settings);
    settings.materialFinished = !settings.studentExitLocked;
    return settings.studentExitLocked;
  }

  function normalizeFormula(s){
    return String(s||"").replace(/\s+/g,"").toUpperCase();
  }

  // Penting: Number(null) === 0 di JavaScript.
  // Jadi nilai null/undefined/kosong HARUS ditolak sebelum Number(...)
  // agar timer yang belum mulai dan skor yang belum ada tidak dianggap angka 0.
  function hasFiniteNumber(v){
    return v !== null && v !== undefined && v !== "" && Number.isFinite(Number(v));
  }
  function progressKey(cls,name){ return `${cls}::${name}`; }
  function safeId(s){ return s.replace(/[^a-zA-Z0-9_-]/g,"_"); }

  function makeStudentRecord(cls,name){
    return {
      className:cls,
      name,
      sessionId:settings.sessionId || "per-exercise-v2",
      progressVersion:CURRENT_PROGRESS_VERSION,
      startedAt:null,
      completedAt:null,
      completedExercises:Array(8).fill(false),
      exerciseStartedAt:Array(8).fill(null),
      exerciseCompletedSeconds:Array(8).fill(null),
      exerciseCompletedAt:Array(8).fill(null),
      exerciseScores:Array(8).fill(null),
      exerciseState:{},
      score:0,
      elapsedSeconds:0
    };
  }

  function makeFreshRecordPreservingScores(cls,name,previous=null,sessionId=null){
    const old=previous ? normalizeStudentRecord(previous) : null;
    const rec=makeStudentRecord(cls,name);
    rec.sessionId=sessionId || settings.sessionId || "per-exercise-v2";
    rec.progressVersion=CURRENT_PROGRESS_VERSION;

    rec.exerciseScores=Array.from({length:8},(_,i)=>{
      const v=old?.exerciseScores?.[i];
      return hasFiniteNumber(v)
        ? Math.max(40,Math.min(100,Math.round(Number(v))))
        : null;
    });

    const saved=rec.exerciseScores.filter(hasFiniteNumber);
    rec.score=saved.length
      ? Math.round(saved.reduce((a,b)=>a+b,0)/saved.length)
      : 0;

    // Semua progres sesi baru dimulai dari nol.
    rec.startedAt=null;
    rec.completedAt=null;
    rec.completedExercises=Array(8).fill(false);
    rec.exerciseStartedAt=Array(8).fill(null);
    rec.exerciseCompletedSeconds=Array(8).fill(null);
    rec.exerciseCompletedAt=Array(8).fill(null);
    rec.exerciseState={};
    rec.elapsedSeconds=0;
    return rec;
  }

  function normalizeStudentRecord(record){
    if(!record) return record;

    record.sessionId = record.sessionId || null;

    const oldCompleted=Array.from({length:8},(_,i)=>!!record.completedExercises?.[i]);
    const oldStartedAt=Array.from({length:8},(_,i)=>{
      const v=record.exerciseStartedAt?.[i];
      return hasFiniteNumber(v)?Number(v):null;
    });
    const oldSeconds=Array.from({length:8},(_,i)=>{
      const v=record.exerciseCompletedSeconds?.[i];
      return hasFiniteNumber(v)?Number(v):null;
    });
    const oldCompletedAt=Array.from({length:8},(_,i)=>{
      const v=record.exerciseCompletedAt?.[i];
      return hasFiniteNumber(v)?Number(v):null;
    });
    const oldScores=Array.from({length:8},(_,i)=>{
      const v=record.exerciseScores?.[i];
      if(hasFiniteNumber(v)) return Math.max(40,Math.min(100,Math.round(Number(v))));
      const sec=oldSeconds[i];
      return oldCompleted[i] && hasFiniteNumber(sec)
        ? Math.max(40,100-Math.floor(Number(sec)/60))
        : null;
    });

    // Bug versi lama:
    // Number(null) menghasilkan 0, sehingga null dianggap skor 0 lalu dipaksa menjadi 40.
    // Null pada exerciseStartedAt juga dianggap timestamp 0, sehingga timer langsung
    // dianggap lewat 60 menit dan latihan otomatis "Selesai" dengan nilai 40.
    //
    // Jika semua nilai 40 tetapi tidak ada timestamp percobaan yang masuk akal,
    // data itu adalah pola korupsi bug tersebut, bukan hasil pengerjaan nyata.
    const hasRealAttemptEvidence=Array.from({length:8},(_,i)=>{
      const started=oldStartedAt[i];
      const ended=oldCompletedAt[i];
      return (hasFiniteNumber(started) && started>1_000_000_000_000) ||
             (hasFiniteNumber(ended) && ended>1_000_000_000_000);
    });
    const finiteScores=oldScores.filter(hasFiniteNumber);
    const looksLikeNullScoreBug=
      finiteScores.length===8 &&
      finiteScores.every(v=>Number(v)===40) &&
      !hasRealAttemptEvidence.some(Boolean);

    if(looksLikeNullScoreBug){
      for(let i=0;i<8;i++) oldScores[i]=null;
    }

    // Migrasi satu kali ke versi perbaikan.
    // Progress/timer aktif dibersihkan supaya kartu tidak otomatis selesai.
    // Nilai yang benar-benar memiliki bukti percobaan nyata tetap dipertahankan.
    if(record.progressVersion !== CURRENT_PROGRESS_VERSION){
      record.progressVersion=CURRENT_PROGRESS_VERSION;
      record.exerciseScores=oldScores;
      record.completedExercises=Array(8).fill(false);
      record.exerciseStartedAt=Array(8).fill(null);
      record.exerciseCompletedSeconds=Array(8).fill(null);
      record.exerciseCompletedAt=Array(8).fill(null);
      record.exerciseState={};
      record.startedAt=null;
      record.completedAt=null;
      record.elapsedSeconds=0;

      const saved=oldScores.filter(hasFiniteNumber);
      record.score=saved.length
        ? Math.round(saved.reduce((a,b)=>a+b,0)/saved.length)
        : 0;
      return record;
    }

    record.completedExercises=oldCompleted;
    record.exerciseStartedAt=Array.from({length:8},(_,i)=>{
      const v=record.exerciseStartedAt?.[i];
      return hasFiniteNumber(v)?Number(v):null;
    });
    record.exerciseCompletedSeconds=Array.from({length:8},(_,i)=>{
      const v=record.exerciseCompletedSeconds?.[i];
      return hasFiniteNumber(v)?Number(v):null;
    });
    record.exerciseCompletedAt=Array.from({length:8},(_,i)=>{
      const v=record.exerciseCompletedAt?.[i];
      return hasFiniteNumber(v)?Number(v):null;
    });
    record.exerciseScores=Array.from({length:8},(_,i)=>{
      const v=record.exerciseScores?.[i];
      if(hasFiniteNumber(v)) return Math.max(40,Math.min(100,Number(v)));
      const sec=record.exerciseCompletedSeconds?.[i];
      return record.completedExercises?.[i] && hasFiniteNumber(sec)
        ? Math.max(40,100-Math.floor(Number(sec)/60))
        : null;
    });
    record.exerciseState ||= {};
    return record;
  }

  function loadLocal(){
    try{
      const s = JSON.parse(localStorage.getItem("kelasExcelSettings")||"null");
      const p = JSON.parse(localStorage.getItem("kelasExcelProgress")||"null");
      if(s) settings = {...structuredClone(DEFAULT_SETTINGS),...s};
      syncExitLockState();
      if(p) allProgress = p;
    }catch(e){}
  }

  function saveLocal(){
    localStorage.setItem("kelasExcelSettings",JSON.stringify(settings));
    localStorage.setItem("kelasExcelProgress",JSON.stringify(allProgress));
  }

  function initFirebase(){
    const cfg = window.FIREBASE_CONFIG || {};
    if(!cfg.apiKey || !cfg.databaseURL || !window.firebase){
      realtime = false;
      return;
    }
    try{
      firebase.initializeApp(cfg);
      db = firebase.database();
      realtime = true;
      db.ref("kelasExcel/settings").on("value", snap=>{
        const val = snap.val();
        if(val){
          settings = {
            ...structuredClone(DEFAULT_SETTINGS),
            ...val,
            unlocked: normalizeUnlocked(val.unlocked),
            studentExitLocked: normalizeStudentExitLocked(val)
          };
          syncExitLockState();
          saveLocal();
          renderReactive("settings");
        }else{
          settings = structuredClone(DEFAULT_SETTINGS);
          syncExitLockState();
          db.ref("kelasExcel/settings").set(settings);
          renderReactive("settings");
        }
      }, err=>{
        console.error("Gagal membaca settings Firebase:",err);
        realtime=false;
        renderReactive("settings");
      });
      db.ref("kelasExcel/progress").on("value", snap=>{
        allProgress = snap.val() || {};
        saveLocal();
        renderReactive("progress");
      });
    }catch(e){
      console.warn("Firebase tidak aktif:",e);
      realtime = false;
    }
  }

  function persistSettings(){
    settings.unlocked=normalizeUnlocked(settings.unlocked);
    syncExitLockState();
    saveLocal();
    if(realtime){
      return db.ref("kelasExcel/settings").update({
        unlocked:settings.unlocked,
        materialFinished:!!settings.materialFinished,
        studentExitLocked:!!settings.studentExitLocked,
        sessionId:settings.sessionId || "per-exercise-v2"
      }).catch(err=>{
        console.error("Gagal menyimpan settings Firebase:",err);
        toast("Gagal menyinkronkan ke Firebase. Periksa Rules database.");
        throw err;
      });
    }
    return Promise.resolve();
  }
  function persistStudent(){
    if(teacherDemoMode) return Promise.resolve();
    saveLocal();
    if(realtime && currentUser){
      const key = safeId(progressKey(currentUser.className,currentUser.name));
      return db.ref(`kelasExcel/progress/${key}`).set(currentUser).catch(err=>{
        console.error("Gagal menyimpan progres siswa:",err);
        toast("Progres belum terkirim ke Firebase. Periksa koneksi.");
        throw err;
      });
    }
    return Promise.resolve();
  }
  function persistSpecific(record){
    saveLocal();
    if(realtime){
      const key = safeId(progressKey(record.className,record.name));
      db.ref(`kelasExcel/progress/${key}`).set(record);
    }
  }

  function getStudent(cls,name){
    const logical = progressKey(cls,name);
    if(allProgress[logical]) return normalizeStudentRecord(allProgress[logical]);
    const safe = safeId(logical);
    if(allProgress[safe]) return normalizeStudentRecord(allProgress[safe]);
    return null;
  }

  function setStudent(record){
    allProgress[progressKey(record.className,record.name)] = record;
  }

  function renderExerciseStrip(){
    $("#exerciseStrip").innerHTML = EXERCISES.map((e,i)=>`
      <div class="exercise-mini">
        <small>${String(i+1).padStart(2,"0")}</small>
        <strong>${e[0]}</strong>
      </div>`).join("");
  }

  function initRosterSelectors(){
    Object.keys(ROSTER).forEach(cls=>{
      $("#classSelect").insertAdjacentHTML("beforeend",`<option>${cls}</option>`);
    });
    $("#classSelect").addEventListener("change",e=>{
      const cls=e.target.value;
      const sel=$("#studentSelect");
      sel.innerHTML="";
      if(!cls){
        sel.disabled=true;sel.innerHTML=`<option value="">Pilih kelas terlebih dahulu</option>`;
      }else{
        sel.disabled=false;sel.innerHTML=`<option value="">Pilih nama</option>`+ROSTER[cls].map(n=>`<option>${escapeHtml(n)}</option>`).join("");
      }
      $("#studentStartBtn").disabled=true;
    });
    $("#studentSelect").addEventListener("change",()=>$("#studentStartBtn").disabled=!$("#studentSelect").value);
  }

  function escapeHtml(s){
    return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
  }

  function showView(id){
    $$(".view").forEach(v=>v.classList.remove("active"));
    $(id).classList.add("active");
  }

  function switchLoginMode(mode){
    const student=mode==="student";
    document.body.classList.toggle("login-student-mode",student);
    document.body.classList.toggle("login-teacher-mode",!student);
    $("#studentTab").classList.toggle("active",student);
    $("#teacherTab").classList.toggle("active",!student);
    const studentGrid = $(".student-home-grid");
    if(studentGrid) studentGrid.classList.toggle("hidden",!student);
    $("#studentLogin").classList.toggle("hidden",!student);
    $("#teacherLogin").classList.toggle("hidden",student);
  }

  async function enterFullscreen(){
    try{
      if(!document.fullscreenElement) await document.documentElement.requestFullscreen();
    }catch(e){}
  }

  function startStudent(){
    const cls=$("#classSelect").value;
    const name=$("#studentSelect").value;
    if(!cls||!name) return;
    let rec=normalizeStudentRecord(getStudent(cls,name) || makeStudentRecord(cls,name));
    const activeSession=settings.sessionId || "per-exercise-v2";
    if(rec.sessionId !== activeSession){
      rec=makeFreshRecordPreservingScores(cls,name,rec,activeSession);
    }
    rec.sessionId=activeSession;
    rec.progressVersion=CURRENT_PROGRESS_VERSION;
    if(!rec.startedAt) rec.startedAt=now();
    currentUser=rec;
    setStudent(rec);
    persistStudent();
    currentExercise=Math.max(0,rec.completedExercises.findIndex(x=>!x));
    if(currentExercise<0) currentExercise=7;
    showView("#studentView");
    $("#studentIdentity").textContent=`${name} · ${cls}`;
    $("#exercisePanel").classList.add("hidden");
    $("#exercisePanel").dataset.opened="0";
    $("#exercisePanel").innerHTML="";
    enterFullscreen();
    startTimer();
    renderStudent();
  }

  function getExerciseElapsed(index){
    if(!currentUser) return 0;
    const done=!!currentUser.completedExercises?.[index];
    const completed=currentUser.exerciseCompletedSeconds?.[index];
    if(done && hasFiniteNumber(completed)) return Math.min(3600,Math.max(0,Number(completed)));
    const started=currentUser.exerciseStartedAt?.[index];
    if(!hasFiniteNumber(started)) return 0;
    return Math.min(3600,Math.max(0,Math.floor((now()-Number(started))/1000)));
  }

  function getExerciseRemaining(index){
    return Math.max(0,3600-getExerciseElapsed(index));
  }

  function liveScoreFromElapsed(sec){
    const seconds=Math.max(0,Math.min(3600,Number(sec)||0));
    return Math.max(40,100-Math.floor(seconds/60));
  }

  function finalExerciseScore(index){
    if(!currentUser?.completedExercises?.[index]) return 0;
    const saved=currentUser.exerciseScores?.[index];
    if(hasFiniteNumber(saved)) return Math.max(40,Math.min(100,Number(saved)));
    return liveScoreFromElapsed(currentUser.exerciseCompletedSeconds?.[index]||3600);
  }

  function scoreForExercise(index){
    if(!currentUser) return 0;
    if(currentUser.completedExercises?.[index]) return finalExerciseScore(index);
    if(!hasFiniteNumber(currentUser.exerciseStartedAt?.[index])) return 0;
    return liveScoreFromElapsed(getExerciseElapsed(index));
  }

  function menuScoreForExercise(index){
    if(!currentUser) return 0;
    if(!currentUser.completedExercises?.[index]) return 0;
    return finalExerciseScore(index);
  }

  function updateLiveScoreDisplays(){
    if(!currentUser) return;
    $$("[data-live-active-score]").forEach(el=>{
      el.textContent=String(scoreForExercise(currentExercise));
    });
    $$("[data-live-score-ex]").forEach(el=>{
      const i=Number(el.dataset.liveScoreEx);
      if(Number.isInteger(i)) el.textContent=String(menuScoreForExercise(i));
    });
    const exTimer=$("#exerciseWindowTimer");
    if(exTimer) exTimer.textContent=formatTime(getExerciseRemaining(currentExercise));
  }

  function recomputeStudentAverageScore(){
    if(!currentUser) return;
    const scores=(currentUser.exerciseScores||[]).filter(hasFiniteNumber).map(Number);
    currentUser.score=scores.length ? Math.round(scores.reduce((a,b)=>a+b,0)/scores.length) : 0;
  }

  async function autoFinishExpiredExercise(index){
    if(!currentUser || currentUser.completedExercises?.[index]) return;
    const started=currentUser.exerciseStartedAt?.[index];
    if(!hasFiniteNumber(started)) return;
    if(getExerciseElapsed(index)<3600) return;

    currentUser.completedExercises[index]=true;
    currentUser.exerciseCompletedSeconds[index]=3600;
    currentUser.exerciseCompletedAt[index]=Number(started)+3600*1000;
    currentUser.exerciseScores[index]=40;
    recomputeStudentAverageScore();

    if(currentUser.completedExercises.every(Boolean)){
      currentUser.completedAt=now();
    }

    if(!teacherDemoMode){
      setStudent(currentUser);
      try{await persistStudent();}catch(e){}
    }

    if($("#exercisePanel").dataset.opened==="1" && currentExercise===index){
      closeExerciseWindow();
      renderStudent();
      toast(`Waktu Latihan ${index+1} habis. Tes otomatis selesai dengan nilai 40.`);
    }else{
      renderStudent();
    }
  }

  function startTimer(){
    clearInterval(timerInterval);
    let busy=false;
    const tick=async()=>{
      if(!currentUser || busy) return;
      busy=true;
      try{
        currentUser.exerciseStartedAt ||= Array(8).fill(null);
        currentUser.exerciseCompletedSeconds ||= Array(8).fill(null);
        currentUser.exerciseCompletedAt ||= Array(8).fill(null);
        currentUser.exerciseScores ||= Array(8).fill(null);

        for(let i=0;i<8;i++){
          if(!currentUser.completedExercises?.[i] && hasFiniteNumber(currentUser.exerciseStartedAt?.[i]) && getExerciseElapsed(i)>=3600){
            await autoFinishExpiredExercise(i);
          }
        }

        updateLiveScoreDisplays();
      }finally{
        busy=false;
      }
    };
    tick();
    timerInterval=setInterval(tick,1000);
  }

  function scoreFromElapsed(sec,complete){
    if(!complete) return 40;
    return liveScoreFromElapsed(sec);
  }

  function timeBand(sec){
    if(sec===null || sec===undefined || !Number.isFinite(Number(sec))) return {score:null,cls:"time-unknown",label:"Waktu tidak tercatat"};
    const score=liveScoreFromElapsed(sec);
    const cls=score>=90?"time-90":score>=80?"time-80":score>=70?"time-70":score>=60?"time-60":score>=50?"time-50":"time-40";
    return {score,cls,label:`Nilai ${score}`};
  }

  function hashString(str){
    let h=2166136261>>>0;
    for(let i=0;i<str.length;i++){
      h^=str.charCodeAt(i);
      h=Math.imul(h,16777619);
    }
    return h>>>0;
  }

  function mulberry32(seed){
    return function(){
      let t=seed+=0x6D2B79F5;
      t=Math.imul(t^t>>>15,t|1);
      t^=t+Math.imul(t^t>>>7,t|61);
      return ((t^t>>>14)>>>0)/4294967296;
    };
  }

  function shuffleSeeded(arr,rand){
    const out=[...arr];
    for(let i=out.length-1;i>0;i--){
      const j=Math.floor(rand()*(i+1));
      [out[i],out[j]]=[out[j],out[i]];
    }
    return out;
  }

  function cellAddress(index){
    const col=String.fromCharCode(65+(index%20));
    const row=Math.floor(index/20)+1;
    return `${col}${row}`;
  }

  function buildL1Dataset(){
    const identity=`${currentUser.className}::${currentUser.name}`;
    const rand=mulberry32(hashString(identity));
    const values=shuffleSeeded(Array.from({length:400},(_,i)=>i+1),rand);
    const candidates=shuffleSeeded(Array.from({length:400},(_,i)=>i),rand).slice(0,10);
    const questions=candidates.map((idx,q)=>({
      no:q+1,
      value:values[idx],
      address:cellAddress(idx),
      index:idx
    }));
    return {values,questions};
  }

  function openExerciseWindow(i){
    currentExercise=i;
    currentUser.exerciseStartedAt ||= Array(8).fill(null);
    currentUser.exerciseScores ||= Array(8).fill(null);

    if(!currentUser.completedExercises?.[i] && !hasFiniteNumber(currentUser.exerciseStartedAt[i])){
      currentUser.exerciseStartedAt[i]=now();
      if(!teacherDemoMode){
        setStudent(currentUser);
        persistStudent();
      }
    }

    const panel=$("#exercisePanel");
    panel.dataset.opened="1";
    panel.classList.remove("hidden");
    document.body.classList.add("exercise-window-open");
    renderExercise(i);
    panel.scrollTop=0;
  }

  function closeExerciseWindow(){
    const panel=$("#exercisePanel");
    panel.dataset.opened="0";
    panel.classList.add("hidden");
    panel.innerHTML="";
    document.body.classList.remove("exercise-window-open");
    window.scrollTo({top:0,behavior:"smooth"});
  }

  async function exitStudentSession(){
    if(teacherDemoMode){
      clearInterval(timerInterval);
      try{ window.close(); }catch(e){}
      if(!window.closed){
        window.location.href=window.location.origin+window.location.pathname;
      }
      return;
    }
    if(!canStudentExit()){
      toast("Tombol keluar sedang dikunci guru.");
      return;
    }
    clearInterval(timerInterval);
    closeExerciseWindow();
    currentUser=null;
    try{navigator.keyboard?.unlock?.()}catch(e){}
    try{if(document.fullscreenElement) await document.exitFullscreen()}catch(e){}
    showView("#homeView");
    switchLoginMode("student");
  }

  async function completeExercise(i){
    if(currentUser.completedExercises[i]) return;

    currentUser.exerciseStartedAt ||= Array(8).fill(null);
    currentUser.exerciseCompletedSeconds ||= Array(8).fill(null);
    currentUser.exerciseCompletedAt ||= Array(8).fill(null);
    currentUser.exerciseScores ||= Array(8).fill(null);

    if(!hasFiniteNumber(currentUser.exerciseStartedAt[i])){
      currentUser.exerciseStartedAt[i]=now();
    }

    const elapsed=Math.min(3600,getExerciseElapsed(i));
    currentUser.completedExercises[i]=true;
    currentUser.exerciseCompletedSeconds[i]=elapsed;
    currentUser.exerciseCompletedAt[i]=now();
    currentUser.exerciseScores[i]=liveScoreFromElapsed(elapsed);
    recomputeStudentAverageScore();

    if(currentUser.completedExercises.every(Boolean)){
      currentUser.completedAt=now();
    }

    if(!teacherDemoMode){
      setStudent(currentUser);
      try{ await persistStudent(); }catch(e){}
    }
    closeExerciseWindow();
    renderStudent();
    toast(teacherDemoMode
      ? `Mode demonstrasi: Latihan ${i+1} selesai tanpa menyimpan nilai siswa.`
      : `Latihan ${i+1} selesai. Nilai akhir: ${currentUser.exerciseScores[i]}.`);
  }

  function renderStudent(){
    if(!currentUser) return;

    const completed=currentUser.completedExercises.filter(Boolean).length;
    const percent=Math.round(completed/8*100);

    $("#studentIdentity").innerHTML=`<small class="student-hello">Halo, ${escapeHtml(currentUser.name)}</small><span>Pilih jendela latihan</span>`;
    $("#studentStatusLine").textContent="Pilih latihan yang dibuka oleh guru. Status kunci diperbarui otomatis.";
    $("#studentExitBtn").disabled=!canStudentExit();
    $("#studentProgressBar span").style.width=`${percent}%`;

    const actions=$(".workspace-actions");
    if(actions){
      let quick=$("#studentQuickStats");
      if(!quick){
        actions.insertAdjacentHTML("afterbegin",`<div id="studentQuickStats" class="student-quick-stats">
          <div><b id="studentCompletedText">0 dari 8 selesai</b><strong id="studentPercentText">0%</strong></div>
          <span class="student-mini-progress"><i id="studentMiniProgress"></i></span>
          <small id="studentExitHint"></small>
        </div>`);
      }
      $("#studentCompletedText").textContent=`${completed} dari 8 selesai`;
      $("#studentPercentText").textContent=`${percent}%`;
      $("#studentMiniProgress").style.width=`${percent}%`;
      $("#studentExitHint").textContent=canStudentExit()
        ? "Tombol keluar dibuka guru. Anda dapat keluar."
        : "Tombol keluar sedang dikunci guru.";
    }

    const timerCard=$(".timer-card");
    if(timerCard) timerCard.classList.add("student-timer-hidden");

    const icons=["▦","∑","🔗","∑","IF","▤","☷","{ }"];
    const desc=[
      "Cari alamat 10 angka pada tabel unik 20 × 20.",
      "Isi semua Total dan Rata-rata, lalu kerjakan soal tambahan.",
      "Salin rumus, kata, dan tautan dengan tepat.",
      "Latihan SUMIF dan AVERAGEIF dalam satu jendela.",
      "Praktik rumus IF dengan kondisi dan hasil benar/salah.",
      "Cari data pada tabel referensi.",
      "Susun langkah penyelesaian masalah.",
      "Tulis satu baris kode dengan tepat."
    ];
    const themes=["green","blue","cyan","purple","orange","red","indigo","slate"];

    $("#studentExerciseNav").innerHTML=EXERCISES.map((e,i)=>{
      const open=!!settings.unlocked[i];
      const done=!!currentUser.completedExercises[i];
      return `<button type="button" data-ex="${i}" class="student-window-card theme-${themes[i]} ${open?"open":"locked"} ${done?"done":""}">
        <span class="student-window-top">
          <span class="student-window-icon">${icons[i]}</span>
          <span class="student-score-badge"><small>NILAI</small><strong data-live-score-ex="${i}">${menuScoreForExercise(i)}</strong></span>
          <b>${String(i+1).padStart(2,"0")}</b>
        </span>
        <strong>${escapeHtml(e[0])}</strong>
        <small>${desc[i]}</small>
        <span class="student-window-action">${done?"✓ Selesai":open?"Mulai Latihan":"🔒 Terkunci"}</span>
      </button>`;
    }).join("");

    updateLiveScoreDisplays();

    $$("#studentExerciseNav [data-ex]").forEach(card=>card.addEventListener("click",()=>{
      const i=+card.dataset.ex;
      if(!settings.unlocked[i]){
        toast(`Latihan ${i+1} masih dikunci oleh guru.`);
        return;
      }
      openExerciseWindow(i);
    }));

    const panel=$("#exercisePanel");
    if(panel.dataset.opened==="1"){
      if(settings.unlocked[currentExercise]){
        panel.classList.remove("hidden");
        document.body.classList.add("exercise-window-open");
        renderExercise(currentExercise);
      }else{
        closeExerciseWindow();
        toast(`Latihan ${currentExercise+1} baru saja dikunci oleh guru.`);
      }
    }
  }

  function l1InlineGuideSlides(){
    return [
      `<div class="l1-inline-guide-step"><strong>1. Cari angka pada tabel</strong><p>Baca nilai pada soal, lalu cari angka tersebut di tabel 20 × 20. Setiap angka hanya muncul satu kali.</p><div class="l1-inline-mini-example"><span>Soal contoh</span><b>Nilai 62 berada pada sel mana?</b></div></div>`,
      `<div class="l1-inline-guide-step"><strong>2. Lihat huruf kolom</strong><p>Setelah menemukan angkanya, lihat huruf di bagian atas kolom. Huruf kolom berada dari <b>A sampai T</b>.</p><div class="l1-inline-address-demo"><i>D</i><span>huruf kolom</span></div></div>`,
      `<div class="l1-inline-guide-step"><strong>3. Lihat nomor baris</strong><p>Lihat nomor di sisi kiri pada baris tempat angka ditemukan. Gabungkan huruf kolom dan nomor baris.</p><div class="l1-inline-address-demo"><i>D2</i><span>contoh alamat sel</span></div></div>`,
      `<div class="l1-inline-guide-step"><strong>4. Ketik jawaban dan periksa</strong><p>Ketik alamat sel tanpa tanda sama dengan, misalnya <b>D2</b>. Isi semua 10 jawaban, lalu klik <b>Periksa 10 jawaban</b>. Jika semua benar, tombol berubah menjadi <b>✓ Selesai</b>.</p></div>`
    ];
  }

  function l1InlineGuideMarkup(){
    const slides=l1InlineGuideSlides();
    l1InlineGuideIndex=Math.max(0,Math.min(l1InlineGuideIndex,slides.length-1));
    return `<section class="l1-inline-guide" aria-label="Cara mengerjakan Latihan 1">
      <div class="l1-inline-guide-head">
        <div><span>📖</span><b>Cara mengerjakan</b></div>
        <small>Slide ${l1InlineGuideIndex+1} / ${slides.length}</small>
      </div>
      <div id="l1InlineGuideBody" class="l1-inline-guide-body">${slides[l1InlineGuideIndex]}</div>
      <div class="l1-inline-guide-nav">
        <button type="button" data-l1-guide-prev ${l1InlineGuideIndex===0?"disabled":""}>← Sebelumnya</button>
        <span>${slides.map((_,idx)=>`<i class="${idx===l1InlineGuideIndex?"active":""}"></i>`).join("")}</span>
        <button type="button" data-l1-guide-next ${l1InlineGuideIndex===slides.length-1?"disabled":""}>Berikutnya →</button>
      </div>
    </section>`;
  }

  function exerciseHeader(i,extra=""){
    const completed=currentUser?.completedExercises?.filter(Boolean).length||0;
    const percent=Math.round(completed/8*100);
    const guideArea=i===0
      ? l1InlineGuideMarkup()
      : `<button class="guide-btn" data-guide="${i}">📖 Cara mengerjakan</button>`;
    return `<div class="exercise-window-header">
      <button class="exercise-back-btn" data-close-exercise aria-label="Kembali ke menu">‹</button>
      <div class="exercise-window-heading">
        <small>Jendela latihan ${i+1} dari 8</small>
        <h3>${escapeHtml(EXERCISES[i][0])}</h3>
      </div>
      <div class="exercise-score-card"><small>NILAI SAAT INI</small><strong data-live-active-score="1">${scoreForExercise(i)}</strong><span>60 menit · turun 1 poin/menit</span></div>
      <div class="exercise-window-progress">
        <div><span>Progres keseluruhan</span><b>${percent}%</b></div>
        <span class="exercise-window-progressbar"><i style="width:${percent}%"></i></span>
        <small>Sisa waktu: <b id="exerciseWindowTimer">${formatTime(getExerciseRemaining(i))}</b></small>
      </div>
    </div>
    <div class="exercise-title exercise-title-inner ${i===0?"l1-title-with-guide":""}">
      <div class="exercise-title-copy">
        <span class="exercise-no">LATIHAN ${String(i+1).padStart(2,"0")}</span>
        <h3>${escapeHtml(EXERCISES[i][0])}</h3>
        <p>${escapeHtml(EXERCISES[i][1])}</p>
      </div>
      ${guideArea}
    </div>${extra}`;
  }

  function lockedPanel(i){
    return `${exerciseHeader(i)}<div class="locked-panel"><div class="big">🔒</div><h3>Latihan terkunci</h3><p>Guru belum membuka latihan ini.</p></div>`;
  }

  function renderExercise(i){
    const panel=$("#exercisePanel");
    if(!settings.unlocked[i]){panel.innerHTML=lockedPanel(i);bindGuide();return;}
    if(i===0){renderL1(panel);return;}
    if(i===1) renderL2(panel);
    if(i===2) renderL3(panel);
    if(i===3) renderSumifAverageif(panel);
    if(i===4) renderIfPractice(panel);
    if(i===5) renderVlookup(panel);
    if(i===6) renderAlgorithm(panel);
    if(i===7) renderCoding(panel);
    bindGuide();
  }

  function getExState(i,defaults={}){
    currentUser.exerciseState ||= {};
    currentUser.exerciseState[i] ||= structuredClone(defaults);
    return currentUser.exerciseState[i];
  }

  function renderL1(panel){
    const dataset=buildL1Dataset();
    const st=getExState(0,{answers:{},checked:{},readyToFinish:false,activeCell:null});
    st.answers ||= {};
    st.checked ||= {};
    if(st.readyToFinish===undefined) st.readyToFinish=false;

    const letters=Array.from({length:20},(_,i)=>String.fromCharCode(65+i));
    const allFilled=dataset.questions.every((q,i)=>String(st.answers[i]||"").trim());
    const allCorrect=dataset.questions.every((q,i)=>String(st.answers[i]||"").trim().toUpperCase()===q.address);

    const gridRows=Array.from({length:20},(_,r)=>`
      <tr>
        <th class="l1-rowhead">${r+1}</th>
        ${Array.from({length:20},(_,c)=>{
          const idx=r*20+c;
          const addr=cellAddress(idx);
          return `<td data-l1-cell="${addr}" data-l1-value="${dataset.values[idx]}" class="${st.activeCell===addr?"active-cell":""}">${dataset.values[idx]}</td>`;
        }).join("")}
      </tr>`).join("");

    const answerCards=dataset.questions.map((q,i)=>{
      const v=String(st.answers[i]||"");
      const status=st.checked[i];
      return `<div class="l1-answer-card ${status===true?"correct":status===false?"wrong":""}">
        <div class="l1-answer-title"><span>${i+1}</span><strong>Nilai ${q.value} berada pada sel mana?</strong></div>
        <input data-l1-answer="${i}" value="${escapeHtml(v)}" maxlength="4" autocomplete="off" spellcheck="false" placeholder="CONTOH: E10">
        <small>${status===true?"✓ Benar":status===false?`✕ Belum tepat`:""}</small>
      </div>`;
    }).join("");

    const sideItems=EXERCISES.map((e,i)=>{
      const open=!!settings.unlocked[i], done=!!currentUser.completedExercises[i];
      return `<div class="l1-side-ex ${i===0?"active":""} ${!open?"locked":""}">
        <span>${i+1}</span><b>${escapeHtml(e[0])}</b><em>${done?"✓":i===0?"Aktif":open?"Dibuka":"🔒"}</em>
      </div>`;
    }).join("");

    panel.innerHTML=`
      ${exerciseHeader(0)}
      <div class="l1-layout">
        <main class="l1-main">
          <section class="l1-instruction">
            <h4>▣ &nbsp; Instruksi</h4>
            <p>Cari setiap angka pada tabel. Gabungkan huruf kolom A–T dan nomor baris 1–20 untuk menulis alamat sel lengkap.</p>
            <div>Contoh jawaban: <b>T2</b> atau <b>E10</b></div>
          </section>

          <section class="l1-note">Amati tabel angka <b>20 × 20</b>, lalu jawab seluruh 10 pertanyaan di bawah tabel.</section>

          <section class="l1-table-card">
            <div class="l1-table-scroll">
              <table class="l1-number-grid">
                <thead><tr><th></th>${letters.map(l=>`<th>${l}</th>`).join("")}</tr></thead>
                <tbody>${gridRows}</tbody>
              </table>
            </div>
          </section>

          <section class="l1-answer-section">
            <div class="l1-answer-section-head">
              <div><h4>Jawab 10 soal</h4><p>Masukkan alamat sel lengkap, misalnya T2 atau E10.</p></div>
              <span>${Object.values(st.answers).filter(v=>String(v).trim()).length}/10 terisi</span>
            </div>
            <div class="l1-answer-grid">${answerCards}</div>
            <button id="l1CheckBtn" class="l1-check-btn ${st.readyToFinish&&allCorrect?"ready":""}" ${(!allFilled && !st.readyToFinish)?"disabled":""}>
              ${st.readyToFinish&&allCorrect?"✓ Selesai":"✓ Periksa 10 jawaban"}
            </button>
          </section>
        </main>

        <aside class="l1-sidebar">
          <section class="l1-participant">
            <small>PESERTA</small>
            <h4>${escapeHtml(currentUser.name)}</h4>
            <p>Kelas ${escapeHtml(currentUser.className)}</p>
            <button type="button" data-exit-student ${canStudentExit()?"":"disabled"}>↪ Keluar</button>
            <small class="l1-exit-note">${canStudentExit()?"Tombol keluar dibuka guru. Anda dapat keluar.":"Tombol keluar sedang dikunci guru."}</small>
          </section>

          <section class="l1-side-card">
            <h4>Daftar sub-latihan</h4>
            <div class="l1-side-list">${sideItems}</div>
          </section>

          <section class="l1-side-card">
            <h4>Blok sel aktif</h4>
            <div id="l1ActiveCell">${st.activeCell?`<b>${st.activeCell}</b><span>Nilai ${dataset.values[(st.activeCell.charCodeAt(0)-65)+((Number(st.activeCell.slice(1))-1)*20)]}</span>`:"Belum ada sel dipilih."}</div>
          </section>

          <section class="l1-quick-tip">
            <h4>Petunjuk cepat</h4>
            <p>Geser tabel ke kanan atau kiri untuk melihat semua kolom. Setiap angka hanya muncul satu kali.</p>
            <div>Format jawaban: <b>A1–T20</b></div>
          </section>
        </aside>
      </div>
    `;

    $$("[data-l1-cell]").forEach(td=>td.addEventListener("click",()=>{
      st.activeCell=td.dataset.l1Cell;
      persistStudent();
      renderL1(panel);
    }));

    $$("[data-l1-answer]").forEach(inp=>inp.addEventListener("input",()=>{
      const i=+inp.dataset.l1Answer;
      const normalized=inp.value.toUpperCase().replace(/\s+/g,"");
      inp.value=normalized;
      st.answers[i]=normalized;
      delete st.checked[i];
      st.readyToFinish=false;
      const card=inp.closest(".l1-answer-card");
      if(card){card.classList.remove("correct","wrong");const msg=card.querySelector("small");if(msg)msg.textContent="";}
      persistStudent();
      const filled=dataset.questions.every((q,j)=>String(st.answers[j]||"").trim());
      const checkBtn=$("#l1CheckBtn");
      checkBtn.disabled=!filled;
      checkBtn.classList.remove("ready");
      checkBtn.textContent="✓ Periksa 10 jawaban";
      const counter=$(".l1-answer-section-head span");
      if(counter) counter.textContent=`${Object.values(st.answers).filter(v=>String(v).trim()).length}/10 terisi`;
    }));

    $("#l1CheckBtn").addEventListener("click",async()=>{
      if(st.readyToFinish && allCorrect){
        await completeExercise(0);
        return;
      }

      let correct=0;
      dataset.questions.forEach((q,i)=>{
        const ok=String(st.answers[i]||"").trim().toUpperCase()===q.address;
        st.checked[i]=ok;
        if(ok) correct++;
      });
      st.readyToFinish=correct===10;
      try{ await persistStudent(); }catch(e){}
      const keepScrollY=window.scrollY;
      renderL1(panel);
      requestAnimationFrame(()=>window.scrollTo({top:keepScrollY,left:0,behavior:"auto"}));
      toast(correct===10
        ? "Semua jawaban benar. Klik Selesai untuk mengirim hasil."
        : `${correct} dari 10 jawaban benar. Perbaiki jawaban yang masih salah.`);
    });

    bindGuide();
  }

  function finishButton(i,enabled){
    const done=currentUser.completedExercises[i];
    return `<div class="finish-row">
      <button id="finishExerciseBtn" class="${done?"success-btn":"primary-btn"}" ${(!enabled&& !done)?"disabled":""}>
      ${done?"✓ Latihan selesai":"Selesaikan latihan"}</button>
    </div>`;
  }

  function bindFinish(i,enabled){
    const btn=$("#finishExerciseBtn");if(!btn)return;
    btn.addEventListener("click",async()=>{
      if(currentUser.completedExercises[i]) return;
      if(!enabled){toast("Selesaikan semua soal terlebih dahulu.");return;}
      await completeExercise(i);
    });
  }

  function renderL2(panel){
    const st=getExState(1,{});
    st.formulas ||= {};
    st.extra ||= {};
    st.checkedExtra ||= {};
    st.guideSlide = Number.isInteger(st.guideSlide)?st.guideSlide:0;
    st.readyToFinish = !!st.readyToFinish;
    st.activeCell ||= null;

    const horizontalRows=[
      {item:"Buku Tulis",vals:[12,35,35,24,14]},
      {item:"Pulpen",vals:[31,48,32,38,38]},
      {item:"Pensil",vals:[15,28,15,46,29]},
      {item:"Penghapus",vals:[22,13,28,22,15]},
      {item:"Penggaris",vals:[43,22,18,39,16]}
    ].map((r,i)=>({...r,row:i+2,total:r.vals.reduce((a,b)=>a+b,0),avg:r.vals.reduce((a,b)=>a+b,0)/r.vals.length}));

    const verticalRows=[
      {item:"Buku Tulis",vals:[23,26,18,14,12]},
      {item:"Pulpen",vals:[34,39,45,44,31]},
      {item:"Pensil",vals:[30,25,39,21,13]},
      {item:"Penghapus",vals:[15,10,40,36,19]},
      {item:"Penggaris",vals:[32,21,27,40,39]}
    ];
    const classCols=["3P","3Q","3R","3S","3T"];
    const vTotals=classCols.map((_,c)=>verticalRows.reduce((s,r)=>s+r.vals[c],0));
    const vAvgs=vTotals.map(x=>x/5);

    const hTasks=[];
    horizontalRows.forEach((r,i)=>{
      hTasks.push({key:`h-g${i}`,addr:`G${r.row}`,formula:`=SUM(B${r.row}:F${r.row})`,result:r.total});
      hTasks.push({key:`h-h${i}`,addr:`H${r.row}`,formula:`=AVERAGE(B${r.row}:F${r.row})`,result:r.avg});
    });
    const vTasks=[];
    classCols.forEach((cls,c)=>{
      const letter=String.fromCharCode(66+c);
      vTasks.push({key:`v-sum${c}`,addr:`${letter}7`,formula:`=SUM(${letter}2:${letter}6)`,result:vTotals[c]});
      vTasks.push({key:`v-avg${c}`,addr:`${letter}8`,formula:`=AVERAGE(${letter}2:${letter}6)`,result:vAvgs[c]});
    });
    const allTasks=[...hTasks,...vTasks];
    const hCorrect=hTasks.every(t=>st.formulas[t.key]?.correct);
    const vCorrect=vTasks.every(t=>st.formulas[t.key]?.correct);

    const hExtra=[
      {q:"Berapa total Buku Tulis dari Januari sampai Mei?",look:"G2",answer:horizontalRows[0].total},
      {q:"Berapa rata-rata Pulpen dari Januari sampai Mei?",look:"H3",answer:horizontalRows[1].avg},
      {q:"Berapa total Pensil dari Januari sampai Mei?",look:"G4",answer:horizontalRows[2].total},
      {q:"Berapa rata-rata Penghapus dari Januari sampai Mei?",look:"H5",answer:horizontalRows[3].avg},
      {q:"Berapa total Penggaris dari Januari sampai Mei?",look:"G6",answer:horizontalRows[4].total}
    ];
    const vExtra=[
      {q:"Berapa rata-rata seluruh barang untuk Kelas 3P?",look:"B8",answer:vAvgs[0]},
      {q:"Berapa total seluruh barang untuk Kelas 3Q?",look:"C7",answer:vTotals[1]},
      {q:"Berapa rata-rata seluruh barang untuk Kelas 3R?",look:"D8",answer:vAvgs[2]},
      {q:"Berapa total seluruh barang untuk Kelas 3S?",look:"E7",answer:vTotals[3]},
      {q:"Berapa rata-rata seluruh barang untuk Kelas 3T?",look:"F8",answer:vAvgs[4]}
    ];
    const allExtra=[...hExtra,...vExtra];

    const taskCount=allTasks.filter(t=>String(st.formulas[t.key]?.value||"").trim()).length;
    const hTaskCount=hTasks.filter(t=>String(st.formulas[t.key]?.value||"").trim()).length;
    const vTaskCount=vTasks.filter(t=>String(st.formulas[t.key]?.value||"").trim()).length;
    const hExtraCount=hExtra.filter((q,i)=>String(st.extra[`h${i}`]??"").trim()).length;
    const vExtraCount=vExtra.filter((q,i)=>String(st.extra[`v${i}`]??"").trim()).length;
    const allExtraFilled=allExtra.every((q,i)=>String(st.extra[i<5?`h${i}`:`v${i-5}`]??"").trim());
    const allFormulaCorrect=allTasks.every(t=>st.formulas[t.key]?.correct);
    const extraAnswerIsCorrect=(value,answer)=>{
      const a=Number(value),b=Number(answer);
      return Number.isFinite(a)&&Number.isFinite(b)&&Math.abs(a-b)<0.000001;
    };
    const allExtraCorrect=allExtra.every((q,i)=>extraAnswerIsCorrect(st.extra[i<5?`h${i}`:`v${i-5}`],q.answer));

    const sideItems=EXERCISES.map((e,i)=>{
      const open=!!settings.unlocked[i],done=!!currentUser.completedExercises[i];
      return `<div class="l2-side-ex ${i===1?"active":""} ${!open?"locked":""}"><span>${i+1}</span><b>${escapeHtml(e[0])}</b><em>${done?"✓":i===1?"Aktif":open?"Dibuka":"🔒"}</em></div>`;
    }).join("");

    const formulaBox=t=>{
      const saved=st.formulas[t.key]||{};
      if(saved.correct){
        return `<button type="button" class="l2-formula-result" id="l2-cell-${t.addr}" data-l2-active="${t.addr}" data-formula="${escapeHtml(t.formula)}" data-result="${t.result}"><strong>${t.result}</strong><small>${escapeHtml(t.formula)}</small></button>`;
      }
      return `<input id="l2-cell-${t.addr}" class="l2-formula-input ${saved.value&&!saved.correct?"wrong":""}" data-l2-formula="${t.key}" data-addr="${t.addr}" data-expected="${escapeHtml(t.formula)}" data-result="${t.result}" value="${escapeHtml(saved.value||"")}" placeholder="${t.formula.startsWith('=AVERAGE')?'=AVERAGE(...)':'=SUM(...)'}" autocomplete="off" spellcheck="false">`;
    };

    const guideSlides=[
      {title:"1. Kenali area tabel",text:"Angka sumber berada di tengah. Kolom atau baris Total diisi dengan SUM, sedangkan Rata-rata diisi dengan AVERAGE.",mode:"area"},
      {title:"2. Klik sel jawaban",text:"Klik sel Total atau Rata-rata yang ingin diisi. Contoh pertama: klik G2 untuk Total Buku Tulis. Setelah sel jawaban aktif, Anda dapat mengeklik satu sel sumber atau memblok beberapa sel.",mode:"target"},
      {title:"3. Mulai menulis rumus",text:"Ketik =SUM( untuk penjumlahan atau =AVERAGE( untuk rata-rata. Jangan lupa tanda kurung buka.",mode:"type"},
      {title:"4. Tentukan blok angka",text:"Setelah Anda mengetik =SUM( atau =AVERAGE( secara manual, klik-tahan sel B2 lalu seret sampai F2. Blok hanya memasukkan rentang B2:F2 tanpa menambahkan kurung tutup.",mode:"range"},
      {title:"5. Tulis kurung tutup lalu Enter",text:"Setelah rentang masuk, ketik tanda ) sendiri sampai rumus lengkap, misalnya =SUM(B2:F2). Setelah itu tekan Enter untuk memeriksa rumus.",mode:"done"}
    ];
    const gs=guideSlides[Math.max(0,Math.min(4,st.guideSlide))];
    const miniCells=[12,35,35,24,14];
    const miniFormula="";
    const miniResult="";
    const miniSheet=`<div class="l2-sim-sheet">
      <div class="l2-sim-fx"><span>fx</span><input id="l2SimFormula" value="${miniFormula}" placeholder="Ketik =SUM( atau =AVERAGE(" autocomplete="off" spellcheck="false"></div>
      <div class="l2-sim-grid">
        <div class="head"></div><div class="head">A</div><div class="head">B</div><div class="head">C</div><div class="head">D</div><div class="head">E</div><div class="head">F</div><div class="head">G</div>
        <div class="head">1</div><div class="label">Produk</div><div>Jan</div><div>Feb</div><div>Mar</div><div>Apr</div><div>Mei</div><div>Total</div>
        <div class="head">2</div><div class="label">Buku Tulis</div>${miniCells.map((v,i)=>`<div data-l2-sim-source="${String.fromCharCode(66+i)}2" class="${gs.mode==="range"?'range':''}">${v}</div>`).join("")}<div data-l2-sim-target="G2" class="${['target','type','range','done'].includes(gs.mode)?'focus':''}">${miniResult}</div>
      </div>
      <div class="l2-sim-status"><span>Latihan 2 • Tabel mendatar</span><b id="l2SimStatus">Sel aktif: ${['target','type','range','done'].includes(gs.mode)?'G2':'–'}</b><button type="button" id="l2SimEnter" disabled>Enter</button></div>
      <div class="l2-sim-help">Coba langsung: <b>klik G2</b> → <b>klik/seret B2 sampai F2</b> → tekan <b>Enter</b>.</div>
    </div>`;

    const extraCards=(arr,prefix,enabled)=>arr.map((q,i)=>{
      const key=`${prefix}${i}`,val=st.extra[key]??"",checked=st.checkedExtra[key];
      return `<div class="l2-extra-card ${checked===true?'correct':checked===false?'wrong':''}">
        <div class="l2-extra-head"><span>${i+1}</span><strong>${q.q}</strong><button type="button" data-l2-look="${q.look}">Lihat ${q.look}</button></div>
        <input type="number" step="any" data-l2-extra="${key}" value="${escapeHtml(val)}" ${enabled?'':'disabled'} placeholder="${enabled?'Isi jawaban angka':'Selesaikan tabel terlebih dahulu'}">
        <small>${checked===true?'✓ Benar':checked===false?'✕ Belum tepat':''}</small>
      </div>`;
    }).join("");

    const completed=currentUser?.completedExercises?.filter(Boolean).length||0;
    const percent=Math.round(completed/8*100);
    panel.innerHTML=`
      <div class="l2-window-header">
        <button class="exercise-back-btn" data-close-exercise aria-label="Kembali">‹</button>
        <div><small>Jendela latihan 2 dari 8</small><h3>Latihan SUM dan AVERAGE</h3></div>
        <div class="exercise-score-card"><small>NILAI SAAT INI</small><strong data-live-active-score="1">${scoreForExercise(1)}</strong><span>60 menit · turun 1 poin/menit</span></div>
        <div class="l2-window-progress"><div><span>Progres keseluruhan</span><b>${percent}%</b></div><span><i style="width:${percent}%"></i></span><small>Sisa waktu: <b id="exerciseWindowTimer">${formatTime(getExerciseRemaining(1))}</b></small></div>
      </div>
      <div class="l2-layout">
        <main class="l2-main">
          <section class="l2-learning-row">
            <div class="l2-material-card"><h4>📖 &nbsp; Materi singkat</h4><p><b>SUM</b> menjumlahkan angka, sedangkan <b>AVERAGE</b> menghitung rata-rata. Tanda titik dua menunjukkan rentang dari sel awal sampai sel akhir.</p><div><code>=SUM(B2:F2)</code><code>=AVERAGE(B2:F2)</code></div></div>
            <div class="l2-guide-card"><div class="l2-guide-head"><h4>☷ &nbsp; Petunjuk Pengerjaan</h4><span>${st.guideSlide+1}/5</span></div><div class="l2-guide-slide"><h3>${gs.title}</h3><p>${gs.text}</p>${miniSheet}</div><div class="l2-guide-nav"><button type="button" data-l2-guide-prev ${st.guideSlide===0?'disabled':''}>‹ &nbsp; Sebelumnya</button><div>${guideSlides.map((_,i)=>`<i class="${i===st.guideSlide?'active':''}"></i>`).join("")}</div><button type="button" data-l2-guide-next ${st.guideSlide===4?'disabled':''}>Berikutnya &nbsp; ›</button></div></div>
          </section>
          <section class="l2-instruction-band">Isi semua <b>Total</b> dan <b>Rata-rata</b> pada tabel mendatar dan menurun, lalu kerjakan <b>5 soal tambahan</b> di bawah setiap tabel.</section>

          <section class="l2-section-card">
            <div class="l2-section-head"><div><h3>A. Tabel mendatar</h3><p>Isi seluruh kolom Total dan Rata-rata menggunakan data B–F pada baris yang sama.</p></div><span>${hTaskCount}/10 sel tabel terisi</span></div>
            <div class="l2-table-scroll"><table class="l2-sheet"><thead><tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th><th>F</th><th>G</th><th>H</th></tr><tr><th>1</th><th>Produk</th><th>Januari</th><th>Februari</th><th>Maret</th><th>April</th><th>Mei</th><th>Total</th><th>Rata-rata</th></tr></thead><tbody>${horizontalRows.map((r,i)=>`<tr><th>${r.row}</th><td>${r.item}</td>${r.vals.map(v=>`<td>${v}</td>`).join('')}<td class="answer-cell">${formulaBox(hTasks[i*2])}</td><td class="answer-cell">${formulaBox(hTasks[i*2+1])}</td></tr>`).join('')}</tbody></table></div>
            <div class="l2-extra-box"><div class="l2-extra-title"><div><h4>5 soal tambahan</h4><p>Isi semua Total dan Rata-rata, lalu tekan Enter pada setiap rumus untuk membuka soal tambahan.</p></div><span id="l2HExtraCount">${hExtraCount}/5 terisi</span></div><div class="l2-extra-grid">${extraCards(hExtra,'h',hCorrect)}</div></div>
          </section>

          <section class="l2-section-card">
            <div class="l2-section-head"><div><h3>B. Tabel menurun</h3><p>Isi seluruh baris Total dan Rata-rata menggunakan data baris 2–6 pada kolom yang sama.</p></div><span>${vTaskCount}/10 sel tabel terisi</span></div>
            <div class="l2-table-scroll"><table class="l2-sheet l2-vertical"><thead><tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th><th>F</th></tr><tr><th>1</th><th>Barang</th>${classCols.map(x=>`<th>Kelas ${x}</th>`).join('')}</tr></thead><tbody>${verticalRows.map((r,i)=>`<tr><th>${i+2}</th><td>${r.item}</td>${r.vals.map(v=>`<td>${v}</td>`).join('')}</tr>`).join('')}<tr><th>7</th><td>Total</td>${classCols.map((_,c)=>`<td class="answer-cell">${formulaBox(vTasks[c*2])}</td>`).join('')}</tr><tr><th>8</th><td>Rata-rata</td>${classCols.map((_,c)=>`<td class="answer-cell">${formulaBox(vTasks[c*2+1])}</td>`).join('')}</tr></tbody></table></div>
            <div class="l2-extra-box"><div class="l2-extra-title"><div><h4>5 soal tambahan</h4><p>Isi semua Total dan Rata-rata, lalu tekan Enter pada setiap rumus untuk membuka soal tambahan.</p></div><span id="l2VExtraCount">${vExtraCount}/5 terisi</span></div><div class="l2-extra-grid">${extraCards(vExtra,'v',vCorrect)}</div></div>
          </section>

          <button id="l2CheckAll" class="l2-check-all ${st.readyToFinish&&allFormulaCorrect&&allExtraCorrect?'ready':''}" ${(!allFormulaCorrect||!allExtraFilled)&&!st.readyToFinish?'disabled':''}>${st.readyToFinish&&allFormulaCorrect&&allExtraCorrect?'✓ Selesai':'✓ Periksa seluruh 30 jawaban'}</button>
        </main>
        <aside class="l2-sidebar">
          <section class="l2-participant"><small>PESERTA</small><h4>${escapeHtml(currentUser.name)}</h4><p>Kelas ${escapeHtml(currentUser.className)}</p><button type="button" data-exit-student ${canStudentExit()?'':'disabled'}>↪ &nbsp; Keluar</button><em>${canStudentExit()?'Tombol keluar dibuka guru':'Tombol keluar sedang dikunci guru.'}</em></section>
          <section class="l2-side-card"><h4>Daftar sub-latihan</h4><div class="l2-side-list">${sideItems}</div></section>
          <section class="l2-side-card"><h4>Deteksi blok rumus</h4><p>Klik dahulu sel Jawaban yang ingin diisi.</p><div id="l2FormulaDetection">${st.activeCell?`<b>${st.activeCell.addr}</b><span>${escapeHtml(st.activeCell.formula)}</span>`:'Belum ada sel dipilih.'}</div></section>
          <section class="l2-quick-tip"><h4>Petunjuk cepat</h4><p>Ketik <b>=SUM(</b> atau <b>=AVERAGE(</b> sendiri. Setelah itu blok rentang angka. Sistem hanya memasukkan rentangnya, lalu Anda mengetik <b>)</b> sendiri.</p><div>=SUM( + blok B2:F2 → =SUM(B2:F2 &nbsp; lalu ketik )</div></section>
        </aside>
      </div>`;

    const keepPanelScroll=()=>panel.scrollTop;
    const rerenderKeep=scroll=>{renderL2(panel);requestAnimationFrame(()=>{panel.scrollTop=scroll;});};
    const updateDetection=(addr,formula,result)=>{
      st.activeCell={addr,formula,result};
      const box=$("#l2FormulaDetection");
      if(box) box.innerHTML=`<b>${addr}</b><span>${escapeHtml(formula)}</span>${result!==undefined&&result!==''?`<small>Hasil: ${result}</small>`:''}`;
    };

    const bindL2RangeSelection=()=>{
      let activeInput=null;
      let drag=null;
      let lastRange="";

      const parseAddr=addr=>{
        const m=String(addr||"").match(/^([A-Z]+)(\d+)$/i);
        if(!m) return null;
        let col=0;
        for(const ch of m[1].toUpperCase()) col=col*26+(ch.charCodeAt(0)-64);
        return {col,row:Number(m[2]),addr:m[1].toUpperCase()+m[2]};
      };
      const colName=n=>{
        let out="";
        while(n>0){n--;out=String.fromCharCode(65+(n%26))+out;n=Math.floor(n/26);}
        return out;
      };
      const canonicalRange=(a,b)=>{
        const x=parseAddr(a),y=parseAddr(b);if(!x||!y) return a||b||"";
        const c1=Math.min(x.col,y.col),c2=Math.max(x.col,y.col),r1=Math.min(x.row,y.row),r2=Math.max(x.row,y.row);
        const first=`${colName(c1)}${r1}`,last=`${colName(c2)}${r2}`;
        return first===last?first:`${first}:${last}`;
      };
      const insideRange=(addr,range)=>{
        const parts=range.split(":"),a=parseAddr(parts[0]),b=parseAddr(parts[1]||parts[0]),x=parseAddr(addr);
        if(!a||!b||!x) return false;
        return x.col>=Math.min(a.col,b.col)&&x.col<=Math.max(a.col,b.col)&&x.row>=Math.min(a.row,b.row)&&x.row<=Math.max(a.row,b.row);
      };
      const clearSelection=table=>table.querySelectorAll(".l2-block-selected").forEach(c=>c.classList.remove("l2-block-selected"));
      const paintSelection=(table,range)=>{
        clearSelection(table);
        table.querySelectorAll("[data-l2-source-addr]").forEach(c=>{
          if(insideRange(c.dataset.l2SourceAddr,range)) c.classList.add("l2-block-selected");
        });
        lastRange=range;
      };
      const showBlock=(range,formula="")=>{
        const box=$("#l2FormulaDetection");
        if(!box) return;
        if(activeInput&&activeInput.isConnected){
          const addr=activeInput.dataset.addr||"Sel jawaban";
          box.innerHTML=`<b>${addr}</b><span>Blok dipilih: ${range}</span>${formula?`<small>${escapeHtml(formula)}</small>`:""}`;
        }else{
          box.innerHTML=`<b>${range}</b><span>Rentang berhasil dipilih.</span><small>Klik sel Total/Rata-rata terlebih dahulu agar blok masuk ke rumus.</small>`;
        }
      };
      const applyRangeToFormula=(table,range)=>{
        if(!activeInput||!activeInput.isConnected||activeInput.closest("table")!==table){
          showBlock(range);
          return;
        }
        const current=activeInput.value.trim();
        const prefixMatch=current.match(/^(=(?:SUM|AVERAGE)\s*\()/i);
        if(!prefixMatch){
          showBlock(range);
          toast("Ketik =SUM( atau =AVERAGE( terlebih dahulu, baru blok rentang angka.");
          activeInput.focus({preventScroll:true});
          return;
        }
        const formula=`${prefixMatch[1]}${range}`;
        activeInput.value=formula;
        activeInput.dispatchEvent(new Event("input",{bubbles:true}));
        activeInput.focus({preventScroll:true});
        activeInput.setSelectionRange(formula.length,formula.length);
        updateDetection(activeInput.dataset.addr,formula,"");
        showBlock(range,formula);
      };

      panel.querySelectorAll(".l2-formula-input").forEach(inp=>{
        inp.addEventListener("focus",()=>{
          activeInput=inp;
          panel.querySelectorAll(".l2-answer-active").forEach(x=>x.classList.remove("l2-answer-active"));
          inp.closest(".answer-cell")?.classList.add("l2-answer-active");
        });
      });

      panel.querySelectorAll(".l2-sheet").forEach(table=>{
        const letterCells=[...table.tHead.rows[0].cells].slice(1);
        const letters=letterCells.map(c=>c.textContent.trim());
        [...table.tBodies[0].rows].forEach(row=>{
          const rowNo=row.cells[0]?.textContent.trim();
          [...row.cells].slice(1).forEach((cell,i)=>{
            const addr=`${letters[i]||""}${rowNo||""}`;
            cell.dataset.l2CellAddr=addr;
            const numeric=cell.textContent.trim()!=="" && Number.isFinite(Number(cell.textContent.trim()));
            if(numeric&&!cell.classList.contains("answer-cell")){
              cell.dataset.l2SourceAddr=addr;
              cell.classList.add("l2-source-cell");
              cell.title=`Klik atau blok mulai dari ${addr}`;
            }
          });
        });

        table.addEventListener("pointerdown",e=>{
          const cell=e.target.closest("[data-l2-source-addr]");
          if(!cell||cell.closest("table")!==table) return;
          if(e.pointerType==="touch"&&!activeInput) return;
          e.preventDefault();
          drag={pointerId:e.pointerId,start:cell.dataset.l2SourceAddr,end:cell.dataset.l2SourceAddr,moved:false};
          table.classList.add("l2-is-selecting");
          try{table.setPointerCapture(e.pointerId)}catch(_){}
          paintSelection(table,canonicalRange(drag.start,drag.end));
        });
        table.addEventListener("pointermove",e=>{
          if(!drag||drag.pointerId!==e.pointerId) return;
          const el=document.elementFromPoint(e.clientX,e.clientY);
          const cell=el?.closest?.("[data-l2-source-addr]");
          if(!cell||cell.closest("table")!==table) return;
          const addr=cell.dataset.l2SourceAddr;
          if(addr!==drag.end){drag.end=addr;drag.moved=true;paintSelection(table,canonicalRange(drag.start,drag.end));}
        });
        const finish=e=>{
          if(!drag||drag.pointerId!==e.pointerId) return;
          const range=canonicalRange(drag.start,drag.end);
          table.classList.remove("l2-is-selecting");
          try{table.releasePointerCapture(e.pointerId)}catch(_){}
          drag=null;
          paintSelection(table,range);
          applyRangeToFormula(table,range);
        };
        table.addEventListener("pointerup",finish);
        table.addEventListener("pointercancel",finish);
      });
    };

    const bindL2Simulation=()=>{
      const grid=panel.querySelector(".l2-sim-grid");
      const fx=panel.querySelector("#l2SimFormula");
      const status=panel.querySelector("#l2SimStatus");
      const enter=panel.querySelector("#l2SimEnter");
      const target=panel.querySelector("[data-l2-sim-target]");
      if(!grid||!fx||!status||!enter||!target) return;
      let targetActive=false,drag=null,range="";
      const sources=[...grid.querySelectorAll("[data-l2-sim-source]")];
      const clear=()=>sources.forEach(x=>x.classList.remove("l2-sim-selected"));
      const selectedRange=(a,b)=>{
        const ai=sources.findIndex(x=>x.dataset.l2SimSource===a),bi=sources.findIndex(x=>x.dataset.l2SimSource===b);
        if(ai<0||bi<0) return a;
        const lo=Math.min(ai,bi),hi=Math.max(ai,bi);clear();
        sources.slice(lo,hi+1).forEach(x=>x.classList.add("l2-sim-selected"));
        return lo===hi?sources[lo].dataset.l2SimSource:`${sources[lo].dataset.l2SimSource}:${sources[hi].dataset.l2SimSource}`;
      };
      const normalized=()=>String(fx.value||"").replace(/\s+/g,"").toUpperCase();
      const updateEnter=()=>{
        const value=normalized();
        enter.disabled=!(targetActive && range && (value===`=SUM(${range})` || value===`=AVERAGE(${range})`));
      };
      const insertRange=()=>{
        if(!range) return;
        const current=fx.value.trim();
        const prefix=current.match(/^(=(?:SUM|AVERAGE)\s*\()/i);
        if(!prefix){
          status.textContent=`Blok ${range} dipilih • ketik =SUM( atau =AVERAGE( terlebih dahulu`;
          updateEnter();
          return;
        }
        fx.value=`${prefix[1]}${range}`;
        fx.focus({preventScroll:true});
        fx.setSelectionRange(fx.value.length,fx.value.length);
        status.textContent=`Rentang ${range} masuk • sekarang ketik ) sendiri`;
        updateEnter();
      };
      target.addEventListener("click",()=>{
        targetActive=true;
        target.classList.add("l2-sim-target-active");
        status.textContent="Sel aktif: G2 • ketik =SUM( lalu blok B2:F2";
        fx.focus({preventScroll:true});
        updateEnter();
      });
      fx.addEventListener("input",()=>{
        if(!targetActive){targetActive=true;target.classList.add("l2-sim-target-active");}
        if(range) status.textContent=`Rumus: ${fx.value} • blok: ${range}`;
        else status.textContent=`Rumus: ${fx.value||"–"} • pilih rentang B2:F2`;
        updateEnter();
      });
      fx.addEventListener("keydown",e=>{
        if(e.key!=="Enter") return;
        e.preventDefault();
        if(!enter.disabled) enter.click();
      });
      grid.addEventListener("pointerdown",e=>{
        const cell=e.target.closest("[data-l2-sim-source]");if(!cell) return;
        e.preventDefault();
        drag={id:e.pointerId,start:cell.dataset.l2SimSource,end:cell.dataset.l2SimSource};
        try{grid.setPointerCapture(e.pointerId)}catch(_){}
        range=selectedRange(drag.start,drag.end);
        status.textContent=`Blok: ${range}`;
      });
      grid.addEventListener("pointermove",e=>{
        if(!drag||drag.id!==e.pointerId) return;
        const el=document.elementFromPoint(e.clientX,e.clientY);const cell=el?.closest?.("[data-l2-sim-source]");if(!cell) return;
        drag.end=cell.dataset.l2SimSource;range=selectedRange(drag.start,drag.end);status.textContent=`Blok: ${range}`;
      });
      const done=e=>{
        if(!drag||drag.id!==e.pointerId) return;
        range=selectedRange(drag.start,drag.end);drag=null;
        try{grid.releasePointerCapture(e.pointerId)}catch(_){}
        insertRange();
      };
      grid.addEventListener("pointerup",done);grid.addEventListener("pointercancel",done);
      enter.addEventListener("click",()=>{
        if(enter.disabled) return;
        const selected=sources.filter(x=>x.classList.contains("l2-sim-selected"));
        if(!selected.length) return;
        const nums=selected.map(x=>Number(x.textContent||0));
        const value=normalized().startsWith("=AVERAGE(")?nums.reduce((a,b)=>a+b,0)/nums.length:nums.reduce((a,b)=>a+b,0);
        target.textContent=String(value);
        target.classList.add("l2-sim-done");
        status.textContent=`G2 = ${value} • rumus benar`;
        enter.disabled=true;
      });
    };

    $$("[data-l2-formula]").forEach(inp=>{
      inp.addEventListener("focus",()=>updateDetection(inp.dataset.addr,inp.dataset.expected,""));
      inp.addEventListener("input",()=>{
        const key=inp.dataset.l2Formula;
        st.formulas[key]={...(st.formulas[key]||{}),value:inp.value,correct:false};
        inp.classList.remove("wrong");
      });
      inp.addEventListener("keydown",async e=>{
        if(e.key!=="Enter") return;
        e.preventDefault();
        const scroll=keepPanelScroll();
        const key=inp.dataset.l2Formula, expected=inp.dataset.expected, result=Number(inp.dataset.result);
        const correct=normalizeFormula(inp.value)===normalizeFormula(expected);
        st.formulas[key]={value:inp.value,correct,result:correct?result:""};
        st.readyToFinish=false;
        try{await persistStudent();}catch(e){}
        rerenderKeep(scroll);
        toast(correct?`Benar. Hasil ${inp.dataset.addr} = ${result}`:"Rumus belum tepat. Periksa kembali rentangnya.");
      });
    });
    $$("[data-l2-active]").forEach(btn=>btn.addEventListener("click",()=>updateDetection(btn.dataset.l2Active,btn.dataset.formula,btn.dataset.result)));

    const refreshExtraUi=()=>{
      const hCount=hExtra.filter((q,i)=>String(st.extra[`h${i}`]??"").trim()).length;
      const vCount=vExtra.filter((q,i)=>String(st.extra[`v${i}`]??"").trim()).length;
      const hBadge=$("#l2HExtraCount"),vBadge=$("#l2VExtraCount");
      if(hBadge) hBadge.textContent=`${hCount}/5 terisi`;
      if(vBadge) vBadge.textContent=`${vCount}/5 terisi`;
      const filled=[...hExtra.map((_,i)=>`h${i}`),...vExtra.map((_,i)=>`v${i}`)].every(k=>String(st.extra[k]??"").trim()!=="");
      const btn=$("#l2CheckAll");
      if(btn && !st.readyToFinish) btn.disabled=!(allFormulaCorrect&&filled);
    };
    $$("[data-l2-extra]").forEach(inp=>{
      inp.addEventListener("input",()=>{
        const key=inp.dataset.l2Extra;
        st.extra[key]=inp.value;
        delete st.checkedExtra[key];
        st.readyToFinish=false;
        const card=inp.closest(".l2-extra-card");if(card){card.classList.remove("correct","wrong");const s=card.querySelector("small");if(s)s.textContent="";}
        refreshExtraUi();
        persistStudent();
      });
      inp.addEventListener("blur",refreshExtraUi);
    });
    refreshExtraUi();
    $$("[data-l2-look]").forEach(btn=>btn.addEventListener("click",()=>{
      const target=$("#l2-cell-"+btn.dataset.l2Look);if(target){target.scrollIntoView({behavior:"smooth",block:"center",inline:"center"});target.classList.add("l2-flash");setTimeout(()=>target.classList.remove("l2-flash"),1200);}
    }));

    const prev=$("[data-l2-guide-prev]"),next=$("[data-l2-guide-next]");
    if(prev) prev.addEventListener("click",()=>{const scroll=keepPanelScroll();st.guideSlide=Math.max(0,st.guideSlide-1);rerenderKeep(scroll);});
    if(next) next.addEventListener("click",()=>{const scroll=keepPanelScroll();st.guideSlide=Math.min(4,st.guideSlide+1);rerenderKeep(scroll);});

    const check=$("#l2CheckAll");
    if(check) check.addEventListener("click",async()=>{
      if(st.readyToFinish && allFormulaCorrect && allExtraCorrect){await completeExercise(1);return;}
      if(!allFormulaCorrect){toast("Masih ada rumus tabel yang belum benar. Tekan Enter pada setiap rumus.");return;}
      let correct=0;
      allExtra.forEach((q,i)=>{
        const key=i<5?`h${i}`:`v${i-5}`;
        const ok=extraAnswerIsCorrect(st.extra[key],q.answer);
        st.checkedExtra[key]=ok;if(ok) correct++;
      });
      st.readyToFinish=correct===10;
      try{await persistStudent();}catch(e){}
      const scroll=keepPanelScroll();rerenderKeep(scroll);
      toast(correct===10?"Semua 30 jawaban benar. Klik Selesai untuk mengirim hasil.":`${correct} dari 10 soal tambahan benar. Perbaiki jawaban yang masih salah.`);
    });

    bindL2RangeSelection();
    bindL2Simulation();
    bindGuide();
  }

  function formulaCell(key,formula,result,st){
    const saved=st.formulas[key]||{};
    return `<td>
      <input class="${saved.correct?"correct":saved.value?"wrong":""}" data-formula-key="${key}" data-expected="${escapeHtml(formula)}" data-result="${result}" value="${escapeHtml(saved.value||"")}" placeholder="Ketik rumus">
      <div class="formula-result">${saved.correct?`Hasil: ${result}`:""}</div>
    </td>`;
  }


  function styledSideItems(activeIndex){
    return EXERCISES.map((e,i)=>{
      const open=!!settings.unlocked[i],done=!!currentUser.completedExercises[i];
      return `<div class="l2-side-ex ${i===activeIndex?"active":""} ${!open?"locked":""}"><span>${i+1}</span><b>${escapeHtml(e[0])}</b><em>${done?"✓":i===activeIndex?"Aktif":open?"Dibuka":"🔒"}</em></div>`;
    }).join("");
  }

  function styledWindowHeader(index,title,themeClass=""){
    const completed=currentUser?.completedExercises?.filter(Boolean).length||0;
    const percent=Math.round(completed/8*100);
    return `<div class="l2-window-header lx-window-header ${themeClass}">
      <button class="exercise-back-btn" data-close-exercise aria-label="Kembali">‹</button>
      <div><small>Jendela latihan ${index+1} dari 8</small><h3>${escapeHtml(title)}</h3></div>
      <div class="exercise-score-card"><small>NILAI SAAT INI</small><strong data-live-active-score="1">${scoreForExercise(index)}</strong><span>60 menit · turun 1 poin/menit</span></div>
      <div class="l2-window-progress"><div><span>Progres keseluruhan</span><b>${percent}%</b></div><span><i style="width:${percent}%"></i></span><small>Sisa waktu: <b id="exerciseWindowTimer">${formatTime(getExerciseRemaining(index))}</b></small></div>
    </div>`;
  }

  function styledParticipant(index){
    return `<section class="l2-participant"><small>PESERTA</small><h4>${escapeHtml(currentUser.name)}</h4><p>Kelas ${escapeHtml(currentUser.className)}</p><button type="button" data-exit-student ${canStudentExit()?'':'disabled'}>↪ &nbsp; Keluar</button><em>${canStudentExit()?'Tombol keluar dibuka guru':'Tombol keluar sedang dikunci guru.'}</em></section>
      <section class="l2-side-card"><h4>Daftar sub-latihan</h4><div class="l2-side-list">${styledSideItems(index)}</div></section>`;
  }

  function renderL3(panel){
    const st=getExState(2,{values:{},guideSlide:0,activeIndex:null});
    st.values ||= {};
    st.guideSlide=Number.isInteger(st.guideSlide)?st.guideSlide:0;
    const correctCount=L3_ITEMS.filter((x,i)=>st.values[i]===x).length;
    const done=!!currentUser.completedExercises[2];

    const sections=[
      {title:"A. Menulis Rumus",desc:"Ketik 10 rumus Excel sama persis, termasuk tanda =, kurung, koma, titik dua, dan tanda petik.",start:0,end:10},
      {title:"B. Menulis Kata & Kapitalisasi",desc:"Perhatikan huruf besar, huruf kecil, spasi, dan simbol. Jawaban diperiksa karakter demi karakter.",start:10,end:20},
      {title:"C. Menulis Tautan",desc:"Ketik alamat tautan lengkap tanpa spasi tambahan. Pastikan https://, titik, dan garis miring ditulis tepat.",start:20,end:30}
    ];

    const guides=[
      {title:"1. Ketik sama persis",text:"Latihan ini memeriksa setiap karakter. SUM berbeda dengan sum, dan spasi yang tidak sesuai juga dianggap salah.",kind:"exact"},
      {title:"2. Gunakan Caps Lock",text:"Gunakan Caps Lock jika perlu mengetik beberapa huruf kapital secara berurutan. Tekan lagi untuk mengembalikannya ke huruf kecil.",kind:"caps"},
      {title:"3. Gunakan Shift untuk simbol",text:"Tahan Shift untuk huruf kapital sementara atau simbol seperti $, (, ), :, dan tanda petik sesuai tombol keyboard.",kind:"shift"},
      {title:"4. Perhatikan format tautan",text:"Tautan harus ditulis lengkap, misalnya https://chatgpt.com. Jangan menambahkan spasi sebelum atau sesudah tautan.",kind:"link"},
      {title:"5. Pastikan semua indikator benar",text:"Setelah 30 jawaban sama persis, tombol Selesai akan aktif. Klik Selesai untuk mengirim hasil ke dashboard guru.",kind:"finish"}
    ];
    const g=guides[Math.max(0,Math.min(guides.length-1,st.guideSlide))];
    const guideVisual={
      exact:`<div class="lx-mini-compare"><div><small>Target</small><code>=SUM(B2:F2)</code></div><div><small>Harus sama</small><code>=SUM(B2:F2)</code></div></div>`,
      caps:`<div class="lx-keyboard"><span class="wide active">Caps Lock</span><span>S</span><span>U</span><span>M</span></div>`,
      shift:`<div class="lx-keyboard"><span class="wide active">Shift</span><span>4<br><b>$</b></span><span>9<br><b>(</b></span><span>0<br><b>)</b></span></div>`,
      link:`<div class="lx-mini-code"><small>Contoh</small><code>https://chatgpt.com</code></div>`,
      finish:`<div class="lx-mini-success">✓ 30 / 30 jawaban benar</div>`
    }[g.kind];

    const sectionHtml=sections.map(sec=>{
      const indices=Array.from({length:sec.end-sec.start},(_,j)=>sec.start+j);
      const sectionCorrect=indices.filter(i=>st.values[i]===L3_ITEMS[i]).length;
      return `<section class="l2-section-card">
        <div class="l2-section-head"><div><h3>${sec.title}</h3><p>${sec.desc}</p></div><span data-l3-section-count="${sec.start}">${sectionCorrect}/10 benar</span></div>
        <div class="lx-typing-grid">${indices.map(i=>{
          const target=L3_ITEMS[i],v=st.values[i]??"",ok=v===target;
          return `<div class="lx-typing-card ${v?(ok?'correct':'wrong'):''}" data-l3-card="${i}">
            <div class="lx-card-head"><span>${i+1}</span><strong>${escapeHtml(target)}</strong></div>
            <input data-type="${i}" value="${escapeHtml(v)}" autocomplete="off" spellcheck="false" placeholder="Ketik persis di sini">
            <small data-l3-status="${i}">${v?(ok?'✓ Benar':'✕ Belum sama persis'):''}</small>
          </div>`;
        }).join("")}</div>
      </section>`;
    }).join("");

    panel.innerHTML=`
      ${styledWindowHeader(2,"Menulis Rumus, Kata & Link","lx-theme-cyan")}
      <div class="l2-layout">
        <main class="l2-main">
          <section class="l2-learning-row">
            <div class="l2-material-card"><h4>📖 &nbsp; Materi singkat</h4><p>Jawaban harus sama persis dengan target. Perhatikan <b>kapitalisasi</b>, <b>spasi</b>, <b>simbol</b>, dan <b>tanda baca</b>.</p><div><code>Caps Lock → kapital berulang</code><code>Shift → kapital/simbol sementara</code><code>https:// → awal tautan</code></div></div>
            <div class="l2-guide-card"><div class="l2-guide-head"><h4>☷ &nbsp; Petunjuk Pengerjaan</h4><span>${st.guideSlide+1}/${guides.length}</span></div><div class="l2-guide-slide"><h3>${g.title}</h3><p>${g.text}</p>${guideVisual}</div><div class="l2-guide-nav"><button type="button" data-l3-guide-prev ${st.guideSlide===0?'disabled':''}>‹ &nbsp; Sebelumnya</button><div>${guides.map((_,i)=>`<i class="${i===st.guideSlide?'active':''}"></i>`).join("")}</div><button type="button" data-l3-guide-next ${st.guideSlide===guides.length-1?'disabled':''}>Berikutnya &nbsp; ›</button></div></div>
          </section>
          <section class="l2-instruction-band">Ketik seluruh <b>30 soal</b> sama persis. Indikator hijau muncul jika penulisan sudah benar.</section>
          ${sectionHtml}
          <button id="l3FinishBtn" class="l2-check-all ${correctCount===30?'ready':''}" ${correctCount===30?'':'disabled'}>${done?'✓ Latihan selesai':correctCount===30?'✓ Selesai':`Benar ${correctCount} / 30`}</button>
        </main>
        <aside class="l2-sidebar">
          ${styledParticipant(2)}
          <section class="l2-side-card"><h4>Deteksi penulisan</h4><p>Klik salah satu kotak jawaban.</p><div id="l3Detection">${Number.isInteger(st.activeIndex)?`<b>Soal ${st.activeIndex+1}</b><span>${escapeHtml(st.values[st.activeIndex]||'Belum diisi')}</span>`:'Belum ada jawaban dipilih.'}</div></section>
          <section class="l2-quick-tip"><h4>Petunjuk cepat</h4><p>Periksa kapitalisasi dan simbol sebelum lanjut. Untuk link, jangan tambahkan spasi.</p><div>SUM ≠ sum &nbsp; • &nbsp; https:// harus lengkap</div></section>
        </aside>
      </div>`;

    const refreshCounts=()=>{
      const cnt=L3_ITEMS.filter((x,i)=>st.values[i]===x).length;
      sections.forEach(sec=>{
        const el=panel.querySelector(`[data-l3-section-count="${sec.start}"]`);
        if(el){const c=Array.from({length:10},(_,j)=>sec.start+j).filter(i=>st.values[i]===L3_ITEMS[i]).length;el.textContent=`${c}/10 benar`;}
      });
      const btn=panel.querySelector('#l3FinishBtn');
      if(btn){btn.disabled=cnt!==30;btn.classList.toggle('ready',cnt===30);btn.textContent=done?'✓ Latihan selesai':cnt===30?'✓ Selesai':`Benar ${cnt} / 30`;}
    };
    const updateDetection=(i)=>{
      st.activeIndex=i;
      const box=panel.querySelector('#l3Detection');
      if(box) box.innerHTML=`<b>Soal ${i+1}</b><span>${escapeHtml(st.values[i]||'Belum diisi')}</span>`;
    };

    panel.querySelectorAll('[data-type]').forEach(inp=>{
      inp.addEventListener('focus',()=>updateDetection(+inp.dataset.type));
      inp.addEventListener('input',()=>{
        const i=+inp.dataset.type,target=L3_ITEMS[i];
        st.values[i]=inp.value;
        const card=panel.querySelector(`[data-l3-card="${i}"]`);
        const status=panel.querySelector(`[data-l3-status="${i}"]`);
        const ok=inp.value===target;
        if(card){card.classList.toggle('correct',ok);card.classList.toggle('wrong',!!inp.value&&!ok);}
        if(status) status.textContent=inp.value?(ok?'✓ Benar':'✕ Belum sama persis'):'';
        updateDetection(i);refreshCounts();persistStudent();
      });
    });
    const rerender=()=>{const scroll=panel.scrollTop;renderL3(panel);bindGuide();requestAnimationFrame(()=>panel.scrollTop=scroll);};
    const prev=panel.querySelector('[data-l3-guide-prev]'),next=panel.querySelector('[data-l3-guide-next]');
    if(prev) prev.addEventListener('click',()=>{st.guideSlide=Math.max(0,st.guideSlide-1);rerender();});
    if(next) next.addEventListener('click',()=>{st.guideSlide=Math.min(guides.length-1,st.guideSlide+1);rerender();});
    const finish=panel.querySelector('#l3FinishBtn');
    if(finish) finish.addEventListener('click',async()=>{if(done)return;if(L3_ITEMS.every((x,i)=>st.values[i]===x)) await completeExercise(2);});
  }


  function normalizePracticeFormula(value){
    return normalizeFormula(value).replace(/;/g,",");
  }

  function formatPracticeResult(value){
    if(typeof value==="number" && !Number.isInteger(value)){
      return String(Math.round(value*100)/100);
    }
    return String(value);
  }

  function renderPracticeWindow(panel,cfg){
    const st=getExState(cfg.index,{answers:{},guideSlide:0,readyToFinish:false,active:null});
    st.answers ||= {};
    st.guideSlide=Number.isInteger(st.guideSlide)?st.guideSlide:0;
    st.readyToFinish=!!st.readyToFinish;

    const tasks=[];
    cfg.sections.forEach((section,si)=>section.questions.forEach((q,qi)=>tasks.push({...q,key:`${si}-${qi}`,sectionIndex:si,questionIndex:qi})));
    const allFilled=tasks.every(t=>String(st.answers[t.key]?.value||"").trim());
    const allCorrect=tasks.every(t=>st.answers[t.key]?.correct===true);
    const filledCount=tasks.filter(t=>String(st.answers[t.key]?.value||"").trim()).length;
    const correctCount=tasks.filter(t=>st.answers[t.key]?.correct===true).length;
    const completed=currentUser?.completedExercises?.filter(Boolean).length||0;
    const percent=Math.round(completed/8*100);
    const practiceClass=cfg.index===4?"l5-practice":"";

    const sideItems=EXERCISES.map((e,i)=>{
      const open=!!settings.unlocked[i],done=!!currentUser.completedExercises[i];
      return `<div class="l2-side-ex ${i===cfg.index?"active":""} ${!open?"locked":""}"><span>${i+1}</span><b>${escapeHtml(e[0])}</b><em>${done?"✓":i===cfg.index?"Aktif":open?"Dibuka":"🔒"}</em></div>`;
    }).join("");

    const questionCard=(q,key,num)=>{
      const a=st.answers[key]||{};
      return `<div class="l45-formula-card ${a.correct===true?'correct':a.value&&a.correct===false?'wrong':''}">
        <div class="l45-formula-head"><span>${num}</span><div><strong>${escapeHtml(q.label)}</strong><small>${escapeHtml(q.hint||"")}</small></div></div>
        <code>${escapeHtml(q.formula)}</code>
        <input class="l45-formula-input" data-l45-key="${key}" data-l45-expected="${escapeHtml(q.formula)}" value="${escapeHtml(a.value||"")}" placeholder="Ketik rumus lalu Enter" autocomplete="off" spellcheck="false">
        <div class="l45-result">${a.correct===true?`✓ Hasil: <b>${escapeHtml(formatPracticeResult(q.result))}</b>`:a.value&&a.correct===false?'✕ Rumus belum tepat':''}</div>
      </div>`;
    };

    const renderDataTable=(section)=>`<div class="l2-table-scroll"><table class="l2-sheet l45-data-sheet">
      <thead><tr><th></th>${section.columns.map((c,i)=>`<th>${String.fromCharCode(65+i)}</th>`).join("")}</tr><tr><th>1</th>${section.columns.map(c=>`<th>${escapeHtml(c)}</th>`).join("")}</tr></thead>
      <tbody>${section.rows.map((r,ri)=>`<tr><th>${ri+2}</th>${r.map(v=>`<td>${escapeHtml(v)}</td>`).join("")}</tr>`).join("")}</tbody>
    </table></div>`;

    const sectionsHtml=cfg.sections.map((section,si)=>{
      const count=section.questions.filter((q,qi)=>String(st.answers[`${si}-${qi}`]?.value||"").trim()).length;
      return `<section class="l2-section-card ${cfg.index===4?'l5-section-card':''}">
        <div class="l2-section-head"><div><h3>${escapeHtml(section.title)}</h3><p>${escapeHtml(section.description)}</p></div><span>${count}/${section.questions.length} rumus terisi</span></div>
        ${renderDataTable(section)}
        <div class="l2-extra-box"><div class="l2-extra-title"><div><h4>${section.questions.length} latihan rumus</h4><p>Ketik rumus sesuai contoh, lalu tekan Enter pada setiap jawaban.</p></div><span>${section.questions.filter((q,qi)=>st.answers[`${si}-${qi}`]?.correct).length}/${section.questions.length} benar</span></div>
          <div class="l45-question-grid">${section.questions.map((q,qi)=>questionCard(q,`${si}-${qi}`,qi+1)).join("")}</div>
        </div>
      </section>`;
    }).join("");

    const slide=cfg.guideSlides[Math.max(0,Math.min(cfg.guideSlides.length-1,st.guideSlide))];
    const mini=cfg.miniSlide(slide,st.guideSlide);

    panel.innerHTML=`
      <div class="l2-window-header l45-window-header ${practiceClass}">
        <button class="exercise-back-btn" data-close-exercise aria-label="Kembali">‹</button>
        <div><small>Jendela latihan ${cfg.index+1} dari 8</small><h3>${escapeHtml(cfg.windowTitle)}</h3></div>
        <div class="exercise-score-card"><small>NILAI SAAT INI</small><strong data-live-active-score="1">${scoreForExercise(cfg.index)}</strong><span>60 menit · turun 1 poin/menit</span></div>
        <div class="l2-window-progress"><div><span>Progres keseluruhan</span><b>${percent}%</b></div><span><i style="width:${percent}%"></i></span><small>Sisa waktu: <b id="exerciseWindowTimer">${formatTime(getExerciseRemaining(cfg.index))}</b></small></div>
      </div>
      <div class="l2-layout ${practiceClass}">
        <main class="l2-main">
          <section class="l2-learning-row ${practiceClass}">
            <div class="l2-material-card"><h4>📖 &nbsp; Materi singkat</h4><p>${cfg.material}</p><div>${cfg.examples.map(x=>`<code>${escapeHtml(x)}</code>`).join("")}</div></div>
            <div class="l2-guide-card"><div class="l2-guide-head"><h4>☷ &nbsp; Petunjuk Pengerjaan</h4><span>${st.guideSlide+1}/${cfg.guideSlides.length}</span></div><div class="l2-guide-slide"><h3>${escapeHtml(slide.title)}</h3><p>${escapeHtml(slide.text)}</p>${mini}</div><div class="l2-guide-nav"><button type="button" data-l45-guide-prev ${st.guideSlide===0?'disabled':''}>‹ &nbsp; Sebelumnya</button><div>${cfg.guideSlides.map((_,i)=>`<i class="${i===st.guideSlide?'active':''}"></i>`).join("")}</div><button type="button" data-l45-guide-next ${st.guideSlide===cfg.guideSlides.length-1?'disabled':''}>Berikutnya &nbsp; ›</button></div></div>
          </section>
          <section class="l2-instruction-band">${cfg.instruction}</section>
          ${sectionsHtml}
          <button id="l45CheckAll" class="l2-check-all ${st.readyToFinish&&allCorrect?'ready':''}" ${!allFilled&&!st.readyToFinish?'disabled':''}>${st.readyToFinish&&allCorrect?'✓ Selesai':`✓ Periksa seluruh ${tasks.length} jawaban`}</button>
        </main>
        <aside class="l2-sidebar">
          <section class="l2-participant"><small>PESERTA</small><h4>${escapeHtml(currentUser.name)}</h4><p>Kelas ${escapeHtml(currentUser.className)}</p><button type="button" data-exit-student ${canStudentExit()?'':'disabled'}>↪ &nbsp; Keluar</button><em>${canStudentExit()?'Tombol keluar dibuka guru':'Tombol keluar sedang dikunci guru.'}</em></section>
          <section class="l2-side-card"><h4>Daftar sub-latihan</h4><div class="l2-side-list">${sideItems}</div></section>
          <section class="l2-side-card"><h4>Deteksi rumus</h4><p>Klik kotak jawaban yang sedang Anda kerjakan.</p><div id="l45FormulaDetection">${st.active?`<b>${escapeHtml(st.active.label)}</b><span>${escapeHtml(st.active.value||'Belum ada rumus')}</span>`:'Belum ada jawaban dipilih.'}</div></section>
          <section class="l2-quick-tip"><h4>Petunjuk cepat</h4><p>${cfg.quickTip}</p><div>${escapeHtml(cfg.quickExample)}</div></section>
        </aside>
      </div>`;

    const keepScroll=()=>panel.scrollTop;
    const rerenderKeep=scroll=>{renderPracticeWindow(panel,cfg);requestAnimationFrame(()=>{panel.scrollTop=scroll;});};
    const updateFilledBadge=()=>{
      const values=[...panel.querySelectorAll('[data-l45-key]')].filter(inp=>inp.value.trim()).length;
      const check=$("#l45CheckAll");
      if(check && values===tasks.length) check.disabled=false;
    };

    $$('[data-l45-key]').forEach(inp=>{
      inp.addEventListener('focus',()=>{
        const key=inp.dataset.l45Key;
        const task=tasks.find(t=>t.key===key);
        st.active={label:task?.label||`Jawaban ${key}`,value:inp.value};
        const box=$("#l45FormulaDetection");
        if(box) box.innerHTML=`<b>${escapeHtml(task?.label||'Jawaban')}</b><span>${escapeHtml(inp.value||'Belum ada rumus')}</span>`;
      });
      inp.addEventListener('input',()=>{
        const key=inp.dataset.l45Key;
        st.answers[key]={...(st.answers[key]||{}),value:inp.value,correct:false};
        st.readyToFinish=false;
        const task=tasks.find(t=>t.key===key);
        st.active={label:task?.label||`Jawaban ${key}`,value:inp.value};
        const box=$("#l45FormulaDetection");
        if(box) box.innerHTML=`<b>${escapeHtml(task?.label||'Jawaban')}</b><span>${escapeHtml(inp.value||'Belum ada rumus')}</span>`;
        inp.closest('.l45-formula-card')?.classList.remove('correct','wrong');
        const result=inp.closest('.l45-formula-card')?.querySelector('.l45-result');
        if(result) result.textContent='';
        updateFilledBadge();
        persistStudent();
      });
      inp.addEventListener('keydown',e=>{
        if(e.key!=="Enter") return;
        e.preventDefault();
        const key=inp.dataset.l45Key;
        const task=tasks.find(t=>t.key===key);
        const correct=task && normalizePracticeFormula(inp.value)===normalizePracticeFormula(task.formula);
        st.answers[key]={value:inp.value,correct:!!correct};
        st.readyToFinish=false;
        const scroll=keepScroll();
        persistStudent();
        rerenderKeep(scroll);
        toast(correct?`Benar. Hasil = ${formatPracticeResult(task.result)}`:"Rumus belum tepat. Periksa kembali penulisannya.");
      });
    });

    const prev=$('[data-l45-guide-prev]'),next=$('[data-l45-guide-next]');
    if(prev) prev.addEventListener('click',()=>{const scroll=keepScroll();st.guideSlide=Math.max(0,st.guideSlide-1);rerenderKeep(scroll);});
    if(next) next.addEventListener('click',()=>{const scroll=keepScroll();st.guideSlide=Math.min(cfg.guideSlides.length-1,st.guideSlide+1);rerenderKeep(scroll);});

    const check=$("#l45CheckAll");
    if(check) check.addEventListener('click',async()=>{
      if(st.readyToFinish && allCorrect){
        await completeExercise(cfg.index);
        return;
      }
      if(!tasks.every(t=>String(st.answers[t.key]?.value||"").trim())){
        toast("Isi seluruh rumus terlebih dahulu.");
        return;
      }
      tasks.forEach(t=>{
        const value=st.answers[t.key]?.value||"";
        st.answers[t.key]={value,correct:normalizePracticeFormula(value)===normalizePracticeFormula(t.formula)};
      });
      const ok=tasks.every(t=>st.answers[t.key]?.correct===true);
      st.readyToFinish=ok;
      const scroll=keepScroll();
      await persistStudent();
      rerenderKeep(scroll);
      toast(ok?"Semua rumus benar. Klik Selesai untuk mengirim hasil.":"Masih ada rumus yang belum tepat.");
    });
  }


  function renderSumifAverageif(panel){
    const st=getExState(3,{answers:{},guideSlide:0,multiGuideSlide:0,readyToFinish:false,active:null,simOne:{},simMulti:{}});
    st.answers ||= {};
    st.simOne ||= {};
    st.simMulti ||= {};
    st.guideSlide=Number.isInteger(st.guideSlide)?st.guideSlide:0;
    st.multiGuideSlide=Number.isInteger(st.multiGuideSlide)?st.multiGuideSlide:0;
    st.readyToFinish=!!st.readyToFinish;

    const oneRows=[
      ["Buku",12],["Pensil",18],["Penghapus",10],["Pulpen",15],["Penggaris",8],["Spidol",11],
      ["Buku",14],["Pensil",20],["Penghapus",7],["Pulpen",13],["Penggaris",9],["Spidol",16],
      ["Buku",17],["Pensil",12],["Penghapus",14],["Pulpen",19],["Penggaris",6],["Spidol",10],
      ["Buku",11],["Pensil",15]
    ];

    const oneCriteria=[
      {item:"Buku",row:2,total:54,avg:13.5},
      {item:"Pensil",row:3,total:65,avg:16.25},
      {item:"Penghapus",row:4,total:31,avg:10.3333333333},
      {item:"Pulpen",row:5,total:47,avg:15.6666666667},
      {item:"Penggaris",row:6,total:23,avg:7.6666666667}
    ].map((x,i)=>({
      ...x,
      sumFormula:`=SUMIF(B2:B21,E${i+2},C2:C21)`,
      avgFormula:`=AVERAGEIF(B2:B21,E${i+2},C2:C21)`
    }));

    const multiRows=[
      ["Beras","A",25],["Gula","B",18],["Minyak","A",20],["Susu","C",15],["Teh","B",12],
      ["Kopi","A",17],["Beras","B",30],["Gula","A",22],["Minyak","C",16],["Susu","A",19],
      ["Teh","A",14],["Kopi","B",21],["Beras","C",27],["Gula","B",24],["Minyak","A",18],
      ["Susu","B",13],["Teh","A",20],["Kopi","C",16],["Beras","A",23],["Susu","C",17]
    ];

    const multiCriteria=[
      {item:"Beras",branch:"A",row:2,total:48,avg:24},
      {item:"Susu",branch:"C",row:3,total:32,avg:16},
      {item:"Kopi",branch:"B",row:4,total:21,avg:21},
      {item:"Gula",branch:"B",row:5,total:42,avg:21},
      {item:"Teh",branch:"A",row:6,total:34,avg:17}
    ].map((x,i)=>({
      ...x,
      sumFormula:`=SUMIFS(D2:D21,B2:B21,F${i+2},C2:C21,G${i+2})`,
      avgFormula:`=AVERAGEIFS(D2:D21,B2:B21,F${i+2},C2:C21,G${i+2})`
    }));

    const tasks=[];
    oneCriteria.forEach((q,i)=>{
      tasks.push({key:`one-sum-${i}`,label:`SUMIF ${q.item}`,formula:q.sumFormula,result:q.total,addr:`F${i+2}`});
      tasks.push({key:`one-avg-${i}`,label:`AVERAGEIF ${q.item}`,formula:q.avgFormula,result:q.avg,addr:`G${i+2}`});
    });
    multiCriteria.forEach((q,i)=>{
      tasks.push({key:`multi-sum-${i}`,label:`SUMIFS ${q.item} Cabang ${q.branch}`,formula:q.sumFormula,result:q.total,addr:`H${i+2}`});
      tasks.push({key:`multi-avg-${i}`,label:`AVERAGEIFS ${q.item} Cabang ${q.branch}`,formula:q.avgFormula,result:q.avg,addr:`I${i+2}`});
    });

    const formulaComparable=value=>normalizePracticeFormula(value).replace(/\$/g,"");
    const allFilled=tasks.every(t=>String(st.answers[t.key]?.value||"").trim());
    const allCorrect=tasks.every(t=>st.answers[t.key]?.correct===true);
    const done=!!currentUser.completedExercises[3];

    const formatResult=v=>{
      if(typeof v==="number"&&!Number.isInteger(v)) return String(Math.round(v*100)/100);
      return String(v);
    };

    const formulaCell=(task)=>{
      const a=st.answers[task.key]||{};
      if(a.correct){
        return `<button type="button" class="l4-formula-result" data-l4-active="${task.key}">
          <strong>${escapeHtml(formatResult(task.result))}</strong>
          <small>${escapeHtml(a.value||task.formula)}</small>
        </button>`;
      }
      return `<input class="l4-formula-input ${a.value&&!a.correct?'wrong':''}"
        data-l4-key="${task.key}"
        data-l4-expected="${escapeHtml(task.formula)}"
        data-l4-label="${escapeHtml(task.label)}"
        data-l4-addr="${task.addr}"
        value="${escapeHtml(a.value||'')}"
        placeholder="Ketik fungsi lalu klik/blok sel"
        autocomplete="off" spellcheck="false">`;
    };

    const sourceCell=(value,addr,extra="")=>`<td class="l4-ref-cell ${extra}" data-l4-ref="${addr}" title="Klik atau blok ${addr}">${escapeHtml(value)}</td>`;

    const oneBody=oneRows.map((r,i)=>{
      const c=oneCriteria[i]||null;
      const sumTask=c?tasks.find(t=>t.key===`one-sum-${i}`):null;
      const avgTask=c?tasks.find(t=>t.key===`one-avg-${i}`):null;
      const row=i+2;
      return `<tr>
        <th>${row}</th>
        <td>${i+1}</td>
        ${sourceCell(r[0],`B${row}`)}
        ${sourceCell(r[1],`C${row}`)}
        <td class="l4-gap-cell"></td>
        ${c?sourceCell(c.item,`E${row}`,"l4-criteria-cell"):`<td></td>`}
        <td class="l4-answer-cell" data-l4-answer-addr="F${row}">${sumTask?formulaCell(sumTask):""}</td>
        <td class="l4-answer-cell" data-l4-answer-addr="G${row}">${avgTask?formulaCell(avgTask):""}</td>
      </tr>`;
    }).join("");

    const multiBody=multiRows.map((r,i)=>{
      const c=multiCriteria[i]||null;
      const sumTask=c?tasks.find(t=>t.key===`multi-sum-${i}`):null;
      const avgTask=c?tasks.find(t=>t.key===`multi-avg-${i}`):null;
      const row=i+2;
      return `<tr>
        <th>${row}</th>
        <td>${i+1}</td>
        ${sourceCell(r[0],`B${row}`)}
        ${sourceCell(r[1],`C${row}`)}
        ${sourceCell(r[2],`D${row}`)}
        <td class="l4-gap-cell"></td>
        ${c?sourceCell(c.item,`F${row}`,"l4-criteria-cell"):`<td></td>`}
        ${c?sourceCell(c.branch,`G${row}`,"l4-criteria-cell"):`<td></td>`}
        <td class="l4-answer-cell" data-l4-answer-addr="H${row}">${sumTask?formulaCell(sumTask):""}</td>
        <td class="l4-answer-cell" data-l4-answer-addr="I${row}">${avgTask?formulaCell(avgTask):""}</td>
      </tr>`;
    }).join("");

    const guides=[
      {title:"1. Klik sel tempat hasil",text:"Pada tabel kecil, klik F2 jika akan menulis SUMIF atau klik G2 jika akan menulis AVERAGEIF. Sel yang dipilih adalah tempat rumus dan hasil.",mode:"target"},
      {title:"2. Tulis fungsi di kotak fx",text:"Klik kotak rumus (fx) di atas tabel, lalu ketik =SUMIF( atau =AVERAGEIF(. Fungsi dan tanda kurung buka harus ditulis sendiri.",mode:"function"},
      {title:"3. Blok kolom Jenis Item",text:"Setelah fungsi ditulis, klik-tahan B2 lalu seret sampai B5. Rentang B2:B5 akan dimasukkan ke posisi kursor sebagai rentang kriteria.",mode:"range1"},
      {title:"4. Ketik koma lalu klik E2",text:"Setelah B2:B5, ketik koma secara manual. Kemudian klik E2 yang berisi Buku. E2 menjadi kriterianya.",mode:"criteria"},
      {title:"5. Ketik koma lalu blok kolom Jumlah",text:"Setelah E2, ketik koma lagi. Blok C2:C5 sebagai rentang nilai. Setelah itu ketik tanda kurung tutup ) secara manual.",mode:"range2"},
      {title:"6. Tekan Enter dan lihat hasil",text:"Rumus SUMIF yang lengkap menjadi =SUMIF(B2:B5,E2,C2:C5). Tekan Enter. Jika benar, hasil muncul di F2. Untuk AVERAGEIF, langkahnya sama tetapi hasil berada di G2.",mode:"enter"}
    ];
    const guide=guides[Math.max(0,Math.min(guides.length-1,st.guideSlide))];

    const multiGuides=[
      {title:"1. Klik sel tempat hasil",text:"Klik H2 untuk SUMIFS atau I2 untuk AVERAGEIFS. Sel ini menjadi tempat rumus dua kriteria.",mode:"target"},
      {title:"2. Tulis fungsi di kotak fx",text:"Klik kotak rumus (fx), lalu ketik =SUMIFS( atau =AVERAGEIFS(. Jangan menunggu sistem menuliskannya otomatis.",mode:"function"},
      {title:"3. Blok kolom Jumlah",text:"Blok D2:D5 lebih dulu. Untuk SUMIFS/AVERAGEIFS, rentang angka yang dihitung ditulis paling awal.",mode:"sumrange"},
      {title:"4. Tulis kriteria pertama",text:"Ketik koma, blok B2:B5, ketik koma, lalu klik F2. Artinya Jenis Item pada B2:B5 harus sama dengan isi F2.",mode:"criteria1"},
      {title:"5. Tulis kriteria kedua",text:"Ketik koma, blok C2:C5, ketik koma, lalu klik G2. Artinya Cabang pada C2:C5 harus sama dengan isi G2.",mode:"criteria2"},
      {title:"6. Ketik kurung tutup",text:"Setelah G2 masuk, ketik tanda ) sendiri. Contoh lengkap: =SUMIFS(D2:D5,B2:B5,F2,C2:C5,G2)",mode:"close"},
      {title:"7. Tekan Enter dan lihat hasil",text:"Tekan Enter. Jika rumus benar, hasil tampil di H2 atau I2. Untuk contoh Beras cabang A, SUMIFS menghasilkan 48 dan AVERAGEIFS menghasilkan 24.",mode:"enter"}
    ];
    const multiGuide=multiGuides[Math.max(0,Math.min(multiGuides.length-1,st.multiGuideSlide))];

    const oneGuideMap={
      target:{write:"Belum menulis rumus",click:"F2 untuk SUMIF / G2 untuk AVERAGEIF",block:"Belum ada",example:"Klik sel hasil terlebih dahulu"},
      function:{write:"=SUMIF( atau =AVERAGEIF(",click:"Kotak fx setelah sel hasil aktif",block:"Belum ada",example:"=SUMIF("},
      range1:{write:"Lanjutkan rumus setelah =SUMIF(",click:"Klik-tahan B2",block:"Seret B2 sampai B5",example:"=SUMIF(B2:B5"},
      criteria:{write:"Ketik koma setelah B2:B5",click:"Klik E2 (Buku)",block:"B2:B5 sudah masuk",example:"=SUMIF(B2:B5,E2"},
      range2:{write:"Ketik koma setelah E2",click:"Klik-tahan C2",block:"Seret C2 sampai C5",example:"=SUMIF(B2:B5,E2,C2:C5"},
      enter:{write:"Ketik ) di akhir",click:"Tekan tombol Enter",block:"Semua rentang selesai",example:"=SUMIF(B2:B5,E2,C2:C5)"}
    };
    const multiGuideMap={
      target:{write:"Belum menulis rumus",click:"H2 untuk SUMIFS / I2 untuk AVERAGEIFS",block:"Belum ada",example:"Klik sel hasil terlebih dahulu"},
      function:{write:"=SUMIFS( atau =AVERAGEIFS(",click:"Kotak fx setelah sel hasil aktif",block:"Belum ada",example:"=SUMIFS("},
      sumrange:{write:"Setelah =SUMIFS(",click:"Klik-tahan D2",block:"Seret D2 sampai D5",example:"=SUMIFS(D2:D5"},
      criteria1:{write:"Ketik koma setelah D2:D5",click:"Klik F2 setelah rentang pertama",block:"Blok B2:B5",example:"=SUMIFS(D2:D5,B2:B5,F2"},
      criteria2:{write:"Ketik koma setelah F2",click:"Klik G2 setelah rentang kedua",block:"Blok C2:C5",example:"=SUMIFS(D2:D5,B2:B5,F2,C2:C5,G2"},
      close:{write:"Ketik ) di akhir",click:"Tidak perlu klik sel lagi",block:"Semua rentang selesai",example:"=SUMIFS(D2:D5,B2:B5,F2,C2:C5,G2)"},
      enter:{write:"Rumus sudah lengkap",click:"Tekan tombol Enter",block:"Semua rentang selesai",example:"Hasil SUMIFS = 48"}
    };
    const guideInfo=oneGuideMap[guide.mode];
    const multiGuideInfo=multiGuideMap[multiGuide.mode];
    const guideInfoHtml=info=>`<div class="l4-step-map"><div><small>TULIS DI KOTAK fx</small><b>${escapeHtml(info.write)}</b></div><div><small>KLIK</small><b>${escapeHtml(info.click)}</b></div><div><small>BLOK</small><b>${escapeHtml(info.block)}</b></div><div><small>BENTUK RUMUS</small><code>${escapeHtml(info.example)}</code></div></div>`;

    const oneSimValue=escapeHtml(st.simOne.value||"");
    const multiSimValue=escapeHtml(st.simMulti.value||"");
    const oneSim=`<div class="l4-real-sim" data-l4-sim="one">
      ${guideInfoHtml(guideInfo)}
      <div class="l4-sim-formula-row"><span>fx</span><input id="l4SimOneFx" value="${oneSimValue}" placeholder="Klik F2/G2 lalu ketik rumus"><button type="button" id="l4SimOneEnter">Enter</button></div>
      <div class="l4-sim-sheet one">
        <div class="head"></div><div class="head">B</div><div class="head">C</div><div class="gap"></div><div class="head">E</div><div class="head">F</div><div class="head">G</div>
        <div class="rowhead">1</div><div class="label">Jenis Item</div><div class="label">Jumlah</div><div class="gap"></div><div class="label">Jenis Item</div><div class="label">Total</div><div class="label">Rata-Rata</div>
        <div class="rowhead">2</div><div data-l4-sim-ref="B2">Buku</div><div data-l4-sim-ref="C2">12</div><div class="gap"></div><div data-l4-sim-ref="E2">Buku</div><button type="button" data-l4-sim-target="F2">${st.simOne.f2??"F2"}</button><button type="button" data-l4-sim-target="G2">${st.simOne.g2??"G2"}</button>
        <div class="rowhead">3</div><div data-l4-sim-ref="B3">Pensil</div><div data-l4-sim-ref="C3">18</div><div class="gap"></div><div></div><div></div><div></div>
        <div class="rowhead">4</div><div data-l4-sim-ref="B4">Buku</div><div data-l4-sim-ref="C4">14</div><div class="gap"></div><div></div><div></div><div></div>
        <div class="rowhead">5</div><div data-l4-sim-ref="B5">Buku</div><div data-l4-sim-ref="C5">17</div><div class="gap"></div><div></div><div></div><div></div>
      </div>
      <div class="l4-sim-status" id="l4SimOneStatus">${escapeHtml(st.simOne.status||"Pilih sel hasil untuk mulai.")}</div>
    </div>`;

    const multiSim=`<div class="l4-real-sim" data-l4-sim="multi">
      ${guideInfoHtml(multiGuideInfo)}
      <div class="l4-sim-formula-row"><span>fx</span><input id="l4SimMultiFx" value="${multiSimValue}" placeholder="Klik H2/I2 lalu ketik rumus"><button type="button" id="l4SimMultiEnter">Enter</button></div>
      <div class="l4-sim-sheet multi">
        <div class="head"></div><div class="head">B</div><div class="head">C</div><div class="head">D</div><div class="gap"></div><div class="head">F</div><div class="head">G</div><div class="head">H</div><div class="head">I</div>
        <div class="rowhead">1</div><div class="label">Jenis Item</div><div class="label">Cabang</div><div class="label">Jumlah</div><div class="gap"></div><div class="label">Jenis Item</div><div class="label">Cabang</div><div class="label">Total</div><div class="label">Rata-Rata</div>
        <div class="rowhead">2</div><div data-l4-sim-ref="B2">Beras</div><div data-l4-sim-ref="C2">A</div><div data-l4-sim-ref="D2">25</div><div class="gap"></div><div data-l4-sim-ref="F2">Beras</div><div data-l4-sim-ref="G2">A</div><button type="button" data-l4-sim-target="H2">${st.simMulti.h2??"H2"}</button><button type="button" data-l4-sim-target="I2">${st.simMulti.i2??"I2"}</button>
        <div class="rowhead">3</div><div data-l4-sim-ref="B3">Beras</div><div data-l4-sim-ref="C3">B</div><div data-l4-sim-ref="D3">30</div><div class="gap"></div><div></div><div></div><div></div><div></div>
        <div class="rowhead">4</div><div data-l4-sim-ref="B4">Beras</div><div data-l4-sim-ref="C4">A</div><div data-l4-sim-ref="D4">23</div><div class="gap"></div><div></div><div></div><div></div><div></div>
        <div class="rowhead">5</div><div data-l4-sim-ref="B5">Gula</div><div data-l4-sim-ref="C5">B</div><div data-l4-sim-ref="D5">18</div><div class="gap"></div><div></div><div></div><div></div><div></div>
      </div>
      <div class="l4-sim-status" id="l4SimMultiStatus">${escapeHtml(st.simMulti.status||"Pilih sel hasil untuk mulai.")}</div>
    </div>`;

    panel.innerHTML=`${styledWindowHeader(3,"SUMIF, AVERAGEIF, SUMIFS & AVERAGEIFS","lx-theme-purple")}
      <div class="l2-layout l4-practice-layout">
        <main class="l2-main">
          <section class="l2-learning-row l4-primary-learning">
            <div class="l2-material-card l4-primary-material">
              <h4>📖 &nbsp; Materi singkat</h4>
              <p><b>SUMIF</b> menjumlahkan data berdasarkan <b>satu kriteria</b>, sedangkan <b>AVERAGEIF</b> menghitung rata-rata berdasarkan <b>satu kriteria</b>.</p>
              <div><code>=SUMIF(range,kriteria,sum_range)</code><code>=AVERAGEIF(range,kriteria,average_range)</code></div>
            </div>
            <div class="l2-guide-card l4-primary-guide">
              <div class="l2-guide-head"><h4>☷ &nbsp; Petunjuk Pengerjaan</h4><span>${st.guideSlide+1}/${guides.length}</span></div>
              <div class="l2-guide-slide"><h3>${escapeHtml(guide.title)}</h3><p>${escapeHtml(guide.text)}</p>${oneSim}</div>
              <div class="l2-guide-nav l4-guide-nav">
                <button type="button" data-l4-guide-prev ${st.guideSlide===0?'disabled':''}>‹ &nbsp; Sebelumnya</button>
                <div>${guides.map((_,i)=>`<i class="${i===st.guideSlide?'active':''}"></i>`).join("")}</div>
                <button type="button" data-l4-guide-next ${st.guideSlide===guides.length-1?'disabled':''}>Berikutnya &nbsp; ›</button>
              </div>
            </div>
          </section>

          <section class="l2-instruction-band">Klik sel jawaban, ketik nama fungsi secara manual, lalu <b>klik atau blok sel/rentang</b> pada lembar kerja untuk memasukkan referensi. Koma dan kurung tetap diketik sendiri.</section>

          <section class="l2-section-card">
            <div class="l2-section-head"><div><h3>A. SUMIF & AVERAGEIF — satu kriteria</h3><p>Gunakan lembar kerja seperti Excel. Sel B, C, dan E dapat diklik atau diblok setelah sel jawaban dipilih.</p></div><span>${tasks.slice(0,10).filter(t=>st.answers[t.key]?.correct).length}/10 benar</span></div>
            <div class="l4-sheet-wrap"><table class="l4-sheet l4-sheet-one" data-l4-sheet="one">
              <colgroup><col class="rowhead"><col class="no"><col class="item"><col class="qty"><col class="gap"><col class="criteria"><col class="result"><col class="result"></colgroup>
              <thead><tr class="letters"><th></th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th><th>F</th><th>G</th></tr><tr><th>1</th><th>No</th><th>Jenis Item</th><th>Jumlah</th><th></th><th>Jenis Item</th><th>Total</th><th>Rata-Rata</th></tr></thead>
              <tbody>${oneBody}</tbody>
            </table></div>
          </section>

          <section class="l4-secondary-learning">
            <div class="l4-secondary-material"><span>Materi lanjutan</span><h3>SUMIFS & AVERAGEIFS</h3><p>Gunakan fungsi berakhiran <b>S</b> saat perhitungan memakai dua atau lebih kriteria. Pada lembar B, syaratnya adalah Jenis Item dan Cabang.</p><code>=SUMIFS(sum_range,range1,kriteria1,range2,kriteria2)</code><code>=AVERAGEIFS(avg_range,range1,kriteria1,range2,kriteria2)</code></div>
            <div class="l2-guide-card l4-secondary-guide">
              <div class="l2-guide-head"><h4>☷ &nbsp; Petunjuk Pengerjaan SUMIFS & AVERAGEIFS</h4><span>${st.multiGuideSlide+1}/${multiGuides.length}</span></div>
              <div class="l2-guide-slide"><h3>${escapeHtml(multiGuide.title)}</h3><p>${escapeHtml(multiGuide.text)}</p>${multiSim}</div>
              <div class="l2-guide-nav l4-guide-nav"><button type="button" data-l4-multi-prev ${st.multiGuideSlide===0?'disabled':''}>‹ &nbsp; Sebelumnya</button><div>${multiGuides.map((_,i)=>`<i class="${i===st.multiGuideSlide?'active':''}"></i>`).join("")}</div><button type="button" data-l4-multi-next ${st.multiGuideSlide===multiGuides.length-1?'disabled':''}>Berikutnya &nbsp; ›</button></div>
            </div>
          </section>

          <section class="l2-section-card">
            <div class="l2-section-head"><div><h3>B. SUMIFS & AVERAGEIFS — dua kriteria</h3><p>Sel B, C, D, F, dan G dapat diklik atau diblok untuk membangun rumus dua kriteria.</p></div><span>${tasks.slice(10).filter(t=>st.answers[t.key]?.correct).length}/10 benar</span></div>
            <div class="l4-sheet-wrap"><table class="l4-sheet l4-sheet-multi" data-l4-sheet="multi">
              <colgroup><col class="rowhead"><col class="no"><col class="item"><col class="branch"><col class="qty"><col class="gap"><col class="criteria"><col class="branch"><col class="result"><col class="result"></colgroup>
              <thead><tr class="letters"><th></th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th><th>F</th><th>G</th><th>H</th><th>I</th></tr><tr><th>1</th><th>No</th><th>Jenis Item</th><th>Cabang</th><th>Jumlah</th><th></th><th>Jenis Item</th><th>Cabang</th><th>Total</th><th>Rata-Rata</th></tr></thead>
              <tbody>${multiBody}</tbody>
            </table></div>
          </section>

          <button id="l4CheckAll" class="l2-check-all ${st.readyToFinish&&allCorrect?'ready':''}" ${!allFilled&&!st.readyToFinish?'disabled':''}>${done?'✓ Latihan selesai':st.readyToFinish&&allCorrect?'✓ Selesai':'✓ Periksa seluruh 20 jawaban'}</button>
        </main>
        <aside class="l2-sidebar">${styledParticipant(3)}<section class="l2-side-card"><h4>Deteksi rumus</h4><p>Klik salah satu sel Total/Rata-Rata, lalu pilih referensi pada tabel.</p><div id="l4Detection">${st.active?`<b>${escapeHtml(st.active.addr)}</b><span>${escapeHtml(st.active.value||'Belum diisi')}</span>`:'Belum ada jawaban dipilih.'}</div></section><section class="l2-quick-tip"><h4>Petunjuk cepat</h4><p>Ketik fungsi, koma, dan kurung secara manual. Klik/blok hanya memasukkan alamat sel atau rentang.</p><div>=SUMIF(B2:B21,E2,C2:C21)</div></section></aside>
      </div>`;

    const setDetection=(key)=>{
      const t=tasks.find(x=>x.key===key); if(!t) return;
      const a=st.answers[key]||{};
      st.active={key,addr:t.addr,label:t.label,value:a.value||""};
      const box=panel.querySelector("#l4Detection");
      if(box) box.innerHTML=`<b>${escapeHtml(t.addr)} · ${escapeHtml(t.label)}</b><span>${escapeHtml(a.value||'Belum diisi')}</span>`;
    };

    let activeInput=null;
    const bindActiveInputs=()=>{
      panel.querySelectorAll("[data-l4-key]").forEach(inp=>{
        inp.addEventListener("focus",()=>{activeInput=inp;setDetection(inp.dataset.l4Key);});
        inp.addEventListener("input",()=>{
          const key=inp.dataset.l4Key;
          st.answers[key]={...(st.answers[key]||{}),value:inp.value,correct:false};
          st.readyToFinish=false;
          inp.classList.remove("wrong");
          setDetection(key);
          const btn=panel.querySelector("#l4CheckAll");
          const filled=tasks.every(t=>String(st.answers[t.key]?.value||"").trim());
          if(btn) btn.disabled=!filled;
          persistStudent();
        });
        inp.addEventListener("keydown",async e=>{
          if(e.key!=="Enter") return;
          e.preventDefault();
          const key=inp.dataset.l4Key;
          const t=tasks.find(x=>x.key===key);
          const correct=t && formulaComparable(inp.value)===formulaComparable(t.formula);
          st.answers[key]={value:inp.value,correct:!!correct};
          st.readyToFinish=false;
          const scroll=panel.scrollTop;
          try{await persistStudent();}catch(_){}
          renderSumifAverageif(panel);bindGuide();requestAnimationFrame(()=>panel.scrollTop=scroll);
          toast(correct?`Benar. Hasil ${t.addr} = ${formatResult(t.result)}`:"Rumus belum tepat. Periksa fungsi, koma, kurung, dan referensinya.");
        });
      });
    };
    bindActiveInputs();

    panel.querySelectorAll("[data-l4-active]").forEach(btn=>btn.addEventListener("click",()=>setDetection(btn.dataset.l4Active)));

    const parseAddr=addr=>{const m=String(addr).match(/^([A-Z]+)(\d+)$/);return m?{col:m[1],row:+m[2]}:null;};
    const colNum=col=>{let n=0;for(const ch of col)n=n*26+(ch.charCodeAt(0)-64);return n;};
    const numCol=n=>{let s="";while(n>0){n--;s=String.fromCharCode(65+n%26)+s;n=Math.floor(n/26);}return s;};
    const canonicalRange=(a,b)=>{
      const A=parseAddr(a),B=parseAddr(b);if(!A||!B)return a;
      const c1=Math.min(colNum(A.col),colNum(B.col)),c2=Math.max(colNum(A.col),colNum(B.col));
      const r1=Math.min(A.row,B.row),r2=Math.max(A.row,B.row);
      const start=`${numCol(c1)}${r1}`,end=`${numCol(c2)}${r2}`;
      return start===end?start:`${start}:${end}`;
    };
    const insertRef=(inp,ref)=>{
      if(!inp){toast("Klik sel Total atau Rata-Rata terlebih dahulu.");return;}
      const start=Number.isInteger(inp.selectionStart)?inp.selectionStart:inp.value.length;
      const end=Number.isInteger(inp.selectionEnd)?inp.selectionEnd:start;
      inp.value=inp.value.slice(0,start)+ref+inp.value.slice(end);
      const pos=start+ref.length;
      inp.focus({preventScroll:true});inp.setSelectionRange(pos,pos);
      inp.dispatchEvent(new Event("input",{bubbles:true}));
    };
    const clearSheetSelection=table=>table.querySelectorAll(".l4-selected").forEach(x=>x.classList.remove("l4-selected"));
    const paintSheetSelection=(table,range)=>{
      clearSheetSelection(table);
      const [a,b=a]=range.split(":");const A=parseAddr(a),B=parseAddr(b);if(!A||!B)return;
      const c1=Math.min(colNum(A.col),colNum(B.col)),c2=Math.max(colNum(A.col),colNum(B.col));
      const r1=Math.min(A.row,B.row),r2=Math.max(A.row,B.row);
      table.querySelectorAll("[data-l4-ref]").forEach(cell=>{const P=parseAddr(cell.dataset.l4Ref);if(P&&colNum(P.col)>=c1&&colNum(P.col)<=c2&&P.row>=r1&&P.row<=r2)cell.classList.add("l4-selected");});
    };
    panel.querySelectorAll("[data-l4-sheet]").forEach(table=>{
      let drag=null;
      table.addEventListener("pointerdown",e=>{
        const cell=e.target.closest("[data-l4-ref]");if(!cell||cell.closest("table")!==table)return;
        e.preventDefault();
        drag={id:e.pointerId,start:cell.dataset.l4Ref,end:cell.dataset.l4Ref};
        try{table.setPointerCapture(e.pointerId)}catch(_){}
        paintSheetSelection(table,cell.dataset.l4Ref);
      });
      table.addEventListener("pointermove",e=>{
        if(!drag||drag.id!==e.pointerId)return;
        const el=document.elementFromPoint(e.clientX,e.clientY);const cell=el?.closest?.("[data-l4-ref]");if(!cell||cell.closest("table")!==table)return;
        drag.end=cell.dataset.l4Ref;paintSheetSelection(table,canonicalRange(drag.start,drag.end));
      });
      const finish=e=>{
        if(!drag||drag.id!==e.pointerId)return;
        const range=canonicalRange(drag.start,drag.end);drag=null;
        try{table.releasePointerCapture(e.pointerId)}catch(_){}
        paintSheetSelection(table,range);insertRef(activeInput,range);
      };
      table.addEventListener("pointerup",finish);table.addEventListener("pointercancel",finish);
    });

    const bindSimulation=(kind)=>{
      const root=panel.querySelector(`[data-l4-sim="${kind}"]`);if(!root)return;
      const fx=root.querySelector("input");const enter=root.querySelector("button[id$='Enter']");const state=kind==="one"?st.simOne:st.simMulti;
      const status=root.querySelector(".l4-sim-status");let target=state.target||null,drag=null;
      const setStatus=txt=>{state.status=txt;if(status)status.textContent=txt;};
      const insert=(ref)=>{const p=fx.selectionStart??fx.value.length,q=fx.selectionEnd??p;fx.value=fx.value.slice(0,p)+ref+fx.value.slice(q);const pos=p+ref.length;fx.focus({preventScroll:true});fx.setSelectionRange(pos,pos);state.value=fx.value;};
      root.querySelectorAll("[data-l4-sim-target]").forEach(btn=>btn.addEventListener("click",()=>{target=btn.dataset.l4SimTarget;state.target=target;root.querySelectorAll("[data-l4-sim-target]").forEach(x=>x.classList.toggle("active",x===btn));fx.focus({preventScroll:true});setStatus(`Sel aktif: ${target}. Ketik fungsi lalu pilih referensi.`);}));
      fx.addEventListener("input",()=>{state.value=fx.value;setStatus(target?`Rumus ${target}: ${fx.value||'–'}`:"Pilih sel hasil terlebih dahulu.");});
      fx.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();enter.click();}});
      const refs=[...root.querySelectorAll("[data-l4-sim-ref]")];
      const paint=range=>{refs.forEach(x=>x.classList.remove("selected"));const [a,b=a]=range.split(":");const A=parseAddr(a),B=parseAddr(b);if(!A||!B)return;const c1=Math.min(colNum(A.col),colNum(B.col)),c2=Math.max(colNum(A.col),colNum(B.col)),r1=Math.min(A.row,B.row),r2=Math.max(A.row,B.row);refs.forEach(x=>{const P=parseAddr(x.dataset.l4SimRef);if(P&&colNum(P.col)>=c1&&colNum(P.col)<=c2&&P.row>=r1&&P.row<=r2)x.classList.add("selected");});};
      root.addEventListener("pointerdown",e=>{const cell=e.target.closest("[data-l4-sim-ref]");if(!cell)return;e.preventDefault();drag={id:e.pointerId,start:cell.dataset.l4SimRef,end:cell.dataset.l4SimRef};try{root.setPointerCapture(e.pointerId)}catch(_){}paint(cell.dataset.l4SimRef);});
      root.addEventListener("pointermove",e=>{if(!drag||drag.id!==e.pointerId)return;const el=document.elementFromPoint(e.clientX,e.clientY);const cell=el?.closest?.("[data-l4-sim-ref]");if(!cell)return;drag.end=cell.dataset.l4SimRef;paint(canonicalRange(drag.start,drag.end));});
      const finish=e=>{if(!drag||drag.id!==e.pointerId)return;const range=canonicalRange(drag.start,drag.end);drag=null;try{root.releasePointerCapture(e.pointerId)}catch(_){}paint(range);insert(range);setStatus(`Referensi ${range} dimasukkan. Lanjutkan mengetik koma/kurung sendiri.`);};
      root.addEventListener("pointerup",finish);root.addEventListener("pointercancel",finish);
      enter.addEventListener("click",()=>{
        if(!target){setStatus("Pilih sel hasil dahulu.");return;}
        const normalized=formulaComparable(fx.value);
        let expected="",result="";
        if(kind==="one"){
          expected=target==="F2"?"=SUMIF(B2:B5,E2,C2:C5)":"=AVERAGEIF(B2:B5,E2,C2:C5)";
          result=target==="F2"?43:14.3333333333;
        }else{
          expected=target==="H2"?"=SUMIFS(D2:D5,B2:B5,F2,C2:C5,G2)":"=AVERAGEIFS(D2:D5,B2:B5,F2,C2:C5,G2)";
          result=target==="H2"?48:24;
        }
        if(normalized===formulaComparable(expected)){
          const shown=formatResult(result);state[target.toLowerCase()]=shown;const btn=root.querySelector(`[data-l4-sim-target="${target}"]`);if(btn){btn.textContent=shown;btn.classList.add("done");}setStatus(`${target} = ${shown}. Rumus benar.`);
        }else setStatus("Rumus belum tepat. Periksa fungsi, koma, kurung, dan rentang yang dipilih.");
      });
    };
    bindSimulation("one");bindSimulation("multi");

    const keepScroll=()=>panel.scrollTop;
    const rerender=scroll=>{renderSumifAverageif(panel);bindGuide();requestAnimationFrame(()=>panel.scrollTop=scroll);};
    const prev=panel.querySelector("[data-l4-guide-prev]"),next=panel.querySelector("[data-l4-guide-next]");
    if(prev)prev.addEventListener("click",()=>{const s=keepScroll();st.guideSlide=Math.max(0,st.guideSlide-1);rerender(s);});
    if(next)next.addEventListener("click",()=>{const s=keepScroll();st.guideSlide=Math.min(guides.length-1,st.guideSlide+1);rerender(s);});
    const multiPrev=panel.querySelector("[data-l4-multi-prev]"),multiNext=panel.querySelector("[data-l4-multi-next]");
    if(multiPrev)multiPrev.addEventListener("click",()=>{const s=keepScroll();st.multiGuideSlide=Math.max(0,st.multiGuideSlide-1);rerender(s);});
    if(multiNext)multiNext.addEventListener("click",()=>{const s=keepScroll();st.multiGuideSlide=Math.min(multiGuides.length-1,st.multiGuideSlide+1);rerender(s);});

    const check=panel.querySelector("#l4CheckAll");
    if(check)check.addEventListener("click",async()=>{
      if(done)return;
      if(st.readyToFinish&&tasks.every(t=>st.answers[t.key]?.correct===true)){await completeExercise(3);return;}
      if(!tasks.every(t=>String(st.answers[t.key]?.value||"").trim())){toast("Isi seluruh 20 rumus terlebih dahulu.");return;}
      tasks.forEach(t=>{const value=st.answers[t.key]?.value||"";st.answers[t.key]={value,correct:formulaComparable(value)===formulaComparable(t.formula)};});
      const ok=tasks.every(t=>st.answers[t.key]?.correct===true);st.readyToFinish=ok;const scroll=keepScroll();try{await persistStudent();}catch(_){}rerender(scroll);toast(ok?"Semua 20 rumus benar. Klik Selesai untuk mengirim hasil.":`${tasks.filter(t=>st.answers[t.key]?.correct).length} dari 20 rumus benar. Perbaiki rumus yang masih salah.`);
    });

    bindGuide();
  }


  function renderIfPractice(panel){
    const passRows=[["Andi",80],["Budi",70],["Citra",90],["Dinda",74],["Eka",75]];
    const passQuestions=passRows.map((r,i)=>({
      label:`Tentukan status ${r[0]} dengan nilai ${r[1]}`,
      hint:'Jika nilai minimal 75 maka Lulus, selain itu Remedial.',
      formula:`=IF(B${i+2}>=75,"Lulus","Remedial")`,
      result:r[1]>=75?"Lulus":"Remedial"
    }));
    const stockRows=[["Buku",12],["Pensil",3],["Penggaris",0],["Penghapus",8],["Spidol",1]];
    const stockQuestions=stockRows.map((r,i)=>({
      label:`Tentukan kondisi stok ${r[0]} sebanyak ${r[1]}`,
      hint:'Jika stok minimal 5 maka Stok Aman, selain itu Stok Sedikit.',
      formula:`=IF(B${i+2}>=5,"Stok Aman","Stok Sedikit")`,
      result:r[1]>=5?"Stok Aman":"Stok Sedikit"
    }));
    renderPracticeWindow(panel,{
      index:4,
      windowTitle:"Latihan Rumus IF",
      material:'Fungsi <b>IF</b> menghasilkan satu nilai jika kondisi benar dan nilai lain jika kondisi salah. Bentuk dasarnya adalah <b>=IF(kondisi, nilai_jika_benar, nilai_jika_salah)</b>.',
      examples:['=IF(B2>=75,"Lulus","Remedial")','=IF(B2>=5,"Stok Aman","Stok Sedikit")'],
      instruction:'Kerjakan dua lembar praktik <b>IF</b>. Mulai dari tabel data, tulis rumus pada kartu jawaban, lalu tekan <b>Enter</b>. Perhatikan operator perbandingan, tanda petik, koma, dan kurung.',
      quickTip:'Baca IF sebagai: jika kondisi benar tampilkan hasil pertama, jika salah tampilkan hasil kedua.',
      quickExample:'=IF(B2>=75,"Lulus","Remedial")',
      guideSlides:[
        {title:"1. Tentukan kondisi",text:"Mulai dengan syarat yang akan diuji, misalnya nilai pada B2 harus lebih besar atau sama dengan 75."},
        {title:"2. Tulis fungsi IF",text:"Ketik =IF( lalu tulis kondisi, misalnya B2>=75."},
        {title:"3. Tulis hasil jika benar",text:"Setelah kondisi, tulis hasil pertama. Untuk teks gunakan tanda petik, misalnya \"Lulus\"."},
        {title:"4. Tulis hasil jika salah",text:"Setelah koma berikutnya, tulis hasil jika kondisi salah, misalnya \"Remedial\"."},
        {title:"5. Tutup rumus dan Enter",text:"Tulis kurung tutup lalu tekan Enter untuk memeriksa rumus dan menampilkan hasil."}
      ],
      miniSlide:(slide,i)=>`<div class="l45-mini-sheet"><div><b>A</b><b>B</b><b>C</b></div><div><span>Nama</span><span>Nilai</span><span>Status</span></div><div><span>Andi</span><span>80</span><span>${i===4?'Lulus':'?'}</span></div><code>=IF(B2>=75,"Lulus","Remedial")</code></div>`,
      sections:[
        {title:"A. IF Kelulusan",description:"Tentukan status Lulus atau Remedial berdasarkan nilai minimal 75.",columns:["Nama","Nilai"],rows:passRows,questions:passQuestions},
        {title:"B. IF Kondisi Stok",description:"Tentukan Stok Aman atau Stok Sedikit berdasarkan batas minimal 5.",columns:["Produk","Stok"],rows:stockRows,questions:stockQuestions}
      ]
    });
  }

  function renderFormulaExercise(panel,i,data,questions){
    const st=getExState(i,{answers:{}});
    const complete=questions.every((q,idx)=>st.answers[idx]?.correct);
    panel.innerHTML=exerciseHeader(i)+`
      <div class="task-card">
        <h4>Data latihan</h4>
        <table class="data-table">
          <tr><th>A</th><th>B</th></tr>
          ${data.map((r,idx)=>`<tr><td>${escapeHtml(r[0])}</td><td>${r[1]}</td></tr>`).join("")}
        </table>
      </div>
      <div class="task-card"><h4>Ketik rumus lalu tekan Enter</h4>
        <div class="question-list">
          ${questions.map((q,idx)=>{
            const a=st.answers[idx]||{};
            return `<div class="question-row">
              <span class="qno">${idx+1}</span>
              <div><strong>${escapeHtml(q.label)}</strong><br><code>${escapeHtml(q.formula)}</code></div>
              <div><input data-fq="${idx}" value="${escapeHtml(a.value||"")}" placeholder="Ketik rumus"><div class="formula-result">${a.correct?`Hasil: ${q.result}`:""}</div></div>
              <span class="status">${a.value?(a.correct?"✓":"✕"):""}</span>
            </div>`;
          }).join("")}
        </div>
      </div>
      ${finishButton(i,complete)}
    `;
    $$("[data-fq]").forEach(inp=>inp.addEventListener("keydown",e=>{
      if(e.key==="Enter"){
        const idx=+inp.dataset.fq,q=questions[idx];
        const correct=normalizeFormula(inp.value)===normalizeFormula(q.formula);
        st.answers[idx]={value:inp.value,correct};
        persistStudent();renderFormulaExercise(panel,i,data,questions);toast(correct?`Benar. Hasil = ${q.result}`:"Rumus belum tepat.");
      }
    }));
    bindFinish(i,complete);
  }

  function renderVlookup(panel){
    const st=getExState(5,{answers:{},guideSlide:0,activeIndex:null});
    st.answers ||= {};
    st.guideSlide=Number.isInteger(st.guideSlide)?st.guideSlide:0;
    const complete=VLOOKUP_Q.every((q,idx)=>st.answers[idx]?.correct);
    const done=!!currentUser.completedExercises[5];

    const guides=[
      {title:"1. Kenali tabel referensi",text:"Kolom pertama berisi kode barang, kolom kedua nama barang, dan kolom ketiga harga. VLOOKUP mencari dari kolom paling kiri.",kind:"table"},
      {title:"2. Tentukan nilai pencarian",text:"Gunakan kode barang sebagai lookup_value, misalnya BRG001.",kind:"lookup"},
      {title:"3. Pilih rentang tabel",text:"Rentang referensi pada latihan ini adalah $A$2:$C$6. Tanda $ membuat referensi tetap.",kind:"range"},
      {title:"4. Tentukan nomor kolom",text:"Gunakan 2 untuk mengambil Nama dan 3 untuk mengambil Harga.",kind:"column"},
      {title:"5. Gunakan FALSE",text:"FALSE meminta kecocokan kode secara tepat. Setelah rumus lengkap, tekan Enter untuk memeriksa hasil.",kind:"done"}
    ];
    const g=guides[Math.max(0,Math.min(guides.length-1,st.guideSlide))];
    const mini=`<div class="lx-vlookup-mini"><div class="lx-mini-table"><div>Kode</div><div>Nama</div><div>Harga</div><div class="focus">BRG001</div><div>Buku</div><div>12000</div><div>BRG002</div><div>Pensil</div><div>3000</div></div><code>${g.kind==='lookup'?'=VLOOKUP(BRG001,':g.kind==='range'?'=VLOOKUP(E2,$A$2:$C$6,':g.kind==='column'?'=VLOOKUP(E2,$A$2:$C$6,2,':g.kind==='done'?'=VLOOKUP(E2,$A$2:$C$6,2,FALSE)':'VLOOKUP mencari pada kolom pertama'}</code></div>`;

    const table=`<div class="l2-table-scroll"><table class="l2-sheet lx-vlookup-table"><thead><tr><th></th><th>A</th><th>B</th><th>C</th></tr><tr><th>1</th><th>Kode</th><th>Nama</th><th>Harga</th></tr></thead><tbody>${VLOOKUP_TABLE.map((r,i)=>`<tr><th>${i+2}</th>${r.map(x=>`<td>${escapeHtml(x)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    const qCards=VLOOKUP_Q.map((q,idx)=>{
      const a=st.answers[idx]||{};
      return `<div class="lx-formula-card ${a.correct?'correct':a.value?'wrong':''}" data-v-card="${idx}"><div class="lx-card-head"><span>${idx+1}</span><div><strong>${q.label}</strong><small>Nilai pencarian: ${escapeHtml(q.lookup)}</small></div></div><code>${escapeHtml(q.formula)}</code><input data-vq="${idx}" value="${escapeHtml(a.value||'')}" placeholder="Ketik rumus lalu Enter" autocomplete="off" spellcheck="false"><small class="lx-card-status">${a.correct?`✓ Hasil: ${escapeHtml(q.result)}`:a.value?'✕ Rumus belum tepat':''}</small></div>`;
    }).join('');

    panel.innerHTML=`${styledWindowHeader(5,"VLOOKUP","lx-theme-red")}
      <div class="l2-layout"><main class="l2-main">
        <section class="l2-learning-row"><div class="l2-material-card"><h4>📖 &nbsp; Materi singkat</h4><p><b>VLOOKUP</b> mencari nilai pada kolom pertama sebuah tabel, lalu mengambil data dari kolom tertentu pada baris yang sama.</p><div><code>=VLOOKUP(nilai,tabel,kolom,FALSE)</code><code>=VLOOKUP(E2,$A$2:$C$6,2,FALSE)</code></div></div><div class="l2-guide-card"><div class="l2-guide-head"><h4>☷ &nbsp; Petunjuk Pengerjaan</h4><span>${st.guideSlide+1}/${guides.length}</span></div><div class="l2-guide-slide"><h3>${g.title}</h3><p>${g.text}</p>${mini}</div><div class="l2-guide-nav"><button type="button" data-v-guide-prev ${st.guideSlide===0?'disabled':''}>‹ &nbsp; Sebelumnya</button><div>${guides.map((_,i)=>`<i class="${i===st.guideSlide?'active':''}"></i>`).join('')}</div><button type="button" data-v-guide-next ${st.guideSlide===guides.length-1?'disabled':''}>Berikutnya &nbsp; ›</button></div></div></section>
        <section class="l2-instruction-band">Gunakan tabel referensi untuk menyelesaikan <b>5 rumus VLOOKUP</b>. Tekan <b>Enter</b> setelah mengetik setiap rumus.</section>
        <section class="l2-section-card"><div class="l2-section-head"><div><h3>A. Tabel referensi A2:C6</h3><p>Perhatikan kode, nama barang, dan harga sebelum menulis rumus.</p></div><span>5 data</span></div>${table}</section>
        <section class="l2-section-card"><div class="l2-section-head"><div><h3>B. Praktik VLOOKUP</h3><p>Ketik rumus sesuai pertanyaan lalu tekan Enter.</p></div><span id="vCorrectCount">${VLOOKUP_Q.filter((q,i)=>st.answers[i]?.correct).length}/5 benar</span></div><div class="lx-formula-grid">${qCards}</div></section>
        <button id="vFinishBtn" class="l2-check-all ${complete?'ready':''}" ${complete?'':'disabled'}>${done?'✓ Latihan selesai':complete?'✓ Selesai':'Selesaikan 5 rumus'}</button>
      </main><aside class="l2-sidebar">${styledParticipant(5)}<section class="l2-side-card"><h4>Deteksi rumus</h4><p>Klik kotak rumus yang sedang dikerjakan.</p><div id="vDetection">${Number.isInteger(st.activeIndex)?`<b>Soal ${st.activeIndex+1}</b><span>${escapeHtml(st.answers[st.activeIndex]?.value||'Belum diisi')}</span>`:'Belum ada jawaban dipilih.'}</div></section><section class="l2-quick-tip"><h4>Petunjuk cepat</h4><p>Kolom 2 mengambil Nama. Kolom 3 mengambil Harga. Gunakan FALSE untuk pencarian tepat.</p><div>=VLOOKUP(E2,$A$2:$C$6,2,FALSE)</div></section></aside></div>`;

    const updateDetection=(idx)=>{st.activeIndex=idx;const box=panel.querySelector('#vDetection');if(box)box.innerHTML=`<b>Soal ${idx+1}</b><span>${escapeHtml(st.answers[idx]?.value||'Belum diisi')}</span>`;};
    const rerender=()=>{const scroll=panel.scrollTop;renderVlookup(panel);bindGuide();requestAnimationFrame(()=>panel.scrollTop=scroll);};
    panel.querySelectorAll('[data-vq]').forEach(inp=>{
      inp.addEventListener('focus',()=>updateDetection(+inp.dataset.vq));
      inp.addEventListener('input',()=>{const idx=+inp.dataset.vq;st.answers[idx]={...(st.answers[idx]||{}),value:inp.value,correct:false};updateDetection(idx);persistStudent();});
      inp.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();const idx=+inp.dataset.vq,q=VLOOKUP_Q[idx];const correct=normalizeFormula(inp.value)===normalizeFormula(q.formula);st.answers[idx]={value:inp.value,correct};persistStudent();toast(correct?`Benar. Hasil = ${q.result}`:'Rumus belum tepat.');rerender();}});
    });
    const prev=panel.querySelector('[data-v-guide-prev]'),next=panel.querySelector('[data-v-guide-next]');
    if(prev)prev.addEventListener('click',()=>{st.guideSlide=Math.max(0,st.guideSlide-1);rerender();});
    if(next)next.addEventListener('click',()=>{st.guideSlide=Math.min(guides.length-1,st.guideSlide+1);rerender();});
    const finish=panel.querySelector('#vFinishBtn');if(finish)finish.addEventListener('click',async()=>{if(done)return;if(VLOOKUP_Q.every((q,i)=>st.answers[i]?.correct))await completeExercise(5);});
  }

  function renderAlgorithm(panel){
    const st=getExState(6,{order:["Mulai",'Jika tidak, tampilkan "Remedial"',"Masukkan nilai siswa","Selesai","Periksa apakah nilai ≥ 75",'Jika ya, tampilkan "Lulus"'],guideSlide:0,activeIndex:null});
    st.guideSlide=Number.isInteger(st.guideSlide)?st.guideSlide:0;
    const correctPositions=st.order.filter((x,i)=>x===ALGO_CORRECT[i]).length;
    const complete=correctPositions===ALGO_CORRECT.length;
    const done=!!currentUser.completedExercises[6];
    const guides=[
      {title:"1. Mulai dari tujuan",text:"Algoritma adalah urutan langkah yang logis. Untuk kasus kelulusan, proses dimulai dari Mulai lalu menerima nilai siswa."},
      {title:"2. Masukkan data",text:"Setelah Mulai, masukkan nilai siswa sebagai data yang akan diperiksa."},
      {title:"3. Periksa kondisi",text:"Bandingkan nilai dengan batas 75 menggunakan kondisi nilai ≥ 75."},
      {title:"4. Tentukan dua hasil",text:"Jika kondisi benar tampilkan Lulus. Jika kondisi salah tampilkan Remedial."},
      {title:"5. Akhiri proses",text:"Setelah hasil ditampilkan, algoritma berakhir pada langkah Selesai."}
    ];
    const g=guides[Math.max(0,Math.min(guides.length-1,st.guideSlide))];
    const mini=`<div class="lx-flow-mini"><span>Mulai</span><b>→</b><span>Input nilai</span><b>→</b><span>Cek ≥ 75</span><b>→</b><span>Lulus / Remedial</span></div>`;
    panel.innerHTML=`${styledWindowHeader(6,"Algoritma","lx-theme-indigo")}
      <div class="l2-layout"><main class="l2-main">
        <section class="l2-learning-row"><div class="l2-material-card"><h4>📖 &nbsp; Materi singkat</h4><p><b>Algoritma</b> adalah urutan langkah sistematis untuk menyelesaikan masalah. Susunan harus logis dari awal sampai akhir.</p><div><code>Mulai → Input → Proses → Output → Selesai</code><code>Kondisi: nilai ≥ 75</code></div></div><div class="l2-guide-card"><div class="l2-guide-head"><h4>☷ &nbsp; Petunjuk Pengerjaan</h4><span>${st.guideSlide+1}/${guides.length}</span></div><div class="l2-guide-slide"><h3>${g.title}</h3><p>${g.text}</p>${mini}</div><div class="l2-guide-nav"><button type="button" data-a-guide-prev ${st.guideSlide===0?'disabled':''}>‹ &nbsp; Sebelumnya</button><div>${guides.map((_,i)=>`<i class="${i===st.guideSlide?'active':''}"></i>`).join('')}</div><button type="button" data-a-guide-next ${st.guideSlide===guides.length-1?'disabled':''}>Berikutnya &nbsp; ›</button></div></div></section>
        <section class="l2-instruction-band">Gunakan tombol <b>naik</b> dan <b>turun</b> untuk menyusun algoritma kelulusan hingga seluruh 6 langkah berada pada posisi yang benar.</section>
        <section class="l2-section-card"><div class="l2-section-head"><div><h3>A. Susun algoritma kelulusan</h3><p>Urutkan langkah dari Mulai sampai Selesai.</p></div><span>${correctPositions}/6 posisi benar</span></div><div class="lx-order-list">${st.order.map((x,i)=>`<div class="lx-order-item ${x===ALGO_CORRECT[i]?'correct':''}" data-a-item="${i}"><span>${i+1}</span><strong>${escapeHtml(x)}</strong><div><button type="button" data-up="${i}" ${i===0?'disabled':''}>↑ Naik</button><button type="button" data-down="${i}" ${i===st.order.length-1?'disabled':''}>↓ Turun</button></div></div>`).join('')}</div>${complete?'<div class="lx-success-banner">✓ Urutan algoritma sudah benar.</div>':''}</section>
        <button id="aFinishBtn" class="l2-check-all ${complete?'ready':''}" ${complete?'':'disabled'}>${done?'✓ Latihan selesai':complete?'✓ Selesai':`Posisi benar ${correctPositions} / 6`}</button>
      </main><aside class="l2-sidebar">${styledParticipant(6)}<section class="l2-side-card"><h4>Status urutan</h4><p>Setiap baris hijau sudah berada pada posisi yang tepat.</p><div id="aDetection"><b>${correctPositions} / 6</b><span>langkah sudah benar</span></div></section><section class="l2-quick-tip"><h4>Petunjuk cepat</h4><p>Pikirkan alur: mulai, masukkan data, periksa kondisi, keluarkan hasil, lalu selesai.</p><div>Mulai → Input → Kondisi → Hasil → Selesai</div></section></aside></div>`;

    const rerender=()=>{const scroll=panel.scrollTop;renderAlgorithm(panel);bindGuide();requestAnimationFrame(()=>panel.scrollTop=scroll);};
    panel.querySelectorAll('[data-up]').forEach(b=>b.addEventListener('click',()=>{const i=+b.dataset.up;[st.order[i-1],st.order[i]]=[st.order[i],st.order[i-1]];persistStudent();rerender();}));
    panel.querySelectorAll('[data-down]').forEach(b=>b.addEventListener('click',()=>{const i=+b.dataset.down;[st.order[i+1],st.order[i]]=[st.order[i],st.order[i+1]];persistStudent();rerender();}));
    const prev=panel.querySelector('[data-a-guide-prev]'),next=panel.querySelector('[data-a-guide-next]');
    if(prev)prev.addEventListener('click',()=>{st.guideSlide=Math.max(0,st.guideSlide-1);rerender();});
    if(next)next.addEventListener('click',()=>{st.guideSlide=Math.min(guides.length-1,st.guideSlide+1);rerender();});
    const finish=panel.querySelector('#aFinishBtn');if(finish)finish.addEventListener('click',async()=>{if(done)return;if(st.order.every((x,i)=>x===ALGO_CORRECT[i]))await completeExercise(6);});
  }

  function renderCoding(panel){
    const st=getExState(7,{values:{},guideSlide:0,activeIndex:null});
    st.values ||= {};
    st.guideSlide=Number.isInteger(st.guideSlide)?st.guideSlide:0;
    const correctCount=CODE_TASKS.filter((x,i)=>(st.values[i]||'').trim()===x).length;
    const complete=correctCount===CODE_TASKS.length;
    const done=!!currentUser.completedExercises[7];
    const guides=[
      {title:"1. Ketik kode sama persis",text:"Kode peka terhadap simbol, tanda petik, tanda kurung, dan titik koma. Salin struktur kode dengan teliti."},
      {title:"2. Perhatikan tanda petik",text:"Teks seperti Halo, Excel! harus berada di dalam tanda petik sesuai contoh."},
      {title:"3. Perhatikan kurung dan titik koma",text:"Pastikan kurung buka/tutup seimbang dan titik koma berada pada posisi yang benar."},
      {title:"4. Perhatikan huruf besar dan kecil",text:"console.log berbeda dengan Console.Log. Gunakan kapitalisasi sesuai contoh."},
      {title:"5. Selesaikan semua kode",text:"Setiap jawaban yang tepat mendapat indikator hijau. Setelah semua 5 benar, tombol Selesai akan aktif."}
    ];
    const g=guides[Math.max(0,Math.min(guides.length-1,st.guideSlide))];
    const mini=`<div class="lx-code-mini"><code>${escapeHtml(CODE_TASKS[Math.min(st.guideSlide,CODE_TASKS.length-1)])}</code><div><span>petik</span><span>kurung</span><span>titik koma</span></div></div>`;
    const cards=CODE_TASKS.map((code,i)=>{const v=st.values[i]||'',ok=v.trim()===code;return `<div class="lx-code-card ${v?(ok?'correct':'wrong'):''}" data-code-card="${i}"><div class="lx-card-head"><span>${i+1}</span><strong>Soal ${i+1}</strong></div><code>${escapeHtml(code)}</code><textarea data-code="${i}" spellcheck="false" placeholder="Ketik kode persis di sini">${escapeHtml(v)}</textarea><small data-code-status="${i}">${v?(ok?'✓ Benar':'✕ Belum sama persis'):''}</small></div>`;}).join('');
    panel.innerHTML=`${styledWindowHeader(7,"Coding","lx-theme-slate")}
      <div class="l2-layout"><main class="l2-main">
        <section class="l2-learning-row"><div class="l2-material-card"><h4>📖 &nbsp; Materi singkat</h4><p>Kode program harus ditulis dengan struktur yang tepat. Perhatikan <b>huruf besar/kecil</b>, <b>tanda petik</b>, <b>kurung</b>, dan <b>titik koma</b>.</p><div><code>console.log("Halo");</code><code>let nilai = 80;</code><code>if (nilai >= 75) ...</code></div></div><div class="l2-guide-card"><div class="l2-guide-head"><h4>☷ &nbsp; Petunjuk Pengerjaan</h4><span>${st.guideSlide+1}/${guides.length}</span></div><div class="l2-guide-slide"><h3>${g.title}</h3><p>${g.text}</p>${mini}</div><div class="l2-guide-nav"><button type="button" data-c-guide-prev ${st.guideSlide===0?'disabled':''}>‹ &nbsp; Sebelumnya</button><div>${guides.map((_,i)=>`<i class="${i===st.guideSlide?'active':''}"></i>`).join('')}</div><button type="button" data-c-guide-next ${st.guideSlide===guides.length-1?'disabled':''}>Berikutnya &nbsp; ›</button></div></div></section>
        <section class="l2-instruction-band">Ketik seluruh <b>5 contoh kode</b> sama persis. Jawaban akan diperiksa langsung saat Anda mengetik.</section>
        <section class="l2-section-card"><div class="l2-section-head"><div><h3>A. Praktik Coding Dasar</h3><p>Salin setiap baris kode dengan teliti.</p></div><span id="cCorrectCount">${correctCount}/5 benar</span></div><div class="lx-code-grid">${cards}</div></section>
        <button id="cFinishBtn" class="l2-check-all ${complete?'ready':''}" ${complete?'':'disabled'}>${done?'✓ Latihan selesai':complete?'✓ Selesai':`Benar ${correctCount} / 5`}</button>
      </main><aside class="l2-sidebar">${styledParticipant(7)}<section class="l2-side-card"><h4>Deteksi kode</h4><p>Klik kotak kode yang sedang dikerjakan.</p><div id="cDetection">${Number.isInteger(st.activeIndex)?`<b>Soal ${st.activeIndex+1}</b><span>${escapeHtml(st.values[st.activeIndex]||'Belum diisi')}</span>`:'Belum ada jawaban dipilih.'}</div></section><section class="l2-quick-tip"><h4>Petunjuk cepat</h4><p>Periksa tanda petik, kurung, titik koma, dan kapitalisasi sebelum pindah ke soal berikutnya.</p><div>console.log("Halo, Excel!");</div></section></aside></div>`;

    const updateDetection=i=>{st.activeIndex=i;const box=panel.querySelector('#cDetection');if(box)box.innerHTML=`<b>Soal ${i+1}</b><span>${escapeHtml(st.values[i]||'Belum diisi')}</span>`;};
    const refresh=()=>{const cnt=CODE_TASKS.filter((x,i)=>(st.values[i]||'').trim()===x).length;const count=panel.querySelector('#cCorrectCount');if(count)count.textContent=`${cnt}/5 benar`;const btn=panel.querySelector('#cFinishBtn');if(btn){btn.disabled=cnt!==5;btn.classList.toggle('ready',cnt===5);btn.textContent=done?'✓ Latihan selesai':cnt===5?'✓ Selesai':`Benar ${cnt} / 5`;}};
    panel.querySelectorAll('[data-code]').forEach(t=>{t.addEventListener('focus',()=>updateDetection(+t.dataset.code));t.addEventListener('input',()=>{const i=+t.dataset.code,ok=t.value.trim()===CODE_TASKS[i];st.values[i]=t.value;const card=panel.querySelector(`[data-code-card="${i}"]`),status=panel.querySelector(`[data-code-status="${i}"]`);if(card){card.classList.toggle('correct',ok);card.classList.toggle('wrong',!!t.value&&!ok);}if(status)status.textContent=t.value?(ok?'✓ Benar':'✕ Belum sama persis'):'';updateDetection(i);refresh();persistStudent();});});
    const rerender=()=>{const scroll=panel.scrollTop;renderCoding(panel);bindGuide();requestAnimationFrame(()=>panel.scrollTop=scroll);};
    const prev=panel.querySelector('[data-c-guide-prev]'),next=panel.querySelector('[data-c-guide-next]');if(prev)prev.addEventListener('click',()=>{st.guideSlide=Math.max(0,st.guideSlide-1);rerender();});if(next)next.addEventListener('click',()=>{st.guideSlide=Math.min(guides.length-1,st.guideSlide+1);rerender();});
    const finish=panel.querySelector('#cFinishBtn');if(finish)finish.addEventListener('click',async()=>{if(done)return;if(CODE_TASKS.every((x,i)=>(st.values[i]||'').trim()===x))await completeExercise(7);});
  }

  function refreshL1InlineGuide(){
    const box=$(".l1-inline-guide");
    if(!box) return;
    const slides=l1InlineGuideSlides();
    l1InlineGuideIndex=Math.max(0,Math.min(l1InlineGuideIndex,slides.length-1));
    const body=$("#l1InlineGuideBody");
    if(body) body.innerHTML=slides[l1InlineGuideIndex];
    const counter=box.querySelector(".l1-inline-guide-head small");
    if(counter) counter.textContent=`Slide ${l1InlineGuideIndex+1} / ${slides.length}`;
    const prev=box.querySelector("[data-l1-guide-prev]");
    const next=box.querySelector("[data-l1-guide-next]");
    if(prev) prev.disabled=l1InlineGuideIndex===0;
    if(next) next.disabled=l1InlineGuideIndex===slides.length-1;
    box.querySelectorAll(".l1-inline-guide-nav i").forEach((dot,idx)=>dot.classList.toggle("active",idx===l1InlineGuideIndex));
  }

  function bindGuide(){
    $$("[data-close-exercise]").forEach(close=>close.addEventListener("click",closeExerciseWindow));
    $$("[data-exit-student]").forEach(btn=>btn.addEventListener("click",exitStudentSession));
    const b=$("[data-guide]");
    if(b) b.addEventListener("click",()=>openGuide(+b.dataset.guide));
    const prev=$("[data-l1-guide-prev]");
    const next=$("[data-l1-guide-next]");
    if(prev) prev.addEventListener("click",()=>{if(l1InlineGuideIndex>0){l1InlineGuideIndex--;refreshL1InlineGuide();}});
    if(next) next.addEventListener("click",()=>{if(l1InlineGuideIndex<l1InlineGuideSlides().length-1){l1InlineGuideIndex++;refreshL1InlineGuide();}});
  }

  function openGuide(i){
    guideSlides=guideFor(i);
    guideIndex=0;
    $("#guideTitle").textContent=`Panduan Latihan ${i+1}`;
    $("#guideModal").classList.remove("hidden");
    renderGuideSlide();
  }

  function guideFor(i){
    const excelSim=`<div class="excel-sim">
      <div class="excel-ribbon">Home &nbsp;&nbsp; Insert &nbsp;&nbsp; Page Layout &nbsp;&nbsp; Formulas &nbsp;&nbsp; Data</div>
      <div class="formula-bar"><div>G2</div><div>fx</div><div>=SUM(B2:F2)</div></div>
      <div class="mini-sheet">
        <div class="head"></div><div class="head">A</div><div class="head">B</div><div class="head">C</div><div class="head">D</div><div class="head">E</div><div class="head">F</div>
        <div class="head">2</div><div>Beras</div><div>5</div><div>4</div><div>6</div><div>3</div><div class="focus">6</div>
      </div></div>`;
    const keyboardCaps=`<div class="keyboard"><div class="key-row"><div class="key">A</div><div class="key">B</div><div class="key">C</div><div class="key">D</div><div class="key">E</div></div><div class="key-row"><div class="key wide highlight">Caps Lock</div><div class="key">S</div><div class="key">U</div><div class="key">M</div></div></div>`;
    const keyboardShift=`<div class="keyboard"><div class="key-row"><div class="key">4<br>$</div><div class="key">8<br>*</div><div class="key">9<br>(</div><div class="key">0<br>)</div></div><div class="key-row"><div class="key wide highlight">Shift</div><div class="key highlight">4<br>$</div><div class="key">Enter</div></div></div>`;
    if(i===0){
      const l1Sim=`<div class="l1-guide-sheet">
        <div></div><b>A</b><b>B</b><b>C</b><b>D</b>
        <b>1</b><span>18</span><span>44</span><span>91</span><span>27</span>
        <b>2</b><span>35</span><span>76</span><span>14</span><span class="focus">62</span>
        <b>3</b><span>83</span><span>11</span><span>49</span><span>25</span>
      </div>`;
      return [
        `<div class="guide-slide"><h4>1. Pahami alamat sel</h4><p>Alamat sel terdiri dari <b>huruf kolom</b> dan <b>nomor baris</b>. Contoh: <b>D2</b> berarti kolom D dan baris 2.</p>${l1Sim}</div>`,
        `<div class="guide-slide"><h4>2. Cari angka yang ditanyakan</h4><p>Misalnya soal berbunyi <b>“Nilai 62 berada pada sel mana?”</b>. Cari angka 62 pada tabel 20 × 20.</p>${l1Sim}</div>`,
        `<div class="guide-slide"><h4>3. Baca kolom lalu baris</h4><p>Pada contoh, angka <b>62</b> berada di kolom <b>D</b> dan baris <b>2</b>, sehingga jawaban yang diketik adalah <b>D2</b>. Tidak perlu menulis tanda = atau rumus.</p><div class="prompt-banner"><span>Jawaban contoh</span><strong>D2</strong></div></div>`,
        `<div class="guide-slide"><h4>4. Periksa dan selesaikan</h4><p>Isi semua 10 jawaban, lalu klik <b>Periksa 10 jawaban</b>. Jawaban salah ditandai merah. Setelah semua jawaban benar, tombol berubah menjadi <b>✓ Selesai</b>. Klik tombol itu untuk mengirim hasil ke dashboard guru.</p></div>`
      ];
    }
    if(i===1) return [
      `<div class="guide-slide"><h4>1. Klik sel hasil</h4><p>Pada Excel, hasil SUM atau AVERAGE diketik pada sel tujuan, misalnya G2 atau H2.</p>${excelSim}</div>`,
      `<div class="guide-slide"><h4>2. Mulai rumus dengan =</h4><p>Ketik <code>=SUM(B2:F2)</code>. Tanda titik dua berarti rentang dari B2 sampai F2.</p><div class="formula-bar"><div>G2</div><div>fx</div><div>=SUM(B2:F2)</div></div></div>`,
      `<div class="guide-slide"><h4>3. Tekan Enter</h4><p>Setelah Enter, rumus dihitung. Pada contoh B2:F2 = 5, 4, 6, 3, 6 sehingga hasilnya <b>24</b>.</p><div class="prompt-banner"><span>Hasil</span><strong>24</strong></div></div>`,
      `<div class="guide-slide"><h4>4. AVERAGE</h4><p>Untuk rata-rata, gunakan <code>=AVERAGE(B2:F2)</code>. Prinsip penulisan rentangnya sama seperti SUM.</p>${excelSim}</div>`
    ];
    if(i===2) return [
      `<div class="guide-slide"><h4>1. Ketik sama persis</h4><p>Latihan ini memeriksa kapitalisasi, spasi, simbol, dan tanda baca. <b>SUM</b> berbeda dari <b>sum</b>.</p>${excelSim}</div>`,
      `<div class="guide-slide"><h4>2. Caps Lock untuk huruf besar</h4><p>Tekan <b>Caps Lock</b> untuk mengaktifkan huruf kapital terus-menerus, kemudian tekan lagi untuk mematikannya.</p>${keyboardCaps}</div>`,
      `<div class="guide-slide"><h4>3. Shift untuk kapital sementara dan simbol</h4><p>Tahan <b>Shift</b> sambil menekan huruf untuk satu huruf kapital. Untuk simbol seperti <b>$</b>, tahan Shift lalu tekan tombol angka yang memuat simbol tersebut.</p>${keyboardShift}</div>`,
      `<div class="guide-slide"><h4>4. Menulis link</h4><p>Link harus ditulis lengkap, termasuk <code>https://</code>, titik, dan garis miring bila ada. Jangan menambahkan spasi.</p><div class="prompt-banner"><span>Contoh</span><strong style="font-size:15px">https://chatgpt.com</strong></div></div>`
    ];
    return [
      `<div class="guide-slide"><h4>1. Baca contoh dan data</h4><p>Perhatikan posisi kolom, baris, tanda sama dengan, tanda kurung, serta rentang data sebelum mengetik.</p>${excelSim}</div>`,
      `<div class="guide-slide"><h4>2. Ketik persis lalu Enter</h4><p>Untuk latihan rumus, tekan Enter setelah selesai. Untuk algoritma dan coding, susun atau ketik sesuai contoh sampai indikator benar muncul.</p>${keyboardShift}</div>`
    ];
  }

  function renderGuideSlide(){
    $("#guideContent").innerHTML=guideSlides[guideIndex]||"";
    $("#guideCounter").textContent=`${guideIndex+1} / ${guideSlides.length}`;
    $("#prevGuideBtn").disabled=guideIndex===0;
    $("#nextGuideBtn").textContent=guideIndex===guideSlides.length-1?"Selesai":"Berikutnya →";
  }

  function openTeacherExerciseDemo(index){
    const url=new URL(window.location.href);
    url.search="";
    url.hash="";
    url.searchParams.set("teacherDemo","1");
    url.searchParams.set("exercise",String(index+1));
    const popup=window.open(url.toString(),"_blank");
    if(!popup) toast("Browser memblokir jendela demonstrasi. Izinkan pop-up untuk situs ini.");
  }

  function enterTeacherDemoFromUrl(){
    const params=new URLSearchParams(window.location.search);
    if(params.get("teacherDemo")!=="1") return false;

    let index=Number(params.get("exercise")||1)-1;
    if(!Number.isInteger(index) || index<0 || index>7) index=0;

    teacherDemoMode=true;
    settings.unlocked=Array(8).fill(true);
    settings.studentExitLocked=false;
    syncExitLockState();

    currentUser=makeStudentRecord("DEMO","Demonstrasi Guru");
    currentUser.sessionId=settings.sessionId || "teacher-demo";
    currentUser.startedAt=now();
    currentUser.exerciseStartedAt[index]=now();
    currentExercise=index;

    showView("#studentView");
    $("#studentIdentity").textContent="Demonstrasi Guru";
    $("#studentStatusLine").textContent="Mode demonstrasi guru · progres dan nilai tidak disimpan ke dashboard siswa.";
    $("#studentExitBtn").disabled=false;
    $("#studentExitBtn").textContent="Tutup demonstrasi";

    renderStudent();
    startTimer();
    openExerciseWindow(index);
    return true;
  }

  function teacherLogin(){
    const ok=$("#teacherUser").value===TEACHER.username && $("#teacherPass").value===TEACHER.password;
    $("#teacherLoginError").classList.toggle("hidden",ok);
    if(!ok)return;
    showView("#teacherView");
    renderTeacher();
    clearInterval(teacherRefreshInterval);
    teacherRefreshInterval=setInterval(()=>{
      if($("#teacherView").classList.contains("active")) renderTeacher();
    },8000);
  }

  function getAllTeacherRecords(){
    const records=[];
    for(const [cls,names] of Object.entries(ROSTER)){
      for(const name of names){
        const activeSession=settings.sessionId || "per-exercise-v2";
        let rec=normalizeStudentRecord(getStudent(cls,name) || makeStudentRecord(cls,name));
        if(rec.sessionId !== activeSession){
          rec=makeFreshRecordPreservingScores(cls,name,rec,activeSession);
        }
        records.push(rec);
      }
    }
    return records;
  }

  function renderTeacher(){
    const records=getAllTeacherRecords();
    const classRecords=records.filter(r=>r.className===teacherSelectedClass);
    const completed=classRecords.filter(r=>r.completedAt).length;
    const started=classRecords.filter(r=>r.startedAt).length;
    const unfinished=classRecords.length-completed;
    const savedStudentAverages=classRecords.map(r=>{
      const vals=Array.from({length:8},(_,i)=>{
        const v=r.exerciseScores?.[i];
        return hasFiniteNumber(v)?Number(v):null;
      }).filter(v=>v!==null);
      return vals.length ? vals.reduce((a,b)=>a+b,0)/vals.length : null;
    }).filter(v=>v!==null);
    const averageScore=savedStudentAverages.length
      ? Math.round(savedStudentAverages.reduce((a,b)=>a+b,0)/savedStudentAverages.length)
      : 0;

    $("#teacherConnectionText").textContent=realtime?"Terhubung":"Mode lokal";
    $("#teacherConnectionBadge").classList.toggle("offline",!realtime);
    const accessNote=$(".teacher-access-note");
    if(accessNote) accessNote.innerHTML=realtime
      ? "Perubahan tersambung ke ruang siswa dan diperbarui otomatis."
      : "Mode lokal: perubahan hanya berlaku pada perangkat ini.";

    const demoGrid=$("#teacherDemoGrid");
    if(demoGrid){
      demoGrid.innerHTML=EXERCISES.map((e,i)=>`
        <button type="button" class="teacher-demo-card" data-teacher-demo="${i}">
          <span class="teacher-demo-number">${String(i+1).padStart(2,"0")}</span>
          <span class="teacher-demo-copy">
            <small>Demonstrasi Latihan ${i+1}</small>
            <strong>${escapeHtml(e[0])}</strong>
          </span>
          <span class="teacher-demo-open">↗ Buka</span>
        </button>`).join("");
      $$("[data-teacher-demo]").forEach(btn=>btn.addEventListener("click",()=>{
        openTeacherExerciseDemo(Number(btn.dataset.teacherDemo));
      }));
    }

    $("#lockControls").innerHTML=EXERCISES.map((e,i)=>{
      const open=!!settings.unlocked[i];
      return `<button class="teacher-access-card ${open?"open":"closed"}" data-preview-lock="${i}">
        <span class="teacher-access-copy">
          <small>Latihan ${i+1}</small>
          <strong>${escapeHtml(e[0])}</strong>
          <em>${open?"🔓 Dibuka":"🔒 Dikunci"}</em>
        </span>
        <span class="teacher-switch ${open?"on":""}"><i></i></span>
      </button>`;
    }).join("");
    $$("[data-preview-lock]").forEach(b=>b.addEventListener("click",async()=>{
      const i=+b.dataset.previewLock;
      const next=!settings.unlocked[i];
      settings.unlocked[i]=next;
      saveLocal();
      renderTeacher();

      if(!realtime){
        toast(`Latihan ${i+1} ${next?"dibuka":"dikunci"} hanya di perangkat guru (Firebase belum terhubung).`);
        return;
      }

      try{
        await db.ref(`kelasExcel/settings/unlocked/${i}`).set(next);
        toast(`Latihan ${i+1} ${next?"dibuka":"dikunci"} untuk semua siswa.`);
      }catch(err){
        console.error("Gagal mengubah akses latihan:",err);
        toast("Gagal mengirim status ke siswa. Periksa Firebase Rules.");
        const snap=await db.ref("kelasExcel/settings/unlocked").once("value").catch(()=>null);
        if(snap) settings.unlocked=normalizeUnlocked(snap.val());
        renderTeacher();
      }
    }));

    $("#teacherClassTabs").innerHTML=Object.entries(ROSTER).map(([cls,names])=>`
      <button class="teacher-class-tab ${teacherSelectedClass===cls?"active":""}" data-teacher-class="${cls}">
        <span>${cls}</span><b>${names.length}</b>
      </button>`).join("");
    $$("[data-teacher-class]").forEach(b=>b.addEventListener("click",()=>{
      const nextClass=b.dataset.teacherClass;
      if(!nextClass || nextClass===teacherSelectedClass)return;

      // Respons visual langsung pada tab kelas.
      $$("[data-teacher-class]").forEach(btn=>{
        btn.classList.toggle("active",btn.dataset.teacherClass===nextClass);
      });

      const applyClass=()=>{
        teacherSelectedClass=nextClass;
        renderTeacher();
      };

      // Chrome/Edge modern: animasikan hanya area dashboard yang berubah.
      if(document.startViewTransition){
        document.documentElement.classList.add("teacher-class-v24-transition");
        const transition=document.startViewTransition(applyClass);
        transition.finished.finally(()=>{
          document.documentElement.classList.remove("teacher-class-v24-transition");
        });
        return;
      }

      // Fallback untuk browser lain.
      const oldTargets=[
        $(".teacher-summary-reference"),
        $(".teacher-recap-card"),
        $("#algorithmTeacherMonitor")
      ].filter(Boolean);

      oldTargets.forEach(el=>el.classList.add("teacher-class-v24-fade-out"));

      setTimeout(()=>{
        applyClass();
        requestAnimationFrame(()=>{
          const newTargets=[
            $(".teacher-summary-reference"),
            $(".teacher-recap-card"),
            $("#algorithmTeacherMonitor")
          ].filter(Boolean);

          newTargets.forEach(el=>{
            el.classList.add("teacher-class-v24-fade-in");
            setTimeout(()=>el.classList.remove("teacher-class-v24-fade-in"),240);
          });
        });
      },80);
    }));

    const isProgressMode=teacherRecapMode==="progress";
    $("#teacherClassTitle").textContent=isProgressMode
      ? `Rekap Progress Kelas ${teacherSelectedClass} · Latihan 1–8`
      : `Rekap Nilai Kelas ${teacherSelectedClass} · Latihan 1–8`;

    const recapDesc=$("#teacherRecapDescription");
    if(recapDesc) recapDesc.textContent=isProgressMode
      ? "Tanda centang hijau menunjukkan latihan yang sudah selesai · diperbarui otomatis setiap 8 detik"
      : "Nilai terakhir setiap latihan tetap tersimpan antar-materi · kolom Nilai adalah rata-rata semua nilai yang tersimpan";

    const metricHeader=$("#teacherMetricHeader");
    if(metricHeader) metricHeader.textContent=isProgressMode?"Jumlah":"Nilai";

    $$("[data-teacher-recap-mode]").forEach(btn=>{
      btn.classList.toggle("active",btn.dataset.teacherRecapMode===teacherRecapMode);
    });

    $("#totalStudents").textContent=classRecords.length;
    $("#finishedStudents").textContent=completed;
    $("#notStartedStudents").textContent=unfinished;
    $("#averageScore").textContent=averageScore;

    const screenLockBtn=$("#screenLockBtn");
    if(screenLockBtn){
      const locked=!!settings.studentExitLocked;
      screenLockBtn.classList.toggle("locked",locked);
      screenLockBtn.classList.toggle("unlocked",!locked);
      screenLockBtn.setAttribute("aria-pressed",String(locked));
      screenLockBtn.textContent=locked ? "🔒 Kunci layar aktif" : "🔓 Kunci layar dibuka";
      screenLockBtn.title=locked
        ? "Klik untuk membuka tombol Keluar di halaman siswa."
        : "Klik untuk mengunci kembali tombol Keluar di halaman siswa.";
    }

    $("#teacherTableBody").innerHTML=classRecords.map(r=>{
      const done=r.completedExercises?.filter(Boolean).length||0;
      const progress=Math.round(done/8*100);

      const perExerciseScores=Array.from({length:8},(_,i)=>{
        const saved=r.exerciseScores?.[i];
        if(hasFiniteNumber(saved)){
          return Math.max(40,Math.min(100,Math.round(Number(saved))));
        }
        const sec=r.exerciseCompletedSeconds?.[i];
        if(r.completedExercises?.[i] && hasFiniteNumber(sec)){
          return liveScoreFromElapsed(sec);
        }
        return null;
      });

      const completedScoreValues=perExerciseScores.filter(v=>v!==null);
      const average=completedScoreValues.length
        ? Math.round(completedScoreValues.reduce((a,b)=>a+b,0)/completedScoreValues.length)
        : null;

      const exerciseCells=perExerciseScores.map((score,i)=>{
        const completed=!!r.completedExercises?.[i];

        if(teacherRecapMode==="nilai"){
          if(score===null) return `<td class="exercise-score-cell">—</td>`;
          return `<td class="exercise-score-cell">
            <span class="teacher-exercise-score" title="Nilai terakhir Latihan ${i+1}: ${score}">${score}</span>
          </td>`;
        }

        if(!completed) return `<td class="exercise-check">—</td>`;
        const sec=r.exerciseCompletedSeconds?.[i];
        const title=hasFiniteNumber(sec)
          ? `Latihan ${i+1} selesai dalam ${formatTime(Number(sec))}`
          : `Latihan ${i+1} selesai`;
        return `<td class="exercise-check">
          <span class="teacher-progress-check" title="${title}">✓</span>
        </td>`;
      }).join("");

      const metricValue=teacherRecapMode==="progress"
        ? `<span class="teacher-completed-count"><b>${done}</b><small>/ 8</small></span>`
        : (average===null?"—":`<span class="teacher-average-score">${average}</span>`);

      return `<tr>
        <td class="student-name-cell">${escapeHtml(r.name)}</td>
        <td class="class-cell">${r.className}</td>
        ${exerciseCells}
        <td>
          ${r.startedAt?`<div class="teacher-progress-cell"><span><i style="width:${progress}%"></i></span><b>${progress}%</b></div>`:`<span class="not-started-text">Belum mulai</span>`}
        </td>
        <td class="score-cell">${metricValue}</td>
        <td><button class="reset-btn" data-reset="${escapeHtml(progressKey(r.className,r.name))}" ${(!r.startedAt && !r.exerciseScores?.some(hasFiniteNumber))?"disabled":""}>↶ Reset nilai</button></td>
      </tr>`;
    }).join("");
    $$("[data-reset]").forEach(b=>b.addEventListener("click",()=>resetStudent(b.dataset.reset)));
  }

  function startNewMaterial(){
    if(!confirm("Mulai materi baru? Nilai, progres, jawaban, timer, dan status latihan yang sudah dikerjakan akan tetap tersimpan.")) return;

    // Hanya memulai kembali status materi.
    // Data kelasExcel/progress TIDAK disentuh.
    // sessionId juga TIDAK diganti.
    settings.studentExitLocked=true;
    syncExitLockState();
    settings.unlocked=[true,false,false,false,false,false,false,false];

    persistSettings().catch(()=>{});

    renderTeacher();
    toast("Materi baru dimulai. Nilai dan progres siswa tetap tersimpan.");
  }

  function formatTime(sec){
    const m=Math.floor(sec/60),s=sec%60;return `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
  }

  function resetStudent(logical){
    const [cls,...rest]=logical.split("::"),name=rest.join("::");
    if(!confirm(`Reset nilai ${name} (${cls})? Nilai seluruh Latihan 1–8 dan progres aktif siswa ini akan dihapus.`))return;

    const rec=makeStudentRecord(cls,name);
    rec.sessionId=settings.sessionId || "per-exercise-v2";
    rec.progressVersion=CURRENT_PROGRESS_VERSION;

    // Bersihkan kemungkinan key logical maupun key aman.
    delete allProgress[logical];
    allProgress[safeId(logical)]=rec;
    saveLocal();

    if(realtime){
      db.ref(`kelasExcel/progress/${safeId(logical)}`).set(rec);
    }

    renderTeacher();
    toast("Nilai dan progres siswa berhasil direset.");
  }

  function renderReactive(source="all"){
    if($("#teacherView").classList.contains("active")) renderTeacher();
    if($("#studentView").classList.contains("active")&&currentUser){
      const activeSession=settings.sessionId || "per-exercise-v2";
      if(currentUser.sessionId!==activeSession){
        const cls=currentUser.className,name=currentUser.name;
        currentUser=makeFreshRecordPreservingScores(cls,name,currentUser,activeSession);
        setStudent(currentUser);
        saveLocal();
        const opened=$("#exercisePanel");
        if(opened){
          opened.classList.add("hidden");
          opened.dataset.opened="0";
          opened.innerHTML="";
        }
      }
      const panel=$("#exercisePanel");
      const exerciseOpen=panel?.dataset.opened==="1";

      // Saat siswa sedang mengetik di jendela latihan, Firebase akan
      // memantulkan progres yang baru disimpan. Jangan render ulang seluruh
      // jendela karena itu menghilangkan fokus input dan menggeser scroll.
      if(source==="progress" && exerciseOpen) return;

      const synced=getStudent(currentUser.className,currentUser.name);
      if(synced && synced.sessionId===activeSession){
        currentUser=synced;
      }else if(!synced || synced.sessionId!==activeSession){
        const cls=currentUser.className,name=currentUser.name;
        currentUser=makeFreshRecordPreservingScores(cls,name,synced||currentUser,activeSession);
        setStudent(currentUser);
        saveLocal();
      }
      renderStudent();
    }
  }

  function toast(msg){
    const t=$("#toast");t.textContent=msg;t.classList.remove("hidden");
    clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.add("hidden"),2200);
  }

  function bindGlobal(){
    $("#studentTab").addEventListener("click",()=>switchLoginMode("student"));
    $("#teacherTab").addEventListener("click",()=>switchLoginMode("teacher"));
    $("#studentStartBtn").addEventListener("click",startStudent);
    $("#teacherLoginBtn").addEventListener("click",teacherLogin);
    $("#teacherPass").addEventListener("keydown",e=>{if(e.key==="Enter")teacherLogin()});
    $("#teacherExitBtn").addEventListener("click",()=>{clearInterval(teacherRefreshInterval);showView("#homeView");switchLoginMode("teacher")});
    $("#studentExitBtn").addEventListener("click",exitStudentSession);
    $("#screenLockBtn").addEventListener("click",async()=>{
      const locked=!!settings.studentExitLocked;
      const confirmText=locked
        ? "Buka kunci layar siswa? Setelah ini tombol Keluar di halaman siswa akan aktif."
        : "Kunci layar siswa? Setelah ini tombol Keluar di halaman siswa akan dinonaktifkan.";
      if(!confirm(confirmText)) return;
      settings.studentExitLocked=!locked;
      syncExitLockState();
      try{
        await persistSettings();
        renderTeacher();
        if($("#studentView").classList.contains("active") && currentUser){
          renderStudent();
        }
        toast(settings.studentExitLocked
          ? "Tombol keluar siswa berhasil dikunci."
          : "Tombol keluar siswa berhasil dibuka.");
      }catch(err){
        renderTeacher();
      }
    });
    $$("[data-teacher-recap-mode]").forEach(btn=>btn.addEventListener("click",()=>{
      teacherRecapMode=btn.dataset.teacherRecapMode==="nilai"?"nilai":"progress";
      renderTeacher();
    }));

    document.addEventListener("fullscreenchange",()=>{
      const studentActive=$("#studentView").classList.contains("active")&&currentUser;
      // V34: selama masih berada di halaman siswa, fullscreen tetap wajib.
      // Keluar resmi melalui tombol Keluar akan menghapus currentUser terlebih dahulu.
      $("#fullscreenGuard").classList.toggle("hidden",!(studentActive&&!document.fullscreenElement));
    });
    $("#returnFullscreenBtn").addEventListener("click",enterFullscreen);

    $("#closeGuideBtn").addEventListener("click",()=>$("#guideModal").classList.add("hidden"));
    $("#prevGuideBtn").addEventListener("click",()=>{if(guideIndex>0){guideIndex--;renderGuideSlide()}});
    $("#nextGuideBtn").addEventListener("click",()=>{
      if(guideIndex<guideSlides.length-1){guideIndex++;renderGuideSlide()}
      else $("#guideModal").classList.add("hidden");
    });
    $("#guideModal").addEventListener("click",e=>{if(e.target===$("#guideModal"))$("#guideModal").classList.add("hidden")});

    window.addEventListener("beforeunload",e=>{
      if($("#studentView").classList.contains("active")&&currentUser&&settings.studentExitLocked){
        e.preventDefault();e.returnValue="";
      }
    });
  }

  function bootstrap(){
    loadLocal();
    renderExerciseStrip();
    initRosterSelectors();
    bindGlobal();

    if(enterTeacherDemoFromUrl()) return;

    initFirebase();
    switchLoginMode("student");
  }

  document.addEventListener("DOMContentLoaded",bootstrap);
})();

/* ====================== ALGORITHM MODULES ===================== */
/* ============================================================
   ALGORITM.JS — V21 BUNDLED
   Gabungan:
   1. Algorithm Race V12 loader
   2. Tim dinamis V11
   3. Dashboard Algorithm Race V12

   Catatan:
   - File ini menjadi SATU-SATUNYA file tambahan algoritma
     yang dipanggil dari index.html.
   - source algorithm-team-game.js ditanam langsung di bundle V21.
   - tidak ada lagi file algorithm-team-game.js terpisah saat runtime.
   ============================================================ */

(() => {
  "use strict";

  const VERSION = "algorithm-race-v20";
  const BASE_ALGORITHM_SOURCE = "(() => {\n  \"use strict\";\n\n\n  const GAME_VERSION = \"team-v10-teacher-team-manager\";\n\n  function makeScenario(id,title,goal,phases,core,detail,advanced){\n    if(core.length!==16 || detail.length!==4 || advanced.length!==4){\n      throw new Error(`Bank algoritma ${id} harus memiliki 16 langkah inti + 4 detail + 4 lanjutan.`);\n    }\n    const steps=[];\n    core.forEach((t,i)=>{\n      steps.push({l:0,t});\n      if(i===2) steps.push({l:1,t:detail[0]});\n      if(i===4) steps.push({l:2,t:advanced[0]});\n      if(i===6) steps.push({l:1,t:detail[1]});\n      if(i===8) steps.push({l:2,t:advanced[1]});\n      if(i===10) steps.push({l:1,t:detail[2]});\n      if(i===12) steps.push({l:2,t:advanced[2]});\n      if(i===14) steps.push({l:1,t:detail[3]});\n      if(i===15) steps.push({l:2,t:advanced[3]});\n    });\n    return {id,title,goal,phases,steps};\n  }\n\n  function portalScenario(id,title,p){\n    return makeScenario(id,title,p.goal,\n      [\"membuka portal\",\"masuk akun\",\"membuka fitur\",\"memproses data\",\"memastikan hasil\"],\n      [\n        \"Buka browser\",\n        `Masukkan alamat ${p.portal}`,\n        `Buka halaman ${p.entry}`,\n        \"Masukkan username akun sekolah\",\n        \"Masukkan password\",\n        \"Klik tombol Login\",\n        `Buka menu ${p.menu}`,\n        `Pilih ${p.item}`,\n        `Baca petunjuk ${p.task}`,\n        `Klik ${p.action}`,\n        p.resource,\n        p.confirm,\n        `Tunggu ${p.process}`,\n        `Klik ${p.finalAction}`,\n        `Buka ${p.status}`,\n        `Pastikan ${p.success}`\n      ],\n      [\n        \"Pastikan perangkat terhubung ke internet sebelum melanjutkan\",\n        \"Pastikan akun yang digunakan adalah akun milik sendiri\",\n        \"Periksa kembali data atau file yang dipilih\",\n        \"Baca ringkasan tindakan sebelum menyelesaikan proses\"\n      ],\n      [\n        \"Tunggu halaman selesai dimuat sebelum memasukkan data\",\n        \"Periksa alamat situs agar tidak masuk ke halaman palsu\",\n        \"Jangan menutup tab ketika proses masih berjalan\",\n        \"Logout jika portal digunakan pada komputer bersama\"\n      ]\n    );\n  }\n\n  function documentScenario(id,title,p){\n    return makeScenario(id,title,p.goal,\n      [\"membuka aplikasi\",\"menyiapkan isi\",\"memformat dokumen\",\"menjalankan perintah\",\"memeriksa hasil\"],\n      [\n        \"Nyalakan komputer\",\n        `Buka ${p.app}`,\n        p.open,\n        p.titleStep,\n        p.contentStep,\n        p.format1,\n        p.format2,\n        p.insertStep,\n        p.reviewStep,\n        p.layoutStep,\n        p.menuStep,\n        p.optionStep,\n        p.previewStep,\n        p.executeStep,\n        p.waitStep,\n        p.verifyStep\n      ],\n      [\n        \"Pastikan file yang dibuka adalah file yang benar\",\n        \"Simpan perubahan sementara sebelum melanjutkan\",\n        \"Periksa kembali pengaturan utama yang dipilih\",\n        \"Pastikan hasil akhir sesuai tujuan tugas\"\n      ],\n      [\n        \"Tunggu aplikasi selesai dimuat\",\n        \"Gunakan Undo jika perubahan format keliru\",\n        \"Periksa nama dan lokasi file keluaran\",\n        \"Tutup aplikasi setelah pekerjaan selesai dan tersimpan\"\n      ]\n    );\n  }\n\n  function fileScenario(id,title,p){\n    return makeScenario(id,title,p.goal,\n      [\"membuka lokasi file\",\"memilih sumber\",\"menentukan tujuan\",\"memproses file\",\"memastikan hasil\"],\n      [\n        \"Nyalakan komputer\",\n        \"Buka File Explorer\",\n        p.sourceOpen,\n        p.sourceCheck,\n        p.select,\n        p.command,\n        p.destinationOpen,\n        p.destinationPrepare,\n        p.execute,\n        p.wait,\n        p.verifyCount,\n        p.verifyContent,\n        p.cleanup1,\n        p.cleanup2,\n        p.finalCheck,\n        p.finish\n      ],\n      [\n        \"Periksa kapasitas penyimpanan sebelum memproses file\",\n        \"Pastikan nama folder tujuan mudah dikenali\",\n        \"Jangan membatalkan proses saat file sedang diproses\",\n        \"Bandingkan hasil dengan sumber setelah proses selesai\"\n      ],\n      [\n        \"Urutkan tampilan file agar sumber lebih mudah ditemukan\",\n        \"Periksa ekstensi file sebelum menjalankan perintah\",\n        \"Buka satu file contoh untuk memastikan hasil dapat digunakan\",\n        \"Tutup File Explorer setelah pekerjaan selesai\"\n      ]\n    );\n  }\n\n  function communicationScenario(id,title,p){\n    return makeScenario(id,title,p.goal,\n      [\"membuka layanan\",\"menentukan penerima\",\"menulis informasi\",\"menambahkan kelengkapan\",\"mengirim dan memeriksa\"],\n      [\n        \"Buka browser atau aplikasi komunikasi\",\n        `Buka ${p.service}`,\n        p.login,\n        p.start,\n        p.recipient,\n        p.subject,\n        p.body,\n        p.extraOpen,\n        p.extraSelect,\n        p.extraWait,\n        p.reviewRecipient,\n        p.reviewContent,\n        p.send,\n        p.wait,\n        p.verify,\n        p.finish\n      ],\n      [\n        \"Pastikan koneksi internet stabil\",\n        \"Periksa kembali identitas penerima\",\n        \"Pastikan lampiran atau informasi tambahan sudah benar\",\n        \"Baca ulang pesan sebelum dikirim\"\n      ],\n      [\n        \"Pastikan alamat layanan komunikasi benar\",\n        \"Hindari membagikan informasi pribadi yang tidak diperlukan\",\n        \"Tunggu semua lampiran selesai diproses\",\n        \"Logout jika menggunakan perangkat bersama\"\n      ]\n    );\n  }\n\n  function securityScenario(id,title,p){\n    return makeScenario(id,title,p.goal,\n      [\"mengenali situasi\",\"memeriksa bukti\",\"mengamankan akun\",\"melakukan tindakan\",\"memastikan keamanan\"],\n      [\n        p.start,\n        p.observe,\n        p.source,\n        p.check1,\n        p.check2,\n        p.openOfficial,\n        p.loginOfficial,\n        p.securityMenu,\n        p.action1,\n        p.action2,\n        p.confirm,\n        p.review,\n        p.report,\n        p.save,\n        p.verify,\n        p.finish\n      ],\n      [\n        \"Catat informasi penting tanpa menyebarkan data pribadi\",\n        \"Gunakan situs atau aplikasi resmi untuk melakukan pemeriksaan\",\n        \"Periksa kembali perubahan keamanan sebelum disimpan\",\n        \"Beritahu guru atau pengelola jika menemukan hal mencurigakan\"\n      ],\n      [\n        \"Jangan mengklik tautan mencurigakan selama pemeriksaan\",\n        \"Jangan pernah membagikan password atau kode OTP\",\n        \"Keluar dari sesi lain jika akun diduga pernah diakses orang lain\",\n        \"Simpan bukti seperlunya untuk pelaporan\"\n      ]\n    );\n  }\n\n  function codeScenario(id,title,p){\n    return makeScenario(id,title,p.goal,\n      [\"menyiapkan proyek\",\"menulis instruksi\",\"menjalankan program\",\"memperbaiki kesalahan\",\"menyimpan hasil\"],\n      [\n        `Buka ${p.app}`,\n        p.newProject,\n        p.nameProject,\n        p.prepare,\n        p.step1,\n        p.step2,\n        p.step3,\n        p.step4,\n        p.run,\n        p.observe,\n        p.findBug,\n        p.fixBug,\n        p.runAgain,\n        p.verify,\n        p.save,\n        p.finish\n      ],\n      [\n        \"Pastikan nama variabel, blok, atau elemen ditulis konsisten\",\n        \"Periksa urutan instruksi sebelum program dijalankan\",\n        \"Uji bagian yang baru diperbaiki sebelum melanjutkan\",\n        \"Simpan proyek dengan nama yang mudah dikenali\"\n      ],\n      [\n        \"Baca pesan kesalahan jika program gagal\",\n        \"Bandingkan hasil program dengan tujuan yang diminta\",\n        \"Gunakan satu perubahan setiap kali melakukan debugging\",\n        \"Tutup proyek setelah file berhasil tersimpan\"\n      ]\n    );\n  }\n\n  function blogVlogScenario(id,title,p){\n    return makeScenario(id,title,p.goal,\n      [\"merencanakan konten\",\"membuat konten\",\"menyunting isi\",\"meninjau hasil\",\"mempublikasikan\"],\n      [\n        `Buka ${p.app}`,\n        p.prepare1,\n        p.prepare2,\n        p.draft,\n        p.create1,\n        p.create2,\n        p.create3,\n        p.create4,\n        p.edit1,\n        p.edit2,\n        p.review1,\n        p.review2,\n        p.revise,\n        p.finalCheck,\n        p.publish,\n        p.finish\n      ],\n      [\n        \"Pastikan topik sesuai dengan tujuan tugas dan mudah dipahami pembaca atau penonton\",\n        \"Gunakan bahasa, gambar, suara, dan visual yang sopan serta relevan\",\n        \"Periksa kembali fakta, ejaan, audio, dan tampilan sebelum dipublikasikan\",\n        \"Gunakan judul serta nama file atau postingan yang jelas\"\n      ],\n      [\n        \"Jangan mempublikasikan data pribadi tanpa izin\",\n        \"Gunakan media yang dibuat sendiri atau memiliki izin penggunaan\",\n        \"Perbaiki bagian yang kurang jelas sebelum konten dipublikasikan\",\n        \"Pastikan hasil akhir dapat dibuka atau diputar dengan baik\"\n      ]\n    );\n  }\n\n  function mediaScenario(id,title,p){\n    return makeScenario(id,title,p.goal,\n      [\"membuka media\",\"melakukan penyuntingan\",\"menambahkan elemen\",\"meninjau hasil\",\"mengekspor file\"],\n      [\n        `Buka ${p.app}`,\n        p.import,\n        p.select,\n        p.edit1,\n        p.edit2,\n        p.adjust,\n        p.add,\n        p.position,\n        p.review,\n        p.preview,\n        p.exportOpen,\n        p.exportOption,\n        p.exportName,\n        p.exportRun,\n        p.verify,\n        p.finish\n      ],\n      [\n        \"Simpan salinan proyek sebelum melakukan perubahan besar\",\n        \"Pastikan elemen utama tidak terpotong atau tertutup\",\n        \"Periksa kualitas media pada tampilan pratinjau\",\n        \"Gunakan nama file yang sesuai dengan tugas\"\n      ],\n      [\n        \"Gunakan Undo jika hasil penyuntingan tidak sesuai\",\n        \"Periksa volume, ukuran, atau resolusi sesuai jenis media\",\n        \"Tunggu proses ekspor sampai benar-benar selesai\",\n        \"Buka file hasil ekspor untuk mengecek hasil akhir\"\n      ]\n    );\n  }\n\n  function deviceScenario(id,title,p){\n    return makeScenario(id,title,p.goal,\n      [\"menyiapkan perangkat\",\"membuka pengaturan\",\"membuat koneksi\",\"menguji perangkat\",\"menyelesaikan proses\"],\n      [\n        p.prepare1,\n        p.prepare2,\n        p.openSettings,\n        p.openMenu,\n        p.enable,\n        p.search,\n        p.select,\n        p.auth,\n        p.connect,\n        p.wait,\n        p.test1,\n        p.test2,\n        p.adjust,\n        p.save,\n        p.verify,\n        p.finish\n      ],\n      [\n        \"Pastikan perangkat tujuan berada dalam jangkauan atau terhubung\",\n        \"Periksa nama perangkat sebelum memilih\",\n        \"Gunakan pengaturan yang sesuai dengan kebutuhan tugas\",\n        \"Pastikan koneksi tetap aktif setelah pengujian\"\n      ],\n      [\n        \"Tunggu sistem selesai mendeteksi perangkat\",\n        \"Batalkan koneksi jika nama perangkat tidak sesuai\",\n        \"Ulangi pengujian setelah mengubah pengaturan\",\n        \"Matikan fitur koneksi yang tidak diperlukan setelah selesai\"\n      ]\n    );\n  }\n\n  function dataScenario(id,title,p){\n    return makeScenario(id,title,p.goal,\n      [\"membuka data\",\"menentukan rentang\",\"mengolah data\",\"memeriksa hasil\",\"menyimpan perubahan\"],\n      [\n        `Buka ${p.app}`,\n        p.open,\n        p.inspect,\n        p.select,\n        p.menu,\n        p.option1,\n        p.option2,\n        p.execute,\n        p.observe,\n        p.check1,\n        p.correct,\n        p.check2,\n        p.format,\n        p.save,\n        p.reopen,\n        p.verify\n      ],\n      [\n        \"Pastikan baris judul tidak ikut berubah secara keliru\",\n        \"Periksa kembali rentang data yang dipilih\",\n        \"Bandingkan hasil sebelum dan sesudah pengolahan\",\n        \"Simpan file dengan nama yang mudah dikenali\"\n      ],\n      [\n        \"Buat salinan data sebelum melakukan perubahan besar\",\n        \"Periksa apakah ada sel kosong yang memengaruhi hasil\",\n        \"Gunakan Undo jika hasil pengolahan tidak sesuai\",\n        \"Tutup file setelah perubahan berhasil tersimpan\"\n      ]\n    );\n  }\n\n  function schoolScenario(id,title,p){\n    return makeScenario(id,title,p.goal,\n      [\"membuka layanan sekolah\",\"memilih kegiatan\",\"mengisi kebutuhan\",\"menyelesaikan tugas\",\"memastikan hasil\"],\n      [\n        p.open,\n        p.login,\n        p.dashboard,\n        p.menu,\n        p.item,\n        p.read,\n        p.prepare,\n        p.input1,\n        p.input2,\n        p.review,\n        p.action,\n        p.wait,\n        p.confirm,\n        p.status,\n        p.record,\n        p.finish\n      ],\n      [\n        \"Pastikan akun dan kelas yang dipilih sudah benar\",\n        \"Baca semua petunjuk sebelum mulai mengisi\",\n        \"Periksa kembali jawaban atau file sebelum dikirim\",\n        \"Pastikan status kegiatan sudah berubah setelah selesai\"\n      ],\n      [\n        \"Pastikan koneksi internet stabil sebelum memulai\",\n        \"Jangan membuka halaman lain saat proses pengiriman berlangsung\",\n        \"Simpan bukti keberhasilan jika diperlukan\",\n        \"Logout jika menggunakan komputer milik sekolah\"\n      ]\n    );\n  }\n\n  const SCENARIOS = [\n    // 1–5: portal / layanan web\n    portalScenario(\"submit-task\",\"Mengumpulkan Tugas di Platform Sekolah\",{\n      goal:\"Susun langkah mengumpulkan tugas hingga statusnya benar-benar terkirim.\",\n      portal:\"platform sekolah\",entry:\"login\",menu:\"Mata Pelajaran\",item:\"Informatika\",task:\"tugas yang akan dikumpulkan\",\n      action:\"Unggah File\",resource:\"Buka folder penyimpanan lalu pilih file tugas\",confirm:\"Klik Open untuk memilih file\",\n      process:\"unggahan file selesai\",finalAction:\"Kirim Tugas\",status:\"halaman tugas\",success:\"status tugas berubah menjadi Terkirim\"\n    }),\n    portalScenario(\"download-material\",\"Mengunduh Materi Pelajaran\",{\n      goal:\"Susun langkah menemukan dan mengunduh materi dari portal sekolah.\",\n      portal:\"portal pembelajaran\",entry:\"login\",menu:\"Materi\",item:\"materi Informatika\",task:\"deskripsi materi\",\n      action:\"Unduh Materi\",resource:\"Pilih lokasi penyimpanan jika browser memintanya\",confirm:\"Konfirmasi nama file unduhan\",\n      process:\"unduhan selesai\",finalAction:\"Buka File\",status:\"folder Downloads\",success:\"file materi dapat dibuka\"\n    }),\n    portalScenario(\"online-registration\",\"Mengisi Formulir Pendaftaran Kegiatan\",{\n      goal:\"Susun proses mengisi formulir kegiatan sekolah sampai pendaftaran tercatat.\",\n      portal:\"situs kegiatan sekolah\",entry:\"pendaftaran\",menu:\"Daftar Kegiatan\",item:\"kegiatan yang akan diikuti\",task:\"syarat pendaftaran\",\n      action:\"Isi Formulir\",resource:\"Lengkapi data yang diminta pada formulir\",confirm:\"Centang pernyataan bahwa data sudah benar\",\n      process:\"validasi formulir selesai\",finalAction:\"Kirim Pendaftaran\",status:\"halaman konfirmasi\",success:\"nomor atau status pendaftaran muncul\"\n    }),\n    portalScenario(\"join-meeting\",\"Bergabung ke Pertemuan Daring\",{\n      goal:\"Susun langkah masuk ke ruang pertemuan daring dengan akun sekolah.\",\n      portal:\"layanan konferensi sekolah\",entry:\"masuk\",menu:\"Pertemuan\",item:\"jadwal pertemuan hari ini\",task:\"waktu dan aturan pertemuan\",\n      action:\"Gabung\",resource:\"Pilih mikrofon dan kamera yang akan digunakan\",confirm:\"Atur mikrofon menjadi mute sebelum masuk\",\n      process:\"koneksi ke ruang pertemuan terbentuk\",finalAction:\"Gabung Sekarang\",status:\"ruang pertemuan\",success:\"nama akun tampil sebagai peserta\"\n    }),\n    portalScenario(\"library-loan\",\"Memesan Buku di Perpustakaan Digital\",{\n      goal:\"Susun langkah mencari dan memesan buku melalui perpustakaan digital sekolah.\",\n      portal:\"perpustakaan digital\",entry:\"akun anggota\",menu:\"Katalog Buku\",item:\"buku yang dibutuhkan\",task:\"informasi ketersediaan buku\",\n      action:\"Pinjam / Pesan\",resource:\"Pilih durasi atau metode peminjaman yang tersedia\",confirm:\"Periksa judul dan penulis buku\",\n      process:\"permintaan peminjaman diproses\",finalAction:\"Konfirmasi Peminjaman\",status:\"Riwayat Peminjaman\",success:\"buku tercatat sebagai dipinjam atau dipesan\"\n    }),\n\n    // 6–10: dokumen / office\n    documentScenario(\"print-doc\",\"Mencetak Dokumen di Laboratorium\",{\n      goal:\"Susun proses mencetak dokumen sampai hasil cetak diperiksa.\",app:\"aplikasi pengolah kata\",\n      open:\"Buka dokumen yang akan dicetak\",titleStep:\"Periksa judul dokumen\",contentStep:\"Periksa isi dan halaman dokumen\",\n      format1:\"Perbaiki bagian yang salah jika ada\",format2:\"Simpan perubahan dokumen\",insertStep:\"Buka menu File\",\n      reviewStep:\"Pilih Print\",layoutStep:\"Pilih printer yang digunakan\",menuStep:\"Tentukan halaman yang dicetak\",\n      optionStep:\"Tentukan jumlah salinan\",previewStep:\"Periksa Print Preview\",executeStep:\"Klik Print\",\n      waitStep:\"Tunggu proses pencetakan selesai\",verifyStep:\"Ambil dan periksa hasil cetakan\"\n    }),\n    documentScenario(\"word-report\",\"Memformat Laporan di Pengolah Kata\",{\n      goal:\"Susun langkah memformat laporan agar rapi lalu menyimpannya.\",app:\"aplikasi pengolah kata\",\n      open:\"Buka file laporan\",titleStep:\"Pilih teks judul laporan\",contentStep:\"Atur ukuran dan jenis huruf judul\",\n      format1:\"Pilih isi paragraf\",format2:\"Atur spasi dan perataan paragraf\",insertStep:\"Tambahkan nomor halaman\",\n      reviewStep:\"Periksa konsistensi heading\",layoutStep:\"Atur margin halaman\",menuStep:\"Buka pemeriksaan ejaan\",\n      optionStep:\"Perbaiki kesalahan ejaan yang ditemukan\",previewStep:\"Tinjau seluruh dokumen dari awal sampai akhir\",\n      executeStep:\"Klik Save\",waitStep:\"Tunggu penyimpanan selesai\",verifyStep:\"Pastikan perubahan tetap ada setelah file dibuka kembali\"\n    }),\n    documentScenario(\"slide-deck\",\"Membuat Presentasi Sederhana\",{\n      goal:\"Susun proses membuat presentasi sampai siap ditampilkan.\",app:\"aplikasi presentasi\",\n      open:\"Buat presentasi kosong\",titleStep:\"Buat slide judul\",contentStep:\"Ketik judul dan identitas penyaji\",\n      format1:\"Tambahkan slide isi\",format2:\"Ketik poin-poin utama\",insertStep:\"Sisipkan gambar pendukung\",\n      reviewStep:\"Atur ukuran gambar agar proporsional\",layoutStep:\"Pilih tata letak slide yang konsisten\",menuStep:\"Atur transisi sederhana\",\n      optionStep:\"Periksa urutan slide\",previewStep:\"Jalankan Slide Show untuk pratinjau\",executeStep:\"Simpan presentasi\",\n      waitStep:\"Tunggu file selesai disimpan\",verifyStep:\"Buka kembali file dan pastikan semua slide tampil\"\n    }),\n    documentScenario(\"export-pdf\",\"Mengekspor Dokumen Menjadi PDF\",{\n      goal:\"Susun langkah mengubah dokumen menjadi PDF dan memeriksa hasilnya.\",app:\"aplikasi pengolah dokumen\",\n      open:\"Buka dokumen sumber\",titleStep:\"Periksa judul dan identitas dokumen\",contentStep:\"Periksa isi terakhir sebelum ekspor\",\n      format1:\"Pastikan gambar tidak keluar dari halaman\",format2:\"Pastikan nomor halaman sudah benar\",insertStep:\"Buka menu File\",\n      reviewStep:\"Pilih Export atau Save As\",layoutStep:\"Pilih format PDF\",menuStep:\"Pilih lokasi penyimpanan\",\n      optionStep:\"Ketik nama file PDF\",previewStep:\"Periksa opsi halaman yang akan diekspor\",executeStep:\"Klik Save / Export\",\n      waitStep:\"Tunggu proses pembuatan PDF selesai\",verifyStep:\"Buka PDF dan periksa setiap halamannya\"\n    }),\n    documentScenario(\"create-table-doc\",\"Membuat Tabel di Dokumen\",{\n      goal:\"Susun langkah membuat tabel data sederhana di dokumen.\",app:\"aplikasi pengolah kata\",\n      open:\"Buat dokumen kosong\",titleStep:\"Ketik judul tabel\",contentStep:\"Letakkan kursor di bawah judul\",\n      format1:\"Buka menu Insert\",format2:\"Pilih Table\",insertStep:\"Tentukan jumlah baris dan kolom\",\n      reviewStep:\"Isi judul setiap kolom\",layoutStep:\"Masukkan data ke dalam tabel\",menuStep:\"Pilih seluruh tabel\",\n      optionStep:\"Atur lebar kolom\",previewStep:\"Periksa keterbacaan data\",executeStep:\"Simpan dokumen\",\n      waitStep:\"Tunggu penyimpanan selesai\",verifyStep:\"Buka kembali dokumen dan pastikan tabel tidak berubah\"\n    }),\n\n    // 11–15: manajemen file\n    fileScenario(\"flash-backup\",\"Mencadangkan File ke Flashdisk\",{\n      goal:\"Susun langkah membuat backup file ke flashdisk secara aman.\",\n      sourceOpen:\"Hubungkan flashdisk lalu buka File Explorer\",sourceCheck:\"Buka folder sumber yang akan dicadangkan\",\n      select:\"Pilih file yang akan dicadangkan\",command:\"Salin file yang dipilih\",destinationOpen:\"Buka drive flashdisk\",\n      destinationPrepare:\"Buat dan buka folder Backup\",execute:\"Tempel file ke folder Backup\",wait:\"Tunggu proses penyalinan selesai\",\n      verifyCount:\"Bandingkan jumlah file sumber dan hasil backup\",verifyContent:\"Buka satu file hasil backup sebagai contoh\",\n      cleanup1:\"Tutup file contoh\",cleanup2:\"Klik Safely Remove Hardware\",finalCheck:\"Pilih Eject dan tunggu pesan aman\",\n      finish:\"Lepaskan flashdisk dari port USB\"\n    }),\n    fileScenario(\"organize-folders\",\"Mengorganisasi File ke Dalam Folder\",{\n      goal:\"Susun langkah merapikan file berdasarkan jenisnya ke folder yang sesuai.\",\n      sourceOpen:\"Buka folder yang berisi file campuran\",sourceCheck:\"Amati jenis file yang ada\",\n      select:\"Pilih file dokumen terlebih dahulu\",command:\"Potong file dokumen\",destinationOpen:\"Buat folder Dokumen\",\n      destinationPrepare:\"Buka folder Dokumen\",execute:\"Tempel file dokumen\",wait:\"Tunggu pemindahan selesai\",\n      verifyCount:\"Kembali ke folder awal dan pilih file gambar\",verifyContent:\"Pindahkan file gambar ke folder Gambar\",\n      cleanup1:\"Pindahkan file lain ke folder yang sesuai\",cleanup2:\"Urutkan folder berdasarkan nama\",finalCheck:\"Periksa bahwa tidak ada file tertinggal secara keliru\",\n      finish:\"Tutup File Explorer\"\n    }),\n    fileScenario(\"compress-zip\",\"Membuat Arsip ZIP\",{\n      goal:\"Susun langkah menggabungkan beberapa file menjadi satu arsip ZIP.\",\n      sourceOpen:\"Buka folder yang berisi file sumber\",sourceCheck:\"Periksa file yang akan dimasukkan ke arsip\",\n      select:\"Pilih semua file yang diperlukan\",command:\"Klik kanan pada file yang dipilih\",destinationOpen:\"Pilih perintah Compress / Send to ZIP\",\n      destinationPrepare:\"Tentukan nama arsip ZIP\",execute:\"Jalankan proses kompresi\",wait:\"Tunggu arsip selesai dibuat\",\n      verifyCount:\"Pastikan file ZIP muncul di folder\",verifyContent:\"Buka arsip ZIP untuk melihat isinya\",\n      cleanup1:\"Bandingkan isi ZIP dengan file sumber\",cleanup2:\"Tutup jendela arsip\",finalCheck:\"Periksa ukuran dan nama file ZIP\",\n      finish:\"Simpan arsip pada lokasi yang ditentukan\"\n    }),\n    fileScenario(\"extract-zip\",\"Mengekstrak Arsip ZIP\",{\n      goal:\"Susun langkah mengekstrak file ZIP ke folder baru.\",\n      sourceOpen:\"Buka folder yang berisi file ZIP\",sourceCheck:\"Pilih arsip ZIP yang akan diekstrak\",\n      select:\"Klik kanan pada file ZIP\",command:\"Pilih Extract All\",destinationOpen:\"Tentukan folder tujuan ekstraksi\",\n      destinationPrepare:\"Buat folder tujuan jika belum tersedia\",execute:\"Klik Extract\",wait:\"Tunggu proses ekstraksi selesai\",\n      verifyCount:\"Buka folder hasil ekstraksi\",verifyContent:\"Periksa file hasil ekstraksi\",\n      cleanup1:\"Buka satu file contoh\",cleanup2:\"Tutup file contoh setelah berhasil\",finalCheck:\"Pastikan semua file yang dibutuhkan tersedia\",\n      finish:\"Tutup jendela hasil ekstraksi\"\n    }),\n    fileScenario(\"move-project\",\"Memindahkan File Proyek ke Folder Kelas\",{\n      goal:\"Susun langkah memindahkan file proyek ke folder kelas yang benar.\",\n      sourceOpen:\"Buka folder tempat file proyek tersimpan\",sourceCheck:\"Periksa nama dan versi file proyek\",\n      select:\"Pilih file proyek yang benar\",command:\"Potong file proyek\",destinationOpen:\"Buka folder Kelas\",\n      destinationPrepare:\"Buka subfolder mata pelajaran Informatika\",execute:\"Tempel file proyek\",wait:\"Tunggu proses pemindahan selesai\",\n      verifyCount:\"Pastikan file tidak lagi berada di folder sumber\",verifyContent:\"Pastikan file sudah muncul di folder tujuan\",\n      cleanup1:\"Buka file untuk memastikan tidak rusak\",cleanup2:\"Tutup file setelah diperiksa\",finalCheck:\"Periksa kembali nama file dan lokasi folder\",\n      finish:\"Tutup File Explorer\"\n    }),\n\n    // 16–20: komunikasi\n    communicationScenario(\"email-attachment\",\"Mengirim Email dengan Lampiran\",{\n      goal:\"Susun proses mengirim email beserta file lampiran.\",service:\"layanan email sekolah\",\n      login:\"Login menggunakan akun sekolah\",start:\"Klik Tulis / Compose\",recipient:\"Masukkan alamat email penerima\",\n      subject:\"Ketik subjek email\",body:\"Tulis isi pesan\",extraOpen:\"Klik Lampirkan File\",extraSelect:\"Pilih file yang akan dilampirkan\",\n      extraWait:\"Tunggu lampiran selesai diunggah\",reviewRecipient:\"Periksa kembali alamat penerima\",reviewContent:\"Baca ulang isi dan lampiran\",\n      send:\"Klik Kirim / Send\",wait:\"Tunggu notifikasi pengiriman\",verify:\"Buka folder Terkirim dan pastikan email ada\",\n      finish:\"Tutup atau logout dari email\"\n    }),\n    communicationScenario(\"class-chat-file\",\"Mengirim File ke Grup Kelas\",{\n      goal:\"Susun proses membagikan file ke grup kelas yang tepat.\",service:\"aplikasi pesan kelas\",\n      login:\"Masuk menggunakan akun sekolah\",start:\"Buka daftar percakapan\",recipient:\"Pilih grup kelas yang benar\",\n      subject:\"Baca pesan terakhir agar memahami konteks\",body:\"Ketik keterangan singkat untuk file\",extraOpen:\"Klik ikon Lampiran\",\n      extraSelect:\"Pilih file yang akan dibagikan\",extraWait:\"Tunggu file selesai dimuat\",reviewRecipient:\"Pastikan nama grup kelas benar\",\n      reviewContent:\"Periksa nama file dan keterangan\",send:\"Klik Kirim\",wait:\"Tunggu tanda pesan berhasil terkirim\",\n      verify:\"Pastikan file muncul di percakapan\",finish:\"Tutup percakapan setelah selesai\"\n    }),\n    communicationScenario(\"calendar-event\",\"Membuat Jadwal di Kalender Digital\",{\n      goal:\"Susun langkah membuat jadwal tugas atau pertemuan di kalender digital.\",service:\"kalender digital\",\n      login:\"Masuk menggunakan akun sekolah\",start:\"Klik Buat Acara\",recipient:\"Tentukan judul acara\",\n      subject:\"Pilih tanggal acara\",body:\"Tentukan jam mulai dan selesai\",extraOpen:\"Tambahkan deskripsi kegiatan\",\n      extraSelect:\"Tambahkan pengingat\",extraWait:\"Tambahkan peserta jika diperlukan\",reviewRecipient:\"Periksa tanggal dan zona waktu\",\n      reviewContent:\"Baca ulang judul serta deskripsi acara\",send:\"Klik Simpan\",wait:\"Tunggu acara dibuat\",\n      verify:\"Buka tanggal tersebut dan pastikan acara tampil\",finish:\"Tutup kalender\"\n    }),\n    communicationScenario(\"meeting-invite\",\"Mengirim Undangan Pertemuan Daring\",{\n      goal:\"Susun langkah membuat dan mengirim undangan pertemuan daring.\",service:\"layanan konferensi daring\",\n      login:\"Masuk dengan akun sekolah\",start:\"Pilih Buat Pertemuan\",recipient:\"Ketik judul pertemuan\",\n      subject:\"Tentukan tanggal dan waktu\",body:\"Tambahkan deskripsi singkat\",extraOpen:\"Tambahkan peserta\",\n      extraSelect:\"Masukkan alamat email peserta\",extraWait:\"Buat tautan pertemuan\",reviewRecipient:\"Periksa daftar peserta\",\n      reviewContent:\"Periksa waktu dan tautan pertemuan\",send:\"Klik Simpan dan Kirim Undangan\",wait:\"Tunggu notifikasi undangan terkirim\",\n      verify:\"Periksa jadwal pertemuan pada kalender\",finish:\"Salin tautan jika diperlukan\"\n    }),\n    communicationScenario(\"share-folder\",\"Membagikan Folder Cloud kepada Teman\",{\n      goal:\"Susun langkah membagikan folder cloud dengan izin yang tepat.\",service:\"penyimpanan cloud sekolah\",\n      login:\"Masuk menggunakan akun sekolah\",start:\"Buka folder yang akan dibagikan\",recipient:\"Klik tombol Bagikan / Share\",\n      subject:\"Masukkan alamat email teman\",body:\"Pilih tingkat akses Viewer atau Editor\",extraOpen:\"Tambahkan pesan singkat\",\n      extraSelect:\"Periksa daftar penerima\",extraWait:\"Tunggu sistem memvalidasi alamat penerima\",reviewRecipient:\"Pastikan tidak ada alamat yang salah\",\n      reviewContent:\"Pastikan tingkat akses sudah sesuai\",send:\"Klik Kirim\",wait:\"Tunggu notifikasi berbagi berhasil\",\n      verify:\"Buka pengaturan berbagi dan periksa nama penerima\",finish:\"Tutup pengaturan berbagi\"\n    }),\n\n    // 21–25: keamanan digital\n    securityScenario(\"verify-phishing\",\"Memeriksa Pesan yang Diduga Phishing\",{\n      goal:\"Susun proses memeriksa pesan mencurigakan tanpa mengambil risiko.\",\n      start:\"Jangan klik tautan pada pesan yang mencurigakan\",observe:\"Baca isi pesan tanpa membuka lampiran\",\n      source:\"Periksa nama dan alamat pengirim\",check1:\"Perhatikan bahasa mendesak atau ancaman pada pesan\",\n      check2:\"Bandingkan alamat tautan dengan domain resmi\",openOfficial:\"Buka situs resmi melalui alamat yang diketik sendiri\",\n      loginOfficial:\"Masuk ke akun dari situs resmi bila perlu\",securityMenu:\"Buka pusat keamanan atau notifikasi akun\",\n      action1:\"Periksa apakah ada pemberitahuan resmi yang sama\",action2:\"Ubah password jika akun diduga terancam\",\n      confirm:\"Simpan perubahan keamanan\",review:\"Periksa aktivitas login terbaru\",report:\"Laporkan pesan sebagai phishing\",\n      save:\"Simpan bukti seperlunya\",verify:\"Pastikan pesan sudah ditandai atau diblokir\",finish:\"Beritahu guru jika pesan berkaitan dengan akun sekolah\"\n    }),\n    securityScenario(\"change-password\",\"Mengganti Password Akun Sekolah\",{\n      goal:\"Susun langkah mengganti password dengan aman melalui situs resmi.\",\n      start:\"Buka situs resmi akun sekolah\",observe:\"Pastikan alamat situs menggunakan domain resmi\",\n      source:\"Login menggunakan akun sendiri\",check1:\"Buka menu Profil atau Akun\",check2:\"Pilih Keamanan\",\n      openOfficial:\"Buka menu Ubah Password\",loginOfficial:\"Masukkan password lama\",securityMenu:\"Buat password baru yang kuat\",\n      action1:\"Ketik ulang password baru\",action2:\"Pastikan password baru tidak sama dengan akun lain\",\n      confirm:\"Klik Simpan Perubahan\",review:\"Tunggu konfirmasi password berhasil diubah\",report:\"Periksa sesi login aktif\",\n      save:\"Keluar dari sesi yang tidak dikenal\",verify:\"Login kembali menggunakan password baru\",finish:\"Simpan password dengan cara yang aman tanpa membagikannya\"\n    }),\n    securityScenario(\"enable-2fa\",\"Mengaktifkan Verifikasi Dua Langkah\",{\n      goal:\"Susun proses mengaktifkan verifikasi dua langkah untuk akun.\",\n      start:\"Buka situs resmi akun\",observe:\"Login menggunakan username dan password\",\n      source:\"Buka pengaturan akun\",check1:\"Pilih menu Keamanan\",check2:\"Cari Verifikasi Dua Langkah\",\n      openOfficial:\"Klik Aktifkan\",loginOfficial:\"Konfirmasi password akun\",securityMenu:\"Pilih metode verifikasi yang tersedia\",\n      action1:\"Ikuti langkah menghubungkan metode verifikasi\",action2:\"Masukkan kode verifikasi yang diterima\",\n      confirm:\"Klik Konfirmasi\",review:\"Simpan kode pemulihan di tempat aman\",report:\"Periksa perangkat tepercaya\",\n      save:\"Simpan pengaturan keamanan\",verify:\"Logout lalu login kembali untuk menguji verifikasi\",finish:\"Pastikan kode verifikasi tidak dibagikan kepada siapa pun\"\n    }),\n    securityScenario(\"review-permissions\",\"Meninjau Izin Aplikasi pada Akun\",{\n      goal:\"Susun langkah memeriksa dan mencabut izin aplikasi yang tidak diperlukan.\",\n      start:\"Buka halaman resmi pengaturan akun\",observe:\"Login ke akun sendiri\",\n      source:\"Buka menu Keamanan dan Privasi\",check1:\"Pilih daftar Aplikasi Terhubung\",check2:\"Baca nama setiap aplikasi\",\n      openOfficial:\"Pilih aplikasi yang tidak lagi digunakan\",loginOfficial:\"Periksa jenis akses yang dimiliki aplikasi\",securityMenu:\"Tentukan apakah akses masih diperlukan\",\n      action1:\"Klik Hapus Akses jika tidak diperlukan\",action2:\"Konfirmasi pencabutan izin\",\n      confirm:\"Kembali ke daftar aplikasi\",review:\"Periksa aplikasi lain satu per satu\",report:\"Catat aplikasi yang tidak dikenal\",\n      save:\"Ubah password bila menemukan akses mencurigakan\",verify:\"Pastikan aplikasi yang dicabut sudah hilang dari daftar\",finish:\"Tutup pengaturan akun\"\n    }),\n    securityScenario(\"report-account\",\"Melaporkan Akun Mencurigakan\",{\n      goal:\"Susun proses mengumpulkan bukti seperlunya dan melaporkan akun mencurigakan.\",\n      start:\"Jangan membalas pesan dari akun mencurigakan\",observe:\"Buka profil akun tanpa mengklik tautan di bio\",\n      source:\"Periksa nama pengguna dan informasi profil\",check1:\"Catat perilaku yang dianggap mencurigakan\",check2:\"Ambil tangkapan layar bila diperlukan\",\n      openOfficial:\"Buka menu Laporkan pada platform\",loginOfficial:\"Pilih alasan pelaporan yang sesuai\",securityMenu:\"Tambahkan keterangan singkat jika diminta\",\n      action1:\"Periksa kembali bukti yang akan dikirim\",action2:\"Kirim laporan\",\n      confirm:\"Tunggu konfirmasi laporan diterima\",review:\"Blokir akun jika diperlukan\",report:\"Beritahu guru jika akun menghubungi siswa sekolah\",\n      save:\"Simpan bukti sampai laporan ditangani\",verify:\"Pastikan akun sudah diblokir atau dibatasi\",finish:\"Jangan menyebarkan ulang konten mencurigakan\"\n    }),\n\n    // 26–30: blog / vlog\n    blogVlogScenario(\"blog-post\",\"Membuat Postingan Blog Sederhana\",{\n      goal:\"Susun proses merencanakan, menulis, meninjau, dan mempublikasikan satu postingan blog sederhana.\",app:\"platform blog atau editor artikel\",\n      prepare1:\"Tentukan topik yang akan dibahas\",prepare2:\"Tentukan tujuan dan pembaca blog\",\n      draft:\"Buat kerangka judul, pembuka, isi, dan penutup\",\n      create1:\"Tulis judul yang sesuai dengan topik\",create2:\"Tulis paragraf pembuka\",\n      create3:\"Tulis isi utama secara runtut\",create4:\"Tulis paragraf penutup\",\n      edit1:\"Periksa ejaan dan tanda baca\",edit2:\"Rapikan paragraf dan format tulisan\",\n      review1:\"Baca artikel dari awal sampai akhir\",review2:\"Pastikan isi sesuai dengan topik dan tidak membingungkan\",\n      revise:\"Perbaiki bagian yang masih kurang jelas\",finalCheck:\"Periksa kembali judul, isi, dan identitas penulis\",\n      publish:\"Klik Publikasikan atau simpan sebagai postingan\",finish:\"Buka postingan dan pastikan tampil dengan benar\"\n    }),\n    blogVlogScenario(\"blog-format\",\"Menyunting dan Memformat Artikel Blog\",{\n      goal:\"Susun langkah menyunting artikel blog agar lebih rapi, mudah dibaca, dan siap dipublikasikan.\",app:\"editor blog\",\n      prepare1:\"Buka draf artikel yang akan disunting\",prepare2:\"Baca keseluruhan isi sebelum mengubahnya\",\n      draft:\"Tandai bagian yang perlu diperbaiki\",\n      create1:\"Perbaiki judul agar lebih jelas\",create2:\"Perbaiki kalimat yang terlalu panjang\",\n      create3:\"Bagi isi menjadi beberapa paragraf\",create4:\"Tambahkan subjudul jika diperlukan\",\n      edit1:\"Gunakan huruf tebal atau daftar seperlunya\",edit2:\"Periksa konsistensi ukuran dan gaya teks\",\n      review1:\"Baca kembali artikel setelah diformat\",review2:\"Periksa apakah urutan informasi sudah logis\",\n      revise:\"Perbaiki bagian yang masih sulit dipahami\",finalCheck:\"Pastikan tidak ada salah ketik dan format berlebihan\",\n      publish:\"Simpan perubahan artikel\",finish:\"Pratinjau artikel sebelum dipublikasikan\"\n    }),\n    blogVlogScenario(\"blog-media\",\"Menambahkan Gambar dan Tautan pada Blog\",{\n      goal:\"Susun proses menambahkan gambar dan tautan yang relevan ke dalam artikel blog secara aman dan rapi.\",app:\"editor blog\",\n      prepare1:\"Buka artikel yang akan dilengkapi\",prepare2:\"Tentukan bagian yang membutuhkan gambar atau tautan\",\n      draft:\"Siapkan gambar dan alamat tautan yang relevan\",\n      create1:\"Unggah atau pilih gambar yang akan digunakan\",create2:\"Tempatkan gambar pada bagian yang sesuai\",\n      create3:\"Tambahkan keterangan gambar\",create4:\"Tambahkan tautan pada teks yang relevan\",\n      edit1:\"Atur ukuran gambar agar proporsional\",edit2:\"Periksa agar tautan tidak mengganggu keterbacaan\",\n      review1:\"Klik tautan untuk memastikan alamatnya benar\",review2:\"Periksa apakah gambar dapat tampil dengan baik\",\n      revise:\"Ganti gambar atau tautan yang tidak sesuai\",finalCheck:\"Pastikan sumber atau izin media sudah diperhatikan\",\n      publish:\"Simpan perubahan pada artikel\",finish:\"Pratinjau artikel lengkap sebelum dipublikasikan\"\n    }),\n    blogVlogScenario(\"vlog-record\",\"Merencanakan dan Merekam Vlog Sederhana\",{\n      goal:\"Susun langkah merencanakan isi vlog, menyiapkan pengambilan gambar, merekam, dan mengecek hasil rekaman.\",app:\"kamera ponsel atau aplikasi perekam video\",\n      prepare1:\"Tentukan tema dan tujuan vlog\",prepare2:\"Tentukan lokasi serta siapa yang akan tampil\",\n      draft:\"Buat urutan singkat pembuka, isi, dan penutup\",\n      create1:\"Siapkan kamera dan pastikan baterai cukup\",create2:\"Atur posisi kamera dan pencahayaan\",\n      create3:\"Lakukan rekaman bagian pembuka\",create4:\"Rekam bagian isi dan penutup\",\n      edit1:\"Periksa apakah suara terdengar jelas\",edit2:\"Periksa apakah gambar stabil dan objek terlihat\",\n      review1:\"Putar hasil rekaman dari awal\",review2:\"Catat bagian yang salah atau perlu direkam ulang\",\n      revise:\"Rekam ulang bagian yang kurang baik\",finalCheck:\"Pastikan seluruh bagian vlog sudah lengkap\",\n      publish:\"Simpan semua klip rekaman\",finish:\"Pindahkan rekaman ke folder proyek vlog\"\n    }),\n    blogVlogScenario(\"vlog-edit\",\"Mengedit dan Mempublikasikan Vlog\",{\n      goal:\"Susun proses memilih klip, mengedit vlog, meninjau hasil akhir, lalu mempublikasikannya secara aman.\",app:\"aplikasi editor video\",\n      prepare1:\"Buka proyek video baru\",prepare2:\"Impor semua klip vlog yang akan digunakan\",\n      draft:\"Urutkan klip sesuai alur pembuka, isi, dan penutup\",\n      create1:\"Potong bagian yang tidak diperlukan\",create2:\"Gabungkan klip sesuai urutan\",\n      create3:\"Tambahkan teks judul seperlunya\",create4:\"Atur suara agar dapat didengar dengan jelas\",\n      edit1:\"Tambahkan transisi sederhana jika diperlukan\",edit2:\"Periksa durasi agar tidak terlalu panjang\",\n      review1:\"Putar vlog dari awal sampai akhir\",review2:\"Periksa gambar, suara, teks, dan urutan cerita\",\n      revise:\"Perbaiki bagian yang masih mengganggu\",finalCheck:\"Pastikan tidak ada informasi pribadi yang tidak boleh dibagikan\",\n      publish:\"Ekspor video lalu unggah sesuai instruksi guru\",finish:\"Buka hasil unggahan dan pastikan video dapat diputar\"\n    }),\n\n    // 31–35: multimedia\n    mediaScenario(\"crop-image\",\"Memotong dan Menyimpan Foto\",{\n      goal:\"Susun langkah memotong foto lalu mengekspor hasilnya.\",app:\"editor gambar\",\n      import:\"Buka foto yang akan diedit\",select:\"Pilih alat Crop\",edit1:\"Atur area potongan\",edit2:\"Pastikan objek utama berada di dalam area\",\n      adjust:\"Terapkan Crop\",add:\"Atur kecerahan seperlunya\",position:\"Periksa komposisi gambar\",review:\"Bandingkan dengan gambar awal\",\n      preview:\"Perbesar tampilan untuk memeriksa detail\",exportOpen:\"Buka menu Export\",exportOption:\"Pilih format JPG atau PNG\",\n      exportName:\"Ketik nama file baru\",exportRun:\"Klik Export\",verify:\"Buka file hasil ekspor\",finish:\"Pastikan foto tidak terpotong secara keliru\"\n    }),\n    mediaScenario(\"poster-design\",\"Membuat Poster Digital Sederhana\",{\n      goal:\"Susun langkah membuat poster dari kanvas kosong sampai diekspor.\",app:\"aplikasi desain\",\n      import:\"Buat desain poster baru\",select:\"Pilih ukuran poster\",edit1:\"Tambahkan judul utama\",edit2:\"Tambahkan teks informasi\",\n      adjust:\"Pilih ukuran huruf yang mudah dibaca\",add:\"Tambahkan gambar atau ikon pendukung\",position:\"Atur posisi semua elemen\",\n      review:\"Periksa jarak dan keseimbangan elemen\",preview:\"Tinjau poster dalam ukuran penuh\",exportOpen:\"Klik Download / Export\",\n      exportOption:\"Pilih format PNG\",exportName:\"Ketik nama file poster\",exportRun:\"Mulai unduhan\",verify:\"Buka poster yang telah diunduh\",finish:\"Pastikan seluruh teks terbaca\"\n    }),\n    mediaScenario(\"record-audio\",\"Merekam dan Menyimpan Audio\",{\n      goal:\"Susun langkah merekam suara, memeriksa, lalu menyimpan hasil rekaman.\",app:\"aplikasi perekam suara\",\n      import:\"Pilih mikrofon yang akan digunakan\",select:\"Periksa indikator input mikrofon\",edit1:\"Klik Record\",edit2:\"Mulai berbicara sesuai naskah\",\n      adjust:\"Jaga jarak suara dari mikrofon\",add:\"Klik Stop setelah selesai\",position:\"Putar hasil rekaman\",\n      review:\"Dengarkan apakah suara terdengar jelas\",preview:\"Ulangi rekaman jika ada bagian yang tidak jelas\",exportOpen:\"Buka menu Simpan\",\n      exportOption:\"Pilih format audio yang tersedia\",exportName:\"Ketik nama file audio\",exportRun:\"Klik Save\",verify:\"Putar file hasil simpan\",finish:\"Pastikan durasi dan suara sesuai\"\n    }),\n    mediaScenario(\"trim-video\",\"Memotong Video Pendek\",{\n      goal:\"Susun langkah memotong bagian awal dan akhir video lalu mengekspornya.\",app:\"editor video\",\n      import:\"Impor video sumber\",select:\"Tarik video ke timeline\",edit1:\"Tentukan titik awal yang diperlukan\",edit2:\"Potong bagian sebelum titik awal\",\n      adjust:\"Tentukan titik akhir yang diperlukan\",add:\"Potong bagian setelah titik akhir\",position:\"Rapikan posisi klip pada timeline\",\n      review:\"Putar video dari awal\",preview:\"Periksa transisi awal dan akhir\",exportOpen:\"Buka menu Export\",\n      exportOption:\"Pilih resolusi yang sesuai\",exportName:\"Ketik nama file video\",exportRun:\"Mulai ekspor\",verify:\"Putar file hasil ekspor\",finish:\"Pastikan bagian yang tidak diperlukan sudah hilang\"\n    }),\n    mediaScenario(\"scan-document\",\"Memindai Dokumen Menjadi Gambar/PDF\",{\n      goal:\"Susun proses memindai dokumen sampai file hasil scan tersimpan dan terbaca.\",app:\"aplikasi pemindai\",\n      import:\"Letakkan dokumen pada pemindai\",select:\"Pilih sumber scanner\",edit1:\"Pilih jenis warna\",edit2:\"Pilih ukuran halaman\",\n      adjust:\"Jalankan Preview Scan\",add:\"Atur area pemindaian\",position:\"Luruskan area dokumen bila perlu\",\n      review:\"Periksa apakah seluruh halaman masuk\",preview:\"Jalankan Scan\",exportOpen:\"Buka pilihan penyimpanan\",\n      exportOption:\"Pilih PDF atau gambar\",exportName:\"Ketik nama file scan\",exportRun:\"Simpan hasil scan\",verify:\"Buka file hasil scan\",finish:\"Pastikan teks dapat dibaca dengan jelas\"\n    }),\n\n    // 36–40: perangkat\n    deviceScenario(\"wifi-connect\",\"Menghubungkan Komputer ke Wi-Fi\",{\n      goal:\"Susun proses menghubungkan komputer ke jaringan Wi-Fi yang benar.\",\n      prepare1:\"Nyalakan komputer\",prepare2:\"Pastikan adaptor Wi-Fi tersedia\",openSettings:\"Buka pengaturan jaringan\",\n      openMenu:\"Pilih menu Wi-Fi\",enable:\"Aktifkan Wi-Fi\",search:\"Tunggu daftar jaringan muncul\",select:\"Pilih nama jaringan sekolah\",\n      auth:\"Masukkan password Wi-Fi jika diminta\",connect:\"Klik Connect\",wait:\"Tunggu proses koneksi\",\n      test1:\"Periksa ikon jaringan\",test2:\"Buka browser untuk menguji koneksi\",adjust:\"Muat satu halaman web\",\n      save:\"Pilih Remember Network jika diizinkan\",verify:\"Pastikan status jaringan Connected\",finish:\"Tutup pengaturan jaringan\"\n    }),\n    deviceScenario(\"bluetooth-pair\",\"Memasangkan Perangkat Bluetooth\",{\n      goal:\"Susun langkah memasangkan komputer dengan perangkat Bluetooth.\",\n      prepare1:\"Nyalakan komputer\",prepare2:\"Nyalakan perangkat Bluetooth tujuan\",openSettings:\"Buka Settings\",\n      openMenu:\"Pilih Bluetooth & Devices\",enable:\"Aktifkan Bluetooth\",search:\"Klik Add Device\",select:\"Pilih nama perangkat tujuan\",\n      auth:\"Konfirmasi kode pasangan jika muncul\",connect:\"Klik Pair / Connect\",wait:\"Tunggu proses pemasangan\",\n      test1:\"Periksa status Connected\",test2:\"Uji perangkat sesuai fungsinya\",adjust:\"Atur volume atau opsi perangkat bila perlu\",\n      save:\"Simpan perangkat sebagai perangkat tepercaya jika sesuai\",verify:\"Putus lalu sambungkan kembali untuk menguji\",finish:\"Tutup Settings\"\n    }),\n    deviceScenario(\"printer-setup\",\"Menghubungkan Printer ke Komputer\",{\n      goal:\"Susun langkah menambahkan printer dan menguji hasil cetak.\",\n      prepare1:\"Nyalakan komputer\",prepare2:\"Nyalakan printer\",openSettings:\"Hubungkan printer melalui kabel atau jaringan\",\n      openMenu:\"Buka Settings lalu Printers & Scanners\",enable:\"Klik Add Device\",search:\"Tunggu printer terdeteksi\",\n      select:\"Pilih nama printer yang benar\",auth:\"Klik Add Device\",connect:\"Tunggu instalasi printer\",\n      wait:\"Pastikan printer berstatus Ready\",test1:\"Buka pengaturan printer\",test2:\"Pilih Print Test Page\",\n      adjust:\"Atur printer default jika diperlukan\",save:\"Simpan pengaturan\",verify:\"Periksa hasil test page\",finish:\"Pastikan printer siap digunakan\"\n    }),\n    deviceScenario(\"projector-setup\",\"Menghubungkan Laptop ke Proyektor\",{\n      goal:\"Susun proses menampilkan layar laptop pada proyektor.\",\n      prepare1:\"Nyalakan laptop\",prepare2:\"Nyalakan proyektor\",openSettings:\"Hubungkan kabel HDMI atau perangkat nirkabel\",\n      openMenu:\"Pilih input yang sesuai pada proyektor\",enable:\"Buka pengaturan Display pada laptop\",search:\"Tunggu layar kedua terdeteksi\",\n      select:\"Pilih mode Duplicate\",auth:\"Konfirmasi perubahan tampilan\",connect:\"Buka materi presentasi\",\n      wait:\"Tunggu gambar muncul pada layar proyektor\",test1:\"Periksa ketajaman tampilan\",test2:\"Periksa apakah seluruh layar terlihat\",\n      adjust:\"Atur resolusi jika tampilan terpotong\",save:\"Simpan pengaturan tampilan\",verify:\"Jalankan satu slide untuk menguji\",finish:\"Pastikan presentasi siap dimulai\"\n    }),\n    deviceScenario(\"software-update\",\"Memperbarui Aplikasi Secara Aman\",{\n      goal:\"Susun langkah memperbarui aplikasi melalui sumber resmi.\",\n      prepare1:\"Hubungkan komputer ke internet\",prepare2:\"Simpan pekerjaan yang sedang dibuka\",openSettings:\"Buka aplikasi yang akan diperbarui\",\n      openMenu:\"Buka menu Help atau Settings\",enable:\"Pilih Check for Updates\",search:\"Tunggu pemeriksaan versi\",\n      select:\"Baca informasi versi baru\",auth:\"Pastikan pembaruan berasal dari aplikasi resmi\",connect:\"Klik Download / Update\",\n      wait:\"Tunggu unduhan pembaruan selesai\",test1:\"Izinkan instalasi jika diminta\",test2:\"Tunggu instalasi selesai\",\n      adjust:\"Restart aplikasi jika diperlukan\",save:\"Buka kembali aplikasi\",verify:\"Periksa nomor versi terbaru\",finish:\"Pastikan aplikasi dapat digunakan normal\"\n    }),\n\n    // 41–45: data / spreadsheet\n    dataScenario(\"sort-data\",\"Mengurutkan Data di Spreadsheet\",{\n      goal:\"Susun langkah mengurutkan data tanpa merusak hubungan antarbaris.\",app:\"spreadsheet\",\n      open:\"Buka file data\",inspect:\"Periksa judul kolom dan isi tabel\",select:\"Klik satu sel di dalam tabel\",\n      menu:\"Buka menu Data\",option1:\"Pilih Sort\",option2:\"Pilih kolom yang menjadi dasar pengurutan\",\n      execute:\"Pilih urutan A–Z atau Z–A lalu jalankan\",observe:\"Periksa hasil pengurutan\",check1:\"Pastikan setiap baris tetap utuh\",\n      correct:\"Undo jika baris menjadi tidak sesuai\",check2:\"Ulangi Sort dengan rentang yang benar\",format:\"Periksa kembali data teratas dan terbawah\",\n      save:\"Simpan file\",reopen:\"Tutup lalu buka kembali file\",verify:\"Pastikan urutan data tetap tersimpan\"\n    }),\n    dataScenario(\"filter-data\",\"Menyaring Data dengan Filter\",{\n      goal:\"Susun langkah menampilkan hanya data yang memenuhi kriteria.\",app:\"spreadsheet\",\n      open:\"Buka file data\",inspect:\"Periksa judul kolom\",select:\"Pilih seluruh tabel atau satu sel pada tabel\",\n      menu:\"Buka menu Data\",option1:\"Aktifkan Filter\",option2:\"Klik tombol filter pada kolom yang dipilih\",\n      execute:\"Pilih kriteria yang ingin ditampilkan\",observe:\"Periksa baris yang masih terlihat\",check1:\"Pastikan data yang tampil memenuhi kriteria\",\n      correct:\"Ubah kriteria jika hasil belum sesuai\",check2:\"Bersihkan filter untuk menampilkan semua data\",format:\"Aktifkan kembali filter yang benar\",\n      save:\"Simpan file jika diperlukan\",reopen:\"Periksa jumlah baris hasil filter\",verify:\"Pastikan hasil sesuai pertanyaan\"\n    }),\n    dataScenario(\"make-chart\",\"Membuat Grafik dari Data\",{\n      goal:\"Susun langkah membuat grafik yang sesuai dari tabel spreadsheet.\",app:\"spreadsheet\",\n      open:\"Buka file yang berisi tabel\",inspect:\"Periksa kolom kategori dan nilai\",select:\"Blok data yang akan dibuat grafik\",\n      menu:\"Buka menu Insert\",option1:\"Pilih Chart / Grafik\",option2:\"Pilih jenis grafik yang sesuai\",\n      execute:\"Buat grafik\",observe:\"Periksa kategori dan nilai pada grafik\",check1:\"Pastikan judul grafik sesuai\",\n      correct:\"Perbaiki rentang data jika grafik salah\",check2:\"Tambahkan label data jika diperlukan\",format:\"Atur ukuran grafik agar mudah dibaca\",\n      save:\"Simpan file\",reopen:\"Buka kembali file\",verify:\"Pastikan grafik tetap tampil dengan data yang benar\"\n    }),\n    dataScenario(\"vlookup-data\",\"Menggunakan VLOOKUP untuk Mencari Data\",{\n      goal:\"Susun langkah menggunakan tabel referensi untuk mengambil data.\",app:\"spreadsheet\",\n      open:\"Buka file latihan VLOOKUP\",inspect:\"Periksa tabel referensi dan nilai pencarian\",select:\"Klik sel tempat hasil akan ditampilkan\",\n      menu:\"Ketik =VLOOKUP(\",option1:\"Pilih sel nilai pencarian\",option2:\"Pilih rentang tabel referensi\",\n      execute:\"Masukkan nomor kolom dan FALSE lalu tutup kurung\",observe:\"Tekan Enter\",check1:\"Periksa hasil yang muncul\",\n      correct:\"Periksa kembali rumus jika muncul error\",check2:\"Perbaiki referensi atau nomor kolom\",format:\"Salin rumus jika diperlukan\",\n      save:\"Simpan file\",reopen:\"Buka kembali lembar kerja\",verify:\"Pastikan hasil pencarian tetap benar\"\n    }),\n    dataScenario(\"remove-duplicates\",\"Menghapus Data Duplikat\",{\n      goal:\"Susun proses menghapus data duplikat sambil menjaga data asli tetap aman.\",app:\"spreadsheet\",\n      open:\"Buka file data\",inspect:\"Amati kolom yang mungkin memiliki data ganda\",select:\"Buat salinan sheet sebagai cadangan\",\n      menu:\"Pilih tabel pada sheet salinan\",option1:\"Buka menu Data\",option2:\"Pilih Remove Duplicates\",\n      execute:\"Pilih kolom yang digunakan untuk menentukan duplikat\",observe:\"Jalankan penghapusan duplikat\",check1:\"Baca jumlah data yang dihapus\",\n      correct:\"Bandingkan jumlah baris dengan sheet cadangan\",check2:\"Undo jika kolom kriteria salah\",format:\"Ulangi dengan kolom yang tepat bila diperlukan\",\n      save:\"Simpan file\",reopen:\"Buka kembali file\",verify:\"Pastikan data unik tetap lengkap\"\n    }),\n\n    // 46–50: alur kegiatan sekolah\n    schoolScenario(\"online-quiz\",\"Mengerjakan Kuis Daring\",{\n      goal:\"Susun langkah mengerjakan kuis daring sampai jawaban berhasil dikirim.\",\n      open:\"Buka portal pembelajaran sekolah\",login:\"Login menggunakan akun siswa\",dashboard:\"Buka kelas Informatika\",\n      menu:\"Pilih menu Kuis\",item:\"Buka kuis yang sedang aktif\",read:\"Baca petunjuk dan batas waktu\",\n      prepare:\"Klik Mulai Kuis\",input1:\"Baca soal pertama dan pilih jawaban\",input2:\"Kerjakan soal berikutnya sampai selesai\",\n      review:\"Gunakan halaman ringkasan untuk memeriksa jawaban\",action:\"Klik Kirim Jawaban\",wait:\"Tunggu proses pengiriman\",\n      confirm:\"Konfirmasi pengiriman jika diminta\",status:\"Pastikan status kuis Selesai\",record:\"Catat nilai jika langsung ditampilkan\",\n      finish:\"Kembali ke halaman kelas\"\n    }),\n    schoolScenario(\"join-class\",\"Bergabung ke Kelas Daring\",{\n      goal:\"Susun langkah masuk ke kelas daring menggunakan kode kelas.\",\n      open:\"Buka platform kelas daring\",login:\"Login menggunakan akun sekolah\",dashboard:\"Buka halaman utama kelas\",\n      menu:\"Klik tombol Bergabung ke Kelas\",item:\"Siapkan kode kelas dari guru\",read:\"Periksa kembali kode kelas\",\n      prepare:\"Masukkan kode kelas\",input1:\"Klik Gabung\",input2:\"Tunggu proses masuk ke kelas\",\n      review:\"Periksa nama mata pelajaran dan guru\",action:\"Buka halaman Stream / Beranda\",wait:\"Tunggu konten kelas dimuat\",\n      confirm:\"Periksa pengumuman terbaru\",status:\"Pastikan kelas muncul pada daftar kelas\",record:\"Simpan informasi kelas jika diperlukan\",\n      finish:\"Tutup halaman setelah selesai\"\n    }),\n    schoolScenario(\"submit-group-project\",\"Mengumpulkan Proyek Kelompok\",{\n      goal:\"Susun langkah menyiapkan dan mengumpulkan satu file proyek kelompok.\",\n      open:\"Buka folder proyek kelompok\",login:\"Periksa versi file paling terbaru\",dashboard:\"Pastikan nama anggota tercantum pada proyek\",\n      menu:\"Ubah nama file sesuai format yang diminta\",item:\"Buka portal pembelajaran\",read:\"Login dan buka tugas Proyek Kelompok\",\n      prepare:\"Baca kembali ketentuan pengumpulan\",input1:\"Klik Tambah / Unggah File\",input2:\"Pilih file proyek kelompok\",\n      review:\"Periksa nama file yang tampil\",action:\"Tunggu upload selesai lalu klik Kirim\",wait:\"Tunggu proses pengiriman\",\n      confirm:\"Konfirmasi penyerahan tugas\",status:\"Pastikan status berubah menjadi Diserahkan\",record:\"Ambil bukti status jika diperlukan\",\n      finish:\"Beritahu anggota kelompok bahwa proyek sudah terkirim\"\n    }),\n    schoolScenario(\"digital-attendance\",\"Mengisi Kehadiran Digital\",{\n      goal:\"Susun langkah mengisi presensi digital menggunakan akun sendiri.\",\n      open:\"Buka portal presensi sekolah\",login:\"Login menggunakan akun siswa\",dashboard:\"Buka menu Kehadiran\",\n      menu:\"Pilih tanggal hari ini\",item:\"Pilih mata pelajaran yang sedang berlangsung\",read:\"Baca aturan presensi\",\n      prepare:\"Klik Isi Kehadiran\",input1:\"Pilih status Hadir\",input2:\"Isi keterangan jika diminta\",\n      review:\"Periksa nama, kelas, dan tanggal\",action:\"Klik Simpan Presensi\",wait:\"Tunggu proses penyimpanan\",\n      confirm:\"Baca notifikasi presensi berhasil\",status:\"Buka riwayat kehadiran\",record:\"Pastikan kehadiran hari ini tercatat\",\n      finish:\"Logout jika menggunakan komputer bersama\"\n    }),\n    schoolScenario(\"qr-resource\",\"Mengakses Materi dari QR Code\",{\n      goal:\"Susun langkah memindai QR materi sekolah dan memastikan sumbernya aman.\",\n      open:\"Buka aplikasi pemindai QR pada perangkat\",login:\"Arahkan kamera ke QR yang diberikan guru\",dashboard:\"Tunggu tautan terbaca\",\n      menu:\"Periksa alamat situs pada hasil pemindaian\",item:\"Pastikan domain sesuai sumber sekolah atau sumber yang dijelaskan guru\",\n      read:\"Buka tautan jika alamat sudah benar\",prepare:\"Tunggu halaman materi selesai dimuat\",input1:\"Baca judul materi\",\n      input2:\"Periksa apakah materi sesuai dengan pelajaran\",review:\"Gunakan menu materi untuk menemukan bagian yang diminta\",\n      action:\"Buka atau unduh sumber yang ditugaskan\",wait:\"Tunggu proses pemuatan atau unduhan\",confirm:\"Buka materi yang dipilih\",\n      status:\"Pastikan file atau halaman dapat dibaca\",record:\"Simpan materi pada folder pelajaran jika diperlukan\",finish:\"Tutup halaman yang tidak diperlukan\"\n    })\n  ];\n\n  if(SCENARIOS.length!==50) throw new Error(`Bank algoritma harus berjumlah 50, saat ini ${SCENARIOS.length}.`);\n\n  const GAME = {\n    panel:null, student:null, groupIndex:0, groupNo:1, slot:0, members:[],\n    scenario:null, steps:[], assigned:[], board:{}, meta:{}, chat:[], selected:null,\n    demo:false, completed:false, lastHint:\"Belum diuji.\", rootRef:null,\n    teacherMonitor:{className:null,groupNo:1,groupRef:null,countRefs:[],counts:[0,0,0,0,0],messages:[],groupMeta:{},managerRef:null,presenceRef:null,manager:{duration:50,teams:null,started:false},joinedNames:[],modalOpen:false,manualOpen:false}\n  };\n\n  const CSS = `\n    .alg-team-shell{\n      padding:14px 0 28px;\n      background:linear-gradient(180deg,#f4f8fc 0%, #f8fbff 100%);\n      min-height:100%;\n    }\n    .alg-team-body{\n      padding:0 18px;\n      display:grid;\n      grid-template-columns:minmax(0,1fr) 360px;\n      gap:18px;\n      align-items:start;\n    }\n    .alg-main{min-width:0}\n    .alg-side{\n      display:flex;\n      flex-direction:column;\n      gap:18px;\n      position:sticky;\n      top:14px;\n    }\n\n    .alg-card{\n      background:#fff;\n      border:1px solid #dde9f5;\n      border-radius:24px;\n      box-shadow:0 10px 28px rgba(39,81,119,.06);\n      overflow:hidden;\n    }\n    .alg-card-pad{padding:22px 24px}\n\n    .alg-hero{\n      position:relative;\n      padding:22px 24px;\n      background:linear-gradient(135deg,#f5f8ff 0%, #f8fbff 100%);\n      border:1px solid #bdd9ff;\n      border-radius:24px;\n      overflow:hidden;\n    }\n    .alg-hero:before{\n      content:\"\";\n      position:absolute;\n      width:140px;height:140px;\n      right:-22px;top:-24px;\n      background:radial-gradient(circle at center, rgba(121,212,222,.25), rgba(121,212,222,.08) 60%, transparent 61%);\n      border-radius:50%;\n    }\n    .alg-hero:after{\n      content:\"\";\n      position:absolute;\n      width:110px;height:110px;\n      right:78px;bottom:-42px;\n      background:radial-gradient(circle at center, rgba(187,205,255,.20), rgba(187,205,255,.06) 60%, transparent 61%);\n      border-radius:50%;\n    }\n    .alg-hero-grid{\n      position:relative;\n      z-index:1;\n      display:grid;\n      grid-template-columns:96px minmax(0,1fr);\n      gap:20px;\n      align-items:start;\n    }\n    .alg-hero-icon{\n      width:96px;height:96px;\n      border-radius:24px;\n      background:linear-gradient(180deg,#dcecff,#eef6ff);\n      display:grid;\n      place-items:center;\n      font-size:46px;\n      box-shadow:inset 0 1px 0 rgba(255,255,255,.8);\n    }\n    .alg-hero-copy h3{\n      margin:2px 0 8px;\n      font-size:25px;\n      line-height:1.2;\n      color:#15215a;\n      font-weight:900;\n      letter-spacing:-.01em;\n    }\n    .alg-hero-copy p{\n      margin:0;\n      color:#42607d;\n      font-size:14px;\n      line-height:1.6;\n    }\n    .alg-badges{\n      display:flex;\n      flex-wrap:wrap;\n      gap:12px;\n      margin-top:18px;\n    }\n    .alg-badge{\n      display:inline-flex;\n      align-items:center;\n      gap:8px;\n      padding:10px 16px;\n      border-radius:999px;\n      background:#fff;\n      font-size:12px;\n      font-weight:900;\n      line-height:1;\n      border:2px solid #dbe8fb;\n      color:#2b4fd5;\n      box-shadow:0 2px 10px rgba(39,81,119,.04);\n      white-space:nowrap;\n    }\n    .alg-badge.blue{border-color:#bfd2ff;color:#2860ef}\n    .alg-badge.purple{border-color:#dcc7ff;color:#7a31f3}\n    .alg-badge.green{border-color:#b8edce;color:#189a59}\n    .alg-badge.orange{border-color:#ffd89f;color:#f08b00}\n\n    .alg-members{\n      padding:18px 22px 22px;\n      margin-top:18px;\n    }\n    .alg-block-head{\n      display:flex;\n      gap:12px;\n      align-items:flex-start;\n      margin-bottom:18px;\n    }\n    .alg-head-icon{\n      width:46px;height:46px;\n      border-radius:16px;\n      display:grid;place-items:center;\n      font-size:26px;\n      flex:0 0 46px;\n    }\n    .alg-head-icon.green{background:#e8fff2;color:#15a05e}\n    .alg-head-icon.blue{background:#e8fff7;color:#1db36d}\n    .alg-head-icon.info{background:#eaf2ff;color:#3067ff}\n    .alg-block-head h4{\n      margin:0;\n      font-size:17px;\n      color:#15215a;\n      font-weight:900;\n      line-height:1.2;\n    }\n    .alg-block-head p{\n      margin:6px 0 0;\n      color:#58708c;\n      font-size:13px;\n      line-height:1.55;\n    }\n\n    .alg-member-row{\n      display:grid;\n      grid-template-columns:repeat(5,minmax(0,1fr));\n      gap:14px;\n    }\n    .alg-member-chip{\n      display:flex;\n      align-items:center;\n      gap:14px;\n      min-width:0;\n      padding:18px 16px;\n      background:#fff;\n      border:1.5px solid #dbe8f5;\n      border-radius:18px;\n      box-shadow:0 2px 10px rgba(39,81,119,.03);\n    }\n    .alg-member-chip.active{\n      border:2px solid #4b84ff;\n      box-shadow:0 6px 18px rgba(74,132,255,.10);\n    }\n    .alg-avatar{\n      width:56px;height:56px;\n      border-radius:50%;\n      display:grid;place-items:center;\n      font-size:18px;font-weight:900;\n      flex:0 0 56px;\n      color:#10244a;\n    }\n    .alg-member-chip b{\n      display:block;\n      font-size:15px;\n      color:#172458;\n      line-height:1.2;\n      white-space:nowrap;\n      overflow:hidden;\n      text-overflow:ellipsis;\n    }\n    .alg-member-chip small{\n      display:block;\n      margin-top:6px;\n      color:#5d7692;\n      font-size:12px;\n      line-height:1.4;\n    }\n    .alg-member-chip.member-0 .alg-avatar{background:linear-gradient(180deg,#b8d9ff,#8cc0ff)}\n    .alg-member-chip.member-1 .alg-avatar{background:linear-gradient(180deg,#ddb8ff,#c58fff)}\n    .alg-member-chip.member-2 .alg-avatar{background:linear-gradient(180deg,#9ae9ae,#5ecf79);color:#fff}\n    .alg-member-chip.member-3 .alg-avatar{background:linear-gradient(180deg,#ffd775,#f7c445)}\n    .alg-member-chip.member-4 .alg-avatar{background:linear-gradient(180deg,#ffb2d4,#ff92c3)}\n    .alg-member-chip.member-5 .alg-avatar{background:linear-gradient(180deg,#98edf1,#61d4df)}\n\n    .alg-section{\n      padding:18px 22px 20px;\n      margin-top:18px;\n    }\n    .alg-section-head{\n      display:flex;\n      justify-content:space-between;\n      gap:16px;\n      align-items:flex-start;\n      margin-bottom:18px;\n    }\n    .alg-section-head h4{\n      margin:0;\n      font-size:18px;\n      line-height:1.2;\n      color:#15215a;\n      font-weight:900;\n    }\n    .alg-section-head p{\n      margin:8px 0 0;\n      color:#5d7692;\n      font-size:13px;\n      line-height:1.55;\n    }\n    .alg-counter{\n      font-size:16px;\n      line-height:1.2;\n      font-weight:900;\n      color:#0f995b;\n      white-space:nowrap;\n      padding-top:2px;\n    }\n    .alg-my-cards{\n      display:grid;\n      grid-template-columns:repeat(2,minmax(0,1fr));\n      gap:18px;\n    }\n    .alg-my-card{\n      position:relative;\n      border:1.5px solid #cfe0fb;\n      background:linear-gradient(180deg,#fbfdff 0%, #f4f8ff 100%);\n      border-radius:18px;\n      padding:16px 18px;\n      cursor:pointer;\n      text-align:left;\n      transition:.18s ease;\n      min-height:104px;\n      color:#19285e;\n      box-shadow:0 2px 10px rgba(39,81,119,.03);\n    }\n    .alg-my-card:hover{\n      transform:translateY(-1px);\n      border-color:#86afff;\n      box-shadow:0 8px 20px rgba(74,132,255,.09);\n    }\n    .alg-my-card.selected{\n      border:2px solid #4b84ff;\n      background:linear-gradient(180deg,#f6faff 0%, #edf4ff 100%);\n      box-shadow:0 8px 18px rgba(74,132,255,.12);\n    }\n    .alg-my-card.placed{\n      opacity:.45;\n      cursor:not-allowed;\n      filter:saturate(.8);\n    }\n    .alg-my-card b{\n      display:block;\n      color:#6b86ff;\n      font-size:11px;\n      font-weight:900;\n      letter-spacing:.02em;\n      margin-bottom:10px;\n    }\n    .alg-my-card span{\n      display:block;\n      color:#162359;\n      font-size:16px;\n      font-weight:800;\n      line-height:1.38;\n      padding-right:28px;\n    }\n    .alg-my-card:after{\n      content:\"⋮\";\n      position:absolute;\n      right:16px;\n      top:50%;\n      transform:translateY(-50%);\n      color:#a6b7cf;\n      font-size:24px;\n      font-weight:900;\n      line-height:1;\n    }\n    .alg-helper{\n      margin-top:14px;\n      padding:12px 14px;\n      border-radius:14px;\n      background:#eef7ff;\n      border:1px solid #cbe0ff;\n      color:#2860ef;\n      font-size:12px;\n      font-weight:800;\n      line-height:1.5;\n    }\n\n    .alg-board{\n      display:grid;\n      grid-template-columns:repeat(2,minmax(0,1fr));\n      gap:14px;\n    }\n    .alg-slot{\n      min-height:82px;\n      border:1.5px dashed #b7c8dc;\n      background:#f9fcff;\n      border-radius:16px;\n      padding:14px;\n      display:grid;\n      grid-template-columns:34px 1fr;\n      gap:10px;\n      align-items:start;\n      cursor:pointer;\n      transition:.15s ease;\n    }\n    .alg-slot:hover{border-color:#7ba6ff;background:#f3f8ff}\n    .alg-slot.filled{border-style:solid;background:#fff}\n    .alg-slot.mine{border-color:#7ba6ff;background:#eef5ff}\n    .alg-slot.correct-final{border-color:#7fd8a6;background:#f0fff6}\n    .alg-slot-no{\n      width:30px;height:30px;\n      border-radius:10px;\n      background:#e8f0f8;\n      display:grid;place-items:center;\n      font-size:13px;\n      font-weight:900;\n      color:#45627e;\n    }\n    .alg-slot.mine .alg-slot-no{background:#4b84ff;color:#fff}\n    .alg-slot-text{\n      display:block;\n      font-size:13px;\n      color:#1b2b61;\n      line-height:1.42;\n      font-weight:800;\n    }\n    .alg-slot-owner{\n      display:block;\n      margin-top:6px;\n      font-size:10px;\n      color:#6b83a0;\n      font-weight:700;\n    }\n\n    .alg-actions{\n      display:flex;\n      flex-wrap:wrap;\n      gap:10px;\n      margin-top:16px;\n    }\n    .alg-btn{\n      border:0;\n      border-radius:14px;\n      padding:12px 16px;\n      font-size:13px;\n      font-weight:900;\n      line-height:1;\n      cursor:pointer;\n      transition:.15s ease;\n    }\n    .alg-btn.primary{background:linear-gradient(180deg,#6d7cff,#5869ff);color:#fff}\n    .alg-btn.secondary{background:#edf3fb;color:#3b5068}\n    .alg-btn.success{background:linear-gradient(180deg,#1fba6b,#0ea85b);color:#fff}\n    .alg-btn:disabled{opacity:.45;cursor:not-allowed}\n    .alg-feedback{\n      margin-top:14px;\n      padding:13px 15px;\n      border-radius:14px;\n      background:#fff8ed;\n      border:1px solid #ffdfab;\n      color:#a65f00;\n      font-size:12px;\n      line-height:1.55;\n      font-weight:800;\n    }\n    .alg-feedback.ok{\n      background:#f0fff6;\n      border-color:#b9eccd;\n      color:#14834f;\n    }\n\n    .alg-side-card{\n      padding:18px 20px;\n    }\n    .alg-side-card h4{\n      margin:0;\n      color:#162359;\n      font-size:17px;\n      font-weight:900;\n      line-height:1.2;\n    }\n    .alg-side-card .alg-title-row{\n      display:flex;\n      justify-content:space-between;\n      gap:10px;\n      align-items:center;\n      margin-bottom:12px;\n    }\n\n    .alg-chat-desc{\n      color:#59718d;\n      font-size:13px;\n      line-height:1.55;\n      margin:0 0 16px;\n    }\n    .alg-chat-count{\n      padding:9px 14px;\n      border-radius:999px;\n      background:#eef3ff;\n      color:#3d61eb;\n      font-size:12px;\n      font-weight:900;\n      white-space:nowrap;\n    }\n    .alg-chat-list{\n      display:flex;\n      flex-direction:column;\n      gap:12px;\n      max-height:320px;\n      min-height:150px;\n      overflow:auto;\n      margin-bottom:16px;\n      padding-right:2px;\n    }\n    .alg-chat-empty{\n      padding:14px;\n      border-radius:16px;\n      background:#f8fbff;\n      border:1px dashed #d9e5f3;\n      color:#7d91a8;\n      font-size:12px;\n      line-height:1.55;\n      text-align:center;\n    }\n    .alg-msg{\n      display:grid;\n      grid-template-columns:42px 1fr;\n      gap:12px;\n      align-items:start;\n      padding:14px 14px 12px;\n      background:#f8fbff;\n      border:1px solid #e0eaf7;\n      border-radius:18px;\n    }\n    .alg-msg.mine{background:#f8fbff}\n    .alg-msg-avatar{\n      width:42px;height:42px;\n      border-radius:50%;\n      display:grid;place-items:center;\n      background:#d9e3f0;\n      color:#2a405a;\n      font-weight:900;\n      font-size:16px;\n      flex:0 0 42px;\n    }\n    .alg-msg.member-0 .alg-msg-avatar{background:#dce9fb}\n    .alg-msg.member-1 .alg-msg-avatar{background:#eadcfb}\n    .alg-msg.member-2 .alg-msg-avatar{background:#d9f5df}\n    .alg-msg.member-3 .alg-msg-avatar{background:#fff0cc}\n    .alg-msg.member-4 .alg-msg-avatar{background:#ffe0ec}\n    .alg-msg.member-5 .alg-msg-avatar{background:#d9f7fb}\n    .alg-msg.teacher{background:#f2fff7;border-color:#cdebd9}\n    .alg-msg.teacher .alg-msg-avatar{background:#d9f7e5;color:#148451}\n\n    .alg-msg-body{min-width:0}\n    .alg-msg-head{\n      display:flex;\n      justify-content:space-between;\n      gap:10px;\n      align-items:flex-start;\n    }\n    .alg-msg-title{\n      min-width:0;\n      color:#15215a;\n      font-size:14px;\n      line-height:1.35;\n      font-weight:900;\n    }\n    .alg-msg-title .role{\n      font-weight:700;\n      color:#4d6484;\n    }\n    .alg-msg-time{\n      color:#6f85a1;\n      font-size:12px;\n      line-height:1.2;\n      white-space:nowrap;\n      padding-top:2px;\n    }\n    .alg-msg-text{\n      margin-top:4px;\n      color:#21325f;\n      font-size:14px;\n      line-height:1.45;\n      white-space:pre-wrap;\n      word-break:break-word;\n    }\n\n    .alg-chat-form{\n      border:1.5px solid #d8e4f2;\n      border-radius:18px;\n      padding:12px 12px 12px 14px;\n      background:#fff;\n    }\n    .alg-chat-form textarea{\n      width:100%;\n      resize:none;\n      border:0;\n      outline:none;\n      min-height:72px;\n      max-height:140px;\n      color:#20315d;\n      font-size:14px;\n      line-height:1.5;\n      font-family:inherit;\n      background:transparent;\n    }\n    .alg-chat-form textarea::placeholder{color:#7b91a8}\n    .alg-chat-form-foot{\n      display:flex;\n      justify-content:space-between;\n      align-items:center;\n      gap:10px;\n      margin-top:8px;\n    }\n    .alg-chat-smile{\n      width:28px;height:28px;\n      border-radius:50%;\n      display:grid;place-items:center;\n      color:#4f6785;\n      font-size:18px;\n    }\n    .alg-chat-send{\n      min-width:110px;\n      display:inline-flex;\n      align-items:center;\n      justify-content:center;\n      gap:10px;\n      padding:12px 18px;\n      border-radius:14px;\n      border:0;\n      cursor:pointer;\n      background:linear-gradient(180deg,#6d7cff,#5869ff);\n      color:#fff;\n      font-size:13px;\n      font-weight:900;\n      box-shadow:0 8px 18px rgba(88,105,255,.18);\n    }\n\n    .alg-stat-grid{\n      display:grid;\n      grid-template-columns:repeat(2,minmax(0,1fr));\n      gap:12px;\n    }\n    .alg-stat{\n      padding:14px 16px;\n      border-radius:18px;\n      border:1px solid #e2ebf7;\n      min-height:90px;\n      display:flex;\n      flex-direction:column;\n      justify-content:space-between;\n      box-shadow:0 2px 10px rgba(39,81,119,.03);\n    }\n    .alg-stat .top{\n      display:flex;\n      justify-content:space-between;\n      gap:10px;\n      align-items:flex-start;\n    }\n    .alg-stat strong{\n      color:#2e58ef;\n      font-size:22px;\n      line-height:1;\n      font-weight:900;\n    }\n    .alg-stat span{\n      color:#58718d;\n      font-size:12px;\n      line-height:1.35;\n      font-weight:700;\n    }\n    .alg-stat .icon{\n      font-size:24px;\n      line-height:1;\n      opacity:.9;\n    }\n    .alg-stat.blue{background:#f4f8ff}\n    .alg-stat.green{background:#f2fff8}\n    .alg-stat.orange{background:#fff8ef}\n    .alg-stat.purple{background:#faf4ff}\n    .alg-stat.green strong{color:#0e8f57}\n    .alg-stat.orange strong{color:#ef7b00}\n    .alg-stat.purple strong{color:#7d31f4}\n\n    .alg-rules{\n      padding:18px 20px;\n    }\n    .alg-rules-list{\n      display:flex;\n      flex-direction:column;\n      gap:12px;\n      margin-top:8px;\n    }\n    .alg-rule-item{\n      display:grid;\n      grid-template-columns:26px 1fr;\n      gap:10px;\n      align-items:start;\n      color:#324867;\n      font-size:13px;\n      line-height:1.5;\n    }\n    .alg-rule-no{\n      width:26px;height:26px;\n      border-radius:50%;\n      background:#e9f1ff;\n      color:#3167ff;\n      display:grid;place-items:center;\n      font-weight:900;\n      font-size:13px;\n      flex:0 0 26px;\n    }\n\n    .alg-teacher-monitor{\n      margin-top:18px;\n      background:#fff;\n      border:1px solid #dde9f5;\n      border-radius:24px;\n      box-shadow:0 10px 28px rgba(39,81,119,.06);\n      overflow:hidden;\n    }\n    .alg-teacher-monitor-head{\n      padding:18px 20px;\n      border-bottom:1px solid #e6eef8;\n      display:flex;\n      justify-content:space-between;\n      gap:12px;\n      align-items:flex-start;\n    }\n    .alg-teacher-monitor-head h3{\n      margin:0 0 6px;\n      color:#162359;\n      font-size:18px;\n      font-weight:900;\n    }\n    .alg-teacher-monitor-head p{\n      margin:0;\n      color:#59718d;\n      font-size:12px;\n      line-height:1.5;\n    }\n    .alg-teacher-live{\n      display:inline-flex;\n      align-items:center;\n      gap:8px;\n      padding:8px 12px;\n      border-radius:999px;\n      background:#eefaf4;\n      border:1px solid #c8eed6;\n      color:#169257;\n      font-size:11px;\n      font-weight:900;\n      white-space:nowrap;\n    }\n    .alg-teacher-live i{\n      width:8px;height:8px;border-radius:50%;background:#18c06b;\n      box-shadow:0 0 0 4px rgba(24,192,107,.14);\n    }\n    .alg-teacher-group-tabs{\n      display:grid;\n      grid-template-columns:repeat(5,minmax(0,1fr));\n      gap:8px;\n      padding:14px 18px;\n      background:#f8fbff;\n      border-bottom:1px solid #e6eef8;\n    }\n    .alg-teacher-group-tab{\n      border:1px solid #dbe6f4;\n      background:#fff;\n      border-radius:14px;\n      padding:10px;\n      cursor:pointer;\n      text-align:left;\n    }\n    .alg-teacher-group-tab.active{\n      border-color:#88adff;\n      background:#eef4ff;\n      box-shadow:0 4px 10px rgba(74,132,255,.08);\n    }\n    .alg-teacher-group-tab b{\n      display:block;color:#162359;font-size:12px;font-weight:900;\n    }\n    .alg-teacher-group-tab span{\n      display:block;color:#657f99;font-size:10px;margin-top:4px;\n    }\n    .alg-teacher-group-tab em{\n      margin-top:8px;display:inline-grid;place-items:center;\n      min-width:26px;height:24px;padding:0 8px;\n      border-radius:999px;background:#eaf1fb;color:#445b75;\n      font-style:normal;font-size:10px;font-weight:900;\n    }\n    .alg-teacher-group-tab.active em{background:#5c74ff;color:#fff}\n    .alg-teacher-monitor-body{\n      display:grid;\n      grid-template-columns:minmax(0,1fr) 270px;\n    }\n    .alg-teacher-chat{padding:16px;border-right:1px solid #e6eef8}\n    .alg-teacher-chat-list{\n      height:360px;overflow:auto;padding:0;\n      display:flex;flex-direction:column;gap:12px;\n    }\n    .alg-teacher-msg{\n      display:grid;\n      grid-template-columns:1fr;\n      gap:0;\n      padding:14px;\n      border-radius:18px;\n      border:1px solid #e0eaf7;\n      background:#f8fbff;\n    }\n    .alg-teacher-msg.member-0{background:#f7fbff}\n    .alg-teacher-msg.member-1{background:#fcf8ff}\n    .alg-teacher-msg.member-2{background:#f7fff9}\n    .alg-teacher-msg.member-3{background:#fffbf3}\n    .alg-teacher-msg.member-4{background:#fff9fc}\n    .alg-teacher-msg.member-5{background:#f6feff}\n    .alg-teacher-msg-head{\n      display:flex;justify-content:space-between;gap:10px;align-items:flex-start;margin-bottom:4px;\n    }\n    .alg-teacher-msg-head-left b{\n      color:#172458;font-size:13px;font-weight:900;\n    }\n    .alg-role-label{\n      margin-left:6px;\n      display:inline-flex;\n      align-items:center;\n      padding:3px 8px;\n      border-radius:999px;\n      background:#eaf1fb;\n      color:#506884;\n      font-size:10px;\n      line-height:1;\n      font-weight:900;\n    }\n    .alg-teacher-msg-text{\n      color:#21325f;font-size:13px;line-height:1.5;white-space:pre-wrap;word-break:break-word;\n    }\n    .alg-teacher-empty{\n      height:100%;\n      display:grid;place-items:center;\n      text-align:center;color:#8095ab;font-size:12px;padding:20px;\n      border:1px dashed #dbe6f4;border-radius:18px;background:#f8fbff;\n    }\n    .alg-teacher-info{padding:16px}\n    .alg-teacher-info h4{\n      margin:0 0 12px;color:#162359;font-size:14px;font-weight:900;\n    }\n    .alg-teacher-info-card{\n      border:1px solid #e1ebf7;background:#f8fbff;\n      border-radius:16px;padding:12px 14px;margin-bottom:10px;\n    }\n    .alg-teacher-info-card small{\n      display:block;color:#6f85a1;font-size:10px;font-weight:900;letter-spacing:.04em;text-transform:uppercase;\n    }\n    .alg-teacher-info-card b{\n      display:block;color:#18255a;font-size:12px;line-height:1.45;margin-top:5px;\n    }\n    .alg-teacher-member-legend{\n      display:flex;flex-direction:column;gap:8px;\n    }\n    .alg-teacher-legend-row{\n      display:flex;align-items:center;gap:8px;color:#4a627f;font-size:11px;\n    }\n    .alg-teacher-legend-dot{\n      width:12px;height:12px;border-radius:50%;\n      background:#8eb3ff;\n    }\n    .alg-teacher-legend-row.member-0 .alg-teacher-legend-dot{background:#8cc0ff}\n    .alg-teacher-legend-row.member-1 .alg-teacher-legend-dot{background:#c58fff}\n    .alg-teacher-legend-row.member-2 .alg-teacher-legend-dot{background:#5ecf79}\n    .alg-teacher-legend-row.member-3 .alg-teacher-legend-dot{background:#f7c445}\n    .alg-teacher-legend-row.member-4 .alg-teacher-legend-dot{background:#ff92c3}\n    .alg-teacher-legend-row.member-5 .alg-teacher-legend-dot{background:#61d4df}\n\n\n    /* ===== V10 Teacher Team Manager ===== */\n    .alg-tm-shell{\n      background:transparent;\n      border:0;\n      box-shadow:none;\n      overflow:visible;\n      margin-top:18px;\n      font-family:inherit;\n    }\n    .alg-tm-heading{\n      display:flex;\n      justify-content:space-between;\n      gap:18px;\n      align-items:flex-start;\n      margin-bottom:14px;\n    }\n    .alg-tm-title-wrap{display:flex;gap:14px;align-items:center}\n    .alg-tm-title-icon{\n      width:54px;height:54px;border-radius:18px;\n      display:grid;place-items:center;\n      background:#e9f2ff;color:#2563eb;font-size:28px;flex:0 0 54px;\n    }\n    .alg-tm-heading h3{\n      margin:0 0 5px;color:#132354;font-size:22px;font-weight:900;line-height:1.15;\n    }\n    .alg-tm-heading p{\n      margin:0;color:#617995;font-size:12px;line-height:1.5;\n    }\n    .alg-tm-note{\n      max-width:460px;padding:12px 16px;border-radius:16px;\n      border:1px solid #cfe0fb;background:#f5f9ff;color:#536b8c;\n      font-size:11px;line-height:1.5;\n    }\n    .alg-tm-control{\n      display:grid;\n      grid-template-columns:330px minmax(360px,1fr) auto;\n      gap:16px;align-items:stretch;\n      background:#fff;border:1px solid #dce8f4;border-radius:22px;\n      box-shadow:0 9px 24px rgba(39,81,119,.05);\n      padding:16px;margin-bottom:16px;\n    }\n    .alg-tm-joined{\n      display:flex;gap:14px;align-items:center;\n      border-radius:18px;padding:15px 18px;\n      background:linear-gradient(135deg,#effdf7,#f4fff9);\n      border:1px solid #d4f2e2;\n    }\n    .alg-tm-joined-icon{\n      width:54px;height:54px;border-radius:50%;display:grid;place-items:center;\n      background:#d8f8e7;color:#0aa65e;font-size:27px;flex:0 0 54px;\n    }\n    .alg-tm-label{color:#4f6682;font-size:11px;font-weight:800}\n    .alg-tm-big{\n      display:flex;align-items:baseline;gap:7px;margin-top:3px;\n      color:#15215a;\n    }\n    .alg-tm-big strong{font-size:28px;font-weight:900;line-height:1}\n    .alg-tm-big span{font-size:15px;font-weight:800}\n    .alg-tm-online{\n      display:flex;align-items:center;gap:7px;margin-top:8px;\n      color:#478069;font-size:10px;font-weight:700;\n    }\n    .alg-tm-online i{width:9px;height:9px;border-radius:50%;background:#18bd6b}\n    .alg-tm-duration{\n      padding:6px 0 4px 16px;border-left:1px solid #e1eaf4;\n    }\n    .alg-tm-duration-head{display:flex;gap:8px;align-items:center;margin-bottom:4px}\n    .alg-tm-duration-head b{font-size:13px;color:#18295b}\n    .alg-tm-duration p{margin:0;color:#71859e;font-size:10px}\n    .alg-tm-duration-buttons{\n      display:grid;grid-template-columns:repeat(3,1fr);gap:5px;margin-top:13px;\n      max-width:420px;\n    }\n    .alg-tm-duration-btn{\n      min-height:44px;border-radius:12px;border:1px solid #d9e5f2;\n      background:#f7faff;color:#4b6280;font-size:12px;font-weight:900;cursor:pointer;\n    }\n    .alg-tm-duration-btn.active{\n      background:#eef5ff;color:#2462f3;border:2px solid #4c87ff;\n      box-shadow:0 3px 10px rgba(76,135,255,.08);\n    }\n    .alg-tm-actions{\n      display:flex;align-items:center;gap:10px;padding-left:16px;\n      border-left:1px solid #e1eaf4;\n    }\n    .alg-tm-action{\n      min-height:48px;padding:0 18px;border-radius:13px;\n      border:1px solid #cbdcf0;background:#fff;color:#193066;\n      font-size:12px;font-weight:900;cursor:pointer;white-space:nowrap;\n    }\n    .alg-tm-action.primary{\n      min-width:125px;border-color:#3475ff;\n      background:linear-gradient(180deg,#4f83ff,#2f68ef);\n      color:#fff;box-shadow:0 8px 18px rgba(52,117,255,.18);\n    }\n    .alg-tm-summary{\n      display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;margin-bottom:18px;\n    }\n    .alg-tm-summary-card{\n      min-height:92px;background:#fff;border:1px solid #dce8f4;border-radius:18px;\n      box-shadow:0 6px 18px rgba(39,81,119,.04);\n      display:flex;gap:14px;align-items:center;padding:15px 18px;\n    }\n    .alg-tm-summary-icon{\n      width:46px;height:46px;border-radius:50%;display:grid;place-items:center;\n      background:#eaf3ff;color:#2765e9;font-size:23px;flex:0 0 46px;\n    }\n    .alg-tm-summary-card.green .alg-tm-summary-icon{background:#e3faed;color:#11a15b}\n    .alg-tm-summary-card.orange .alg-tm-summary-icon{background:#fff3df;color:#ed8b00}\n    .alg-tm-summary-card.purple .alg-tm-summary-icon{background:#f2eaff;color:#7d35e9}\n    .alg-tm-summary-card small{display:block;color:#657b95;font-size:10px;font-weight:800}\n    .alg-tm-summary-card strong{\n      display:block;margin-top:4px;color:#142459;font-size:22px;font-weight:900;line-height:1.1;\n    }\n    .alg-tm-summary-card strong.ready{color:#0e9958}\n    .alg-tm-teams-head{\n      display:flex;justify-content:space-between;gap:12px;align-items:flex-end;margin-bottom:11px;\n    }\n    .alg-tm-teams-head h4{margin:0;color:#17265c;font-size:17px;font-weight:900}\n    .alg-tm-teams-head p{margin:4px 0 0;color:#6d829b;font-size:10px}\n    .alg-tm-team-total{\n      padding:8px 13px;border-radius:999px;background:#eef6ff;border:1px solid #cfe1fb;\n      color:#2864e8;font-size:10px;font-weight:900;white-space:nowrap;\n    }\n    .alg-tm-team-grid{\n      display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px;\n    }\n    .alg-tm-team{\n      min-width:0;background:#fff;border:1px solid #dce8f4;border-radius:18px;\n      box-shadow:0 6px 18px rgba(39,81,119,.04);padding:15px 14px;\n    }\n    .alg-tm-team-head{\n      display:grid;grid-template-columns:42px 1fr auto;gap:10px;align-items:center;margin-bottom:12px;\n    }\n    .alg-tm-team-icon{\n      width:42px;height:42px;border-radius:50%;display:grid;place-items:center;\n      background:#e0edff;color:#2465ec;font-size:20px;\n    }\n    .alg-tm-team.t2 .alg-tm-team-icon{background:#e4f8eb;color:#10a15a}\n    .alg-tm-team.t3 .alg-tm-team-icon{background:#fff0d6;color:#e68a00}\n    .alg-tm-team.t4 .alg-tm-team-icon{background:#f0e0ff;color:#8b36ef}\n    .alg-tm-team.t5 .alg-tm-team-icon{background:#ffe1ee;color:#db3d7b}\n    .alg-tm-team-head b{display:block;color:#142458;font-size:13px;font-weight:900}\n    .alg-tm-team-head small{display:block;color:#7488a0;font-size:10px;margin-top:3px}\n    .alg-tm-more{\n      width:30px;height:30px;border:0;background:transparent;color:#24426c;\n      border-radius:9px;font-size:21px;font-weight:900;cursor:pointer;line-height:1;\n    }\n    .alg-tm-more:hover{background:#eff5ff}\n    .alg-tm-member{\n      display:flex;align-items:center;gap:8px;min-width:0;margin:7px 0;\n      color:#445d7a;font-size:10px;\n    }\n    .alg-tm-initials{\n      width:28px;height:28px;border-radius:50%;display:grid;place-items:center;\n      background:#edf1f6;color:#57708e;font-size:9px;font-weight:900;flex:0 0 28px;\n    }\n    .alg-tm-member span:last-child{\n      overflow:hidden;text-overflow:ellipsis;white-space:nowrap;\n    }\n    .alg-tm-empty{color:#98a8ba;font-size:10px;padding:9px 0}\n    .alg-tm-tip{\n      margin-top:14px;padding:11px 15px;border-radius:14px;\n      border:1px solid #cde0fc;background:#eef6ff;color:#3565b4;\n      font-size:10px;line-height:1.5;\n    }\n\n    .alg-tm-overlay{\n      position:fixed;inset:0;z-index:99990;\n      background:rgba(20,43,65,.50);backdrop-filter:blur(2px);\n      display:grid;place-items:center;padding:24px;\n    }\n    .alg-tm-modal{\n      width:min(920px,94vw);max-height:88vh;background:#fff;border-radius:20px;\n      box-shadow:0 28px 80px rgba(13,35,60,.24);overflow:hidden;\n      border:1px solid #d8e4f0;\n    }\n    .alg-tm-modal-head{\n      min-height:84px;padding:14px 20px;\n      display:flex;justify-content:space-between;align-items:center;gap:14px;\n      border-bottom:1px solid #e4edf6;\n    }\n    .alg-tm-modal-title{display:flex;gap:12px;align-items:center}\n    .alg-tm-modal-icon{\n      width:50px;height:50px;border-radius:50%;display:grid;place-items:center;\n      background:#efe2ff;color:#933bea;font-size:24px;\n    }\n    .alg-tm-modal-head h3{margin:0;color:#162459;font-size:21px;font-weight:900}\n    .alg-tm-modal-head p{margin:3px 0 0;color:#71839d;font-size:11px}\n    .alg-tm-modal-actions{display:flex;gap:8px}\n    .alg-tm-icon-btn{\n      min-width:42px;height:42px;border-radius:11px;border:1px solid #d7e3f2;\n      background:#f8fbff;color:#1e3c68;font-size:18px;font-weight:900;cursor:pointer;\n    }\n    .alg-tm-detail-btn{\n      height:42px;border-radius:11px;border:1px solid #bfd8ff;background:#edf5ff;\n      color:#2463e8;padding:0 13px;font-size:11px;font-weight:900;cursor:pointer;\n    }\n    .alg-tm-chat-layout{\n      display:grid;grid-template-columns:260px 1fr;min-height:500px;max-height:calc(88vh - 84px);\n    }\n    .alg-tm-chat-members{\n      border-right:1px solid #e4edf6;padding:15px 14px;background:#fff;overflow:auto;\n    }\n    .alg-tm-chat-members-head{\n      display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;\n      color:#17265b;font-size:12px;font-weight:900;\n    }\n    .alg-tm-chat-person{\n      display:flex;align-items:center;gap:9px;padding:9px 8px;border-radius:12px;\n      color:#3e5877;font-size:10px;\n    }\n    .alg-tm-chat-person:first-of-type{background:#f7faff}\n    .alg-tm-person-avatar{\n      position:relative;width:38px;height:38px;border-radius:50%;display:grid;place-items:center;\n      background:#e9eef6;color:#3d5b82;font-weight:900;font-size:11px;flex:0 0 38px;\n    }\n    .alg-tm-person-avatar:after{\n      content:\"\";position:absolute;right:-1px;bottom:1px;width:9px;height:9px;\n      border-radius:50%;background:#13bc68;border:2px solid #fff;\n    }\n    .alg-tm-chat-main{\n      display:flex;flex-direction:column;min-width:0;background:#fff;\n    }\n    .alg-tm-chat-scroll{\n      flex:1;overflow:auto;padding:14px 20px 12px;min-height:370px;\n    }\n    .alg-tm-chat-date{\n      width:max-content;margin:0 auto 14px;padding:6px 12px;border-radius:999px;\n      background:#eff3f9;color:#637790;font-size:9px;font-weight:800;\n    }\n    .alg-tm-chat-msg{\n      display:flex;gap:10px;align-items:flex-start;margin:12px 0;\n    }\n    .alg-tm-chat-msg.teacher{justify-content:flex-end}\n    .alg-tm-chat-msg.teacher .alg-tm-msg-avatar{order:2;background:#dff5e9;color:#17804d}\n    .alg-tm-chat-msg.teacher .alg-tm-msg-wrap{align-items:flex-end}\n    .alg-tm-msg-avatar{\n      width:38px;height:38px;border-radius:50%;display:grid;place-items:center;\n      background:#ede3ff;color:#7e36df;font-size:11px;font-weight:900;flex:0 0 38px;\n    }\n    .alg-tm-msg-wrap{display:flex;flex-direction:column;max-width:72%}\n    .alg-tm-msg-meta{display:flex;gap:8px;align-items:center;margin:0 2px 4px}\n    .alg-tm-msg-meta b{color:#304767;font-size:9px}\n    .alg-tm-msg-meta span{color:#8295aa;font-size:8px}\n    .alg-tm-chat-bubble{\n      padding:10px 12px;border-radius:14px;background:#f0f3f7;\n      color:#324b69;font-size:10px;line-height:1.5;\n    }\n    .alg-tm-chat-msg.teacher .alg-tm-chat-bubble{background:#e8fbf0}\n    .alg-tm-chat-compose{\n      display:grid;grid-template-columns:42px 1fr 105px;gap:9px;\n      align-items:end;padding:13px 18px;border-top:1px solid #e4edf6;\n    }\n    .alg-tm-attach{\n      height:42px;border-radius:11px;border:1px solid #d7e3f2;background:#f7faff;\n      color:#2d5ca7;font-size:18px;cursor:pointer;\n    }\n    .alg-tm-chat-input{\n      min-height:42px;max-height:90px;resize:none;border-radius:11px;\n      border:1px solid #cdddf1;padding:11px 12px;font:inherit;font-size:10px;color:#334d6c;\n      outline:none;\n    }\n    .alg-tm-chat-send{\n      height:42px;border:0;border-radius:11px;background:linear-gradient(180deg,#4f83ff,#2f68ef);\n      color:#fff;font-size:11px;font-weight:900;cursor:pointer;\n    }\n\n    .alg-tm-manual{\n      width:min(720px,94vw);max-height:86vh;background:#fff;border-radius:20px;\n      box-shadow:0 28px 80px rgba(13,35,60,.24);overflow:hidden;border:1px solid #d8e4f0;\n    }\n    .alg-tm-manual-body{padding:15px 18px;max-height:62vh;overflow:auto}\n    .alg-tm-manual-row{\n      display:grid;grid-template-columns:1fr 140px;gap:12px;align-items:center;\n      padding:8px 0;border-bottom:1px solid #eef3f8;color:#405a77;font-size:11px;\n    }\n    .alg-tm-manual-row select{\n      height:36px;border:1px solid #d3e0ee;border-radius:10px;padding:0 9px;background:#fff;color:#2d4768;\n    }\n    .alg-tm-manual-foot{\n      padding:12px 18px;border-top:1px solid #e5edf6;display:flex;justify-content:flex-end;gap:9px;\n    }\n\n    @media(max-width:1250px){\n      .alg-tm-control{grid-template-columns:1fr 1fr}\n      .alg-tm-actions{grid-column:1/-1;border-left:0;padding-left:0;justify-content:flex-end}\n      .alg-tm-team-grid{grid-template-columns:repeat(3,minmax(0,1fr))}\n    }\n    @media(max-width:850px){\n      .alg-tm-heading{flex-direction:column}\n      .alg-tm-note{max-width:none}\n      .alg-tm-control{grid-template-columns:1fr}\n      .alg-tm-duration,.alg-tm-actions{border-left:0;padding-left:0}\n      .alg-tm-summary{grid-template-columns:repeat(2,minmax(0,1fr))}\n      .alg-tm-team-grid{grid-template-columns:repeat(2,minmax(0,1fr))}\n      .alg-tm-chat-layout{grid-template-columns:1fr}\n      .alg-tm-chat-members{display:none}\n    }\n\n    @media(max-width:1400px){\n      .alg-team-body{grid-template-columns:minmax(0,1fr) 330px}\n      .alg-member-row{grid-template-columns:repeat(3,minmax(0,1fr))}\n    }\n    @media(max-width:1100px){\n      .alg-team-body{grid-template-columns:1fr}\n      .alg-side{position:static}\n      .alg-member-row{grid-template-columns:repeat(2,minmax(0,1fr))}\n    }\n    @media(max-width:820px){\n      .alg-team-body{padding:0 12px}\n      .alg-hero-grid{grid-template-columns:1fr}\n      .alg-hero-icon{width:82px;height:82px;font-size:40px}\n      .alg-member-row,.alg-my-cards,.alg-board{grid-template-columns:1fr}\n      .alg-chat-send{min-width:96px}\n      .alg-teacher-monitor-body{grid-template-columns:1fr}\n      .alg-teacher-chat{border-right:0;border-bottom:1px solid #e6eef8}\n      .alg-teacher-group-tabs{grid-template-columns:repeat(2,minmax(0,1fr))}\n    }\n  `;\n\n  const safeId=s=>String(s||\"\").replace(/[^a-zA-Z0-9_-]/g,\"_\");\n  const esc=s=>String(s??\"\").replace(/[&<>\"']/g,m=>({\"&\":\"&amp;\",\"<\":\"&lt;\",\">\":\"&gt;\",'\"':\"&quot;\",\"'\":\"&#39;\"}[m]));\n  function hash(s){let h=2166136261;for(const c of String(s)){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}return Math.abs(h>>>0)}\n  function injectCss(){if(document.getElementById(\"algTeamCss\"))return;const x=document.createElement(\"style\");x.id=\"algTeamCss\";x.textContent=CSS;document.head.appendChild(x)}\n\n  function seededShuffle(arr,seed){\n    const a=[...arr]; let x=(seed||1)>>>0;\n    const rnd=()=>{x=(Math.imul(x,1664525)+1013904223)>>>0;return x/4294967296};\n    for(let i=a.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));[a[i],a[j]]=[a[j],a[i]]}\n    return a;\n  }\n\n\n  function currentSessionId(){\n    try{\n      const s=JSON.parse(localStorage.getItem(\"kelasExcelSettings\")||\"{}\");\n      return String(s.sessionId||\"default-session\");\n    }catch(_){\n      return \"default-session\";\n    }\n  }\n\n  function scenarioForGroup(className,groupIndex){\n    const session=currentSessionId();\n    const shuffled=seededShuffle(SCENARIOS,hash(`${GAME_VERSION}-${className}-${session}`));\n    return shuffled[groupIndex % shuffled.length];\n  }\n\n  function getStudent(){\n    const demo=(document.getElementById(\"studentIdentity\")?.textContent||\"\").includes(\"Demonstrasi Guru\");\n    if(demo)return{name:\"Demonstrasi Guru\",className:\"DEMO\",demo:true};\n    const name=(document.querySelector(\"#studentIdentity .student-hello\")?.textContent||\"\").replace(/^Halo,\\s*/,\"\").trim()\n      || document.getElementById(\"studentSelect\")?.value || \"Siswa\";\n    const className=document.getElementById(\"classSelect\")?.value || \"Kelas\";\n    return{name,className,demo:false};\n  }\n  function roster(){return [...(document.getElementById(\"studentSelect\")?.options||[])].map(o=>o.value).filter(Boolean)}\n\n  function buildFiveGroups(names){\n    const groups=Array.from({length:5},()=>[]);\n    const base=Math.floor(names.length/5), rem=names.length%5;\n    let cursor=0;\n    for(let g=0;g<5;g++){\n      const size=base+(g<rem?1:0);\n      groups[g]=names.slice(cursor,cursor+size);\n      cursor+=size;\n    }\n    return groups;\n  }\n\n  function stepsForGroup(scenario,size){\n    if(size<=4)return scenario.steps.filter(x=>x.l===0);\n    if(size===5)return scenario.steps.filter(x=>x.l<=1);\n    return scenario.steps.filter(x=>x.l<=2);\n  }\n\n  function setup(){\n    GAME.student=getStudent();GAME.demo=GAME.student.demo;\n    const r=roster();\n    if(GAME.demo && !r.length){\n      GAME.groupIndex=0;GAME.groupNo=1;GAME.members=[\"Demonstrasi Guru\",\"Anggota 2\",\"Anggota 3\",\"Anggota 4\",\"Anggota 5\"];\n    }else{\n      const groups=buildFiveGroups(r);\n      let gi=groups.findIndex(g=>g.includes(GAME.student.name));\n      if(gi<0)gi=0;\n      GAME.groupIndex=gi;GAME.groupNo=gi+1;GAME.members=groups[gi];\n    }\n    GAME.slot=Math.max(0,GAME.members.indexOf(GAME.student.name));\n    GAME.scenario=scenarioForGroup(GAME.student.className,GAME.groupIndex);\n    GAME.steps=stepsForGroup(GAME.scenario,GAME.members.length);\n\n    const ids=GAME.steps.map((_,i)=>i);\n    const shuffled=seededShuffle(ids,hash(`${GAME_VERSION}-${GAME.student.className}-${GAME.groupNo}-${GAME.scenario.id}`));\n    GAME.assigned=shuffled.slice(GAME.slot*4,GAME.slot*4+4).sort((a,b)=>hash(`${a}-card`)-hash(`${b}-card`));\n  }\n\n  function occupied(){return new Set(Object.values(GAME.board).map(x=>Number(x.stepId)))}\n  function mineStats(){return GAME.meta?.members?.[safeId(GAME.student.name)]||{}}\n  function currentPhase(index){\n    const n=GAME.steps.length, phase=Math.min(4,Math.floor(index/(n/5)));\n    return GAME.scenario.phases[phase]||\"bagian akhir algoritma\";\n  }\n\n\n  function formatClock(ts){\n    const d=new Date(Number(ts)||Date.now());\n    const hh=String(d.getHours()).padStart(2,\"0\");\n    const mm=String(d.getMinutes()).padStart(2,\"0\");\n    return `${hh}.${mm}`;\n  }\n\n\n  function memberIndexByName(name,members=GAME.members){\n    const idx=(members||[]).indexOf(name);\n    return idx>=0?idx:0;\n  }\n  function memberLabelByName(name,members=GAME.members){\n    const idx=memberIndexByName(name,members);\n    return `Anggota ${idx+1}`;\n  }\n\n  function sendableMessage(v){\n    return String(v||\"\").replace(/\\s+/g,\" \").trim().slice(0,300);\n  }\n\n  function render(){\n    const panel=GAME.panel;if(!panel||!panel.isConnected)return;\n    const used=occupied(), mineCount=Object.values(GAME.board).filter(x=>x.owner===GAME.student.name).length;\n    const full=Object.keys(GAME.board).length===GAME.steps.length, stats=mineStats();\n    const header=panel.querySelector(\".l2-window-header\");\n    const size=GAME.members.length;\n\n    const badgeData=[\n      {text:`${size} anggota`, color:\"blue\", icon:\"👥\"},\n      {text:`${GAME.steps.length} langkah`, color:\"purple\", icon:\"☰\"},\n      {text:\"4 kartu / siswa\", color:\"green\", icon:\"▣\"},\n      {text:\"Bank 50 algoritma\", color:\"orange\", icon:\"◉\"},\n      {text:\"Diacak tiap sesi\", color:\"purple\", icon:\"⤮\"}\n    ];\n\n    const badges=badgeData.map(x=>`<span class=\"alg-badge ${x.color}\"><span>${x.icon}</span><span>${x.text}</span></span>`).join(\"\");\n\n    const memberStrip=GAME.members.map((m,i)=>`\n      <div class=\"alg-member-chip member-${i} ${m===GAME.student.name?\"active\":\"\"}\">\n        <span class=\"alg-avatar\">${i+1}</span>\n        <div>\n          <b>${esc(m)}</b>\n          <small>${m===GAME.student.name?\"Anda · \":\"\"}Anggota ${i+1}${m===GAME.student.name?\"\":\"<br>4 kartu\"}</small>\n        </div>\n      </div>`).join(\"\");\n\n    const cards=GAME.assigned.map(id=>`\n      <button class=\"alg-my-card ${GAME.selected===id?\"selected\":\"\"} ${used.has(id)?\"placed\":\"\"}\" data-card=\"${id}\" ${used.has(id)?\"disabled\":\"\"}>\n        <b>KARTU MILIK ANDA</b>\n        <span>${esc(GAME.steps[id]?.t||\"\")}</span>\n      </button>`).join(\"\");\n\n    const board=Array.from({length:GAME.steps.length},(_,i)=>{\n      const x=GAME.board[i], mine=x?.owner===GAME.student.name;\n      return `<div class=\"alg-slot ${x?\"filled\":\"\"} ${mine?\"mine\":\"\"} ${GAME.completed?\"correct-final\":\"\"}\" data-slot=\"${i}\">\n        <span class=\"alg-slot-no\">${i+1}</span>\n        <div>\n          ${x?`<span class=\"alg-slot-text\">${esc(GAME.steps[x.stepId]?.t||\"\")}</span><small class=\"alg-slot-owner\">${mine?\"Kartu Anda\":`oleh ${esc(x.owner||\"anggota\")}`}</small>`:`<span class=\"alg-slot-text\" style=\"color:#90a3b9;font-weight:700\">Klik untuk menempatkan kartu</span>`}\n        </div>\n      </div>`;\n    }).join(\"\");\n\n    const chatHtml=(GAME.chat||[]).length\n      ? GAME.chat.map(msg=>{\n          const isTeacher=msg.role===\"teacher\";\n          const mi=isTeacher?0:memberIndexByName(msg.name);\n          const initials=isTeacher?\"G\":(msg.name||\"A\").split(/\\s+/).slice(0,2).map(x=>x[0]||\"\").join(\"\").toUpperCase();\n          return `<div class=\"alg-msg ${isTeacher?\"teacher\":`member-${mi}`} ${msg.name===GAME.student.name?\"mine\":\"\"}\">\n            <div class=\"alg-msg-avatar\">${esc(initials||\"A\")}</div>\n            <div class=\"alg-msg-body\">\n              <div class=\"alg-msg-head\">\n                <div class=\"alg-msg-title\">${esc(isTeacher?\"Guru\":(msg.name||\"Anggota\"))} <span class=\"role\">${isTeacher?\"(Guru)\":`(Anggota ${mi+1})`}</span></div>\n                <span class=\"alg-msg-time\">${formatClock(msg.at)}</span>\n              </div>\n              <div class=\"alg-msg-text\">${esc(msg.text||\"\")}</div>\n            </div>\n          </div>`;\n        }).join(\"\")\n      : '<div class=\"alg-chat-empty\">Belum ada pesan. Gunakan chat ini untuk menyampaikan isi kartu, mendiskusikan urutan, dan memberi usulan revisi.</div>';\n\n    const body=document.createElement(\"div\");\n    body.className=\"alg-team-shell\";\n    body.innerHTML=`\n      <div class=\"alg-team-body\">\n        <main class=\"alg-main\">\n          <section class=\"alg-hero\">\n            <div class=\"alg-hero-grid\">\n              <div class=\"alg-hero-icon\">🎯</div>\n              <div class=\"alg-hero-copy\">\n                <h3>Kelompok ${GAME.groupNo}: ${esc(GAME.scenario.title)}</h3>\n                <p>${esc(GAME.scenario.goal)}</p>\n                <div class=\"alg-badges\">${badges}</div>\n              </div>\n            </div>\n          </section>\n\n          <section class=\"alg-card alg-members\">\n            <div class=\"alg-block-head\">\n              <div class=\"alg-head-icon green\">👥</div>\n              <div>\n                <h4>Anggota Kelompok</h4>\n                <p>${size} siswa × 4 kartu = ${GAME.steps.length} langkah</p>\n              </div>\n            </div>\n            <div class=\"alg-member-row\">${memberStrip}</div>\n          </section>\n\n          <section class=\"alg-card alg-section\">\n            <div class=\"alg-section-head\">\n              <div class=\"alg-block-head\" style=\"margin:0\">\n                <div class=\"alg-head-icon blue\">🗂️</div>\n                <div>\n                  <h4>1. Empat kartu Anda</h4>\n                  <p>Jelaskan isi kartu kepada kelompok, lalu sepakati posisinya. Anggota lain tidak dapat memindahkan kartu Anda.</p>\n                </div>\n              </div>\n              <div class=\"alg-counter\">${mineCount}/4 ditempatkan</div>\n            </div>\n            <div class=\"alg-my-cards\">${cards}</div>\n            ${GAME.selected!==null?'<div class=\"alg-helper\">Kartu dipilih. Sekarang klik salah satu slot kosong pada papan algoritma.</div>':\"\"}\n          </section>\n\n          <section class=\"alg-card alg-section\">\n            <div class=\"alg-section-head\">\n              <div class=\"alg-block-head\" style=\"margin:0\">\n                <div class=\"alg-head-icon info\">↕️</div>\n                <div>\n                  <h4>2. Papan algoritma kelompok</h4>\n                  <p>Susun semua langkah algoritma bersama kelompok. Uji setelah seluruh slot terisi.</p>\n                </div>\n              </div>\n              <div class=\"alg-counter\" style=\"color:#20315d\">${Object.keys(GAME.board).length}/${GAME.steps.length} terisi</div>\n            </div>\n            <div class=\"alg-board\">${board}</div>\n            <div class=\"alg-actions\">\n              <button class=\"alg-btn primary\" id=\"algTest\" ${full?\"\":\"disabled\"}>▶ Uji Algoritma</button>\n              <button class=\"alg-btn secondary\" id=\"algClearMine\" ${mineCount?\"\":\"disabled\"}>↶ Ambil Semua Kartu Saya</button>\n              ${GAME.completed?'<button class=\"alg-btn success\" id=\"algFinish\">✓ Simpan Nilai & Selesai</button>':\"\"}\n            </div>\n            <div class=\"${GAME.completed?\"alg-feedback ok\":\"alg-feedback\"}\">${esc(GAME.lastHint)}</div>\n          </section>\n        </main>\n\n        <aside class=\"alg-side\">\n          <section class=\"alg-card alg-side-card\">\n            <div class=\"alg-title-row\">\n              <h4>💬 Chat Kelompok</h4>\n              <span class=\"alg-chat-count\">${(GAME.chat||[]).length} pesan</span>\n            </div>\n            <p class=\"alg-chat-desc\">Gunakan area ini untuk menyampaikan isi kartu, mendiskusikan urutan, dan memberi usulan revisi.</p>\n            <div id=\"algChatList\" class=\"alg-chat-list\">${chatHtml}</div>\n            <div class=\"alg-chat-form\">\n              <textarea id=\"algChatInput\" placeholder=\"Tulis pesan untuk kelompok, misalnya: kartu saya sepertinya cocok di langkah 7 ...\"></textarea>\n              <div class=\"alg-chat-form-foot\">\n                <div class=\"alg-chat-smile\">☺</div>\n                <button id=\"algSendChat\" class=\"alg-chat-send\">✈ Kirim</button>\n              </div>\n            </div>\n          </section>\n\n          <section class=\"alg-card alg-side-card\">\n            <div class=\"alg-title-row\" style=\"margin-bottom:14px\">\n              <h4>📊 Kontribusi Saya</h4>\n            </div>\n            <div class=\"alg-stat-grid\">\n              <div class=\"alg-stat blue\">\n                <div class=\"top\"><strong>${stats.placements||0}</strong><div class=\"icon\">🗂</div></div>\n                <span>Penempatan</span>\n              </div>\n              <div class=\"alg-stat green\">\n                <div class=\"top\"><strong>${stats.revisions||0}</strong><div class=\"icon\">✎</div></div>\n                <span>Revisi</span>\n              </div>\n              <div class=\"alg-stat orange\">\n                <div class=\"top\"><strong>${stats.tests||0}</strong><div class=\"icon\">▷</div></div>\n                <span>Uji</span>\n              </div>\n              <div class=\"alg-stat purple\">\n                <div class=\"top\"><strong>${mineCount}/4</strong><div class=\"icon\">▣</div></div>\n                <span>Kartu di papan</span>\n              </div>\n            </div>\n          </section>\n\n          <section class=\"alg-card alg-rules\">\n            <div class=\"alg-title-row\">\n              <h4>ℹ Aturan Permainan</h4>\n            </div>\n            <div class=\"alg-rules-list\">\n              <div class=\"alg-rule-item\"><span class=\"alg-rule-no\">1</span><span>Ikuti instruksi dari guru.</span></div>\n              <div class=\"alg-rule-item\"><span class=\"alg-rule-no\">2</span><span>Diskusikan urutan kartu dengan kelompok.</span></div>\n              <div class=\"alg-rule-item\"><span class=\"alg-rule-no\">3</span><span>Setiap anggota tidak dapat memindahkan kartu anggota lain.</span></div>\n              <div class=\"alg-rule-item\"><span class=\"alg-rule-no\">4</span><span>Capai semua langkah dengan urutan yang benar.</span></div>\n            </div>\n          </section>\n        </aside>\n      </div>`;\n\n    [...panel.children].forEach(el=>{if(el!==header)el.remove()});\n    panel.appendChild(body);\n    bind();\n  }\n\n  async function bump(delta){\n    const key=safeId(GAME.student.name);\n    if(GAME.demo){\n      GAME.meta.members ||= {};GAME.meta.members[key]={...(GAME.meta.members[key]||{})};\n      Object.entries(delta).forEach(([k,v])=>GAME.meta.members[key][k]=(GAME.meta.members[key][k]||0)+v);return;\n    }\n    const ref=GAME.rootRef.child(`members/${key}`);\n    for(const [k,v] of Object.entries(delta))await ref.child(k).transaction(n=>(Number(n)||0)+v);\n    await ref.update({name:GAME.student.name,slot:GAME.slot,lastSeen:Date.now()});\n  }\n\n  async function place(id,pos){\n    if(GAME.board[pos])return;\n    if(GAME.demo){GAME.board[pos]={stepId:id,owner:GAME.student.name};await bump({placements:1});render();return}\n    const snap=await GAME.rootRef.child(`board/${pos}`).once(\"value\");if(snap.exists())return;\n    await GAME.rootRef.child(`board/${pos}`).set({stepId:id,owner:GAME.student.name,at:Date.now()});\n    await bump({placements:1});\n  }\n\n  async function removeAt(pos){\n    const x=GAME.board[pos];if(!x||x.owner!==GAME.student.name)return;\n    if(GAME.demo){delete GAME.board[pos];await bump({revisions:1});render();return}\n    await GAME.rootRef.child(`board/${pos}`).remove();await bump({revisions:1});\n  }\n\n  async function clearMine(){\n    const own=Object.entries(GAME.board).filter(([,x])=>x.owner===GAME.student.name);if(!own.length)return;\n    if(GAME.demo){own.forEach(([p])=>delete GAME.board[p]);await bump({revisions:own.length});render();return}\n    const updates={};own.forEach(([p])=>updates[p]=null);\n    await GAME.rootRef.child(\"board\").update(updates);await bump({revisions:own.length});\n  }\n\n  async function test(){\n    if(Object.keys(GAME.board).length!==GAME.steps.length)return;\n    await bump({tests:1});\n    const arr=Array.from({length:GAME.steps.length},(_,i)=>Number(GAME.board[i]?.stepId));\n    const wrong=arr.findIndex((id,i)=>id!==i);\n\n    if(wrong<0){\n      GAME.completed=true;\n      GAME.lastHint=`✓ Algoritma benar. Kelompok ${GAME.groupNo} berhasil menyusun seluruh ${GAME.steps.length} langkah.`;\n      if(!GAME.demo)await GAME.rootRef.update({completed:true,completedAt:Date.now(),scenarioId:GAME.scenario.id,stepCount:GAME.steps.length,version:GAME_VERSION});\n      render();return;\n    }\n\n    GAME.completed=false;\n    GAME.lastHint=`✕ Belum benar. Masalah pertama terdeteksi di sekitar posisi ${wrong+1}, pada tahap ${currentPhase(wrong)}. Periksa hubungan langkah sebelum dan sesudahnya.`;\n    render();\n  }\n\n  function individualScore(){\n    const s=mineStats();\n    const placement=Math.min(16,(s.placements||0)*4);\n    const revision=Math.min(6,(s.revisions||0)*2);\n    const testing=Math.min(8,(s.tests||0)*4);\n    return Math.max(70,Math.min(100,70+placement+revision+testing));\n  }\n\n  async function finish(){\n    if(GAME.demo){GAME.lastHint=\"✓ Mode demonstrasi selesai. Pada akun siswa, hasil akan tersimpan ke dashboard guru.\";render();return}\n\n    let progress={};try{progress=JSON.parse(localStorage.getItem(\"kelasExcelProgress\"))||{}}catch(_){}\n    const rec=Object.values(progress).find(r=>r&&r.name===GAME.student.name&&r.className===GAME.student.className);\n    if(!rec){GAME.lastHint=\"Algoritma benar, tetapi data progres siswa tidak ditemukan. Muat ulang lalu login kembali.\";render();return}\n\n    rec.completedExercises ||= Array(8).fill(false);\n    rec.exerciseScores ||= Array(8).fill(null);\n    rec.exerciseCompletedAt ||= Array(8).fill(null);\n    rec.exerciseCompletedSeconds ||= Array(8).fill(null);\n    rec.exerciseStartedAt ||= Array(8).fill(null);\n    rec.exerciseState ||= {};\n\n    rec.completedExercises[6]=true;\n    rec.exerciseScores[6]=individualScore();\n    rec.exerciseCompletedAt[6]=Date.now();\n    const start=Number(rec.exerciseStartedAt[6])||Date.now();\n    rec.exerciseCompletedSeconds[6]=Math.max(1,Math.min(3600,Math.floor((Date.now()-start)/1000)));\n    rec.exerciseState[6]={\n      ...(rec.exerciseState[6]||{}),\n      teamAlgorithm:{\n        version:GAME_VERSION,\n        groupNo:GAME.groupNo,\n        groupSize:GAME.members.length,\n        scenarioId:GAME.scenario.id,\n        scenarioTitle:GAME.scenario.title,\n        stepCount:GAME.steps.length,\n        contribution:mineStats()\n      }\n    };\n\n    const nums=rec.exerciseScores.filter(Number.isFinite);\n    rec.score=Math.round(nums.reduce((a,b)=>a+b,0)/Math.max(1,nums.length));\n    localStorage.setItem(\"kelasExcelProgress\",JSON.stringify(progress));\n\n    try{\n      await firebase.database().ref(`kelasExcel/progress/${safeId(`${rec.className}::${rec.name}`)}`).set(rec);\n    }catch(_){}\n\n    GAME.lastHint=`✓ Nilai individu ${rec.exerciseScores[6]}/100 tersimpan. Muat ulang halaman agar status Latihan 7 pada menu diperbarui.`;\n    render();\n  }\n\n\n  async function pushChatMessage(raw){\n    const text=sendableMessage(raw);\n    if(!text) return false;\n\n    const payload={name:GAME.student.name,text,at:Date.now()};\n    if(GAME.demo){\n      GAME.chat ||= [];\n      GAME.chat.push(payload);\n      if(GAME.chat.length>50) GAME.chat=GAME.chat.slice(-50);\n      render();\n      const box=GAME.panel?.querySelector(\"#algChatList\"); if(box) box.scrollTop=box.scrollHeight;\n      return true;\n    }\n\n    if(!GAME.rootRef) return false;\n    const ref=GAME.rootRef.child(\"chat\").push();\n    await ref.set(payload);\n    return true;\n  }\n\n  function bind(){\n    const p=GAME.panel;\n    p.querySelectorAll(\"[data-card]\").forEach(b=>b.addEventListener(\"click\",()=>{GAME.selected=Number(b.dataset.card);render()}));\n    p.querySelectorAll(\"[data-slot]\").forEach(s=>s.addEventListener(\"click\",async()=>{\n      const pos=Number(s.dataset.slot),x=GAME.board[pos];\n      if(x?.owner===GAME.student.name){GAME.selected=null;await removeAt(pos);return}\n      if(x||GAME.selected===null)return;\n      const id=GAME.selected;GAME.selected=null;await place(id,pos);\n    }));\n    p.querySelector(\"#algTest\")?.addEventListener(\"click\",test);\n    p.querySelector(\"#algClearMine\")?.addEventListener(\"click\",clearMine);\n    p.querySelector(\"#algFinish\")?.addEventListener(\"click\",finish);\n    const chatInput=p.querySelector(\"#algChatInput\");\n    const sendBtn=p.querySelector(\"#algSendChat\");\n    const doSend=async()=>{\n      if(!chatInput) return;\n      const ok=await pushChatMessage(chatInput.value);\n      if(ok){\n        chatInput.value=\"\";\n        const box=GAME.panel?.querySelector(\"#algChatList\");\n        if(box) box.scrollTop=box.scrollHeight;\n        chatInput.focus();\n      }\n    };\n    sendBtn?.addEventListener(\"click\",doSend);\n    chatInput?.addEventListener(\"keydown\",e=>{\n      if(e.key===\"Enter\" && !e.shiftKey){\n        e.preventDefault();\n        doSend();\n      }\n    });\n    const box=p.querySelector(\"#algChatList\");\n    if(box) requestAnimationFrame(()=>{box.scrollTop=box.scrollHeight;});\n  }\n\n  function disconnect(){\n    if(GAME.rootRef){try{GAME.rootRef.off()}catch(_){}}\n    GAME.rootRef=null;\n  }\n\n  function connect(){\n    disconnect();\n    if(GAME.demo||!window.firebase?.database){GAME.board={};GAME.meta={members:{}};GAME.chat=[];render();return}\n\n    GAME.rootRef=firebase.database().ref(`kelasExcel/algorithmTeamV3/${safeId(GAME.student.className)}/${safeId(currentSessionId())}/group_${GAME.groupNo}`);\n    GAME.rootRef.child(\"board\").on(\"value\",snap=>{GAME.board=snap.val()||{};render()});\n    GAME.rootRef.child(\"chat\").limitToLast(60).on(\"value\",snap=>{\n      const v=snap.val()||{};\n      GAME.chat=Object.values(v).sort((a,b)=>(Number(a.at)||0)-(Number(b.at)||0));\n      render();\n    });\n    GAME.rootRef.on(\"value\",snap=>{\n      const v=snap.val()||{};\n      GAME.meta=v;\n      GAME.completed=!!v.completed;\n      if(GAME.completed)GAME.lastHint=`✓ Kelompok ${GAME.groupNo} telah menyelesaikan ${GAME.steps.length} langkah dengan benar.`;\n      render();\n    });\n    GAME.rootRef.update({\n      version:GAME_VERSION,\n      groupNo:GAME.groupNo,\n      groupSize:GAME.members.length,\n      scenarioId:GAME.scenario.id,\n      scenarioTitle:GAME.scenario.title,\n      stepCount:GAME.steps.length,\n      bankSize:SCENARIOS.length,\n      sessionId:currentSessionId()\n    });\n    GAME.rootRef.child(`members/${safeId(GAME.student.name)}`).update({name:GAME.student.name,slot:GAME.slot,lastSeen:Date.now()});\n  }\n\n\n  function teacherSelectedClassFromDom(){\n    return document.querySelector(\"[data-teacher-class].active\")?.dataset.teacherClass\n      || document.querySelector(\"[data-teacher-class]\")?.dataset.teacherClass\n      || \"3P\";\n  }\n\n  function teacherRosterForClass(className){\n    const rows=[...document.querySelectorAll(\"#teacherTableBody tr\")];\n    const names=rows.map(row=>{\n      const cells=row.querySelectorAll(\"td\");\n      if(!cells.length) return \"\";\n      const name=(cells[0]?.textContent||\"\").trim();\n      const cls=(cells[1]?.textContent||\"\").trim();\n      return (!className || !cls || cls===className) ? name : \"\";\n    }).filter(Boolean);\n    if(names.length) return [...new Set(names)];\n\n    const selectedClass=document.getElementById(\"classSelect\")?.value;\n    if(selectedClass===className){\n      return [...(document.getElementById(\"studentSelect\")?.options||[])]\n        .map(o=>o.value).filter(Boolean);\n    }\n    return [];\n  }\n\n  function teacherManagerPath(){\n    const tm=GAME.teacherMonitor;\n    return `kelasExcel/algorithmManagerV10/${safeId(tm.className||\"Kelas\")}/${safeId(currentSessionId())}`;\n  }\n\n  function teacherStopMonitorListeners(){\n    const tm=GAME.teacherMonitor;\n    if(tm.groupRef){try{tm.groupRef.off()}catch(_){} tm.groupRef=null;}\n    if(tm.managerRef){try{tm.managerRef.off()}catch(_){} tm.managerRef=null;}\n    if(tm.presenceRef){try{tm.presenceRef.off()}catch(_){} tm.presenceRef=null;}\n    (tm.countRefs||[]).forEach(ref=>{try{ref.off()}catch(_){}});\n    tm.countRefs=[];\n  }\n\n  function teacherGroupMembersFromMeta(meta){\n    return Object.values(meta?.members||{})\n      .filter(x=>x&&x.name)\n      .sort((a,b)=>(Number(a.slot)||0)-(Number(b.slot)||0))\n      .map(x=>x.name);\n  }\n\n  function teacherInitials(name){\n    return String(name||\"?\").trim().split(/\\s+/).slice(0,2).map(x=>x[0]||\"\").join(\"\").toUpperCase();\n  }\n\n  function teacherBalancedTeams(roster,shuffle=false){\n    let names=[...new Set(roster.filter(Boolean))];\n    if(shuffle){\n      names=seededShuffle(names,Date.now()>>>0);\n    }\n    const groups=Array.from({length:5},()=>[]);\n    names.forEach((name,i)=>groups[i%5].push(name));\n    return groups;\n  }\n\n  function normalizeTeacherTeams(raw,roster){\n    if(raw){\n      const teams=Array.from({length:5},(_,i)=>{\n        const v=raw[i] ?? raw[String(i)] ?? raw[i+1] ?? raw[String(i+1)];\n        if(Array.isArray(v)) return v.filter(Boolean);\n        if(v && typeof v===\"object\") return Object.values(v).filter(Boolean);\n        return [];\n      });\n      if(teams.some(t=>t.length)) return teams;\n    }\n    return teacherBalancedTeams(roster,false);\n  }\n\n  async function teacherSaveManager(partial){\n    const tm=GAME.teacherMonitor;\n    tm.manager={...(tm.manager||{}),...partial};\n    if(window.firebase?.database && tm.className){\n      await firebase.database().ref(teacherManagerPath()).update(partial);\n    }\n    renderTeacherMonitor();\n  }\n\n  function teacherListenManager(){\n    const tm=GAME.teacherMonitor;\n    if(tm.managerRef){try{tm.managerRef.off()}catch(_){}}\n    if(!window.firebase?.database || !tm.className) return;\n    tm.managerRef=firebase.database().ref(teacherManagerPath());\n    tm.managerRef.on(\"value\",snap=>{\n      const previous=tm.manager||{};\n      const next={duration:50,teams:null,started:false,...(snap.val()||{})};\n\n      const prevTeams=JSON.stringify(previous.teams||null);\n      const nextTeams=JSON.stringify(next.teams||null);\n      const teamsChanged=prevTeams!==nextTeams;\n      const startedChanged=!!previous.started!==!!next.started;\n\n      // Saat jumlah tim diganti, V22/V23 memang membersihkan \"teams\".\n      // Itu termasuk perubahan kontrol ringan dan tidak perlu membangun ulang\n      // seluruh panel guru.\n      const teamCountChanged=Number(previous.teamCount||5)!==Number(next.teamCount||5);\n      const assignmentClearedForTeamCount=teamCountChanged && teamsChanged && !next.teams;\n\n      tm.manager=next;\n\n      // Render penuh hanya untuk perubahan struktural yang benar-benar\n      // membutuhkan daftar anggota/papan baru.\n      if(startedChanged || (teamsChanged && !assignmentClearedForTeamCount)){\n        renderTeacherMonitor();\n      }\n    });\n  }\n\n  function teacherListenPresence(){\n    const tm=GAME.teacherMonitor;\n    if(tm.presenceRef){try{tm.presenceRef.off()}catch(_){}}\n\n    // Jangan gunakan kelasExcel/progress sebagai indikator \"siswa yang masuk\".\n    // Progress berisi siswa yang pernah mengerjakan sehingga dapat menampilkan\n    // seluruh roster kelas (misalnya 25 siswa) walaupun tidak ada yang sedang\n    // membuka Latihan Algoritma.\n    tm.joinedNames=[];\n    tm.presenceLoaded=false;\n\n    if(!window.firebase?.database || !tm.className) return;\n\n    const session=safeId(currentSessionId());\n    tm.presenceRef=firebase.database().ref(\n      `kelasExcel/algorithmTeamV3/${safeId(tm.className)}/${session}/lobbyV11`\n    );\n\n    tm.presenceRef.on(\"value\",snap=>{\n      const now=Date.now();\n      const data=snap.val()||{};\n\n      tm.joinedNames=[...new Set(\n        Object.values(data)\n          .filter(x=>\n            x &&\n            x.name &&\n            (!x.className || x.className===tm.className) &&\n            now-Number(x.lastSeen||0)<=70000\n          )\n          .map(x=>x.name)\n      )].sort((a,b)=>a.localeCompare(b,\"id\"));\n\n      tm.presenceLoaded=true;\n      renderTeacherMonitor();\n    });\n  }\n\n  function teacherListenCounts(){\n    const tm=GAME.teacherMonitor;\n    (tm.countRefs||[]).forEach(ref=>{try{ref.off()}catch(_){}});\n    tm.countRefs=[];\n    tm.counts=[0,0,0,0,0];\n    if(!window.firebase?.database || !tm.className) return;\n    const session=safeId(currentSessionId());\n    for(let i=1;i<=5;i++){\n      const ref=firebase.database().ref(`kelasExcel/algorithmTeamV3/${safeId(tm.className)}/${session}/group_${i}/chat`);\n      ref.on(\"value\",snap=>{\n        tm.counts[i-1]=snap.numChildren();\n        if(tm.modalOpen && tm.groupNo===i) renderTeacherMonitor();\n      });\n      tm.countRefs.push(ref);\n    }\n  }\n\n  function teacherListenSelectedGroup(){\n    const tm=GAME.teacherMonitor;\n    if(tm.groupRef){try{tm.groupRef.off()}catch(_){} tm.groupRef=null;}\n    tm.messages=[];\n    tm.groupMeta={};\n    if(!window.firebase?.database || !tm.className) return;\n\n    const session=safeId(currentSessionId());\n    tm.groupRef=firebase.database().ref(`kelasExcel/algorithmTeamV3/${safeId(tm.className)}/${session}/group_${tm.groupNo}`);\n    tm.groupRef.on(\"value\",snap=>{\n      const data=snap.val()||{};\n      tm.groupMeta=data;\n      const raw=data.chat||{};\n      tm.messages=Object.values(raw).sort((a,b)=>(Number(a.at)||0)-(Number(b.at)||0)).slice(-100);\n      if(tm.modalOpen) renderTeacherMonitor();\n    });\n  }\n\n  async function teacherSendChat(textValue){\n    const tm=GAME.teacherMonitor;\n    const msg=String(textValue||\"\").trim().slice(0,500);\n    if(!msg || !window.firebase?.database) return;\n    const session=safeId(currentSessionId());\n    const ref=firebase.database().ref(`kelasExcel/algorithmTeamV3/${safeId(tm.className)}/${session}/group_${tm.groupNo}/chat`).push();\n    await ref.set({name:\"Guru\",role:\"teacher\",text:msg,at:Date.now()});\n  }\n\n  function teacherChatMessagesHtml(messages,members){\n    if(!messages?.length){\n      return '<div class=\"alg-teacher-empty\" style=\"min-height:330px\">Belum ada chat pada tim ini.</div>';\n    }\n    return messages.map(msg=>{\n      const isTeacher=msg.role===\"teacher\";\n      let idx=members.indexOf(msg.name);\n      if(idx<0) idx=0;\n      const initials=isTeacher?\"G\":teacherInitials(msg.name);\n      return `<div class=\"alg-tm-chat-msg ${isTeacher?\"teacher\":\"\"}\">\n        <div class=\"alg-tm-msg-avatar\">${esc(initials)}</div>\n        <div class=\"alg-tm-msg-wrap\">\n          <div class=\"alg-tm-msg-meta\"><b>${esc(isTeacher?\"Guru\":msg.name)}</b><span>${formatClock(msg.at)}</span></div>\n          <div class=\"alg-tm-chat-bubble\">${esc(msg.text||\"\")}</div>\n        </div>\n      </div>`;\n    }).join(\"\");\n  }\n\n  function teacherChatModalHtml(teams){\n    const tm=GAME.teacherMonitor;\n    if(!tm.modalOpen) return \"\";\n    const members=teams[(tm.groupNo||1)-1]||teacherGroupMembersFromMeta(tm.groupMeta);\n    const memberList=members.length\n      ? members.map((name,i)=>`<div class=\"alg-tm-chat-person\">\n          <span class=\"alg-tm-person-avatar\">${esc(teacherInitials(name))}</span>\n          <span style=\"min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap\">${esc(name)}</span>\n          ${i===0?'<span style=\"margin-left:auto;padding:4px 8px;border-radius:999px;background:#edf5ff;color:#2864e8;font-size:8px;font-weight:900\">Ketua</span>':\"\"}\n        </div>`).join(\"\")\n      : '<div class=\"alg-tm-empty\">Belum ada anggota.</div>';\n    return `<div class=\"alg-tm-overlay\" id=\"algTmOverlay\">\n      <div class=\"alg-tm-modal\" role=\"dialog\" aria-modal=\"true\">\n        <div class=\"alg-tm-modal-head\">\n          <div class=\"alg-tm-modal-title\">\n            <span class=\"alg-tm-modal-icon\">👥</span>\n            <div><h3>Chat Tim ${tm.groupNo}</h3><p>Diskusi kelompok dan koordinasi anggota</p></div>\n          </div>\n          <div class=\"alg-tm-modal-actions\">\n            <button class=\"alg-tm-icon-btn\" id=\"algTmRefreshChat\">↻</button>\n            <button class=\"alg-tm-detail-btn\">👥 Lihat detail tim</button>\n            <button class=\"alg-tm-icon-btn\" id=\"algTmCloseChat\">×</button>\n          </div>\n        </div>\n        <div class=\"alg-tm-chat-layout\">\n          <aside class=\"alg-tm-chat-members\">\n            <div class=\"alg-tm-chat-members-head\"><span>Anggota Tim ${tm.groupNo}</span><span>${members.length} anggota</span></div>\n            ${memberList}\n          </aside>\n          <main class=\"alg-tm-chat-main\">\n            <div id=\"algTmChatScroll\" class=\"alg-tm-chat-scroll\">\n              <div class=\"alg-tm-chat-date\">Hari ini</div>\n              ${teacherChatMessagesHtml(tm.messages,members)}\n            </div>\n            <div class=\"alg-tm-chat-compose\">\n              <button class=\"alg-tm-attach\" type=\"button\">⌕</button>\n              <textarea id=\"algTmChatInput\" class=\"alg-tm-chat-input\" placeholder=\"Tulis pesan untuk Tim ${tm.groupNo}...\"></textarea>\n              <button id=\"algTmSendChat\" class=\"alg-tm-chat-send\">✈ Kirim</button>\n            </div>\n          </main>\n        </div>\n      </div>\n    </div>`;\n  }\n\n  function teacherManualModalHtml(roster,teams){\n    const tm=GAME.teacherMonitor;\n    if(!tm.manualOpen) return \"\";\n    const assigned={};\n    teams.forEach((team,ti)=>team.forEach(n=>assigned[n]=ti+1));\n    const rows=roster.map(name=>`<div class=\"alg-tm-manual-row\">\n      <span>${esc(name)}</span>\n      <select data-alg-manual-student=\"${esc(name)}\">\n        ${[1,2,3,4,5].map(n=>`<option value=\"${n}\" ${assigned[name]===n?\"selected\":\"\"}>Tim ${n}</option>`).join(\"\")}\n      </select>\n    </div>`).join(\"\");\n    return `<div class=\"alg-tm-overlay\" id=\"algTmManualOverlay\">\n      <div class=\"alg-tm-manual\">\n        <div class=\"alg-tm-modal-head\">\n          <div class=\"alg-tm-modal-title\">\n            <span class=\"alg-tm-modal-icon\" style=\"background:#e5f2ff;color:#2864e8\">👥</span>\n            <div><h3>Masukkan Tim Manual</h3><p>Tentukan tim untuk setiap siswa.</p></div>\n          </div>\n          <button class=\"alg-tm-icon-btn\" id=\"algTmCloseManual\">×</button>\n        </div>\n        <div class=\"alg-tm-manual-body\">${rows||'<div class=\"alg-tm-empty\">Belum ada siswa pada kelas ini.</div>'}</div>\n        <div class=\"alg-tm-manual-foot\">\n          <button class=\"alg-tm-action\" id=\"algTmCancelManual\">Batal</button>\n          <button class=\"alg-tm-action primary\" id=\"algTmSaveManual\">Simpan Tim</button>\n        </div>\n      </div>\n    </div>`;\n  }\n\n  function renderTeacherMonitor(){\n    const host=document.getElementById(\"algorithmTeacherMonitor\");\n    if(!host) return;\n    const tm=GAME.teacherMonitor;\n\n    // Roster kelas tetap tersedia untuk dashboard nilai, tetapi TIDAK digunakan\n    // untuk menentukan siswa aktif pada permainan Algoritma.\n    const roster=teacherRosterForClass(tm.className);\n    const activeNames=[...(tm.joinedNames||[])];\n\n    // Jika guru belum membagi tim, kartu tim harus kosong.\n    const teams=normalizeTeacherTeams(tm.manager?.teams,[]);\n    const duration=Number(tm.manager?.duration)||50;\n    const started=!!tm.manager?.started;\n    const assignedCount=new Set(teams.flat()).size;\n    const joinedCount=activeNames.length;\n    const classCount=joinedCount;\n    const ready=assignedCount>0;\n    const statusText=started?\"Sedang berjalan\":(ready?\"Siap dimulai\":\"Belum dibagi\");\n\n    const teamCards=teams.map((members,i)=>{\n      const memberHtml=members.length\n        ? members.map(n=>`<div class=\"alg-tm-member\"><span class=\"alg-tm-initials\">${esc(teacherInitials(n))}</span><span>${esc(n)}</span></div>`).join(\"\")\n        : '<div class=\"alg-tm-empty\">Belum ada anggota</div>';\n      return `<article class=\"alg-tm-team t${i+1}\">\n        <div class=\"alg-tm-team-head\">\n          <span class=\"alg-tm-team-icon\">👥</span>\n          <div><b>Tim ${i+1}</b><small>${members.length} anggota</small></div>\n          <button class=\"alg-tm-more\" data-alg-team-menu=\"${i+1}\" title=\"Buka chat tim\">⋮</button>\n        </div>\n        ${memberHtml}\n      </article>`;\n    }).join(\"\");\n\n    host.innerHTML=`\n      <div class=\"alg-tm-heading\">\n        <div class=\"alg-tm-title-wrap\">\n          <div class=\"alg-tm-title-icon\">👥</div>\n          <div>\n            <h3>Pengelolaan Tim — Latihan Algoritma</h3>\n            <p>Atur pembagian tim, mulai sesi diskusi, dan pantau aktivitas siswa secara real-time.</p>\n          </div>\n        </div>\n        <div class=\"alg-tm-note\">◷ Siapkan siswa untuk berdiskusi dan menyelesaikan soal algoritma dalam tim. Anda dapat mengacak tim atau memasukkan tim secara manual.</div>\n      </div>\n\n      <section class=\"alg-tm-control\">\n        <div class=\"alg-tm-joined\">\n          <span class=\"alg-tm-joined-icon\">👥</span>\n          <div>\n            <div class=\"alg-tm-label\">Siswa yang aktif</div>\n            <div class=\"alg-tm-big\"><strong>${joinedCount}</strong><span>siswa</span></div>\n            <div class=\"alg-tm-online\"><i></i>${!tm.presenceLoaded?\"Memeriksa siswa aktif...\":(joinedCount?\"Siswa aktif di halaman Algoritma\":\"Menunggu siswa membuka Latihan Algoritma\")}</div>\n          </div>\n        </div>\n        <div class=\"alg-tm-duration\">\n          <div class=\"alg-tm-duration-head\"><span style=\"font-size:18px;color:#2864e8\">◷</span><b>Durasi aktivitas</b></div>\n          <p>Pilih durasi pengerjaan untuk setiap tim.</p>\n          <div class=\"alg-tm-duration-buttons\">\n            ${[40,50,60].map(m=>`<button class=\"alg-tm-duration-btn ${duration===m?\"active\":\"\"}\" data-alg-duration=\"${m}\">${m} menit</button>`).join(\"\")}\n          </div>\n        </div>\n        <div class=\"alg-tm-actions\">\n          <button class=\"alg-tm-action\" id=\"algTmShuffle\">⤨ &nbsp;Acak Tim</button>\n          <button class=\"alg-tm-action\" id=\"algTmManual\">👥+ &nbsp;Masukkan Tim</button>\n          <button class=\"alg-tm-action primary\" id=\"algTmStart\">▶ &nbsp;${started?\"Dimulai\":\"Mulai\"}</button>\n        </div>\n      </section>\n\n      <section class=\"alg-tm-summary\">\n        <div class=\"alg-tm-summary-card\"><span class=\"alg-tm-summary-icon\">⌘</span><div><small>Jumlah tim</small><strong>5 <span style=\"font-size:12px\">tim</span></strong></div></div>\n        <div class=\"alg-tm-summary-card green\"><span class=\"alg-tm-summary-icon\">👥</span><div><small>Siswa terbagi</small><strong>${assignedCount} / ${classCount||0} <span style=\"font-size:12px\">siswa</span></strong></div></div>\n        <div class=\"alg-tm-summary-card green\"><span class=\"alg-tm-summary-icon\">✓</span><div><small>Status</small><strong class=\"ready\">${statusText}</strong></div></div>\n        <div class=\"alg-tm-summary-card\"><span class=\"alg-tm-summary-icon\">◷</span><div><small>Durasi yang dipilih</small><strong>${duration} menit</strong></div></div>\n      </section>\n\n      <div class=\"alg-tm-teams-head\">\n        <div><h4>👥 &nbsp;Daftar Tim dan Anggota</h4><p>Klik menu ⋮ pada setiap tim untuk membuka chat dan melihat diskusi kelompok.</p></div>\n        <div class=\"alg-tm-team-total\">5 tim &nbsp; | &nbsp; 👥 ${assignedCount} siswa</div>\n      </div>\n      <section class=\"alg-tm-team-grid\">${teamCards}</section>\n      <div class=\"alg-tm-tip\"><b>ⓘ &nbsp;Tips:</b> Klik ikon ⋮ pada setiap tim untuk membuka chat. Anda juga dapat mengubah anggota tim atau mengacak ulang tim sebelum memulai.</div>\n\n      ${teacherChatModalHtml(teams)}\n      ${teacherManualModalHtml(activeNames,teams)}\n    `;\n\n    host.querySelectorAll(\"[data-alg-duration]\").forEach(btn=>btn.addEventListener(\"click\",async()=>{\n      await teacherSaveManager({duration:Number(btn.dataset.algDuration)||50});\n    }));\n\n    host.querySelector(\"#algTmShuffle\")?.addEventListener(\"click\",async()=>{\n      const active=[...(tm.joinedNames||[])];\n      const shuffled=teacherBalancedTeams(active,true);\n      await teacherSaveManager({teams:shuffled,started:false});\n    });\n\n    host.querySelector(\"#algTmManual\")?.addEventListener(\"click\",()=>{\n      tm.manualOpen=true;renderTeacherMonitor();\n    });\n\n    host.querySelector(\"#algTmStart\")?.addEventListener(\"click\",async()=>{\n      const currentTeams=normalizeTeacherTeams(tm.manager?.teams,roster);\n      await teacherSaveManager({teams:currentTeams,started:true,startedAt:Date.now(),duration});\n    });\n\n    host.querySelectorAll(\"[data-alg-team-menu]\").forEach(btn=>btn.addEventListener(\"click\",()=>{\n      tm.groupNo=Number(btn.dataset.algTeamMenu)||1;\n      tm.modalOpen=true;\n      teacherListenSelectedGroup();\n      renderTeacherMonitor();\n    }));\n\n    host.querySelector(\"#algTmCloseChat\")?.addEventListener(\"click\",()=>{\n      tm.modalOpen=false;\n      if(tm.groupRef){try{tm.groupRef.off()}catch(_){} tm.groupRef=null;}\n      renderTeacherMonitor();\n    });\n    host.querySelector(\"#algTmRefreshChat\")?.addEventListener(\"click\",teacherListenSelectedGroup);\n    host.querySelector(\"#algTmSendChat\")?.addEventListener(\"click\",async()=>{\n      const input=host.querySelector(\"#algTmChatInput\");\n      await teacherSendChat(input?.value);\n      if(input) input.value=\"\";\n    });\n    host.querySelector(\"#algTmChatInput\")?.addEventListener(\"keydown\",async e=>{\n      if(e.key===\"Enter\"&&!e.shiftKey){\n        e.preventDefault();\n        const input=e.currentTarget;\n        await teacherSendChat(input.value);\n        input.value=\"\";\n      }\n    });\n\n    const closeManual=()=>{tm.manualOpen=false;renderTeacherMonitor();};\n    host.querySelector(\"#algTmCloseManual\")?.addEventListener(\"click\",closeManual);\n    host.querySelector(\"#algTmCancelManual\")?.addEventListener(\"click\",closeManual);\n    host.querySelector(\"#algTmSaveManual\")?.addEventListener(\"click\",async()=>{\n      const next=Array.from({length:5},()=>[]);\n      host.querySelectorAll(\"[data-alg-manual-student]\").forEach(sel=>{\n        const name=sel.dataset.algManualStudent;\n        const team=Math.max(1,Math.min(5,Number(sel.value)||1));\n        next[team-1].push(name);\n      });\n      tm.manualOpen=false;\n      await teacherSaveManager({teams:next,started:false});\n    });\n\n    const box=host.querySelector(\"#algTmChatScroll\");\n    if(box) requestAnimationFrame(()=>{box.scrollTop=box.scrollHeight;});\n  }\n\n  function ensureTeacherMonitor(){\n    const teacherView=document.getElementById(\"teacherView\");\n    if(!teacherView || !teacherView.classList.contains(\"active\")) return;\n    injectCss();\n\n    const dashboard=teacherView.querySelector(\".teacher-dashboard\");\n    if(!dashboard) return;\n\n    let host=document.getElementById(\"algorithmTeacherMonitor\");\n    let created=false;\n    if(!host){\n      host=document.createElement(\"section\");\n      host.id=\"algorithmTeacherMonitor\";\n      host.className=\"alg-tm-shell\";\n      const classPanel=dashboard.querySelector(\".teacher-class-panel\");\n      if(classPanel) classPanel.insertAdjacentElement(\"afterend\",host);\n      else dashboard.prepend(host);\n      created=true;\n    }\n\n    const cls=teacherSelectedClassFromDom();\n    const tm=GAME.teacherMonitor;\n    let changed=false;\n    if(tm.className!==cls){\n      teacherStopMonitorListeners();\n      tm.className=cls;\n      tm.groupNo=1;\n      tm.counts=[0,0,0,0,0];\n      tm.messages=[];\n      tm.groupMeta={};\n      tm.manager={duration:50,teams:null,started:false};\n      tm.joinedNames=[];\n      tm.modalOpen=false;\n      tm.manualOpen=false;\n      teacherListenCounts();\n      teacherListenManager();\n      teacherListenPresence();\n      changed=true;\n    }\n\n    if(created || changed || !host.dataset.ready){\n      renderTeacherMonitor();\n      host.dataset.ready=\"1\";\n    }\n  }\n\n  async function applyTeacherTeamAssignment(){\n    if(GAME.demo || !window.firebase?.database || !GAME.student?.className) return;\n    try{\n      const ref=firebase.database().ref(`kelasExcel/algorithmManagerV10/${safeId(GAME.student.className)}/${safeId(currentSessionId())}`);\n      const snap=await ref.once(\"value\");\n      const data=snap.val()||{};\n      if(!data.started || !data.teams) return;\n      const teams=normalizeTeacherTeams(data.teams,[]);\n      let gi=teams.findIndex(team=>team.includes(GAME.student.name));\n      if(gi<0) return;\n      GAME.groupIndex=gi;\n      GAME.groupNo=gi+1;\n      GAME.members=teams[gi];\n      GAME.slot=Math.max(0,GAME.members.indexOf(GAME.student.name));\n      GAME.scenario=scenarioForGroup(GAME.student.className,GAME.groupIndex);\n      GAME.steps=stepsForGroup(GAME.scenario,GAME.members.length);\n      const ids=GAME.steps.map((_,i)=>i);\n      const shuffled=seededShuffle(ids,hash(`${GAME_VERSION}-${GAME.student.className}-${GAME.groupNo}-${GAME.scenario.id}`));\n      GAME.assigned=shuffled.slice(GAME.slot*4,GAME.slot*4+4).sort((a,b)=>hash(`${a}-card`)-hash(`${b}-card`));\n    }catch(_){}\n  }\n\n  async function mount(panel){\n    if(panel.dataset.algMounting===\"1\") return;\n    panel.dataset.algMounting=\"1\";\n    injectCss();setup();\n    await applyTeacherTeamAssignment();\n    GAME.panel=panel;GAME.selected=null;GAME.completed=false;GAME.chat=[];\n    GAME.lastHint=`Belum diuji. Kelompok ${GAME.groupNo} harus menyusun ${GAME.steps.length} langkah.`;\n    const h=panel.querySelector(\".l2-window-header h3\");if(h)h.textContent=\"Algoritma Kelompok\";\n    render();connect();\n    panel.dataset.algMounting=\"\";\n  }\n\n  function watch(){\n    ensureTeacherMonitor();\n    const panel=document.getElementById(\"exercisePanel\");\n    if(!panel||panel.classList.contains(\"hidden\"))return;\n    const title=panel.querySelector(\".l2-window-header h3\")?.textContent.trim();\n    const already=!!panel.querySelector(\".alg-team-shell\");\n    if((title===\"Algoritma\"||title===\"Algoritma Kelompok\")&&!already)mount(panel);\n\n    document.querySelectorAll(\".exercise-card,.student-ex-card\").forEach(card=>{\n      if(card.textContent.includes(\"Algoritma\")){\n        const p=card.querySelector(\"p\");\n        const target=\"Permainan 5 kelompok dengan kasus berbeda · 4 kartu langkah per siswa.\";\n        if(p && p.textContent!==target) p.textContent=target;\n      }\n    });\n  }\n\n\n\n  // ===== V8: observer dipersempit agar login guru tidak pernah freeze =====\n  // Jangan mengamati seluruh documentElement. Cukup area yang memang perlu:\n  // 1) exercisePanel untuk mendeteksi Latihan 7 dibuka\n  // 2) teacherView untuk mendeteksi dashboard guru menjadi aktif\n\n  let exerciseObserver=null;\n  let teacherViewObserver=null;\n  let mountQueued=false;\n\n  function scheduleExerciseMount(){\n    if(mountQueued) return;\n    mountQueued=true;\n    requestAnimationFrame(()=>{\n      mountQueued=false;\n      const panel=document.getElementById(\"exercisePanel\");\n      if(!panel) return;\n\n      const title=panel.querySelector(\".l2-window-header h3\")?.textContent.trim();\n      const already=!!panel.querySelector(\".alg-team-shell\");\n      const visible=!panel.classList.contains(\"hidden\");\n\n      if(visible && (title===\"Algoritma\"||title===\"Algoritma Kelompok\") && !already && panel.dataset.algMounting!==\"1\"){\n        mount(panel);\n      }\n    });\n  }\n\n  function startScopedObservers(){\n    const panel=document.getElementById(\"exercisePanel\");\n    if(panel && !exerciseObserver){\n      exerciseObserver=new MutationObserver(()=>scheduleExerciseMount());\n      exerciseObserver.observe(panel,{\n        childList:true,\n        subtree:true,\n        attributes:true,\n        attributeFilter:[\"class\"]\n      });\n      scheduleExerciseMount();\n    }\n\n    const teacherView=document.getElementById(\"teacherView\");\n    if(teacherView && !teacherViewObserver){\n      teacherViewObserver=new MutationObserver(()=>{\n        if(teacherView.classList.contains(\"active\")){\n          // Tunggu renderTeacher() dari app.js selesai lebih dulu.\n          requestAnimationFrame(()=>setTimeout(ensureTeacherMonitor,60));\n        }else{\n          // Lepaskan listener Firebase saat keluar dashboard guru.\n          teacherStopMonitorListeners();\n        }\n      });\n      teacherViewObserver.observe(teacherView,{\n        attributes:true,\n        attributeFilter:[\"class\"]\n      });\n    }\n  }\n\n  // Klik login guru: hanya jadwalkan satu kali pengecekan.\n  document.addEventListener(\"click\",e=>{\n    if(e.target.closest?.(\"#teacherLoginBtn\")){\n      setTimeout(()=>{\n        const teacherView=document.getElementById(\"teacherView\");\n        if(teacherView?.classList.contains(\"active\")) ensureTeacherMonitor();\n      },350);\n    }\n  });\n\n  // Saat guru memilih kelas, monitor berpindah ke kelas tersebut.\n  document.addEventListener(\"click\",e=>{\n    const tab=e.target.closest?.(\"[data-teacher-class]\");\n    if(!tab) return;\n    const cls=tab.dataset.teacherClass;\n    if(!cls) return;\n\n    setTimeout(()=>{\n      const tm=GAME.teacherMonitor;\n      if(tm.className===cls) return;\n\n      teacherStopMonitorListeners();\n      tm.className=cls;\n      tm.groupNo=1;\n      tm.counts=[0,0,0,0,0];\n      tm.messages=[];\n      tm.groupMeta={};\n\n      tm.manager={duration:50,teams:null,started:false};\n      tm.joinedNames=[];\n      tm.modalOpen=false;\n      tm.manualOpen=false;\n      teacherListenCounts();\n      teacherListenManager();\n      teacherListenPresence();\n\n      const host=document.getElementById(\"algorithmTeacherMonitor\");\n      if(host){\n        renderTeacherMonitor();\n        host.dataset.ready=\"1\";\n      }\n    },80);\n  });\n\n  // Ubah deskripsi kartu Algoritma tanpa MutationObserver global.\n  function updateAlgorithmCardText(){\n    const target=\"Permainan 5 kelompok dengan kasus berbeda · 4 kartu langkah per siswa.\";\n    document.querySelectorAll(\".exercise-card,.student-ex-card\").forEach(card=>{\n      if(!card.textContent.includes(\"Algoritma\")) return;\n      const p=card.querySelector(\"p\");\n      if(p && p.textContent!==target) p.textContent=target;\n    });\n  }\n\n  window.addEventListener(\"load\",()=>{\n    startScopedObservers();\n    updateAlgorithmCardText();\n\n    // Jika URL langsung membuka demonstrasi Latihan 7.\n    setTimeout(scheduleExerciseMount,120);\n  });\n})();";

  function log(...args){ console.log("[Algorithm Race V12]", ...args); }
  function warn(...args){ console.warn("[Algorithm Race V12]", ...args); }

  // V14 FIX:
  // Template patch source must keep ${...} as source code text without
  // evaluating it in this loader. A normal tagged-template "cooked" value
  // converts \${...} -> ${...} and \` -> `, which is exactly what the
  // fetched algorithm-team-game.js contains.
  const RAW=(strings,...values)=>strings.reduce(
    (out,s,i)=>out+s+(i<values.length?values[i]:""),
    ""
  );

  function replaceRequired(src, search, replacement, label){
    if(!src.includes(search)){
      throw new Error(`Patch V14 gagal: bagian "${label}" tidak cocok dengan algorithm-team-game.js yang sedang dimuat.`);
    }
    return src.replace(search, replacement);
  }

  function replaceAllRequired(src, search, replacement, label, minCount=1){
    const count = src.split(search).length - 1;
    if(count < minCount){
      throw new Error(`Patch gagal: "${label}" hanya ditemukan ${count} kali.`);
    }
    return src.split(search).join(replacement);
  }

  const HELPERS = RAW`
  /* ===== V12 Algorithm Race ===== */

  function raceManagerTeamInfo(){
    const data=GAME.raceManager||{};
    const raw=data.teams||{};
    const count=[3,4,5].includes(Number(data.teamCount))?Number(data.teamCount):5;
    const teams=Array.from({length:count},(_,i)=>{
      const v=raw[i] ?? raw[String(i)] ?? raw[i+1] ?? raw[String(i+1)];
      if(Array.isArray(v))return v.filter(Boolean);
      if(v&&typeof v==="object")return Object.values(v).filter(Boolean);
      return [];
    });
    const gi=teams.findIndex(t=>t.includes(GAME.student?.name));
    return {
      count,teams,assigned:gi>=0,groupIndex:gi,groupNo:gi>=0?gi+1:0,
      members:gi>=0?teams[gi]:[]
    };
  }

  function renderRaceWaitingRoom(panel){
    if(!panel||!panel.isConnected)return;
    GAME.raceWaiting=true;
    GAME.panel=panel;

    const data=GAME.raceManager||{};
    const info=raceManagerTeamInfo();
    const started=!!data.started;
    const header=panel.querySelector(".l2-window-header");

    const title=info.assigned?\`Anda masuk Tim \${info.groupNo}\`:"Menunggu pembagian tim";
    let desc="";
    let stateClass="wait";
    let icon="👥";

    if(!info.assigned){
      desc="Anda sudah terdeteksi di halaman Latihan Algoritma. Guru sedang menyiapkan dan membagi tim.";
    }else if(!started){
      desc=\`Tim \${info.groupNo} sudah terbentuk dengan \${info.members.length} anggota. Tunggu guru menekan tombol Mulai.\`;
      stateClass="ready";
      icon="✓";
    }else{
      desc="Permainan sedang disiapkan. Halaman akan terbuka otomatis.";
      stateClass="ready";
      icon="▶";
    }

    const members=info.members.length
      ? info.members.map((name,i)=>\`
          <div class="alg-race-wait-member \${name===GAME.student.name?"me":""}">
            <span>\${i+1}</span>
            <div><b>\${esc(name)}</b><small>\${name===GAME.student.name?"Anda":"Anggota tim"}</small></div>
          </div>\`).join("")
      : \`<div class="alg-race-wait-empty">Anggota tim akan muncul setelah guru membagi siswa.</div>\`;

    const body=document.createElement("div");
    body.className="alg-race-wait-shell";
    body.innerHTML=\`
      <section class="alg-race-wait-card">
        <div class="alg-race-wait-icon \${stateClass}">\${icon}</div>
        <span class="alg-race-wait-kicker">LATIHAN 7 · ALGORITHM RACE</span>
        <h3>\${esc(title)}</h3>
        <p>\${esc(desc)}</p>

        <div class="alg-race-wait-status">
          <div><small>Status Anda</small><strong>\${info.assigned?\`Tim \${info.groupNo}\`:"Sudah masuk halaman"}</strong></div>
          <div><small>Jumlah tim</small><strong>\${data.teamCount||"—"}</strong></div>
          <div><small>Durasi</small><strong>\${data.duration?\`\${data.duration} menit\`:"Belum dipilih"}</strong></div>
          <div><small>Permainan</small><strong>\${started?"Sedang dimulai":"Belum dimulai"}</strong></div>
        </div>

        \${info.assigned?\`
          <div class="alg-race-wait-team">
            <div class="alg-race-wait-team-head">
              <b>Anggota Tim \${info.groupNo}</b><span>\${info.members.length} siswa</span>
            </div>
            <div class="alg-race-wait-members">\${members}</div>
          </div>\`:""}

        <div class="alg-race-wait-notice">
          <span>◷</span>
          <div>
            <b>Halaman ini akan berubah otomatis.</b>
            <p>Tidak perlu memuat ulang. Setelah guru membagi tim dan menekan Mulai, papan Algorithm Race akan langsung terbuka.</p>
          </div>
        </div>
      </section>\`;

    [...panel.children].forEach(el=>{if(el!==header)el.remove()});
    panel.appendChild(body);

    const h=panel.querySelector(".l2-window-header h3");
    if(h)h.textContent="Ruang Tunggu Algoritma";
    updateAlgorithmHeaderTime();
  }

  function enterRaceGameFromWaiting(){
    if(!GAME.panel||!GAME.panel.isConnected)return;
    GAME.raceWaiting=false;
    GAME.selected=null;
    GAME.completed=false;
    GAME.chat=GAME.chat||[];
    GAME.lastHint=\`Belum diuji. Tim \${GAME.groupNo} mengerjakan Algoritma \${(Number(GAME.raceRound)||0)+1}.\`;
    const h=GAME.panel.querySelector(".l2-window-header h3");
    if(h)h.textContent="Algorithm Race";
    render();
    connect();
    startRaceTicker();
  }


  function raceTaskInfoHtml(){
    const s=GAME.scenario||{};
    const title=String(s.title||"tugas algoritma");
    const goal=String(s.goal||"Susun seluruh langkah hingga membentuk urutan yang logis dan benar.");
    const phases=Array.isArray(s.phases)?s.phases.filter(Boolean):[];

    const phaseHtml=phases.length
      ? phases.map((phase,i)=>\`
          <span class="alg-task-phase">
            <b>\${i+1}</b>\${esc(phase)}
          </span>\`).join('<i class="alg-task-arrow">→</i>')
      : '<span class="alg-task-phase"><b>1</b>Susun langkah dari awal sampai selesai</span>';

    return \`<div class="alg-task-info">
      <div class="alg-task-info-card meaning">
        <span class="alg-task-info-icon">?</span>
        <div>
          <small>PENGERTIAN TUGAS</small>
          <strong>\${esc(title)}</strong>
          <p>Tugas ini adalah simulasi menyusun urutan langkah yang logis untuk proses <b>\${esc(title.toLowerCase())}</b>. Kalian harus memahami hubungan antar langkah, bukan sekadar menebak posisi kartu.</p>
        </div>
      </div>

      <div class="alg-task-info-card action">
        <span class="alg-task-info-icon">✓</span>
        <div>
          <small>YANG HARUS DILAKUKAN</small>
          <strong>\${esc(goal)}</strong>
          <p>Diskusikan isi kartu milik masing-masing anggota, tentukan urutannya bersama, tempatkan kartu pada posisi yang tepat, lalu gunakan tombol <b>Uji</b> setelah semua langkah terisi.</p>
        </div>
      </div>

      <div class="alg-task-flow">
        <small>ALUR UTAMA YANG PERLU DIPAHAMI</small>
        <div>\${phaseHtml}</div>
      </div>
    </div>\`;
  }

  function updateAlgorithmHeaderTime(){
    const panel=GAME.panel;
    if(!panel||!panel.isConnected)return;

    const card=panel.querySelector(".exercise-score-card");
    if(!card)return;

    let timeText="--:--";
    let subText="Waktu permainan Algoritma";

    if(GAME.demo){
      timeText=String(panel.querySelector("#exerciseWindowTimer")?.textContent||"60:00").trim();
      subText="Mode demonstrasi";
    }else if(raceIsActive()){
      timeText=raceTimeText(raceRemainingMs());
      subText=\`Durasi \${raceDurationMinutes()} menit\`;
    }else if(Number(GAME.raceManager?.duration)>0){
      timeText=\`\${String(Number(GAME.raceManager.duration)).padStart(2,"0")}:00\`;
      subText="Durasi yang dipilih guru";
    }

    card.classList.add("alg-algorithm-time-card");
    card.innerHTML=\`
      <small>WAKTU</small>
      <strong id="algHeaderTime">\${esc(timeText)}</strong>
      <span>\${esc(subText)}</span>\`;
  }

  function raceScenarioForRound(className,groupIndex,roundIndex){
    const session=currentSessionId();
    const shuffled=seededShuffle(SCENARIOS,hash(\`\${GAME_VERSION}-\${className}-\${session}-race-v12\`));
    const idx=((Math.max(0,Number(roundIndex)||0)*5)+Math.max(0,Number(groupIndex)||0))%shuffled.length;
    return shuffled[idx];
  }

  function raceAssignedCards(ids,members,slot,seedKey){
    const total=Math.max(1,members?.length||1);
    const shuffled=seededShuffle(ids,hash(seedKey));
    return shuffled
      .filter((_,i)=>i%total===Math.max(0,slot||0))
      .sort((a,b)=>hash(\`\${seedKey}-\${a}-card\`)-hash(\`\${seedKey}-\${b}-card\`));
  }

  function raceIsActive(){
    return !GAME.demo && !!GAME.raceManager?.started;
  }

  function raceDurationMinutes(){
    return Math.max(1,Number(GAME.raceManager?.duration||60));
  }

  function raceEndAt(){
    const started=Number(GAME.raceManager?.startedAt||0);
    return started?started+raceDurationMinutes()*60000:0;
  }

  function raceRemainingMs(){
    const end=raceEndAt();
    return end?Math.max(0,end-Date.now()):0;
  }

  function raceIsExpired(){
    return raceIsActive() && raceEndAt()>0 && Date.now()>=raceEndAt();
  }

  function raceTargetAlgorithms(duration){
    const d=Number(duration)||60;
    if(d<=20)return 2;
    if(d<=30)return 3;
    if(d<=40)return 4;
    if(d<=50)return 5;
    return 5;
  }

  function raceTimeBonus(elapsedMs){
    const mins=Math.max(0,Number(elapsedMs)||0)/60000;
    if(mins<=6)return 4;
    if(mins<=9)return 3;
    if(mins<=12)return 2;
    if(mins<=15)return 1;
    return 0;
  }

  function raceTimeText(ms){
    const sec=Math.max(0,Math.ceil((Number(ms)||0)/1000));
    const mm=String(Math.floor(sec/60)).padStart(2,"0");
    const ss=String(sec%60).padStart(2,"0");
    return \`\${mm}:\${ss}\`;
  }

  function raceTeamMetrics(meta=GAME.meta){
    const race=meta?.race||{};
    const completed=Math.max(0,Number(race.completedCount||0));
    const bonus=Math.max(0,Number(race.bonusPoints||0));
    const points=Math.max(0,Number(race.teamPoints||0));
    const target=raceTargetAlgorithms(raceDurationMinutes());
    const progress=Math.min(100,(completed/Math.max(1,target))*100);
    const efficiency=completed?Math.min(100,(bonus/(completed*4))*100):0;
    const teamScore=Math.max(0,Math.min(100,Math.round(progress*.8+efficiency*.2)));
    return {completed,bonus,points,target,progress,efficiency,teamScore};
  }

  function raceChatCountFor(name){
    return (GAME.chat||[]).filter(x=>x && x.name===name && !x.system).length;
  }

  function raceIndividualMetrics(name=GAME.student?.name){
    const stats=GAME.meta?.members?.[safeId(name)]||{};
    const team=raceTeamMetrics();
    const chatCount=raceChatCountFor(name);
    const stepCount=Math.max(1,Number(GAME.meta?.stepCount||GAME.steps?.length||16));
    const memberCount=Math.max(1,GAME.members?.length||1);
    const cardsPerRound=Math.max(1,Math.ceil(stepCount/memberCount));
    const startedRound=(Number(stats.placements||0)+Number(stats.revisions||0)+Number(stats.tests||0)+chatCount)>0?1:0;
    const rounds=Math.max(1,team.completed+startedRound);

    const placementTarget=Math.max(1,cardsPerRound*rounds);
    const revisionTarget=Math.max(1,Math.ceil(rounds*.75));
    const testTarget=Math.max(1,Math.ceil(rounds/2));
    const chatTarget=Math.max(2,rounds*2);

    const placementScore=Math.min(100,(Number(stats.placements||0)/placementTarget)*100);
    const revisionScore=Math.min(100,(Number(stats.revisions||0)/revisionTarget)*100);
    const testingScore=Math.min(100,(Number(stats.tests||0)/testTarget)*100);
    const discussionScore=Math.min(100,(chatCount/chatTarget)*100);

    const contribution=Math.round(
      placementScore*.40+
      revisionScore*.25+
      testingScore*.15+
      discussionScore*.20
    );
    const finalScore=Math.max(0,Math.min(100,Math.round(team.teamScore*.70+contribution*.30)));

    return {
      stats,chatCount,cardsPerRound,placementTarget,revisionTarget,testTarget,chatTarget,
      placementScore,revisionScore,testingScore,discussionScore,contribution,finalScore,
      ...team
    };
  }

  function applyRaceRound(roundIndex,quiet=false){
    const next=Math.max(0,Number(roundIndex)||0);
    GAME.raceRound=next;
    GAME.scenario=raceScenarioForRound(GAME.student.className,GAME.groupIndex,next);
    GAME.steps=stepsForGroup(GAME.scenario,GAME.members.length);
    const ids=GAME.steps.map((_,i)=>i);
    GAME.assigned=raceAssignedCards(
      ids,
      GAME.members,
      GAME.slot,
      \`\${GAME_VERSION}-\${GAME.student.className}-\${GAME.groupNo}-race-\${next}-\${GAME.scenario.id}\`
    );
    GAME.board={};
    GAME.selected=null;
    GAME.completed=false;
    GAME.raceEnded=raceIsExpired();
    if(!quiet){
      GAME.lastHint=GAME.raceEnded
        ? "⏱ Waktu habis. Aktivitas algoritma telah ditutup."
        : \`Algoritma \${next+1} siap. Susun \${GAME.steps.length} langkah bersama tim.\`;
    }
  }

  async function ensureRaceState(){
    if(!raceIsActive()||!GAME.rootRef)return;
    const startedAt=Number(GAME.raceManager?.startedAt||Date.now());
    const duration=raceDurationMinutes();
    const ref=GAME.rootRef.child("race");
    try{
      await ref.transaction(cur=>{
        if(cur)return cur;
        return {
          version:"race-v12",
          sessionStartedAt:startedAt,
          durationMinutes:duration,
          roundIndex:0,
          currentStartedAt:startedAt,
          completedCount:0,
          teamPoints:0,
          bonusPoints:0,
          totalElapsedSeconds:0,
          currentAttempts:0,
          finished:false,
          createdAt:Date.now()
        };
      });
    }catch(err){ console.warn("Race init:",err); }
  }

  async function raceIncrementAttempt(){
    if(!raceIsActive()||!GAME.rootRef)return;
    try{
      await GAME.rootRef.child("race/currentAttempts").transaction(n=>(Number(n)||0)+1);
    }catch(_){}
  }

  async function completeRaceAlgorithm(){
    if(!raceIsActive()||!GAME.rootRef)return false;
    if(raceIsExpired()){
      await finalizeRaceStudentScore();
      return false;
    }

    const round=Math.max(0,Number(GAME.raceRound||0));
    const claimRef=GAME.rootRef.child(\`race/claims/r_\${round+1}\`);
    let claimed=false;
    try{
      const tx=await claimRef.transaction(cur=>{
        if(cur)return;
        return {by:safeId(GAME.student.name),name:GAME.student.name,at:Date.now()};
      });
      claimed=!!tx.committed;
    }catch(_){}
    if(!claimed)return false;

    const raceSnap=await GAME.rootRef.child("race").once("value");
    const race=raceSnap.val()||{};
    if(Number(race.roundIndex||0)!==round)return false;

    const now=Date.now();
    const start=Number(race.currentStartedAt||race.sessionStartedAt||now);
    const elapsed=Math.max(1000,now-start);
    const bonus=raceTimeBonus(elapsed);
    const earned=20+bonus;
    const completed=Math.max(0,Number(race.completedCount||0))+1;
    const points=Math.max(0,Number(race.teamPoints||0))+earned;
    const bonusTotal=Math.max(0,Number(race.bonusPoints||0))+bonus;
    const elapsedTotal=Math.max(0,Number(race.totalElapsedSeconds||0))+Math.round(elapsed/1000);
    const attempts=Math.max(1,Number(race.currentAttempts||1));
    const nextRound=round+1;
    const nextScenario=raceScenarioForRound(GAME.student.className,GAME.groupIndex,nextRound);

    const completion={
      round:round+1,
      scenarioId:GAME.scenario.id,
      scenarioTitle:GAME.scenario.title,
      elapsedSeconds:Math.round(elapsed/1000),
      attempts,
      basePoints:20,
      bonusPoints:bonus,
      points:earned,
      solvedAt:now,
      solvedBy:GAME.student.name
    };

    const updates={};
    updates[\`race/completions/r_\${round+1}\`]=completion;
    updates["race/completedCount"]=completed;
    updates["race/teamPoints"]=points;
    updates["race/bonusPoints"]=bonusTotal;
    updates["race/totalElapsedSeconds"]=elapsedTotal;
    updates["race/roundIndex"]=nextRound;
    updates["race/currentStartedAt"]=now;
    updates["race/currentAttempts"]=0;
    updates["race/lastSolvedAt"]=now;
    updates["race/lastSolvedBy"]=GAME.student.name;
    updates["race/lastEarnedPoints"]=earned;
    updates["board"]=null;
    updates["completed"]=false;
    updates["completedAt"]=null;
    updates["scenarioId"]=nextScenario.id;
    updates["scenarioTitle"]=nextScenario.title;
    updates["stepCount"]=stepsForGroup(nextScenario,GAME.members.length).length;

    await GAME.rootRef.update(updates);
    await GAME.rootRef.child("chat").push().set({
      name:"Sistem",
      system:true,
      at:now,
      text:\`✅ Algoritma \${round+1} benar. Tim mendapat \${earned} poin (20 dasar + \${bonus} bonus waktu). Algoritma \${nextRound+1} dibuka.\`
    });

    return true;
  }

  function updateRaceClockDom(){
    const clock=GAME.panel?.querySelector("#algRaceClock");
    const done=GAME.panel?.querySelector("#algRaceDone");
    const points=GAME.panel?.querySelector("#algRacePoints");
    const current=GAME.panel?.querySelector("#algRaceCurrent");
    if(clock)clock.textContent=raceIsActive()?raceTimeText(raceRemainingMs()):"—";
    const m=raceTeamMetrics();
    if(done)done.textContent=String(m.completed);
    if(points)points.textContent=String(m.points);
    if(current)current.textContent=String((Number(GAME.raceRound)||0)+1);
    updateAlgorithmHeaderTime();
  }

  async function finalizeRaceStudentScore(){
    if(GAME.demo||GAME.raceScoreSaving||GAME.raceScoreSaved)return;
    if(!raceIsActive())return;

    GAME.raceScoreSaving=true;
    try{
      const metrics=raceIndividualMetrics();
      let progress={};
      try{progress=JSON.parse(localStorage.getItem("kelasExcelProgress"))||{}}catch(_){}
      const rec=Object.values(progress).find(r=>r&&r.name===GAME.student.name&&r.className===GAME.student.className);
      if(!rec)return;

      rec.completedExercises ||= Array(8).fill(false);
      rec.exerciseScores ||= Array(8).fill(null);
      rec.exerciseCompletedAt ||= Array(8).fill(null);
      rec.exerciseCompletedSeconds ||= Array(8).fill(null);
      rec.exerciseStartedAt ||= Array(8).fill(null);
      rec.exerciseState ||= {};

      rec.completedExercises[6]=true;
      rec.exerciseScores[6]=metrics.finalScore;
      rec.exerciseCompletedAt[6]=Date.now();
      const start=Number(GAME.raceManager?.startedAt||rec.exerciseStartedAt[6]||Date.now());
      rec.exerciseCompletedSeconds[6]=Math.max(
        1,
        Math.min(7200,Math.floor((Date.now()-start)/1000))
      );
      rec.exerciseState[6]={
        ...(rec.exerciseState[6]||{}),
        teamAlgorithmRace:{
          version:"race-v12",
          sessionId:currentSessionId(),
          groupNo:GAME.groupNo,
          groupSize:GAME.members.length,
          completedAlgorithms:metrics.completed,
          teamPoints:metrics.points,
          targetAlgorithms:metrics.target,
          teamScore:metrics.teamScore,
          contributionScore:metrics.contribution,
          finalScore:metrics.finalScore,
          contribution:{
            placements:Number(metrics.stats?.placements||0),
            revisions:Number(metrics.stats?.revisions||0),
            tests:Number(metrics.stats?.tests||0),
            chatMessages:metrics.chatCount
          }
        }
      };

      const nums=rec.exerciseScores.filter(Number.isFinite);
      rec.score=Math.round(nums.reduce((a,b)=>a+b,0)/Math.max(1,nums.length));
      localStorage.setItem("kelasExcelProgress",JSON.stringify(progress));

      try{
        await firebase.database()
          .ref(\`kelasExcel/progress/\${safeId(\`\${rec.className}::\${rec.name}\`)}\`)
          .set(rec);
      }catch(_){}

      GAME.raceScoreSaved=true;
      GAME.lastHint=\`⏱ Waktu habis. Nilai akhir Algoritma \${metrics.finalScore}/100 tersimpan. Tim menyelesaikan \${metrics.completed} algoritma.\`;
      render();
    }finally{
      GAME.raceScoreSaving=false;
    }
  }

  function startRaceTicker(){
    if(GAME.raceTicker)clearInterval(GAME.raceTicker);
    GAME.raceTicker=setInterval(async()=>{
      updateRaceClockDom();
      if(raceIsExpired()&&!GAME.raceEnded){
        GAME.raceEnded=true;
        try{
          if(GAME.rootRef){
            await GAME.rootRef.child("race").update({finished:true,finishedAt:Date.now()});
          }
        }catch(_){}
        await finalizeRaceStudentScore();
        render();
      }
    },1000);
  }

  function listenRaceManager(){
    if(GAME.demo||!window.firebase?.database||!GAME.student?.className)return;
    if(GAME.raceManagerRef){try{GAME.raceManagerRef.off()}catch(_){}}
    GAME.raceManagerRef=firebase.database()
      .ref(\`kelasExcel/algorithmManagerV10/\${safeId(GAME.student.className)}/\${safeId(currentSessionId())}\`);

    GAME.raceManagerRef.on("value",async snap=>{
      const data=snap.val()||{};
      const wasStarted=!!GAME.raceManager?.started;
      const oldGroup=GAME.groupNo;
      GAME.raceManager=data;

      // Tim diterapkan segera setelah guru membagi siswa, meski belum Mulai.
      if(data.teams){
        await applyTeacherTeamAssignment();
      }

      if(!data.started){
        if(GAME.panel?.isConnected){
          renderRaceWaitingRoom(GAME.panel);
        }
        updateRaceClockDom();
        return;
      }

      await ensureRaceState();

      if(!wasStarted){
        GAME.raceScoreSaved=false;
        GAME.raceEnded=raceIsExpired();
      }

      if(GAME.raceWaiting){
        enterRaceGameFromWaiting();
      }else if(oldGroup!==GAME.groupNo){
        render();
        connect();
      }

      updateRaceClockDom();
    });
  }
  /* ===== End V12 Algorithm Race ===== */

`;

  function load(){
    try{
      // V21: source dasar algoritma sudah ditanam langsung ke bundle.
      // Tidak ada lagi fetch algorithm-team-game.js saat runtime.
      let src=BASE_ALGORITHM_SOURCE;

      // Helper functions inside original closure.
      src=replaceRequired(
        src,
        '  const CSS = `',
        HELPERS + '\n  const CSS = `',
        "lokasi helper"
      );

      // Scenario now advances by race round.
      src=replaceAllRequired(
        src,
        'GAME.scenario=scenarioForGroup(GAME.student.className,GAME.groupIndex);',
        'GAME.scenario=raceScenarioForRound(GAME.student.className,GAME.groupIndex,Number(GAME.raceRound||0));',
        "pemilihan skenario",
        2
      );

      // Distribute steps evenly for 3/4/5-team configurations where a team may
      // contain more than six students.
      src=replaceAllRequired(
        src,
        'GAME.assigned=shuffled.slice(GAME.slot*4,GAME.slot*4+4).sort((a,b)=>hash(`${a}-card`)-hash(`${b}-card`));',
        'GAME.assigned=raceAssignedCards(ids,GAME.members,GAME.slot,`${GAME_VERSION}-${GAME.student.className}-${GAME.groupNo}-race-${Number(GAME.raceRound||0)}-${GAME.scenario.id}`);',
        "pembagian kartu dinamis",
        2
      );

      // Use manager state for the race.
      src=replaceRequired(
        src,
        '      const data=snap.val()||{};\n      if(!data.started || !data.teams) return;',
        '      const data=snap.val()||{};\n      GAME.raceManager=data;\n      if(!data.teams) return;',
        "manager siswa"
      );


      // V16 — force Exercise 7 (Algoritma) to be taken over by the blue
      // group/race interface even when app.js renders the newer green layout.
      src=replaceRequired(
        src,
        '    const title=panel.querySelector(".l2-window-header h3")?.textContent.trim();\n    const already=!!panel.querySelector(".alg-team-shell");\n    if((title==="Algoritma"||title==="Algoritma Kelompok")&&!already)mount(panel);',
        '    const title=panel.querySelector(".l2-window-header h3")?.textContent.trim();\n    const panelText=String(panel.textContent||"");\n    const activeNavText=String(document.querySelector(".student-ex-card.active,.exercise-card.active")?.textContent||"");\n    const exercise7Active=/Jendela\\s+latihan\\s+7\\s+dari\\s+8/i.test(panelText) || /Latihan\\s*7/i.test(panelText)&&/Algoritma/i.test(panelText) || /Algoritma/i.test(activeNavText) || title==="Algoritma" || title==="Algoritma Kelompok" || title==="Ruang Tunggu Algoritma" || title==="Algorithm Race";\n    const already=!!panel.querySelector(".alg-team-shell,.alg-race-wait-shell");\n    if(exercise7Active&&!already)mount(panel);',
        "deteksi Exercise 7 Algoritma"
      );

      // Expose mount so a second safety observer can force takeover if app.js
      // redraws the green exercise page after Algorithm Race has loaded.
      src=replaceRequired(
        src,
        '  function watch(){',
        '  window.AlgorithmRaceStudentV16={mount};\n\n  function watch(){',
        "expose student mount"
      );

      // Dynamic labels; no longer assume four cards per student.
      src=replaceRequired(
        src,
        '{text:"4 kartu / siswa", color:"green", icon:"▣"},',
        '{text:`${GAME.assigned.length} kartu Anda`, color:"green", icon:"▣"},',
        "badge kartu"
      );
      src=replaceRequired(
        src,
        '<p>${size} siswa × 4 kartu = ${GAME.steps.length} langkah</p>',
        '<p>${size} siswa • ${GAME.steps.length} langkah dibagi merata kepada seluruh anggota</p>',
        "deskripsi anggota"
      );
      src=replaceRequired(
        src,
        '<h4>1. Empat kartu Anda</h4>',
        '<h4>1. Kartu Anda</h4>',
        "judul kartu"
      );
      src=replaceRequired(
        src,
        '<div class="alg-counter">${mineCount}/4 ditempatkan</div>',
        '<div class="alg-counter">${mineCount}/${GAME.assigned.length} ditempatkan</div>',
        "counter kartu"
      );
      src=replaceRequired(
        src,
        '<span>Kartu di papan</span>',
        '<span>Kartu saya di papan</span>',
        "label kontribusi"
      );
      src=replaceRequired(
        src,
        '<div class="top"><strong>${mineCount}/4</strong><div class="icon">▣</div></div>',
        '<div class="top"><strong>${mineCount}/${GAME.assigned.length}</strong><div class="icon">▣</div></div>',
        "stat kartu"
      );

      // Add visible race status.
      src=replaceRequired(
        src,
        '<div class="alg-badges">${badges}</div>',
        '<div class="alg-badges">${badges}</div>${raceTaskInfoHtml()}<div class="alg-race-strip"><div><small>Algoritma aktif</small><strong>#<span id="algRaceCurrent">${(Number(GAME.raceRound)||0)+1}</span></strong></div><div><small>Selesai</small><strong><span id="algRaceDone">${raceTeamMetrics().completed}</span></strong></div><div><small>Poin tim</small><strong><span id="algRacePoints">${raceTeamMetrics().points}</span></strong></div><div><small>Sisa waktu</small><strong id="algRaceClock">${raceIsActive()?raceTimeText(raceRemainingMs()):"—"}</strong></div></div>',
        "status race"
      );

      // Stop interactions when time expires.
      src=replaceRequired(src,'  async function place(id,pos){\n    if(GAME.board[pos])return;','  async function place(id,pos){\n    if(raceIsExpired()||GAME.raceEnded)return;\n    if(GAME.board[pos])return;',"guard place");
      src=replaceRequired(src,'  async function removeAt(pos){\n    const x=GAME.board[pos];','  async function removeAt(pos){\n    if(raceIsExpired()||GAME.raceEnded)return;\n    const x=GAME.board[pos];',"guard remove");
      src=replaceRequired(src,'  async function clearMine(){\n    const own=','  async function clearMine(){\n    if(raceIsExpired()||GAME.raceEnded)return;\n    const own=',"guard clear");
      src=replaceRequired(src,'  async function test(){\n    if(Object.keys(GAME.board).length!==GAME.steps.length)return;\n    await bump({tests:1});','  async function test(){\n    if(raceIsExpired()||GAME.raceEnded){await finalizeRaceStudentScore();return;}\n    if(Object.keys(GAME.board).length!==GAME.steps.length)return;\n    await bump({tests:1});\n    if(raceIsActive())await raceIncrementAttempt();',"guard test");
      src=replaceRequired(src,'  async function pushChatMessage(raw){\n    const text=sendableMessage(raw);','  async function pushChatMessage(raw){\n    if(raceIsExpired()||GAME.raceEnded)return false;\n    const text=sendableMessage(raw);',"guard chat");

      // Correct algorithm -> score it and immediately open next algorithm.
      const oldCorrect=RAW`    if(wrong<0){
      GAME.completed=true;
      GAME.lastHint=\`✓ Algoritma benar. Kelompok \${GAME.groupNo} berhasil menyusun seluruh \${GAME.steps.length} langkah.\`;
      if(!GAME.demo)await GAME.rootRef.update({completed:true,completedAt:Date.now(),scenarioId:GAME.scenario.id,stepCount:GAME.steps.length,version:GAME_VERSION});
      render();return;
    }`;
      const newCorrect=RAW`    if(wrong<0){
      if(raceIsActive()){
        GAME.lastHint=\`✓ Algoritma \${(Number(GAME.raceRound)||0)+1} benar. Menghitung poin dan membuka algoritma berikutnya...\`;
        render();
        await completeRaceAlgorithm();
        return;
      }
      GAME.completed=true;
      GAME.lastHint=\`✓ Algoritma benar. Kelompok \${GAME.groupNo} berhasil menyusun seluruh \${GAME.steps.length} langkah.\`;
      if(!GAME.demo)await GAME.rootRef.update({completed:true,completedAt:Date.now(),scenarioId:GAME.scenario.id,stepCount:GAME.steps.length,version:GAME_VERSION});
      render();return;
    }`;
      src=replaceRequired(src,oldCorrect,newCorrect,"alur jawaban benar");

      // Race-aware Firebase root listener.
      const oldListener=RAW`      GAME.meta=v;
      GAME.completed=!!v.completed;
      if(GAME.completed)GAME.lastHint=\`✓ Kelompok \${GAME.groupNo} telah menyelesaikan \${GAME.steps.length} langkah dengan benar.\`;
      render();`;
      const newListener=RAW`      GAME.meta=v;
      const remoteRound=Math.max(0,Number(v.race?.roundIndex||0));
      if(raceIsActive() && remoteRound!==Math.max(0,Number(GAME.raceRound||0))){
        applyRaceRound(remoteRound);
      }
      GAME.raceEnded=raceIsExpired()||!!v.race?.finished;
      GAME.completed=raceIsActive()?false:!!v.completed;
      if(GAME.completed)GAME.lastHint=\`✓ Kelompok \${GAME.groupNo} telah menyelesaikan \${GAME.steps.length} langkah dengan benar.\`;
      render();
      updateRaceClockDom();`;
      src=replaceRequired(src,oldListener,newListener,"listener root");

      // Initialise race as soon as the group connection exists.
      const oldRoot=RAW`    GAME.rootRef=firebase.database().ref(\`kelasExcel/algorithmTeamV3/\${safeId(GAME.student.className)}/\${safeId(currentSessionId())}/group_\${GAME.groupNo}\`);`;
      const newRoot=oldRoot + '\n    ensureRaceState();';
      src=replaceRequired(src,oldRoot,newRoot,"inisialisasi race");

      // Keep the student synced with manager/start/duration.
      src=replaceRequired(
        src,
        '    render();connect();\n    panel.dataset.algMounting="";',
        '    listenRaceManager();startRaceTicker();\n    if(!GAME.demo && !GAME.raceManager?.started){\n      renderRaceWaitingRoom(panel);\n      panel.dataset.algMounting="";\n      return;\n    }\n    render();connect();\n    panel.dataset.algMounting="";',
        "mount waiting/race"
      );

      // CSS additions inside original CSS block.
      src=replaceRequired(
        src,
        '    .alg-members{',
        `
    .alg-race-wait-shell{
      padding:28px 18px 34px;display:grid;place-items:center;min-height:520px;background:#f6f9fc;
    }
    .alg-race-wait-card{
      width:min(760px,100%);background:#fff;border:1px solid #dce7f1;border-radius:24px;
      padding:28px;box-shadow:0 14px 36px rgba(33,66,99,.08);text-align:center;
    }
    .alg-race-wait-icon{
      width:68px;height:68px;margin:0 auto 14px;display:grid;place-items:center;border-radius:22px;
      background:#eef4ff;color:#3169e8;font-size:31px;
    }
    .alg-race-wait-icon.ready{background:#eaf9f1;color:#14945a}
    .alg-race-wait-kicker{display:block;color:#5274a5;font-size:10px;font-weight:950;letter-spacing:.08em}
    .alg-race-wait-card h3{margin:8px 0 7px;color:#17295b;font-size:24px;font-weight:950}
    .alg-race-wait-card>p{width:min(560px,100%);margin:0 auto;color:#647b95;font-size:12px;line-height:1.65}
    .alg-race-wait-status{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:9px;margin-top:22px}
    .alg-race-wait-status>div{padding:11px;border:1px solid #e0e9f2;border-radius:13px;background:#f8fbfe;text-align:left}
    .alg-race-wait-status small{display:block;color:#8192a6;font-size:8px;font-weight:800}
    .alg-race-wait-status strong{display:block;margin-top:4px;color:#274563;font-size:11px}
    .alg-race-wait-team{margin-top:17px;border:1px solid #dfe8f1;border-radius:15px;overflow:hidden;text-align:left}
    .alg-race-wait-team-head{
      display:flex;justify-content:space-between;gap:12px;align-items:center;padding:11px 13px;
      background:#f4f8fc;border-bottom:1px solid #e3ebf3;
    }
    .alg-race-wait-team-head b{color:#2a4667;font-size:10px}
    .alg-race-wait-team-head span{color:#788ba1;font-size:8px}
    .alg-race-wait-members{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px;padding:11px}
    .alg-race-wait-member{
      display:grid;grid-template-columns:30px 1fr;gap:8px;align-items:center;padding:8px;
      border:1px solid #e6edf4;border-radius:10px;background:#fff;
    }
    .alg-race-wait-member>span{
      width:30px;height:30px;display:grid;place-items:center;border-radius:50%;
      background:#edf2f7;color:#54708c;font-size:9px;font-weight:950;
    }
    .alg-race-wait-member.me{border-color:#b9d2ff;background:#f5f9ff}
    .alg-race-wait-member.me>span{background:#3775f5;color:#fff}
    .alg-race-wait-member b{display:block;color:#38526e;font-size:9px}
    .alg-race-wait-member small{display:block;margin-top:2px;color:#8b9aac;font-size:7px}
    .alg-race-wait-empty{grid-column:1/-1;padding:12px;text-align:center;color:#8999aa;font-size:9px}
    .alg-race-wait-notice{
      display:grid;grid-template-columns:32px 1fr;gap:10px;text-align:left;margin-top:17px;padding:11px 12px;
      border-radius:12px;background:#eef6ff;border:1px solid #d0e2fb;
    }
    .alg-race-wait-notice>span{
      width:32px;height:32px;display:grid;place-items:center;border-radius:10px;background:#fff;color:#3471df;
    }
    .alg-race-wait-notice b{display:block;color:#35629b;font-size:9px}
    .alg-race-wait-notice p{margin:3px 0 0;color:#6883a2;font-size:8px;line-height:1.5}
    @media(max-width:720px){
      .alg-race-wait-status{grid-template-columns:repeat(2,minmax(0,1fr))}
      .alg-race-wait-members{grid-template-columns:1fr}
    }

    .alg-task-info{
      display:grid;
      grid-template-columns:1fr 1fr;
      gap:10px;
      margin-top:14px;
    }
    .alg-task-info-card{
      display:grid;
      grid-template-columns:38px minmax(0,1fr);
      gap:10px;
      padding:12px;
      border-radius:14px;
      text-align:left;
    }
    .alg-task-info-card.meaning{
      border:1px solid #bcd7ff;
      background:#f2f7ff;
    }
    .alg-task-info-card.action{
      border:1px solid #bee8d2;
      background:#f0fbf5;
    }
    .alg-task-info-icon{
      width:38px;
      height:38px;
      display:grid;
      place-items:center;
      border-radius:12px;
      background:#fff;
      font-size:16px;
      font-weight:950;
      color:#356dd0;
      box-shadow:0 2px 7px rgba(34,72,112,.08);
    }
    .alg-task-info-card.action .alg-task-info-icon{
      color:#16905c;
    }
    .alg-task-info-card small,
    .alg-task-flow>small{
      display:block;
      color:#70849b;
      font-size:8px;
      font-weight:950;
      letter-spacing:.055em;
    }
    .alg-task-info-card strong{
      display:block;
      margin-top:3px;
      color:#213e67;
      font-size:10px;
      line-height:1.45;
    }
    .alg-task-info-card p{
      margin:5px 0 0;
      color:#5d748f;
      font-size:9px;
      line-height:1.55;
    }
    .alg-task-flow{
      grid-column:1/-1;
      padding:10px 12px;
      border:1px solid #e0e8f1;
      border-radius:13px;
      background:#fff;
      text-align:left;
    }
    .alg-task-flow>div{
      display:flex;
      align-items:center;
      flex-wrap:wrap;
      gap:6px;
      margin-top:7px;
    }
    .alg-task-phase{
      display:inline-flex;
      align-items:center;
      gap:6px;
      padding:6px 8px;
      border-radius:9px;
      background:#f7f9fc;
      border:1px solid #e2e9f1;
      color:#526b85;
      font-size:8px;
      font-weight:850;
    }
    .alg-task-phase b{
      width:18px;
      height:18px;
      display:grid;
      place-items:center;
      border-radius:6px;
      background:#e9f1ff;
      color:#3470da;
      font-size:8px;
    }
    .alg-task-arrow{
      color:#9aa9b8;
      font-style:normal;
      font-size:10px;
      font-weight:900;
    }

    .exercise-score-card.alg-algorithm-time-card{
      min-width:145px;
    }
    .exercise-score-card.alg-algorithm-time-card strong{
      font-size:25px !important;
      letter-spacing:.01em;
      color:#2d66dd !important;
    }
    .exercise-score-card.alg-algorithm-time-card span{
      white-space:nowrap;
    }

    @media(max-width:820px){
      .alg-task-info{grid-template-columns:1fr}
      .alg-task-flow{grid-column:auto}
    }

    .alg-race-strip{
      margin-top:16px;
      display:grid;
      grid-template-columns:repeat(4,minmax(0,1fr));
      gap:9px;
    }
    .alg-race-strip>div{
      padding:10px 12px;border-radius:13px;
      border:1px solid #dbe7f5;background:#fff;
    }
    .alg-race-strip small{
      display:block;color:#748aa4;font-size:10px;font-weight:800;
    }
    .alg-race-strip strong{
      display:block;margin-top:4px;color:#173467;font-size:17px;font-weight:950;
    }
    @media(max-width:760px){
      .alg-race-strip{grid-template-columns:repeat(2,minmax(0,1fr))}
    }

    .alg-members{`,
        "css race strip"
      );

      // Execute patched original source.
      (0,eval)(src);
      window.AlgorithmRaceV12Loaded=true;
      window.dispatchEvent(new CustomEvent("algorithm-race-v12-ready"));
      log("loaded");
    }catch(err){
      console.error("[Algorithm Race V12] Gagal memuat:",err);
      const toast=document.getElementById("toast");
      if(toast){
        toast.textContent="Gagal memuat Algorithm Race V12: "+(err?.message||err);
        toast.classList.remove("hidden");
      }
    }
  }

  load();
})();

;/* ==================== TIM DINAMIS V11 ==================== */

(() => {
  "use strict";

  const PATCH_VERSION = "algorithm-live-teams-v11";
  const MAX_STALE_MS = 60000;
  const HEARTBEAT_MS = 15000;

  const STATE = {
    studentPresenceRef: null,
    studentPresencePath: "",
    studentHeartbeat: null,
    teacherPresenceRef: null,
    teacherManagerRef: null,
    teacherClass: "",
    joined: [],
    manager: {},
    manualModal: null,
    applying: false
  };

  const $ = (q, root=document) => root.querySelector(q);
  const $$ = (q, root=document) => [...root.querySelectorAll(q)];
  const safeId = s => String(s || "").replace(/[^a-zA-Z0-9_-]/g, "_");
  const esc = s => String(s ?? "").replace(/[&<>"']/g, m => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
  }[m]));

  function currentSessionId(){
    try{
      const s = JSON.parse(localStorage.getItem("kelasExcelSettings") || "{}");
      return String(s.sessionId || "default-session");
    }catch(_){
      return "default-session";
    }
  }

  function selectedTeacherClass(){
    return document.querySelector("[data-teacher-class].active")?.dataset.teacherClass
      || document.querySelector("[data-teacher-class]")?.dataset.teacherClass
      || "3P";
  }

  function studentIdentity(){
    const demo = (document.getElementById("studentIdentity")?.textContent || "").includes("Demonstrasi Guru");
    if(demo) return {name:"", className:"", demo:true};

    const name = (document.querySelector("#studentIdentity .student-hello")?.textContent || "")
      .replace(/^Halo,\s*/, "").trim()
      || document.getElementById("studentSelect")?.value
      || "";
    const className = document.getElementById("classSelect")?.value || "";
    return {name, className, demo:false};
  }

  function managerPath(className){
    return `kelasExcel/algorithmManagerV10/${safeId(className)}/${safeId(currentSessionId())}`;
  }

  function lobbyPath(className){
    return `kelasExcel/algorithmTeamV3/${safeId(className)}/${safeId(currentSessionId())}/lobbyV11`;
  }

  function isAlgorithmStudentPage(){
    const view=document.getElementById("studentView");
    if(!view||!view.classList.contains("active"))return false;

    const panel=document.getElementById("exercisePanel");
    if(!panel||panel.classList.contains("hidden"))return false;

    const title=(panel.querySelector(".l2-window-header h3")?.textContent||"").trim();
    return !!(
      panel.querySelector(".alg-team-shell") ||
      panel.querySelector(".alg-race-wait-shell") ||
      title==="Algoritma" ||
      title==="Algoritma Kelompok" ||
      title==="Ruang Tunggu Algoritma" ||
      title==="Algorithm Race"
    );
  }

  function isTeacherPage(){
    return !!document.getElementById("teacherView")?.classList.contains("active");
  }

  function injectCss(){
    if(document.getElementById("algLiveTeamsV11Css")) return;
    const style = document.createElement("style");
    style.id = "algLiveTeamsV11Css";
    style.textContent = `
      .alg-v11-count-wrap{
        margin-top:12px;padding-top:12px;border-top:1px solid #e3ebf4;
      }
      .alg-v11-count-head{
        display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:8px;
      }
      .alg-v11-count-head b{color:#18295b;font-size:12px}
      .alg-v11-count-head span{color:#7a8da3;font-size:9px}
      .alg-v11-count-buttons{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}
      .alg-v11-count-btn{
        min-height:38px;border:1px solid #d8e4f1;border-radius:11px;background:#f8fbff;
        color:#49627f;font-size:11px;font-weight:900;cursor:pointer;
      }
      .alg-v11-count-btn.active{
        color:#2462f3;border:2px solid #4c87ff;background:#eef5ff;
        box-shadow:0 3px 10px rgba(76,135,255,.08);
      }
      .alg-v11-count-btn:disabled{opacity:.5;cursor:not-allowed}
      .alg-v11-presence-note{
        margin-top:8px;padding:7px 9px;border-radius:9px;background:#eef8f3;border:1px solid #d5ebdf;
        color:#34745a;font-size:9px;line-height:1.45;
      }
      .alg-v11-presence-note.warn{background:#fff8e9;border-color:#efdfb4;color:#896514}
      .alg-v11-empty-team{
        margin-top:8px;padding:12px 8px;border:1px dashed #dbe5ef;border-radius:10px;
        color:#8b9aae;text-align:center;font-size:9px;background:#fbfdff;
      }
      .alg-v11-disabled{
        opacity:.48!important;pointer-events:none!important;
      }
      .alg-v11-manual-overlay{
        position:fixed;inset:0;z-index:2147483600;display:flex;align-items:center;justify-content:center;
        padding:18px;background:rgba(17,34,51,.48);backdrop-filter:blur(4px);
      }
      .alg-v11-manual-card{
        width:min(720px,100%);max-height:88vh;display:grid;grid-template-rows:auto minmax(0,1fr) auto;
        overflow:hidden;background:#fff;border:1px solid #dbe5ef;border-radius:20px;
        box-shadow:0 28px 80px rgba(22,46,72,.26);
      }
      .alg-v11-manual-head{
        display:flex;align-items:flex-start;justify-content:space-between;gap:14px;padding:17px 19px;
        border-bottom:1px solid #e6edf4;background:#fbfdff;
      }
      .alg-v11-manual-head h3{margin:0;color:#172b58;font-size:17px}
      .alg-v11-manual-head p{margin:4px 0 0;color:#75899f;font-size:9px;line-height:1.5}
      .alg-v11-manual-close{
        width:34px;height:34px;border:1px solid #dce6ef;border-radius:10px;background:#fff;
        color:#657b93;font-size:18px;cursor:pointer;
      }
      .alg-v11-manual-body{min-height:0;overflow:auto;padding:14px 18px}
      .alg-v11-manual-row{
        display:grid;grid-template-columns:minmax(0,1fr) 150px;gap:12px;align-items:center;
        padding:9px 0;border-bottom:1px solid #eef2f6;
      }
      .alg-v11-manual-row:last-child{border-bottom:0}
      .alg-v11-manual-row strong{color:#314968;font-size:10px}
      .alg-v11-manual-row select{
        min-height:36px;border:1px solid #d7e3ee;border-radius:9px;background:#fff;color:#34506e;
        padding:6px 9px;font:800 9px inherit;
      }
      .alg-v11-manual-foot{
        display:flex;align-items:center;justify-content:flex-end;gap:8px;padding:13px 18px;
        border-top:1px solid #e5edf4;background:#fbfdff;
      }
      .alg-v11-btn{
        min-height:36px;padding:8px 13px;border-radius:10px;border:1px solid #d6e2ee;
        background:#fff;color:#48617d;font-size:9px;font-weight:900;cursor:pointer;
      }
      .alg-v11-btn.primary{background:#3475ff;border-color:#3475ff;color:#fff}
      .alg-v11-phase{
        display:inline-flex;align-items:center;gap:6px;margin-top:6px;padding:4px 7px;border-radius:999px;
        background:#eef5ff;color:#2c69c9;font-size:8px;font-weight:900;
      }
      @media(max-width:700px){
        .alg-v11-manual-row{grid-template-columns:1fr}
      }
    `;
    document.head.appendChild(style);
  }

  function activeJoinedNames(){
    const now = Date.now();
    return [...new Set(
      (STATE.joined || [])
        .filter(x => x && x.name && now - Number(x.lastSeen || 0) <= MAX_STALE_MS)
        .map(x => x.name)
    )].sort((a,b)=>a.localeCompare(b,"id"));
  }

  function selectedTeamCount(){
    const raw = Number(STATE.manager?.teamCount || 5);
    return [3,4,5].includes(raw) ? raw : 5;
  }

  function normalizedManagerTeams(){
    const raw = STATE.manager?.teams;
    const teams = Array.from({length:5},()=>[]);
    if(raw){
      for(let i=0;i<5;i++){
        const v = raw[i] ?? raw[String(i)] ?? raw[i+1] ?? raw[String(i+1)];
        if(Array.isArray(v)) teams[i] = v.filter(Boolean);
        else if(v && typeof v === "object") teams[i] = Object.values(v).filter(Boolean);
      }
    }
    return teams;
  }

  function balancedTeams(names,count){
    const shuffled = [...new Set(names.filter(Boolean))];
    for(let i=shuffled.length-1;i>0;i--){
      const j = Math.floor(Math.random()*(i+1));
      [shuffled[i],shuffled[j]] = [shuffled[j],shuffled[i]];
    }
    const teams = Array.from({length:5},()=>[]);
    shuffled.forEach((name,i)=>teams[i % count].push(name));
    return teams;
  }

  function assignedNames(){
    if(!STATE.manager?.v11Assigned) return [];
    return normalizedManagerTeams().slice(0,selectedTeamCount()).flat();
  }

  function sameMembers(a,b){
    const aa = [...new Set(a)].sort();
    const bb = [...new Set(b)].sort();
    return aa.length === bb.length && aa.every((x,i)=>x===bb[i]);
  }

  async function updateManager(partial){
    const cls = STATE.teacherClass || selectedTeacherClass();
    if(!cls || !window.firebase?.database) return;
    STATE.manager = {...(STATE.manager || {}), ...partial};
    await firebase.database().ref(managerPath(cls)).update(partial);
    applyTeacherUi();
  }

  // ---------- Presence siswa ----------
  async function startStudentPresence(){
    if(!window.firebase?.database || !isAlgorithmStudentPage()) return;

    const st = studentIdentity();
    if(st.demo || !st.name || !st.className) return;

    const path = `${lobbyPath(st.className)}/${safeId(st.name)}`;
    if(STATE.studentPresencePath === path && STATE.studentPresenceRef) return;

    await stopStudentPresence();

    const ref = firebase.database().ref(path);
    STATE.studentPresenceRef = ref;
    STATE.studentPresencePath = path;

    const write = () => ref.update({
      name: st.name,
      className: st.className,
      joinedAt: firebase.database.ServerValue.TIMESTAMP,
      lastSeen: Date.now(),
      page: "algorithm"
    }).catch(()=>{});

    try{ await ref.onDisconnect().remove(); }catch(_){}
    await write();

    STATE.studentHeartbeat = setInterval(()=>{
      if(!isAlgorithmStudentPage()){
        stopStudentPresence();
        return;
      }
      ref.update({lastSeen:Date.now()}).catch(()=>{});
    }, HEARTBEAT_MS);
  }

  async function stopStudentPresence(){
    if(STATE.studentHeartbeat){
      clearInterval(STATE.studentHeartbeat);
      STATE.studentHeartbeat = null;
    }
    const ref = STATE.studentPresenceRef;
    STATE.studentPresenceRef = null;
    STATE.studentPresencePath = "";
    if(ref){
      try{ await ref.remove(); }catch(_){}
    }
  }

  function syncStudentPresence(){
    if(isAlgorithmStudentPage()) startStudentPresence();
    else if(STATE.studentPresenceRef) stopStudentPresence();
  }

  // ---------- Listener guru ----------
  function detachTeacherListeners(){
    if(STATE.teacherPresenceRef){
      try{STATE.teacherPresenceRef.off();}catch(_){}
      STATE.teacherPresenceRef = null;
    }
    if(STATE.teacherManagerRef){
      try{STATE.teacherManagerRef.off();}catch(_){}
      STATE.teacherManagerRef = null;
    }
  }

  function ensureTeacherListeners(){
    if(!isTeacherPage() || !window.firebase?.database) return;
    const cls = selectedTeacherClass();
    if(!cls) return;

    if(STATE.teacherClass === cls && STATE.teacherPresenceRef && STATE.teacherManagerRef) return;

    detachTeacherListeners();
    STATE.teacherClass = cls;
    STATE.joined = [];
    STATE.manager = {};

    STATE.teacherPresenceRef = firebase.database().ref(lobbyPath(cls));
    STATE.teacherPresenceRef.on("value", snap=>{
      const raw = snap.val() || {};
      STATE.joined = Object.values(raw).filter(Boolean);
      applyTeacherUi();
    });

    STATE.teacherManagerRef = firebase.database().ref(managerPath(cls));
    STATE.teacherManagerRef.on("value", snap=>{
      STATE.manager = snap.val() || {};
      applyTeacherUi();
    });
  }

  function clearOriginalMembersIfCollecting(host,count){
    const cards = $$(".alg-tm-team", host);
    cards.forEach((card,i)=>{
      if(i >= count){
        card.style.display = "none";
        return;
      }
      card.style.display = "";
      if(!STATE.manager?.v11Assigned){
        $$(".alg-tm-member,.alg-tm-empty", card).forEach(el=>el.remove());
        if(!card.querySelector(".alg-v11-empty-team")){
          const empty = document.createElement("div");
          empty.className = "alg-v11-empty-team";
          empty.textContent = "Menunggu pembagian tim";
          card.appendChild(empty);
        }
        const small = card.querySelector(".alg-tm-team-head small");
        if(small) small.textContent = "0 anggota";
        const menu = card.querySelector(".alg-tm-more");
        if(menu) menu.classList.add("alg-v11-disabled");
      }else{
        card.querySelector(".alg-v11-empty-team")?.remove();
        card.querySelector(".alg-tm-more")?.classList.remove("alg-v11-disabled");
      }
    });

    const grid = $(".alg-tm-team-grid",host);
    if(grid){
      grid.style.gridTemplateColumns =
        `repeat(${Math.min(count,5)},minmax(0,1fr))`;
    }
  }

  function injectTeamCountControl(host){
    const duration = $(".alg-tm-duration",host);
    if(!duration || duration.querySelector(".alg-v11-count-wrap")) return;

    const wrap = document.createElement("div");
    wrap.className = "alg-v11-count-wrap";
    wrap.innerHTML = `
      <div class="alg-v11-count-head">
        <b>Jumlah tim</b>
        <span>Pilih sebelum membagi siswa</span>
      </div>
      <div class="alg-v11-count-buttons">
        ${[3,4,5].map(n=>`<button type="button" class="alg-v11-count-btn" data-v11-team-count="${n}">${n} tim</button>`).join("")}
      </div>
      <div id="algV11PresenceNote" class="alg-v11-presence-note"></div>
    `;
    duration.appendChild(wrap);

    wrap.addEventListener("click", async e=>{
      const btn = e.target.closest("[data-v11-team-count]");
      if(!btn) return;
      if(STATE.manager?.started) return;

      const count = Number(btn.dataset.v11TeamCount);
      await updateManager({
        teamCount:count,
        v11Assigned:false,
        started:false,
        assignedNames:null,
        assignedAt:null
      });
    });
  }

  function applyTeacherUi(){
    if(STATE.applying) return;
    const host = document.getElementById("algorithmTeacherMonitor");
    if(!host) return;

    STATE.applying = true;
    try{
      injectTeamCountControl(host);

      const joined = activeJoinedNames();
      const count = selectedTeamCount();
      const teams = normalizedManagerTeams();
      const assigned = STATE.manager?.v11Assigned
        ? teams.slice(0,count).flat().filter(Boolean)
        : [];
      const exact = sameMembers(joined,assigned);
      const started = !!STATE.manager?.started;

      // Pilihan jumlah tim.
      $$("[data-v11-team-count]",host).forEach(btn=>{
        btn.classList.toggle("active",Number(btn.dataset.v11TeamCount)===count);
        btn.disabled = started;
      });

      // Jumlah siswa yang benar-benar sedang berada di halaman algoritma.
      const joinedStrong = $(".alg-tm-joined .alg-tm-big strong",host);
      if(joinedStrong) joinedStrong.textContent = String(joined.length);

      const online = $(".alg-tm-online",host);
      if(online){
        online.innerHTML = `<i></i>${
          joined.length
            ? `${joined.length} siswa berada di halaman Latihan Algoritma`
            : "Menunggu siswa membuka Latihan Algoritma"
        }`;
      }

      const note = $("#algV11PresenceNote",host);
      if(note){
        const enough = joined.length >= count;
        note.classList.toggle("warn",!enough || (STATE.manager?.v11Assigned && !exact));
        if(!joined.length){
          note.textContent = "Tim belum dapat dibagi. Tunggu siswa masuk ke halaman Latihan Algoritma.";
        }else if(joined.length < count){
          note.textContent = `${joined.length} siswa sudah masuk. Minimal ${count} siswa diperlukan untuk membuat ${count} tim.`;
        }else if(STATE.manager?.v11Assigned && !exact && !started){
          note.textContent = "Daftar siswa yang berada di halaman berubah. Klik Acak Tim lagi sebelum memulai.";
        }else if(STATE.manager?.v11Assigned){
          note.textContent = `${joined.length} siswa aktif sudah terbagi ke ${count} tim.`;
        }else{
          note.textContent = `${joined.length} siswa aktif siap dibagi. Tidak perlu menunggu seluruh siswa dalam kelas.`;
        }
      }

      // Ringkasan.
      const summaryCards = $$(".alg-tm-summary-card",host);
      if(summaryCards[0]){
        const strong = summaryCards[0].querySelector("strong");
        if(strong) strong.innerHTML = `${count} <span style="font-size:12px">tim</span>`;
      }
      if(summaryCards[1]){
        const strong = summaryCards[1].querySelector("strong");
        if(strong) strong.innerHTML = `${assigned.length} / ${joined.length} <span style="font-size:12px">siswa</span>`;
      }
      if(summaryCards[2]){
        const strong = summaryCards[2].querySelector("strong");
        if(strong){
          let text = "Menunggu siswa";
          if(started) text = "Sedang berjalan";
          else if(STATE.manager?.v11Assigned && exact && joined.length >= count) text = "Siap dimulai";
          else if(STATE.manager?.v11Assigned && !exact) text = "Acak ulang tim";
          else if(joined.length >= count) text = "Siap dibagi";
          strong.textContent = text;
          strong.classList.toggle("ready",text==="Siap dimulai" || text==="Sedang berjalan");
        }
      }

      const total = $(".alg-tm-team-total",host);
      if(total) total.innerHTML = `${count} tim &nbsp; | &nbsp; 👥 ${assigned.length} siswa`;

      clearOriginalMembersIfCollecting(host,count);

      // Button state.
      const shuffle = $("#algTmShuffle",host);
      const manual = $("#algTmManual",host);
      const start = $("#algTmStart",host);

      const canDivide = !started && joined.length >= count;
      if(shuffle){
        shuffle.disabled = !canDivide;
        shuffle.classList.toggle("alg-v11-disabled",!canDivide);
        shuffle.title = canDivide ? "Acak siswa yang sedang berada di halaman" : `Tunggu minimal ${count} siswa masuk`;
      }
      if(manual){
        manual.disabled = !canDivide;
        manual.classList.toggle("alg-v11-disabled",!canDivide);
        manual.title = canDivide ? "Masukkan siswa aktif ke tim secara manual" : `Tunggu minimal ${count} siswa masuk`;
      }
      if(start){
        const canStart = !started && STATE.manager?.v11Assigned && exact && joined.length >= count;
        start.disabled = !started && !canStart;
        start.classList.toggle("alg-v11-disabled",!started && !canStart);
        if(!started){
          start.title = canStart
            ? "Mulai aktivitas dengan pembagian tim ini"
            : "Bagi seluruh siswa yang sedang aktif terlebih dahulu";
        }
      }

      // Perbaiki teks bantuan bawaan.
      const noteBox = $(".alg-tm-note",host);
      if(noteBox){
        noteBox.textContent =
          "◷ Siswa dihitung setelah mereka membuka halaman Latihan Algoritma. Pilih 3, 4, atau 5 tim, lalu Acak Tim. Tidak perlu menunggu seluruh kelas masuk.";
      }
    }finally{
      STATE.applying = false;
    }
  }

  // ---------- Pembagian tim ----------
  async function randomizeActiveStudents(){
    const joined = activeJoinedNames();
    const count = selectedTeamCount();

    if(joined.length < count){
      alert(`Belum cukup siswa. Saat ini ${joined.length} siswa aktif, sedangkan ${count} tim memerlukan minimal ${count} siswa.`);
      return;
    }

    const teams = balancedTeams(joined,count);
    await updateManager({
      teamCount:count,
      teams,
      v11Assigned:true,
      assignedNames:joined,
      assignedAt:Date.now(),
      started:false
    });
  }

  function currentManualAssignments(joined,count){
    const existing = normalizedManagerTeams();
    const map = {};
    if(STATE.manager?.v11Assigned){
      existing.slice(0,count).forEach((team,ti)=>{
        team.forEach(name=>{ if(joined.includes(name)) map[name]=ti+1; });
      });
    }
    joined.forEach((name,i)=>{
      if(!map[name]) map[name]=(i%count)+1;
    });
    return map;
  }

  function closeManualModal(){
    STATE.manualModal?.remove();
    STATE.manualModal = null;
  }

  function openManualModal(){
    const joined = activeJoinedNames();
    const count = selectedTeamCount();
    if(joined.length < count){
      alert(`Belum cukup siswa untuk ${count} tim.`);
      return;
    }

    closeManualModal();
    const assignments = currentManualAssignments(joined,count);
    const overlay = document.createElement("div");
    overlay.className = "alg-v11-manual-overlay";
    overlay.innerHTML = `
      <section class="alg-v11-manual-card">
        <div class="alg-v11-manual-head">
          <div>
            <h3>Masukkan Siswa ke Tim</h3>
            <p>Hanya siswa yang sedang berada di halaman Latihan Algoritma yang ditampilkan. Atur ${joined.length} siswa ke ${count} tim.</p>
          </div>
          <button type="button" class="alg-v11-manual-close" data-v11-close>×</button>
        </div>
        <div class="alg-v11-manual-body">
          ${joined.map(name=>`
            <div class="alg-v11-manual-row">
              <strong>${esc(name)}</strong>
              <select data-v11-student="${esc(name)}">
                ${Array.from({length:count},(_,i)=>`<option value="${i+1}" ${assignments[name]===i+1?"selected":""}>Tim ${i+1}</option>`).join("")}
              </select>
            </div>
          `).join("")}
        </div>
        <div class="alg-v11-manual-foot">
          <button type="button" class="alg-v11-btn" data-v11-close>Batal</button>
          <button type="button" class="alg-v11-btn primary" data-v11-save>Simpan Pembagian Tim</button>
        </div>
      </section>
    `;
    document.body.appendChild(overlay);
    STATE.manualModal = overlay;

    overlay.addEventListener("click",async e=>{
      if(e.target.closest("[data-v11-close]")){
        closeManualModal();
        return;
      }
      if(!e.target.closest("[data-v11-save]")) return;

      const teams = Array.from({length:5},()=>[]);
      $$("[data-v11-student]",overlay).forEach(sel=>{
        const teamNo = Math.max(1,Math.min(count,Number(sel.value)||1));
        teams[teamNo-1].push(sel.dataset.v11Student);
      });

      const empty = teams.slice(0,count).findIndex(team=>!team.length);
      if(empty >= 0){
        alert(`Tim ${empty+1} masih kosong. Pindahkan minimal satu siswa ke tim tersebut.`);
        return;
      }

      await updateManager({
        teamCount:count,
        teams,
        v11Assigned:true,
        assignedNames:joined,
        assignedAt:Date.now(),
        started:false
      });
      closeManualModal();
    });
  }

  function validateStart(){
    const joined = activeJoinedNames();
    const count = selectedTeamCount();
    const assigned = assignedNames();

    if(STATE.manager?.started) return {ok:false, silent:true};
    if(joined.length < count){
      return {ok:false,msg:`Belum cukup siswa untuk ${count} tim.`};
    }
    if(!STATE.manager?.v11Assigned){
      return {ok:false,msg:"Acak Tim atau Masukkan Tim terlebih dahulu."};
    }
    if(!sameMembers(joined,assigned)){
      return {ok:false,msg:"Daftar siswa yang berada di halaman sudah berubah. Acak tim kembali agar semua siswa aktif mendapat tim."};
    }
    const teams = normalizedManagerTeams();
    if(teams.slice(0,count).some(team=>!team.length)){
      return {ok:false,msg:"Masih ada tim kosong. Atur ulang pembagian tim terlebih dahulu."};
    }
    return {ok:true};
  }

  // Capture-phase: hentikan handler bawaan yang selalu memakai seluruh roster kelas.
  document.addEventListener("click",e=>{
    const shuffle = e.target.closest("#algTmShuffle");
    if(shuffle){
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      randomizeActiveStudents();
      return;
    }

    const manual = e.target.closest("#algTmManual");
    if(manual){
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      openManualModal();
      return;
    }

    const start = e.target.closest("#algTmStart");
    if(start && !STATE.manager?.started){
      const check = validateStart();
      if(!check.ok){
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        if(!check.silent && check.msg) alert(check.msg);
      }
    }
  },true);

  // ---------- Sinkronisasi ----------
  function tick(){
    syncStudentPresence();

    if(isTeacherPage()){
      ensureTeacherListeners();
      applyTeacherUi();
    }else if(STATE.teacherPresenceRef || STATE.teacherManagerRef){
      detachTeacherListeners();
      STATE.teacherClass = "";
      STATE.joined = [];
      STATE.manager = {};
    }
  }

  const observer = new MutationObserver(()=>{
    clearTimeout(observer._timer);
    observer._timer = setTimeout(tick,70);
  });

  function init(){
    injectCss();
    observer.observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:["class"]});
    setInterval(tick,2000);
    tick();

    window.addEventListener("beforeunload",()=>{
      try{
        if(STATE.studentPresenceRef) STATE.studentPresenceRef.remove();
      }catch(_){}
    });
  }

  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",init);
  else init();

  window.AlgorithmLiveTeamsV11 = {
    version:PATCH_VERSION,
    refresh:tick,
    joined:activeJoinedNames,
    randomize:randomizeActiveStudents
  };
})();

;/* ================= DASHBOARD RACE V12 ==================== */

(() => {
  "use strict";

  const VERSION="algorithm-race-dashboard-v12";
  const STATE={
    cls:"",
    manager:{},
    groups:{},
    managerRef:null,
    groupRefs:[],
    finalizedSession:"",
    timer:null,
    busyFinalize:false
  };

  const $=(q,r=document)=>r.querySelector(q);
  const esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
  const safeId=s=>String(s||"").replace(/[^a-zA-Z0-9_-]/g,"_");

  function sessionId(){
    try{
      return String(JSON.parse(localStorage.getItem("kelasExcelSettings")||"{}").sessionId||"default-session");
    }catch(_){return "default-session";}
  }

  function selectedClass(){
    return document.querySelector("[data-teacher-class].active")?.dataset.teacherClass
      || document.querySelector("[data-teacher-class]")?.dataset.teacherClass
      || "3P";
  }

  function managerPath(cls){
    return `kelasExcel/algorithmManagerV10/${safeId(cls)}/${safeId(sessionId())}`;
  }

  function groupPath(cls,no){
    return `kelasExcel/algorithmTeamV3/${safeId(cls)}/${safeId(sessionId())}/group_${no}`;
  }

  function teamCount(){
    const n=Number(STATE.manager?.teamCount||5);
    return [3,4,5].includes(n)?n:5;
  }

  function teams(){
    const raw=STATE.manager?.teams||{};
    return Array.from({length:teamCount()},(_,i)=>{
      const v=raw[i]??raw[String(i)]??raw[i+1]??raw[String(i+1)];
      if(Array.isArray(v))return v.filter(Boolean);
      if(v&&typeof v==="object")return Object.values(v).filter(Boolean);
      return [];
    });
  }

  function targetAlgorithms(){
    const d=Number(STATE.manager?.duration||60);
    if(d<=20)return 2;
    if(d<=30)return 3;
    if(d<=40)return 4;
    if(d<=50)return 5;
    return 5;
  }

  function teamMetrics(group){
    const race=group?.race||{};
    const completed=Math.max(0,Number(race.completedCount||0));
    const bonus=Math.max(0,Number(race.bonusPoints||0));
    const points=Math.max(0,Number(race.teamPoints||0));
    const target=targetAlgorithms();
    const progress=Math.min(100,(completed/Math.max(1,target))*100);
    const efficiency=completed?Math.min(100,(bonus/(completed*4))*100):0;
    const score=Math.max(0,Math.min(100,Math.round(progress*.8+efficiency*.2)));
    return {
      completed,bonus,points,target,progress,efficiency,score,
      totalElapsed:Number(race.totalElapsedSeconds||0),
      currentRound:Number(race.roundIndex||0)+1,
      finished:!!race.finished
    };
  }

  function contributionFor(name,group,members){
    const stats=group?.members?.[safeId(name)]||{};
    const m=teamMetrics(group);
    const chat=Object.values(group?.chat||{}).filter(x=>x&&x.name===name&&!x.system).length;
    const stepCount=Math.max(1,Number(group?.stepCount||16));
    const cardsPerRound=Math.max(1,Math.ceil(stepCount/Math.max(1,members.length)));
    const attempted=(Number(stats.placements||0)+Number(stats.revisions||0)+Number(stats.tests||0)+chat)>0?1:0;
    const rounds=Math.max(1,m.completed+attempted);
    const placementTarget=Math.max(1,cardsPerRound*rounds);
    const revisionTarget=Math.max(1,Math.ceil(rounds*.75));
    const testTarget=Math.max(1,Math.ceil(rounds/2));
    const chatTarget=Math.max(2,rounds*2);

    const ps=Math.min(100,(Number(stats.placements||0)/placementTarget)*100);
    const rs=Math.min(100,(Number(stats.revisions||0)/revisionTarget)*100);
    const ts=Math.min(100,(Number(stats.tests||0)/testTarget)*100);
    const cs=Math.min(100,(chat/chatTarget)*100);
    const contribution=Math.round(ps*.40+rs*.25+ts*.15+cs*.20);
    const finalScore=Math.max(0,Math.min(100,Math.round(m.score*.70+contribution*.30)));

    return {stats,chat,contribution,finalScore,...m};
  }

  function timeLeft(){
    const start=Number(STATE.manager?.startedAt||0);
    const dur=Math.max(1,Number(STATE.manager?.duration||60))*60000;
    return start?Math.max(0,start+dur-Date.now()):0;
  }

  function timeText(ms){
    const sec=Math.max(0,Math.ceil(ms/1000));
    return `${String(Math.floor(sec/60)).padStart(2,"0")}:${String(sec%60).padStart(2,"0")}`;
  }

  function injectCss(){
    if($("#algRaceTeacherCss"))return;
    const s=document.createElement("style");
    s.id="algRaceTeacherCss";
    s.textContent=`
      .alg-race-teacher{
        margin-top:16px;padding:16px;background:#fff;border:1px solid #dce8f4;border-radius:20px;
        box-shadow:0 7px 20px rgba(39,81,119,.04);
      }
      .alg-race-teacher-head{display:flex;align-items:flex-start;justify-content:space-between;gap:14px;margin-bottom:12px}
      .alg-race-teacher-head h4{margin:0;color:#17265c;font-size:17px;font-weight:900}
      .alg-race-teacher-head p{margin:4px 0 0;color:#71849b;font-size:10px;line-height:1.5}
      .alg-race-clock{
        min-width:110px;padding:9px 12px;border:1px solid #d7e4f2;border-radius:12px;background:#f7fbff;
        text-align:center;color:#2559c7;
      }
      .alg-race-clock small{display:block;color:#71849b;font-size:8px}
      .alg-race-clock strong{display:block;margin-top:2px;font-size:18px}
      .alg-race-leaderboard{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:9px;margin:12px 0}
      .alg-race-team{
        padding:11px;border:1px solid #dde7f1;border-radius:13px;background:#fbfdff;min-width:0
      }
      .alg-race-team.rank1{border-color:#f0d58b;background:#fffaf0}
      .alg-race-team b{display:block;color:#213d66;font-size:11px}
      .alg-race-team .big{display:block;margin-top:5px;color:#235fd6;font-size:18px;font-weight:950}
      .alg-race-team small{display:block;margin-top:3px;color:#788ba1;font-size:8px;line-height:1.4}
      .alg-race-table-wrap{overflow:auto;border:1px solid #e0e8f1;border-radius:12px;margin-top:12px}
      .alg-race-table{width:100%;min-width:900px;border-collapse:collapse;font-size:9px}
      .alg-race-table th,.alg-race-table td{padding:9px 8px;border-bottom:1px solid #e6ecf2;text-align:center}
      .alg-race-table th{background:#f3f7fb;color:#5e748e;font-size:8px}
      .alg-race-table td:nth-child(2){text-align:left;font-weight:850;color:#324d6d}
      .alg-race-final-note{
        margin-top:10px;padding:10px 12px;border-radius:11px;background:#eef8f3;border:1px solid #d3eadc;
        color:#357159;font-size:9px;line-height:1.5;
      }
      .alg-race-formula{
        margin-top:10px;padding:10px 12px;border-radius:11px;background:#f3f7ff;border:1px solid #d8e4f5;
        color:#49627e;font-size:9px;line-height:1.6;
      }
      @media(max-width:1000px){.alg-race-leaderboard{grid-template-columns:repeat(2,minmax(0,1fr))}}
    `;
    document.head.appendChild(s);
  }

  function detach(){
    try{STATE.managerRef?.off()}catch(_){}
    STATE.managerRef=null;
    STATE.groupRefs.forEach(r=>{try{r.off()}catch(_){}});
    STATE.groupRefs=[];
    STATE.groups={};
  }

  function listen(){
    if(!window.firebase?.database)return;
    const cls=selectedClass();
    if(STATE.cls===cls&&STATE.managerRef)return;

    detach();
    STATE.cls=cls;
    STATE.managerRef=firebase.database().ref(managerPath(cls));
    STATE.managerRef.on("value",snap=>{
      STATE.manager=snap.val()||{};
      listenGroups();
      render();
    });
  }

  function listenGroups(){
    const count=teamCount();
    STATE.groupRefs.forEach(r=>{try{r.off()}catch(_){}});
    STATE.groupRefs=[];
    STATE.groups={};

    for(let i=1;i<=count;i++){
      const ref=firebase.database().ref(groupPath(STATE.cls,i));
      STATE.groupRefs.push(ref);
      ref.on("value",snap=>{
        STATE.groups[i]=snap.val()||{};
        render();
      });
    }
  }

  function studentRows(){
    const ts=teams();
    const rows=[];
    ts.forEach((members,idx)=>{
      const group=STATE.groups[idx+1]||{};
      members.forEach(name=>{
        rows.push({
          name,
          groupNo:idx+1,
          ...contributionFor(name,group,members)
        });
      });
    });
    return rows;
  }

  function render(){
    injectCss();
    const host=$("#algorithmTeacherMonitor");
    if(!host)return;
    let panel=$("#algRaceTeacherPanel",host);
    if(!panel){
      panel=document.createElement("section");
      panel.id="algRaceTeacherPanel";
      panel.className="alg-race-teacher";
      host.appendChild(panel);
    }

    const count=teamCount();
    const teamRows=Array.from({length:count},(_,i)=>{
      const m=teamMetrics(STATE.groups[i+1]||{});
      return {no:i+1,...m};
    }).sort((a,b)=>
      b.completed-a.completed ||
      b.points-a.points ||
      a.totalElapsed-b.totalElapsed ||
      a.no-b.no
    );

    const started=!!STATE.manager?.started;
    const ended=started&&timeLeft()<=0;
    const rows=studentRows();
    const average=rows.length?Math.round(rows.reduce((s,r)=>s+r.finalScore,0)/rows.length):0;
    const best=rows.length?[...rows].sort((a,b)=>b.finalScore-a.finalScore)[0]:null;

    panel.innerHTML=`
      <div class="alg-race-teacher-head">
        <div>
          <h4>🏁 Algorithm Race — Skor & Progres</h4>
          <p>Tim mengerjakan algoritma berurutan sampai waktu habis. Peringkat utama ditentukan oleh jumlah algoritma selesai, lalu poin.</p>
        </div>
        <div class="alg-race-clock"><small>${ended?"Waktu habis":"Sisa waktu"}</small><strong>${started?timeText(timeLeft()):"Belum mulai"}</strong></div>
      </div>

      <div class="alg-race-formula">
        <b>Skor kompetisi:</b> 20 poin setiap algoritma benar + bonus waktu 0–4.
        <b>Peringkat:</b> jumlah algoritma selesai → total poin → waktu.
        <br><b>Nilai Tim:</b> 80% progres target + 20% efisiensi bonus.
        <b>Nilai siswa:</b> 70% Nilai Tim + 30% kontribusi individu.
      </div>

      <div class="alg-race-leaderboard">
        ${teamRows.map((t,i)=>`
          <article class="alg-race-team ${i===0&&t.completed?"rank1":""}">
            <b>${i+1}. Tim ${t.no}</b>
            <span class="big">${t.completed} selesai</span>
            <small>Algoritma aktif #${t.currentRound}<br>${t.points} poin • Nilai Tim ${t.score}</small>
          </article>
        `).join("")}
      </div>

      <div class="alg-race-table-wrap">
        <table class="alg-race-table">
          <thead>
            <tr>
              <th>Peringkat</th><th>Siswa</th><th>Tim</th><th>Algoritma Selesai</th>
              <th>Poin Tim</th><th>Nilai Tim</th><th>Kontribusi</th><th>Nilai Akhir</th>
            </tr>
          </thead>
          <tbody>
            ${rows.length?[...rows].sort((a,b)=>b.finalScore-a.finalScore).map((r,i)=>`
              <tr>
                <td>${i+1}</td><td>${esc(r.name)}</td><td>Tim ${r.groupNo}</td>
                <td>${r.completed}</td><td>${r.points}</td><td>${r.score}</td>
                <td>${r.contribution}</td><td><b>${r.finalScore}</b></td>
              </tr>
            `).join(""):`<tr><td colspan="8">Belum ada siswa yang terbagi.</td></tr>`}
          </tbody>
        </table>
      </div>

      ${ended?`<div class="alg-race-final-note">✓ Waktu selesai. Rata-rata nilai kelas saat ini <b>${average}</b>${best?`, nilai tertinggi <b>${best.finalScore}</b> oleh <b>${esc(best.name)}</b>`:""}. Nilai Latihan 7 akan disimpan otomatis.</div>`:""}
    `;

    if(ended) finalizeAllStudents();
  }

  async function finalizeAllStudents(){
    if(STATE.busyFinalize||!STATE.manager?.started)return;
    const sessionKey=`${STATE.cls}::${sessionId()}::${STATE.manager.startedAt||0}`;
    if(STATE.finalizedSession===sessionKey)return;
    STATE.busyFinalize=true;

    try{
      const ref=firebase.database().ref(managerPath(STATE.cls)+"/raceFinalizedAt");
      const tx=await ref.transaction(cur=>cur||Date.now());
      if(!tx.committed && tx.snapshot?.val()){
        STATE.finalizedSession=sessionKey;
        return;
      }

      const ts=teams();
      for(let gi=0;gi<ts.length;gi++){
        const members=ts[gi];
        const group=STATE.groups[gi+1]||{};
        for(const name of members){
          const metrics=contributionFor(name,group,members);
          const key=safeId(`${STATE.cls}::${name}`);
          const pRef=firebase.database().ref(`kelasExcel/progress/${key}`);
          const snap=await pRef.once("value");
          const rec=snap.val()||{name,className:STATE.cls};

          rec.name=name;
          rec.className=STATE.cls;
          rec.completedExercises ||= Array(8).fill(false);
          rec.exerciseScores ||= Array(8).fill(null);
          rec.exerciseCompletedAt ||= Array(8).fill(null);
          rec.exerciseCompletedSeconds ||= Array(8).fill(null);
          rec.exerciseStartedAt ||= Array(8).fill(null);
          rec.exerciseState ||= {};

          rec.completedExercises[6]=true;
          rec.exerciseScores[6]=metrics.finalScore;
          rec.exerciseCompletedAt[6]=Date.now();
          rec.exerciseCompletedSeconds[6]=Math.max(
            1,
            Math.min(7200,Math.round(Number(STATE.manager.duration||60)*60))
          );
          rec.exerciseState[6]={
            ...(rec.exerciseState[6]||{}),
            teamAlgorithmRace:{
              version:"race-v12",
              sessionId:sessionId(),
              groupNo:gi+1,
              groupSize:members.length,
              completedAlgorithms:metrics.completed,
              teamPoints:metrics.points,
              targetAlgorithms:metrics.target,
              teamScore:metrics.score,
              contributionScore:metrics.contribution,
              finalScore:metrics.finalScore,
              contribution:{
                placements:Number(metrics.stats?.placements||0),
                revisions:Number(metrics.stats?.revisions||0),
                tests:Number(metrics.stats?.tests||0),
                chatMessages:metrics.chat
              }
            }
          };

          const nums=rec.exerciseScores.filter(Number.isFinite);
          rec.score=Math.round(nums.reduce((a,b)=>a+b,0)/Math.max(1,nums.length));
          await pRef.set(rec);
        }
      }
      STATE.finalizedSession=sessionKey;
    }catch(err){
      console.error("[Algorithm Race Dashboard] finalisasi gagal:",err);
    }finally{
      STATE.busyFinalize=false;
    }
  }

  function tick(){
    const teacher=document.getElementById("teacherView");
    if(teacher?.classList.contains("active")){
      listen();
      render();
    }
  }

  function init(){
    injectCss();
    const obs=new MutationObserver(()=>{
      clearTimeout(obs._t);
      obs._t=setTimeout(tick,80);
    });
    obs.observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:["class"]});
    STATE.timer=setInterval(tick,1000);
    tick();
  }

  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);
  else init();
})();

/* ========================= END ============================ */


;/* ================= V16 STUDENT TAKEOVER GUARD ================= */
(() => {
  "use strict";

  let mounting=false;
  let lastAttempt=0;

  function exercise7IsActive(){
    const view=document.getElementById("studentView");
    if(!view||!view.classList.contains("active"))return false;

    const panel=document.getElementById("exercisePanel");
    if(!panel||panel.classList.contains("hidden"))return false;

    const text=String(panel.textContent||"");
    const header=String(
      panel.querySelector(".l2-window-header h3")?.textContent ||
      panel.querySelector("h1,h2,h3")?.textContent ||
      ""
    );
    const activeNav=String(
      document.querySelector(".student-ex-card.active,.exercise-card.active")?.textContent||""
    );

    return (
      /Jendela\s+latihan\s+7\s+dari\s+8/i.test(text) ||
      (/Latihan\s*7/i.test(text) && /Algoritma/i.test(text)) ||
      /Algoritma/i.test(activeNav) ||
      /^(Algoritma|Algoritma Kelompok|Ruang Tunggu Algoritma|Algorithm Race)$/i.test(header.trim())
    );
  }

  async function forceBlueAlgorithmUi(){
    if(mounting)return;
    if(!exercise7IsActive())return;

    const panel=document.getElementById("exercisePanel");
    if(!panel)return;

    // The correct/new UI is already mounted.
    if(panel.querySelector(".alg-team-shell,.alg-race-wait-shell"))return;

    const api=window.AlgorithmRaceStudentV16;
    if(!api?.mount)return;

    const now=Date.now();
    if(now-lastAttempt<500)return;
    lastAttempt=now;

    mounting=true;
    try{
      panel.dataset.algMounting="";
      await api.mount(panel);
    }catch(err){
      console.error("[Algorithm Race V16] Student takeover failed:",err);
    }finally{
      mounting=false;
    }
  }

  const observer=new MutationObserver(()=>{
    clearTimeout(observer._v16t);
    observer._v16t=setTimeout(forceBlueAlgorithmUi,60);
  });

  function start(){
    observer.observe(document.documentElement,{
      subtree:true,
      childList:true,
      attributes:true,
      attributeFilter:["class"]
    });

    window.addEventListener("algorithm-race-v12-ready",forceBlueAlgorithmUi);
    setInterval(forceBlueAlgorithmUi,700);
    forceBlueAlgorithmUi();
  }

  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",start,{once:true});
  }else{
    start();
  }

  window.AlgorithmRaceTakeoverV16={
    refresh:forceBlueAlgorithmUi,
    isExercise7Active:exercise7IsActive
  };
})();


;/* ================= V17 TEACHER PANEL + PROGRESS POPUP ================= */
(() => {
  "use strict";

  const VERSION="teacher-algorithm-panel-v17";
  let observer=null;
  let syncTimer=null;
  let syncing=false;

  function algorithmAccessCard(){
    // Latihan Algoritma adalah indeks ke-6 (Latihan 7) pada app.js.
    return document.querySelector('[data-preview-lock="6"]');
  }

  function algorithmPanelIsOn(){
    const card=algorithmAccessCard();
    if(!card)return false;

    return (
      card.classList.contains("open") ||
      !!card.querySelector(".teacher-switch.on") ||
      /Dibuka/i.test(card.textContent||"")
    );
  }

  function teacherViewActive(){
    return !!document.getElementById("teacherView")?.classList.contains("active");
  }

  function ensureUiCss(){
    if(document.getElementById("algV17TeacherCss"))return;

    const style=document.createElement("style");
    style.id="algV17TeacherCss";
    style.textContent=`
      /* Panel pengelolaan algoritma hanya terlihat jika Latihan 7 dibuka. */
      body:not(.alg-v17-algorithm-on) #algorithmTeacherMonitor{
        display:none !important;
      }

      /* Panel progress tidak lagi tampil memanjang di halaman guru. */
      #algRaceTeacherPanel{
        display:none !important;
      }

      /* Area tombol guru dibuat dapat turun ke baris berikutnya. */
      #algorithmTeacherMonitor .alg-tm-actions{
        flex-wrap:wrap !important;
        align-content:center;
      }

      #algTmProgressV17{
        flex:1 0 100%;
        width:100%;
        min-height:38px;
        margin-top:7px;
        border:1px solid #cbb5f4;
        border-radius:11px;
        background:linear-gradient(180deg,#f5f0ff,#eee6ff);
        color:#7043b4;
        font-size:10px;
        font-weight:950;
        cursor:pointer;
        box-shadow:0 3px 10px rgba(112,67,180,.08);
      }
      #algTmProgressV17:hover{
        background:linear-gradient(180deg,#efe7ff,#e8ddff);
      }

      #algProgressBackdropV17{
        display:none;
        position:fixed;
        inset:0;
        z-index:2147483000;
        background:rgba(14,29,47,.48);
        backdrop-filter:blur(4px);
      }

      #algProgressCloseV17{
        display:none;
        position:fixed;
        z-index:2147483200;
        top:max(20px,calc(5vh + 10px));
        right:max(20px,calc((100vw - 1120px)/2 + 24px));
        width:38px;
        height:38px;
        border:1px solid #d7e2ed;
        border-radius:12px;
        background:#fff;
        color:#526b84;
        font-size:20px;
        line-height:1;
        cursor:pointer;
        box-shadow:0 8px 22px rgba(24,45,68,.18);
      }

      body.alg-v17-progress-open{
        overflow:hidden !important;
      }
      body.alg-v17-progress-open #algProgressBackdropV17,
      body.alg-v17-progress-open #algProgressCloseV17{
        display:block;
      }

      body.alg-v17-progress-open #algRaceTeacherPanel{
        display:block !important;
        position:fixed !important;
        z-index:2147483100 !important;
        top:5vh !important;
        left:50% !important;
        transform:translateX(-50%) !important;
        width:min(1120px,calc(100vw - 32px)) !important;
        max-height:90vh !important;
        overflow:auto !important;
        margin:0 !important;
        border-radius:20px !important;
        box-shadow:0 28px 80px rgba(13,35,60,.28) !important;
        background:#fff !important;
      }

      body.alg-v17-progress-open #algRaceTeacherPanel .alg-race-teacher-head{
        padding-right:56px !important;
      }

      @media(max-width:720px){
        #algTmProgressV17{
          min-height:42px;
        }
        body.alg-v17-progress-open #algRaceTeacherPanel{
          width:calc(100vw - 18px) !important;
          top:2vh !important;
          max-height:96vh !important;
        }
        #algProgressCloseV17{
          top:16px;
          right:16px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function ensurePopupChrome(){
    if(!document.getElementById("algProgressBackdropV17")){
      const backdrop=document.createElement("div");
      backdrop.id="algProgressBackdropV17";
      backdrop.addEventListener("click",closeProgress);
      document.body.appendChild(backdrop);
    }

    if(!document.getElementById("algProgressCloseV17")){
      const close=document.createElement("button");
      close.id="algProgressCloseV17";
      close.type="button";
      close.setAttribute("aria-label","Tutup progress");
      close.textContent="×";
      close.addEventListener("click",closeProgress);
      document.body.appendChild(close);
    }
  }

  function openProgress(){
    if(!algorithmPanelIsOn())return;

    const panel=document.getElementById("algRaceTeacherPanel");
    if(!panel){
      alert("Panel progress belum siap. Tunggu beberapa saat lalu coba lagi.");
      return;
    }

    document.body.classList.add("alg-v17-progress-open");
  }

  function closeProgress(){
    document.body.classList.remove("alg-v17-progress-open");
  }

  function ensureProgressButton(){
    const host=document.getElementById("algorithmTeacherMonitor");
    if(!host)return;

    const actions=host.querySelector(".alg-tm-actions");
    if(!actions)return;

    let button=actions.querySelector("#algTmProgressV17");
    if(button)return;

    button=document.createElement("button");
    button.type="button";
    button.id="algTmProgressV17";
    button.innerHTML="📊 &nbsp; Progress";
    button.title="Buka progress Algorithm Race";
    button.addEventListener("click",openProgress);

    actions.appendChild(button);
  }

  function sync(){
    if(syncing)return;
    syncing=true;

    try{
      ensureUiCss();
      ensurePopupChrome();

      const on=teacherViewActive() && algorithmPanelIsOn();
      document.body.classList.toggle("alg-v17-algorithm-on",on);

      if(!on){
        closeProgress();
        return;
      }

      ensureProgressButton();
    }finally{
      syncing=false;
    }
  }

  function init(){
    ensureUiCss();
    ensurePopupChrome();

    observer=new MutationObserver(()=>{
      clearTimeout(observer._v17timer);
      observer._v17timer=setTimeout(sync,40);
    });

    observer.observe(document.documentElement,{
      subtree:true,
      childList:true,
      attributes:true,
      attributeFilter:["class"]
    });

    document.addEventListener("keydown",e=>{
      if(e.key==="Escape")closeProgress();
    });

    syncTimer=setInterval(sync,500);
    sync();

    window.AlgorithmTeacherPanelV17={
      version:VERSION,
      sync,
      openProgress,
      closeProgress,
      isOn:algorithmPanelIsOn
    };
  }

  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",init,{once:true});
  }else{
    init();
  }
})();


;/* ================= V18 STOP + RESET ================= */
(() => {
  "use strict";

  const VERSION="algorithm-stop-reset-v18";
  let managerRef=null;
  let managerState={};
  let currentClass="";
  let busy=false;

  const safeId=s=>String(s||"").replace(/[^a-zA-Z0-9_-]/g,"_");

  function sessionId(){
    try{
      return String(JSON.parse(localStorage.getItem("kelasExcelSettings")||"{}").sessionId||"default-session");
    }catch(_){
      return "default-session";
    }
  }

  function selectedClass(){
    return document.querySelector("[data-teacher-class].active")?.dataset.teacherClass
      || document.querySelector("[data-teacher-class]")?.dataset.teacherClass
      || "3P";
  }

  function managerPath(cls){
    return `kelasExcel/algorithmManagerV10/${safeId(cls)}/${safeId(sessionId())}`;
  }

  function groupsBase(cls){
    return `kelasExcel/algorithmTeamV3/${safeId(cls)}/${safeId(sessionId())}`;
  }

  function teacherActive(){
    return !!document.getElementById("teacherView")?.classList.contains("active");
  }

  function algorithmOn(){
    return !!window.AlgorithmTeacherPanelV17?.isOn?.();
  }

  function ensureCss(){
    if(document.getElementById("algV18StopResetCss"))return;

    const style=document.createElement("style");
    style.id="algV18StopResetCss";
    style.textContent=`
      #algTmStopResetV18{
        flex:1 1 220px;
        min-width:220px;
        display:grid;
        grid-template-columns:1fr 1fr;
        gap:8px;
        align-self:stretch;
      }

      #algTmStopV18,
      #algTmResetV18{
        min-height:46px;
        border-radius:11px;
        font-size:10px;
        font-weight:950;
        cursor:pointer;
        transition:.15s ease;
      }

      #algTmStopV18{
        border:1px solid #f0b4b8;
        background:linear-gradient(180deg,#fff5f5,#ffe9ea);
        color:#c7444f;
      }
      #algTmStopV18:hover:not(:disabled){
        background:linear-gradient(180deg,#ffeded,#ffdee1);
      }

      #algTmResetV18{
        border:1px solid #d4dce6;
        background:linear-gradient(180deg,#ffffff,#f2f5f8);
        color:#536b84;
      }
      #algTmResetV18:hover:not(:disabled){
        background:linear-gradient(180deg,#f8fafc,#e9eef3);
      }

      #algTmStopV18:disabled,
      #algTmResetV18:disabled{
        opacity:.45;
        cursor:not-allowed;
      }

      .alg-v18-stop-note{
        flex:1 0 100%;
        padding:7px 9px;
        border-radius:9px;
        border:1px solid #f0c7ca;
        background:#fff4f4;
        color:#9b454d;
        font-size:8px;
        line-height:1.45;
        display:none;
      }

      body.alg-v18-stopped .alg-v18-stop-note{
        display:block;
      }

      @media(max-width:760px){
        #algTmStopResetV18{
          min-width:100%;
          flex-basis:100%;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function ensureButtons(){
    const host=document.getElementById("algorithmTeacherMonitor");
    if(!host)return;

    const actions=host.querySelector(".alg-tm-actions");
    if(!actions)return;

    let wrap=actions.querySelector("#algTmStopResetV18");
    if(!wrap){
      wrap=document.createElement("div");
      wrap.id="algTmStopResetV18";
      wrap.innerHTML=`
        <button type="button" id="algTmStopV18">■ Stop</button>
        <button type="button" id="algTmResetV18">↺ Reset</button>
      `;

      const progress=actions.querySelector("#algTmProgressV17");
      if(progress) actions.insertBefore(wrap,progress);
      else actions.appendChild(wrap);

      wrap.querySelector("#algTmStopV18")?.addEventListener("click",stopGame);
      wrap.querySelector("#algTmResetV18")?.addEventListener("click",resetGame);
    }

    if(!actions.querySelector(".alg-v18-stop-note")){
      const note=document.createElement("div");
      note.className="alg-v18-stop-note";
      note.textContent="Permainan dihentikan. Nilai sesi ini tidak dihitung. Tekan Reset sebelum memulai sesi baru.";
      const progress=actions.querySelector("#algTmProgressV17");
      if(progress) actions.insertBefore(note,progress);
      else actions.appendChild(note);
    }

    updateButtonState();
  }

  function updateButtonState(){
    const stop=document.getElementById("algTmStopV18");
    const reset=document.getElementById("algTmResetV18");

    const started=!!managerState.started;
    const stopped=!!managerState.stopped;

    document.body.classList.toggle("alg-v18-stopped",stopped);

    if(stop){
      stop.disabled=busy||!started;
      stop.title=started
        ?"Hentikan permainan sekarang tanpa menghitung nilai"
        :"Stop hanya aktif saat permainan sedang berjalan";
    }

    if(reset){
      const hasData=!!(
        managerState.teams ||
        managerState.v11Assigned ||
        managerState.started ||
        managerState.stopped ||
        managerState.startedAt ||
        managerState.raceFinalizedAt
      );
      reset.disabled=busy||!hasData;
      reset.title=hasData
        ?"Hapus pembagian tim dan seluruh progres sesi Algoritma saat ini"
        :"Belum ada sesi yang perlu direset";
    }

    const start=document.getElementById("algTmStart");
    if(start && stopped){
      start.disabled=true;
      start.classList.add("alg-v11-disabled");
      start.title="Permainan telah dihentikan. Tekan Reset sebelum memulai lagi.";
    }

    // Perjelas status ringkasan setelah Stop.
    if(stopped){
      const host=document.getElementById("algorithmTeacherMonitor");
      const cards=host?.querySelectorAll(".alg-tm-summary-card");
      const statusStrong=cards?.[2]?.querySelector("strong");
      if(statusStrong){
        statusStrong.textContent="Dihentikan";
        statusStrong.classList.remove("ready");
      }
    }
  }

  function attachManager(){
    if(!teacherActive()||!window.firebase?.database)return;

    const cls=selectedClass();
    if(!cls)return;

    if(currentClass===cls && managerRef)return;

    if(managerRef){
      try{managerRef.off();}catch(_){}
    }

    currentClass=cls;
    managerState={};
    managerRef=firebase.database().ref(managerPath(cls));
    managerRef.on("value",snap=>{
      managerState=snap.val()||{};
      ensureButtons();
      updateButtonState();
    });
  }

  async function stopGame(){
    if(busy||!managerState.started||!window.firebase?.database)return;

    const ok=window.confirm(
      "Hentikan permainan Algoritma sekarang?\n\nNilai sesi ini TIDAK akan dihitung. Untuk memulai sesi baru, gunakan tombol Reset."
    );
    if(!ok)return;

    busy=true;
    updateButtonState();

    const cls=selectedClass();
    const stoppedAt=Date.now();

    try{
      // started=false menghentikan timer siswa dan mencegah finalisasi nilai.
      await firebase.database().ref(managerPath(cls)).update({
        started:false,
        stopped:true,
        stoppedAt,
        stopRequiresReset:true,
        scoreDisabled:true,
        raceFinalizedAt:null
      });

      // Tandai setiap race sebagai dibatalkan. Data tetap disimpan sementara
      // agar guru masih dapat melihat kondisi terakhir sampai menekan Reset.
      const updates={};
      for(let i=1;i<=5;i++){
        updates[`group_${i}/race/cancelled`]=true;
        updates[`group_${i}/race/stoppedAt`]=stoppedAt;
        updates[`group_${i}/race/scoreDisabled`]=true;
      }
      await firebase.database().ref(groupsBase(cls)).update(updates);

      window.AlgorithmTeacherPanelV17?.closeProgress?.();
    }catch(err){
      console.error("[V18] Stop gagal:",err);
      alert("Gagal menghentikan permainan. Periksa koneksi Firebase lalu coba lagi.");
    }finally{
      busy=false;
      updateButtonState();
    }
  }

  async function resetGame(){
    if(busy||!window.firebase?.database)return;

    const ok=window.confirm(
      "Reset sesi Algoritma?\n\nPembagian tim, chat, papan, poin, dan progres Algorithm Race sesi saat ini akan dihapus. Siswa yang masih membuka halaman tetap terdeteksi dan dapat dibagi tim kembali."
    );
    if(!ok)return;

    busy=true;
    updateButtonState();

    const cls=selectedClass();

    try{
      // Simpan preferensi guru yang layak dipertahankan.
      const keepDuration=Number(managerState.duration)||50;
      const keepTeamCount=[3,4,5].includes(Number(managerState.teamCount))
        ?Number(managerState.teamCount)
        :4;

      // Hapus seluruh data group/race, tetapi lobbyV11 tidak disentuh.
      const groupReset={};
      for(let i=1;i<=5;i++) groupReset[`group_${i}`]=null;
      await firebase.database().ref(groupsBase(cls)).update(groupReset);

      // Kembalikan manager ke kondisi sebelum pembagian tim.
      await firebase.database().ref(managerPath(cls)).set({
        duration:keepDuration,
        teamCount:keepTeamCount,
        teams:null,
        v11Assigned:false,
        assignedNames:null,
        assignedAt:null,
        started:false,
        startedAt:null,
        stopped:false,
        stoppedAt:null,
        stopRequiresReset:false,
        scoreDisabled:false,
        raceFinalizedAt:null,
        resetAt:Date.now()
      });

      window.AlgorithmTeacherPanelV17?.closeProgress?.();

      // Beri kesempatan listener existing memperbarui UI.
      setTimeout(()=>{
        window.AlgorithmLiveTeamsV11?.refresh?.();
        window.AlgorithmTeacherPanelV17?.sync?.();
      },100);
    }catch(err){
      console.error("[V18] Reset gagal:",err);
      alert("Gagal mereset sesi. Periksa koneksi Firebase lalu coba lagi.");
    }finally{
      busy=false;
      updateButtonState();
    }
  }

  // Cegah tombol Mulai dipakai lagi setelah Stop sebelum Reset.
  document.addEventListener("click",e=>{
    const start=e.target.closest("#algTmStart");
    if(!start)return;

    if(managerState.stopRequiresReset||managerState.stopped){
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      alert("Permainan sebelumnya telah dihentikan. Tekan Reset terlebih dahulu sebelum memulai sesi baru.");
    }
  },true);

  function tick(){
    ensureCss();

    if(!teacherActive()){
      if(managerRef){
        try{managerRef.off();}catch(_){}
        managerRef=null;
        currentClass="";
        managerState={};
      }
      return;
    }

    if(!algorithmOn())return;

    attachManager();
    ensureButtons();
    updateButtonState();
  }

  function init(){
    ensureCss();

    const observer=new MutationObserver(()=>{
      clearTimeout(observer._v18);
      observer._v18=setTimeout(tick,50);
    });
    observer.observe(document.documentElement,{
      subtree:true,
      childList:true,
      attributes:true,
      attributeFilter:["class"]
    });

    setInterval(tick,500);
    tick();

    window.AlgorithmStopResetV18={
      version:VERSION,
      stop:stopGame,
      reset:resetGame
    };
  }

  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",init,{once:true});
  }else{
    init();
  }
})();


;/* ================= V20 RESET NILAI PER LATIHAN ================= */
(() => {
  "use strict";

  const VERSION="reset-nilai-per-latihan-v20";
  const EXERCISES=[
    "Mencari Letak Angka",
    "SUM & AVERAGE",
    "Menulis Rumus, Kata & Link",
    "SUMIF, AVERAGEIF, SUMIFS & AVERAGEIFS",
    "IF",
    "VLOOKUP",
    "Algoritma",
    "Coding"
  ];

  let activeLogical="";
  let activeRecord=null;
  let busy=false;

  const safeId=s=>String(s||"").replace(/[^a-zA-Z0-9_-]/g,"_");

  function hasFiniteNumber(v){
    return v!==null && v!==undefined && v!=="" && Number.isFinite(Number(v));
  }

  function parseLogical(logical){
    const [cls,...rest]=String(logical||"").split("::");
    return {cls,name:rest.join("::")};
  }

  function localProgress(){
    try{
      return JSON.parse(localStorage.getItem("kelasExcelProgress")||"{}")||{};
    }catch(_){
      return {};
    }
  }

  function saveLocalProgress(map){
    try{
      localStorage.setItem("kelasExcelProgress",JSON.stringify(map||{}));
    }catch(_){}
  }

  function getLocalRecord(logical){
    const map=localProgress();
    return map[logical] || map[safeId(logical)] || null;
  }

  function normalizeRecord(rec,cls,name){
    const out=rec && typeof rec==="object" ? structuredClone(rec) : {};
    out.className=out.className||cls;
    out.name=out.name||name;
    out.completedExercises=Array.from({length:8},(_,i)=>!!out.completedExercises?.[i]);
    out.exerciseStartedAt=Array.from({length:8},(_,i)=>hasFiniteNumber(out.exerciseStartedAt?.[i])?Number(out.exerciseStartedAt[i]):null);
    out.exerciseCompletedSeconds=Array.from({length:8},(_,i)=>hasFiniteNumber(out.exerciseCompletedSeconds?.[i])?Number(out.exerciseCompletedSeconds[i]):null);
    out.exerciseCompletedAt=Array.from({length:8},(_,i)=>hasFiniteNumber(out.exerciseCompletedAt?.[i])?Number(out.exerciseCompletedAt[i]):null);
    out.exerciseScores=Array.from({length:8},(_,i)=>hasFiniteNumber(out.exerciseScores?.[i])?Number(out.exerciseScores[i]):null);
    out.exerciseState=out.exerciseState && typeof out.exerciseState==="object" ? out.exerciseState : {};
    return out;
  }

  function exerciseHasData(rec,i){
    return !!(
      rec?.completedExercises?.[i] ||
      hasFiniteNumber(rec?.exerciseStartedAt?.[i]) ||
      hasFiniteNumber(rec?.exerciseCompletedSeconds?.[i]) ||
      hasFiniteNumber(rec?.exerciseCompletedAt?.[i]) ||
      hasFiniteNumber(rec?.exerciseScores?.[i]) ||
      rec?.exerciseState?.[i] ||
      rec?.exerciseState?.[String(i)]
    );
  }

  function currentScoreText(rec,i){
    const v=rec?.exerciseScores?.[i];
    if(hasFiniteNumber(v))return String(Math.round(Number(v)));
    if(rec?.completedExercises?.[i])return "Selesai";
    if(hasFiniteNumber(rec?.exerciseStartedAt?.[i]))return "Progres";
    return "—";
  }

  function ensureCss(){
    if(document.getElementById("resetExerciseV20Css"))return;

    const style=document.createElement("style");
    style.id="resetExerciseV20Css";
    style.textContent=`
      #resetExerciseV20Overlay{
        position:fixed;
        inset:0;
        z-index:2147483600;
        display:none;
        align-items:center;
        justify-content:center;
        padding:18px;
        background:rgba(19,36,54,.52);
        backdrop-filter:blur(4px);
      }
      #resetExerciseV20Overlay.open{display:flex}

      .reset-v20-card{
        width:min(760px,100%);
        max-height:90vh;
        display:grid;
        grid-template-rows:auto minmax(0,1fr) auto;
        overflow:hidden;
        border:1px solid #dce6ef;
        border-radius:20px;
        background:#fff;
        box-shadow:0 28px 80px rgba(18,40,65,.26);
      }

      .reset-v20-head{
        display:flex;
        align-items:flex-start;
        justify-content:space-between;
        gap:16px;
        padding:17px 19px;
        border-bottom:1px solid #e7edf3;
        background:#fbfdff;
      }
      .reset-v20-head small{
        display:block;
        color:#788ca2;
        font-size:8px;
        font-weight:900;
        letter-spacing:.06em;
      }
      .reset-v20-head h3{
        margin:4px 0 2px;
        color:#17355b;
        font-size:17px;
      }
      .reset-v20-head p{
        margin:0;
        color:#71849a;
        font-size:9px;
        line-height:1.5;
      }
      .reset-v20-close{
        width:35px;
        height:35px;
        flex:none;
        border:1px solid #dce5ed;
        border-radius:10px;
        background:#fff;
        color:#637a92;
        font-size:19px;
        cursor:pointer;
      }

      .reset-v20-body{
        min-height:0;
        overflow:auto;
        padding:15px 18px;
      }
      .reset-v20-info{
        display:flex;
        align-items:center;
        justify-content:space-between;
        gap:12px;
        margin-bottom:12px;
        padding:10px 12px;
        border:1px solid #dbe7f4;
        border-radius:12px;
        background:#f6faff;
      }
      .reset-v20-info strong{
        display:block;
        color:#294868;
        font-size:10px;
      }
      .reset-v20-info span{
        display:block;
        margin-top:2px;
        color:#7f91a3;
        font-size:8px;
      }
      .reset-v20-select-actions{
        display:flex;
        gap:7px;
        flex-wrap:wrap;
      }
      .reset-v20-mini{
        border:1px solid #d5e1ec;
        border-radius:8px;
        background:#fff;
        color:#536c85;
        padding:6px 9px;
        font-size:8px;
        font-weight:900;
        cursor:pointer;
      }

      .reset-v20-grid{
        display:grid;
        grid-template-columns:repeat(2,minmax(0,1fr));
        gap:9px;
      }
      .reset-v20-item{
        position:relative;
        display:grid;
        grid-template-columns:34px minmax(0,1fr) auto;
        align-items:center;
        gap:9px;
        padding:10px;
        border:1px solid #dde6ef;
        border-radius:12px;
        background:#fff;
        cursor:pointer;
        transition:.15s ease;
      }
      .reset-v20-item:hover{background:#fafcff}
      .reset-v20-item.selected{
        border-color:#ef9ba1;
        background:#fff6f6;
        box-shadow:0 0 0 2px rgba(211,68,79,.06);
      }
      .reset-v20-item.empty{
        opacity:.48;
        cursor:not-allowed;
      }
      .reset-v20-item input{
        position:absolute;
        opacity:0;
        pointer-events:none;
      }
      .reset-v20-no{
        width:34px;
        height:34px;
        display:grid;
        place-items:center;
        border-radius:10px;
        background:#eef4fb;
        color:#38699f;
        font-size:10px;
        font-weight:950;
      }
      .reset-v20-item.selected .reset-v20-no{
        background:#ffe4e6;
        color:#c93e49;
      }
      .reset-v20-copy{
        min-width:0;
      }
      .reset-v20-copy b{
        display:block;
        color:#304b68;
        font-size:9px;
        line-height:1.4;
      }
      .reset-v20-copy small{
        display:block;
        margin-top:2px;
        color:#8998a8;
        font-size:7px;
      }
      .reset-v20-score{
        min-width:44px;
        padding:5px 7px;
        border-radius:8px;
        background:#edf8f3;
        color:#16845b;
        text-align:center;
        font-size:9px;
        font-weight:950;
      }
      .reset-v20-item.empty .reset-v20-score{
        background:#f2f4f6;
        color:#8a99a8;
      }
      .reset-v20-check{
        grid-column:1/-1;
        display:none;
        color:#bd404a;
        font-size:8px;
        font-weight:850;
      }
      .reset-v20-item.selected .reset-v20-check{display:block}

      .reset-v20-warning{
        margin-top:12px;
        padding:10px 12px;
        border:1px solid #f0d1b8;
        border-radius:11px;
        background:#fff9ef;
        color:#84613d;
        font-size:8px;
        line-height:1.5;
      }

      .reset-v20-foot{
        display:flex;
        align-items:center;
        justify-content:space-between;
        gap:12px;
        padding:13px 18px;
        border-top:1px solid #e6edf3;
        background:#fbfdff;
      }
      #resetV20SelectedText{
        color:#71859a;
        font-size:8px;
        font-weight:850;
      }
      .reset-v20-buttons{
        display:flex;
        gap:8px;
      }
      .reset-v20-btn{
        min-height:37px;
        padding:8px 13px;
        border-radius:10px;
        border:1px solid #d7e1ea;
        background:#fff;
        color:#536c85;
        font-size:9px;
        font-weight:950;
        cursor:pointer;
      }
      .reset-v20-btn.danger{
        border-color:#d94752;
        background:#d94752;
        color:#fff;
      }
      .reset-v20-btn.danger:disabled{
        opacity:.45;
        cursor:not-allowed;
      }

      @media(max-width:680px){
        .reset-v20-grid{grid-template-columns:1fr}
        .reset-v20-info{align-items:flex-start;flex-direction:column}
        .reset-v20-foot{align-items:stretch;flex-direction:column}
        .reset-v20-buttons{width:100%}
        .reset-v20-buttons .reset-v20-btn{flex:1}
      }
    `;
    document.head.appendChild(style);
  }

  function ensureModal(){
    ensureCss();
    let overlay=document.getElementById("resetExerciseV20Overlay");
    if(overlay)return overlay;

    overlay=document.createElement("div");
    overlay.id="resetExerciseV20Overlay";
    overlay.innerHTML=`
      <section class="reset-v20-card" role="dialog" aria-modal="true" aria-labelledby="resetV20Title">
        <div class="reset-v20-head">
          <div>
            <small>RESET NILAI SISWA</small>
            <h3 id="resetV20Title">Pilih latihan yang akan direset</h3>
            <p id="resetV20Student">—</p>
          </div>
          <button type="button" class="reset-v20-close" data-reset-v20-close>×</button>
        </div>
        <div class="reset-v20-body">
          <div class="reset-v20-info">
            <div>
              <strong>Pilih satu atau beberapa Latihan 1–8</strong>
              <span>Latihan lain yang tidak dipilih tetap tersimpan.</span>
            </div>
            <div class="reset-v20-select-actions">
              <button type="button" class="reset-v20-mini" data-reset-v20-all>Pilih semua yang memiliki data</button>
              <button type="button" class="reset-v20-mini" data-reset-v20-clear>Bersihkan pilihan</button>
            </div>
          </div>
          <div id="resetV20Grid" class="reset-v20-grid"></div>
          <div class="reset-v20-warning">
            Reset menghapus nilai, status selesai, timer, jawaban/progres latihan, dan waktu pengerjaan hanya pada latihan yang dipilih. Tindakan ini tidak memengaruhi nilai latihan lainnya.
          </div>
        </div>
        <div class="reset-v20-foot">
          <span id="resetV20SelectedText">Belum ada latihan dipilih.</span>
          <div class="reset-v20-buttons">
            <button type="button" class="reset-v20-btn" data-reset-v20-close>Batal</button>
            <button type="button" class="reset-v20-btn danger" id="resetV20Confirm" disabled>↶ Reset latihan terpilih</button>
          </div>
        </div>
      </section>
    `;
    document.body.appendChild(overlay);

    overlay.addEventListener("click",e=>{
      if(e.target===overlay || e.target.closest("[data-reset-v20-close]")){
        closeModal();
        return;
      }
      if(e.target.closest("[data-reset-v20-all]")){
        overlay.querySelectorAll(".reset-v20-item:not(.empty)").forEach(item=>{
          const cb=item.querySelector("input");
          if(cb)cb.checked=true;
          item.classList.add("selected");
        });
        updateSelection();
        return;
      }
      if(e.target.closest("[data-reset-v20-clear]")){
        overlay.querySelectorAll(".reset-v20-item").forEach(item=>{
          const cb=item.querySelector("input");
          if(cb)cb.checked=false;
          item.classList.remove("selected");
        });
        updateSelection();
        return;
      }

      const item=e.target.closest(".reset-v20-item");
      if(item && !item.classList.contains("empty")){
        const cb=item.querySelector("input");
        if(cb){
          cb.checked=!cb.checked;
          item.classList.toggle("selected",cb.checked);
          updateSelection();
        }
      }
    });

    overlay.querySelector("#resetV20Confirm")?.addEventListener("click",confirmReset);

    document.addEventListener("keydown",e=>{
      if(e.key==="Escape" && overlay.classList.contains("open"))closeModal();
    });

    return overlay;
  }

  function selectedIndexes(){
    const overlay=ensureModal();
    return [...overlay.querySelectorAll('input[data-reset-v20-ex]:checked')]
      .map(x=>Number(x.dataset.resetV20Ex))
      .filter(i=>Number.isInteger(i)&&i>=0&&i<8);
  }

  function updateSelection(){
    const overlay=ensureModal();
    const selected=selectedIndexes();
    const text=overlay.querySelector("#resetV20SelectedText");
    const confirm=overlay.querySelector("#resetV20Confirm");

    if(text){
      text.textContent=selected.length
        ? `${selected.length} latihan dipilih: ${selected.map(i=>i+1).join(", ")}`
        : "Belum ada latihan dipilih.";
    }
    if(confirm)confirm.disabled=busy||!selected.length;
  }

  async function loadRecord(logical){
    const {cls,name}=parseLogical(logical);

    if(window.firebase?.database){
      try{
        const snap=await firebase.database()
          .ref(`kelasExcel/progress/${safeId(logical)}`)
          .once("value");
        const rec=snap.val();
        if(rec)return normalizeRecord(rec,cls,name);
      }catch(err){
        console.warn("[V20] Gagal membaca Firebase, memakai data lokal:",err);
      }
    }

    return normalizeRecord(getLocalRecord(logical),cls,name);
  }

  async function openModal(logical){
    if(!logical)return;

    activeLogical=logical;
    activeRecord=await loadRecord(logical);

    const overlay=ensureModal();
    const {cls,name}=parseLogical(logical);
    const student=overlay.querySelector("#resetV20Student");
    if(student)student.textContent=`${name} · Kelas ${cls}`;

    const grid=overlay.querySelector("#resetV20Grid");
    grid.innerHTML=EXERCISES.map((title,i)=>{
      const hasData=exerciseHasData(activeRecord,i);
      const score=currentScoreText(activeRecord,i);
      const detail=hasFiniteNumber(activeRecord?.exerciseScores?.[i])
        ? `Nilai tersimpan: ${Math.round(Number(activeRecord.exerciseScores[i]))}`
        : activeRecord?.completedExercises?.[i]
          ? "Status latihan selesai"
          : hasFiniteNumber(activeRecord?.exerciseStartedAt?.[i])
            ? "Memiliki progres aktif"
            : "Belum ada nilai/progres";

      return `<label class="reset-v20-item ${hasData?"":"empty"}" data-reset-v20-item="${i}">
        <input type="checkbox" data-reset-v20-ex="${i}" ${hasData?"":"disabled"}>
        <span class="reset-v20-no">${i+1}</span>
        <span class="reset-v20-copy">
          <b>Latihan ${i+1} — ${title}</b>
          <small>${detail}</small>
        </span>
        <span class="reset-v20-score">${score}</span>
        <span class="reset-v20-check">↶ Akan direset</span>
      </label>`;
    }).join("");

    busy=false;
    updateSelection();
    overlay.classList.add("open");
    document.body.style.overflow="hidden";
  }

  function closeModal(){
    const overlay=document.getElementById("resetExerciseV20Overlay");
    if(overlay)overlay.classList.remove("open");
    document.body.style.overflow="";
    activeLogical="";
    activeRecord=null;
    busy=false;
  }

  function resetSelectedInRecord(rec,indexes){
    const out=normalizeRecord(rec,rec.className,rec.name);

    indexes.forEach(i=>{
      out.completedExercises[i]=false;
      out.exerciseStartedAt[i]=null;
      out.exerciseCompletedSeconds[i]=null;
      out.exerciseCompletedAt[i]=null;
      out.exerciseScores[i]=null;

      if(out.exerciseState){
        delete out.exerciseState[i];
        delete out.exerciseState[String(i)];
      }
    });

    const remainingScores=out.exerciseScores.filter(hasFiniteNumber).map(Number);
    out.score=remainingScores.length
      ? Math.round(remainingScores.reduce((a,b)=>a+b,0)/remainingScores.length)
      : 0;

    // Setelah satu latihan direset, keseluruhan 8 latihan tidak mungkin lagi
    // berstatus selesai.
    out.completedAt=null;

    const stillHasAnyProgress=Array.from({length:8},(_,i)=>exerciseHasData(out,i)).some(Boolean);
    if(!stillHasAnyProgress){
      out.startedAt=null;
      out.elapsedSeconds=0;
    }

    return out;
  }

  async function confirmReset(){
    if(busy||!activeLogical||!activeRecord)return;

    const indexes=selectedIndexes();
    if(!indexes.length)return;

    const {cls,name}=parseLogical(activeLogical);
    const labels=indexes.map(i=>`Latihan ${i+1}`).join(", ");
    const ok=window.confirm(
      `Reset ${labels} milik ${name} (${cls})?\n\nNilai dan progres hanya pada latihan yang dipilih akan dihapus.`
    );
    if(!ok)return;

    busy=true;
    updateSelection();

    const newRecord=resetSelectedInRecord(activeRecord,indexes);
    const safe=safeId(activeLogical);

    try{
      // Simpan lokal.
      const map=localProgress();
      delete map[activeLogical];
      map[safe]=newRecord;
      saveLocalProgress(map);

      // Firebase adalah sumber utama dashboard guru.
      if(window.firebase?.database){
        await firebase.database()
          .ref(`kelasExcel/progress/${safe}`)
          .set(newRecord);
      }

      const overlay=ensureModal();
      const confirm=overlay.querySelector("#resetV20Confirm");
      if(confirm)confirm.textContent="✓ Berhasil direset";

      setTimeout(()=>{
        closeModal();
      },450);
    }catch(err){
      console.error("[V20] Reset per latihan gagal:",err);
      busy=false;
      updateSelection();
      alert("Gagal mereset nilai. Periksa koneksi Firebase lalu coba lagi.");
    }
  }

  // Ambil alih tombol Reset nilai lama SEBELUM handler app.js mengeksekusi reset
  // seluruh Latihan 1–8.
  document.addEventListener("click",e=>{
    const btn=e.target.closest("[data-reset]");
    if(!btn)return;

    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    if(btn.disabled)return;
    openModal(btn.dataset.reset);
  },true);

  function init(){
    ensureModal();
    window.ResetNilaiPerLatihanV20={
      version:VERSION,
      open:openModal,
      close:closeModal
    };
  }

  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",init,{once:true});
  }else{
    init();
  }
})();


;/* ================= V22 ALGORITHM TEACHER CONTROL FIX ================= */
(() => {
  "use strict";

  const VERSION = "algorithm-teacher-control-fix-v22";
  const HEARTBEAT_MAX_AGE = 70000;

  let currentClass = "";
  let managerRef = null;
  let lobbyRef = null;
  let manager = {};
  let lobby = {};
  let syncing = false;

  const safeId = s => String(s || "").replace(/[^a-zA-Z0-9_-]/g, "_");

  function sessionId(){
    try{
      return String(JSON.parse(localStorage.getItem("kelasExcelSettings") || "{}").sessionId || "default-session");
    }catch(_){
      return "default-session";
    }
  }

  function selectedClass(){
    return document.querySelector("[data-teacher-class].active")?.dataset.teacherClass
      || document.querySelector("[data-teacher-class]")?.dataset.teacherClass
      || "3P";
  }

  function teacherActive(){
    return !!document.getElementById("teacherView")?.classList.contains("active");
  }

  function algorithmPanelOn(){
    const card = document.querySelector('[data-preview-lock="6"]');
    if(!card) return false;
    return card.classList.contains("open")
      || !!card.querySelector(".teacher-switch.on")
      || /Dibuka/i.test(card.textContent || "");
  }

  function managerPath(cls){
    return `kelasExcel/algorithmManagerV10/${safeId(cls)}/${safeId(sessionId())}`;
  }

  function lobbyPath(cls){
    return `kelasExcel/algorithmTeamV3/${safeId(cls)}/${safeId(sessionId())}/lobbyV11`;
  }

  function selectedTeamCount(){
    const n = Number(manager.teamCount || 5);
    return [3,4,5].includes(n) ? n : 5;
  }

  function activeStudents(){
    const now = Date.now();
    return [...new Set(
      Object.values(lobby || {})
        .filter(x => x && x.name && now - Number(x.lastSeen || 0) <= HEARTBEAT_MAX_AGE)
        .map(x => x.name)
    )].sort((a,b)=>a.localeCompare(b,"id"));
  }

  function normalizeTeams(){
    const count = selectedTeamCount();
    const raw = manager.teams || {};
    return Array.from({length:count},(_,i)=>{
      const v = raw[i] ?? raw[String(i)] ?? raw[i+1] ?? raw[String(i+1)];
      if(Array.isArray(v)) return v.filter(Boolean);
      if(v && typeof v === "object") return Object.values(v).filter(Boolean);
      return [];
    });
  }

  function ensureCss(){
    if(document.getElementById("algV22ControlCss")) return;

    const style = document.createElement("style");
    style.id = "algV22ControlCss";
    style.textContent = `
      #algorithmTeacherMonitor .alg-v22-team-count{
        margin-top:12px;
        padding-top:12px;
        border-top:1px solid #e3eaf2;
      }
      #algorithmTeacherMonitor .alg-v22-team-count-head{
        display:flex;
        justify-content:space-between;
        align-items:center;
        gap:10px;
        margin-bottom:8px;
      }
      #algorithmTeacherMonitor .alg-v22-team-count-head b{
        color:#18295b;
        font-size:12px;
      }
      #algorithmTeacherMonitor .alg-v22-team-count-head span{
        color:#7f90a3;
        font-size:8px;
      }
      #algorithmTeacherMonitor .alg-v22-team-count-buttons{
        display:grid;
        grid-template-columns:repeat(3,minmax(0,1fr));
        gap:6px;
      }
      #algorithmTeacherMonitor .alg-v22-team-count-btn{
        min-height:38px;
        border:1px solid #d8e4f1;
        border-radius:11px;
        background:#f8fbff;
        color:#536b84;
        font-size:10px;
        font-weight:950;
        cursor:pointer;
      }
      #algorithmTeacherMonitor .alg-v22-team-count-btn.active{
        border:2px solid #4c87ff;
        background:#eef5ff;
        color:#2462f3;
      }
      #algorithmTeacherMonitor .alg-v22-team-count-btn:disabled,
      #algorithmTeacherMonitor [data-alg-duration]:disabled{
        opacity:.48;
        cursor:not-allowed;
      }
      #algorithmTeacherMonitor .alg-v22-lobby-note{
        margin-top:8px;
        padding:7px 9px;
        border-radius:9px;
        border:1px solid #d6eadf;
        background:#eef9f3;
        color:#37745b;
        font-size:8px;
        line-height:1.45;
      }
      #algorithmTeacherMonitor .alg-v22-lobby-note.warn{
        border-color:#efdcb0;
        background:#fff8e9;
        color:#8a6416;
      }

      /* Jika controller lama sempat membuat count control, sembunyikan agar tidak ganda. */
      #algorithmTeacherMonitor .alg-v11-count-wrap{
        display:none !important;
      }
    `;
    document.head.appendChild(style);
  }

  function ensureTeamCountControl(host){
    const duration = host.querySelector(".alg-tm-duration");
    if(!duration) return;

    let wrap = duration.querySelector(".alg-v22-team-count");
    if(!wrap){
      wrap = document.createElement("div");
      wrap.className = "alg-v22-team-count";
      wrap.innerHTML = `
        <div class="alg-v22-team-count-head">
          <b>Jumlah tim</b>
          <span>Pilih 3, 4, atau 5 tim</span>
        </div>
        <div class="alg-v22-team-count-buttons">
          ${[3,4,5].map(n=>`<button type="button" class="alg-v22-team-count-btn" data-v22-team-count="${n}">${n} tim</button>`).join("")}
        </div>
        <div class="alg-v22-lobby-note" id="algV22LobbyNote"></div>
      `;
      duration.appendChild(wrap);
    }
  }

  function updateDurationUi(host){
    const duration = Number(manager.duration || 50);
    const started = !!manager.started;

    host.querySelectorAll("[data-alg-duration]").forEach(btn=>{
      const value = Number(btn.dataset.algDuration);
      btn.classList.toggle("active", value === duration);
      btn.disabled = started;
    });

    const summary = [...host.querySelectorAll(".alg-tm-summary-card")]
      .find(card => /Durasi yang dipilih/i.test(card.textContent || ""));
    const strong = summary?.querySelector("strong");
    if(strong) strong.textContent = `${duration} menit`;
  }

  function updateTeamCountUi(host){
    const count = selectedTeamCount();
    const started = !!manager.started;
    const joined = activeStudents();
    const teams = normalizeTeams();
    const assigned = [...new Set(teams.flat())];

    host.querySelectorAll("[data-v22-team-count]").forEach(btn=>{
      const value = Number(btn.dataset.v22TeamCount);
      btn.classList.toggle("active", value === count);
      btn.disabled = started;
    });

    const note = host.querySelector("#algV22LobbyNote");
    if(note){
      note.classList.toggle("warn", joined.length < count);
      if(!joined.length){
        note.textContent = "Menunggu siswa membuka halaman Latihan Algoritma.";
      }else if(joined.length < count){
        note.textContent = `${joined.length} siswa aktif. Minimal ${count} siswa diperlukan untuk membentuk ${count} tim.`;
      }else{
        note.textContent = `${joined.length} siswa aktif siap dibagi ke ${count} tim. Tidak perlu menunggu seluruh kelas.`;
      }
    }

    const cards = host.querySelectorAll(".alg-tm-team");
    cards.forEach((card,i)=>{
      card.style.display = i < count ? "" : "none";

      // Jika pilihan jumlah tim menghapus pembagian lama, perbarui kartu
      // secara lokal agar tidak perlu render ulang seluruh panel.
      if(i < count && (!manager.teams || !manager.v11Assigned)){
        card.querySelectorAll(".alg-tm-member").forEach(el=>el.remove());

        const small=card.querySelector(".alg-tm-team-head small");
        if(small)small.textContent="0 anggota";

        let empty=card.querySelector(".alg-tm-empty");
        if(!empty){
          empty=document.createElement("div");
          empty.className="alg-tm-empty";
          card.appendChild(empty);
        }
        empty.textContent="Belum ada anggota";
      }
    });

    const grid = host.querySelector(".alg-tm-team-grid");
    if(grid){
      grid.style.gridTemplateColumns = `repeat(${count},minmax(0,1fr))`;
    }

    const total = host.querySelector(".alg-tm-team-total");
    if(total){
      total.innerHTML = `${count} tim &nbsp; | &nbsp; 👥 ${assigned.length} siswa`;
    }

    const summaryCards = host.querySelectorAll(".alg-tm-summary-card");
    if(summaryCards[0]){
      const strong = summaryCards[0].querySelector("strong");
      if(strong) strong.innerHTML = `${count} <span style="font-size:12px">tim</span>`;
    }
    if(summaryCards[1]){
      const strong = summaryCards[1].querySelector("strong");
      if(strong) strong.innerHTML = `${assigned.length} / ${joined.length} <span style="font-size:12px">siswa</span>`;
    }
  }

  function ensureStopResetFallback(host){
    // V18 normally injects these. Recreate them only if they were lost after a rerender.
    const actions = host.querySelector(".alg-tm-actions");
    if(!actions || actions.querySelector("#algTmStopResetV18")) return;
    if(!window.AlgorithmStopResetV18) return;

    const wrap = document.createElement("div");
    wrap.id = "algTmStopResetV18";
    wrap.innerHTML = `
      <button type="button" id="algTmStopV18">■ Stop</button>
      <button type="button" id="algTmResetV18">↺ Reset</button>
    `;
    const progress = actions.querySelector("#algTmProgressV17");
    if(progress) actions.insertBefore(wrap,progress);
    else actions.appendChild(wrap);

    wrap.querySelector("#algTmStopV18")?.addEventListener("click",()=>window.AlgorithmStopResetV18?.stop?.());
    wrap.querySelector("#algTmResetV18")?.addEventListener("click",()=>window.AlgorithmStopResetV18?.reset?.());
  }

  function syncUi(){
    if(syncing) return;
    if(!teacherActive() || !algorithmPanelOn()) return;

    const host = document.getElementById("algorithmTeacherMonitor");
    if(!host) return;

    syncing = true;
    try{
      ensureCss();
      ensureTeamCountControl(host);
      updateDurationUi(host);
      updateTeamCountUi(host);
      ensureStopResetFallback(host);
    }finally{
      syncing = false;
    }
  }

  function detach(){
    if(managerRef){
      try{managerRef.off()}catch(_){}
      managerRef = null;
    }
    if(lobbyRef){
      try{lobbyRef.off()}catch(_){}
      lobbyRef = null;
    }
  }

  function attach(){
    if(!window.firebase?.database || !teacherActive()) return;

    const cls = selectedClass();
    if(!cls) return;

    if(currentClass === cls && managerRef && lobbyRef) return;

    detach();
    currentClass = cls;
    manager = {};
    lobby = {};

    managerRef = firebase.database().ref(managerPath(cls));
    managerRef.on("value",snap=>{
      manager = snap.val() || {};
      syncUi();
    });

    lobbyRef = firebase.database().ref(lobbyPath(cls));
    lobbyRef.on("value",snap=>{
      lobby = snap.val() || {};
      syncUi();
    });
  }

  async function saveManager(partial){
    const cls = selectedClass();
    manager = {...manager,...partial};
    syncUi();

    if(!window.firebase?.database){
      console.warn("[V22] Firebase tidak tersedia. Perubahan hanya tampil lokal.");
      return;
    }
    await firebase.database().ref(managerPath(cls)).update(partial);
  }

  // Delegated capture handler supaya tombol tetap berfungsi walau monitor dirender ulang.
  document.addEventListener("click",async e=>{
    const durationBtn = e.target.closest("[data-alg-duration]");
    if(durationBtn && durationBtn.closest("#algorithmTeacherMonitor")){
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      if(manager.started) return;
      const duration = Number(durationBtn.dataset.algDuration);
      if(![40,50,60].includes(duration)) return;

      try{
        await saveManager({duration});
      }catch(err){
        console.error("[V22] Gagal menyimpan durasi:",err);
        alert("Gagal mengubah durasi. Periksa koneksi Firebase.");
      }
      return;
    }

    const countBtn = e.target.closest("[data-v22-team-count]");
    if(countBtn){
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      if(manager.started) return;
      const teamCount = Number(countBtn.dataset.v22TeamCount);
      if(![3,4,5].includes(teamCount)) return;

      try{
        // Ubah jumlah tim = pembagian lama dibersihkan supaya tidak tersisa anggota dari 5 tim.
        await saveManager({
          teamCount,
          teams:null,
          v11Assigned:false,
          assignedNames:null,
          assignedAt:null,
          started:false
        });
      }catch(err){
        console.error("[V22] Gagal menyimpan jumlah tim:",err);
        alert("Gagal mengubah jumlah tim. Periksa koneksi Firebase.");
      }
    }
  },true);

  function init(){
    ensureCss();

    const observer = new MutationObserver(()=>{
      clearTimeout(observer._v22);
      observer._v22 = setTimeout(()=>{
        attach();
        syncUi();
      },40);
    });
    observer.observe(document.documentElement,{
      subtree:true,
      childList:true,
      attributes:true,
      attributeFilter:["class"]
    });

    setInterval(()=>{
      attach();
      syncUi();
    },500);

    attach();
    syncUi();

    window.AlgorithmTeacherControlV22 = {
      version:VERSION,
      refresh:syncUi
    };
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded",init,{once:true});
  }else{
    init();
  }
})();


;/* ================= V23 SMOOTH DURATION / TEAM CONTROLS ================= */
(() => {
  "use strict";

  function injectCss(){
    if(document.getElementById("algV23SmoothCss"))return;

    const style=document.createElement("style");
    style.id="algV23SmoothCss";
    style.textContent=`
      #algorithmTeacherMonitor .alg-tm-duration-btn,
      #algorithmTeacherMonitor .alg-v22-team-count-btn{
        position:relative;
        overflow:hidden;
        transform:translateZ(0);
        transition:
          background-color .22s ease,
          border-color .22s ease,
          color .22s ease,
          box-shadow .22s ease,
          transform .14s ease,
          opacity .18s ease !important;
      }

      #algorithmTeacherMonitor .alg-tm-duration-btn:hover:not(:disabled),
      #algorithmTeacherMonitor .alg-v22-team-count-btn:hover:not(:disabled){
        transform:translateY(-1px);
      }

      #algorithmTeacherMonitor .alg-tm-duration-btn:active:not(:disabled),
      #algorithmTeacherMonitor .alg-v22-team-count-btn:active:not(:disabled){
        transform:scale(.985);
      }

      #algorithmTeacherMonitor .alg-tm-duration-btn.active,
      #algorithmTeacherMonitor .alg-v22-team-count-btn.active{
        animation:algV23Select .24s cubic-bezier(.2,.8,.2,1);
      }

      #algorithmTeacherMonitor .alg-tm-duration-btn::after,
      #algorithmTeacherMonitor .alg-v22-team-count-btn::after{
        content:"";
        position:absolute;
        inset:0;
        border-radius:inherit;
        background:rgba(74,132,255,.10);
        opacity:0;
        transform:scale(.72);
        pointer-events:none;
      }

      #algorithmTeacherMonitor .alg-tm-duration-btn.active::after,
      #algorithmTeacherMonitor .alg-v22-team-count-btn.active::after{
        animation:algV23Ripple .30s ease-out;
      }

      #algorithmTeacherMonitor .alg-tm-summary-card strong,
      #algorithmTeacherMonitor .alg-tm-team-total,
      #algorithmTeacherMonitor #algV22LobbyNote{
        transition:
          color .20s ease,
          background-color .20s ease,
          border-color .20s ease,
          opacity .20s ease;
      }

      @keyframes algV23Select{
        0%{transform:scale(.985)}
        55%{transform:scale(1.018)}
        100%{transform:scale(1)}
      }

      @keyframes algV23Ripple{
        0%{opacity:.75;transform:scale(.72)}
        100%{opacity:0;transform:scale(1.15)}
      }

      @media (prefers-reduced-motion: reduce){
        #algorithmTeacherMonitor .alg-tm-duration-btn,
        #algorithmTeacherMonitor .alg-v22-team-count-btn,
        #algorithmTeacherMonitor .alg-tm-summary-card strong,
        #algorithmTeacherMonitor .alg-tm-team-total,
        #algorithmTeacherMonitor #algV22LobbyNote{
          transition:none !important;
          animation:none !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function init(){
    injectCss();

    // Reinject only if another part of the app changes <head>.
    const observer=new MutationObserver(injectCss);
    observer.observe(document.head,{childList:true});

    window.AlgorithmSmoothControlsV23={
      version:"smooth-controls-v23"
    };
  }

  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",init,{once:true});
  }else{
    init();
  }
})();


;/* ================= V24 SMOOTH CLASS SWITCH ================= */
(() => {
  "use strict";

  function injectCss(){
    if(document.getElementById("teacherClassSmoothV24Css"))return;

    const style=document.createElement("style");
    style.id="teacherClassSmoothV24Css";
    style.textContent=`
      #teacherClassTabs .teacher-class-tab{
        position:relative;
        overflow:hidden;
        transform:translateZ(0);
        transition:
          background-color .24s ease,
          border-color .24s ease,
          color .24s ease,
          box-shadow .24s ease,
          transform .16s ease !important;
      }

      #teacherClassTabs .teacher-class-tab:hover{
        transform:translateY(-1px);
      }

      #teacherClassTabs .teacher-class-tab:active{
        transform:scale(.988);
      }

      #teacherClassTabs .teacher-class-tab.active{
        animation:teacherClassV24Select .28s cubic-bezier(.2,.8,.2,1);
      }

      #teacherClassTabs .teacher-class-tab::after{
        content:"";
        position:absolute;
        inset:0;
        border-radius:inherit;
        background:rgba(24,145,102,.10);
        opacity:0;
        transform:scale(.75);
        pointer-events:none;
      }

      #teacherClassTabs .teacher-class-tab.active::after{
        animation:teacherClassV24Ripple .32s ease-out;
      }

      /* Hanya bagian data kelas yang diberi transisi, bukan seluruh halaman. */
      .teacher-summary-reference{view-transition-name:teacherClassSummary}
      .teacher-recap-card{view-transition-name:teacherClassRecap}
      #algorithmTeacherMonitor{view-transition-name:teacherClassAlgorithm}

      ::view-transition-old(teacherClassSummary),
      ::view-transition-old(teacherClassRecap),
      ::view-transition-old(teacherClassAlgorithm){
        animation:teacherClassV24Old .16s ease-out both;
      }

      ::view-transition-new(teacherClassSummary),
      ::view-transition-new(teacherClassRecap),
      ::view-transition-new(teacherClassAlgorithm){
        animation:teacherClassV24New .22s cubic-bezier(.2,.8,.2,1) both;
      }

      .teacher-class-v24-fade-out{
        opacity:.28 !important;
        transform:translateY(2px);
        transition:opacity .08s ease,transform .08s ease !important;
      }

      .teacher-class-v24-fade-in{
        animation:teacherClassV24FallbackIn .20s ease-out both;
      }

      @keyframes teacherClassV24Select{
        0%{transform:scale(.988)}
        55%{transform:scale(1.012)}
        100%{transform:scale(1)}
      }

      @keyframes teacherClassV24Ripple{
        0%{opacity:.72;transform:scale(.75)}
        100%{opacity:0;transform:scale(1.12)}
      }

      @keyframes teacherClassV24Old{
        from{opacity:1;transform:translateY(0)}
        to{opacity:.12;transform:translateY(2px)}
      }

      @keyframes teacherClassV24New{
        from{opacity:.18;transform:translateY(-2px)}
        to{opacity:1;transform:translateY(0)}
      }

      @keyframes teacherClassV24FallbackIn{
        from{opacity:.18;transform:translateY(-2px)}
        to{opacity:1;transform:translateY(0)}
      }

      @media (prefers-reduced-motion: reduce){
        #teacherClassTabs .teacher-class-tab,
        .teacher-class-v24-fade-out,
        .teacher-class-v24-fade-in{
          transition:none !important;
          animation:none !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function init(){
    injectCss();
    const observer=new MutationObserver(injectCss);
    observer.observe(document.head,{childList:true});
    window.TeacherClassSmoothV24={version:"smooth-class-v24"};
  }

  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",init,{once:true});
  }else{
    init();
  }
})();


;/* ================= V27 SAFE SMOOTH CLASS PANEL ================= */
(() => {
  "use strict";

  const VERSION="safe-smooth-class-panel-v27";
  let active=false;
  let observer=null;
  let settleTimer=null;
  let hardTimer=null;
  let currentPanel=null;

  function panel(){
    return document.getElementById("algorithmTeacherMonitor");
  }

  function stopObserver(){
    clearTimeout(settleTimer);
    clearTimeout(hardTimer);
    if(observer){
      try{observer.disconnect()}catch(_){}
      observer=null;
    }
  }

  function finish(){
    if(!active)return;
    active=false;
    stopObserver();

    const el=panel();
    if(!el)return;

    el.classList.remove("alg-v27-switching");
    el.classList.add("alg-v27-reveal");

    // Release temporary height lock after the reveal finishes.
    setTimeout(()=>{
      el.classList.remove("alg-v27-reveal");
      el.style.minHeight="";
      el.style.height="";
      el.style.overflow="";
    },260);
  }

  function scheduleFinish(){
    if(!active)return;
    clearTimeout(settleTimer);

    // Wait until Firebase/listener DOM changes stop for a brief moment.
    settleTimer=setTimeout(finish,180);
  }

  function begin(){
    const el=panel();
    if(!el || !el.isConnected)return;

    stopObserver();

    const h=Math.max(0,Math.round(el.getBoundingClientRect().height));
    if(h>0){
      el.style.minHeight=`${h}px`;
      el.style.overflow="hidden";
    }

    el.classList.remove("alg-v27-reveal");
    el.classList.add("alg-v27-switching");

    active=true;
    currentPanel=el;

    // Observe only the live panel; no clone/snapshot is created.
    observer=new MutationObserver(scheduleFinish);
    observer.observe(el,{
      subtree:true,
      childList:true,
      characterData:true,
      attributes:true,
      attributeFilter:["class","style"]
    });

    // Give the class click + Firebase listener time to update.
    settleTimer=setTimeout(finish,320);

    // Safety fallback.
    hardTimer=setTimeout(finish,1000);
  }

  function injectCss(){
    if(document.getElementById("algV27SafeSmoothCss"))return;

    const style=document.createElement("style");
    style.id="algV27SafeSmoothCss";
    style.textContent=`
      #algorithmTeacherMonitor{
        transition:
          opacity .20s ease,
          transform .20s ease,
          filter .20s ease,
          min-height .18s ease !important;
      }

      #algorithmTeacherMonitor.alg-v27-switching{
        opacity:.60 !important;
        transform:translateY(1px) !important;
        filter:saturate(.92) !important;
        pointer-events:none !important;
      }

      #algorithmTeacherMonitor.alg-v27-reveal{
        animation:algV27Reveal .24s cubic-bezier(.2,.8,.2,1) both;
      }

      @keyframes algV27Reveal{
        from{
          opacity:.60;
          transform:translateY(-2px);
          filter:saturate(.92);
        }
        to{
          opacity:1;
          transform:translateY(0);
          filter:saturate(1);
        }
      }

      @media(prefers-reduced-motion:reduce){
        #algorithmTeacherMonitor,
        #algorithmTeacherMonitor.alg-v27-reveal{
          transition:none !important;
          animation:none !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function init(){
    injectCss();

    // Capture runs before the existing class-switch handler. We only soften
    // the live yellow panel; no DOM clone, fixed overlay, duplicate IDs,
    // or floating controls are created.
    document.addEventListener("click",e=>{
      const tab=e.target.closest?.("[data-teacher-class]");
      if(!tab)return;

      const activeTab=document.querySelector("[data-teacher-class].active");
      const next=tab.dataset.teacherClass;
      if(!next || next===activeTab?.dataset?.teacherClass)return;

      begin();
    },true);

    window.SafeSmoothClassPanelV27={
      version:VERSION,
      begin,
      finish
    };
  }

  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",init,{once:true});
  }else{
    init();
  }
})();


;/* ================= V28 ACTIVE ALGORITHM PRESENCE ================= */
(() => {
  "use strict";

  function setLoadingState(){
    const host=document.getElementById("algorithmTeacherMonitor");
    if(!host)return;

    const joined=host.querySelector(".alg-tm-joined");
    const strong=joined?.querySelector(".alg-tm-big strong");
    const online=joined?.querySelector(".alg-tm-online");

    if(strong)strong.textContent="0";
    if(online)online.innerHTML="<i></i>Memeriksa siswa aktif...";

    const cards=host.querySelectorAll(".alg-tm-team");
    cards.forEach(card=>{
      card.querySelectorAll(".alg-tm-member").forEach(el=>el.remove());
      const small=card.querySelector(".alg-tm-team-head small");
      if(small)small.textContent="0 anggota";
    });

    const summary=host.querySelectorAll(".alg-tm-summary-card");
    if(summary[1]){
      const value=summary[1].querySelector("strong");
      if(value)value.innerHTML='0 / 0 <span style="font-size:12px">siswa</span>';
    }
  }

  function init(){
    // Capture: clear the old class count before the class-switch handlers run.
    document.addEventListener("click",e=>{
      const tab=e.target.closest?.("[data-teacher-class]");
      if(!tab)return;

      const current=document.querySelector("[data-teacher-class].active");
      if(!tab.dataset.teacherClass || tab.dataset.teacherClass===current?.dataset?.teacherClass)return;

      setLoadingState();
    },true);

    window.ActiveAlgorithmPresenceV28={
      version:"active-algorithm-presence-v28",
      refresh:setLoadingState
    };
  }

  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",init,{once:true});
  }else{
    init();
  }
})();


;/* ================= V30 MINIMAL ALGORITHM PANEL VISUALS ================= */
(() => {
  "use strict";

  function decorate(){
    const host=document.getElementById("algorithmTeacherMonitor");
    if(!host)return;

    host.classList.add("alg-v30-panel");

    // Keep the selected team count available to CSS for responsive layout.
    const activeCount=host.querySelector("[data-v22-team-count].active");
    const count=Number(activeCount?.dataset?.v22TeamCount)||3;
    host.dataset.teamCount=String(count);

    // Mark team cards as visually empty without changing their functionality.
    host.querySelectorAll(".alg-tm-team").forEach(card=>{
      card.classList.toggle("is-empty",!card.querySelector(".alg-tm-member"));
    });
  }

  function init(){
    decorate();

    const observer=new MutationObserver(()=>{
      clearTimeout(observer._v30);
      observer._v30=setTimeout(decorate,30);
    });
    observer.observe(document.documentElement,{
      subtree:true,
      childList:true,
      attributes:true,
      attributeFilter:["class"]
    });

    window.AlgorithmPanelVisualV30={version:"minimal-panel-v30",refresh:decorate};
  }

  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",init,{once:true});
  }else{
    init();
  }
})();


;/* ================= V33 GLOBAL BRIGHTNESS CONTROL ================= */
(() => {
  "use strict";

  const STORAGE_KEY="kelasExcelBrightness";
  const DEFAULT_BRIGHTNESS=100;
  const MIN_BRIGHTNESS=60;
  const MAX_BRIGHTNESS=140;

  let value=DEFAULT_BRIGHTNESS;

  function clampBrightness(raw){
    const n=Number(raw);
    if(!Number.isFinite(n))return DEFAULT_BRIGHTNESS;
    return Math.max(MIN_BRIGHTNESS,Math.min(MAX_BRIGHTNESS,Math.round(n/5)*5));
  }

  function readSavedBrightness(){
    try{
      return clampBrightness(localStorage.getItem(STORAGE_KEY));
    }catch(_){
      return DEFAULT_BRIGHTNESS;
    }
  }

  function saveBrightness(next){
    try{
      localStorage.setItem(STORAGE_KEY,String(next));
    }catch(_){}
  }

  function overlayValues(next){
    // Tidak menggunakan filter:brightness() pada body karena filter dapat
    // mengubah containing block untuk elemen fixed/modal.
    // Lapisan transparan ini aman untuk seluruh layout.
    if(next<100){
      return {
        dim:((100-next)/100)*0.55,
        light:0
      };
    }
    if(next>100){
      return {
        dim:0,
        light:((next-100)/100)*0.30
      };
    }
    return {dim:0,light:0};
  }

  function updateUi(){
    const text=document.getElementById("brightnessValue");
    const range=document.getElementById("brightnessRange");

    if(text)text.textContent=`${value}%`;
    if(range && Number(range.value)!==value)range.value=String(value);

    document.querySelectorAll("[data-brightness]").forEach(btn=>{
      btn.classList.toggle("active",Number(btn.dataset.brightness)===value);
    });
  }

  function applyBrightness(raw,{persist=true}={}){
    value=clampBrightness(raw);

    const {dim,light}=overlayValues(value);
    document.documentElement.style.setProperty("--web-brightness-dim",dim.toFixed(3));
    document.documentElement.style.setProperty("--web-brightness-light",light.toFixed(3));
    document.documentElement.dataset.brightness=String(value);

    if(persist)saveBrightness(value);
    updateUi();
  }

  function openPanel(){
    const panel=document.getElementById("brightnessPanel");
    const toggle=document.getElementById("brightnessToggle");
    if(!panel||!toggle)return;

    panel.classList.remove("hidden");
    toggle.setAttribute("aria-expanded","true");
  }

  function closePanel(){
    const panel=document.getElementById("brightnessPanel");
    const toggle=document.getElementById("brightnessToggle");
    if(!panel||!toggle)return;

    panel.classList.add("hidden");
    toggle.setAttribute("aria-expanded","false");
  }

  function togglePanel(){
    const panel=document.getElementById("brightnessPanel");
    if(!panel)return;

    if(panel.classList.contains("hidden"))openPanel();
    else closePanel();
  }

  function init(){
    value=readSavedBrightness();
    applyBrightness(value,{persist:false});

    document.getElementById("brightnessToggle")?.addEventListener("click",e=>{
      e.stopPropagation();
      togglePanel();
    });

    document.getElementById("brightnessPanel")?.addEventListener("click",e=>{
      e.stopPropagation();
    });

    document.getElementById("brightnessRange")?.addEventListener("input",e=>{
      applyBrightness(e.currentTarget.value);
    });

    document.getElementById("brightnessReset")?.addEventListener("click",()=>{
      applyBrightness(DEFAULT_BRIGHTNESS);
    });

    document.querySelectorAll("[data-brightness]").forEach(btn=>{
      btn.addEventListener("click",()=>{
        applyBrightness(btn.dataset.brightness);
      });
    });

    document.addEventListener("click",closePanel);

    document.addEventListener("keydown",e=>{
      if(e.key==="Escape")closePanel();
    });

    // Jika browser kembali dari fullscreen, status visual tetap konsisten.
    document.addEventListener("fullscreenchange",()=>applyBrightness(value,{persist:false}));

    window.WebBrightnessV33={
      version:"brightness-v33",
      get:()=>value,
      set:next=>applyBrightness(next),
      reset:()=>applyBrightness(DEFAULT_BRIGHTNESS)
    };
  }

  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",init,{once:true});
  }else{
    init();
  }
})();


;/* ================= V34 STUDENT FULLSCREEN LOCK ================= */
(() => {
  "use strict";

  const CHECK_INTERVAL=350;
  let reentryBusy=false;

  function studentViewActive(){
    const view=document.getElementById("studentView");
    return !!view?.classList.contains("active");
  }

  function studentSessionExists(){
    // studentIdentity hanya diisi ketika siswa sudah berhasil masuk.
    const identity=document.getElementById("studentIdentity");
    return studentViewActive() && !!String(identity?.textContent||"").trim();
  }

  function fullscreenActive(){
    return !!(
      document.fullscreenElement ||
      document.webkitFullscreenElement
    );
  }

  function guard(){
    return document.getElementById("fullscreenGuard");
  }

  async function lockKeyboard(){
    // Keyboard Lock hanya tersedia pada browser Chromium tertentu dan biasanya
    // baru diizinkan sesudah fullscreen aktif. Jika tidak tersedia, guard
    // fullscreen tetap menjadi pengunci utama.
    try{
      if(fullscreenActive() && navigator.keyboard?.lock){
        await navigator.keyboard.lock(["Escape","F11"]);
      }
    }catch(_){}
  }

  function unlockKeyboard(){
    try{
      navigator.keyboard?.unlock?.();
    }catch(_){}
  }

  function syncGuard(){
    const required=studentSessionExists();
    const active=fullscreenActive();
    const overlay=guard();

    document.body.classList.toggle(
      "student-fullscreen-required",
      required && !active
    );

    if(overlay){
      overlay.classList.toggle("hidden",!(required && !active));
    }

    if(required && active){
      lockKeyboard();
    }else if(!required){
      unlockKeyboard();
    }
  }

  async function requestStudentFullscreen(){
    if(reentryBusy)return;
    if(!studentSessionExists())return;

    reentryBusy=true;
    try{
      const root=document.documentElement;

      if(!fullscreenActive()){
        if(root.requestFullscreen){
          try{
            await root.requestFullscreen({navigationUI:"hide"});
          }catch(_){
            await root.requestFullscreen();
          }
        }else if(root.webkitRequestFullscreen){
          root.webkitRequestFullscreen();
        }
      }

      await lockKeyboard();
    }catch(err){
      console.warn("[V34] Fullscreen belum dapat diaktifkan:",err);
    }finally{
      reentryBusy=false;
      setTimeout(syncGuard,40);
    }
  }

  function installReturnButton(){
    const btn=document.getElementById("returnFullscreenBtn");
    if(!btn || btn.dataset.v34Bound==="1")return;

    // Handler lama tetap ada. Handler ini memperkuatnya dengan Keyboard Lock.
    btn.dataset.v34Bound="1";
    btn.addEventListener("click",()=>{
      requestStudentFullscreen();
    });
  }

  // Esc dan F11 dicegah pada level halaman jika browser meneruskannya
  // ke dokumen. F11 adalah shortcut milik browser, sehingga beberapa browser
  // dapat memprosesnya sebelum event sampai ke halaman. Jika browser tetap
  // keluar dari fullscreen, guard fullscreen V34/V36 langsung mengunci aplikasi.
  function blockStudentFullscreenKeys(e){
    if(!studentSessionExists())return;

    const isEsc=e.key==="Escape" || e.code==="Escape";
    const isF11=e.key==="F11" || e.code==="F11" || e.keyCode===122;

    if(!isEsc && !isF11)return;

    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation?.();

    // Bila shortcut sempat membuat Fullscreen API terlepas, minta siswa
    // kembali ke fullscreen melalui mekanisme guard yang sudah ada.
    if(isF11 && !fullscreenActive()){
      setTimeout(syncGuard,0);
    }
  }

  document.addEventListener("keydown",blockStudentFullscreenKeys,true);
  document.addEventListener("keyup",blockStudentFullscreenKeys,true);

  document.addEventListener("fullscreenchange",syncGuard);
  document.addEventListener("webkitfullscreenchange",syncGuard);

  window.addEventListener("focus",()=>{
    setTimeout(syncGuard,30);
  });

  document.addEventListener("visibilitychange",()=>{
    if(!document.hidden)setTimeout(syncGuard,30);
  });

  // Capture klik tombol masuk siswa. Karena requestFullscreen membutuhkan
  // user gesture, percobaan fullscreen dilakukan sedini mungkin dari klik ini.
  document.addEventListener("click",e=>{
    const start=e.target.closest?.("#studentStartBtn");
    if(!start)return;

    setTimeout(()=>{
      if(studentSessionExists()){
        requestStudentFullscreen();
      }
    },0);
  },true);

  // Pengaman terhadap browser yang menolak request awal atau tidak memicu
  // fullscreenchange: selama masih berada di Student View, kondisi selalu dicek.
  setInterval(()=>{
    installReturnButton();
    syncGuard();
  },CHECK_INTERVAL);

  function init(){
    installReturnButton();
    syncGuard();

    window.StudentFullscreenLockV34={
      version:"student-fullscreen-lock-v34",
      sync:syncGuard,
      request:requestStudentFullscreen,
      isRequired:studentSessionExists
    };
  }

  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",init,{once:true});
  }else{
    init();
  }
})();
