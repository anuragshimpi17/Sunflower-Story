/**
 * main.js — Application Orchestrator
 * 
 * Entry point for the Sunflower Scrollytelling website.
 * Initializes all modules in correct order, handles loading state,
 * and sets up global event listeners.
 * 
 * Module dependency order:
 *   1. scenes.js (GSAP animations — no dependencies except GSAP)
 *   2. main.js (this file — orchestrates everything)
 * 
 * No circular dependencies. Each module exports init functions only.
 */

(function () {
  'use strict';

  /* ── State ── */
  const state = {
    isLoaded: false,
    hasScrolled: false,
  };

  /* ── DOM References ── */
  const loader = document.getElementById('loader');
  const restartBtn = document.getElementById('btn-restart');

  /**
   * Initialize the entire application
   */
  function initApp() {
    // Wait for all resources to load
    if (document.readyState === 'complete') {
      onReady();
    } else {
      window.addEventListener('load', onReady);
    }
  }

  /**
   * Called when page is fully loaded
   */
  function onReady() {
    if (state.isLoaded) return;
    state.isLoaded = true;

    // Initialize GSAP defaults for performance
    gsap.defaults({
      ease: 'power2.out',
      duration: 0.5,
    });

    // Initialize scene animations (from scenes.js)
    initScenes();

    // Setup restart button
    setupRestart();

    // Dismiss loader with smooth transition
    dismissLoader();

    console.log('🌻 Sunflower Scrollytelling — Ready');
  }

  /**
   * Setup restart button to scroll back to top
   */
  function setupRestart() {
    if (!restartBtn) return;

    restartBtn.addEventListener('click', () => {
      // Smooth scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /**
   * Dismiss the loading screen with animation
   */
  function dismissLoader() {
    if (!loader) return;

    // Short delay so user sees the loading animation
    setTimeout(() => {
      loader.classList.add('hidden');

      // Remove from DOM after transition
      loader.addEventListener('transitionend', () => {
        loader.style.display = 'none';
      }, { once: true });
    }, 800);
  }

  // ── Launch ──
  initApp();

})();
