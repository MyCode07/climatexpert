import { gsap } from 'gsap'

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


const scroll = document.querySelectorAll('.category-item__image div a');
const links = document.querySelectorAll('.category-item ul li a');
const defultImg = document.querySelector('.category-item__image ._default');
let locked = false;

if (links.length && window.innerWidth > 1024) {
    const height = defultImg.getBoundingClientRect().height;

    links.forEach((link, i) => {
        link.addEventListener('mouseenter', () => {
            locked = true
            gsap.to(scroll, {
                y: (i + 1) * -height,
                duration: 0.7,
            })
        })

        link.addEventListener('mouseleave', () => {
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
