/* ============================================================
   ALGORITM.JS — V15
   Gabungan:
   1. Algorithm Race V12 loader
   2. Tim dinamis V11
   3. Dashboard Algorithm Race V12

   Catatan:
   - File ini menjadi SATU-SATUNYA file tambahan algoritma
     yang dipanggil dari index.html.
   - algorithm-team-game.js lama tetap berada di repository sebagai
     source dasar yang dibaca otomatis oleh modul Race.
   ============================================================ */

(() => {
  "use strict";

  const VERSION = "algorithm-race-v15";
  const ORIGINAL = "algorithm-team-game.js?v=20260914-team-v10-teacher-manager";

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

  async function load(){
    try{
      const res=await fetch(ORIGINAL,{cache:"no-store"});
      if(!res.ok)throw new Error(`HTTP ${res.status}`);
      let src=await res.text();

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
        '<div class="alg-badges">${badges}</div><div class="alg-race-strip"><div><small>Algoritma aktif</small><strong>#<span id="algRaceCurrent">${(Number(GAME.raceRound)||0)+1}</span></strong></div><div><small>Selesai</small><strong><span id="algRaceDone">${raceTeamMetrics().completed}</span></strong></div><div><small>Poin tim</small><strong><span id="algRacePoints">${raceTeamMetrics().points}</span></strong></div><div><small>Sisa waktu</small><strong id="algRaceClock">${raceIsActive()?raceTimeText(raceRemainingMs()):"—"}</strong></div></div>',
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
