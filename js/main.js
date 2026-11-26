/* ==========================================================================
   THE PORTFOLIO DEPOT — MAIN BOOTSTRAP
   ========================================================================== */

(() => {
  function boot() {
    const yard = document.getElementById('containers-yard');
    if (!yard) return;

    // 1. Build 7 3D shipping containers & compute responsive pile geometry
    window.DepotContainers.buildAll(yard);

    // 2. Park crane cleanly on the rail before initial pickup
    window.DepotCrane.parkHome();

    // 3. Wire navigation, keyboard controls & interior actions
    window.DepotNavigation.init();

    // 4. Recalculate pile and lifted dimensions on viewport resize
    let resizeTimer = null;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        window.DepotContainers.computeLayout();
        window.DepotAnimations.syncAfterResize();
      }, 90);
    });

    // 5. Automatically open Home container 500ms after page load
    setTimeout(() => {
      window.DepotAnimations.activate('home', { focus: false });
    }, 500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
