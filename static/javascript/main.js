"use strict";

window.onload = init;
function init() {
    //mobile menu toggle (off-canvas)
    var mobileButton = document.getElementById("toggle-mobile-navigation");
    mobileButton.onclick = toggleMobileMenu;
}
//toggle the mobile menu as well as modify aria attributes
function toggleMobileMenu() {
    var mainMenu = document.getElementsByTagName("header")[0],
        mainContent = document.querySelector(".main"),
        theButton = document.getElementById("toggle-mobile-navigation"),
        theFooter = document.getElementsByTagName("footer")[0];
    if (mainMenu.classList.contains("menu-open")) {
        console.log("Hello!");
        mainMenu.classList.remove("menu-open");
        mainContent.classList.remove("menu-open");
        theFooter.classList.remove("menu-open");
        theButton.classList.remove("menu-open");
        theButton.setAttribute("aria-expanded", "false");
    } else {
        mainMenu.classList.add("menu-open");
        mainContent.classList.add("menu-open");
        theFooter.classList.add("menu-open");
        theButton.classList.add("menu-open");
        theButton.setAttribute("aria-expanded", "true");
    }
}
//# sourceMappingURL=main.js.map