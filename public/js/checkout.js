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
            url: '/carts/cartAll',
            type:'GET',
        })
        // console.log(40, data.carts)
        
        $('.products__info').html('')
        data.carts.map(async (item, index) => {
            const result = await $.ajax({
                url: `/products/api/${item.productId}`,
                type: 'GET',
            })
            
            addDetailOrder(result.data.product, index, data.carts)
        })
    } catch (error) {
        console.log(error)
    }
}

render()
