(() => {
  "use strict";

  const EXERCISES = [
    ["Mencari Letak Angka","Pilih alamat sel pada grid 20×20."],
    ["SUM & AVERAGE","Latihan penjumlahan dan rata-rata seperti di Excel."],
    ["Menulis Rumus, Kata & Link","30 soal dengan kapitalisasi dan simbol yang harus tepat."],
    ["SUMIF & AVERAGEIF","Menjumlahkan dan menghitung rata-rata berdasarkan kriteria."],
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

  const DEFAULT_SETTINGS = {
    unlocked:[true,false,false,false,false,false,false,false],
    materialFinished:false
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
  let teacherAccessPreview = Array(8).fill(true);
  let teacherRefreshInterval = null;

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

  function normalizeFormula(s){
    return String(s||"").replace(/\s+/g,"").toUpperCase();
  }
  function progressKey(cls,name){ return `${cls}::${name}`; }
  function safeId(s){ return s.replace(/[^a-zA-Z0-9_-]/g,"_"); }

  function makeStudentRecord(cls,name){
    return {
      className:cls,
      name,
      startedAt:null,
      completedAt:null,
      completedExercises:Array(8).fill(false),
      exerciseCompletedSeconds:Array(8).fill(null),
      exerciseCompletedAt:Array(8).fill(null),
      exerciseState:{},
      score:40,
      elapsedSeconds:0
    };
  }

  function normalizeStudentRecord(record){
    if(!record) return record;
    record.completedExercises=Array.from({length:8},(_,i)=>!!record.completedExercises?.[i]);
    record.exerciseCompletedSeconds=Array.from({length:8},(_,i)=>{
      const v=record.exerciseCompletedSeconds?.[i];
      return Number.isFinite(Number(v))?Number(v):null;
    });
    record.exerciseCompletedAt=Array.from({length:8},(_,i)=>{
      const v=record.exerciseCompletedAt?.[i];
      return Number.isFinite(Number(v))?Number(v):null;
    });
    record.exerciseState ||= {};
    return record;
  }

  function loadLocal(){
    try{
      const s = JSON.parse(localStorage.getItem("kelasExcelSettings")||"null");
      const p = JSON.parse(localStorage.getItem("kelasExcelProgress")||"null");
      if(s) settings = {...structuredClone(DEFAULT_SETTINGS),...s};
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
            unlocked: normalizeUnlocked(val.unlocked)
          };
          saveLocal();
          renderReactive("settings");
        }else{
          settings = structuredClone(DEFAULT_SETTINGS);
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
        renderReactive("progress");
      });
    }catch(e){
      console.warn("Firebase tidak aktif:",e);
      realtime = false;
    }
  }

  function persistSettings(){
    settings.unlocked=normalizeUnlocked(settings.unlocked);
    saveLocal();
    if(realtime){
      return db.ref("kelasExcel/settings").update({
        unlocked:settings.unlocked,
        materialFinished:!!settings.materialFinished
      }).catch(err=>{
        console.error("Gagal menyimpan settings Firebase:",err);
        toast("Gagal menyinkronkan ke Firebase. Periksa Rules database.");
        throw err;
      });
    }
    return Promise.resolve();
  }
  function persistStudent(){
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

  function startTimer(){
    clearInterval(timerInterval);
    const tick=()=>{
      if(!currentUser) return;
      const end=currentUser.completedAt || now();
      const elapsed=Math.max(0,Math.floor((end-currentUser.startedAt)/1000));
      currentUser.elapsedSeconds=elapsed;
      const left=Math.max(0,3600-elapsed);
      $("#studentTimer").textContent=`${String(Math.floor(left/60)).padStart(2,"0")}:${String(left%60).padStart(2,"0")}`;
      const exTimer=$("#exerciseWindowTimer");
      if(exTimer) exTimer.textContent=formatTime(elapsed);
      if(currentUser.completedAt) clearInterval(timerInterval);
    };
    tick();timerInterval=setInterval(tick,1000);
  }

  function scoreFromElapsed(sec,complete){
    if(!complete) return 40;
    const min=sec/60;
    if(min<20) return 90;
    if(min<30) return 80;
    if(min<40) return 70;
    if(min<50) return 60;
    if(min<=60) return 50;
    return 40;
  }

  function timeBand(sec){
    if(sec===null || sec===undefined || !Number.isFinite(Number(sec))) return {score:null,cls:"time-unknown",label:"Waktu tidak tercatat"};
    const min=Number(sec)/60;
    if(min<20) return {score:90,cls:"time-90",label:"Nilai 90"};
    if(min<30) return {score:80,cls:"time-80",label:"Nilai 80"};
    if(min<40) return {score:70,cls:"time-70",label:"Nilai 70"};
    if(min<50) return {score:60,cls:"time-60",label:"Nilai 60"};
    if(min<=60) return {score:50,cls:"time-50",label:"Nilai 50"};
    return {score:40,cls:"time-40",label:"Nilai 40"};
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
    if(!settings.materialFinished){
      toast("Keluar baru dapat digunakan setelah guru menekan Materi selesai.");
      return;
    }
    clearInterval(timerInterval);
    closeExerciseWindow();
    currentUser=null;
    try{if(document.fullscreenElement) await document.exitFullscreen()}catch(e){}
    showView("#homeView");
    switchLoginMode("student");
  }

  async function completeExercise(i){
    if(currentUser.completedExercises[i]) return;
    currentUser.completedExercises[i]=true;
    currentUser.exerciseCompletedSeconds ||= Array(8).fill(null);
    currentUser.exerciseCompletedAt ||= Array(8).fill(null);
    const elapsed=Math.max(0,Math.floor((now()-currentUser.startedAt)/1000));
    currentUser.exerciseCompletedSeconds[i]=elapsed;
    currentUser.exerciseCompletedAt[i]=now();

    if(currentUser.completedExercises.every(Boolean)){
      currentUser.completedAt=now();
      currentUser.elapsedSeconds=Math.floor((currentUser.completedAt-currentUser.startedAt)/1000);
      currentUser.score=scoreFromElapsed(currentUser.elapsedSeconds,true);
    }

    setStudent(currentUser);
    try{ await persistStudent(); }catch(e){}
    closeExerciseWindow();
    renderStudent();
    toast(`Latihan ${i+1} selesai dan hasil dikirim ke dashboard guru.`);
  }

  function renderStudent(){
    if(!currentUser) return;

    const completed=currentUser.completedExercises.filter(Boolean).length;
    const percent=Math.round(completed/8*100);

    $("#studentIdentity").innerHTML=`<small class="student-hello">Halo, ${escapeHtml(currentUser.name)}</small><span>Pilih jendela latihan</span>`;
    $("#studentStatusLine").textContent="Pilih latihan yang dibuka oleh guru. Status kunci diperbarui otomatis.";
    $("#studentExitBtn").disabled=!settings.materialFinished;
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
      $("#studentExitHint").textContent=settings.materialFinished
        ? "Materi selesai. Anda dapat keluar."
        : "Tombol keluar aktif setelah guru mengakhiri materi.";
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
          <b>${String(i+1).padStart(2,"0")}</b>
        </span>
        <strong>${escapeHtml(e[0])}</strong>
        <small>${desc[i]}</small>
        <span class="student-window-action">${done?"✓ Selesai":open?`Buka Latihan ${i+1}`:"🔒 Terkunci"}</span>
      </button>`;
    }).join("");

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
      <div class="exercise-window-progress">
        <div><span>Progres keseluruhan</span><b>${percent}%</b></div>
        <span class="exercise-window-progressbar"><i style="width:${percent}%"></i></span>
        <small>Waktu berjalan: <b id="exerciseWindowTimer">${formatTime(currentUser?.elapsedSeconds||0)}</b></small>
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
            <button type="button" data-exit-student ${settings.materialFinished?"":"disabled"}>↪ Keluar</button>
            <small class="l1-exit-note">${settings.materialFinished?"Materi selesai. Anda dapat keluar.":"Keluar aktif setelah guru menekan Materi selesai."}</small>
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
        <div class="l2-window-progress"><div><span>Progres keseluruhan</span><b>${percent}%</b></div><span><i style="width:${percent}%"></i></span><small>Waktu berjalan: <b id="exerciseWindowTimer">${formatTime(currentUser?.elapsedSeconds||0)}</b></small></div>
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
          <section class="l2-participant"><small>PESERTA</small><h4>${escapeHtml(currentUser.name)}</h4><p>Kelas ${escapeHtml(currentUser.className)}</p><button type="button" data-exit-student ${settings.materialFinished?'':'disabled'}>↪ &nbsp; Keluar</button><em>${settings.materialFinished?'Materi selesai':'Keluar aktif setelah guru menekan Materi selesai.'}</em></section>
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

  function renderL3(panel){
    const st=getExState(2,{values:{}});
    const correctCount=L3_ITEMS.filter((x,i)=>st.values[i]===x).length;
    panel.innerHTML=exerciseHeader(2)+`
      <div class="task-card">
        <h4>Perhatikan huruf besar, huruf kecil, simbol, dan tanda baca</h4>
        <p>Jawaban harus sama persis. Gunakan <b>Caps Lock</b> untuk huruf kapital berkelanjutan dan <b>Shift</b> untuk huruf kapital sementara atau simbol pada tombol angka.</p>
        <div class="prompt-banner"><span>Benar</span><strong>${correctCount} / 30</strong></div>
        <div class="typing-list">
          ${L3_ITEMS.map((target,i)=>{
            const v=st.values[i]??"";
            const cls=v? (v===target?"correct":"wrong"):"";
            return `<div class="typing-item ${cls}">
              <span class="qno">${i+1}</span>
              <span class="target">${escapeHtml(target)}</span>
              <input data-type="${i}" value="${escapeHtml(v)}" autocomplete="off" spellcheck="false" placeholder="Ketik persis di sini">
              <span>${v?(v===target?"✓":"✕"):""}</span>
            </div>`;
          }).join("")}
        </div>
      </div>
      ${finishButton(2,correctCount===30)}
    `;
    $$("[data-type]").forEach(inp=>inp.addEventListener("input",()=>{
      st.values[inp.dataset.type]=inp.value;persistStudent();
      const parent=inp.closest(".typing-item");
      const target=L3_ITEMS[+inp.dataset.type];
      parent.classList.toggle("correct",inp.value===target);
      parent.classList.toggle("wrong",!!inp.value&&inp.value!==target);
      parent.lastElementChild.textContent=inp.value?(inp.value===target?"✓":"✕"):"";
      const cnt=L3_ITEMS.filter((x,i)=>st.values[i]===x).length;
      const banner=$(".prompt-banner strong"); if(banner) banner.textContent=`${cnt} / 30`;
      $("#finishExerciseBtn").disabled=cnt!==30;
    }));
    bindFinish(2,correctCount===30);
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
      return `<section class="l2-section-card">
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
      <div class="l2-window-header l45-window-header">
        <button class="exercise-back-btn" data-close-exercise aria-label="Kembali">‹</button>
        <div><small>Jendela latihan ${cfg.index+1} dari 8</small><h3>${escapeHtml(cfg.windowTitle)}</h3></div>
        <div class="l2-window-progress"><div><span>Progres keseluruhan</span><b>${percent}%</b></div><span><i style="width:${percent}%"></i></span><small>Waktu berjalan: <b id="exerciseWindowTimer">${formatTime(currentUser?.elapsedSeconds||0)}</b></small></div>
      </div>
      <div class="l2-layout">
        <main class="l2-main">
          <section class="l2-learning-row">
            <div class="l2-material-card"><h4>📖 &nbsp; Materi singkat</h4><p>${cfg.material}</p><div>${cfg.examples.map(x=>`<code>${escapeHtml(x)}</code>`).join("")}</div></div>
            <div class="l2-guide-card"><div class="l2-guide-head"><h4>☷ &nbsp; Petunjuk Pengerjaan</h4><span>${st.guideSlide+1}/${cfg.guideSlides.length}</span></div><div class="l2-guide-slide"><h3>${escapeHtml(slide.title)}</h3><p>${escapeHtml(slide.text)}</p>${mini}</div><div class="l2-guide-nav"><button type="button" data-l45-guide-prev ${st.guideSlide===0?'disabled':''}>‹ &nbsp; Sebelumnya</button><div>${cfg.guideSlides.map((_,i)=>`<i class="${i===st.guideSlide?'active':''}"></i>`).join("")}</div><button type="button" data-l45-guide-next ${st.guideSlide===cfg.guideSlides.length-1?'disabled':''}>Berikutnya &nbsp; ›</button></div></div>
          </section>
          <section class="l2-instruction-band">${cfg.instruction}</section>
          ${sectionsHtml}
          <button id="l45CheckAll" class="l2-check-all ${st.readyToFinish&&allCorrect?'ready':''}" ${!allFilled&&!st.readyToFinish?'disabled':''}>${st.readyToFinish&&allCorrect?'✓ Selesai':`✓ Periksa seluruh ${tasks.length} jawaban`}</button>
        </main>
        <aside class="l2-sidebar">
          <section class="l2-participant"><small>PESERTA</small><h4>${escapeHtml(currentUser.name)}</h4><p>Kelas ${escapeHtml(currentUser.className)}</p><button type="button" data-exit-student ${settings.materialFinished?'':'disabled'}>↪ &nbsp; Keluar</button><em>${settings.materialFinished?'Materi selesai':'Keluar aktif setelah guru menekan Materi selesai.'}</em></section>
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
    const sumQuestions=SUMIF_Q.map(q=>({...q,hint:"Gunakan fungsi SUMIF untuk menjumlahkan berdasarkan kriteria."}));
    const avgQuestions=AVGIF_Q.map(q=>({...q,hint:"Gunakan fungsi AVERAGEIF untuk menghitung rata-rata berdasarkan kriteria."}));
    renderPracticeWindow(panel,{
      index:3,
      windowTitle:"Latihan SUMIF dan AVERAGEIF",
      material:'<b>SUMIF</b> menjumlahkan nilai yang memenuhi syarat. <b>AVERAGEIF</b> menghitung rata-rata nilai yang memenuhi syarat. Kriteria dapat berupa teks seperti "Buku" atau operator seperti ">=80".',
      examples:['=SUMIF(A2:A7,"Buku",B2:B7)','=AVERAGEIF(A2:A7,"Lulus",B2:B7)'],
      instruction:'Kerjakan bagian <b>SUMIF</b> dan <b>AVERAGEIF</b>. Ketik setiap rumus dengan tepat lalu tekan <b>Enter</b> untuk melihat hasil.',
      quickTip:'Perhatikan tiga bagian rumus: rentang kriteria, kriteria, lalu rentang angka. Teks dan operator kriteria ditulis di dalam tanda petik.',
      quickExample:'=SUMIF(A2:A7,"Buku",B2:B7)',
      guideSlides:[
        {title:"1. Kenali rentang kriteria",text:"Kolom A berisi kategori atau status yang akan diperiksa. Kolom B berisi angka yang akan dijumlahkan atau dirata-ratakan."},
        {title:"2. Tulis SUMIF",text:"SUMIF memakai urutan rentang kriteria, kriteria, lalu rentang penjumlahan."},
        {title:"3. Tulis AVERAGEIF",text:"AVERAGEIF memakai pola yang sama, tetapi hasilnya adalah nilai rata-rata."},
        {title:"4. Gunakan kriteria dengan tepat",text:"Kriteria teks dan operator seperti >5 atau >=80 ditulis di dalam tanda petik."},
        {title:"5. Tekan Enter",text:"Setelah rumus lengkap, tekan Enter. Jika benar, hasil akan muncul dan jawaban ditandai benar."}
      ],
      miniSlide:(slide,i)=>`<div class="l45-mini-sheet"><div><b>A</b><b>B</b></div><div><span>Kategori</span><span>Nilai</span></div><div><span>Buku</span><span>4</span></div><div><span>Pensil</span><span>3</span></div><div><span>Buku</span><span>7</span></div><code>${i<2?'=SUMIF(A2:A7,"Buku",B2:B7)':'=AVERAGEIF(A2:A7,"Buku",B2:B7)'}</code></div>`,
      sections:[
        {title:"A. SUMIF",description:"Jumlahkan nilai berdasarkan kategori atau syarat tertentu.",columns:["Kategori","Nilai"],rows:SUMIF_DATA,questions:sumQuestions},
        {title:"B. AVERAGEIF",description:"Hitung rata-rata nilai berdasarkan kategori atau syarat tertentu.",columns:["Status","Nilai"],rows:AVGIF_DATA,questions:avgQuestions}
      ]
    });
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
      instruction:'Kerjakan dua tabel praktik <b>IF</b>. Perhatikan operator perbandingan, tanda petik, koma, dan kurung.',
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
    const st=getExState(5,{answers:{}});
    const complete=VLOOKUP_Q.every((q,idx)=>st.answers[idx]?.correct);
    panel.innerHTML=exerciseHeader(5)+`
      <div class="task-card"><h4>Tabel referensi A2:C6</h4>
        <table class="data-table"><tr><th>Kode</th><th>Nama</th><th>Harga</th></tr>
        ${VLOOKUP_TABLE.map(r=>`<tr>${r.map(x=>`<td>${escapeHtml(x)}</td>`).join("")}</tr>`).join("")}</table>
      </div>
      <div class="task-card"><h4>Ketik rumus lalu Enter</h4>
        <div class="question-list">${VLOOKUP_Q.map((q,idx)=>{
          const a=st.answers[idx]||{};
          return `<div class="question-row">
            <span class="qno">${idx+1}</span>
            <div><strong>${q.label}</strong><br><small>Nilai pencarian: ${q.lookup}</small><br><code>${escapeHtml(q.formula)}</code></div>
            <div><input data-vq="${idx}" value="${escapeHtml(a.value||"")}" placeholder="Ketik rumus"><div class="formula-result">${a.correct?`Hasil: ${q.result}`:""}</div></div>
            <span class="status">${a.value?(a.correct?"✓":"✕"):""}</span>
          </div>`;
        }).join("")}</div>
      </div>${finishButton(5,complete)}
    `;
    $$("[data-vq]").forEach(inp=>inp.addEventListener("keydown",e=>{
      if(e.key==="Enter"){
        const idx=+inp.dataset.vq,q=VLOOKUP_Q[idx];
        const correct=normalizeFormula(inp.value)===normalizeFormula(q.formula);
        st.answers[idx]={value:inp.value,correct};persistStudent();renderVlookup(panel);toast(correct?`Benar. Hasil = ${q.result}`:"Rumus belum tepat.");
      }
    }));
    bindFinish(5,complete);
  }

  function renderAlgorithm(panel){
    const st=getExState(6,{order:["Mulai",'Jika tidak, tampilkan "Remedial"',"Masukkan nilai siswa","Selesai","Periksa apakah nilai ≥ 75",'Jika ya, tampilkan "Lulus"']});
    const complete=st.order.every((x,i)=>x===ALGO_CORRECT[i]);
    panel.innerHTML=exerciseHeader(6)+`
      <div class="task-card"><h4>Susun algoritma kelulusan</h4><p>Gunakan tombol naik/turun sampai urutan langkah benar.</p>
        <div class="order-list">${st.order.map((x,i)=>`<div class="order-item">
          <span>${i+1}</span><strong>${escapeHtml(x)}</strong>
          <button class="ghost-btn" data-up="${i}" ${i===0?"disabled":""}>↑</button>
          <button class="ghost-btn" data-down="${i}" ${i===st.order.length-1?"disabled":""}>↓</button>
        </div>`).join("")}</div>
        ${complete?`<p class="formula-result">✓ Urutan sudah benar.</p>`:""}
      </div>${finishButton(6,complete)}
    `;
    $$("[data-up]").forEach(b=>b.addEventListener("click",()=>{const i=+b.dataset.up;[st.order[i-1],st.order[i]]=[st.order[i],st.order[i-1]];persistStudent();renderAlgorithm(panel)}));
    $$("[data-down]").forEach(b=>b.addEventListener("click",()=>{const i=+b.dataset.down;[st.order[i+1],st.order[i]]=[st.order[i],st.order[i+1]];persistStudent();renderAlgorithm(panel)}));
    bindFinish(6,complete);
  }

  function renderCoding(panel){
    const st=getExState(7,{values:{}});
    const complete=CODE_TASKS.every((x,i)=>(st.values[i]||"").trim()===x);
    panel.innerHTML=exerciseHeader(7)+`
      <div class="task-card"><h4>Ketik kode persis seperti contoh</h4><p>Perhatikan huruf besar/kecil, tanda kurung, titik koma, tanda petik, dan simbol.</p>
        <div class="code-grid">${CODE_TASKS.map((code,i)=>{
          const v=st.values[i]||"", ok=v.trim()===code;
          return `<div class="code-task"><span>Soal ${i+1}</span><code>${escapeHtml(code)}</code><textarea data-code="${i}" spellcheck="false">${escapeHtml(v)}</textarea><div class="formula-result">${v?(ok?"✓ Benar":"Belum sama persis"):""}</div></div>`;
        }).join("")}</div>
      </div>${finishButton(7,complete)}
    `;
    $$("[data-code]").forEach(t=>t.addEventListener("input",()=>{
      st.values[t.dataset.code]=t.value;persistStudent();
      const ok=CODE_TASKS.every((x,i)=>(st.values[i]||"").trim()===x);
      $("#finishExerciseBtn").disabled=!ok;
      t.nextElementSibling.textContent=t.value?(t.value.trim()===CODE_TASKS[+t.dataset.code]?"✓ Benar":"Belum sama persis"):"";
    }));
    bindFinish(7,complete);
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
        records.push(getStudent(cls,name)||makeStudentRecord(cls,name));
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
    const completedScores=classRecords.filter(r=>r.completedAt).map(r=>scoreFromElapsed(Math.floor((r.completedAt-r.startedAt)/1000),true));
    const averageScore=completedScores.length?Math.round(completedScores.reduce((a,b)=>a+b,0)/completedScores.length):0;

    $("#teacherConnectionText").textContent=realtime?"Terhubung":"Mode lokal";
    $("#teacherConnectionBadge").classList.toggle("offline",!realtime);
    const accessNote=$(".teacher-access-note");
    if(accessNote) accessNote.innerHTML=realtime
      ? "Perubahan tersambung ke ruang siswa dan diperbarui otomatis."
      : "Mode lokal: perubahan hanya berlaku pada perangkat ini.";

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
      teacherSelectedClass=b.dataset.teacherClass;
      renderTeacher();
    }));

    $("#teacherClassTitle").textContent=`Rekap Kelas ${teacherSelectedClass} · Latihan 1–8`;
    $("#totalStudents").textContent=classRecords.length;
    $("#finishedStudents").textContent=completed;
    $("#notStartedStudents").textContent=unfinished;
    $("#averageScore").textContent=averageScore;

    $("#finishMaterialBtn").classList.toggle("done",settings.materialFinished);
    $("#finishMaterialBtn").textContent=settings.materialFinished?"✓ Materi selesai":"✓ Materi selesai";

    $("#teacherTableBody").innerHTML=classRecords.map(r=>{
      const done=r.completedExercises?.filter(Boolean).length||0;
      const progress=Math.round(done/8*100);
      const elapsed=r.startedAt?Math.floor(((r.completedAt||now())-r.startedAt)/1000):0;
      const score=r.completedAt?scoreFromElapsed(elapsed,true):(r.startedAt?0:null);
      return `<tr>
        <td class="student-name-cell">${escapeHtml(r.name)}</td>
        <td class="class-cell">${r.className}</td>
        ${(r.completedExercises||Array(8).fill(false)).map((x,i)=>{
          if(!x) return `<td class="exercise-check">—</td>`;
          const sec=r.exerciseCompletedSeconds?.[i];
          const band=timeBand(sec);
          const title=sec===null||sec===undefined
            ? "Selesai"
            : `Selesai ${formatTime(sec)} · ${band.label}`;
          return `<td class="exercise-check"><span class="teacher-time-check ${band.cls}" title="${title}">✓</span></td>`;
        }).join("")}
        <td>
          ${r.startedAt?`<div class="teacher-progress-cell"><span><i style="width:${progress}%"></i></span><b>${progress}%</b></div>`:`<span class="not-started-text">Belum mulai</span>`}
        </td>
        <td class="score-cell">${score===null?"—":score}</td>
        <td><button class="reset-btn" data-reset="${escapeHtml(progressKey(r.className,r.name))}" ${!r.startedAt?"disabled":""}>↶ Reset nilai</button></td>
      </tr>`;
    }).join("");
    $$("[data-reset]").forEach(b=>b.addEventListener("click",()=>resetStudent(b.dataset.reset)));
  }

  function startNewMaterial(){
    if(!confirm("Mulai materi baru? Seluruh progres dan nilai siswa akan direset.")) return;
    allProgress={};
    settings.materialFinished=false;
    settings.unlocked=[true,false,false,false,false,false,false,false];
    saveLocal();
    if(realtime){
      db.ref("kelasExcel/progress").remove();
      db.ref("kelasExcel/settings").set(settings);
    }
    renderTeacher();
    toast("Materi baru dimulai. Progres siswa direset.");
  }

  function formatTime(sec){
    const m=Math.floor(sec/60),s=sec%60;return `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
  }

  function resetStudent(logical){
    const [cls,...rest]=logical.split("::"),name=rest.join("::");
    if(!confirm(`Reset seluruh progres ${name} (${cls})?`))return;
    const rec=makeStudentRecord(cls,name);
    allProgress[logical]=rec;
    saveLocal();
    if(realtime) db.ref(`kelasExcel/progress/${safeId(logical)}`).set(rec);
    renderTeacher();toast("Progres siswa direset.");
  }

  function renderReactive(source="all"){
    if($("#teacherView").classList.contains("active")) renderTeacher();
    if($("#studentView").classList.contains("active")&&currentUser){
      const panel=$("#exercisePanel");
      const exerciseOpen=panel?.dataset.opened==="1";

      // Saat siswa sedang mengetik di jendela latihan, Firebase akan
      // memantulkan progres yang baru disimpan. Jangan render ulang seluruh
      // jendela karena itu menghilangkan fokus input dan menggeser scroll.
      if(source==="progress" && exerciseOpen) return;

      const synced=getStudent(currentUser.className,currentUser.name);
      if(synced) currentUser=synced;
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
    $("#finishMaterialBtn").addEventListener("click",()=>{
      if(settings.materialFinished){toast("Materi sudah ditandai selesai.");return;}
      if(!confirm("Akhiri materi untuk seluruh siswa? Setelah ini tombol Keluar siswa akan aktif."))return;
      settings.materialFinished=true;
      persistSettings();renderTeacher();
    });
    $("#startNewMaterialBtn").addEventListener("click",startNewMaterial);
    $("#refreshTeacherBtn").addEventListener("click",()=>{renderTeacher();toast("Dashboard diperbarui.");});

    document.addEventListener("fullscreenchange",()=>{
      const studentActive=$("#studentView").classList.contains("active")&&currentUser;
      $("#fullscreenGuard").classList.toggle("hidden",!(studentActive&&!settings.materialFinished&&!document.fullscreenElement));
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
      if($("#studentView").classList.contains("active")&&currentUser&&!settings.materialFinished){
        e.preventDefault();e.returnValue="";
      }
    });
  }

  function bootstrap(){
    loadLocal();
    initFirebase();
    renderExerciseStrip();
    initRosterSelectors();
    bindGlobal();
    switchLoginMode("student");
  }

  document.addEventListener("DOMContentLoaded",bootstrap);
})();
