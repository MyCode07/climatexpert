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
const duration = 0.5

if (categorySections.length && !isMobile.any()) {
    categorySections.forEach(cat => {
        const links = cat.querySelectorAll('ul li');
        const images = cat.querySelectorAll('.category-item__image-scroll .img');
        const wrapper = cat.querySelector('.category-item__links');

        if (links.length) {
            links.forEach((link, i) => {
                link.addEventListener('mouseenter', () => {
                    const activeLink = cat.querySelector('._enter');

                    if (activeLink) {
                        activeLink.classList.remove('_enter')
                    }

                    link.classList.add('_enter')

                    images.forEach((img, index) => {
                        if (index == i + 1) {
                            gsap.to(img, {
                                opacity: 1,
                                duration: duration,
                            })
                        }
                        else {
                            gsap.to(img, {
                                opacity: 0,
                                duration: duration,
                            })
                        }
                    })

                })

            })

            wrapper.addEventListener('mouseleave', (e) => {
                images.forEach((img, index) => {
                    if (index == 0) {
                        gsap.to(img, {
                            opacity: 1,
                            duration: duration,
                        })
                    }
                    else {
                        gsap.to(img, {
                            opacity: 0,
                            duration: duration,
                        })
                    }
                })
            })
        }
    });
}