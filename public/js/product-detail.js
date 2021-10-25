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
 