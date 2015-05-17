var mobileOS = true;

(function() {
    if (navigator.userAgent.match(/iphone/gi) || navigator.userAgent.match(/ipad/gi) || navigator.userAgent.match(/android/gi)) {
        mobileOS = true;
    } else {
        mobileOS = false;
    }
    return mobileOS;
})()

console.log(mobileOS);


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
        $('.full-length').toggleClass('film-playing');
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
    $('.play-button-small').on('click', function() {
        if ($('.full-length.film-playing').length === 0) {
            $('.full-length').toggleClass('film-playing');
            $('.play-button').remove();
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
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('class', 'video-iframe');
        thumbNail.replaceWith(iframe);
    });


});

$(function() {
    if ($('aside.article-navigation > ul') && !mobileOS) {
        $('article h3').each(function() {
            var headingId = $(this).attr('id'),
                headingText = $(this).text(),
                listItem = '<li><a href="#' + headingId + '\">' + headingText + '</a></li>';
            $('aside.article-navigation > ul').append(listItem);
            console.log(listItem);
        });
    }
    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            var headerHeight = $('.header').height();
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - headerHeight
                }, 500);
                return false;
            }
        }
    });
});

$(document).ready(function() {
    var mobileOS = true;
    //MINI BROWSER SNIFF (ONLY IOS AND ANDROID)            
    if (navigator.userAgent.match(/iphone/gi) || navigator.userAgent.match(/ipad/gi) || navigator.userAgent.match(/android/gi)) {
        mobileOS = true;
    } else {
        mobileOS = false;
    }

    var hasContainer = $('.js-paginate').length > 0;
    //Check if there is no paginate container OR if user is accessing via mobile OS.
    if (!hasContainer || mobileOS) {
        //If on mobile, show pagination buttons and return the function to prevent infinite-scroll
        $('.article-pagination').show().attr('aria-hidden', false);
        $(window).unbind('scroll');
        return;
    }
    //Basic wh pagination
    var nextPage = $('.js-paginate').attr('data-next-page');
    var maxPage = $('.js-paginate').attr('data-max-page');
    var removeFirst = $('.js-paginate').attr('data-remove-first');

    if (maxPage === window.location.pathname) {
        return;
    }

    var finishedLoading = false;
    var loading = false;
    $(window).scroll(function() {
        if (loading || finishedLoading) {
            return;
        }

        var container = $('.js-paginate');
        var bottomOfContainer = container.position().top + container.outerHeight(true);
        var scrollBottom = $(window).scrollTop() + $(window).height();
        if (scrollBottom > bottomOfContainer) {
            loading = true;
            $('#spinner').show();

            $.ajax({
                url: nextPage,
                success: function(html) {
                    if (html) {
                        var targetHtml = $(html).find('.js-paginate');

                        if (nextPage === maxPage) {
                            finishedLoading = true;
                        }

                        nextPage = targetHtml.attr('data-next-page');

                        if (nextPage) {
                            if (removeFirst)
                                targetHtml.find('li').first().remove();

                            $(".js-paginate").append(targetHtml.html());
                        } else {
                            finishedLoading = true;
                        }

                        $('#spinner').hide();
                    } else {
                        finishedLoading = true;
                        $('#spinner').hide();
                    }

                    loading = false;
                }
            });
        }
    });
});
