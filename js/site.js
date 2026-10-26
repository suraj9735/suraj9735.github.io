// Shared header, footer and theme for every page.
(function () {
  try { const t = localStorage.getItem("sk-theme"); if (t) document.documentElement.dataset.theme = t; } catch (e) {}

  const pages = [
    ["index.html", "Home"],
    ["research.html", "Research"],
    ["lab.html", "Interactive Lab"],
    ["tutorials.html", "Tutorials"],
    ["exercises.html", "Exercises"],
    ["quiz.html", "Quiz"],
    ["blog.html", "Blog"],
  ];
  const here = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  const current = here === "post.html" ? "blog.html" : here;

  document.addEventListener("DOMContentLoaded", () => {
    const P = window.PROFILE || {};
    const header = document.getElementById("site-header");
    if (header) {
      header.className = "nav";
      header.innerHTML = `
        <div class="container nav-inner">
          <a class="brand" href="index.html"><span class="logo">${P.initials || "SK"}</span><span>${P.name || "Suraj Kumar"}</span></a>
          <nav class="links" id="links">
            ${pages.map(([h, l]) => `<a href="${h}"${h === current ? ' class="active"' : ""}>${l}</a>`).join("")}
          </nav>
          <button class="icon-btn" id="themeBtn" aria-label="Toggle dark mode">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>
          </button>
          <button class="icon-btn menu-btn" id="menuBtn" aria-label="Menu">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
          </button>
        </div>`;
      document.getElementById("menuBtn").onclick = () => document.getElementById("links").classList.toggle("open");
      document.getElementById("themeBtn").onclick = () => {
        const r = document.documentElement;
        const dark = r.dataset.theme ? r.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
        r.dataset.theme = dark ? "light" : "dark";
        try { localStorage.setItem("sk-theme", r.dataset.theme); } catch (e) {}
        window.dispatchEvent(new Event("themechange"));
      };
    }
    const footer = document.getElementById("site-footer");
    if (footer) {
      footer.className = "footer";
      const L = P.links || {};
      footer.innerHTML = `
        <div class="container footer-inner">
          <span>© ${new Date().getFullYear()} ${P.name || "Suraj Kumar"} · ${P.affiliation || ""}</span>
          <span>
            ${L.email ? `<a href="mailto:${L.email}">Email</a>` : ""}
            ${L.scholar ? `<a href="${L.scholar}" target="_blank" rel="noopener">Google Scholar</a>` : ""}
            ${L.linkedin ? `<a href="${L.linkedin}" target="_blank" rel="noopener">LinkedIn</a>` : ""}
            ${L.github ? `<a href="${L.github}" target="_blank" rel="noopener">GitHub</a>` : ""}
            ${L.youtube ? `<a href="${L.youtube}" target="_blank" rel="noopener">YouTube</a>` : ""}
          </span>
        </div>`;
    }
  });
})();

// Small helpers shared by pages
window.esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
window.cssVar = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

// Hi-DPI canvas setup; returns a 2D context sized in CSS pixels
window.fitCanvas = function (cv) {
  const dpr = window.devicePixelRatio || 1;
  const r = cv.getBoundingClientRect();
  cv.width = Math.max(1, Math.round(r.width * dpr));
  cv.height = Math.max(1, Math.round(r.height * dpr));
  const ctx = cv.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.W = r.width; ctx.H = r.height;
  return ctx;
};

// Draws a simple line plot. series: [{data:[[x,y],...], color, width, dash}]
window.drawPlot = function (ctx, series, opt = {}) {
  const W = ctx.W, H = ctx.H, pad = { l: 52, r: 14, t: 16, b: 38 };
  ctx.clearRect(0, 0, W, H);
  let xs = [], ys = [];
  series.forEach((s) => s.data.forEach(([x, y]) => { if (isFinite(y)) { xs.push(x); ys.push(y); } }));
  let x0 = opt.xmin ?? Math.min(...xs), x1 = opt.xmax ?? Math.max(...xs);
  let y0 = opt.ymin ?? Math.min(...ys), y1 = opt.ymax ?? Math.max(...ys);
  if (y0 === y1) { y0 -= 1; y1 += 1; }
  if (opt.ymin === undefined && opt.ymax === undefined) { const m = (y1 - y0) * 0.08; y0 -= m; y1 += m; }
  const X = (x) => pad.l + ((x - x0) / (x1 - x0)) * (W - pad.l - pad.r);
  const Y = (y) => H - pad.b - ((y - y0) / (y1 - y0)) * (H - pad.t - pad.b);
  const grid = cssVar("--plot-grid"), muted = cssVar("--muted"), text = cssVar("--text");
  ctx.font = "11px Inter, system-ui, sans-serif"; ctx.lineWidth = 1;
  const nice = (lo, hi, n) => { const st = Math.pow(10, Math.floor(Math.log10((hi - lo) / n))); const e = (hi - lo) / n / st; const s = (e >= 5 ? 10 : e >= 2 ? 5 : e >= 1 ? 2 : 1) * st; const a = []; for (let v = Math.ceil(lo / s) * s; v <= hi + 1e-9; v += s) a.push(+v.toPrecision(10)); return a; };
  ctx.strokeStyle = grid; ctx.fillStyle = muted; ctx.textAlign = "right"; ctx.textBaseline = "middle";
  nice(y0, y1, 5).forEach((v) => { const y = Y(v); ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(W - pad.r, y); ctx.stroke(); ctx.fillText(+v.toFixed(3), pad.l - 6, y); });
  ctx.textAlign = "center"; ctx.textBaseline = "top";
  nice(x0, x1, 6).forEach((v) => { const x = X(v); ctx.beginPath(); ctx.moveTo(x, pad.t); ctx.lineTo(x, H - pad.b); ctx.stroke(); ctx.fillText(+v.toFixed(3), x, H - pad.b + 6); });
  if (opt.xlabel) { ctx.fillStyle = text; ctx.fillText(opt.xlabel, (pad.l + W - pad.r) / 2, H - 16); }
  if (opt.ylabel) { ctx.save(); ctx.translate(12, (pad.t + H - pad.b) / 2); ctx.rotate(-Math.PI / 2); ctx.fillStyle = text; ctx.fillText(opt.ylabel, 0, -6); ctx.restore(); }
  ctx.save(); ctx.beginPath(); ctx.rect(pad.l, pad.t, W - pad.l - pad.r, H - pad.t - pad.b); ctx.clip();
  series.forEach((s) => {
    ctx.strokeStyle = s.color; ctx.lineWidth = s.width || 2; ctx.setLineDash(s.dash || []);
    ctx.beginPath(); let started = false;
    s.data.forEach(([x, y]) => { if (!isFinite(y)) { started = false; return; } started ? ctx.lineTo(X(x), Y(y)) : ctx.moveTo(X(x), Y(y)); started = true; });
    ctx.stroke();
    if (s.marker) { ctx.fillStyle = s.color; s.data.forEach(([x, y]) => { ctx.beginPath(); ctx.arc(X(x), Y(y), 5, 0, 7); ctx.fill(); }); }
  });
  ctx.restore(); ctx.setLineDash([]);
  return { X, Y };
};

// Animated spring-mass drawing in a vertical canvas. y = displacement (scaled -1..1)
window.drawSpringMass = function (ctx, y, opt = {}) {
  const W = ctx.W, H = ctx.H, cx = W / 2;
  ctx.clearRect(0, 0, W, H);
  const text = cssVar("--text"), accent = cssVar("--accent"), muted = cssVar("--muted"), acc2 = cssVar("--accent-2");
  const top = 18, rest = H * 0.55, amp = H * 0.22, mh = 46, mw = 70;
  const my = rest + Math.max(-1.2, Math.min(1.2, y)) * amp;
  // ceiling
  ctx.fillStyle = muted; ctx.fillRect(cx - 60, top - 8, 120, 6);
  ctx.strokeStyle = muted; ctx.lineWidth = 1;
  for (let i = -60; i < 60; i += 10) { ctx.beginPath(); ctx.moveTo(cx + i, top - 8); ctx.lineTo(cx + i + 8, top - 16); ctx.stroke(); }
  // spring
  const sx = opt.damper ? cx - 16 : cx, coils = 10, y0 = top, y1 = my - mh / 2;
  ctx.strokeStyle = text; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(sx, y0); ctx.lineTo(sx, y0 + 10);
  for (let i = 0; i <= coils; i++) { const yy = y0 + 10 + (i / coils) * (y1 - y0 - 20); ctx.lineTo(sx + (i % 2 ? 12 : -12) * (i && i < coils ? 1 : 0), yy); }
  ctx.lineTo(sx, y1); ctx.stroke();
  // damper
  if (opt.damper) {
    const dx = cx + 18, mid = (y0 + y1) / 2;
    ctx.beginPath(); ctx.moveTo(dx, y0); ctx.lineTo(dx, mid - 14); ctx.stroke();
    ctx.strokeRect(dx - 8, mid - 14, 16, 28);
    ctx.beginPath(); ctx.moveTo(dx - 6, mid + 4); ctx.lineTo(dx + 6, mid + 4); ctx.moveTo(dx, mid + 4); ctx.lineTo(dx, y1); ctx.stroke();
  }
  // mass
  const g = ctx.createLinearGradient(0, my - mh / 2, 0, my + mh / 2);
  g.addColorStop(0, accent); g.addColorStop(1, acc2);
  ctx.fillStyle = g; ctx.beginPath(); ctx.roundRect(cx - mw / 2, my - mh / 2, mw, mh, 8); ctx.fill();
  ctx.fillStyle = "#fff"; ctx.font = "600 15px Inter, sans-serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText("m", cx, my);
  // equilibrium line
  ctx.setLineDash([4, 4]); ctx.strokeStyle = muted; ctx.beginPath(); ctx.moveTo(cx - 70, rest); ctx.lineTo(cx + 70, rest); ctx.stroke(); ctx.setLineDash([]);
  // force arrow
  if (opt.force) {
    const f = Math.max(-1, Math.min(1, opt.force)) * 40, by = my + mh / 2 + 8;
    ctx.strokeStyle = cssVar("--warn") || "#d97706"; ctx.fillStyle = ctx.strokeStyle; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(cx, by + 20); ctx.lineTo(cx, by + 20 + f); ctx.stroke();
    ctx.beginPath(); const tip = by + 20 + f, d = Math.sign(f) || 1; ctx.moveTo(cx, tip + 6 * d); ctx.lineTo(cx - 6, tip - 2 * d); ctx.lineTo(cx + 6, tip - 2 * d); ctx.fill();
    ctx.font = "12px Inter"; ctx.fillText("F(t)", cx + 26, by + 22);
  }
  if (opt.target !== undefined) {
    const ty = rest + opt.target * amp; ctx.strokeStyle = cssVar("--bad"); ctx.setLineDash([6, 4]); ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(cx - 80, ty); ctx.lineTo(cx + 80, ty); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = cssVar("--bad"); ctx.font = "11px Inter"; ctx.textAlign = "left"; ctx.fillText("target", cx + 50, ty - 8);
  }
};
