let tempPrice = 0
let totalPrice = 0
let _products = []

const btn_pay = $('.btn-pay')
const btn_back = $('.btn-back')

let i = 0
let addDetailOrder = (product, index, _listData) => {
    i++
    let div = `
        <div class="order__text product__info">
            <span>${product.idProductCode.name} - ${product.color} - ${product.size} (${_listData[index].quantity})</span>
            <span>${(product.idProductCode.cost * _listData[index].quantity).toLocaleString()} VNĐ</span>
        </div>
    `
    $('.products__info').append(div)
    tempPrice += product.idProductCode.cost * _listData[index].quantity
    
    if (i == _listData.length) {
        totalPrice = tempPrice + 30000

        $('.temp__price').html(`${tempPrice.toLocaleString()} VNĐ`)
        $('.total__price').html(`${totalPrice.toLocaleString()} VNĐ`)
        $('.price').html(`${totalPrice}`)
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
        // _products = data.cart.products
        
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

let _status = 'done'
// let _payment = 'cod'
let _productId = '617113c991ad297ed0056355'
let _quantity = 4
$(btn_pay).on('click', async () => {
    // e.preventDefault()
    // Check input first
    let _receiverName = $('.receiver__name__input').val()
    let _phoneNumber = $('.phone__number__input').val()
    let _message = $('.message__input').val()
    let _address = $('.detail__address__input').val()
    let _payment = $('input[name="pay__type"]:checked').val()
    let _totalCost = parseInt($('.price').html())
   
    try {
        const data = await $.ajax({
            url: '/cart/detailCart',
            type: 'GET',
        })
        console.log(data)
        _products = data.cart.products

        const newData = await $.ajax({
            url: '/checkout',
            type: 'POST',
            data: { _receiverName, _phoneNumber, _message, _address, _products, _totalCost, _status, _payment },
        })
        console.log(newData);

        data.cart.products.map(async (item) => {
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

$(btn_back).on('click', (e) => {
    e.preventDefault()
    window.location.href = '/cart'
  })
