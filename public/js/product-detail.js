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

function addCart() {
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
            $.ajax({
                url:`/products/detail?color=${color}&size=${size}&idProductCode=${idProductCode}`,
                type: "POST"
            })
            .then(data => {
                let total = data.total;
                if(parseInt($('.product-info-item-quantity__input').text()) > total){
                    if(total > 0){
                        quantity= total
                        alert(`Vui lòng chọn lại số lượng!Sản phẩm này còn ${total} sản phẩm`)
                    }else{
                        quantity = 1;
                        alert('Vui lòng chọn sản phẩm khác vì đã hết hàng!')
                    }
                    $('.product-info-item-quantity__input').text(quantity)
                }else{
                    alert(`Còn ${total} sản phẩm`)
                }
            })
            .catch(err => {
                console.log(err);
            })
        }
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