import { gsap } from 'gsap'
import { isMobile } from '../utils/isMobile.js'

const categoriesWrapper = document.querySelector('.about-services .section__bottom')

if (categoriesWrapper) {
    categoriesWrapper.addEventListener('mousemove', e => {
        gsap.to('img', {
            x: e.x,
            y: e.y,
            // transform origin of images to center
            xPercent: -50,
            yPercent: -125,
            stagger: .02
        })
    })

    gsap.utils.toArray('.about-services .section__bottom a')
        .forEach(category => {
            let { label } = category.dataset

            category.addEventListener('mouseenter', () => {
                gsap.to(`img[data-image=${label}]`, { opacity: 1, scale: 1 })
                gsap.set(`img[data-image=${label}]`, { zIndex: 1 })
                gsap.set(`a[data-label=${label}]`, { zIndex: 2 })
            })

            category.addEventListener('mouseleave', () => {
                gsap.to(`img[data-image=${label}]`, { opacity: 0, zIndex: -1, scale: .80 })
                gsap.set(`a[data-label=${label}]`, { zIndex: 0 })
            })
        })
}


const categorySections = document.querySelectorAll('.category .category-item');
let locked = false;

if (categorySections.length && !isMobile.any()) {
    categorySections.forEach(cat => {
        const links = cat.querySelectorAll('ul a');
        const scroll = cat.querySelector('.category-item__image-scroll');

        if (links.length) {

            links.forEach((link, i) => {

                link.addEventListener('mouseenter', (e) => {
                    locked = true
                    const height = e.target.closest('.category-item').querySelector('.category-item__image ._default').getBoundingClientRect().height;

                    gsap.to(scroll, {
                        y: (i + 1) * -height,
                        duration: 0.7,
                    })
                })

                link.addEventListener('mouseleave', (e) => {
                    locked = false

                    setTimeout(() => {
                        if (locked == false) {
                            gsap.to(scroll, {
                                y: 0,
                                duration: 1,
                            })
                        }
                    }, 16);
                })
            })
        }
    });
}
