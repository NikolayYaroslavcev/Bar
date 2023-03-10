'use strict';

$(document).ready(vi);
/*
 **	add in header.php before html
 **
 **	<?php
 **	$vi = '';
 **	if(isset($_COOKIE['vi-conf'])) {
 **	  $vi = $_COOKIE['vi-conf'];
 **	}
 **	?>
 */

/*
 **	add in header.php in body class attr
 **
 **	<?php echo $vi; ?>
 */

function vi() {
  // variables declaring
  var body = $('html'),
    viSwOnBtn = '.vi-sw-on-btn',
    viSwOffBtn = '.vi-sw-off-btn',
    viClose = '.vi-conf-close';
  var confState = '',
    bodyClassList = '',
    strPos = 0,
    oldClassName = '',
    activeBtn = ''; // config menu toggler
  // enable mode if it isn't

  body.on('click', viSwOnBtn, function () {
    $('.vi-conf').toggleClass('vi-conf--show');

    if (getCookie('vi') !== 'active') {
      document.cookie = 'vi=active; path=/;';
      $('.vi-conf-option .vi-conf-btn:nth-of-type(1)').addClass('vi-conf-btn--active');
      configState();
    } else {
      activeBtnState();
    }

    return false;
  }); // disable mode if it isn't

  body.on('click', viSwOffBtn, function () {
    if (getCookie('vi') === 'active') {
      document.cookie = 'vi=not-active; path=/; max-age=-1';
      document.cookie = 'vi-conf= ; path=/; max-age=-1';
      $('.vi-conf').removeClass('vi-conf--show');
      $('.vi-conf-btn--active').removeClass('vi-conf-btn--active');
      bodyClassHandler();
    }

    return false;
  }); // config menu close

  body.on('click', viClose, function () {
    $('.vi-conf').removeClass('vi-conf--show');
    return false;
  }); // switch mode settings

  body.on('click', '.vi-conf-btn[data-vi]', function () {
    $(this).siblings('.vi-conf-btn--active').removeClass('vi-conf-btn--active');
    $(this).addClass('vi-conf-btn--active');
    configState();
    return false;
  }); // config state

  function configState() {
    confState = '';
    $('.vi-conf-btn--active').each(function () {
      confState += $(this).attr('data-vi');
    });
    bodyClassHandler();
    body.addClass('vi-' + confState);
    document.cookie = 'vi-conf=vi-' + confState + '; path=/;';
  } // body class handler

  function bodyClassHandler() {
    bodyClassList = body.attr('class');

    if (bodyClassList !== undefined) {
      strPos = bodyClassList.indexOf('vi-');
      oldClassName = bodyClassList.slice(strPos, strPos + 15);
    }

    body.removeClass(oldClassName);
  } // active button state

  function activeBtnState() {
    for (var i = 3, j = 6; i <= 12 && j <= 15; i += 3, j += 3) {
      activeBtn = getCookie('vi-conf').slice(i, j);
      $('.vi-conf-btn[data-vi="' + activeBtn + '"]').addClass('vi-conf-btn--active');
    }
  } // get cookie val

  function getCookie(name) {
    var val = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return val ? decodeURIComponent(val[1]) : undefined;
  }
}
