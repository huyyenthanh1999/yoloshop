$(document).ready(function(){
// toggle expand product description
    $(".product-description__toggle").click(function(){
        $('.product-description').toggleClass('expand')
        $(this).toggleClass("expand");
     });
//select size and color
    $(".product-info-item-list__item").click(function(){
        $(this).toggleClass("active")
        $(this).siblings().removeClass('active')
    })
//change main image
    $('.product-images-list__item img').click(function(){
        $('.product-images__main img').attr("src", $(this).attr("src"))
    })
//set color 
    $('.product-info-item-list__item').each(function(){
        $(this).children().css("background-color",$(this).children().attr("color"))
    })

});

 //select quantity
 var quantity = 1;
 $('.product-info-item-quantity__input').text(1)
 function plusQuantity(n){
    //  console.log($('.product-info-item-quantity__input').attr('total'))
     quantity+= n;
     if(quantity < 1){
         quantity = 1
     }
    //  else if (quantity > $('.product-info-item-quantity__input').attr('total')){
    //      quantity = $('.product-info-item-quantity__input').attr('total')
    //  }
     $('.product-info-item-quantity__input').text(quantity)
 }