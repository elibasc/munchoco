const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

const phone = window.matchMedia("(max-width: 600px)");
const phoneLand = window.matchMedia("(max-width: 832px)");
const tabPort = window.matchMedia("(max-width: 982px)");
const tabLand = window.matchMedia("(max-width: 1302px)");
const bigDesktop = window.matchMedia("(max-width: 1800px)");

//PHONE NAVIGATION SCROLLS

if (phoneLand.matches) {
  addScroll("#phone-about", "#about");
  addScroll("#phone-treats", "#treats");
  addScroll("#phone-contact", "#contact");
  addScroll("#phone-faq", "#faq");
}
