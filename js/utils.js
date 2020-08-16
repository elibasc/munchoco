//SMOOTH SCROLL FUNCTION

const smoothScroll = (targetSection, duration, position = 0) => {
  let target = document.querySelector(targetSection);
  let targetPosition = target.getBoundingClientRect().top;
  let startingPosition = window.pageYOffset;
  let distance =
    targetPosition - startingPosition > 0
      ? targetPosition - startingPosition - position
      : -(-targetPosition - startingPosition) - startingPosition - position;
  let startTime = null;

  Math.easeInOutQuad = function (t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  const scrollAnimation = (currentTime) => {
    if (startTime === null) startTime = currentTime;
    let timeElapsed = currentTime - startTime;
    let run = Math.easeInOutQuad(
      timeElapsed,
      startingPosition,
      distance,
      duration
    );

    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(scrollAnimation);
  };

  requestAnimationFrame(scrollAnimation);
};

const addScroll = (startingPoint, targetPoint, position) => {
  let start = document.querySelector(startingPoint);
  start.addEventListener("click", (e) => {
    e.preventDefault();
    smoothScroll(targetPoint, 1000, position);
  });
};

//POPUP MODAL FUNCTIONS:

const openModal = (modal, body) => {
  if (modal == null) return;
  modal.classList.add("active");
  overlay.classList.add("active");
  if (phoneLand.matches) {
    body.style.overflow = "auto";
  } else {
    body.style.overflow = "hidden";
  }
};

const closeModal = (modal, body) => {
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
  body.style.overflow = "auto";
};

//NAV INDICATOR CHECK FUNCTION:

const navCheck = (id, container, indicator) => {
  const activeAnchor = container.querySelector(`[data-page=${id}]`);
  const anchorCoord = activeAnchor.getBoundingClientRect();
  const containerCoord = container.contains(dropdown)
    ? dropdown.getBoundingClientRect()
    : 0;
  const position = {
    width: anchorCoord.width,
    left: anchorCoord.left - (containerCoord.left ? containerCoord.left : 0),
  };
  indicator.style.setProperty("left", `${position.left}px`);
  indicator.style.setProperty("width", `${position.width}px`);
};

const sectionIndicator = (container, indicator) => {
  sections.forEach((section) => {
    const className = section.className;
    const id = section.id;
    ScrollTrigger.create({
      trigger: `.${className}`,
      start: "top 60%",
      end: "bottom 60%",
      onEnter: () => navCheck(id, container, indicator),
      onEnterBack: () => navCheck(id, container, indicator),
      onLeaveBack: () => {
        if (className === "section-about")
          indicator.style.setProperty("width", "0px");
      },
    });
  });
};
