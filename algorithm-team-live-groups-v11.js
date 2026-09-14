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
    const view = document.getElementById("studentView");
    return !!(
      view &&
      view.classList.contains("active") &&
      view.querySelector(".alg-team-shell")
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