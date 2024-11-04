import { initModals } from './modules/modals/init-modals'
import { mobileVhFix } from './utils/mobile-vh-fix'
import { initSlider } from './modules/init-slider'

mobileVhFix()
document.addEventListener(
  'DOMContentLoaded',
  () => {
    initSlider()
    // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
    // в load следует добавить скрипты, не участвующие в работе первого экрана
    window.addEventListener('load', () => {
      initModals()
    })
  },
  true
)
