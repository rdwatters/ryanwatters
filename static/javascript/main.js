//global variables for scroll on M+ screens
"use strict";

var header = $(".header"),
    wScrollCurrent = 0,
    wScrollBefore = 0,
    wScrollDiff = 0;

window.onload = init;

function init() {
    //mobile menu toggle (off-canvas)
    var mobileButton = document.getElementById("toggle-mobile-navigation");
    mobileButton.onclick = toggleMobileMenu;
    if (window.outerWidth > 768) {
        headerScroll();
    }
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

//CLEARING OUT THE HEADER ON SCROLL--WILL ONLY ACTIVATE IN M+ SCREEN SIZES
function headerScroll() {
    $(window).on("scroll", function () {
        var headerHeight = $(".header").height();
        wScrollCurrent = $(window).scrollTop();
        wScrollDiff = wScrollBefore - wScrollCurrent;
        if (wScrollCurrent <= headerHeight) {
            header.removeClass("hide-header");
        } else if (wScrollDiff > 0) {
            header.removeClass("hide-header");
        } else if (wScrollDiff < 0) {
            header.addClass("hide-header");
        }
        wScrollBefore = wScrollCurrent;
    });
}
//# sourceMappingURL=main.js.map