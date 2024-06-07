import { lockPadding, unLockPadding } from '../utils/lockPadding.js';

const filter = document.querySelector('.filter');
const activeFilters = document.querySelector('.active-filters__body');
const resetFilters = document.querySelector('.active-filters .reset-filters')


document.addEventListener('click', function (e) {
    let targetEl = e.target;

    const ativeSelect = document.querySelector('.select-input._active');

    if (targetEl.classList.contains('select-input')) {

        if (ativeSelect && ativeSelect !== targetEl) {
            ativeSelect.classList.remove('_active')
        }
        targetEl.classList.toggle('_active')
    }


    if ((targetEl.closest('.select-body') || targetEl.closest('.select-input')) && targetEl.hasAttribute('data-id')) {
        const select = targetEl.closest('.select-input');
        const label = select.querySelector('span')
        const input = targetEl.querySelector('input')


        select.classList.remove('_active')
        resetFilters.classList.remove('_hide')


        if (input) {
            const item = `<button class="active-filters__item" data-custom-field="${input.id}">${targetEl.textContent}</button>`
            if (!activeFilters.querySelector(`[data-custom-field="${input.id}"]`)) {
                activeFilters.insertAdjacentHTML('afterbegin', item)
            }
        }

    }

    if (targetEl.classList.contains('active-filters__item')) {
        targetEl.remove()

        if (!document.querySelector('.active-filters__item')) {
            resetFilters.classList.add('_hide')
        }
    }

    if (targetEl.hasAttribute('data-reset-filters')) {
        const activeFilters = document.querySelectorAll('.active-filters__item');
        if (activeFilters.length) {
            activeFilters.forEach(item => item.remove())
        }

        resetFilters.classList.add('_hide')
    }

    if (!targetEl.classList.contains('select-input') && !targetEl.closest('.select-input') && document.querySelector('.select-input._active')) {
        document.querySelector('.select-input._active').classList.remove('_active')
    }


    if (targetEl.hasAttribute('data-open-filter')) {
        filter.classList.add('_open')
        lockPadding();
    }

    if (targetEl.hasAttribute('data-close-filter')) {
        filter.classList.remove('_open')
        unLockPadding();
    }
})


