console.log("HELLO!");
window.onscroll = headerFadeOnScroll;
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

$(function() {
    var headerHeight = $('.header').height() + 10,
        socialBar = $('.social-media-icons-bar'),
        socialBarWidth = socialBar.width(),
        socialBarOffset = socialBar.offset(),
        socialBarY = socialBarOffset.top,
        socialBarX = socialBarOffset.left,
        socialBarHeaderDiff = (socialBarY - headerHeight);
    // socialBarXpositionFixed = socialBarX - 
    $(window).scroll(function() {
        if ($(window).scrollTop() >= socialBarHeaderDiff) {
            console.log('it is registering!');
            socialBar.css({
                'position': 'fixed',
                'top': headerHeight,
                'left': socialBarX
            });
        } else {
            socialBar.css({
                'position': '',
                'top': '',
                'left': ''
            });
        }
    });

});
