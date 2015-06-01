var mobileOS = true;

// $(function() {
    $('.play-button').click(function(el) {
        var firstPlayRegEx = new RegExp('firstplay', 'i');
        var thisClass = $(this).attr('class');
        if(firstPlayRegEx.test(thisClass) && (window.outerWidth >= 1000)){
            $('li.post:first-child h3').toggleClass('movie-playing');
        }
        var iframe = document.createElement('iframe');
        var firstPlay = $('li.post:first-child .play-button');
        var theService = $(this).prev('img').attr('data-streaming');
        var theVideoId = $(this).prev('img').attr('data-videoid');
        console.log(theVideoId);
        if (theService == "youtube") {
            iframe.setAttribute('src', '//www.youtube.com/embed/' + theVideoId + '?autoplay=1&autohide=2&border=0&wmode=opaque&enablejsapi=1&controls=1&showinfo=0&rel=0');
        } else if (theService == "vimeo") {
            iframe.setAttribute('src', '//player.vimeo.com/video/' + theVideoId + '?autoplay=1&title=0&byline=0&portrait=0');
        } else {
            console.log("If you are getting this error in the console, it is probably a sign that the youtube or vimeo api with embedly has changed, especially if the issue is that you are not getting the correct \"videoid\" being written to the page.");
        }
        //The parameters for the video embed are set to show video controls but disallow related information at the video's end.
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('class', 'video-iframe');
        $(this).replaceWith(iframe);
    });

// });
(function() {
    if (navigator.userAgent.match(/iphone/gi) || navigator.userAgent.match(/ipad/gi) || navigator.userAgent.match(/android/gi)) {
        mobileOS = true;
    } else {
        mobileOS = false;
    }
    return mobileOS;
})()
/*GLOBAL VARS FOR HEADER FADE ON SCROLL - THIS SCROLL IS ONLY SET TO WORK ON FULL-LENGTH ARTICLE PAGES*/
var header = $('.header'),
    wScrollCurrent = 0,
    wScrollBefore = 0,
    wScrollDiff = 0;

$(document).ready(function() {
    $('#search-icon,#close-search').click(function() {
        var searchInput = $('#search-input');
        $('.search-wrapper').toggleClass('search-open');
        $('.main').toggleClass('faded');
        if($('.search-wrapper.search-open')){
            $('#close-search').attr('aria-hidden','false');
        }else{
            $('#close-search').attr('aria-hidden','true');
        }
        if (!searchInput.activeElement) {
            searchInput.focus();
        }
    });
    //close search overlay on M+ screens using the esc key
    window.onkeydown = function(e) {
        //bind escape key
        //if pressed when search wrapper is open, toggle class off to close search
        if (e.keyCode === 27 && $('.search-wrapper.search-open').length > 0) {
            $('.search-wrapper').removeClass('search-open');
            $('.main').removeClass('faded');
        }
    };
    //toggle mobile menu
    $('#mobile-menu-toggle,.main.menu-open').on('click', function() {
        $('.header,.main,.footer,.search-wrapper,#mobile-menu-toggle').toggleClass('menu-open');
    });
    $(function() {
        var shareButtonMobile = $('.share-button');
        if (!shareButtonMobile) {
            return;
        } else {
            shareButtonMobile.click(function(e) {
                e.preventDefault();
                $('.social-media-icons-bar,.share').addClass('icon-bar-open');
            });
        }
        $('.close-social-buttons').click(function(e) {
            e.preventDefault();
            $('.social-media-icons-bar,.share').removeClass('icon-bar-open');
        });
    });
    //toggle classes that shift video down for M+ screens in articles with header/feature videos at the top
    $('.play-button-small').on('click', function() {
        if ($('.full-length.film-playing').length === 0) {
            var headerHeight = $('.header').height();
            $('.full-length').toggleClass('film-playing');
            $('.play-button').remove();
            window.scrollTo(0, 0);
        }
        var iframe = document.createElement('iframe'),
            thumbNail = $('.video-thumb'),
            videoBlock = thumbNail.parent();
        if (videoBlock.attr('class') === "video-player-youtube") {
            iframe.setAttribute('src', '//www.youtube.com/embed/' + videoBlock.attr('data-youtubeid') + '?autoplay=1&autohide=2&border=0&wmode=opaque&enablejsapi=1&controls=1&showinfo=0&rel=0');
            $('div.play-button').remove();
        } else if (videoBlock.attr('class') === "video-player-vimeo") {
            iframe.setAttribute('src', '//player.vimeo.com/video/' + videoBlock.attr('data-vimeoid') + '?autoplay=1');
        } else {
            console.log("you are not gettting what you want!");
        }
        //set iframe attributes
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('class', 'video-iframe');
        thumbNail.replaceWith(iframe);
        $('.introduction').addClass('relative');
        $('.play-button-small').fadeOut('slow');
    });
});
/*Article-level navigation for full-length articles with higher word count and at least THREE H3 headings on the page.*/
//Pull  
$(function() {
    if (($('aside.article-navigation > ul') && !mobileOS) && $('article h3').length >= 3) {
        $('article h3').each(function() {
            var headingId = $(this).attr('id'),
                headingText = $(this).text(),
                listItem = '<li><a href="#' + headingId + '\">' + headingText + '</a></li>';
            $('aside.article-navigation > ul').append(listItem);
        });
    } else {
        console.log('no secondary navigation');
        $('aside.article-navigation').remove();
    }
});
