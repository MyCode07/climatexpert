import dhx from 'dhx-suite'

const formatter = new Intl.NumberFormat("ru");


export function range() {
    const ranges = document.querySelectorAll('.range');

    if (!ranges) return;

    ranges.forEach(range => {

        const minOutElem = range.querySelector('.range-min ins');
        const maxOutElem = range.querySelector('.range-max ins');
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


        sliderRange.events.on('change', () => {
            minOutElem.dataset.value = sliderRange.getValue()[0]
            minOutElem.textContent = formatter.format(sliderRange.getValue()[0])

            maxOutElem.dataset.value = sliderRange.getValue()[1]
            maxOutElem.textContent = formatter.format(sliderRange.getValue()[1])
        });
    });

}