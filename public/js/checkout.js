let tempPrice = 0
let totalPrice = 0
let _products = []

const btn_pay = $('.btn-pay')

let i = 0
let addDetailOrder = (product, index, _listData) => {
    i++
    let div = `
        <div class="order__text product__info">
            <span>${product.idProductCode.name} - ${product.color} - ${product.size} (${_listData[index].quantity})</span>
            <span>${product.idProductCode.cost * _listData[index].quantity} VNĐ</span>
        </div>
    `
    $('.products__info').append(div)
    tempPrice += product.idProductCode.cost * _listData[index].quantity
    
    if (i == _listData.length) {
        totalPrice = tempPrice + 30000

        $('.temp__price').html(`${tempPrice} VNĐ`)
        $('.total__price').html(`${totalPrice} VNĐ`)
        i = 0
    }
}

async function render() {
    try {
        const data = await $.ajax({
            url: '/cart/detailCart',
            type: 'GET',
            // data: { _userId: _userId}
        })
        console.log(data)
        _products = data.cart.products
        
        $('.products__info').html('')
        data.cart.products.map(async (item, index) => {
            const result = await $.ajax({
                url: `/products/api/detail/${item.productId}`,
                type: 'GET',
            })
            
            addDetailOrder(result.data.product, index, data.cart.products)
        })
    } catch (error) {
        console.log(error)
    }
}

render()

let _receiverName = 'Hoang Nam'
let _phoneNumber = '034455334'
let _email = 'sksksh@gmail.com'
let _message = 'None'
let _address = '234 Nam Đồng'
let _totalCost = 2345000
let _status = 'Done'
let _payment = 'cod'
let _productId = '617113c991ad297ed0056355'
let _quantity = 4
$(btn_pay).on('click', async () => {
    // Check input first

    try {
        const data = await $.ajax({
            url: '/cart/detailCart',
            type: 'PUT',
        })
        _products = data.cart.products

        const newData = $.ajax({
            url: '/checkout/',
            type: 'POST',
            data: { _receiverName, _phoneNumber, _email, _message, _address, _products, _totalCost, _status, _payment },
        })
        console.log(newData);

        _products.map(async (item) => {
            const _data = await $.ajax({
                url: '/checkout/create',
                type: 'PUT',
                data: { _productId: item.productId, _quantity: item.quantity }
            })
            console.log(_data)
        })
        
    } catch (error) {
        console.log(error)
    }

    // window.location.href = 'success' page order success
})
