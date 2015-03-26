// var el = $('header');

// if(!el.length) return true;

// var wScrollCurrent = 0;
// var wScrollBefore = 0;
// var wScrollDiff = 0;

// $(window).on('scroll', function() {
//   wScrollCurrent = $(window).scrollTop();
//   wScrollDiff = wScrollBefore - wScrollCurrent;

//   // default state at top
//   if(wScrollCurrent <= 0)
//     el.removeClass('hide')

//   // scroll up
//   else if(wScrollDiff > 0)
//     el.removeClass('hide')
//   // scroll down
//   else if((wScrollDiff < 0) && ($('nav .menu.active').length) === 0)
//     el.addClass('hide')

//   wScrollBefore = wScrollCurrent;
// });