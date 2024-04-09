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
        const label = select.querySelector('label')

        label.textContent = targetEl.textContent
        label.dataset.id = targetEl.dataset.id
        select.classList.remove('_active')
    }

    if (!targetEl.classList.contains('select-input') && !targetEl.closest('.select-input') && document.querySelector('.select-input._active')) {
        document.querySelector('.select-input._active').classList.remove('_active')
    }

    if (targetEl.hasAttribute('data-open-filter')) {
        document.querySelector('.catalog-filters__wrapper').classList.toggle('_open');
    }

    if (targetEl.classList.contains('catalog-filters__wrapper')) {
        document.querySelector('.catalog-filters__wrapper').classList.remove('_open');
    }
})