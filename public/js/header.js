const menuLeft = $('.header-menu__left');
const goTop = $('.go-top');


function menuToggle(){
    menuLeft.toggleClass('active')
    disableScroll();
}
//disable scroll event
function disableScroll(){
    if (menuLeft.hasClass('active')){
        goTop.removeClass('show');
        $('body').css({'margin':'0','height': '100%', 'overflow': 'hidden'});
    }else {
        goTop.addClass('show');
        $('body').css({'margin':'','height': '%', 'overflow': ''});
    }
}

disableScroll();

//scroll event
const header = $('#header');

window.addEventListener('scroll', () => {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        header.addClass('shrink');
        header.css('background-color','#fff')
        goTop.addClass('show');
    } else {
        header.removeClass('shrink');
        goTop.removeClass('show');
        header.css('background-color','')
    }
})