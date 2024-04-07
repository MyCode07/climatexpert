// import './utils/smoothscrol.js';
// import { maskInputs } from "./static/inputmask.js";
// import { accorden } from "./static/accordeon.js";
import { runTicker } from "./static/ticker.js";
import { replaceDomElements } from "./static/replace.js";
// import { animateAction, animateStaggerAction, animateSVGStaggerAction, ainmateFooterLogo } from "./parts/animations.js";
// import { playVideoAction } from "./parts/video.js";
// import { termsTabAction } from "./parts/term-tabs.js";

// import "./parts/sliders.js";
import "./parts/popup.js";
import "./parts/header.js";
import "./parts/menu.js";
import "./parts/tabs.js";
// import "./parts/services.js";
// import "./parts/forms.js";
// import "./parts/show-more.js";
import "./static/ticker.js";
// accorden();
// playVideoAction();
// animateStaggerAction();
// animateAction();
// animateSVGStaggerAction();
// ainmateFooterLogo();
replaceDomElements();
// termsTabAction();
runTicker();

// maskInputs('+7 999 999 99 99', '[name="phone"]')


import { Fancybox } from "@fancyapps/ui";
Fancybox.bind("[data-fancybox]", {
});
