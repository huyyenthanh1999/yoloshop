// bien du lieu
let listData = undefined;

// Check dang nhap

// Chua dang nhap(khong co id)
// listData = JSON.parse(localStorage.getItem("listData")) || [];

// Da dang nhap
// listData = fetch('/api/carts/:id').then
// Lay localStorage
listData = JSON.parse(localStorage.getItem("listData")) || [];
let detailProducts = []
listData.forEach((item) => {
    $.ajax({
        url: `/api/products/${item.productId}`,
        type: 'GET',
    })
    .then((data) => {
        detailProducts.push(data)
        detailProducts.map((ele) => {
            console.log(ele.data.product._id)
        })
    })
    .catch((error) => {
        console.log(error);
    })
})
console.log(detailProducts);
listData

// an tien hanh dat hang => kiem tra dang nhap or not
// window
