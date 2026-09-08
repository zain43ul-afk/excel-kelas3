(() => {
  "use strict";

  const EXERCISES = [
    ["Mencari Letak Angka","Pilih alamat sel pada grid 20×20."],
    ["SUM & AVERAGE","Latihan penjumlahan dan rata-rata seperti di Excel."],
    ["Menulis Rumus, Kata & Link","30 soal dengan kapitalisasi dan simbol yang harus tepat."],
    ["SUMIF","Menjumlahkan data berdasarkan kriteria."],
    ["AVERAGEIF","Menghitung rata-rata berdasarkan kriteria."],
    ["VLOOKUP","Mencari data pada tabel referensi."],
    ["Algoritma","Menyusun langkah pemecahan masalah."],
    ["Coding","Mengetik kode dasar secara tepat."]
  ];

  // Jumlah siswa mengikuti struktur kelas yang sudah ditetapkan.
  // Nama asli tidak tersedia pada salinan memori, sehingga sementara dibuat placeholder.
  // Ganti nilai array di bawah dengan daftar nama asli jika file Data Kelas tersedia.
  const CLASS_COUNTS = { "3P":26, "3Q":26, "3R":25, "3S":26, "3T":25 };
  const ROSTER = Object.fromEntries(
    Object.entries(CLASS_COUNTS).map(([cls,count]) => [
      cls, Array.from({length:count},(_,i)=>`Siswa ${cls} ${String(i+1).padStart(2,"0")}`)
    ])
  );

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
  let db = null;
  let realtime = false;

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const now = () => Date.now();

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
      exerciseState:{},
      score:40,
      elapsedSeconds:0
    };
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
        if(val){ settings = {...structuredClone(DEFAULT_SETTINGS),...val}; renderReactive(); }
      });
      db.ref("kelasExcel/progress").on("value", snap=>{
        allProgress = snap.val() || {};
        renderReactive();
      });
    }catch(e){
      console.warn("Firebase tidak aktif:",e);
      realtime = false;
    }
  }

  function persistSettings(){
    saveLocal();
    if(realtime) db.ref("kelasExcel/settings").set(settings);
  }
  function persistStudent(){
    saveLocal();
    if(realtime && currentUser){
      const key = safeId(progressKey(currentUser.className,currentUser.name));
      db.ref(`kelasExcel/progress/${key}`).set(currentUser);
    }
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
    if(allProgress[logical]) return allProgress[logical];
    const safe = safeId(logical);
    if(allProgress[safe]) return allProgress[safe];
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
      $("#teacherClassFilter").insertAdjacentHTML("beforeend",`<option>${cls}</option>`);
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
    let rec=getStudent(cls,name) || makeStudentRecord(cls,name);
    if(!rec.startedAt) rec.startedAt=now();
    currentUser=rec;
    setStudent(rec);
    persistStudent();
    currentExercise=Math.max(0,rec.completedExercises.findIndex(x=>!x));
    if(currentExercise<0) currentExercise=7;
    showView("#studentView");
    $("#studentIdentity").textContent=`${name} · ${cls}`;
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

  function renderStudent(){
    if(!currentUser) return;
    $("#studentStatusLine").textContent=settings.materialFinished
      ? "Materi telah diakhiri oleh guru. Tombol keluar sudah aktif."
      : "Kerjakan latihan secara berurutan. Keluar aktif setelah guru menekan “Materi selesai”.";
    $("#studentExitBtn").disabled=!settings.materialFinished;
    const completed=currentUser.completedExercises.filter(Boolean).length;
    $("#studentProgressBar span").style.width=`${completed/8*100}%`;
    $("#studentExerciseNav").innerHTML=EXERCISES.map((e,i)=>{
      const seqOk=i===0 || currentUser.completedExercises[i-1];
      const locked=!settings.unlocked[i] || !seqOk;
      return `<button data-ex="${i}" class="${currentExercise===i?"active":""} ${currentUser.completedExercises[i]?"done":""} ${locked?"locked":""}">
        ${locked?"🔒":currentUser.completedExercises[i]?"✓":String(i+1).padStart(2,"0")}<br>${escapeHtml(e[0])}
      </button>`;
    }).join("");
    $$("#studentExerciseNav button").forEach(b=>b.addEventListener("click",()=>{
      const i=+b.dataset.ex;
      const seqOk=i===0||currentUser.completedExercises[i-1];
      if(!settings.unlocked[i]||!seqOk){ toast("Latihan masih terkunci.");return; }
      currentExercise=i;renderStudent();
    }));
    renderExercise(currentExercise);
  }

  function exerciseHeader(i,extra=""){
    return `<div class="exercise-title">
      <div>
        <span class="exercise-no">LATIHAN ${String(i+1).padStart(2,"0")}</span>
        <h3>${escapeHtml(EXERCISES[i][0])}</h3>
        <p>${escapeHtml(EXERCISES[i][1])}</p>
      </div>
      <button class="guide-btn" data-guide="${i}">📖 Cara mengerjakan</button>
    </div>${extra}`;
  }

  function lockedPanel(i){
    return `${exerciseHeader(i)}<div class="locked-panel"><div class="big">🔒</div><h3>Latihan terkunci</h3><p>Guru belum membuka latihan ini atau latihan sebelumnya belum selesai.</p></div>`;
  }

  function renderExercise(i){
    const panel=$("#exercisePanel");
    const seqOk=i===0||currentUser.completedExercises[i-1];
    if(!settings.unlocked[i]||!seqOk){panel.innerHTML=lockedPanel(i);bindGuide();return;}
    if(i===0) renderL1(panel);
    if(i===1) renderL2(panel);
    if(i===2) renderL3(panel);
    if(i===3) renderFormulaExercise(panel,3,SUMIF_DATA,SUMIF_Q);
    if(i===4) renderFormulaExercise(panel,4,AVGIF_DATA,AVGIF_Q);
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
    const st=getExState(0,{index:0,hits:[]});
    const letters=Array.from({length:20},(_,i)=>String.fromCharCode(65+i));
    panel.innerHTML=exerciseHeader(0)+`
      <div class="task-card">
        <h4>Temukan alamat sel yang diminta</h4>
        <div class="prompt-banner"><span>Soal ${Math.min(st.index+1,10)} dari 10</span><strong>${st.index<10?L1_TARGETS[st.index]:"Semua benar ✓"}</strong></div>
        <div class="cell-grid-wrap"><table class="cell-grid" id="cellGrid"></table></div>
      </div>
      ${finishButton(0,st.index>=10)}
    `;
    const grid=$("#cellGrid");
    let html="<tr><th></th>"+letters.map(l=>`<th>${l}</th>`).join("")+"</tr>";
    for(let r=1;r<=20;r++){
      html+=`<tr><th class="row-number">${r}</th>`+letters.map(l=>{
        const addr=l+r;
        return `<td data-cell="${addr}" class="${st.hits.includes(addr)?"target-hit":""}">${addr}</td>`;
      }).join("")+"</tr>";
    }
    grid.innerHTML=html;
    $$("#cellGrid td").forEach(td=>td.addEventListener("click",()=>{
      if(st.index>=10)return;
      if(td.dataset.cell===L1_TARGETS[st.index]){
        st.hits.push(td.dataset.cell);st.index++;persistStudent();renderL1(panel);toast("Benar!");
      }else toast(`Belum tepat. Cari sel ${L1_TARGETS[st.index]}.`);
    }));
    bindFinish(0,st.index>=10);
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
    btn.addEventListener("click",()=>{
      if(currentUser.completedExercises[i]) return;
      if(!enabled){toast("Selesaikan semua soal terlebih dahulu.");return;}
      currentUser.completedExercises[i]=true;
      if(i===7 && currentUser.completedExercises.every(Boolean)){
        currentUser.completedAt=now();
        currentUser.elapsedSeconds=Math.floor((currentUser.completedAt-currentUser.startedAt)/1000);
        currentUser.score=scoreFromElapsed(currentUser.elapsedSeconds,true);
      }
      setStudent(currentUser);persistStudent();
      if(i<7) currentExercise=i+1;
      renderStudent();
      toast("Latihan berhasil diselesaikan.");
    });
  }

  function renderL2(panel){
    const st=getExState(1,{formulas:{},numbers:{}});
    const tasks=[];
    L2_ROWS.forEach((r,idx)=>{
      tasks.push({key:`g${idx}`, formula:`=SUM(B${r.row}:F${r.row})`, result:r.total});
      tasks.push({key:`h${idx}`, formula:`=AVERAGE(B${r.row}:F${r.row})`, result:r.avg});
    });
    const completeFormula=tasks.every(t=>st.formulas[t.key]?.correct);
    const extraQs=[
      ["Total Beras",24],["Rata-rata Gula",4],["Total Minyak",25],["Rata-rata Telur",6],["Total Susu",20]
    ];
    const completeNum=extraQs.every((q,i)=>Number(st.numbers[i])===q[1]);
    panel.innerHTML=exerciseHeader(1)+`
      <div class="task-card">
        <h4>Contoh seperti Excel</h4>
        <p>Ketik rumus pada sel berwarna krem lalu tekan <b>Enter</b>. Setelah Enter, hasil angka akan tampil seperti pada Excel. Contoh: <code>=SUM(B2:F2)</code> menghasilkan <b>24</b>.</p>
        <div class="sheet-wrap">
          <table class="sheet">
            <tr><th class="row-head"></th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th><th>F</th><th>G</th><th>H</th></tr>
            <tr><th class="row-head">1</th><th>Barang</th><th>Jan</th><th>Feb</th><th>Mar</th><th>Apr</th><th>Mei</th><th>Total</th><th>Rata-rata</th></tr>
            ${L2_ROWS.map((r,idx)=>`<tr>
              <th class="row-head">${r.row}</th><td class="item-cell">${r.item}</td>
              ${r.vals.map(v=>`<td>${v}</td>`).join("")}
              ${formulaCell(`g${idx}`,`=SUM(B${r.row}:F${r.row})`,r.total,st)}
              ${formulaCell(`h${idx}`,`=AVERAGE(B${r.row}:F${r.row})`,r.avg,st)}
            </tr>`).join("")}
          </table>
        </div>
      </div>
      <div class="task-card">
        <h4>Latihan penjumlahan menurun</h4>
        <p>Nilai berikut juga dapat dijumlahkan secara vertikal. Contoh: <code>=SUM(B12:B16)</code> menghasilkan <b>50</b> dan <code>=AVERAGE(B12:B16)</code> menghasilkan <b>10</b>.</p>
        <table class="data-table">
          <tr><th>Barang</th><th>Jumlah</th></tr>
          <tr><td>Beras</td><td>12</td></tr><tr><td>Gula</td><td>8</td></tr><tr><td>Minyak</td><td>10</td></tr><tr><td>Telur</td><td>15</td></tr><tr><td>Susu</td><td>5</td></tr>
          <tr><th>Total</th><th>50</th></tr><tr><th>Rata-rata</th><th>10</th></tr>
        </table>
      </div>
      <div class="task-card">
        <h4>5 soal tambahan — isi angkanya saja</h4>
        <p>Gunakan hasil yang sudah dihitung pada rumus di tabel sebelumnya.</p>
        <div class="numeric-grid">
          ${extraQs.map((q,i)=>`<div class="numeric-q"><strong>${i+1}. ${q[0]}</strong><input type="number" data-num="${i}" value="${st.numbers[i]??""}" placeholder="Jawaban angka"></div>`).join("")}
        </div>
      </div>
      ${finishButton(1,completeFormula&&completeNum)}
    `;
    $$("[data-formula-key]").forEach(inp=>{
      inp.addEventListener("keydown",e=>{
        if(e.key==="Enter"){
          e.preventDefault();
          const key=inp.dataset.formulaKey;
          const expected=inp.dataset.expected;
          const result=inp.dataset.result;
          const correct=normalizeFormula(inp.value)===normalizeFormula(expected);
          st.formulas[key]={value:inp.value,correct,result:correct?result:""};
          persistStudent();renderL2(panel);toast(correct?`Benar. Hasil = ${result}`:"Rumus belum tepat.");
        }
      });
    });
    $$("[data-num]").forEach(inp=>inp.addEventListener("input",()=>{
      st.numbers[inp.dataset.num]=inp.value;persistStudent();
      const ok=extraQs.every((q,i)=>Number(st.numbers[i])===q[1]);
      $("#finishExerciseBtn").disabled=!(tasks.every(t=>st.formulas[t.key]?.correct)&&ok);
    }));
    bindFinish(1,completeFormula&&completeNum);
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

  function bindGuide(){
    const b=$("[data-guide]");if(!b)return;
    b.addEventListener("click",()=>openGuide(+b.dataset.guide));
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
    if(i===0) return [
      `<div class="guide-slide"><h4>1. Kenali alamat sel</h4><p>Huruf menunjukkan kolom dan angka menunjukkan baris. Contoh <b>C7</b> berarti kolom C, baris 7.</p>${excelSim}</div>`,
      `<div class="guide-slide"><h4>2. Cari perpotongan kolom dan baris</h4><p>Temukan huruf kolom di bagian atas, lalu ikuti ke bawah sampai baris yang diminta.</p><div class="prompt-banner"><span>Contoh target</span><strong>C7</strong></div></div>`
    ];
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
    showView("#teacherView");renderTeacher();
  }

  function renderTeacher(){
    $("#lockControls").innerHTML=EXERCISES.map((e,i)=>`<button class="lock-toggle ${settings.unlocked[i]?"open":""}" data-lock="${i}">${settings.unlocked[i]?"🔓":"🔒"} ${i+1}. ${escapeHtml(e[0])}</button>`).join("");
    $$("[data-lock]").forEach(b=>b.addEventListener("click",()=>{
      const i=+b.dataset.lock;
      settings.unlocked[i]=!settings.unlocked[i];persistSettings();renderTeacher();toast(settings.unlocked[i]?`Latihan ${i+1} dibuka.`:`Latihan ${i+1} dikunci.`);
    }));
    $("#finishMaterialBtn").classList.toggle("done",settings.materialFinished);
    $("#finishMaterialBtn").textContent=settings.materialFinished?"✓ Materi sudah selesai":"Materi selesai";

    const records=[];
    for(const [cls,names] of Object.entries(ROSTER)){
      for(const name of names){
        records.push(getStudent(cls,name)||makeStudentRecord(cls,name));
      }
    }
    const started=records.filter(r=>r.startedAt).length;
    const finished=records.filter(r=>r.completedAt).length;
    $("#totalStudents").textContent=records.length;
    $("#startedStudents").textContent=started;
    $("#finishedStudents").textContent=finished;
    $("#notStartedStudents").textContent=records.length-started;

    const filter=$("#teacherClassFilter").value;
    const search=$("#teacherSearch").value.trim().toLowerCase();
    $("#teacherTableBody").innerHTML=records.filter(r=>(filter==="ALL"||r.className===filter)&&(!search||r.name.toLowerCase().includes(search))).map(r=>{
      const done=r.completedExercises?.filter(Boolean).length||0;
      const status=!r.startedAt?["Belum mulai","status-not"]:r.completedAt?["Selesai","status-done"]:["Mengerjakan","status-run"];
      const elapsed=r.startedAt?Math.floor(((r.completedAt||now())-r.startedAt)/1000):0;
      const score=r.completedAt?scoreFromElapsed(elapsed,true):40;
      return `<tr>
        <td><b>${r.className}</b></td><td>${escapeHtml(r.name)}</td>
        <td><span class="status-pill ${status[1]}">${status[0]}</span></td>
        <td>${done}/8</td><td>${r.startedAt?formatTime(elapsed):"-"}</td>
        <td><span class="score-badge score-${score}">${score}</span></td>
        <td><button class="reset-btn" data-reset="${escapeHtml(progressKey(r.className,r.name))}">Reset</button></td>
      </tr>`;
    }).join("");
    $$("[data-reset]").forEach(b=>b.addEventListener("click",()=>resetStudent(b.dataset.reset)));
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

  function renderReactive(){
    if($("#teacherView").classList.contains("active")) renderTeacher();
    if($("#studentView").classList.contains("active")&&currentUser){
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
    $("#teacherExitBtn").addEventListener("click",()=>{showView("#homeView");switchLoginMode("teacher")});
    $("#studentExitBtn").addEventListener("click",async()=>{
      if(!settings.materialFinished)return;
      clearInterval(timerInterval);currentUser=null;
      try{if(document.fullscreenElement)await document.exitFullscreen()}catch(e){}
      showView("#homeView");switchLoginMode("student");
    });
    $("#finishMaterialBtn").addEventListener("click",()=>{
      if(!settings.materialFinished){
        if(!confirm("Akhiri materi untuk seluruh siswa? Setelah ini tombol Keluar siswa akan aktif."))return;
        settings.materialFinished=true;
      }else{
        if(!confirm("Buka kembali materi? Tombol Keluar siswa akan dikunci lagi."))return;
        settings.materialFinished=false;
      }
      persistSettings();renderTeacher();
    });
    $("#teacherClassFilter").addEventListener("change",renderTeacher);
    $("#teacherSearch").addEventListener("input",renderTeacher);

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
