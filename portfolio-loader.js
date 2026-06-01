/* ============================================================
   portfolio-loader.js — Injects dynamic data into the DOM
   Runs after the page loads, reads from localStorage via data.js
   ============================================================ */

(function () {
  'use strict';

  function setText(selector, value, html) {
    const el = document.querySelector(selector);
    if (!el || value === undefined || value === null) return;
    if (html) el.innerHTML = value;
    else el.textContent = value;
  }

  function setAttr(selector, attr, value) {
    const el = document.querySelector(selector);
    if (!el || value === undefined) return;
    el.setAttribute(attr, value);
  }

  function applyData(d) {
    /* ---- META ---- */
    document.title = d.meta.pageTitle;
    setText('.nav-logo', d.meta.navLogo);

    /* ---- HERO ---- */
    setText('[data-field="hero-badge"]', d.hero.badgeText);
    setText('[data-field="hero-title1"]', d.hero.titleLine1);
    setText('[data-field="hero-title2"]', d.hero.titleLine2);
    setText('[data-field="hero-subtitle"]', d.hero.subtitle);
    setText('[data-field="hero-desc"]', d.hero.description);
    setText('[data-field="hero-btn1"]', d.hero.btn1Text);
    setText('[data-field="hero-btn2"]', d.hero.btn2Text);
    setText('.pb-num', d.hero.badge1Num);
    setText('.pb-label', d.hero.badge1Label);
    setText('.pb2-num', d.hero.badge2Num);
    setText('.pb2-label', d.hero.badge2Label);

    /* ---- STATS ---- */
    const statNums = document.querySelectorAll('.stn');
    const statLabels = document.querySelectorAll('.stl');
    d.stats.forEach(function (s, i) {
      if (statNums[i]) statNums[i].textContent = s.num;
      if (statLabels[i]) statLabels[i].textContent = s.label;
    });

    /* ---- BRANDS ---- */
    setText('[data-field="brands-label"]', d.brands.sectionLabel);
    setText('[data-field="brands-heading"]', d.brands.heading);
    setText('[data-field="brands-desc"]', d.brands.description);

    /* ---- ABOUT ---- */
    setText('[data-field="about-label"]', d.about.sectionLabel);
    setText('[data-field="about-heading"]', d.about.heading, true);
    const aboutParas = document.querySelectorAll('[data-field="about-para"]');
    d.about.paragraphs.forEach(function (p, i) {
      if (aboutParas[i]) aboutParas[i].textContent = p;
    });

    // Tags
    const tagsContainer = document.querySelector('[data-field="about-tags"]');
    if (tagsContainer) {
      tagsContainer.innerHTML = d.about.tags.map(function (t) {
        return '<span class="tag">' + escHtml(t) + '</span>';
      }).join('');
    }

    // Info card
    setText('[data-field="about-name"]', d.about.infoName);
    setText('[data-field="about-role"]', d.about.infoRole);
    const infoContainer = document.querySelector('[data-field="about-info-items"]');
    if (infoContainer) {
      infoContainer.innerHTML = d.about.infoItems.map(function (item) {
        return '<div class="aci"><span style="font-size:16px">' + escHtml(item.icon) + '</span><span>' + escHtml(item.text) + '</span></div>';
      }).join('');
    }

    /* ---- SERVICES ---- */
    setText('[data-field="services-label"]', d.services.sectionLabel);
    setText('[data-field="services-heading"]', d.services.heading);
    const sgrid = document.querySelector('[data-field="services-grid"]');
    if (sgrid) {
      sgrid.innerHTML = d.services.items.map(function (s) {
        return '<div class="sc"><div class="si2">' + escHtml(s.icon) + '</div><div class="st">' + escHtml(s.title) + '</div><p class="sd">' + escHtml(s.description) + '</p></div>';
      }).join('');
    }

    /* ---- PROCESS ---- */
    setText('[data-field="process-label"]', d.process.sectionLabel);
    setText('[data-field="process-heading"]', d.process.heading);
    const ptk = document.querySelector('[data-field="process-grid"]');
    if (ptk) {
      ptk.innerHTML = d.process.steps.map(function (s) {
        return '<div class="ps2"><div class="snum">' + escHtml(s.num) + '</div><div class="stit">' + escHtml(s.title) + '</div><p class="sds">' + escHtml(s.desc) + '</p></div>';
      }).join('');
    }

    /* ---- WORK ---- */
    setText('[data-field="work-label"]', d.work.sectionLabel);
    setText('[data-field="work-heading"]', d.work.heading);
    const wgrid = document.querySelector('[data-field="work-grid"]');
    if (wgrid) {
      wgrid.innerHTML = d.work.items.map(function (w) {
        var results = w.results.map(function (r) {
          return '<div class="wri">' + escHtml(r) + '</div>';
        }).join('');
        return '<div class="wc"><div class="wct"><div class="wl">' + escHtml(w.category) + '</div><div class="wtit">' + escHtml(w.title) + '</div></div><div class="wb"><p class="wch">' + escHtml(w.challenge) + '</p><div class="wrs">' + results + '</div></div></div>';
      }).join('');
    }

    /* ---- RESULTS ---- */
    setText('[data-field="results-label"]', d.results.sectionLabel);
    setText('[data-field="results-heading"]', d.results.heading);
    const rgrid = document.querySelector('[data-field="results-grid"]');
    if (rgrid) {
      rgrid.innerHTML = d.results.items.map(function (r) {
        return '<div class="rc"><div class="ri">' + escHtml(r.icon) + '</div><div><div class="rn">' + escHtml(r.num) + '</div><div class="rt">' + escHtml(r.text) + '</div></div></div>';
      }).join('');
    }

    /* ---- TESTIMONIAL ---- */
    setText('[data-field="testimonial-quote"]', d.testimonial.quote);
    setText('[data-field="testimonial-author"]', d.testimonial.author);

    /* ---- CONTACT ---- */
    setText('[data-field="contact-label"]', d.contact.sectionLabel);
    setText('[data-field="contact-heading"]', d.contact.heading);
    setText('[data-field="contact-desc"]', d.contact.description);

    // Contact links bar
    const clsContainer = document.querySelector('[data-field="contact-links"]');
    if (clsContainer) {
      var emailSvg = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,12 2,6"/></svg>';
      var waSvg = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>';
      var html = '<a href="mailto:' + escAttr(d.contact.email) + '" class="cl">' + emailSvg + 'Email Me</a>';
      d.contact.whatsapp.forEach(function (wa) {
        html += '<a href="https://wa.me/' + escAttr(wa.number) + '" target="_blank" class="cl">' + waSvg + 'WhatsApp · ' + escHtml(wa.display) + '</a>';
      });
      clsContainer.innerHTML = html;
    }

    /* ---- CONTACT MODAL ---- */
    const cmoModal = document.querySelector('[data-field="contact-modal-items"]');
    if (cmoModal) {
      var mhtml = '<a href="mailto:' + escAttr(d.contact.email) + '" class="mci"><span>📧</span> <span>' + escHtml(d.contact.email) + '</span></a>';
      d.contact.whatsapp.forEach(function (wa) {
        mhtml += '<a href="https://wa.me/' + escAttr(wa.number) + '" target="_blank" class="mci"><span>📱</span> WhatsApp · ' + escHtml(wa.display) + '</a>';
      });
      cmoModal.innerHTML = mhtml;
    }

    /* ---- WORK MODAL ---- */
    setText('[data-field="wmodal-title"]', d.workModal.title);
    setText('[data-field="wmodal-desc"]', d.workModal.description);
    setText('[data-field="wmodal-challenge"]', d.workModal.challenge);

    const wmsStrategy = document.querySelector('[data-field="wmodal-strategy"]');
    if (wmsStrategy) {
      wmsStrategy.innerHTML = '<ul>' + d.workModal.strategyItems.map(function (i) { return '<li>' + escHtml(i) + '</li>'; }).join('') + '</ul>';
    }
    const wmsContent = document.querySelector('[data-field="wmodal-content"]');
    if (wmsContent) {
      wmsContent.innerHTML = '<ul>' + d.workModal.contentItems.map(function (i) { return '<li>' + escHtml(i) + '</li>'; }).join('') + '</ul>';
    }
    const wmsResults = document.querySelector('[data-field="wmodal-results"]');
    if (wmsResults) {
      wmsResults.innerHTML = '<ul>' + d.workModal.resultsItems.map(function (i) { return '<li>' + escHtml(i) + '</li>'; }).join('') + '</ul>';
    }
    const wmsTypes = document.querySelector('[data-field="wmodal-types"]');
    if (wmsTypes) {
      wmsTypes.innerHTML = d.workModal.contentTypes.map(function (t) { return '<span class="tag">' + escHtml(t) + '</span>'; }).join('');
    }

    /* ---- FOOTER ---- */
    setText('[data-field="footer-name"]', d.footer.name);
    setText('[data-field="footer-copy"]', d.footer.copy);
  }

  function escHtml(str) {
    if (typeof str !== 'string') return String(str || '');
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function escAttr(str) {
    if (typeof str !== 'string') return String(str || '');
    return str.replace(/"/g, '&quot;');
  }

  // Run
  try {
    var data = loadData();
    applyData(data);
  } catch (e) {
    console.warn('Portfolio loader error:', e);
  }
})();
