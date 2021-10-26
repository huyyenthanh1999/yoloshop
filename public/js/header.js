//active css nav-item
var pathName = window.location.pathname;
pathName = pathName.slice(1, pathName.length)
switch (pathName) {
    case "products":
        $(".header-menu #product").addClass('active');
        break;
    case "":
        $(".header-menu #home").addClass('active');
        break;
    default:
        break;
}

//go top button
const menuLeft = $('.header-menu__left');
const goTop = $('.go-top');


function menuToggle() {
    menuLeft.toggleClass('active')
    disableScroll();
}
//disable scroll event
function disableScroll() {
    if (menuLeft.hasClass('active')) {
        goTop.removeClass('show');
        $('body').css({ 'margin': '0', 'height': '100%', 'overflow': 'hidden' });
    } else {
        goTop.addClass('show');
        $('body').css({ 'margin': '', 'height': '%', 'overflow': '' });
    }
}

disableScroll();

//scroll event
const header = $('#header');

window.addEventListener('scroll', () => {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        header.addClass('shrink');
        header.css('background-color', '#fff')
        goTop.addClass('show');
    } else {
        header.removeClass('shrink');
        goTop.removeClass('show');
        header.css('background-color', '')
    }
})


//open modal with search
var currentUrl = window.location.pathname + window.location.search;
var products = [];
async function openSearch() {
    $('.modal').addClass('active')
    $('body').css({ 'margin': '0', 'height': '100%', 'overflow': 'hidden' });
    const res = await $.ajax({
        url: `/`,
        type: 'POST'
    })
    products = res.products;
}

function closeSearch() {
    history.replaceState(null, null, currentUrl)
    $('.modal').removeClass('active')
    $('body').css({ 'margin': '', 'height': '', 'overflow': '' });
}

$('.overlay').on('click', closeSearch);
$('.modal-inner').on('click', (e) => {
    e.stopPropagation()
})

const { removeVI, DefaultOption } = jsrmvi;

$('.search-input input').keyup(async (e) => {
    history.pushState(null, null, `?search=${e.target.value}`)
    if (e.target.value === '') {
        $('.search-result').html('');
    } else {
        $('.search-result').html('');
        var flag = 0;
        products.forEach((product) => {
            if (removeVI(product.name, { ignoreCase: false, replaceSpecialCharacters: false }).toLowerCase().includes(e.target.value)) {
                $('.search-result').append(`
                    <a href="/products/detail/${product._id}" class="search-result__item">
                        <div class="search-result-item__icon">
                            <i class='bx bx-search-alt-2'></i>
                        </div>
                        <div class="search-result-item__name">
                            ${product.name}
                        </div>
                        <div class="search-result-item__price">
                            ${product.cost}
                        </div>
                    </a>
                    `)
                flag = 1;
            }
        })
        if (flag == 0) {
            $('.search-result').append(`
            <a href="/products" class="search-result__item">
                Không tìm thấy sản phẩm
            </a>
            `)
        }
    }

})