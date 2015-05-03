//Quick and dirty browser sniff for mobile devices:
var mobileOS = false;
if (navigator.userAgent.match(/iphone/gi) || navigator.userAgent.match(/ipad/gi) || navigator.userAgent.match(/android/gi)) {
    mobileOS = true;
}

/*Remove static image from video players and replace with embedded YouTube video*/
//Modified considerably from http://www.labnol.org/internet/light-youtube-embeds/27941/
(function() {
    //get all youtube wrappers
    var youtubeWrappers = document.getElementsByClassName("video-player-youtube");
    var vimeoWrappers = document.getElementsByClassName("video-player-vimeo");
    //iterate over yt wrappers
    for (var n = 0; n < youtubeWrappers.length; n++) {
        var childrenElements = youtubeWrappers[n].childNodes;
        var playButtonDiv = childrenElements[childrenElements.length - 2];
        playButtonDiv.onclick = replaceThumbnailWithIframe;
    }
    for (var n = 0; n < vimeoWrappers.length; n++) {
        var childrenElements = vimeoWrappers[n].childNodes;
        var playButtonDiv = childrenElements[childrenElements.length - 2];
        playButtonDiv.onclick = replaceThumbnailWithIframe;
    }
})();

function replaceThumbnailWithIframe() {
    var streamingService = this.parentNode.className;
    console.log(streamingService);
    var iframe = document.createElement("iframe");
    if (streamingService == "video-player-youtube") {
        iframe.setAttribute("src", "//www.youtube.com/embed/" + this.parentNode.dataset.youtubeid + "?autoplay=1&autohide=2&border=0&wmode=opaque&enablejsapi=1&controls=1&showinfo=0&rel=0");
    }else if (streamingService == "video-player-vimeo") {
        iframe.setAttribute("src", "//player.vimeo.com/video/" + this.parentNode.dataset.vimeoid + "?autoplay=1");
    }

    //The parameters for the video embed are set to show the controls but disallow related information at the video's end.

    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("class", "video-iframe");
    this.parentNode.replaceChild(iframe, this);
}


//global variables for scroll on M+ screens
var header = document.querySelector('.header'),
    wScrollCurrent = 0,
    wScrollBefore = 0,
    wScrollDiff = 0;
window.onload = init;

function init() {
    //mobile menu toggle (off-canvas)
    var mobileButton = document.getElementById('mobile-menu-toggle'),
    searchButton = document.getElementById('search-icon');
    mobileButton.onclick = toggleMobileMenu;
    searchButton.onclick = toggleSearch;
    //do not initialize the header transition (headerFadeOnScroll) on M & larger screens
    if (window.outerWidth < 768) {
        window.onscroll = function() {
            headerFadeOnScroll();
        };
    }
}

//HEADER FADES IN AND OUT ON SCROLL - SEE function init to check if 
function headerFadeOnScroll() {
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

//TOGGLE MOBILE MENU ON CLICK AS WELL AS CHANGE ARIA ATTRIBUTES ON MOBILE MENU FOR ACCESSIBILITY
function toggleMobileMenu() {
        var mainMenu = document.getElementsByTagName('header')[0],
            mainContent = document.querySelector('.main'),
            theButton = document.getElementById('mobile-menu-toggle'),
            theFooter = document.getElementsByTagName('footer')[0];
        if (classie.has(mainMenu, 'menu-open')) {
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
    var searchWrap = document.querySelector('.search-wrap'),
        searchInput = document.getElementById('st-search-input');
    classie.toggle(searchWrap, 'search-open');
    if (!searchInput.activeElement) {
        searchInput.focus();
    }
}
