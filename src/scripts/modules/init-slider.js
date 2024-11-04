import Swiper from 'swiper'
import { Pagination, Navigation } from 'swiper/modules'

const heroSection = document.querySelector('.hero')
const servicesSliderEl = document.querySelector('.hero-swiper')

export const initSlider = () => {
  let swiper
  if (heroSection && servicesSliderEl) {
    const sliderButtonNext = heroSection.querySelector(
      '.swiper__button--next'
    )
    const sliderButtonPrev = heroSection.querySelector(
      '.swiper__button--prev'
    )
    const swiperOptions = {
      modules: [Pagination, Navigation],
      spaceBetween: 32,
      slidesPerView: 1,
      loop: false,
      // grabCursor: true,
      centeredSlides: true,
      pagination: {
        el: '.hero .swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: sliderButtonNext,
        prevEl: sliderButtonPrev,
      },
    }

    swiper = new Swiper('.hero-swiper', swiperOptions)
  }
  return swiper
}

