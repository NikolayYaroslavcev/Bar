const onYouTubeIframeAPIReady = (container, id) => {
  if (id) {
    return new YT.Player(container, {
      height: '315',
      width: '560',
      videoId: id,
      playerVars: { autoplay: 1, playsinline: 1 },
      playsinline: 1,
    });
  }
};

HTMLElement.prototype.slideToggle = function (duration, callback) {
  if (this.clientHeight === 0) {
    _s(this, duration, callback, true);
  } else {
    _s(this, duration, callback);
  }
};

HTMLElement.prototype.slideUp = function (duration, callback) {
  _s(this, duration, callback);
};

HTMLElement.prototype.slideDown = function (duration, callback) {
  _s(this, duration, callback, true);
};

const _s = (el, duration, callback, isDown) => {
  if (typeof duration === 'undefined') duration = 400;
  if (typeof isDown === 'undefined') isDown = false;

  el.style.overflow = 'hidden';
  if (isDown) el.style.display = 'block';

  var elStyles = window.getComputedStyle(el);

  var elHeight = parseFloat(elStyles.getPropertyValue('height'));
  var elPaddingTop = parseFloat(elStyles.getPropertyValue('padding-top'));
  var elPaddingBottom = parseFloat(elStyles.getPropertyValue('padding-bottom'));
  var elMarginTop = parseFloat(elStyles.getPropertyValue('margin-top'));
  var elMarginBottom = parseFloat(elStyles.getPropertyValue('margin-bottom'));

  var stepHeight = elHeight / duration;
  var stepPaddingTop = elPaddingTop / duration;
  var stepPaddingBottom = elPaddingBottom / duration;
  var stepMarginTop = elMarginTop / duration;
  var stepMarginBottom = elMarginBottom / duration;

  var start;

  function step(timestamp) {
    if (start === undefined) start = timestamp;

    var elapsed = timestamp - start;

    if (isDown) {
      el.style.height = stepHeight * elapsed + 'px';
      el.style.paddingTop = stepPaddingTop * elapsed + 'px';
      el.style.paddingBottom = stepPaddingBottom * elapsed + 'px';
      el.style.marginTop = stepMarginTop * elapsed + 'px';
      el.style.marginBottom = stepMarginBottom * elapsed + 'px';
    } else {
      el.style.height = elHeight - stepHeight * elapsed + 'px';
      el.style.paddingTop = elPaddingTop - stepPaddingTop * elapsed + 'px';
      el.style.paddingBottom = elPaddingBottom - stepPaddingBottom * elapsed + 'px';
      el.style.marginTop = elMarginTop - stepMarginTop * elapsed + 'px';
      el.style.marginBottom = elMarginBottom - stepMarginBottom * elapsed + 'px';
    }

    if (elapsed >= duration) {
      el.style.height = '';
      el.style.paddingTop = '';
      el.style.paddingBottom = '';
      el.style.marginTop = '';
      el.style.marginBottom = '';
      el.style.overflow = '';
      if (!isDown) el.style.display = 'none';
      if (typeof callback === 'function') callback();
    } else {
      window.requestAnimationFrame(step);
    }
  }

  window.requestAnimationFrame(step);
};

const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
    navigator.userAgent
  )
    ? true
    : false;
};

const isMobilePoint = () => window.matchMedia(`(max-width: ${MOBILE_POINT}px)`).matches;

const resizeFunction = (callbacks) => {
  let resizeTimer = null;

  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (callbacks.length) {
      callbacks.forEach((item) => {
        item();
      });
    }
  }, 250);
};

const setCssVariable = (name, value) => {
  root.style.setProperty(name, value);
};

const OVERFLOW_NODES = [document.querySelector('html'), document.querySelector('body')];

const getSiblings = (elem) => {
  let siblings = [],
    sibling = elem;

  while (sibling.previousSibling) {
    sibling = sibling.previousSibling;
    sibling.nodeType == 1 && siblings.push(sibling);
  }

  sibling = elem;

  while (sibling.nextSibling) {
    sibling = sibling.nextSibling;
    sibling.nodeType == 1 && siblings.push(sibling);
  }

  return siblings;
};

const scrollDisable = () => {
  OVERFLOW_NODES.map((item) => {
    if (item) {
      item.classList.add(OVERFLOW_SELECTOR);
    }
  });
};

const scrollEnable = () => {
  OVERFLOW_NODES.map((item) => {
    if (item) {
      item.classList.remove(OVERFLOW_SELECTOR);
    }
  });

  const dragToScrollNodes = document.querySelectorAll('.js-drag-to-scroll');
  if (dragToScrollNodes) {
    dragToScrollNodes.forEach((item) => {
      if (item) {
        item.classList.remove(ACTIVE_CLASS);
      }
    });
  }
};

const scrollToggle = () => {
  OVERFLOW_NODES.map((item) => {
    if (item) {
      item.classList.toggle(OVERFLOW_SELECTOR);
    }
  });
};

const menuBgOverlayEnable = () => {
  document.querySelector(OVERLAY_CONTAINER_SELECTOR).classList.add(OVERLAY_SELECTOR);
};

const menuBgOverlayDisable = () => {
  document.querySelector(OVERLAY_CONTAINER_SELECTOR).classList.remove(OVERLAY_SELECTOR);
};

const menuBgOverlayToggle = () => {
  document.querySelector(OVERLAY_CONTAINER_SELECTOR).classList.toggle(OVERLAY_SELECTOR);
};

const getNodeCssValue = (node, property) =>
  node ? window.getComputedStyle(node).getPropertyValue(property) : null;

/*
 * Only on this project
 */

