/* ==========================================================================
   ROBOTIC CARGO CRANE POSITIONING & MECHANICAL CONTROLS
   ========================================================================== */

window.DepotCrane = (() => {
  const craneEl = () => document.getElementById('crane-system');

  function computeRodLength(y, h) {
    // Assembly starts at top 2px; carriage = 34px; grip head = 34px
    const containerTop = y - h / 2;
    return Math.max(12, Math.round(containerTop - 70));
  }

  function setMotionDuration(ms) {
    const el = craneEl();
    if (!el) return;
    el.style.setProperty('--crane-dur', `${ms}ms`);
  }

  function setMoving(active) {
    const el = craneEl();
    if (!el) return;
    el.classList.toggle('is-moving', active);
  }

  function setBusy(busy) {
    const el = craneEl();
    if (!el) return;
    el.classList.toggle('is-busy', busy);
  }

  function setFingersOpen(open) {
    const el = craneEl();
    if (!el) return;
    el.style.setProperty('--finger-angle', open ? '16deg' : '0deg');
  }

  function moveTo(x, rodLen, clawSpan, durationMs = 420) {
    const el = craneEl();
    if (!el) return;
    setMotionDuration(durationMs);
    setMoving(durationMs > 0);
    el.style.setProperty('--crane-x', `${Math.round(x)}px`);
    el.style.setProperty('--rod-len', `${Math.max(12, Math.round(rodLen))}px`);
    el.style.setProperty('--claw-span', `${Math.round(clawSpan)}px`);
  }

  function moveToMetrics(metrics, durationMs = 420, gripped = true) {
    const rodLen = computeRodLength(metrics.y, metrics.h);
    const span = gripped ? metrics.w : metrics.w + 18;
    moveTo(metrics.x, rodLen, span, durationMs);
  }

  function travelToX(x, targetWidth, durationMs = 380) {
    const rodLen = 36;
    moveTo(x, rodLen, targetWidth + 18, durationMs);
  }

  function parkHome() {
    const stage = document.getElementById('depot-stage');
    const stageW = stage ? stage.clientWidth : window.innerWidth;
    setFingersOpen(true);
    moveTo(stageW / 2, 34, 220, 0);
  }

  function bounce() {
    const el = craneEl();
    if (!el) return;
    el.style.setProperty('--grip-bounce', '5px');
    setTimeout(() => {
      el.style.setProperty('--grip-bounce', '0px');
    }, 120);
  }

  return {
    computeRodLength,
    setMoving,
    setBusy,
    setFingersOpen,
    moveTo,
    moveToMetrics,
    travelToX,
    parkHome,
    bounce
  };
})();
