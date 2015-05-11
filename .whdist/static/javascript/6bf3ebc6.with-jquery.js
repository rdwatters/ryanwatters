(function modifyAlt() {
    var theImages = $('p > img');
    theImages.each(function() {
        var getClass = $(this).attr('alt').split('.')[1];
        var theAltText = $(this).attr('alt').split('.')[0];
        $(this).addClass(getClass).attr('alt', theAltText);
    });
})();
$(function() {
    var headerHeight = $('header').height() + 10;
    console.log(headerHeight);
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > headerHeight) {
            $('social-media-icons-bar').addClass('sticky-social');
        } else {
            $('social-media-icons-bar').removeClass('sticky-social');
        }
    });
});

$('#mobile-menu-toggle').on('click',function(){
    $('.header,.main,#mobile-menu-toggle,.footer').toggleClass('menu-open');
});