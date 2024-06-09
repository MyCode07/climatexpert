import dhx from 'dhx-suite'
import { productFilter } from './products-filter.js';

const formatter = new Intl.NumberFormat("ru");
const activeFilters = document.querySelector('.active-filters__body');
const resetFilters = document.querySelector('.active-filters .reset-filters')


export function range() {
    const ranges = document.querySelectorAll('.range');

    if (!ranges) return;


    let sliders = []
    ranges.forEach(range => {

        const minOutElem = range.querySelector('.range-min');
        const maxOutElem = range.querySelector('.range-max');
        const min = +range.dataset.min ? +range.dataset.min : 0;
        const max = +range.dataset.max ? +range.dataset.max : 0;
        const step = +range.dataset.step ? +range.dataset.step : 1;

        const sliderRange = new dhx.Slider(range.querySelector('.range-slider'), {
            min: min,
            max: max,
            step: step,
            range: true,
            value: [min, max]
        });

        sliders.push(sliderRange)


        sliderRange.events.on('change', () => {
            minOutElem.dataset.value = sliderRange.getValue()[0]
            minOutElem.querySelector('ins').textContent = formatter.format(sliderRange.getValue()[0])

            maxOutElem.dataset.value = sliderRange.getValue()[1]
            maxOutElem.querySelector('ins').textContent = formatter.format(sliderRange.getValue()[1])

            if (sliderRange.getValue()[0] > min) {
                createFitlerItem('price_min', 'min ' + minOutElem.textContent)
            }
            else {
                removeFitlerItem('price_min')
            }

            if (sliderRange.getValue()[1] < max) {
                createFitlerItem('price_max', 'max ' + maxOutElem.textContent)
            }
            else {
                removeFitlerItem('price_max')
            }


        });


        // ajax product func here
        sliderRange.events.on("mouseUp", function (e) {
            if (!range.closest('#product-fitler-form')) {
                // productFilter();
            }
        });



        document.addEventListener('click', function (e) {
            let targetEl = e.target;

            // ajax product func here
            if (targetEl.classList.contains('dhx_slider__track') && !targetEl.closest('#product-fitler-form')) {
                // productFilter();
            }



            if (targetEl.dataset.customField == 'price_min') {
                sliderRange.setValue([min, sliderRange.getValue()[1]])
            }
            if (targetEl.dataset.customField == 'price_max') {
                sliderRange.setValue([sliderRange.getValue()[0], max])
            }

            if (targetEl.hasAttribute('data-reset-filters') && sliderRange) {
                sliderRange.setValue([min, max])
            }
        })

    });


    document.addEventListener('click', function (e) {
        let targetEl = e.target;

        if (targetEl.hasAttribute('data-open-filter')) {
            sliders[0].setValue(sliders[1].getValue())
        }

        if (targetEl.hasAttribute('data-close-filter')) {
            sliders[1].setValue(sliders[0].getValue())
        }
    })


}



function createFitlerItem(id, text) {
    const item = `<button class="active-filters__item" data-custom-field="${id}">${text}</button>`

    const activeItem = activeFilters.querySelector(`[data-custom-field="${id}"]`)
    if (!activeItem) {
        activeFilters.insertAdjacentHTML('afterbegin', item)
    }
    else {
        activeItem.textContent = text
    }

    resetFilters.classList.remove('_hide')
}

function removeFitlerItem(id) {
    const activeItem = activeFilters.querySelector(`[data-custom-field="${id}"]`)
    if (activeItem) {
        activeItem.remove();
    }

    if (!document.querySelector('.active-filters__item')) {
        resetFilters.classList.add('_hide')
    }
}