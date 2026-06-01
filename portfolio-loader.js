/**
 * Mariam Saad Portfolio — Data Loader
 * Reads portfolio.json from GitHub and populates the page dynamically.
 * Add this script at the END of index.html, before </body>
 *
 * Usage: <script src="portfolio-loader.js"></script>
 */

(async function () {
  // ── CONFIG ──────────────────────────────────────────────────────────────
  // The raw GitHub URL of your portfolio.json file
  const JSON_URL =
    "https://raw.githubusercontent.com/MariamSaad2/Mariam-Saad/main/portfolio.json";

  // ── FETCH DATA ───────────────────────────────────────────────────────────
  let d;
  try {
    const res = await fetch(JSON_URL + "?t=" + Date.now()); // bust cache
    if (!res.ok) throw new Error("fetch failed");
    d = await res.json();
  } catch (e) {
    console.warn("portfolio-loader: could not load portfolio.json", e);
    return; // silently keep the hardcoded HTML as fallback
  }

  // ── HELPERS ──────────────────────────────────────────────────────────────
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);
  const set = (sel, val) => { const el = $(sel); if (el && val !== undefined) el.textContent = val; };
  const attr = (sel, a, val) => { const el = $(sel); if (el && val) el.setAttribute(a, val); };
  const html = (sel, val) => { const el = $(sel); if (el && val !== undefined) el.innerHTML = val; };

  // ── HERO ─────────────────────────────────────────────────────────────────
  if (d.hero) {
    const h = d.hero;

    // Badge
    const badge = $(".badge");
    if (badge) badge.innerHTML = `<span class="badge-dot"></span> ${h.badge}`;

    // Title — h1 has two lines: "Social Media<br><em>Specialist</em>"
    const h1 = $("h1");
    if (h1) h1.innerHTML = `${h.title_line1}<br><em>${h.title_line2}</em>`;

    // Subtitle + description
    set(".hsub", h.subtitle);
    set(".hdesc", h.description);

    // Page title
    if (h.title_line1 && h.title_line2)
      document.title = `Mariam Saad — ${h.title_line1} ${h.title_line2}`;
  }

  // ── STATS BAR ────────────────────────────────────────────────────────────
  if (d.stats && d.stats.length) {
    const statsEl = $(".stats");
    if (statsEl) {
      statsEl.innerHTML = d.stats
        .map(
          (s) => `
        <div class="stat">
          <div class="stn">${s.number}</div>
          <div class="stl">${s.label}</div>
        </div>`
        )
        .join("");
    }
  }

  // ── ABOUT ────────────────────────────────────────────────────────────────
  if (d.about) {
    const a = d.about;

    // Paragraphs — inside .at (about text column)
    const at = $(".at");
    if (at && a.paragraphs && a.paragraphs.length) {
      // Keep the h2 and .sl, replace only the <p> tags
      const existingPs = at.querySelectorAll("p");
      existingPs.forEach((p) => p.remove());

      // Remove old tags div if any
      const oldTags = at.querySelector(".tags");
      if (oldTags) oldTags.remove();

      a.paragraphs.forEach((text) => {
        const p = document.createElement("p");
        p.textContent = text;
        at.appendChild(p);
      });

      // Re-add tags
      if (a.tags && a.tags.length) {
        const tagsDiv = document.createElement("div");
        tagsDiv.className = "tags";
        tagsDiv.innerHTML = a.tags
          .map((t) => `<span class="tag">${t}</span>`)
          .join("");
        at.appendChild(tagsDiv);
      }
    }

    // About card (avis) — name, role, location, email, phone
    const aname = $(".aname");
    const arole = $(".arole");
    if (aname && d.hero) aname.textContent = d.hero.title_line1 + " " + d.hero.title_line2;
    // Name from hero — use actual name from contact card label if available

    const acis = $$(".aci");
    if (acis.length >= 3 && a.contact_info) {
      const ci = a.contact_info;
      // location
      if (ci.location)
        acis[0].innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>${ci.location}`;
      // email
      if (ci.email)
        acis[1].innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,12 2,6"/></svg>${ci.email}`;
      // phone
      if (ci.phone)
        acis[2].innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.22 1.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.91-.91a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>${ci.phone}`;
    }
  }

  // ── SERVICES ─────────────────────────────────────────────────────────────
  if (d.services && d.services.length) {
    const sgrid = $(".sgrid");
    if (sgrid) {
      sgrid.innerHTML = d.services
        .map(
          (s) => `
        <div class="sc">
          <div class="si2">${s.icon}</div>
          <div class="st">${s.title}</div>
          <div class="sd">${s.description}</div>
        </div>`
        )
        .join("");
    }
  }

  // ── PROCESS STEPS ────────────────────────────────────────────────────────
  if (d.process && d.process.length) {
    const ptk = $(".ptk");
    if (ptk) {
      ptk.innerHTML = d.process
        .map(
          (p) => `
        <div class="ps2">
          <div class="snum">${p.step}</div>
          <div class="stit">${p.title}</div>
          <div class="sds">${p.description}</div>
        </div>`
        )
        .join("");

      // Re-add the horizontal line pseudo-element is CSS — no action needed
    }
  }

  // ── WORK CASES ───────────────────────────────────────────────────────────
  if (d.work && d.work.length) {
    const wgrid = $(".wgrid");
    if (wgrid) {
      wgrid.innerHTML = d.work
        .map(
          (w, i) => `
        <div class="wc" onclick="openWork(${i})" style="cursor:pointer">
          <div class="wct">
            <div class="wl">${w.label}</div>
            <div class="wtit">${w.title}</div>
          </div>
          <div class="wb">
            <div class="wch">${w.challenge}</div>
            <div class="wrs">
              ${(w.results || [])
                .map((r) => `<div class="wri">${r}</div>`)
                .join("")}
            </div>
          </div>
        </div>`
        )
        .join("");
    }

    // Work modal — rebuild openWork to use JSON data
    window._workData = d.work;
    window.openWork = function (i) {
      const w = window._workData[i];
      if (!w) return;
      const wmd = document.querySelector(".wmd");
      if (!wmd) return;
      wmd.querySelector("h3").textContent = w.title;
      wmd.querySelector(".wl") && (wmd.querySelector(".wl").textContent = w.label);
      const wmg = wmd.querySelector(".wmg");
      if (wmg) {
        wmg.innerHTML = `
          <div class="wms">
            <h4>The Challenge</h4>
            <p>${w.challenge}</p>
          </div>
          <div class="wms">
            <h4>Results</h4>
            <ul>${(w.results || []).map((r) => `<li>${r}</li>`).join("")}</ul>
          </div>`;
      }
      document.getElementById("wmo").classList.add("active");
    };
  }

  // ── RESULTS ──────────────────────────────────────────────────────────────
  if (d.results && d.results.length) {
    const rgrid = $(".rgrid");
    if (rgrid) {
      rgrid.innerHTML = d.results
        .map(
          (r) => `
        <div class="rc">
          <div class="ri">${r.icon}</div>
          <div>
            <div class="rn">${r.number}</div>
            <div class="rt">${r.label}</div>
          </div>
        </div>`
        )
        .join("");
    }
  }

  // ── TESTIMONIAL ──────────────────────────────────────────────────────────
  if (d.testimonial) {
    const tc = $(".tc");
    if (tc) {
      const tt = tc.querySelector(".tt");
      if (tt) tt.textContent = d.testimonial.text;
      // Author — find the <p> after .tt
      const authorEl = tc.querySelector("p:last-child");
      if (authorEl && d.testimonial.author)
        authorEl.textContent = "— " + d.testimonial.author;
    }
  }

  // ── CONTACT LINKS ────────────────────────────────────────────────────────
  if (d.contact) {
    const c = d.contact;

    // Contact modal links
    const mcis = $$(".mci");
    const contactMap = [
      { href: c.email ? `mailto:${c.email}` : null, icon: "📧", label: c.email },
      { href: c.whatsapp ? `https://wa.me/${c.whatsapp.replace(/\D/g, "")}` : null, icon: "💬", label: "WhatsApp" },
      { href: c.instagram, icon: "📸", label: "Instagram" },
      { href: c.facebook, icon: "📘", label: "Facebook" },
      { href: c.linkedin, icon: "💼", label: "LinkedIn" },
      { href: c.tiktok, icon: "🎵", label: "TikTok" },
    ].filter((x) => x.href);

    // Update the contact section links (.cls)
    const cls = $(".cls");
    if (cls) {
      cls.innerHTML = contactMap
        .map(
          (x) => `
        <a class="cl" href="${x.href}" target="_blank" rel="noopener">
          ${x.icon} ${x.label}
        </a>`
        )
        .join("");
    }

    // Update contact modal
    const cmo = $("#cmo");
    if (cmo) {
      const mciContainer = cmo.querySelector(".md");
      if (mciContainer) {
        // Replace all .mci links
        const existingMcis = mciContainer.querySelectorAll(".mci");
        existingMcis.forEach((el) => el.remove());
        const h3 = mciContainer.querySelector("h3");
        contactMap.forEach((x) => {
          const a = document.createElement("a");
          a.className = "mci";
          a.href = x.href;
          a.target = "_blank";
          a.rel = "noopener";
          a.innerHTML = `${x.icon} ${x.label}`;
          mciContainer.appendChild(a);
        });
      }
    }

    // Footer name
    const fn = $(".fn");
    if (fn && d.hero) fn.textContent = d.hero.title_line1.charAt(0) + d.hero.title_line2.charAt(0) + ".";
  }

  console.log("✅ portfolio-loader: data loaded successfully");
})();
