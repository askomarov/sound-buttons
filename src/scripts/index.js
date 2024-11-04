import { mobileVhFix } from './utils/mobile-vh-fix';

mobileVhFix();
document.addEventListener(
  'DOMContentLoaded',
  () => {
    window.addEventListener('load', () => {
      console.log('load');
    });
  },
  true
);
