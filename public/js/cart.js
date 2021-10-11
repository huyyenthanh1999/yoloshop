async function render() {
// bien du lieu
let listData = undefined;

// Check dang nhap

// Chua dang nhap(khong co id)
// listData = JSON.parse(localStorage.getItem("listData")) || [];

// Da dang nhap
// listData = fetch('/api/carts/:id').then
// Lay localStorage
listData = JSON.parse(localStorage.getItem("listData")) || [];

document.querySelector('#cart .cart__info .cart__info__txt p span ').innerText = 10

let detailProducts = []
listData.forEach((item) => {
    $.ajax({
        url: `/products/api/${item.productId}`,
        type: 'GET',
    })
    .then((data) => {
        detailProducts.push(data)
        detailProducts.map((ele) => {
            console.log(ele.data.product._id)
        })
    })
    .catch((error) => {
        console.log(error)
    })
})
console.log(detailProducts);
}

render()

// an tien hanh dat hang => kiem tra dang nhap or not
// window
function order() {
    // 
}

const btn_cart = document.querySelector(".btn-cart");
btn_cart.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = "/";
})
// btn_cart.addEventListener('click', )

