import { isMobile } from '../utils/isMobile.js';
import { lockPadding, unLockPadding } from '../utils/lockPadding.js';
import { gsap } from 'gsap'


const burger = document.querySelector('.header__burger');
const header = document.querySelector('.header');
const menu = document.querySelector('.menu');

if (burger) {
    burger.addEventListener('click', (e) => {
        if (catalogMenu.classList.contains('_open')) {
            header.classList.remove('_active');
            catalogMenu.classList.remove('_open');

            openCatalogBtns.forEach(btn => {
                btn.classList.remove('_active');
            })
        }

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

// menu arrow buttom
const arrow = `<button><svg width="14" height="14" viewBox="0 0 14 14">
<path d="M0 7H7M14 7H7M7 7V0V14" stroke-width="1.2"/>
</svg>
</button>`;

// add menu summenu opener button
const submenuList = document.querySelectorAll('nav ul li');
if (submenuList.length) {
    submenuList.forEach(li => {
        const submenu = li.querySelector('ul');
        const link = li.querySelector('a');

        if (submenu) {
            link.insertAdjacentHTML('afterend', arrow);
            const btn = li.querySelector('button');

            if (btn) {
                btn.addEventListener('click', function () {
                    toggleMenu(li)
                })
            }
        }
    })

    function toggleMenu(item) {
        const menu = item.closest('ul');
        const menuItems = menu.querySelectorAll('li');

        if (!item.hasAttribute('data-open')) {
            const openitem = menu.querySelector('li[data-open]');
            if (openitem) {
                openitem.removeAttribute('data-open')
            }

            menuItems.forEach(item => {
                item.removeAttribute('data-open')
            })

            item.setAttribute('data-open', 'open')
        }
        else {
            if (!item.closest('.catalog-menu')) {
                item.removeAttribute('data-open')
            }
            else {
                if (isMobile.any()) {
                    item.removeAttribute('data-open')
                }
            }
        }
    }

    const catalogMenuFirstItem = document.querySelectorAll('.catalog-menu a');
    if (catalogMenuFirstItem && isMobile.any()) {
        toggleMenu(catalogMenuFirstItem[0])
    }
}




const openCatalogBtns = document.querySelectorAll('[data-open-catalog]');
const catalogMenu = document.querySelector('.catalog-menu')

if (openCatalogBtns.length) {
    openCatalogBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            if (openServicesBtn.classList.contains('_active')) {
                header.classList.remove('_active');
                openServicesBtn.classList.remove('_active');
            }

            if (menu.classList.contains('_open')) {
                header.classList.remove('_active');
                menu.classList.remove('_open');
                burger.classList.remove('_active');
            }

            catalogMenu.classList.toggle('_open');
            btn.classList.toggle('_active');
            header.classList.toggle('_active');

            if (btn.classList.contains('_active')) {
                lockPadding();
            }
            else {
                unLockPadding();
            }
        })
    })
}


const openServicesBtn = document.querySelector('.services-link');
if (openCatalogBtns) {
    openServicesBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openServicesBtn.classList.toggle('_active');
        header.classList.toggle('_active');

        if (openServicesBtn.classList.contains('_active')) {
            lockPadding();
        }
        else {
            unLockPadding();
        }


    })
}

document.addEventListener('click', function (e) {
    let targetEl = e.target;

    if ((!targetEl.classList.contains('services-link') && !targetEl.closest('.services-link')) && openServicesBtn.classList.contains('_active')) {
        openServicesBtn.classList.remove('_active');
        header.classList.remove('_active');
        unLockPadding();
    }

    if (!targetEl.hasAttribute('data-open-catalog') && !targetEl.closest('.catalog-menu') &&
        !targetEl.classList.contains('catalog-menu') && catalogMenu.classList.contains('_open')) {
        catalogMenu.classList.remove('_open');
        header.classList.remove('_active');
        unLockPadding();

        openCatalogBtns.forEach(btn => {
            btn.classList.remove('_active');
        })
    }
})