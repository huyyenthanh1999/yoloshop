let tempPrice = 0
let totalPrice = 0

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

        $('.temp__bill').html(`
            <span>Tạm tính</span>
            <span>${tempPrice} VNĐ</span>
        `)
        $('.total__bill').html(`
            <span>Tổng tiền</span>
            <span>${totalPrice} VNĐ</span>
        `)
        i = 0
    } 
}

async function render() {
    try {
        const data = await $.ajax({
            url: '/checkout/checkoutAll',
            type:'GET',
        })
        console.log(40, data)
        console.log(40, data.orders[0].products)
        
        $('.products__info').html('')
        data.orders[0].products.map(async (item, index) => {
            const result = await $.ajax({
                url: `/products/api/${item.productId}`,
                type: 'GET',
            })
            
            addDetailOrder(result.data.product, index, data.orders[0].products)
        })
    } catch (error) {
        console.log(error)
    }
}

render()
