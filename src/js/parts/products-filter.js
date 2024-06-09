const productFitlerForm = document.querySelector('#product-fitler-form');
const productSection = document.querySelector('.products');
const fitlersArea = document.querySelector('.filters-area');
const productGrid = document.querySelector('.products .grid');
const productCount = document.querySelector('.woocommerce-result-count');
const productsPagination = document.querySelector('.woocommerce-pagination');
const body = document.body;

const url = adminajaxurl.ajaxurl;

export async function productFilter() {
    let formdata = new FormData(productFitlerForm);

    const queryString = new URLSearchParams(formdata).toString()
    formdata.append('action', 'ajaxfilter')

    let newUrl = `${window.location.pathname}?${queryString}${window.location.hash}`;
    if (newUrl[newUrl.length - 1] == '?') {
        newUrl = newUrl.replace('?', '')
    }

    window.history.replaceState({}, '', newUrl)

    formdata = Object.fromEntries(formdata)
    console.log(formdata);

    $.ajax({
        url: url,
        cache: false,
        timeout: 300000,
        type: 'GET',
        data: formdata,
        beforeSend: function () {
            body.classList.add('_loading')
        },
        success: function (result) {
            console.log(result);

            const title = document.querySelector('title')
            const pageTitle = document.querySelector('input#page-title');

            title.textContent = pageTitle.value
            productGrid.innerHTML = result.products;
            productCount.innerHTML = result.count;

            if (productsPagination) {
                if (result.pagination) {
                    productsPagination.innerHTML = result.pagination;
                }
                else {
                    productsPagination.innerHTML = '';
                }
            }
        },
        error: function (error) {
            console.log(error);
        },
        complete: function () {
            body.classList.remove('_loading')
        }
    })
}

export function removeSearchParam(name) {
    const url = new URL(window.location.href)
    const params = new URLSearchParams(url.search.slice(1))
    params.delete(name);

    let newUrl = `${window.location.pathname}?${params}${window.location.hash}`;
    if (newUrl[newUrl.length - 1] == '?') {
        newUrl = newUrl.replace('?', '')
    }

    window.history.replaceState({}, '', newUrl)
    console.log(newUrl);
}


// reset filters
export function resetFilters() {
    window.history.pushState(null, null, productSection.dataset.pagenumlink);
}

document.addEventListener('click', function (e) {
    let targetEl = e.target;

    if (targetEl.hasAttribute('data-close-filter') && targetEl.closest('.filter-actions')) {
        productFilter();
    }
})