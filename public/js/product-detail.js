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

function addCart() {
    //required to select variant
    var size, color;
        $('.product-info-item-list__item input[name="size"]').each(function(){
            if($(this).is(':checked')){
                size = $(this).val();
            }
        })
        if(size == undefined){
            alert("Vui lòng chọn size!")
        }
        $('.product-info-item-list__item input[name="color"]').each(function(){
            if($(this).is(':checked')){
                color = $(this).val();
            }
        })
        if(color == undefined){
            alert("Vui lòng chọn color!")
        }

        if(size != undefined && color != undefined){
            console.log(size, color)
        }
}
 