const menuLeft = $('.header-menu__left');
const goTop = $('.go-top');


function menuToggle(){
    menuLeft.toggleClass('active')
}

//scroll event
const header = $('#header');

window.addEventListener('scroll', () => {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        header.addClass('shrink');
        goTop.addClass('show');
    } else {
        header.removeClass('shrink');
        goTop.removeClass('show');
    }
})