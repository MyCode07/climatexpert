import { lockPadding, unLockPadding } from '../utils/lockPadding.js';
import { productFilter, removeSearchParam, resetFilters } from './products-filter.js';

const filter = document.querySelector('.filter');
const activeFilters = document.querySelector('.active-filters__body');
const resetFiltersBtn = document.querySelector('.active-filters .reset-filters')


document.addEventListener('click', function (e) {
    let targetEl = e.target;

    const ativeSelect = document.querySelector('.select-input._active');


    // select actions
    if (targetEl.classList.contains('select-input')) {

        if (ativeSelect && ativeSelect !== targetEl) {
            ativeSelect.classList.remove('_active')
        }
        targetEl.classList.toggle('_active')
    }


    // select items actions
    if ((targetEl.closest('.select-body') || targetEl.closest('.select-input')) && targetEl.hasAttribute('data-id')) {
        const select = targetEl.closest('.select-input');
        const input = targetEl.querySelector('input')

        select.classList.remove('_active')
        resetFiltersBtn.classList.remove('_hide')
        productFilter();

        if (input) {
            const item = `<button class="active-filters__item" data-custom-field="${input.id}">${targetEl.textContent}</button>`
            if (!activeFilters.querySelector(`[data-custom-field="${input.id}"]`)) {
                activeFilters.insertAdjacentHTML('afterbegin', item)
            }
        }

    }

    // remove active filters
    if (targetEl.classList.contains('active-filters__item')) {
        const name = targetEl.dataset.customField;
        removeSearchParam(name)

        targetEl.remove()
        productFilter();

        if (!document.querySelector('.active-filters__item')) {
            resetFiltersBtn.classList.add('_hide')
        }
    }


    // reset fitlers
    if (targetEl.hasAttribute('data-reset-filters')) {
        const activeFilters = document.querySelectorAll('.active-filters__item');
        if (activeFilters.length) {
            activeFilters.forEach(item => item.remove())
        }

        const checkedInputs = document.querySelectorAll('.filter input[type="checkbox"]');
        if (checkedInputs.length) {
            checkedInputs.forEach(input => input.checked = false)
        }

        const selects = document.querySelectorAll('.select-input');
        if (selects.length) {
            selects.forEach(select => {
                select.classList.remove('_active')

                const inputs = select.querySelectorAll('input[type="checkbox"]');
                if (inputs.length) {
                    inputs.forEach(input => input.checked = false)
                }
            })
        }

        resetFiltersBtn.classList.add('_hide')
        resetFilters();
        productFilter();
    }

    // select actions
    if (!targetEl.classList.contains('select-input') && !targetEl.closest('.select-input') && document.querySelector('.select-input._active')) {
        document.querySelector('.select-input._active').classList.remove('_active')
    }


    // open filters
    if (targetEl.hasAttribute('data-open-filter')) {
        filter.classList.add('_open')
        lockPadding();
    }

    // close filters
    if (targetEl.hasAttribute('data-close-filter')) {
        filter.classList.remove('_open')
        unLockPadding();
    }
})


