/* ==========================================================================
   dantilsley.com — Navigation Script (Milestone 1)
   ========================================================================== */

(function () {
  "use strict";

  var toggle  = document.querySelector(".nav__toggle");
  var menu    = document.querySelector(".nav__menu");
  var links   = menu ? menu.querySelectorAll(".nav__link") : [];

  if (!toggle || !menu) return;

  /**
   * Open the mobile menu.
   */
  function openMenu() {
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
    menu.setAttribute("aria-hidden", "false");
  }

  /**
   * Close the mobile menu.
   */
  function closeMenu() {
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    menu.setAttribute("aria-hidden", "true");
  }

  /**
   * Toggle the mobile menu open/closed.
   */
  function toggleMenu() {
    var isExpanded = toggle.getAttribute("aria-expanded") === "true";
    if (isExpanded) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  // Hamburger button click
  toggle.addEventListener("click", toggleMenu);

  // Close when a menu link is activated
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener("click", closeMenu);
  }

  // Escape key closes the menu
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && menu.getAttribute("aria-hidden") === "false") {
      closeMenu();
      toggle.focus();
    }
  });

})();
