let lazyLoadInstance = null;
const root = document.documentElement;
const MOBILE_POINT = 1024;
const MAIN_COLOR = '#e3000f';
const ACTIVE_CLASS = '_active';
const HIDDEN_CLASS = '_hidden';
const OVERFLOW_SELECTOR = '_overflow-hidden';
const OVERLAY_SELECTOR = '_menu-opened';
const OVERLAY_CONTAINER_SELECTOR = 'body';
const DATA_ACTION = 'data-action';
const BURGER_MENU_SWITCHER = 'burger-menu-switcher';
const WRAPPER_SELECTOR = '.form-item';

const getConstant = (name) => {
  const TEMPLATE_PATH = '.';
  const cons = new Map([['icons-path', `${TEMPLATE_PATH}/img/svg/`]]);

  return cons.get(name);
};
