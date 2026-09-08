(() => {
  "use strict";

  function fail(message, extra) {
    console.error(message, extra || "");
    document.body.insertAdjacentHTML("beforeend",
      `<div style="position:fixed;left:18px;right:18px;bottom:18px;z-index:99999;
      padding:14px 18px;border-radius:12px;background:#8b1e1e;color:white;font:600 13px system-ui">
      ${message}</div>`);
  }

  async function loadAndPatch() {
    let source;
    try {
      const res = await fetch("app.js?v=" + Date.now(), { cache: "no-store" });
      if (!res.ok) throw new Error("HTTP " + res.status);
      source = await res.text();
    } catch (err) {
      fail("Gagal memuat app.js.", err);
      return;
    }

    // 1) Saat siswa login, selalu mulai dari menu latihan.
    source = source.replace(
      /if\(currentExercise<0\) currentExercise=7;\s*showView\("#studentView"\);\s*\$\("#studentIdentity"\)\.textContent=`\$\{name\} · \$\{cls\}`;\s*enterFullscreen\(\);\s*startTimer\(\);\s*renderStudent\(\);/,
      `if(currentExercise<0) currentExercise=7;
    showView("#studentView");
    $("#studentIdentity").textContent=\`\${name} · \${cls}\`;
    $("#exercisePanel").classList.add("hidden");
    $("#exercisePanel").dataset.opened="0";
    $("#exercisePanel").innerHTML="";
    enterFullscreen();
    startTimer();
    renderStudent();`
    );

    // 2) Menu siswa: tidak lagi bergantung pada latihan sebelumnya.
    const newRenderStudent = String.raw`
  function renderStudent(){
    if(!currentUser) return;

    const completed=currentUser.completedExercises.filter(Boolean).length;
    const percent=Math.round(completed/8*100);

    $("#studentIdentity").innerHTML=
      \`<small class="student-hello">Halo, \${escapeHtml(currentUser.name)}</small>
       <span>Pilih jendela latihan</span>\`;

    $("#studentStatusLine").textContent=
      "Pilih latihan yang dibuka oleh guru. Status kunci diperbarui otomatis.";

    $("#studentExitBtn").disabled=!settings.materialFinished;
    $("#studentProgressBar span").style.width=\`\${percent}%\`;

    const actions=$(".workspace-actions");
    if(actions){
      let quick=$("#studentQuickStats");
      if(!quick){
        actions.insertAdjacentHTML("afterbegin",
          \`<div id="studentQuickStats" class="student-quick-stats">
             <div><b id="studentCompletedText">0 dari 8 selesai</b><strong id="studentPercentText">0%</strong></div>
             <span class="student-mini-progress"><i id="studentMiniProgress"></i></span>
             <small id="studentExitHint"></small>
           </div>\`);
      }
      $("#studentCompletedText").textContent=\`\${completed} dari 8 selesai\`;
      $("#studentPercentText").textContent=\`\${percent}%\`;
      $("#studentMiniProgress").style.width=\`\${percent}%\`;
      $("#studentExitHint").textContent=settings.materialFinished
        ? "Materi selesai. Anda dapat keluar."
        : "Tombol keluar aktif setelah guru mengakhiri materi.";
    }

    const timerCard=$(".timer-card");
    if(timerCard) timerCard.classList.add("student-timer-hidden");

    const icons=["▦","∑","🔗","▦","▦","▤","☷","{ }"];
    const desc=[
      "Cari alamat 10 angka pada tabel unik 20 × 20.",
      "Isi semua Total dan Rata-rata, lalu kerjakan soal tambahan.",
      "Salin rumus, kata, dan tautan dengan tepat.",
      "Jumlahkan data memakai satu kriteria.",
      "Hitung rata-rata berdasarkan syarat.",
      "Cari data pada tabel referensi.",
      "Susun langkah penyelesaian masalah.",
      "Tulis satu baris kode dengan tepat."
    ];
    const themes=["green","blue","cyan","purple","orange","red","indigo","slate"];

    $("#studentExerciseNav").innerHTML=EXERCISES.map((e,i)=>{
      const open=!!settings.unlocked[i];
      const done=!!currentUser.completedExercises[i];
      return \`<button type="button" data-ex="\${i}"
          class="student-window-card theme-\${themes[i]} \${open?"open":"locked"} \${done?"done":""}">
        <span class="student-window-top">
          <span class="student-window-icon">\${icons[i]}</span>
          <b>\${String(i+1).padStart(2,"0")}</b>
        </span>
        <strong>\${escapeHtml(e[0])}</strong>
        <small>\${desc[i]}</small>
        <span class="student-window-action">
          \${done?"✓ Selesai":open?\`Buka Latihan \${i+1}\`:"🔒 Terkunci"}
        </span>
      </button>\`;
    }).join("");

    $$("#studentExerciseNav [data-ex]").forEach(card=>card.addEventListener("click",()=>{
      const i=+card.dataset.ex;
      if(!settings.unlocked[i]){
        toast(\`Latihan \${i+1} masih dikunci oleh guru.\`);
        return;
      }
      currentExercise=i;
      $("#exercisePanel").dataset.opened="1";
      $("#exercisePanel").classList.remove("hidden");
      renderExercise(i);
      setTimeout(()=>$("#exercisePanel").scrollIntoView({behavior:"smooth",block:"start"}),30);
    }));

    if($("#exercisePanel").dataset.opened==="1"){
      renderExercise(currentExercise);
    }
  }`;

    source = source.replace(
      /  function renderStudent\(\)\{[\s\S]*?\n  \}\n\n  function exerciseHeader/,
      newRenderStudent + "\n\n  function exerciseHeader"
    );

    // 3) Teks panel terkunci tidak lagi menyebut latihan sebelumnya.
    source = source.replace(
      /function lockedPanel\(i\)\{[\s\S]*?\n  \}/,
      `function lockedPanel(i){
    return \`\${exerciseHeader(i)}<div class="locked-panel">
      <div class="big">🔒</div>
      <h3>Latihan terkunci</h3>
      <p>Guru belum membuka latihan ini.</p>
    </div>\`;
  }`
    );

    // 4) Hapus syarat urutan. Satu-satunya syarat adalah tombol guru.
    source = source.replace(
      /  function renderExercise\(i\)\{[\s\S]*?\n  \}\n\n  function getExState/,
`  function renderExercise(i){
    const panel=$("#exercisePanel");
    if(!settings.unlocked[i]){
      panel.innerHTML=lockedPanel(i);
      bindGuide();
      return;
    }
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

  function getExState`
    );

    // 5) Dashboard guru benar-benar mengontrol settings.unlocked di Firebase.
    source = source.replace(
      /const open=teacherAccessPreview\[i\];/g,
      `const open=!!settings.unlocked[i];`
    );

    source = source.replace(
      /\$\$\("\[data-preview-lock\]"\)\.forEach\(b=>b\.addEventListener\("click",\(\)=>\{[\s\S]*?\}\)\);/,
`$$("[data-preview-lock]").forEach(b=>b.addEventListener("click",()=>{
      const i=+b.dataset.previewLock;
      settings.unlocked[i]=!settings.unlocked[i];
      persistSettings();
      renderTeacher();
      toast(\`Latihan \${i+1} \${settings.unlocked[i]?"dibuka":"dikunci"} untuk siswa.\`);
    }));`
    );

    source = source.replace(
      /Status tombol ini hanya tampilan guru dan <b>belum terhubung ke siswa<\/b>\./g,
      `Perubahan tersambung ke ruang siswa dan diperbarui otomatis.`
    );

    // 6) Jika source punya kalimat toast lama, hilangkan makna preview.
    source = source.replace(
      /Tampilan guru: Latihan \$\{i\+1\} \$\{teacherAccessPreview\[i\]\?"dibuka":"dikunci"\}\. Belum dikirim ke siswa\./g,
      `Latihan \${i+1} diperbarui untuk siswa.`
    );

    // 7) Karena app.js dimuat lewat fetch, pastikan bootstrap tetap berjalan
    // walau DOMContentLoaded sudah terlanjur terjadi.
    source = source.replace(
      /document\.addEventListener\("DOMContentLoaded",bootstrap\);/,
      `if(document.readyState==="loading"){
         document.addEventListener("DOMContentLoaded",bootstrap);
       }else{
         bootstrap();
       }`
    );

    // Jalankan app.js yang sudah dipatch.
    try {
      (0, eval)(source + "\\n//# sourceURL=app.patched.js");
    } catch (err) {
      fail("app.js berhasil dimuat tetapi patch gagal dijalankan.", err);
      console.error(source);
    }
  }

  loadAndPatch();
})();