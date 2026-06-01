/**
 * Mariam Saad — Portfolio Data Loader
 * <script src="portfolio-loader.js"></script>
 */

(async function () {

  const JSON_URL = "https://raw.githubusercontent.com/MariamSaad2/Mariam-Saad/main/portfolio.json";

  let d;

  try {
    const res = await fetch(JSON_URL + "?nocache=" + Date.now());

    if (!res.ok) throw new Error("HTTP " + res.status);

    d = await res.json();

    console.log("✅ portfolio loaded", d);

  } catch (e) {
    console.warn("⚠️ JSON load failed", e.message);
    return;
  }

  const $ = (s) => document.querySelector(s);

  const txt = (s, v) => {
    const el = $(s);
    if (el && v != null) el.textContent = v;
  };

  const htm = (s, v) => {
    const el = $(s);
    if (el && v != null) el.innerHTML = v;
  };

  // ====================================================
  // HERO
  // ====================================================

  if (d.personal) {

    document.title =
      `${d.personal.name} — ${d.personal.title}`;

    txt(".hsub", d.personal.title);

    htm(
      "h1",
      `${d.personal.name.split(" ")[0]}<br><em>${d.personal.title}</em>`
    );

    txt(
      ".hdesc",
      d.about?.description || ""
    );
  }

  // ====================================================
  // STATS
  // ====================================================

  if (d.stats?.length) {

    htm(
      ".stats",
      d.stats.map(s => `
        <div class="stat">
          <div class="stn">${s.value}</div>
          <div class="stl">${s.label}</div>
        </div>
      `).join("")
    );
  }

  // ====================================================
  // ABOUT
  // ====================================================

  if (d.about) {

    const at = $(".at");

    if (at) {

      const keep = [...at.querySelectorAll("h2, .sl")];

      at.innerHTML = "";

      keep.forEach(el => at.appendChild(el));

      const p = document.createElement("p");
      p.textContent = d.about.description;
      at.appendChild(p);

      if (d.about.industries?.length) {

        const tags = document.createElement("div");

        tags.className = "tags";

        tags.innerHTML = d.about.industries
          .map(i => `<span class="tag">${i}</span>`)
          .join("");

        at.appendChild(tags);
      }
    }

    const acis = document.querySelectorAll(".aci");

    if (acis[0]) {
      acis[0].innerHTML =
        `📍 Egypt`;
    }

    if (acis[1]) {
      acis[1].innerHTML =
        `📧 ${d.personal.email}`;
    }

    if (acis[2]) {
      acis[2].innerHTML =
        `📞 ${d.personal.phones?.[0] || ""}`;
    }
  }

  // ====================================================
  // SERVICES
  // ====================================================

  if (d.services?.length) {

    htm(
      ".sgrid",
      d.services.map(s => `
        <div class="sc">
          <div class="si2">${s.icon}</div>
          <div class="st">${s.title}</div>
          <div class="sd">${s.description}</div>
        </div>
      `).join("")
    );
  }

  // ====================================================
  // PROCESS
  // ====================================================

  if (d.process?.length) {

    htm(
      ".ptk",
      d.process.map(p => `
        <div class="ps2">
          <div class="snum">${p.step}</div>
          <div class="stit">${p.title}</div>
          <div class="sds">${p.description}</div>
        </div>
      `).join("")
    );
  }

  // ====================================================
  // CASE STUDIES
  // ====================================================

  if (d.caseStudies?.length) {

    window._workData = d.caseStudies;

    htm(
      ".wgrid",
      d.caseStudies.map((w, i) => `
        <div class="wc"
             style="cursor:pointer"
             onclick="openWork(${i})">

          <div class="wct">
            <div class="wl">${w.industry}</div>
            <div class="wtit">${w.client}</div>
          </div>

          <div class="wb">
            <div class="wch">${w.challenge}</div>

            <div class="wrs">
              ${(w.results || [])
                .map(r => `<div class="wri">${r}</div>`)
                .join("")}
            </div>
          </div>

        </div>
      `).join("")
    );

    window.openWork = function (i) {

      const w = window._workData[i];

      if (!w) return;

      const modal = document.getElementById("wmo");

      if (!modal) return;

      const wmd = modal.querySelector(".wmd");

      if (!wmd) return;

      const h3 = wmd.querySelector("h3");

      if (h3) {
        h3.textContent = w.client;
      }

      const label = wmd.querySelector(".wl");

      if (label) {
        label.textContent = w.industry;
      }

      const container = wmd.querySelector(".wmg");

      if (container) {

        container.innerHTML = `
          <div class="wms">
            <h4>Challenge</h4>
            <p>${w.challenge}</p>
          </div>

          <div class="wms">
            <h4>Results</h4>
            <ul>
              ${(w.results || [])
                .map(r => `<li>${r}</li>`)
                .join("")}
            </ul>
          </div>

          ${
            w.strategyFocus?.length
              ? `
                <div class="wms">
                  <h4>Strategy Focus</h4>
                  <ul>
                    ${w.strategyFocus
                      .map(x => `<li>${x}</li>`)
                      .join("")}
                  </ul>
                </div>
              `
              : ""
          }

          ${
            w.contentTypes?.length
              ? `
                <div class="wms">
                  <h4>Content Types</h4>
                  <ul>
                    ${w.contentTypes
                      .map(x => `<li>${x}</li>`)
                      .join("")}
                  </ul>
                </div>
              `
              : ""
          }
        `;
      }

      modal.classList.add("active");
    };
  }

  // ====================================================
  // RESULTS
  // ====================================================

  if (d.results?.length) {

    htm(
      ".rgrid",
      d.results.map(r => `
        <div class="rc">

          <div class="ri">
            ${r.icon}
          </div>

          <div>
            <div class="rn">${r.value}</div>
            <div class="rt">${r.description}</div>
          </div>

        </div>
      `).join("")
    );
  }

  // ====================================================
  // TESTIMONIAL
  // ====================================================

  if (d.testimonials?.length) {

    txt(
      ".tt",
      d.testimonials[0].text
    );

    const tc = $(".tc");

    if (tc) {

      const ps = [...tc.querySelectorAll("p")]
        .filter(p => !p.classList.contains("tt"));

      if (ps.length) {

        ps[ps.length - 1].textContent =
          "— " + d.testimonials[0].client;
      }
    }
  }

  // ====================================================
  // CONTACT
  // ====================================================

  if (d.personal) {

    const links = [

      {
        href: `mailto:${d.personal.email}`,
        icon: "📧",
        label: d.personal.email
      },

      ...(d.personal.whatsapp || []).map(w => ({
        href: w,
        icon: "💬",
        label: "WhatsApp"
      }))
    ];

    const cls = $(".cls");

    if (cls) {

      cls.innerHTML = links.map(link => `
        <a class="cl"
           href="${link.href}"
           target="_blank"
           rel="noopener">
          ${link.icon} ${link.label}
        </a>
      `).join("");
    }

    const cmo = document.getElementById("cmo");

    if (cmo) {

      const md = cmo.querySelector(".md");

      if (md) {

        md.querySelectorAll(".mci")
          .forEach(el => el.remove());

        links.forEach(link => {

          const a = document.createElement("a");

          a.className = "mci";
          a.href = link.href;
          a.target = "_blank";
          a.rel = "noopener";

          a.innerHTML =
            `${link.icon} ${link.label}`;

          md.appendChild(a);
        });
      }
    }
  }

  // ====================================================
  // FOOTER INITIALS
  // ====================================================

  const fn = $(".fn");

  if (fn && d.personal?.name) {

    fn.textContent =
      d.personal.name
        .split(" ")
        .map(x => x[0])
        .join("")
        .toUpperCase();
  }

})();    // Subtitle & description
    txt(".hsub", h.subtitle);
    txt(".hdesc", h.description);
    // Page title
    document.title = `Mariam Saad — ${h.title_line1} ${h.title_line2}`;
  }

  // ══════════════════════════════════════════════════════════════════════
  // 2. STATS BAR  (.stats → .stat > .stn + .stl)
  // ══════════════════════════════════════════════════════════════════════
  if (d.stats?.length) {
    htm(".stats", d.stats.map(s => `
      <div class="stat">
        <div class="stn">${s.number}</div>
        <div class="stl">${s.label}</div>
      </div>`).join(""));
  }

  // ══════════════════════════════════════════════════════════════════════
  // 3. ABOUT — paragraphs + tags + contact card
  // ══════════════════════════════════════════════════════════════════════
  if (d.about) {
    const a = d.about;
    const at = $(".at");
    if (at) {
      // keep h2 + .sl, replace everything else
      const keep = [...at.querySelectorAll("h2, .sl")];
      at.innerHTML = "";
      keep.forEach(el => at.appendChild(el));

      // paragraphs
      (a.paragraphs || []).forEach(text => {
        const p = document.createElement("p");
        p.textContent = text;
        at.appendChild(p);
      });

      // tags
      if (a.tags?.length) {
        const div = document.createElement("div");
        div.className = "tags";
        div.innerHTML = a.tags.map(t => `<span class="tag">${t}</span>`).join("");
        at.appendChild(div);
      }
    }

    // contact card inside .avis
    const ci = a.contact_info || {};
    const svgLoc  = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`;
    const svgMail = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,12 2,6"/></svg>`;
    const svgPhone= `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.22 1.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.91-.91a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>`;

    const acis = document.querySelectorAll(".aci");
    if (acis[0] && ci.location) acis[0].innerHTML = `${svgLoc} ${ci.location}`;
    if (acis[1] && ci.email)    acis[1].innerHTML = `${svgMail} ${ci.email}`;
    if (acis[2] && ci.phone)    acis[2].innerHTML = `${svgPhone} ${ci.phone}`;
  }

  // ══════════════════════════════════════════════════════════════════════
  // 4. SERVICES  (.sgrid)
  // ══════════════════════════════════════════════════════════════════════
  if (d.services?.length) {
    htm(".sgrid", d.services.map(s => `
      <div class="sc">
        <div class="si2">${s.icon}</div>
        <div class="st">${s.title}</div>
        <div class="sd">${s.description}</div>
      </div>`).join(""));
  }

  // ══════════════════════════════════════════════════════════════════════
  // 5. PROCESS  (.ptk)
  // ══════════════════════════════════════════════════════════════════════
  if (d.process?.length) {
    htm(".ptk", d.process.map(p => `
      <div class="ps2">
        <div class="snum">${p.step}</div>
        <div class="stit">${p.title}</div>
        <div class="sds">${p.description}</div>
      </div>`).join(""));
  }

  // ══════════════════════════════════════════════════════════════════════
  // 6. WORK CASES  (.wgrid + modal)
  // ══════════════════════════════════════════════════════════════════════
  if (d.work?.length) {
    window._workData = d.work;

    htm(".wgrid", d.work.map((w, i) => `
      <div class="wc" style="cursor:pointer" onclick="openWork(${i})">
        <div class="wct">
          <div class="wl">${w.label}</div>
          <div class="wtit">${w.title}</div>
        </div>
        <div class="wb">
          <div class="wch">${w.challenge}</div>
          <div class="wrs">
            ${(w.results || []).map(r => `<div class="wri">${r}</div>`).join("")}
          </div>
        </div>
      </div>`).join(""));

    // override openWork to use JSON data
    window.openWork = function (i) {
      const w = window._workData[i];
      if (!w) return;
      const modal = document.getElementById("wmo");
      const wmd   = modal?.querySelector(".wmd");
      if (!wmd) return;
      wmd.querySelector("h3").textContent = w.title;
      const labelEl = wmd.querySelector(".wl");
      if (labelEl) labelEl.textContent = w.label;
      htm(".wmg", `
        <div class="wms">
          <h4>The Challenge</h4>
          <p>${w.challenge}</p>
        </div>
        <div class="wms">
          <h4>Results</h4>
          <ul>${(w.results || []).map(r => `<li>${r}</li>`).join("")}</ul>
        </div>`);
      modal.classList.add("active");
    };
  }

  // ══════════════════════════════════════════════════════════════════════
  // 7. RESULTS  (.rgrid)
  // ══════════════════════════════════════════════════════════════════════
  if (d.results?.length) {
    htm(".rgrid", d.results.map(r => `
      <div class="rc">
        <div class="ri">${r.icon}</div>
        <div>
          <div class="rn">${r.number}</div>
          <div class="rt">${r.label}</div>
        </div>
      </div>`).join(""));
  }

  // ══════════════════════════════════════════════════════════════════════
  // 8. TESTIMONIAL  (.tc)
  // ══════════════════════════════════════════════════════════════════════
  if (d.testimonial) {
    const tc = $(".tc");
    if (tc) {
      txt(".tt", d.testimonial.text);
      // author — last <p> in .tc that's NOT .tt
      const ps = [...tc.querySelectorAll("p")].filter(p => !p.classList.contains("tt"));
      if (ps.length) ps[ps.length - 1].textContent = "— " + d.testimonial.author;
    }
  }

  // ══════════════════════════════════════════════════════════════════════
  // 9. CONTACT LINKS  (.cls + #cmo modal)
  // ══════════════════════════════════════════════════════════════════════
  if (d.contact) {
    const c = d.contact;
    const links = [
      c.email      && { href: `mailto:${c.email}`,                           icon: "📧", label: c.email },
      c.whatsapp   && { href: `https://wa.me/${c.whatsapp.replace(/\D/g,"")}`, icon: "💬", label: "WhatsApp" },
      c.instagram  && { href: c.instagram,  icon: "📸", label: "Instagram" },
      c.facebook   && { href: c.facebook,   icon: "📘", label: "Facebook"  },
      c.linkedin   && { href: c.linkedin,   icon: "💼", label: "LinkedIn"  },
      c.tiktok     && { href: c.tiktok,     icon: "🎵", label: "TikTok"    },
    ].filter(Boolean);

    // Contact section buttons
    const cls = $(".cls");
    if (cls) {
      cls.innerHTML = links.map(x =>
        `<a class="cl" href="${x.href}" target="_blank" rel="noopener">${x.icon} ${x.label}</a>`
      ).join("");
    }

    // Contact modal (#cmo)
    const cmo = document.getElementById("cmo");
    if (cmo) {
      const md = cmo.querySelector(".md");
      if (md) {
        // remove old .mci links, keep h3 + .mh + .mc
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

    // Footer logo initials
    const fn = $(".fn");
    if (fn && d.hero) fn.textContent = (d.hero.name || "MS") + ".";
  }

})();
