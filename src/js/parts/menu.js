import { isMobile } from '../utils/isMobile.js';
import { lockPadding, unLockPadding } from '../utils/lockPadding.js';
import { gsap } from 'gsap'


const burger = document.querySelector('.header__burger');
const header = document.querySelector('.header');
const menu = document.querySelector('.menu');
const allMenuLinks = document.querySelectorAll('ul li a');

if (burger) {
    burger.addEventListener('click', (e) => {
        burger.classList.toggle('_active');
        header.classList.toggle('_active');
        menu.classList.toggle('_open');
        document.body.classList.toggle('_noscroll');

        if (menu.classList.contains('_open')) {
            lockPadding();
        }
        else {
            unLockPadding();
        }
    })
}

if (allMenuLinks.length) {
    allMenuLinks.forEach(link => {

        link.addEventListener('click', (e) => {
            if (menu.classList.contains('_open')) {
                unLockPadding();
                burger.classList.remove('_active');
                header.classList.remove('_active');
                menu.classList.remove('_open');
                document.body.classList.remove('_noscroll');
            }
        })

        const li = link.closest('li');
        const btn = li.querySelector('button');
        const dropDown = li.querySelector('.dropdown-menu');

        if (btn) {
            btn.addEventListener('click', () => {
                li.classList.toggle('_active')
                header.classList.toggle('_active');

                if (li.classList.contains('_active')) {
                    aniamteDropDown(dropDown, 'show')
                }
                else {
                    aniamteDropDown(dropDown, 'hide')
                }

            })
        }
    })
}

function aniamteDropDown(dropDown, type = 'show') {
    if (type == 'show') {
        gsap.to(dropDown, {
            height: 'auto',
        })

        gsap.to(dropDown.querySelectorAll('li'), {
            y: 0,
            stagger: 0.1
        })
    }
    else {
        gsap.to(dropDown, {
            height: 0,
        })

        gsap.to(dropDown.querySelectorAll('li'), {
            y: '20%',
            stagger: 0.1
        })
    }
}

const dropdownbuttons = document.querySelectorAll('.dropdownbutton');
const dropdown = document.querySelectorAll('.menu')

if (dropdownbuttons.length) {
    dropdownbuttons.forEach(btn => {

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetDropdown = btn.querySelector('.dropdown-menu')

            dropdown.forEach(menu => {
                if (menu.classList.contains('_open')) {
                    btn.classList.remove('_active');
                    header.classList.remove('_active');
                    menu.classList.remove('_open');
                    console.log(1);
                }
            });


            btn.classList.toggle('_active');
            header.classList.toggle('_active');
            targetDropdown.classList.toggle('_open');

        })

    })
}
