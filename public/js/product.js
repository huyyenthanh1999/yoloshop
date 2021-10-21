// render();
//display filter box
$('.product-filter__toggle button').click(() => {
    $('.product-filter').addClass('active');
    $('.filter-overlay').addClass('active');
})
//hide filter box
$('.product-filter__close').click(() => {
    $('.filter-overlay').removeClass('active');
    $('.product-filter').removeClass('active');
})

$('.filter-overlay').click(() => {
    $('.product-filter').removeClass('active')
    $('.filter-overlay').removeClass('active');
})
//display filter icon when scroll
window.addEventListener('scroll', () => {
    if (document.body.scrollTop > 75 || document.documentElement.scrollTop > 75) {
        $('.product-filter__toggle').addClass('sticky')
    } else {
        $('.product-filter__toggle').removeClass('sticky')
    }
})

//delete all filter 
$('.del-filter button').click(function () {
    $('.custom-checkbox input').prop('checked', false);
    window.location.href="/products"
})

//custom filter
$('.custom-checkbox input').change(async (e) => {
    render()
})

function render() {
    var data = {
        type: [],
        color: [],
        size: []
    }
    $('.custom-checkbox input').each(function () {
        if ($(this).is(':checked')) {
            var name = $(this).attr("name");
            switch (name) {
                case 'type':
                    data.type.push($(this).val());
                    break;
                case 'color':
                    data.color.push($(this).val());
                    break;
                case 'size':
                    data.size.push($(this).val());
                    break;
                default:
                    break;
            }
        }
    })

    $.ajax({
        url: `/products/filter?type=${data.type}&color=${data.color}&size=${data.size}`,
        type: 'GET'
    })
        .then(res => {
            const products = res.data;
            $('.product-content').html('')
            $('.product-content').append('<div class="grid-rows"></div>');
            for(var i = 0; i <= products.length - 1; i++) {              
                $('.product-content .grid-rows').append(`
                    <div class="grid-col-3 md-grid-col-2">
                        <div class="product-card pb-2">
                            <a href="/products/detail/${products[i]._id}">
                                <div class="product-card__image">
                                    <img src="${products[i].images[0]}" alt="" />
                                    <img src="${products[i].images[1]}" alt="" />
                                </div>
                                <h3 class="product-card__name">${products[i].name}</h3>
                                <div class="product-card__price">${products[i].cost}</div>
                            </a>
                            <div class="product-card__btn">
                                <button class="btn btn-primary btn-small">
                                    <span class="btn-txt">Chọn mua</span>
                                        <span class="btn-icon">
                                            <i class="bx bx-cart bx-tada"></i>
                                        </span>
                                </button>
                            </div>
                        </div>
                    </div>
                `)
        
            }
        })
        .catch(err => console.log(err))
}

//pagination
// $.ajax({
//     url:"/product?page=1&&size=10",
//     type:"get",
//     data: {
//         page: 1,
//         pageLimit: 10
//     },
//     success: (data) => {
//         console.log(data)
//     },
//     error: (jqXHR, textStatus, errorThrown) => {
//         console.log(jqXHR)
//         console.log(textStatus)
//         console.log(errorThrown)
//     }
// })