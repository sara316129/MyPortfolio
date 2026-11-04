/* =========================================================
   SARANGA NUWAN HATHURUSINGHE — PORTFOLIO JAVASCRIPT
   Navigation, typewriter, scroll effects and multi-cursor intro
   ========================================================= */


/* =========================================================
   1. NAVIGATION SCROLL EFFECT
   ========================================================= */

const navbar = document.getElementById('navbar');

if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
}


/* =========================================================
   2. MOBILE NAVIGATION
   ========================================================= */

const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  document.addEventListener('click', event => {
    if (navbar && !navbar.contains(event.target)) {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
    }
  });
}


/* =========================================================
   3. TYPEWRITER EFFECT
   ========================================================= */

const roles = [
  'Data Analyst',
  'Machine Learning Enthusiast',
  'Data Visualization',
  'Cryptography Enthusiast',
  'Quantum Computing',
  'Video Editing',
  'Motion Graphics'
];

const typewriter = document.getElementById('typewriterText');

if (typewriter) {

  let roleIndex = 0;
  let characterIndex = 0;
  let deleting = false;

  function typeWriterEffect() {

    const currentRole = roles[roleIndex];

    if (!deleting) {

      characterIndex++;

      typewriter.textContent =
        currentRole.substring(0, characterIndex);

      if (characterIndex === currentRole.length) {

        deleting = true;
        setTimeout(typeWriterEffect, 1600);

      } else {

        setTimeout(typeWriterEffect, 75);

      }

    } else {

      characterIndex--;

      typewriter.textContent =
        currentRole.substring(0, characterIndex);

      if (characterIndex === 0) {

        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;

        setTimeout(typeWriterEffect, 350);

      } else {

        setTimeout(typeWriterEffect, 35);

      }
    }
  }

  typeWriterEffect();
}


/* =========================================================
   4. SMOOTH SCROLLING
   ========================================================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

  anchor.addEventListener('click', event => {

    const href = anchor.getAttribute('href');

    if (!href || href === '#') return;

    const target = document.querySelector(href);

    if (!target) return;

    event.preventDefault();

    const navbarHeight = navbar
      ? navbar.offsetHeight
      : 0;

    const targetPosition =
      target.getBoundingClientRect().top +
      window.scrollY -
      navbarHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });

  });

});


/* =========================================================
   5. ACTIVE NAVIGATION LINK
   ========================================================= */

const pageSections = document.querySelectorAll('section[id]');
const navigationLinks = document.querySelectorAll('.nav-links a');

if ('IntersectionObserver' in window) {

  const sectionObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        const currentId = entry.target.id;

        navigationLinks.forEach(link => {

          link.classList.remove('active');

          if (link.getAttribute('href') === '#' + currentId) {
            link.classList.add('active');
          }

        });

      }

    });

  }, {
    threshold: 0.25
  });

  pageSections.forEach(section => {
    sectionObserver.observe(section);
  });

}


/* =========================================================
   6. SCROLL REVEAL
   ========================================================= */

function activateScrollReveal() {

  const revealElements = document.querySelectorAll(
    '.cert-card, .edu-card, .contact-card, .project-card, .about-card'
  );

  revealElements.forEach(element => {
    element.classList.add('reveal');
  });

  if (!('IntersectionObserver' in window)) {

    revealElements.forEach(element => {
      element.classList.add('visible');
    });

    return;
  }

  const revealObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        const siblings = Array.from(
          entry.target.parentElement.children
        );

        const index = siblings.indexOf(entry.target);

        entry.target.style.transitionDelay =
          (index * 70) + 'ms';

        entry.target.classList.add('visible');

        revealObserver.unobserve(entry.target);
      }

    });

  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -35px 0px'
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

}


/* =========================================================
   7. MARQUEE TOUCH EFFECT
   ========================================================= */

const marqueeTrack = document.getElementById('marqueeTrack');

if (marqueeTrack) {

  marqueeTrack.addEventListener('touchstart', () => {
    marqueeTrack.style.animationPlayState = 'paused';
  }, { passive: true });

  marqueeTrack.addEventListener('touchend', () => {
    marqueeTrack.style.animationPlayState = 'running';
  }, { passive: true });

}


/* =========================================================
   8. CARD TILT EFFECT
   ========================================================= */

if (window.matchMedia('(hover: hover)').matches) {

  document.querySelectorAll(
    '.cert-card, .edu-card, .project-card'
  ).forEach(card => {

    card.addEventListener('mousemove', event => {

      const rect = card.getBoundingClientRect();

      const mouseX =
        (event.clientX - rect.left) / rect.width;

      const mouseY =
        (event.clientY - rect.top) / rect.height;

      const rotateX = (0.5 - mouseY) * 5;
      const rotateY = (mouseX - 0.5) * 5;

      card.style.transform =
        `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;

    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });

  });

}


/* =========================================================
   9. MULTI-CURSOR PORTFOLIO CONSTRUCTION INTRO
   ========================================================= */

async function runPortfolioIntro() {

  const intro = document.getElementById('build-intro');

  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (!intro || reducedMotion) {

    document.body.classList.remove('intro-active');

    if (intro) {
      intro.remove();
    }

    activateScrollReveal();

    return;
  }


  /* ---------------------------------------------------------
     CURSOR SETTINGS
     --------------------------------------------------------- */

  const cursorColors = [
    '#00e5ff',
    '#a78bfa',
    '#ffb86b',
    '#7ee787',
    '#ff7aa8',
    '#8ab4ff',
    '#f5e96b'
  ];

  const cursorNames = [
    'LAYOUT',
    'IDENTITY',
    'VISUALS',
    'CONTENT',
    'INTERFACE',
    'DETAILS',
    'FINISH'
  ];

  const cursors = [];

  const statusText =
    document.getElementById('build-status-text');

  const counter =
    document.getElementById('build-counter');

  const progress =
    document.getElementById('build-progress-fill');


  /* ---------------------------------------------------------
     CREATE THE CURSORS
     --------------------------------------------------------- */

  cursorColors.forEach((color, index) => {

    const cursor = document.createElement('div');

    cursor.className = 'build-cursor';

    cursor.style.setProperty('--cursor-color', color);

    cursor.innerHTML = `
      <svg viewBox="0 0 24 30" aria-hidden="true">
        <path
          d="M2 1.5v23l6.1-6.1 4.2 9 3.2-1.5-4.2-8.8h8.3L2 1.5z"
          fill="${color}"
          stroke="#08090d"
          stroke-width="1.2"
          stroke-linejoin="round"
        />
      </svg>

      <span class="build-cursor-label">
        ${cursorNames[index]}
      </span>

      <i class="build-click"></i>
    `;

    intro.appendChild(cursor);

    cursors.push(cursor);

  });


  /* ---------------------------------------------------------
     CONSTRUCTION STAGES

     Each cursor visits the actual website elements.
     --------------------------------------------------------- */

  const stages = [

    {
      name: 'ASSEMBLING NAVIGATION',
      selectors: [
        '.navbar'
      ]
    },

    {
      name: 'PLACING YOUR IDENTITY',
      selectors: [
        '.hero-image-wrap',
        '.hero-text',
        '.hero-tag',
        '.hero-name'
      ]
    },

    {
      name: 'CONNECTING INTERFACE',
      selectors: [
        '.hero-typewriter',
        '.hero-cta',
        '.hero-scroll-hint'
      ]
    },

    {
      name: 'BUILDING YOUR STORY',
      selectors: [
        '#about .container'
      ]
    },

    {
      name: 'LOADING SKILLS AND TOOLS',
      selectors: [
        '#skills .container',
        '.marquee-wrapper'
      ]
    },

    {
      name: 'ASSEMBLING PROJECTS AND AWARDS',
      selectors: [
        '#projects .container',
        '#certificates .container'
      ]
    },

    {
      name: 'FINALIZING EXPERIENCE',
      selectors: [
        '#education .container',
        '#contact .container',
        '.footer'
      ]
    }

  ];


  /* ---------------------------------------------------------
     GET UNIQUE WEBSITE ELEMENTS
     --------------------------------------------------------- */

  const allPieces = [];

  stages.forEach(stage => {

    stage.selectors.forEach(selector => {

      document.querySelectorAll(selector).forEach(element => {

        if (!allPieces.includes(element)) {

          allPieces.push(element);

          element.classList.add('build-piece');

        }

      });

    });

  });


  /* ---------------------------------------------------------
     WAIT HELPER
     --------------------------------------------------------- */

  function wait(milliseconds) {

    return new Promise(resolve => {
      setTimeout(resolve, milliseconds);
    });

  }


  /* ---------------------------------------------------------
     CURSOR MOVEMENT AND CLICK ANIMATION
     --------------------------------------------------------- */

  function moveCursor(cursor, target, duration, delay) {

    return new Promise(resolve => {

      const rect = target.getBoundingClientRect();

      const destinationX = Math.max(
        10,
        Math.min(
          window.innerWidth - 30,
          rect.left + rect.width * 0.5
        )
      );

      const destinationY = Math.max(
        10,
        Math.min(
          window.innerHeight - 35,
          rect.top + rect.height * 0.5
        )
      );

      const startX = Math.random() * window.innerWidth;

      const startY = window.innerHeight + 40;

      const clickEffect =
        cursor.querySelector('.build-click');


      cursor.style.opacity = '1';

      const animation = cursor.animate(

        [
          {
            transform:
              `translate(${startX}px, ${startY}px) rotate(-10deg)`,
            opacity: 0
          },

          {
            transform:
              `translate(${startX + (destinationX - startX) * 0.5}px, ${startY + (destinationY - startY) * 0.5 - 50}px) rotate(6deg)`,
            opacity: 1,
            offset: 0.55
          },

          {
            transform:
              `translate(${destinationX}px, ${destinationY}px) rotate(0deg)`,
            opacity: 1
          }

        ],

        {
          duration: duration,
          delay: delay,
          easing: 'cubic-bezier(.2,.8,.2,1)',
          fill: 'forwards'
        }

      );


      animation.onfinish = () => {

        /* CLICK RING */

        clickEffect.animate(

          [
            {
              opacity: 0.9,
              transform: 'scale(.3)'
            },

            {
              opacity: 0,
              transform: 'scale(3.8)'
            }
          ],

          {
            duration: 430,
            easing: 'ease-out'
          }

        );


        /* REVEAL THE WEBSITE ELEMENT */

        target.classList.add('is-built');

        setTimeout(resolve, 180);

      };


      animation.oncancel = resolve;

    });

  }


  /* ---------------------------------------------------------
     RUN CONSTRUCTION ANIMATION
     --------------------------------------------------------- */

  await wait(650);

  for (let stageIndex = 0; stageIndex < stages.length; stageIndex++) {

    const stage = stages[stageIndex];

    if (statusText) {
      statusText.textContent = stage.name;
    }

    if (counter) {

      counter.textContent =
        String(stageIndex + 1).padStart(2, '0') + ' / 07';

    }

    if (progress) {

      progress.style.width =
        ((stageIndex + 1) / stages.length * 100) + '%';

    }


    /* FIND THE ELEMENTS FOR THIS STAGE */

    const targets = [];

    stage.selectors.forEach(selector => {

      document.querySelectorAll(selector).forEach(element => {

        if (!targets.includes(element)) {
          targets.push(element);
        }

      });

    });


    /* SEND DIFFERENT CURSORS TO DIFFERENT ELEMENTS */

    const animations = targets.map((target, index) => {

      const cursor =
        cursors[(stageIndex + index) % cursors.length];

      return moveCursor(
        cursor,
        target,
        900 + Math.random() * 300,
        index * 120
      );

    });


    await Promise.all(animations);

    await wait(300);

  }


  /* ---------------------------------------------------------
     FINAL COMPLETION
     --------------------------------------------------------- */

  if (statusText) {
    statusText.textContent = 'EXPERIENCE READY';
  }

  if (counter) {
    counter.textContent = '07 / 07';
  }

  if (progress) {
    progress.style.width = '100%';
  }


  /* FADE OUT ALL CURSORS */

  cursors.forEach((cursor, index) => {

    cursor.animate(

      [
        { opacity: 1 },
        { opacity: 0 }
      ],

      {
        duration: 400,
        delay: index * 35,
        fill: 'forwards'
      }

    );

  });


  await wait(650);


  /* REMOVE INTRO SCREEN */

  intro.classList.add('is-done');

  document.body.classList.remove('intro-active');


  await wait(900);

  intro.remove();


  /* ENABLE NORMAL SCROLL REVEALS */

  activateScrollReveal();

}


/* =========================================================
   10. START THE INTRO
   ========================================================= */

runPortfolioIntro();
