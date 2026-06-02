/**
 * Mariam Saad — Portfolio Data Loader v3
 * ضع هذا السطر قبل </body> في index.html:
 * <script src="portfolio-loader.js"></script>
 */
(async function () {

  const JSON_URL = "https://raw.githubusercontent.com/MariamSaad2/Mariam-Saad/main/portfolio.json";

  let d;
  try {
    const res = await fetch(JSON_URL + "?v=" + Date.now());
    if (!res.ok) throw new Error("HTTP " + res.status);
    d = await res.json();
    console.log("✅ portfolio-loader v3: loaded", d);
  } catch (e) {
    console.warn("⚠️ portfolio-loader: failed, keeping HTML as-is.", e.message);
    return;
  }

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);
  const txt = (s, v) => { const el = $(s); if (el && v != null) el.textContent = v; };
  const htm = (s, v) => { const el = $(s); if (el && v != null) el.innerHTML = v; };

  // ── 1. HERO ──────────────────────────────────────────────────────────────
  if (d.hero) {
    const h = d.hero;
    const badge = $(".badge");
    if (badge) badge.innerHTML = `<span class="badge-dot"></span> ${h.badge || ""}`;
    htm("h1", `${h.title_line1 || "Social Media"}<br><em>${h.title_line2 || "Specialist"}</em>`);
    txt(".hsub", h.subtitle);
    txt(".hdesc", h.description);
    document.title = `Mariam Saad — ${h.title_line1} ${h.title_line2}`;
  }

  // ── 2. STATS ─────────────────────────────────────────────────────────────
  if (d.stats && d.stats.length) {
    htm(".stats", d.stats.map(s => `
      <div class="stat">
        <div class="stn">${s.number}</div>
        <div class="stl">${s.label}</div>
      </div>`).join(""));
  }

  // ── 3. ABOUT ─────────────────────────────────────────────────────────────
  if (d.about) {
    const a = d.about;

    // paragraphs inside .at (keep h2 + .sl)
    const at = $(".at");
    if (at) {
      // زيل كل p و .tags القديمة
      at.querySelectorAll("p, .tags").forEach(el => el.remove());

      (a.paragraphs || []).forEach(text => {
        const p = document.createElement("p");
        p.textContent = text;
        at.appendChild(p);
      });

      if (a.tags && a.tags.length) {
        const div = document.createElement("div");
        div.className = "tags";
        div.innerHTML = a.tags.map(t => `<span class="tag">${t}</span>`).join("");
        at.appendChild(div);
      }
    }

    // contact card .avis
    const ci = a.contact_info || {};
    txt(".aname", ci.name);
    txt(".arole", ci.role);

    const acis = $$(".aci");
    const svgMail = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,12 2,6"/></svg>`;
    const svgPhone = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`;

    if (acis[0] && ci.email)  acis[0].innerHTML = `${svgMail} ${ci.email}`;
    if (acis[1] && ci.phone)  acis[1].innerHTML = `${svgPhone} ${ci.phone}`;
  }

  // ── 4. SERVICES ──────────────────────────────────────────────────────────
  if (d.services && d.services.length) {
    htm(".sgrid", d.services.map(s => `
      <div class="sc">
        <div class="si2">${s.icon}</div>
        <div class="st">${s.title}</div>
        <p class="sd">${s.description}</p>
      </div>`).join(""));
  }

  // ── 5. PROCESS ───────────────────────────────────────────────────────────
  if (d.process && d.process.length) {
    htm(".ptk", d.process.map(p => `
      <div class="ps2">
        <div class="snum">${p.step}</div>
        <div class="stit">${p.title}</div>
        <p class="sds">${p.description}</p>
      </div>`).join(""));
  }

  // ── 6. WORK CASES ────────────────────────────────────────────────────────
  if (d.work && d.work.length) {
    window._workData = d.work;

    htm(".wgrid", d.work.map((w, i) => `
      <div class="wc" style="cursor:pointer" onclick="openWork(${i})">
        <div class="wct">
          <div class="wl">${w.label}</div>
          <div class="wtit">${w.title}</div>
        </div>
        <div class="wb">
          <p class="wch">${w.challenge}</p>
          <div class="wrs">
            ${(w.results || []).map(r => `<div class="wri">${r}</div>`).join("")}
          </div>
        </div>
      </div>`).join(""));

    // override openWork
    window.openWork = function (i) {
      const w = window._workData[i];
      if (!w) return;
      const modal = document.getElementById("wmo");
      if (!modal) return;
      const wmd = modal.querySelector(".wmd");
      if (!wmd) return;
      const h3 = wmd.querySelector("h3");
      if (h3) h3.textContent = w.title;
      const wl = wmd.querySelector(".wl");
      if (wl) wl.textContent = w.label;
      const wmg = wmd.querySelector(".wmg");
      if (wmg) wmg.innerHTML = `
        <div class="wms">
          <h4>The Challenge</h4>
          <p>${w.challenge}</p>
        </div>
        <div class="wms">
          <h4>Results</h4>
          <ul>${(w.results || []).map(r => `<li>${r}</li>`).join("")}</ul>
        </div>`;
      modal.classList.add("active");
    };
  }

  // ── 7. RESULTS ───────────────────────────────────────────────────────────
  if (d.results && d.results.length) {
    htm(".rgrid", d.results.map(r => `
      <div class="rc">
        <div class="ri">${r.icon}</div>
        <div>
          <div class="rn">${r.number}</div>
          <div class="rt">${r.label}</div>
        </div>
      </div>`).join(""));
  }

  // ── 8. TESTIMONIAL ───────────────────────────────────────────────────────
  if (d.testimonial) {
    txt(".tt", d.testimonial.text);
    // author p — the last <p> in .tc that is not .tt
    const tc = $(".tc");
    if (tc) {
      const ps = [...tc.querySelectorAll("p")].filter(p => !p.classList.contains("tt"));
      if (ps.length) ps[ps.length - 1].textContent = "— " + d.testimonial.author;
    }
  }

  // ── 9. CONTACT LINKS ─────────────────────────────────────────────────────
  if (d.contact) {
    const c = d.contact;
    const links = [
      c.email     && { href: `mailto:${c.email}`,                              icon: "📧", label: c.email },
      c.whatsapp  && { href: `https://wa.me/${c.whatsapp.replace(/\D/g, "")}`, icon: "💬", label: "WhatsApp" },
      c.instagram && { href: c.instagram,  icon: "📸", label: "Instagram" },
      c.facebook  && { href: c.facebook,   icon: "📘", label: "Facebook"  },
      c.linkedin  && { href: c.linkedin,   icon: "💼", label: "LinkedIn"  },
      c.tiktok    && { href: c.tiktok,     icon: "🎵", label: "TikTok"    },
    ].filter(Boolean);

    // contact section buttons
    const cls = $(".cls");
    if (cls) {
      cls.innerHTML = links.map(x =>
        `<a class="cl" href="${x.href}" target="_blank" rel="noopener">${x.icon} ${x.label}</a>`
      ).join("");
    }

    // contact modal #cmo
    const cmo = document.getElementById("cmo");
    if (cmo) {
      const md = cmo.querySelector(".md");
      if (md) {
        md.querySelectorAll(".mci").forEach(el => el.remove());
        links.forEach(x => {
          const a = document.createElement("a");
          a.className = "mci";
          a.href = x.href;
          a.target = "_blank";
          a.rel = "noopener";
          a.innerHTML = `${x.icon} ${x.label}`;
          md.appendChild(a);
        });
      }
    }
  }

})();
