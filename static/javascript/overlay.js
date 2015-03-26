(function() {
  var triggerBttn = document.getElementById('trigger-overlay'),
    overlay = document.querySelector('div.overlay'),
    closeBttn = overlay.querySelector('button.close-search'),
    transEndEventNames = {
      'WebkitTransition': 'webkitTransitionEnd',
      'MozTransition': 'transitionend',
      'OTransition': 'oTransitionEnd',
      'msTransition': 'MSTransitionEnd',
      'transition': 'transitionend'
    },
    transEndEventName = transEndEventNames[Modernizr.prefixed('transition')],
    support = {
      transitions: Modernizr.csstransitions
    };

  function toggleOverlay() {
    if (classie.has(overlay, 'open')) {
      classie.remove(overlay, 'open');
      classie.add(overlay, 'close');
      var onEndTransitionFn = function(ev) {
        if (support.transitions) {
          if (ev.propertyName !== 'visibility') return;
          this.removeEventListener(transEndEventName, onEndTransitionFn);
        }
        classie.remove(overlay, 'close');
      };
      if (support.transitions) {
        overlay.addEventListener(transEndEventName, onEndTransitionFn);
      } else {
        onEndTransitionFn();
      }
    } else if (!classie.has(overlay, 'close')) {
      classie.add(overlay, 'open');
    }
    giveSearchFocus();

    function giveSearchFocus() {
      if (classie.has(overlay, 'open')) {
        var searchInput = document.querySelector('input.search');
        searchInput.focus();
      }
    }
  }

  triggerBttn.addEventListener('click', toggleOverlay);
  closeBttn.addEventListener('click', toggleOverlay);
  closeBttn.addEventListener('mouseenter', function() {
    if (window.outerWidth > 500) {
      closeBttn.innerHTML = "Close Search";
    } else {
      closeBttn.innerHTML = "X";
    }
  });
  closeBttn.addEventListener('mouseleave', function() {
    closeBttn.innerHTML = "X";
  });
})();
