/**
 * =========================================================
 * SARANGA NUWAN HATHURUSINGHE — PORTFOLIO ENGINE
 * Design: Cinematic Editorial & Quantum Tech Blue
 * Features: Typewriter, Projects Filter & Modal,
 *           Scroll Spy, Clipboard Utilities, Accessible Dialogs
 * =========================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  // ─── 1. NAVBAR SCROLL EFFECT ─────────────────────────────
  const navbar = document.getElementById("navbar");
  const handleScroll = () => {
    if (navbar) {
      navbar.classList.toggle("scrolled", window.scrollY > 40);
    }
  };
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  // ─── 2. MOBILE NAVIGATION MENU ───────────────────────────
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navToggle.classList.toggle("open");
      navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navToggle.classList.remove("open");
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", (e) => {
      if (!navbar.contains(e.target) && navLinks.classList.contains("open")) {
        navToggle.classList.remove("open");
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // ─── 3. TYPEWRITER EFFECT ────────────────────────────────
  const typewriterEl = document.getElementById("typewriterText");
  const fallbackRoles = [
    "Quantum Computing & Matrix Algorithms",
    "Data Analytics & Power BI Modeling",
    "Deep Learning & Survival Prognosis",
    "Monte Carlo 3D Simulation",
    "Cinematic Motion Graphics & Video Editing",
    "Quantitative Forex Modeling"
  ];
  const roles = (window.SITE_CONFIG && window.SITE_CONFIG.typewriterRoles) || fallbackRoles;

  if (typewriterEl) {
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;

    function tickTypewriter() {
      const currentRole = roles[roleIdx];

      if (!isDeleting) {
        charIdx++;
        typewriterEl.textContent = currentRole.substring(0, charIdx);
        if (charIdx === currentRole.length) {
          isDeleting = true;
          setTimeout(tickTypewriter, 2000); // Pause at end of word
          return;
        }
        setTimeout(tickTypewriter, 65);
      } else {
        charIdx--;
        typewriterEl.textContent = currentRole.substring(0, charIdx);
        if (charIdx === 0) {
          isDeleting = false;
          roleIdx = (roleIdx + 1) % roles.length;
          setTimeout(tickTypewriter, 400); // Pause before next word
          return;
        }
        setTimeout(tickTypewriter, 32);
      }
    }
    tickTypewriter();
  }

  // ─── 4. SCROLL SPY (ACTIVE NAV ANCHOR) ────────────────────
  const sections = document.querySelectorAll("section[id]");
  const navAnchors = document.querySelectorAll(".nav-links a");

  if ("IntersectionObserver" in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -65% 0px",
      threshold: 0
    };

    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navAnchors.forEach(a => {
            const href = a.getAttribute("href");
            if (href === `#${id}`) {
              a.classList.add("active");
            } else {
              a.classList.remove("active");
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(s => navObserver.observe(s));
  }

  // ─── 5. PROJECT CATEGORY FILTER & SEARCH ─────────────────
  const projectFilterTabs = document.querySelectorAll(".filter-tab[data-project-filter]");
  const projectSearchInput = document.getElementById("projectSearchInput");
  const projectCards = document.querySelectorAll(".project-card");

  let activeCategory = "all";
  let activeSearchQuery = "";

  function filterProjects() {
    projectCards.forEach(card => {
      const cardCategory = card.getAttribute("data-category") || "";
      const cardTitle = (card.querySelector(".project-heading")?.textContent || "").toLowerCase();
      const cardDesc = (card.querySelector(".project-summary")?.textContent || "").toLowerCase();
      const cardTags = (card.querySelector(".project-tech-tags")?.textContent || "").toLowerCase();

      const matchesCategory = activeCategory === "all" || cardCategory === activeCategory;
      const matchesSearch = !activeSearchQuery ||
        cardTitle.includes(activeSearchQuery) ||
        cardDesc.includes(activeSearchQuery) ||
        cardTags.includes(activeSearchQuery);

      if (matchesCategory && matchesSearch) {
        card.style.display = "flex";
        setTimeout(() => { card.style.opacity = "1"; card.style.transform = "translateY(0)"; }, 20);
      } else {
        card.style.opacity = "0";
        card.style.transform = "translateY(12px)";
        setTimeout(() => { card.style.display = "none"; }, 250);
      }
    });
  }

  projectFilterTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      projectFilterTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      activeCategory = tab.getAttribute("data-project-filter");
      filterProjects();
    });
  });

  if (projectSearchInput) {
    projectSearchInput.addEventListener("input", (e) => {
      activeSearchQuery = e.target.value.trim().toLowerCase();
      filterProjects();
    });
  }

  // ─── 6. PROJECT DETAILS MODAL DIALOG ──────────────────────
  const projectModal = document.getElementById("projectModal");
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  const modalBackdrop = document.getElementById("modalBackdrop");

  const modalMedia = document.getElementById("modalMedia");
  const modalCategory = document.getElementById("modalCategory");
  const modalTitle = document.getElementById("modalTitle");
  const modalRole = document.getElementById("modalRole");
  const modalYear = document.getElementById("modalYear");
  const modalMetrics = document.getElementById("modalMetrics");
  const modalTools = document.getElementById("modalTools");
  const modalChallenge = document.getElementById("modalChallenge");
  const modalSolution = document.getElementById("modalSolution");
  const modalResults = document.getElementById("modalResults");
  const modalCaseStudyLink = document.getElementById("modalCaseStudyLink");

  let lastActiveElement = null;

  function openProjectModal(projectId) {
    if (!window.SITE_CONFIG || !window.SITE_CONFIG.projects) return;
    const project = window.SITE_CONFIG.projects.find(p => p.id === projectId);
    if (!project) return;

    lastActiveElement = document.activeElement;

    // Fill modal fields
    if (modalMedia) {
      modalMedia.src = project.coverImage || "";
      modalMedia.alt = project.title;
    }
    if (modalCategory) modalCategory.textContent = project.categoryLabel || "Selected Work";
    if (modalTitle) modalTitle.textContent = project.title;
    if (modalRole) modalRole.textContent = project.role || "Lead";
    if (modalYear) modalYear.textContent = project.year || "2024";
    if (modalMetrics) modalMetrics.textContent = project.metrics || "";

    if (modalTools) {
      modalTools.innerHTML = (project.tools || [])
        .map(t => `<span class="tech-tag">${t}</span>`)
        .join("");
    }

    if (modalChallenge && project.caseStudy) {
      modalChallenge.textContent = project.caseStudy.challenge || "";
    }
    if (modalSolution && project.caseStudy) {
      modalSolution.textContent = project.caseStudy.solution || "";
    }
    if (modalResults && project.caseStudy) {
      modalResults.textContent = project.caseStudy.results || "";
    }

    if (modalCaseStudyLink) {
      modalCaseStudyLink.href = project.detailUrl || "#";
    }

    // Show modal
    projectModal.classList.add("is-open");
    document.body.style.overflow = "hidden";
    if (modalCloseBtn) modalCloseBtn.focus();
  }

  function closeProjectModal() {
    if (!projectModal) return;
    projectModal.classList.remove("is-open");
    document.body.style.overflow = "";
    if (lastActiveElement && typeof lastActiveElement.focus === "function") {
      lastActiveElement.focus();
    }
  }

  // Attach quick-view buttons
  document.querySelectorAll("[data-open-modal]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const pId = btn.getAttribute("data-open-modal");
      openProjectModal(pId);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeProjectModal);
  if (modalBackdrop) modalBackdrop.addEventListener("click", closeProjectModal);

  // Esc key closes modal & mobile menu
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (projectModal && projectModal.classList.contains("is-open")) {
        closeProjectModal();
      }
      if (navLinks && navLinks.classList.contains("open")) {
        navToggle.classList.remove("open");
        navLinks.classList.remove("open");
      }
    }
  });

  // ─── 7. CERTIFICATE DOMAIN FILTER ────────────────────────
  const certFilterTabs = document.querySelectorAll(".filter-tab[data-cert-filter]");
  const certCards = document.querySelectorAll(".cert-card");

  certFilterTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      certFilterTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const selectedCat = tab.getAttribute("data-cert-filter");

      certCards.forEach(card => {
        const cat = card.getAttribute("data-cert-category") || "";
        if (selectedCat === "all" || cat === selectedCat) {
          card.style.display = "flex";
          setTimeout(() => { card.style.opacity = "1"; card.style.transform = "translateY(0)"; }, 20);
        } else {
          card.style.opacity = "0";
          card.style.transform = "translateY(12px)";
          setTimeout(() => { card.style.display = "none"; }, 250);
        }
      });
    });
  });

  // ─── 8. CLIPBOARD UTILITIES & TOAST NOTIFICATION ─────────
  const toastContainer = document.getElementById("toastContainer");

  function showToast(msg) {
    if (!toastContainer) {
      alert(msg);
      return;
    }
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = msg;
    toastContainer.appendChild(toast);

    setTimeout(() => toast.classList.add("show"), 20);
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 350);
    }, 3000);
  }

  // Copy buttons
  document.querySelectorAll("[data-copy-text]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const text = btn.getAttribute("data-copy-text");
      if (!text) return;

      navigator.clipboard.writeText(text).then(() => {
        const label = btn.getAttribute("data-copy-label") || "Text";
        showToast(`✓ Copied ${label} to clipboard!`);
      }).catch(() => {
        showToast(`Selected: ${text}`);
      });
    });
  });

  // ─── 9. INTERACTIVE CONTACT FORM (MAILTO PREFILL) ───────
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("formName")?.value.trim();
      const email = document.getElementById("formEmail")?.value.trim();
      const subject = document.getElementById("formSubject")?.value.trim() || "Portfolio Inquiry";
      const message = document.getElementById("formMessage")?.value.trim();

      if (!name || !email || !message) {
        showToast("Please fill in your name, email, and message.");
        return;
      }

      const recipient = (window.SITE_CONFIG && window.SITE_CONFIG.contact.email) || "2022s19398@stu.cmb.ac.lk";
      const body = encodeURIComponent(`From: ${name} (${email})\n\nMessage:\n${message}`);
      const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${body}`;

      showToast("Opening email client with pre-filled message...");
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 500);
    });
  }

  // ─── 10. SMOOTH SCROLL FOR IN-PAGE ANCHORS ───────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      const targetId = this.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerOffset = 76;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });
      }
    });
  });

  // ─── 11. SCROLL REVEAL OBSERVER ──────────────────────────
  const revealElements = document.querySelectorAll(".reveal-init");
  if ("IntersectionObserver" in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -40px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add("is-revealed"));
  }

  // ─── 12. BACK TO TOP BUTTON ──────────────────────────────
  const btnScrollTop = document.getElementById("btnScrollTop");
  if (btnScrollTop) {
    btnScrollTop.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
