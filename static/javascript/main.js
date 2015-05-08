/*GLOBALS VARS FOR HEADER FADE ON SCROLL */
'use strict';

var header = document.querySelector('.header'),
    wScrollCurrent = 0,
    wScrollBefore = 0,
    wScrollDiff = 0;
window.onload = init;
function init() {
    var mobileToggleButton = document.getElementById('mobile-menu-toggle');
    mobileToggleButton.onclick = toggleMobileMenu;
    window.onscroll = headerFadeOnScroll;
}
function browserSniff() {
    // //MINI BROWSER SNIFF (ONLY IOS AND ANDROID)
    var mobileOS = false;
    if (navigator.userAgent.match(/iphone/gi) || navigator.userAgent.match(/ipad/gi) || navigator.userAgent.match(/android/gi)) {
        mobileOS = true;
    } else {
        mobileOS = false;
    }
    return mobileOS;
}

/*Remove static image from video players and replace with embedded YouTube video*/
//Modified considerably from http://www.labnol.org/internet/light-youtube-embeds/27941/
(function () {
    //get all youtube wrappers
    var youtubeWrappers = document.getElementsByClassName('video-player-youtube');
    var vimeoWrappers = document.getElementsByClassName('video-player-vimeo');
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

/*REPLACE VIDEO THUMBNAIL WITH STREAMING YOUTUBE/VIMEO VIDEO */
function replaceThumbnailWithIframe() {
    var streamingService = this.parentNode.className;
    console.log(streamingService);
    var iframe = document.createElement('iframe');
    if (streamingService == 'video-player-youtube') {
        iframe.setAttribute('src', '//www.youtube.com/embed/' + this.parentNode.dataset.youtubeid + '?autoplay=1&autohide=2&border=0&wmode=opaque&enablejsapi=1&controls=1&showinfo=0&rel=0');
    } else if (streamingService == 'video-player-vimeo') {
        iframe.setAttribute('src', '//player.vimeo.com/video/' + this.parentNode.dataset.vimeoid + '?autoplay=1');
    }

    //The parameters for the video embed are set to show video controls but disallow related information at the video's end.

    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('class', 'video-iframe');
    this.parentNode.replaceChild(iframe, this);
}

/*HEADER FADES IN AND OUT ON SCROLL - SEE function init to check if */

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

/*TOGGLE MOBILE MENU ON CLICK AS WELL AS CHANGE ARIA ATTRIBUTES ON MOBILE MENU FOR ACCESSIBILITY*/
function toggleMobileMenu() {
    var mainMenu = document.getElementsByTagName('header')[0].classList,
        mainContent = document.querySelector('.main').classList,
        theButton = document.getElementById('mobile-menu-toggle').classList,
        theFooter = document.getElementsByTagName('footer')[0].classList,
        theSearchOverlay = document.querySelector('.search-wrapper').classList;
    mainMenu.toggle('menu-open');
    mainContent.toggle('menu-open');
    theButton.toggle('menu-open');
    theFooter.toggle('menu-open');
    theSearchOverlay.toggle('menu-open');
    //IF YOU WANT TO SUPPORT IE9, INCLUDE THE CLASSIE.JS SCRIPT TAG IN BASE.HTML. YOU CAN THEN USE THE FOLLOWING COMMENTED CODE TO REPLACE THE ABOVE FOUR STATEMENTS (mainmenu.toggle -> theFotter.toggle)
    // if (classie.has(mainMenu, 'menu-open')) {
    //     classie.remove(mainMenu, 'menu-open');
    //     classie.remove(mainContent, 'menu-open');
    //     classie.remove(theFooter, 'menu-open');
    //     classie.remove(theButton, 'menu-open');
    //     classie.remove(searchForm, 'menu-open');
    //     theButton.setAttribute('aria-expanded', 'false');
    // } else {
    //     classie.add(mainMenu, 'menu-open');
    //     classie.add(mainContent, 'menu-open');
    //     classie.add(theFooter, 'menu-open');
    //     classie.add(theButton, 'menu-open');
    //     classie.add(searchForm, 'menu-open');
    //     theButton.setAttribute('aria-expanded', 'true');
    // }
}
var headerClassList = document.querySelector('header').classList;
console.log(headerClassList);

// TOGGLE SEARCH OVERLAY
function toggleSearch() {
    var searchWrap = document.querySelector('.search-wrap'),
        searchInput = document.getElementById('st-search-input');
    classie.toggle(searchWrap, 'search-open');
    if (!searchInput.activeElement) {
        searchInput.focus();
    }
}
//# sourceMappingURL=main.js.map