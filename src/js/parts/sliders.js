import Swiper from 'swiper';
import { FreeMode, Navigation, Pagination, Thumbs, Autoplay } from 'swiper/modules';

const sliders = document.querySelectorAll('.swiper');
if (sliders.length) {
    sliders.forEach(slider => {
        const section = slider.closest('section');
        let prev = section.querySelector('.prev')
        let next = section.querySelector('.next')
        let pagination = section.querySelector('.pagination')

        if (slider.closest('.product-slider')) {
            new Swiper(slider, {
                modules: [Autoplay, Pagination],
                slidesPerView: 1,
                pagination: {
                    el: pagination,
                    clickable: true,
                },
                autoplay: {
                    delay: 4000,
                },
            })
        }
    })
}


