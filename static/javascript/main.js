/*GLOBAL VARS FOR HEADER FADE ON SCROLL */
var header = $('.header'),
    wScrollCurrent = 0,
    wScrollBefore = 0,
    wScrollDiff = 0;

$(document).ready(function() {
    $('#search-icon,#search-close-button').on('click', function() {
        var searchInput = $('#search-input');
        $('.search-wrapper').toggleClass('search-open');
        if (!searchInput.activeElement) {
            searchInput.focus();
        }
    });
    window.onkeydown = function(e) {
        //bind escape key
        //if pressed when search wrapper is open, toggle class off to close search
        if (e.keyCode === 27 && $('.search-wrapper.search-open').length > 0) { 
            $('.search-wrapper').toggleClass('search-open');
        }
    };
    $('#mobile-menu-toggle').on('click', function() {
        $('.header,.main,.footer,.search-wrapper,#mobile-menu-toggle').toggleClass('menu-open');
    });
    window.onscroll = headerFadeOnScroll;
    // window.addEventListener('scroll', stickySocialBar, false);
    /*HEADER FADES IN AND OUT ON SCROLL*/
    function headerFadeOnScroll() {
        var theHeader = document.getElementsByTagName('header')[0],
            theSiteName = document.querySelector('.site-name'),
            headerHeight = parseInt(theHeader.clientHeight);
        wScrollCurrent = window.pageYOffset | document.body.scrollTop;
        wScrollDiff = wScrollBefore - wScrollCurrent;
        if (wScrollCurrent <= headerHeight) {
            theHeader.classList.remove('hide-header');
            theSiteName.classList.remove('hide-header');
        } else if (wScrollDiff > 0) {
            theHeader.classList.remove('hide-header');
            theSiteName.classList.remove('hide-header');
        } else if (wScrollDiff < 0) {
            theHeader.classList.add('hide-header');
            theSiteName.classList.add('hide-header');
        }
        wScrollBefore = wScrollCurrent;
    }
    $(function() {
        var shareButtonMobile = $('.share-button');
        if (!shareButtonMobile) {
            return;
        } else {
            shareButtonMobile.click(function(e) {
                e.preventDefault();
                $('.social-media-icons-bar,.share').toggleClass('icon-bar-open');
            });
        }
    });
    $('.play-button').click(function() {
        console.log($(this).parent().attr('class'));
        $('.full-length-article').toggleClass('film-playing');
        var iframe = document.createElement('iframe');
        if ($(this).parent().attr('class') === 'video-player-youtube') {
            iframe.setAttribute('src', '//www.youtube.com/embed/' + $(this).parent().attr('data-youtubeid') + '?autoplay=1&autohide=2&border=0&wmode=opaque&enablejsapi=1&controls=1&showinfo=0&rel=0');
        } else if ($(this).parent().attr('class') == 'video-player-vimeo') {
            iframe.setAttribute('src', '//player.vimeo.com/video/' + $(this).parent().attr('data-vimeoid') + '?autoplay=1');
        }
        //The parameters for the video embed are set to show video controls but disallow related information at the video's end.
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('class', 'video-iframe');
        $(this).replaceWith(iframe);
    });

});
