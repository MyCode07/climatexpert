import Swiper from 'swiper';
import { FreeMode, Navigation, Pagination, Thumbs, Autoplay } from 'swiper/modules';

const sliders = document.querySelectorAll('.swiper');
if (sliders.length) {
    sliders.forEach(slider => {
        const section = slider.closest('section');
        let prev = section.querySelector('.prev')
        let next = section.querySelector('.next')
        let pagination = section.querySelector('.pagination')

        if (slider.closest('.services-v2')) {
            new Swiper(slider, {
                modules: [Pagination],
                slidesPerView: 'auto',
                pagination: {
                    el: pagination,
                    clickable: true,
                },
                breakpoints: {
                    300: {
                        spaceBetween: 16,
                    },
                    601: {
                        spaceBetween: 20,
                    }
                }
            })
        }
    })
}


