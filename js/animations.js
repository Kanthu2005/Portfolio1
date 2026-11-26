/* ==========================================================================
   CRANE INTERACTION ANIMATION ENGINE & QUEUE MANAGER
   ========================================================================== */

window.DepotAnimations = (() => {
  let activeId = null;
  let isAnimating = false;
  let queuedRequest = null;
  let resizePending = false;

  const prefersReducedMotion = () =>
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  function announce(message) {
    const announcer = document.getElementById('depot-announcer');
    if (announcer) {
      announcer.textContent = message;
    }
  }

  function updateNavHighlight(id) {
    document.querySelectorAll('.nav-link').forEach((btn) => {
      const match = btn.dataset.container === id;
      btn.classList.toggle('is-active', match);
      if (match) btn.setAttribute('aria-current', 'page');
      else btn.removeAttribute('aria-current');
    });
  }

  function focusSectionHeading(inst) {
    if (!inst) return;
    const heading = inst.scrollBox.querySelector('.section-heading');
    if (heading) {
      heading.focus({ preventScroll: true });
    }
  }

  function resetClosedState(inst) {
    inst.anchor.classList.remove('is-active', 'is-open', 'is-revealed', 'is-animating');
    inst.interior.inert = true;
    inst.trigger.tabIndex = 0;
    inst.trigger.setAttribute('aria-expanded', 'false');
    window.DepotContainers.setDoors(inst, false);
    window.DepotContainers.applyMetrics(inst, inst.slotMetrics);
    inst.anchor.style.zIndex = String(inst.slotMetrics.z);
  }

  async function releaseContainer(prev) {
    if (!prev) return;
    prev.anchor.classList.remove('is-revealed');
    prev.interior.inert = true;
    prev.trigger.setAttribute('aria-expanded', 'false');

    // Close doors first
    prev.anchor.style.setProperty('--door-dur', '250ms');
    window.DepotContainers.setDoors(prev, false);
    await wait(240);

    // Lower and shrink back to its pile slot while crane follows it down
    prev.anchor.style.setProperty('--move-dur', '360ms');
    prev.anchor.classList.add('is-animating');
    window.DepotContainers.applyMetrics(prev, prev.slotMetrics);
    window.DepotCrane.moveToMetrics(prev.slotMetrics, 360, true);
    await wait(370);

    // Open claw fingers to release container
    window.DepotCrane.setFingersOpen(true);
    window.DepotCrane.moveToMetrics(prev.slotMetrics, 140, false);
    await wait(150);

    prev.anchor.classList.remove('is-active', 'is-open', 'is-animating');
    prev.trigger.tabIndex = 0;
    prev.anchor.style.zIndex = String(prev.slotMetrics.z);
  }

  function snapToOpen(inst, options = {}) {
    if (activeId && activeId !== inst.id) {
      const prev = window.DepotContainers.get(activeId);
      if (prev) resetClosedState(prev);
    }

    activeId = inst.id;
    updateNavHighlight(inst.id);

    inst.anchor.classList.add('is-active', 'is-open', 'is-revealed');
    inst.anchor.classList.remove('is-animating');
    window.DepotContainers.applyMetrics(inst, inst.openMetrics);
    window.DepotContainers.setDoors(inst, true);
    inst.interior.inert = false;
    inst.trigger.tabIndex = -1;
    inst.trigger.setAttribute('aria-expanded', 'true');

    window.DepotCrane.setMoving(false);
    window.DepotCrane.setFingersOpen(false);
    window.DepotCrane.moveToMetrics(inst.openMetrics, 0, true);

    if (options.projectId && inst.id === 'projects') {
      window.DepotContainers.openProjectDetail(options.projectId);
    } else if (inst.id === 'projects' && options.resetProjectView) {
      window.DepotContainers.closeProjectDetail();
    }

    if (options.focus !== false) {
      focusSectionHeading(inst);
    }
    announce(`${inst.cfg.navLabel} container opened`);
  }

  async function runSequence(id, options = {}) {
    const next = window.DepotContainers.get(id);
    if (!next) return;

    if (prefersReducedMotion()) {
      snapToOpen(next, options);
      return;
    }

    isAnimating = true;
    window.DepotCrane.setBusy(true);

    try {
      // STEP 1: Release the currently opened container
      if (activeId && activeId !== id) {
        const prev = window.DepotContainers.get(activeId);
        await releaseContainer(prev);
      }

      // STEP 2: Travel horizontally along rail to selected container
      window.DepotCrane.setFingersOpen(true);
      window.DepotCrane.travelToX(next.slotMetrics.x, next.slotMetrics.w, 290);
      await wait(300);

      // STEP 3: Lower claw onto selected container
      window.DepotCrane.moveToMetrics(next.slotMetrics, 230, false);
      await wait(240);

      // STEP 4: Grip container with mechanical bounce
      window.DepotCrane.setFingersOpen(false);
      window.DepotCrane.moveToMetrics(next.slotMetrics, 150, true);
      window.DepotCrane.bounce();
      await wait(170);

      // Prepare projects sub-view before reveal if requested
      if (next.id === 'projects') {
        if (options.projectId) {
          window.DepotContainers.openProjectDetail(options.projectId);
        } else if (options.resetProjectView) {
          window.DepotContainers.closeProjectDetail();
        }
      }

      // STEP 5: Lift to center stage, straighten, and enlarge real dimensions
      activeId = next.id;
      updateNavHighlight(next.id);

      next.anchor.classList.add('is-active', 'is-animating');
      next.anchor.style.setProperty('--move-dur', '430ms');
      window.DepotContainers.applyMetrics(next, next.openMetrics);
      window.DepotCrane.moveToMetrics(next.openMetrics, 430, true);
      await wait(445);

      // STEP 6: Swing double doors open (-122deg / +122deg)
      next.anchor.classList.add('is-open');
      next.anchor.style.setProperty('--door-dur', '350ms');
      window.DepotContainers.setDoors(next, true);
      await wait(330);

      // STEP 7: Reveal interior content & move keyboard focus to heading
      next.anchor.classList.remove('is-animating');
      next.anchor.classList.add('is-revealed');
      next.interior.inert = false;
      next.trigger.tabIndex = -1;
      next.trigger.setAttribute('aria-expanded', 'true');
      next.scrollBox.scrollTop = 0;

      if (options.focus !== false) {
        focusSectionHeading(next);
      }
      announce(`${next.cfg.navLabel} container opened`);
    } finally {
      isAnimating = false;
      window.DepotCrane.setBusy(false);

      if (resizePending) {
        resizePending = false;
        syncAfterResize();
      }

      if (queuedRequest) {
        const nextReq = queuedRequest;
        queuedRequest = null;
        if (nextReq.type === 'close') {
          closeActive(nextReq.options);
        } else {
          activate(nextReq.id, nextReq.options);
        }
      }
    }
  }

  async function runCloseSequence(options = {}) {
    if (!activeId) return;
    const prev = window.DepotContainers.get(activeId);
    if (!prev) {
      activeId = null;
      return;
    }

    if (prefersReducedMotion()) {
      resetClosedState(prev);
      activeId = null;
      updateNavHighlight(null);
      window.DepotCrane.setMoving(false);
      window.DepotCrane.setFingersOpen(true);
      window.DepotCrane.travelToX(prev.slotMetrics.x, prev.slotMetrics.w, 0);
      if (options.focusTrigger) prev.trigger.focus({ preventScroll: true });
      announce(`${prev.cfg.navLabel} container closed`);
      return;
    }

    isAnimating = true;
    window.DepotCrane.setBusy(true);

    try {
      await releaseContainer(prev);
      activeId = null;
      updateNavHighlight(null);

      // Retract crane slightly above the pile so all 7 containers are clear
      window.DepotCrane.travelToX(prev.slotMetrics.x, prev.slotMetrics.w, 280);
      await wait(290);

      if (options.focusTrigger) {
        prev.trigger.focus({ preventScroll: true });
      }
      announce(`${prev.cfg.navLabel} container closed`);
    } finally {
      isAnimating = false;
      window.DepotCrane.setBusy(false);

      if (resizePending) {
        resizePending = false;
        syncAfterResize();
      }

      if (queuedRequest) {
        const nextReq = queuedRequest;
        queuedRequest = null;
        if (nextReq.type === 'close') {
          closeActive(nextReq.options);
        } else {
          activate(nextReq.id, nextReq.options);
        }
      }
    }
  }

  function closeActive(options = {}) {
    if (!activeId && !isAnimating) return;

    if (isAnimating) {
      queuedRequest = { type: 'close', options };
      return;
    }

    runCloseSequence(options);
  }

  function activate(id, options = {}) {
    if (!window.DepotContainers.get(id)) return;

    // Ignore redundant click on already open container unless requesting a specific project view
    if (!isAnimating && activeId === id && !options.projectId && !options.force) {
      return;
    }

    if (isAnimating) {
      // Keep only the latest requested action in queue
      queuedRequest = { type: 'open', id, options };
      return;
    }

    runSequence(id, options);
  }

  function syncAfterResize() {
    if (isAnimating) {
      resizePending = true;
      return;
    }
    if (!activeId) {
      window.DepotCrane.parkHome();
      return;
    }
    const inst = window.DepotContainers.get(activeId);
    if (!inst) return;
    inst.anchor.classList.remove('is-animating');
    window.DepotContainers.applyMetrics(inst, inst.openMetrics);
    window.DepotCrane.setMoving(false);
    window.DepotCrane.moveToMetrics(inst.openMetrics, 0, true);
  }

  return {
    activate,
    closeActive,
    syncAfterResize,
    getActiveId() {
      return activeId;
    },
    isBusy() {
      return isAnimating;
    }
  };
})();
