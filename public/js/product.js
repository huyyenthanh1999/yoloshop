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
$('.del-filter button').click(function(){
    $('.custom-checkbox input').prop('checked',false)
})

//custom filter
$('.custom-checkbox input').change(async (e) => {
    var data = {
        type: "",
        color: "",
        size: ""
    }
 
    $('.custom-checkbox input').each(function(){
        if($(this).is(':checked')) {
            var name = $(this).attr("name");
            switch(name){
                case 'type':
                        data.type = $(this).val();
                    break;
                case 'color':
                        data.color = $(this).val();
                    break;
                case 'size':
                        data.size = $(this).val();
                    break;
                default:
                    break;
            }
        }
    })


    console.log(data)
    // if($(this).parent('.product-filter-section__content').id === e.ta)
})

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