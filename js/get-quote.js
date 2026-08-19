document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     MOBILE NAVIGATION
  ========================================================= */

  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

      const isOpen =
        navMenu.classList.toggle("open");

      menuToggle.classList.toggle(
        "active",
        isOpen
      );

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
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

        if (
          !targetId ||
          targetId === "#"
        ) {
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

      if (projectType) {

        const matchingOption =
          Array.from(projectType.options)
            .find((option) => {

              return (
                option.value === selectedService ||
                option.textContent.trim() ===
                  selectedService
              );

            });

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

    if (!header) {
      return;
    }

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
    document.querySelectorAll(
      "main section[id]"
    );

  const updateActiveLink = () => {

    if (!sections.length) {
      return;
    }

    const scrollPosition =
      window.scrollY + 150;

    let currentSection = "";

    sections.forEach((section) => {

      if (
        scrollPosition >= section.offsetTop &&
        scrollPosition <
          section.offsetTop +
          section.offsetHeight
      ) {

        currentSection =
          section.id;

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

  if (
    animatedElements.length &&
    "IntersectionObserver" in window
  ) {

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

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Escape" &&
        navMenu &&
        navMenu.classList.contains("open")
      ) {

        navMenu.classList.remove("open");

        menuToggle?.classList.remove(
          "active"
        );

        menuToggle?.setAttribute(
          "aria-expanded",
          "false"
        );

      }

    }
  );


  /* =========================================================
     GET QUOTE PAGE
  ========================================================= */

  const quoteForm =
    document.getElementById("quoteForm");

  if (!quoteForm) {
    return;
  }


  /* =========================================================
     QUOTE ELEMENTS
  ========================================================= */

  const serviceSelect =
    document.getElementById("serviceType");

  const customServiceField =
    document.getElementById(
      "customServiceField"
    );

  const customService =
    document.getElementById(
      "customService"
    );

  const projectDetails =
    document.getElementById(
      "projectDetails"
    );

  const quantityField =
    document.getElementById(
      "quantityField"
    );

  const quantity =
    document.getElementById(
      "quantity"
    );

  const sizeField =
    document.getElementById(
      "sizeField"
    );

  const size =
    document.getElementById(
      "size"
    );

  const designChoice =
    document.getElementById(
      "designChoice"
    );

  const designUploadField =
    document.getElementById(
      "designUploadField"
    );

  const designFiles =
    document.getElementById(
      "designFiles"
    );

  const fileList =
    document.getElementById(
      "fileList"
    );

  const deliveryAddressField =
    document.getElementById(
      "deliveryAddressField"
    );

  const deliveryAddress =
    document.getElementById(
      "deliveryAddress"
    );

  const timeline =
    document.getElementById(
      "timeline"
    );

  const whatsappButton =
    document.getElementById(
      "whatsappQuote"
    );

  const successMessage =
    document.getElementById(
      "successMessage"
    );

  const formError =
    document.getElementById(
      "formError"
    );


  /* =========================================================
     DATE — PREVENT PAST DATES
  ========================================================= */

  if (timeline) {

    const today =
      new Date();

    const year =
      today.getFullYear();

    const month =
      String(
        today.getMonth() + 1
      ).padStart(2, "0");

    const day =
      String(
        today.getDate()
      ).padStart(2, "0");

    timeline.min =
      `${year}-${month}-${day}`;

  }


  /* =========================================================
     REQUIRED FIELD HELPERS
  ========================================================= */

  const setRequired = (
    element,
    required
  ) => {

    if (!element) {
      return;
    }

    element.required =
      required;

  };


  const clearFieldError = (
    element
  ) => {

    if (!element) {
      return;
    }

    const group =
      element.closest(
        ".form-group"
      );

    if (!group) {
      return;
    }

    group.classList.remove(
      "has-error"
    );

    const error =
      group.querySelector(
        ".field-error"
      );

    if (error) {
      error.textContent = "";
    }

  };


  const showFieldError = (
    element,
    message
  ) => {

    if (!element) {
      return;
    }

    const group =
      element.closest(
        ".form-group"
      );

    if (!group) {
      return;
    }

    group.classList.add(
      "has-error"
    );

    const error =
      group.querySelector(
        ".field-error"
      );

    if (error) {
      error.textContent =
        message;
    }

  };


  /* =========================================================
     RESET PROJECT DETAILS
  ========================================================= */

  const resetProjectDetails = () => {

    if (projectDetails) {
      projectDetails.hidden =
        true;
    }

    if (quantityField) {
      quantityField.hidden =
        true;
    }

    if (sizeField) {
      sizeField.hidden =
        true;
    }

    if (designChoice) {
      designChoice.hidden =
        true;
    }

    if (designUploadField) {
      designUploadField.hidden =
        true;
    }

    setRequired(
      quantity,
      false
    );

    setRequired(
      size,
      false
    );

    setRequired(
      designFiles,
      false
    );

    document
      .querySelectorAll(
        'input[name="designOption"]'
      )
      .forEach((radio) => {

        radio.checked =
          false;

      });

    if (designFiles) {
      designFiles.value =
        "";
    }

    if (fileList) {
      fileList.innerHTML =
        "";
    }

  };


  /* =========================================================
     SERVICE CHANGE
  ========================================================= */

  if (serviceSelect) {

    serviceSelect.addEventListener(
      "change",
      () => {

        const option =
          serviceSelect.selectedOptions[0];

        resetProjectDetails();

        if (
          !option ||
          !option.value
        ) {
          customServiceField.hidden =
            true;

          setRequired(
            customService,
            false
          );

          return;
        }


        /* -----------------------------------------------
           CUSTOM SERVICE
        ------------------------------------------------ */

        if (
          option.value ===
          "custom"
        ) {

          customServiceField.hidden =
            false;

          setRequired(
            customService,
            true
          );

          return;

        }


        /* -----------------------------------------------
           STANDARD SERVICE
        ------------------------------------------------ */

        if (customServiceField) {
          customServiceField.hidden =
            true;
        }

        setRequired(
          customService,
          false
        );


        const needsQuantity =
          option.dataset.quantity ===
          "true";

        const needsSize =
          option.dataset.size ===
          "true";

        const needsDesign =
          option.dataset.design ===
          "true";


        if (
          needsQuantity ||
          needsSize ||
          needsDesign
        ) {

          projectDetails.hidden =
            false;

        }


        /* Quantity */

        if (needsQuantity) {

          quantityField.hidden =
            false;

          setRequired(
            quantity,
            true
          );

        }


        /* Size */

        if (needsSize) {

          sizeField.hidden =
            false;

          setRequired(
            size,
            true
          );

        }


        /* Design */

        if (needsDesign) {

          designChoice.hidden =
            false;

        }

      }
    );

  }


  /* =========================================================
     DESIGN OPTION
  ========================================================= */

  document
    .querySelectorAll(
      'input[name="designOption"]'
    )
    .forEach((radio) => {

      radio.addEventListener(
        "change",
        () => {

          const ownDesign =
            radio.value ===
            "I have my own design" &&
            radio.checked;


          if (ownDesign) {

            designUploadField.hidden =
              false;

            setRequired(
              designFiles,
              true
            );

          } else if (
            radio.checked
          ) {

            designUploadField.hidden =
              true;

            setRequired(
              designFiles,
              false
            );

            if (designFiles) {
              designFiles.value =
                "";
            }

            if (fileList) {
              fileList.innerHTML =
                "";
            }

          }

        }
      );

    });


  /* =========================================================
     FILE UPLOAD
  ========================================================= */

  if (designFiles) {

    designFiles.addEventListener(
      "change",
      () => {

        if (!fileList) {
          return;
        }

        fileList.innerHTML =
          "";

        const files =
          Array.from(
            designFiles.files
          );

        const allowedTypes = [
          "image/jpeg",
          "image/png",
          "application/pdf"
        ];

        const allowedExtensions = [
          "jpg",
          "jpeg",
          "png",
          "pdf"
        ];


        for (const file of files) {

          const extension =
            file.name
              .split(".")
              .pop()
              .toLowerCase();

          const valid =
            allowedTypes.includes(
              file.type
            ) ||
            allowedExtensions.includes(
              extension
            );

          if (!valid) {

            designFiles.value =
              "";

            fileList.innerHTML =
              `<div class="file-item">
                <span class="file-item-name">
                  Unsupported file type. Please use JPG, JPEG, PNG or PDF.
                </span>
              </div>`;

            setRequired(
              designFiles,
              true
            );

            return;

          }

          const item =
            document.createElement(
              "div"
            );

          item.className =
            "file-item";

          const size =
            formatFileSize(
              file.size
            );

          item.innerHTML = `
            <span class="file-item-name">
              ${escapeHtml(file.name)}
            </span>

            <span class="file-item-size">
              ${size}
            </span>
          `;

          fileList.appendChild(
            item
          );

        }

      }
    );

  }


  /* =========================================================
     FILE SIZE
  ========================================================= */

  function formatFileSize(
    bytes
  ) {

    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(
        bytes / 1024
      ).toFixed(1)} KB`;
    }

    return `${(
      bytes /
      (1024 * 1024)
    ).toFixed(1)} MB`;

  }


  /* =========================================================
     HTML ESCAPE
  ========================================================= */

  function escapeHtml(
    value
  ) {

    return String(value)
      .replace(
        /&/g,
        "&amp;"
      )
      .replace(
        /</g,
        "&lt;"
      )
      .replace(
        />/g,
        "&gt;"
      )
      .replace(
        /"/g,
        "&quot;"
      )
      .replace(
        /'/g,
        "&#039;"
      );

  }


  /* =========================================================
     DELIVERY
  ========================================================= */

  document
    .querySelectorAll(
      'input[name="deliveryMethod"]'
    )
    .forEach((radio) => {

      radio.addEventListener(
        "change",
        () => {

          if (
            radio.value ===
              "Delivery" &&
            radio.checked
          ) {

            deliveryAddressField.hidden =
              false;

            setRequired(
              deliveryAddress,
              true
            );

          } else if (
            radio.checked
          ) {

            deliveryAddressField.hidden =
              true;

            setRequired(
              deliveryAddress,
              false
            );

            deliveryAddress.value =
              "";

          }

        }
      );

    });


  /* =========================================================
     FORM VALIDATION
  ========================================================= */

  const validateForm = () => {

    let valid = true;


    /* Clear previous errors */

    quoteForm
      .querySelectorAll(
        ".has-error"
      )
      .forEach((group) => {

        group.classList.remove(
          "has-error"
        );

      });

    quoteForm
      .querySelectorAll(
        ".field-error"
      )
      .forEach((error) => {

        error.textContent =
          "";

      });


    /* Browser validation */

    const requiredFields =
      quoteForm.querySelectorAll(
        "[required]"
      );

    requiredFields.forEach(
      (field) => {

        if (
          field.type ===
          "checkbox"
        ) {

          if (!field.checked) {

            valid =
              false;

            if (
              field.id ===
              "confirmation"
            ) {

              const error =
                document.getElementById(
                  "confirmationError"
                );

              if (error) {
                error.textContent =
                  "Please confirm the information is accurate.";
              }

            }

          }

          return;

        }


        if (
          field.type ===
          "radio"
        ) {
          return;
        }


        if (
          !field.value.trim()
        ) {

          valid =
            false;

          showFieldError(
            field,
            "This field is required."
          );

        }

      }
    );


    /* Service */

    if (
      serviceSelect &&
      !serviceSelect.value
    ) {

      valid =
        false;

      showFieldError(
        serviceSelect,
        "Please select a service."
      );

    }


    /* Custom service */

    if (
      serviceSelect &&
      serviceSelect.value ===
        "custom" &&
      customService &&
      !customService.value.trim()
    ) {

      valid =
        false;

      showFieldError(
        customService,
        "Please tell us what service you need."
      );

    }


    /* Delivery radio */

    const deliverySelected =
      document.querySelector(
        'input[name="deliveryMethod"]:checked'
      );

    if (!deliverySelected) {

      valid =
        false;

    }


    /* Design radio */

    if (
      designChoice &&
      !designChoice.hidden
    ) {

      const designSelected =
        document.querySelector(
          'input[name="designOption"]:checked'
        );

      if (!designSelected) {

        valid =
          false;

        designChoice.classList.add(
          "has-error"
        );

      }

    }


    /* Upload */

    if (
      designFiles &&
      !designUploadField.hidden
    ) {

      if (
        !designFiles.files.length
      ) {

        valid =
          false;

        const uploadError =
          designUploadField.querySelector(
            ".field-error"
          );

        if (uploadError) {
          uploadError.textContent =
            "Please upload your design file.";
        }

      }

    }


    if (!valid) {

      formError.hidden =
        false;

      formError.textContent =
        "Please check the required fields and try again.";

      const firstError =
        quoteForm.querySelector(
          ".has-error input, " +
          ".has-error select, " +
          ".has-error textarea"
        );

      if (firstError) {

        firstError.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });

      }

    } else {

      formError.hidden =
        true;

    }

    return valid;

  };


  /* =========================================================
     FORM SUBMIT
  ========================================================= */

  quoteForm.addEventListener(
    "submit",
    (event) => {

      event.preventDefault();

      if (!validateForm()) {
        return;
      }


      /*
       * At this stage the frontend validation has passed.
       *
       * Connect this submit handler to your backend,
       * Firebase, Formspree, EmailJS, or another API
       * when you are ready to store quote requests.
       */

      successMessage.hidden =
        false;

      successMessage.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

    }
  );


  /* =========================================================
     WHATSAPP QUOTE
  ========================================================= */

  if (whatsappButton) {

    whatsappButton.addEventListener(
      "click",
      () => {

        if (!validateForm()) {
          return;
        }

        const message =
          buildWhatsAppMessage();


        /*
         * IMPORTANT:
         * Replace this number with LikeStar's
         * real WhatsApp number.
         *
         * Ghana format:
         * 233XXXXXXXXX
         */

        const whatsappNumber =
          "233554890113";

        const whatsappUrl =
          `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
            message
          )}`;


        window.open(
          whatsappUrl,
          "_blank",
          "noopener,noreferrer"
        );

      }
    );

  }


  /* =========================================================
     BUILD WHATSAPP MESSAGE
  ========================================================= */

  function buildWhatsAppMessage() {

    const fullName =
      getValue("fullName");

    const businessName =
      getValue("businessName");

    const phone =
      getValue("phone");

    const location =
      getValue("location");

    const selectedService =
      getValue("serviceType");

    const customServiceValue =
      getValue("customService");

    const finalService =
      selectedService === "custom"
        ? customServiceValue
        : selectedService;

    const quantityValue =
      getValue("quantity");

    const sizeValue =
      getValue("size");

    const designOption =
      document.querySelector(
        'input[name="designOption"]:checked'
      )?.value || "";

    const additionalDetails =
      getValue(
        "additionalDetails"
      );

    const deliveryMethod =
      document.querySelector(
        'input[name="deliveryMethod"]:checked'
      )?.value || "";

    const deliveryLocation =
      getValue(
        "deliveryAddress"
      );

    const timelineValue =
      getValue("timeline");

    const referral =
      getValue(
        "referralSource"
      );


    let message =
`Hello LikeStar,

I would like to request a quote.

━━━━━━━━━━━━━━━━━━
CUSTOMER INFORMATION
━━━━━━━━━━━━━━━━━━

Full Name: ${fullName}
Business / Organization: ${businessName || "N/A"}
Phone / WhatsApp: ${phone}
Location: ${location}

━━━━━━━━━━━━━━━━━━
PROJECT DETAILS
━━━━━━━━━━━━━━━━━━

Service: ${finalService}`;


    if (quantityValue) {

      message +=
        `\nQuantity: ${quantityValue}`;

    }


    if (sizeValue) {

      message +=
        `\nSize / Specifications: ${sizeValue}`;

    }


    if (designOption) {

      message +=
        `\nDesign: ${designOption}`;

    }


    if (additionalDetails) {

      message +=
        `\nAdditional Details: ${additionalDetails}`;

    }


    message +=
`\n
━━━━━━━━━━━━━━━━━━
DELIVERY
━━━━━━━━━━━━━━━━━━

Method: ${deliveryMethod}`;


    if (
      deliveryMethod ===
      "Delivery"
    ) {

      message +=
        `\nDelivery Location: ${deliveryLocation}`;

    }


    message +=
`
━━━━━━━━━━━━━━━━━━
TIMELINE
━━━━━━━━━━━━━━━━━━

Preferred Completion Date: ${formatDate(
      timelineValue
    )}

━━━━━━━━━━━━━━━━━━
HOW THEY FOUND US
━━━━━━━━━━━━━━━━━━

${referral}

━━━━━━━━━━━━━━━━━━

I confirm that the information provided is accurate
and I agree to be contacted regarding this project request.

Thank you.`;

    return message;

  }


  /* =========================================================
     GET VALUE
  ========================================================= */

  function getValue(
    id
  ) {

    const element =
      document.getElementById(id);

    if (!element) {
      return "";
    }

    return element.value.trim();

  }


  /* =========================================================
     FORMAT DATE
  ========================================================= */

  function formatDate(
    dateString
  ) {

    if (!dateString) {
      return "Not specified";
    }

    const date =
      new Date(
        `${dateString}T00:00:00`
      );

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {

      return dateString;

    }

    return date.toLocaleDateString(
      "en-GH",
      {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      }
    );

  }


  /* =========================================================
     LIVE ERROR CLEARING
  ========================================================= */

  quoteForm
    .querySelectorAll(
      "input, textarea, select"
    )
    .forEach((field) => {

      field.addEventListener(
        "input",
        () => {

          clearFieldError(
            field
          );

          if (
            formError &&
            !formError.hidden
          ) {

            formError.hidden =
              true;

          }

        }
      );

      field.addEventListener(
        "change",
        () => {

          clearFieldError(
            field
          );

        }
      );

    });

});