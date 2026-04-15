/**
 * scenes.js — GSAP ScrollTrigger Animation Controller
 * 
 * Controls all scroll-based animations for 7 scenes.
 * Each scene has its own timeline pinned to its scroll range.
 * Uses only GPU-friendly properties: transform, opacity.
 * 
 * Dependencies: GSAP, ScrollTrigger (loaded via CDN before this script)
 * Exports: initScenes()
 */

/**
 * Initialize all scene animations
 * Called once from main.js after DOM is ready
 */
function initScenes() {
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Create individual scene timelines
  createSeedScene();
  createSproutScene();
  createGrowthScene();
  createBeeScene();
  createBloomScene();
  createAgingScene();
  createDeathScene();

  // Setup scroll progress bar
  createProgressBar();

  // Setup scene navigation dots
  createSceneNav();

  // Setup scroll cue hide on scroll
  createScrollCue();
}


/* ══════════════════════════════════════════════════
   SCENE 1 — SEED
   Seed drops into view, soil particles settle around it
   ══════════════════════════════════════════════════ */
function createSeedScene() {
  const section = document.querySelector('#scene-seed');
  const seed = section.querySelector('.seed');
  const particles = section.querySelectorAll('.particle');
  const text = section.querySelector('.scene__text');

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
    }
  });

  // Text fades in first
  tl.to(text, {
    opacity: 1,
    y: 0,
    duration: 0.3,
    ease: 'power2.out'
  });

  // Seed drops in
  tl.to(seed, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.4,
    ease: 'bounce.out'
  }, '<0.1');

  // Soil particles react to seed landing
  particles.forEach((p, i) => {
    tl.to(p, {
      opacity: gsap.utils.random(0.3, 0.8),
      y: gsap.utils.random(-20, -60),
      x: gsap.utils.random(-30, 30),
      duration: 0.3,
      ease: 'power2.out'
    }, '<' + (i * 0.02));
  });

  // Particles settle back down
  tl.to(particles, {
    y: 0,
    opacity: 0.4,
    duration: 0.3,
    ease: 'power2.in',
    stagger: 0.02
  }, '>-0.1');

  // Seed sinks slightly into soil
  tl.to(seed, {
    y: 20,
    scale: 0.9,
    duration: 0.3,
    ease: 'power2.in'
  }, '<');
}


/* ══════════════════════════════════════════════════
   SCENE 2 — SPROUT
   Stem pushes up, leaves unfurl
   ══════════════════════════════════════════════════ */
function createSproutScene() {
  const section = document.querySelector('#scene-sprout');
  const sprout = section.querySelector('.sprout');
  const stem = section.querySelector('.sprout__stem');
  const leafLeft = section.querySelector('.sprout__leaf--left');
  const leafRight = section.querySelector('.sprout__leaf--right');
  const ground = section.querySelector('.ground-line');
  const text = section.querySelector('.scene__text');

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
    }
  });

  // Show ground line
  tl.to(ground, {
    opacity: 0.6,
    duration: 0.2
  });

  // Show sprout container
  tl.to(sprout, {
    opacity: 1,
    duration: 0.2
  }, '<');

  // Stem grows upward
  tl.to(stem, {
    height: 140,
    duration: 0.5,
    ease: 'power1.out'
  });

  // Left leaf unfurls
  tl.to(leafLeft, {
    opacity: 1,
    scale: 1,
    rotation: -15,
    duration: 0.3,
    ease: 'back.out(1.7)'
  }, '-=0.2');

  // Right leaf unfurls
  tl.to(leafRight, {
    opacity: 1,
    scale: 1,
    rotation: 15,
    duration: 0.3,
    ease: 'back.out(1.7)'
  }, '-=0.2');

  // Text fades in
  tl.to(text, {
    opacity: 1,
    y: 0,
    duration: 0.3,
    ease: 'power2.out'
  }, '-=0.4');
}


/* ══════════════════════════════════════════════════
   SCENE 3 — GROWTH
   Stem extends, leaves appear, bud forms
   ══════════════════════════════════════════════════ */
function createGrowthScene() {
  const section = document.querySelector('#scene-growth');
  const flower = section.querySelector('.growing-flower');
  const stem = section.querySelector('.growing-flower__stem');
  const leaves = section.querySelectorAll('.growing-flower__leaf');
  const bud = section.querySelector('.growing-flower__bud');
  const text = section.querySelector('.scene__text');

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
    }
  });

  // Flower container appears
  tl.to(flower, {
    opacity: 1,
    duration: 0.2
  });

  // Stem grows tall
  tl.to(stem, {
    height: 350,
    duration: 0.5,
    ease: 'power1.out'
  });

  // Leaves appear in sequence
  leaves.forEach((leaf, i) => {
    const isLeft = i % 2 === 0;
    tl.to(leaf, {
      opacity: 1,
      scale: 1,
      rotation: isLeft ? -20 : 20,
      duration: 0.2,
      ease: 'back.out(1.5)'
    }, '-=0.15');
  });

  // Bud forms at top
  tl.to(bud, {
    opacity: 1,
    scale: 1,
    duration: 0.3,
    ease: 'back.out(2)'
  }, '-=0.1');

  // Text fades in
  tl.to(text, {
    opacity: 1,
    y: 0,
    duration: 0.3,
    ease: 'power2.out'
  }, '-=0.5');
}


/* ══════════════════════════════════════════════════
   SCENE 4 — BEE INTERACTION
   Flower displays, petals open, pollen floats
   ══════════════════════════════════════════════════ */
function createBeeScene() {
  const section = document.querySelector('#scene-bee');
  const flower = section.querySelector('.flower-for-bee');
  const petals = section.querySelectorAll('.petal');
  const pollenParticles = section.querySelectorAll('.pollen');
  const text = section.querySelector('.scene__text');

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
    }
  });

  // Flower appears
  tl.to(flower, {
    opacity: 1,
    scale: 1,
    duration: 0.3,
    ease: 'power2.out'
  });

  // Petals bloom open with stagger
  tl.to(petals, {
    opacity: 1,
    duration: 0.4,
    stagger: {
      each: 0.03,
      from: 'random'
    },
    ease: 'power2.out'
  }, '-=0.1');

  // Pollen particles float
  pollenParticles.forEach((p, i) => {
    tl.to(p, {
      opacity: gsap.utils.random(0.4, 0.9),
      y: gsap.utils.random(-30, -60),
      x: gsap.utils.random(-20, 20),
      scale: gsap.utils.random(0.8, 1.5),
      duration: 0.3,
      ease: 'power1.out'
    }, '-=0.3');
  });

  // Text fades in
  tl.to(text, {
    opacity: 1,
    y: 0,
    duration: 0.3,
    ease: 'power2.out'
  }, '-=0.5');

  // Pollen continues floating
  tl.to(pollenParticles, {
    y: '-=20',
    opacity: 0,
    duration: 0.3,
    stagger: 0.05
  });
}


/* ══════════════════════════════════════════════════
   SCENE 5 — FULL BLOOM
   Sunflower opens fully, glow radiates, rays appear
   ══════════════════════════════════════════════════ */
function createBloomScene() {
  const section = document.querySelector('#scene-bloom');
  const sunflower = section.querySelector('.sunflower');
  const glow = section.querySelector('.sunflower__glow');
  const sfPetals = section.querySelectorAll('.sf-petal');
  const rays = section.querySelectorAll('.ray');
  const text = section.querySelector('.scene__text');

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
    }
  });

  // Sunflower container scale in
  tl.fromTo(sunflower, {
    opacity: 0,
    scale: 0.3
  }, {
    opacity: 1,
    scale: 1,
    duration: 0.4,
    ease: 'back.out(1.4)'
  });

  // Petals bloom with stagger
  tl.fromTo(sfPetals, {
    opacity: 0,
    scaleY: 0
  }, {
    opacity: 1,
    scaleY: 1,
    duration: 0.4,
    stagger: {
      each: 0.02,
      from: 'center'
    },
    ease: 'elastic.out(1, 0.5)'
  }, '-=0.2');

  // Glow appears
  tl.to(glow, {
    opacity: 1,
    duration: 0.3,
    ease: 'power2.out'
  }, '-=0.2');

  // Sun rays fade in
  tl.to(rays, {
    opacity: 0.6,
    duration: 0.3,
    stagger: 0.05,
    ease: 'power2.out'
  }, '-=0.2');

  // Text fades in
  tl.to(text, {
    opacity: 1,
    y: 0,
    duration: 0.3,
    ease: 'power2.out'
  }, '-=0.5');

  // Gentle rotation of entire sunflower
  tl.to(sunflower, {
    rotation: 5,
    duration: 0.3,
    ease: 'sine.inOut'
  });
}


/* ══════════════════════════════════════════════════
   SCENE 6 — AGING
   Colors desaturate, petals droop
   ══════════════════════════════════════════════════ */
function createAgingScene() {
  const section = document.querySelector('#scene-aging');
  const flower = section.querySelector('.aging-flower');
  const agedPetals = section.querySelectorAll('.aged-petal');
  const text = section.querySelector('.scene__text');

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
    }
  });

  // Flower appears
  tl.to(flower, {
    opacity: 1,
    duration: 0.3
  });

  // Petals visible
  tl.to(agedPetals, {
    opacity: 1,
    duration: 0.2,
    stagger: 0.02
  });

  // Text fades in
  tl.to(text, {
    opacity: 1,
    y: 0,
    duration: 0.3,
    ease: 'power2.out'
  }, '-=0.3');

  // Desaturation animation
  tl.to(flower, {
    filter: 'saturate(0.3) brightness(0.7)',
    duration: 0.4,
    ease: 'power2.in'
  });

  // Petals start drooping
  agedPetals.forEach((petal, i) => {
    const baseRotation = i * 30;
    tl.to(petal, {
      y: gsap.utils.random(10, 30),
      opacity: gsap.utils.random(0.3, 0.6),
      rotation: baseRotation + gsap.utils.random(5, 15),
      duration: 0.2,
      ease: 'power2.in'
    }, '-=0.18');
  });

  // Flower head droops
  tl.to(flower, {
    rotation: 15,
    y: 20,
    duration: 0.3,
    ease: 'power2.in'
  }, '-=0.1');
}


/* ══════════════════════════════════════════════════
   SCENE 7 — DEATH / RETURN TO EARTH
   Flower dries, seeds scatter, cycle hint
   ══════════════════════════════════════════════════ */
function createDeathScene() {
  const section = document.querySelector('#scene-death');
  const deadFlower = section.querySelector('.dead-flower');
  const fallenSeeds = section.querySelectorAll('.fallen-seed');
  const restartPrompt = section.querySelector('.restart-prompt');
  const text = section.querySelector('.scene__text');

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
    }
  });

  // Dead flower appears
  tl.to(deadFlower, {
    opacity: 0.7,
    duration: 0.3
  });

  // Text fades in
  tl.to(text, {
    opacity: 1,
    y: 0,
    duration: 0.3,
    ease: 'power2.out'
  }, '-=0.1');

  // Seeds fall from the flower head
  fallenSeeds.forEach((seed, i) => {
    const fallDistance = gsap.utils.random(200, 400);
    const xDrift = gsap.utils.random(-100, 100);
    tl.to(seed, {
      opacity: 1,
      y: fallDistance,
      x: xDrift,
      rotation: gsap.utils.random(90, 360),
      duration: 0.3,
      ease: 'power2.in'
    }, '-=0.25');
  });

  // Dead flower fades further
  tl.to(deadFlower, {
    opacity: 0.3,
    scale: 0.95,
    duration: 0.2
  }, '-=0.1');

  // Restart prompt fades in
  tl.to(restartPrompt, {
    opacity: 1,
    duration: 0.3,
    ease: 'power2.out'
  });
}


/* ══════════════════════════════════════════════════
   UTILITY — Scroll Progress Bar
   ══════════════════════════════════════════════════ */
function createProgressBar() {
  const progressBar = document.querySelector('#progress-bar');

  gsap.to(progressBar, {
    width: '100%',
    ease: 'none',
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3
    }
  });
}


/* ══════════════════════════════════════════════════
   UTILITY — Scene Navigation Dots
   ══════════════════════════════════════════════════ */
function createSceneNav() {
  const dots = document.querySelectorAll('.scene-nav__dot');
  const scenes = document.querySelectorAll('.scene');

  // Update active dot based on scroll position
  scenes.forEach((scene, index) => {
    ScrollTrigger.create({
      trigger: scene,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => setActiveDot(index),
      onEnterBack: () => setActiveDot(index),
    });
  });

  // Click to scroll to scene
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const sceneIndex = parseInt(dot.dataset.scene);
      const targetScene = scenes[sceneIndex];
      if (targetScene) {
        gsap.to(window, {
          scrollTo: { y: targetScene, offsetY: 0 },
          duration: 1.5,
          ease: 'power2.inOut'
        });
      }
    });
  });

  function setActiveDot(index) {
    dots.forEach(d => d.classList.remove('active'));
    if (dots[index]) {
      dots[index].classList.add('active');
    }
  }
}


/* ══════════════════════════════════════════════════
   UTILITY — Scroll Cue (hide after scrolling)
   ══════════════════════════════════════════════════ */
function createScrollCue() {
  const cue = document.querySelector('#scroll-cue');

  ScrollTrigger.create({
    trigger: '#scene-seed',
    start: 'top top-=100',
    onEnter: () => cue.classList.add('hidden'),
    onLeaveBack: () => cue.classList.remove('hidden'),
  });
}
