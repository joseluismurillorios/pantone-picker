export const debounce = (func, wait, immediate) => {
  let timeout;
  return (...args) => {
    const context = this;
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

export const throttle = (callback, del) => {
  let isThrottled = false;
  let arg;
  let context;

  function wrapper(...args) {
    if (isThrottled) {
      arg = args;
      context = this;
      return;
    }

    isThrottled = true;
    callback.apply(this, args);

    setTimeout(() => {
      isThrottled = false;
      if (arg) {
        wrapper.apply(context, arg);
        arg = null;
        context = null;
      }
    }, del);
  }

  return wrapper;
};

const { userAgent } = window.navigator;

export const isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent);
export const isIOS = /iphone|ipad|ipod/.test(userAgent.toLowerCase());
export const isIOSChrome = isIOS && /CriOS/.test(userAgent);
export const isMac = (navigator.platform.toUpperCase().indexOf('MAC') >= 0);
export const isChrome = /Chrome/.test(userAgent) && /Google Inc/.test(navigator.vendor);
export const isIE = /MSIE|Trident/.test(userAgent);

export const isHQ = Math.max(window.innerWidth, window.innerHeight) > 1920 ? 'hq' : 'lq';

export const isInStandaloneMode = () => (
  'standalone' in window.navigator) && (window.navigator.standalone
);

export const isCordova = () => !!(window.cordova);

export const copyText = (str, name = '', cb = () => {}) => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  const selected = document.getSelection().rangeCount > 0
    ? document.getSelection().getRangeAt(0)
    : false;
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
  cb(str, name);
};
