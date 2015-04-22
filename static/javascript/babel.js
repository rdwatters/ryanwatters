//global variables for scroll on M+ screens
var header = document.querySelector('.header'),
    wScrollCurrent = 0,
    wScrollBefore = 0,
    wScrollDiff = 0;
    window.onload = init;

function init() {
    //mobile menu toggle (off-canvas)
    var mobileButton = document.getElementById('toggle-mobile-navigation');
    var searchButton = document.getElementById('search-icon');
    mobileButton.onclick = toggleMobileMenu;
    searchButton.onclick = toggleSearchOverlay;
    //do not initialize the header transition on M & smaller screens
    if (window.outerWidth > 768) {
        window.onscroll = function() {
            changeMenu();
        };
    }
    typeOfDevice();
}


function typeOfDevice(){
    // var phoneType = document.getElementById('phoneType');
    var device = navigator.userAgent;
    var apple = ( device.match(/iphone/gi) ? 'iPhone' : device.match(/mac/gi) ? 'Macintosh' : false);
    
    if(apple){
        phoneType.innerHTML = apple;
    }else{
        phoneType.innerHTML = "NO DICE!";
    }
}

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
        theButton = document.getElementById('toggle-mobile-navigation'),
        theFooter = document.getElementsByTagName('footer')[0];
    if (mainMenu.classList.contains('menu-open')) {
        console.log('Hello!');
        mainMenu.classList.remove('menu-open');
        mainContent.classList.remove('menu-open');
        theFooter.classList.remove('menu-open');
        theButton.classList.remove('menu-open');
        theButton.setAttribute('aria-expanded', 'false');
    } else {
        mainMenu.classList.add('menu-open');
        mainContent.classList.add('menu-open');
        theFooter.classList.add('menu-open');
        theButton.classList.add('menu-open');
        theButton.setAttribute('aria-expanded', 'true');
    }
}


function toggleSearchOverlay(event) {
    event.preventDefault();
    console.log('click is working');
}
