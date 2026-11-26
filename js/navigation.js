/* ==========================================================================
   NAVIGATION, KEYBOARD CONTROLS & INTERIOR INTERACTIONS
   ========================================================================== */

window.DepotNavigation = (() => {
  function init() {
    const data = window.PORTFOLIO_DATA;

    // Let's Connect dropdown menu (LinkedIn, Email, Instagram)
    const connectBtn = document.getElementById('nav-lets-connect');
    const connectMenu = document.getElementById('nav-connect-menu');
    const connectEmail = document.getElementById('nav-connect-email');
    const connectLinkedin = document.getElementById('nav-connect-linkedin');
    const connectInstagram = document.getElementById('nav-connect-instagram');

    if (connectEmail && data.profile.email) {
      connectEmail.href = `mailto:${data.profile.email}?subject=${encodeURIComponent('Portfolio Inquiry - Kanthu Naik')}`;
      connectEmail.addEventListener('click', () => {
        closeConnectMenu();
        handleSendEmailFeedback();
      });
    }
    if (connectLinkedin && data.profile.linkedin) connectLinkedin.href = data.profile.linkedin;
    if (connectInstagram && data.profile.instagram) connectInstagram.href = data.profile.instagram;

    function closeConnectMenu() {
      if (!connectBtn || !connectMenu || connectMenu.hidden) return;
      connectMenu.hidden = true;
      connectBtn.setAttribute('aria-expanded', 'false');
    }

    if (connectBtn && connectMenu) {
      connectBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const willOpen = connectMenu.hidden;
        connectMenu.hidden = !willOpen;
        connectBtn.setAttribute('aria-expanded', String(willOpen));
      });

      connectMenu.addEventListener('click', (e) => {
        const item = e.target.closest('.nav-connect-item');
        if (item && item.id !== 'nav-connect-email') {
          closeConnectMenu();
        }
      });

      document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-connect-wrap')) {
          closeConnectMenu();
        }
      });
    }

    // Header navigation links
    document.querySelectorAll('.nav-link').forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.container;
        window.DepotAnimations.activate(target, {
          resetProjectView: target === 'projects'
        });
      });
    });

    // Logo returns to Home
    const logo = document.querySelector('.nav-logo');
    if (logo) {
      logo.addEventListener('click', (e) => {
        e.preventDefault();
        window.DepotAnimations.activate('home');
      });
    }

    // Yard delegation: container triggers & interior interactive buttons
    const yard = document.getElementById('containers-yard');
    if (yard) {
      yard.addEventListener('click', (e) => {
        const trigger = e.target.closest('.container-trigger');
        if (trigger) {
          const anchor = trigger.closest('.container-anchor');
          if (anchor) {
            window.DepotAnimations.activate(anchor.dataset.containerId);
          }
          return;
        }

        const actionBtn = e.target.closest('[data-action]');
        if (!actionBtn) return;

        const action = actionBtn.dataset.action;
        if (action === 'go-container') {
          window.DepotAnimations.activate(actionBtn.dataset.target);
        } else if (action === 'view-project') {
          window.DepotContainers.openProjectDetail(actionBtn.dataset.project);
        } else if (action === 'back-projects') {
          window.DepotContainers.closeProjectDetail();
        } else if (action === 'open-project') {
          window.DepotAnimations.activate('projects', {
            projectId: actionBtn.dataset.project
          });
        } else if (action === 'copy-email') {
          copyEmail();
        } else if (action === 'send-email') {
          handleSendEmailFeedback();
        } else if (action === 'resume') {
          handleResume(e);
        } else if (action === 'pending-repo') {
          window.DepotContainers.showToast('Repository URL placeholder — update verified repo link in js/data.js.');
        } else if (action === 'close-container') {
          window.DepotAnimations.closeActive({ focusTrigger: true });
        }
      });
    }

    // Clicking empty stage background outside containers closes the open container
    const stage = document.getElementById('depot-stage');
    if (stage) {
      stage.addEventListener('click', (e) => {
        if (!window.DepotAnimations.getActiveId()) return;
        if (e.target.closest('.container-3d') || e.target.closest('.depot-toast')) return;
        window.DepotAnimations.closeActive({ focusTrigger: false });
      });
    }

    // Escape closes Let's Connect menu first, otherwise returns to Home (or closes Home)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (connectMenu && !connectMenu.hidden) {
          closeConnectMenu();
          connectBtn.focus();
          return;
        }
        const current = window.DepotAnimations.getActiveId();
        if (current && current !== 'home') {
          window.DepotAnimations.activate('home');
        } else if (current === 'home') {
          window.DepotAnimations.closeActive({ focusTrigger: true });
        }
      }
    });
  }

  function copyEmail() {
    const email = window.PORTFOLIO_DATA.profile.email;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(
        () => window.DepotContainers.showToast(`Copied ${email} to clipboard`),
        () => window.DepotContainers.showToast(`Email: ${email}`)
      );
    } else {
      window.DepotContainers.showToast(`Email: ${email}`);
    }
  }

  function handleSendEmailFeedback() {
    const email = window.PORTFOLIO_DATA.profile.email;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent('Portfolio Inquiry - Kanthu Naik')}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).catch(() => { });
    }
    window.DepotContainers.showToast(
      `Opening mail app for ${email} (copied to clipboard). No mail app? <a href="${gmailUrl}" target="_blank" rel="noopener noreferrer">Open in Gmail ↗</a>`,
      true,
      6000
    );
  }

    async function handleResume() {
      const url = window.PORTFOLIO_DATA.profile.resumeUrl;
          if (!url) {
            window.DepotContainers.showToast('Resume PDF placeholder — add assets/RESUME.pdf and link it in js/data.js.');
            return;
          }

          // On http(s), fetch as a Blob so the browser always triggers a direct file download
          if (window.location.protocol === 'http:' || window.location.protocol === 'https:') {
            try {
              const res = await fetch(url);
              if (!res.ok) throw new Error(`HTTP ${res.status}`);
              const blob = await res.blob();
              const blobUrl = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = blobUrl;
              link.download = 'Kanthu_Naik_Resume.pdf';
              link.style.display = 'none';
              document.body.appendChild(link);
              link.click();
              link.remove();
              setTimeout(() => URL.revokeObjectURL(blobUrl), 2000);
              window.DepotContainers.showToast('Downloading Kanthu_Naik_Resume.pdf...');
              return;
            } catch {
              // Fall through to new-tab fallback
            }
          }

          // Fallback (e.g. file://): open in a new tab with download hint without leaving the portfolio
          const fallback = document.createElement('a');
          fallback.href = url;
          fallback.download = 'Kanthu_Naik_Resume.pdf';
          fallback.target = '_blank';
          fallback.rel = 'noopener noreferrer';
          fallback.style.display = 'none';
          document.body.appendChild(fallback);
          fallback.click();
          fallback.remove();
          window.DepotContainers.showToast('Opened Kanthu_Naik_Resume.pdf');
        }

        return { init };
      }) ();
