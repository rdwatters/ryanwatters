//Quick and dirty browser sniff for mobile devices:
var mobileOS = false;
if (navigator.userAgent.match(/iphone/gi) || navigator.userAgent.match(/ipad/gi) || navigator.userAgent.match(/android/gi)) {
    mobileOS = true;
}
if(!mobileOS){
    console.log('You are not using a mobile phone right now.');
}
/*Remove static image from video players and replace with embedded YouTube video*/
//Modified considerably from http://www.labnol.org/internet/light-youtube-embeds/27941/
(function() {
    //get all youtube wrappers
    var youTubeWrappers = document.getElementsByClassName("youtube-player");
    //iterate over yt wrappers
    for (var n = 0; n < youTubeWrappers.length; n++) {
        var childrenElements = youTubeWrappers[n].childNodes;
        var playButtonDiv = childrenElements[childrenElements.length - 2];
        playButtonDiv.onclick = labnolIframe;
    }
})();

function labnolIframe() {
    var iframe = document.createElement("iframe");
    //The parameters for the video embed are set to show the controls but disallow related information at the video's end.
    iframe.setAttribute("src", "//www.youtube.com/embed/" + this.parentNode.dataset.youtubeid + "?autoplay=1&autohide=2&border=0&wmode=opaque&enablejsapi=1&controls=1&showinfo=0&rel=0");
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("id", "youtube-iframe");
    this.parentNode.replaceChild(iframe, this);
}

window.addEventListener('scroll', changeMenu, false);
//global variables for scroll on M+ screens
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
        window.onscroll = function() {
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
        theFooter = document.getElementsByTagName('footer')[0];
    if (classie.has(mainMenu,'menu-open')) {
        console.log('Hello!');
        classie.remove(mainMenu,'menu-open');
        classie.remove(mainContent,'menu-open');
        classie.remove(theFooter,'menu-open');
        classie.remove(theButton, 'menu-open');
        classie.remove(searchForm, 'menu-open');
        theButton.setAttribute('aria-expanded', 'false');
    } else {
        classie.add(mainMenu,'menu-open');
        classie.add(mainContent,'menu-open');
        classie.add(theFooter,'menu-open');
        classie.add(theButton,'menu-open');
        classie.add(searchForm, 'menu-open');
        theButton.setAttribute('aria-expanded', 'true');
    }
}
//Toggle the full-screen search overlay
function toggleSearch() {
    console.log("Hello! " + Math.random());
    var searchWrap = document.querySelector('.search-wrap'),
    searchInput = document.getElementById('st-search-input');
    classie.toggle(searchWrap, 'search-open');
    if(!searchInput.activeElement){
        searchInput.focus();
    }
}