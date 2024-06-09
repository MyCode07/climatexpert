const productFitlerForm = document.querySelector('#product-fitler-form');
const productSection = document.querySelector('.products');
const fitlersArea = document.querySelector('.filters-area');
const productGrid = document.querySelector('.products .grid');
const productCount = document.querySelector('.woocommerce-result-count');
const productsPagination = document.querySelector('.woocommerce-pagination');
const body = document.body;

const url = adminajaxurl.ajaxurl;

export async function productFilter() {
    const formdata = new FormData(productFitlerForm);
    formdata.append('action', 'ajaxfilter')

    body.classList.add('_loading')
    let response = await fetch(url, {
        method: 'POST',
        body: formdata
    });

    let result = await response.json();
    if (response.ok) {
        window.history.pushState(null, null, productSection.dataset.pagenumlink);

        const title = document.querySelector('title')
        const pageTitle = document.querySelector('input#page-title');

        title.textContent = pageTitle.value
        productGrid.innerHTML = result.products;
        productCount.innerHTML = result.count;

        if (productsPagination && result.pagination) {
            productsPagination.innerHTML = result.pagination;
        }
        body.classList.remove('_loading')
    }
    else {
        body.classList.remove('_loading')
    }
}

document.addEventListener('click', function (e) {
    let targetEl = e.target;

    if (targetEl.hasAttribute('data-close-filter') && targetEl.closest('.filter-actions')) {
        productFilter();
    }
})