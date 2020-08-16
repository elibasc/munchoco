//EVENTS

//Smooth Scroll Events:
addScroll("#nav-about", "#about", 25);
addScroll("#nav-treats", "#treats", 50);
addScroll("#nav-contact", "#contact");
addScroll("#nav-faq", "#faq");

addScroll("#header-treats", "#treats", 50);

addScroll("#fixed-about", "#about", 25);
addScroll("#fixed-treats", "#treats", 50);
addScroll("#fixed-contact", "#contact");
addScroll("#fixed-faq", "#faq");
addScroll("#fixed-nav", "#nav");

addScroll("#footer-header", "#nav");
addScroll("#footer-about", "#about", 25);
addScroll("#footer-treats", "#treats", 50);
addScroll("#footer-contact", "#contact");
addScroll("#footer-faq", "#faq");

//SCROLL TRIGGER ANIMATIONS:

const phoneTrigger = phoneLand.matches ? "top 90%" : "top 45%";

ScrollTrigger.defaults({
  toggleActions: "play pause resume reverse",
  start: phoneTrigger,
});

// Section About:

const phoneX = phone.matches ? 0 : -100;
const aboutTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".section-about",
  },
});

aboutTl
  .from(".about__title", {
    x: phoneX,
    opacity: 0,
    duration: 0.8,
    delay: 0.2,
    ease: "power1",
  })
  .from(".about__subtitle", { opacity: 0, duration: 0.5, ease: "power1" });

//Section Treats:

const treatsTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".section-treats",
  },
});

treatsTl
  .from("#sugarcube-1", { y: -300, duration: 1, opacity: 0 })
  .from("#sugarcube-2", { y: -300, duration: 0.8, opacity: 0 }, "-=0.8")
  .from("#sugarcube-3", { y: -300, duration: 0.5, opacity: 0 }, "-=0.5")
  .from("#icon-call", { x: 10, duration: 1, opacity: 0 });

//Section FAQ:

const faqTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".section-faq",
  },
});

faqTl.from(".faq__title", { y: -100, duration: 0.5, opacity: 0 });

// FIXED NAVBAR

const fixedNav = document.querySelector("#fixed-nav");
const navContainer = document.querySelector(".fixed-nav__container");
const dropdown = document.querySelector(".fixed-nav__links");

//Trigger:
ScrollTrigger.create({
  trigger: ".navigation",
  toggleActions: "play none none reset",
  start: "bottom top",
  end: "500% top",
  onEnter: () => {
    if (isTouchDevice) {
      dropdown.style.opacity = "1";
    }
    fixedNav.classList.add("active");
  },
  onEnterBack: () => fixedNav.classList.add("active"),
  onLeaveBack: () => {
    if (isTouchDevice) {
      dropdown.style.opacity = "0";
    }
    fixedNav.classList.remove("active");
    dropdown.classList.remove("active");
  },
});

//Dropdown:

fixedNav.addEventListener("mouseover", () => {
  dropdown.classList.add("active");
});

dropdown.addEventListener("mouseover", () => {
  dropdown.classList.add("active");
});

navContainer.addEventListener("mouseout", () => {
  dropdown.classList.remove("active");
});

//Section indicator:
const sections = document.querySelectorAll("[data-index");
const fixedIndicator = document.querySelector(".fixed-nav__indicator");
const phoneNavContainer = document.querySelector(".phone-navigation");
const phoneIndicator = document.querySelector(".phone-nav__indicator");

sectionIndicator(navContainer, fixedIndicator);
sectionIndicator(phoneNavContainer, phoneIndicator);

//POPUP OPENING & CLOSING:

const body = document.querySelector("body");
const openModalButtons = document.querySelectorAll("[data-modal-target]");
const closeModalButtons = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");
const modals = document.querySelectorAll(".modal");

const phoneSizeCallback = () => {
  openModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = document.querySelector(button.dataset.modalTarget);
      modals.forEach((mod) => {
        if (mod.className.includes("active")) {
          mod.classList.remove("active");
        }
      });
      openModalButtons.forEach((btn) => {
        if (btn.className.includes("active")) {
          btn.classList.remove("active");
        }
      });
      openModal(modal, body);
      button.classList.add("active");
    });
  });
};

const desktopSizeCallback = () => {
  openModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (isTouchDevice) {
        dropdown.style.opacity = "0";
      }
      const modal = document.querySelector(button.dataset.modalTarget);
      openModal(modal, body);
      fixedNav.classList.remove("active");
    });
  });

  closeModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (isTouchDevice) {
        dropdown.style.opacity = "1";
      }
      const modal = button.closest(".modal");
      closeModal(modal, body);
      fixedNav.classList.add("active");
    });
  });

  modals.forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (isTouchDevice) {
        dropdown.style.opacity = "1";
      }
      const modalClassName =
        typeof e.srcElement.className === "string"
          ? e.srcElement.className
          : "no class";
      if (modalClassName.includes("modal active")) {
        const modals = document.querySelectorAll(".modal.active");
        modals.forEach((modal) => {
          closeModal(modal, body);
          fixedNav.classList.add("active");
        });
      }
    });
  });
};

if (ResizeObserver) {
  const robs = new ResizeObserver((entries) => {
    let windowSize = body.getBoundingClientRect();
    if (windowSize.width < 832) {
      phoneSizeCallback();
    } else {
      openModalButtons.forEach((btn) => {
        if (btn.className.includes("active")) {
          btn.classList.remove("active");
        }
      });
      desktopSizeCallback();
    }
  });

  robs.observe(body);
} else {
  if (phoneLand.matches) {
    phoneSizeCallback();
  } else {
    desktopSizeCallback();
  }
}

if (phoneLand.matches) {
  openModalButtons[0].classList.add("active");
  modals[0].classList.add("active");
}

//F.A.Q TOGGLE

const questionsBtn = document.querySelectorAll("[data-question]");
const answers = document.querySelectorAll("[data-answer]");
const questions = document.querySelectorAll(".faq__question");

questionsBtn.forEach((question, idx) => {
  question.addEventListener("click", () => {
    let activeIdx;
    questionsBtn.forEach((q) => {
      if (q.className.includes("active")) {
        activeIdx = q.dataset.question;
      }
    });

    answers[idx].classList.toggle("active");
    question.classList.toggle("active");
    questions[idx].classList.toggle("active");

    answers[activeIdx].classList.remove("active");
    questionsBtn[activeIdx].classList.remove("active");
    questions[activeIdx].classList.remove("active");
  });
});
