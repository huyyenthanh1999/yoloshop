$(document).ready(function(){
// toggle expand product description
    $(".product-description__toggle").click(function(){
        $('.product-description').toggleClass('expand')
        $(this).toggleClass("expand");
     });
//select size and color
    $(".product-info-item-list__item").click(function(){
        $(this).addClass("active")
        $(this).siblings().removeClass('active')
    })
//change main image
    $('.product-images-list__item img').click(function(){
        $('.product-images__main img').attr("src", $(this).attr("src"))
        $('.product-images__main figure').attr("style",`background-image:url("${$(this).attr('src')}")`)
    })
//set color 
    $('.product-info-item-list__item').each(function(){
        $(this).children('div').css("background-color",$(this).children('div').attr("color"))
    })

});

 //select quantity
 var quantity = 1;
 $('.product-info-item-quantity__input').text(1)
 function plusQuantity(n){
     quantity+= n;
     if(quantity < 1){
         quantity = 1
     }
     $('.product-info-item-quantity__input').text(quantity)
 }

var idProductCode = (window.location.pathname).slice(17)
// console.log(productCodeId.slice(17))
console.log(idProductCode)
var userId = '61729596ef7161e2df06bf0d'
// var userId = '616e853bb6fb7c71eb50d'
var products = []
var sl = 4
async function addCart() {
    //required to select variant
    const idProductCode = window.location.pathname.slice(17)
    var size, color;
        $('.product-info-item-list__item input[name="size"]').each(function(){
            if($(this).is(':checked')){
                size = $(this).val();
            }
        })
        if(size == undefined){
            alert("Vui lòng chọn size!")
            return
        }
        $('.product-info-item-list__item input[name="color"]').each(function(){
            if($(this).is(':checked')){
                color = $(this).val();
            }
        })
        if(color == undefined){
            alert("Vui lòng chọn color!")
            return
        }

        // if(size != undefined && color != undefined){
        //     $.ajax({
        //         url:`/products/detail?color=${color}&size=${size}&idProductCode=${idProductCode}`,
        //         type: "POST"
        //     })
        //     .then(data => {
        //         let total = data.total;
        //         if(parseInt($('.product-info-item-quantity__input').text()) > total){
        //             if(total > 0){
        //                 quantity= total
        //                 alert(`Vui lòng chọn lại số lượng!Sản phẩm này còn ${total} sản phẩm`)
        //             }else{
        //                 quantity = 1;
        //                 alert('Vui lòng chọn sản phẩm khác vì đã hết hàng!')
        //             }
        //             $('.product-info-item-quantity__input').text(quantity)
        //         }else{
        //             alert(`Còn ${total} sản phẩm`)
        //         }
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     })
        // }
        console.log(size, color)
        const data = await $.ajax({
            url: '/products/detail',
            type: 'PUT',
            data: { idProductCode, size, color, quantity },
        })
        console.log(data.product)
        console.log(data.product._id)

        const newData = await $.ajax({
            url: '/cart/',
            type: 'POST',
            data: { userId, products, _productId: data.product._id, _quantity: quantity, _sl: sl }
        })
        console.log(newData)

        // const _data = await $.ajax({
        //     url: '/cart/create',
        //     type: 'PUT',
        //     data: { _userId: userId, _productId: data.product._id, _quantity: quantity }
        // })
        // console.log(_data)

}

function buyNow() {
    window.location.href = '/cart'
}
 

// pure image zoom
function zoom(e){
    var zoomer = e.currentTarget;
    e.offsetX ? offsetX = e.offsetX : offsetX = e.touches[0].pageX
    e.offsetY ? offsetY = e.offsetY : offsetX = e.touches[0].pageX
    x = offsetX/zoomer.offsetWidth*100
    y = offsetY/zoomer.offsetHeight*100
    zoomer.style.backgroundPosition = x + '% ' + y + '%';
  }