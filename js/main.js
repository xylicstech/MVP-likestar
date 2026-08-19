document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     MOBILE NAVIGATION
  ========================================================= */

  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

      const isOpen = navMenu.classList.toggle("open");

      menuToggle.classList.toggle("active", isOpen);

      menuToggle.setAttribute(
        "aria-expanded",
        isOpen
      );

    });

    navLinks.forEach((link) => {

      link.addEventListener("click", () => {

        navMenu.classList.remove("open");

        menuToggle.classList.remove("active");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

      });

    });

  }


  /* =========================================================
     SMOOTH SCROLL
  ========================================================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

      link.addEventListener("click", (event) => {

        const targetId =
          link.getAttribute("href");

        if (!targetId || targetId === "#") {
          return;
        }

        const target =
          document.querySelector(targetId);

        if (!target) {
          return;
        }

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      });

    });


  /* =========================================================
     SERVICE → QUOTE
  ========================================================= */

  const serviceButtons =
    document.querySelectorAll(".service-quote");

  const projectType =
    document.getElementById("projectType");

  serviceButtons.forEach((button) => {

    button.addEventListener("click", () => {

      const selectedService =
        button.dataset.service;

      if (!selectedService) {
        return;
      }

      /*
       * If the quote form contains a projectType select,
       * automatically select the service.
       */

      if (projectType) {

        const matchingOption =
          Array.from(projectType.options)
            .find(
              option =>
                option.value === selectedService ||
                option.textContent.trim() === selectedService
            );

        if (matchingOption) {

          projectType.value =
            matchingOption.value;

          projectType.dispatchEvent(
            new Event("change", {
              bubbles: true
            })
          );

        }

      }

    });

  });


  /* =========================================================
     HEADER ON SCROLL
  ========================================================= */

  const header =
    document.querySelector(".site-header");

  const updateHeader = () => {

    if (!header) return;

    header.classList.toggle(
      "scrolled",
      window.scrollY > 20
    );

  };

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );

  updateHeader();


  /* =========================================================
     ACTIVE NAVIGATION
  ========================================================= */

  const sections =
    document.querySelectorAll("main section[id]");

  const updateActiveLink = () => {

    const scrollPosition =
      window.scrollY + 150;

    let currentSection = "";

    sections.forEach((section) => {

      if (
        scrollPosition >= section.offsetTop &&
        scrollPosition <
          section.offsetTop + section.offsetHeight
      ) {

        currentSection = section.id;

      }

    });

    navLinks.forEach((link) => {

      link.classList.remove("active");

      if (
        link.getAttribute("href") ===
        `#${currentSection}`
      ) {

        link.classList.add("active");

      }

    });

  };

  window.addEventListener(
    "scroll",
    updateActiveLink,
    { passive: true }
  );

  updateActiveLink();


  /* =========================================================
     SCROLL REVEAL
  ========================================================= */

  const animatedElements =
    document.querySelectorAll(
      ".service-card, " +
      ".work-card, " +
      ".why-item, " +
      ".process-step, " +
      ".review-card, " +
      ".testimonial-box"
    );

  if ("IntersectionObserver" in window) {

    const observer =
      new IntersectionObserver(
        (entries, observerInstance) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) {
              return;
            }

            entry.target.classList.add(
              "is-visible"
            );

            observerInstance.unobserve(
              entry.target
            );

          });

        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -40px 0px"
        }
      );

    animatedElements.forEach((element) => {

      element.classList.add(
        "scroll-reveal"
      );

      observer.observe(element);

    });

  }


  /* =========================================================
     CURRENT YEAR
  ========================================================= */

  const currentYear =
    document.getElementById("currentYear");

  if (currentYear) {

    currentYear.textContent =
      new Date().getFullYear();

  }


  /* =========================================================
     ESCAPE — CLOSE MENU
  ========================================================= */

  document.addEventListener("keydown", (event) => {

    if (
      event.key === "Escape" &&
      navMenu &&
      navMenu.classList.contains("open")
    ) {

      navMenu.classList.remove("open");

      menuToggle?.classList.remove("active");

      menuToggle?.setAttribute(
        "aria-expanded",
        "false"
      );

    }

  });

});