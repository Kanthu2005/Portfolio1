/* ==========================================================================
   3D SHIPPING CONTAINERS BUILDER, LAYOUT ENGINE & SECTION RENDERERS
   ========================================================================== */

window.DepotContainers = (() => {
  const data = window.PORTFOLIO_DATA;
  const instances = new Map();
  let selectedProjectId = null;

  const ICONS = {
    github: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a2.998 2.998 0 0 0-2.112-2.12C19.524 3.56 12 3.56 12 3.56s-7.524 0-9.386.506a2.998 2.998 0 0 0-2.112 2.12C0 8.055 0 12 0 12s0 3.945.502 5.814a2.998 2.998 0 0 0 2.112 2.12c1.862.506 9.386.506 9.386.506s7.524 0 9.386-.506a2.998 2.998 0 0 0 2.112-2.12C24 15.945 24 12 24 12s0-3.945-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
    code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    coffee: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/></svg>',
    bolt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    plug: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z"/></svg>',
    atom: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="2"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(45 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-45 12 12)"/></svg>',
    db: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/></svg>',
    leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>',
    layers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
    spark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
    terminal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>',
    cpu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/></svg>',
    branch: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>',
    box: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>',
    flow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="5" cy="12" r="3"/><circle cx="19" cy="6" r="3"/><circle cx="19" cy="18" r="3"/><path d="M8 12h4l4-6M12 12l4 6"/></svg>'
  };

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function showToast(msg, html = false, duration = 3200) {
    const toast = document.getElementById('depot-toast');
    if (!toast) return;
    if (html) toast.innerHTML = msg;
    else toast.textContent = msg;
    toast.hidden = false;
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(() => {
      toast.hidden = true;
    }, duration);
  }

  /* ========================================================================
     SECTION CONTENT RENDERERS
     ======================================================================== */
  function renderSectionHTML(id) {
    switch (id) {
      case 'home':
        return `
          <span class="section-kicker">01 / WELCOME TO MY DEPOT</span>
          <h2 class="section-heading" tabindex="-1">Building <span class="serif-accent">ideas.</span><br />One line of code at a time.</h2>
          <p class="section-lead"><strong>Hi, I'm ${escapeHtml(data.profile.name)}.</strong></p>
          <p class="section-lead">I'm a Software Developer and AI &amp; Automation Enthusiast who enjoys transforming ideas into practical digital products. I build backend systems, modern web applications and intelligent AI-powered solutions.</p>
          <p class="section-copy">From developing full-stack applications to experimenting with LLMs, RAG and automation, I'm always exploring ways to build something useful.</p>
          <div class="pill-row">
            <span class="role-pill">Software Developer</span>
            <span class="role-pill">Python Developer</span>
            <span class="role-pill">AI &amp; Automation Enthusiast</span>
          </div>
          <div class="btn-row">
            <button type="button" class="btn-primary" data-action="go-container" data-target="projects">Explore My Projects →</button>
            <button type="button" class="btn-secondary" data-action="resume">Download Resume</button>
            <a class="social-icon-link" href="${data.profile.github}" target="_blank" rel="noopener noreferrer" aria-label="Kanthu Naik on GitHub">${ICONS.github}</a>
            <a class="social-icon-link" href="${data.profile.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="Kanthu Naik on LinkedIn">${ICONS.linkedin}</a>
          </div>
        `;

      case 'projects':
        return renderProjectsBody();

      case 'about':
        return `
          <span class="section-kicker">03 / WHO I AM</span>
          <h2 class="section-heading" tabindex="-1">A little <span class="serif-accent">about</span> me.</h2>
          <div class="about-layout">
            <div class="about-portrait-card">
              <img class="about-portrait-img" src="assets/profile.jpg" alt="Portrait of Kanthu Naik" />
              <div class="about-portrait-caption">Kanthu Naik · Hyderabad</div>
            </div>
            <div>
              <p class="section-lead">I'm an Information Technology graduate from VJIT Hyderabad with a strong interest in software engineering, backend development and artificial intelligence.</p>
              <p class="section-copy">I enjoy understanding how things work, solving technical problems and building applications that combine clean architecture with practical functionality.</p>
              <p class="section-copy">I believe in continuous learning, experimenting with new technologies and turning ideas into working products.</p>
              <div class="pill-row">
                <span class="role-pill">Information Technology Graduate</span>
                <span class="role-pill">Software Development</span>
                <span class="role-pill">Backend Engineering</span>
                <span class="role-pill">Artificial Intelligence</span>
                <span class="role-pill">Automation</span>
                <span class="role-pill">Problem Solving</span>
              </div>
            </div>
          </div>
        `;

      case 'skills':
        return `
          <span class="section-kicker">04 / MY TOOLKIT</span>
          <h2 class="section-heading" tabindex="-1">Tools behind the <span class="serif-accent">ideas.</span></h2>
          <div class="skills-groups">
            ${data.skills
            .map(
              (grp) => `
              <div class="skill-group">
                <h3 class="skill-group-title">${escapeHtml(grp.group)}</h3>
                <div class="skill-chips">
                  ${grp.items
                  .map(
                    (item) => `
                    <span class="skill-chip">
                      ${ICONS[item.icon] || ICONS.code}
                      <span>${escapeHtml(item.name)}</span>
                    </span>
                  `
                  )
                  .join('')}
                </div>
              </div>
            `
            )
            .join('')}
          </div>
        `;

      case 'education':
        return `
          <span class="section-kicker">05 / MY JOURNEY</span>
          <h2 class="section-heading" tabindex="-1">Learning <span class="serif-accent">never</span> stops.</h2>
          <div class="edu-timeline">
            ${data.education
            .map(
              (edu) => `
              <article class="edu-item">
                <div class="edu-period">${escapeHtml(edu.period)}</div>
                <h3 class="edu-degree">${escapeHtml(edu.degree)}</h3>
                <p class="edu-school">${escapeHtml(edu.school)}</p>
                <span class="edu-score">${escapeHtml(edu.score)}</span>
              </article>
            `
            )
            .join('')}
          </div>
          <h3 class="skill-group-title">Certifications</h3>
          <div class="certs-grid">
            ${data.certifications
            .map(
              (cert) => `
              <div class="cert-card">
                <div class="cert-title">${escapeHtml(cert.title)}</div>
                <div class="cert-issuer">${escapeHtml(cert.issuer)}</div>
              </div>
            `
            )
            .join('')}
          </div>
        `;

      case 'experience':
        return `
          <span class="section-kicker">06 / MY CAPABILITIES</span>
          <h2 class="section-heading" tabindex="-1">Ideas into <span class="serif-accent">reality.</span></h2>
          <div class="capabilities-grid">
            ${data.capabilities
            .map(
              (cap) => `
              <article class="cap-card">
                <div class="cap-num">${escapeHtml(cap.num)}</div>
                <h3 class="cap-title">${escapeHtml(cap.title)}</h3>
                <p class="cap-desc">${escapeHtml(cap.desc)}</p>
                <div class="project-card-actions">
                  <button type="button" class="btn-xs" data-action="open-project" data-project="${escapeHtml(cap.projectId)}">See ${escapeHtml(cap.projectLabel)} ↗</button>
                </div>
              </article>
            `
            )
            .join('')}
          </div>
          <p class="section-copy">Core stack: Python, Java, FastAPI, React.js, PostgreSQL, MongoDB, Redis, LLMs, RAG, Docker &amp; n8n.</p>
        `;

      case 'contact': {
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(data.profile.email)}&su=${encodeURIComponent('Portfolio Inquiry - Kanthu Naik')}`;
        return `
          <span class="section-kicker">07 / LET'S CONNECT</span>
          <h2 class="section-heading" tabindex="-1">Got an <span class="serif-accent">idea?</span> Let's build it.</h2>
          <p class="section-lead">Have an interesting project, a development opportunity or an idea you'd like to discuss? I'd love to connect.</p>
          <div class="contact-grid">
            <div class="contact-card">
              <div class="contact-label">Name</div>
              <div class="contact-val">${escapeHtml(data.profile.name)}</div>
              <div class="contact-note">${escapeHtml(data.profile.qualification)}</div>
              <div class="contact-note">${escapeHtml(data.profile.college)}</div>
            </div>
            <div class="contact-card">
              <div class="contact-label">Location</div>
              <div class="contact-val">${escapeHtml(data.profile.location)}</div>
              <div class="contact-note">${escapeHtml(data.profile.pinCode)}</div>
            </div>
            <div class="contact-card" style="grid-column: 1 / -1;">
              <div class="contact-label">Email</div>
              <div class="contact-email-row">
                <span class="contact-email-val">
                  <span class="contact-val" style="margin-top: 0;">${escapeHtml(data.profile.email)}</span>
                  <button type="button" class="copy-emoji-btn" data-action="copy-email" aria-label="Copy email address" title="Copy email">📋</button>
                </span>
                <a class="contact-gmail-link" href="${gmailUrl}" target="_blank" rel="noopener noreferrer">Open in Gmail ↗</a>
              </div>
              ${data.profile.emailIsPlaceholder ? '<div class="contact-note">Placeholder email — update in js/data.js with confirmed address</div>' : ''}
            </div>
          </div>
          <div class="btn-row">
            <a class="btn-secondary" href="${data.profile.linkedin}" target="_blank" rel="noopener noreferrer">${ICONS.linkedin} LinkedIn</a>
            <a class="btn-secondary" href="${data.profile.github}" target="_blank" rel="noopener noreferrer">${ICONS.github} GitHub</a>
            <a class="btn-secondary" href="${data.profile.instagram}" target="_blank" rel="noopener noreferrer">${ICONS.instagram} Instagram</a>
            <a class="btn-secondary" href="${data.profile.youtube}" target="_blank" rel="noopener noreferrer">${ICONS.youtube} YouTube</a>
          </div>
        `;
      }

      default:
        return '';
    }
  }

  function renderProjectsBody() {
    if (selectedProjectId) {
      const project = data.projects.find((p) => p.id === selectedProjectId);
      if (project) {
        return `
          <div class="project-detail-view">
            <div class="btn-row" style="margin-top: 0; justify-content: space-between; padding-right: 36px;">
              <button type="button" class="btn-xs" data-action="back-projects">← All Projects</button>
              <span class="section-kicker" style="margin: 0; padding-right: 0;">${escapeHtml(project.code)}</span>
            </div>
            <h2 class="section-heading" tabindex="-1" style="margin-bottom: 2px;">${escapeHtml(project.name)} — <span class="serif-accent">${escapeHtml(project.subtitle)}</span></h2>
            <img class="project-detail-banner" src="${escapeHtml(project.image)}" alt="${escapeHtml(project.name)} preview" />
            <p class="section-lead" style="margin-bottom: 4px;">${escapeHtml(project.description)}</p>
            <div>
              <h3 class="skill-group-title" style="margin-bottom: 6px;">Key Features</h3>
              <ul class="feature-list">
                ${project.features.map((f) => `<li>${escapeHtml(f)}</li>`).join('')}
              </ul>
            </div>
            <div>
              <h3 class="skill-group-title" style="margin-bottom: 6px;">Technology Stack</h3>
              <div class="tech-mini-row">
                ${project.tech.map((t) => `<span class="tech-mini">${escapeHtml(t)}</span>`).join('')}
              </div>
            </div>
            <div class="btn-row">
              ${project.github
            ? `<a class="btn-primary" href="${escapeHtml(project.github)}" target="_blank" rel="noopener noreferrer">${ICONS.github} View GitHub ↗</a>`
            : `<button type="button" class="btn-secondary is-pending" data-action="pending-repo">GitHub Repo (Placeholder Pending)</button>`
          }
              ${project.live
            ? `<a class="btn-secondary" href="${escapeHtml(project.live)}" target="_blank" rel="noopener noreferrer">Live Demo ↗</a>`
            : ''
          }
            </div>
          </div>
        `;
      }
    }

    return `
      <span class="section-kicker">02 / SELECTED PROJECTS</span>
      <h2 class="section-heading" tabindex="-1">Things I've <span class="serif-accent">built.</span></h2>
      <div class="projects-grid">
        ${data.projects
        .map(
          (proj) => `
          <article class="project-card">
            <img class="project-thumb" src="${escapeHtml(proj.image)}" alt="${escapeHtml(proj.name)} preview" loading="lazy" />
            <div class="project-card-body">
              <div class="project-code">${escapeHtml(proj.code)}</div>
              <h3 class="project-title">${escapeHtml(proj.name)}</h3>
              <p class="project-sub">${escapeHtml(proj.subtitle)}</p>
              <div class="tech-mini-row">
                ${proj.tech.slice(0, 4).map((t) => `<span class="tech-mini">${escapeHtml(t)}</span>`).join('')}
              </div>
              <div class="project-card-actions">
                <button type="button" class="btn-xs is-primary" data-action="view-project" data-project="${escapeHtml(proj.id)}">View Project</button>
                ${proj.github
              ? `<a class="btn-xs" href="${escapeHtml(proj.github)}" target="_blank" rel="noopener noreferrer">GitHub ↗</a>`
              : `<button type="button" class="btn-xs is-pending" data-action="pending-repo">Repo Pending</button>`
            }
                ${proj.live
              ? `<a class="btn-xs" href="${escapeHtml(proj.live)}" target="_blank" rel="noopener noreferrer">Live ↗</a>`
              : ''
            }
              </div>
            </div>
          </article>
        `
        )
        .join('')}
      </div>
    `;
  }

  /* ========================================================================
     DOM CREATION FOR 7 REAL 3D CUBOIDS
     ======================================================================== */
  function buildAll(yardEl) {
    yardEl.innerHTML = '';
    instances.clear();

    data.containers.forEach((cfg) => {
      const anchor = document.createElement('div');
      anchor.className = 'container-anchor';
      anchor.dataset.containerId = cfg.id;
      anchor.style.setProperty('--c-base', cfg.color);
      anchor.style.setProperty('--c-dark', cfg.dark);
      anchor.style.setProperty('--c-accent', cfg.accent);
      anchor.style.zIndex = String(cfg.desktopSlot.z);

      anchor.innerHTML = `
        <div class="container-3d">
          <button type="button" class="container-trigger" aria-label="${escapeHtml(cfg.ariaLabel)}" aria-expanded="false"></button>

          <div class="c-face face-back c-ribbed-v"></div>
          <div class="c-face face-left c-ribbed-v"></div>
          <div class="c-face face-right c-ribbed-v"></div>
          <div class="c-face face-top c-ribbed-top"></div>
          <div class="c-face face-bottom"></div>

          <div class="interior-cavity" aria-hidden="true">
            <div class="cavity-wall cavity-back"></div>
            <div class="cavity-wall cavity-top"></div>
            <div class="cavity-wall cavity-bottom"></div>
            <div class="cavity-wall cavity-left"></div>
            <div class="cavity-wall cavity-right"></div>
          </div>

          <section class="container-interior" aria-label="${escapeHtml(cfg.navLabel)} section" inert>
            <button type="button" class="interior-close-btn" data-action="close-container" aria-label="Close ${escapeHtml(cfg.navLabel)} container" title="Close container">✕</button>
            <div class="interior-scroll">
              ${renderSectionHTML(cfg.id)}
            </div>
          </section>

          <div class="face-front-frame" aria-hidden="true"></div>

          <div class="container-doors" aria-hidden="true">
            <div class="c-door door-left">
              <div class="door-outer c-ribbed-v">
                <span class="door-tag">${escapeHtml(cfg.tag)}</span>
                <div class="door-hinges"><span class="door-hinge"></span><span class="door-hinge"></span><span class="door-hinge"></span></div>
                <span class="door-lock-bar"></span>
                <div class="door-label-wrap">
                  <span class="door-label-line">${escapeHtml(cfg.labelLines[0])}</span>
                  <span class="door-label-line">${escapeHtml(cfg.labelLines[1])}</span>
                </div>
              </div>
              <div class="door-inner"></div>
            </div>
            <div class="c-door door-right">
              <div class="door-outer c-ribbed-v">
                <div class="door-hinges"><span class="door-hinge"></span><span class="door-hinge"></span><span class="door-hinge"></span></div>
                <span class="door-lock-bar"></span>
                <div class="door-label-wrap">
                  <span class="door-label-line">${escapeHtml(cfg.labelLines[0])}</span>
                  <span class="door-label-line">${escapeHtml(cfg.labelLines[1])}</span>
                </div>
              </div>
              <div class="door-inner"></div>
            </div>
          </div>
        </div>
      `;

      yardEl.appendChild(anchor);

      const trigger = anchor.querySelector('.container-trigger');
      const interior = anchor.querySelector('.container-interior');
      const scrollBox = anchor.querySelector('.interior-scroll');

      instances.set(cfg.id, {
        id: cfg.id,
        cfg,
        anchor,
        trigger,
        interior,
        scrollBox,
        slotMetrics: null
      });
    });

    computeLayout();
  }

  /* ========================================================================
     RESPONSIVE PILE & LIFTED CENTER GEOMETRY
     ======================================================================== */
  function getStageRect() {
    const stage = document.getElementById('depot-stage');
    return stage ? stage.getBoundingClientRect() : { width: window.innerWidth, height: window.innerHeight - 72 };
  }

  function computeLayout() {
    const { width: stageW, height: stageH } = getStageRect();
    const isMobile = stageW <= 640;
    const isTablet = stageW > 640 && stageW <= 1024;
    const sidePad = isMobile ? 14 : isTablet ? 28 : 48;

    const widthScale = isMobile
      ? Math.min(1, (stageW - sidePad * 2) / 360)
      : isTablet
        ? Math.min(0.84, stageW / 1080)
        : Math.min(1, Math.max(0.78, stageW / 1400));

    // Opened (lifted & enlarged) dimensions
    const openW = isMobile
      ? Math.min(Math.round(146 * 2.4), Math.max(260, stageW - sidePad * 2 - 8))
      : Math.min(Math.round(308 * 1.95), Math.max(460, stageW - sidePad * 2));
    const openH = isMobile
      ? Math.min(Math.max(268, Math.round(stageH * 0.46)), 348)
      : Math.min(Math.max(310, Math.round(stageH * 0.43)), 372);
    const openD = isMobile ? Math.round(openW * 0.44) : Math.round(openW * 0.4);

    // Lifted center position (leaves space at top for carriage + grip head + chrome rod)
    const minCenterY = 90 + openH / 2;
    const openX = Math.round(stageW / 2);
    const openY = Math.round(Math.max(minCenterY, Math.min(stageH * 0.39, stageH - openH / 2 - 44)));

    instances.forEach((inst) => {
      const slot = isMobile ? inst.cfg.mobileSlot : inst.cfg.desktopSlot;
      let w = Math.round(slot.w * widthScale);
      if (isMobile) w = Math.min(170, Math.max(114, w));
      else w = Math.min(310, Math.max(185, w));

      const h = Math.round(w * (isMobile ? 0.6 : 0.43));
      const d = Math.round(w * (isMobile ? 0.56 : 0.4));

      const rawX = stageW * slot.xPct;
      const clampedX = Math.round(Math.max(sidePad + w / 2, Math.min(stageW - sidePad - w / 2, rawX)));
      const minY = isMobile ? stageH * 0.56 : stageH * 0.54;
      const maxY = stageH - h / 2 - (isMobile ? 16 : 36);
      const clampedY = Math.round(Math.max(minY, Math.min(maxY, stageH * slot.yPct)));

      inst.slotMetrics = {
        x: clampedX,
        y: clampedY,
        w,
        h,
        d,
        rx: slot.rx,
        ry: slot.ry,
        rz: slot.rz,
        z: slot.z
      };

      inst.openMetrics = {
        x: openX,
        y: openY,
        w: openW,
        h: openH,
        d: openD,
        rx: -7,
        ry: -11,
        rz: 0
      };

      // Apply current geometry (either resting in pile or currently active)
      if (!inst.anchor.classList.contains('is-active')) {
        applyMetrics(inst, inst.slotMetrics);
        inst.anchor.style.zIndex = String(inst.slotMetrics.z);
      } else {
        applyMetrics(inst, inst.openMetrics);
      }
    });
  }

  function applyMetrics(inst, m) {
    const s = inst.anchor.style;
    s.setProperty('--pos-x', `${m.x}px`);
    s.setProperty('--pos-y', `${m.y}px`);
    s.setProperty('--c-w', `${m.w}px`);
    s.setProperty('--c-h', `${m.h}px`);
    s.setProperty('--c-d', `${m.d}px`);
    s.setProperty('--rx', `${m.rx}deg`);
    s.setProperty('--ry', `${m.ry}deg`);
    s.setProperty('--rz', `${m.rz}deg`);
  }

  function setDoors(inst, open) {
    const s = inst.anchor.style;
    s.setProperty('--door-left', open ? '-122deg' : '0deg');
    s.setProperty('--door-right', open ? '122deg' : '0deg');
  }

  function openProjectDetail(projectId) {
    selectedProjectId = projectId;
    const projInst = instances.get('projects');
    if (projInst) {
      projInst.scrollBox.innerHTML = renderProjectsBody();
      projInst.scrollBox.scrollTop = 0;
      const h = projInst.scrollBox.querySelector('.section-heading');
      if (h) h.focus({ preventScroll: true });
    }
  }

  function closeProjectDetail() {
    selectedProjectId = null;
    const projInst = instances.get('projects');
    if (projInst) {
      projInst.scrollBox.innerHTML = renderProjectsBody();
      projInst.scrollBox.scrollTop = 0;
      const h = projInst.scrollBox.querySelector('.section-heading');
      if (h) h.focus({ preventScroll: true });
    }
  }

  return {
    buildAll,
    computeLayout,
    applyMetrics,
    setDoors,
    openProjectDetail,
    closeProjectDetail,
    showToast,
    get(id) {
      return instances.get(id);
    },
    all() {
      return Array.from(instances.values());
    }
  };
})();
