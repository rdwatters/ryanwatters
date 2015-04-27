//global variables for scroll on M+ screens
'use strict';

var header = document.querySelector('.header'),
    wScrollCurrent = 0,
    wScrollBefore = 0,
    wScrollDiff = 0;
window.onload = init;

function init() {
    //mobile menu toggle (off-canvas)
    var mobileButton = document.getElementById('mobile-menu-toggle');
    var searchButton = document.getElementById('search-icon');
    mobileButton.onclick = toggleMobileMenu;
    searchButton.onclick = toggleSearch;
    //do not initialize the header transition on M & smaller screens
    if (window.outerWidth > 768) {
        window.onscroll = function () {
            changeMenu();
        };
    }
}

//HEADER FADES IN AND OUT ON SCROLL
function changeMenu() {
    var theHeader = document.getElementsByTagName('header')[0],
        headerHeight = parseInt(theHeader.clientHeight);
    wScrollCurrent = window.pageYOffset | document.body.scrollTop;
    wScrollDiff = wScrollBefore - wScrollCurrent;
    if (wScrollCurrent <= headerHeight) {
        theHeader.classList.remove('hide-header');
    } else if (wScrollDiff > 0) {
        theHeader.classList.remove('hide-header');
    } else if (wScrollDiff < 0) {
        theHeader.classList.add('hide-header');
    }
    wScrollBefore = wScrollCurrent;
}

//toggle the mobile menu as well as modify ARIA attributes
function toggleMobileMenu() {
    var mainMenu = document.getElementsByTagName('header')[0],
        mainContent = document.querySelector('.main'),
        theButton = document.getElementById('mobile-menu-toggle'),
        searchForm = document.querySelector('div.search-wrap'),
        theFooter = document.getElementsByTagName('footer')[0];
    if (classie.has(mainMenu, 'menu-open')) {
        console.log('Hello!');
        classie.remove(mainMenu, 'menu-open');
        classie.remove(mainContent, 'menu-open');
        classie.remove(theFooter, 'menu-open');
        classie.remove(theButton, 'menu-open');
        classie.remove(searchForm, 'menu-open');
        theButton.setAttribute('aria-expanded', 'false');
    } else {
        classie.add(mainMenu, 'menu-open');
        classie.add(mainContent, 'menu-open');
        classie.add(theFooter, 'menu-open');
        classie.add(theButton, 'menu-open');
        classie.add(searchForm, 'menu-open');
        theButton.setAttribute('aria-expanded', 'true');
    }
}
//Toggle the full-screen search overlay
function toggleSearch() {
    console.log('Hello! ' + Math.random());
    var searchWrap = document.querySelector('.search-wrap'),
        searchInput = document.getElementById('st-search-input');
    classie.toggle(searchWrap, 'search-open');
    if (!searchInput.activeElement) {
        searchInput.focus();
    }
}

//PLAYING WITH BROWSER SNIFFING
// function typeOfDevice(){
//     // var phoneType = document.getElementById('phoneType');
//     var device = navigator.userAgent;
//     var apple = ( device.match(/iphone/gi) ? 'iPhone' : device.match(/mac/gi) ? 'Macintosh' : false);

//     if(apple){
//         phoneType.innerHTML = apple;
//     }else{
//         phoneType.innerHTML = "NO DICE!";
//     }
// }
//# sourceMappingURL=main.js.map