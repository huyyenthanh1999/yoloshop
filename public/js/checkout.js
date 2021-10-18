let tempPrice = 0
let totalPrice = 0
let detail_order = $('.detail__order')

let i = 0
let addDetailOrder = (product, index, _listData) => {
    let div = `
        <span>${product.idProductCode.name} - ${product.color} - ${product.size} (${_listData[index].quantity})</span>
        <span>${product.idProductCode.cost} VNĐ</span>
    `
    $('.products__info').append(div)
    tempPrice += product.idProductCode.cost * _listData[index].quantity
    console.log(tempPrice)
    if (i == _listData.length) {
        totalPrice = tempPrice + 30000
        $('.temp__bill').append(`
            <span>Tạm tính</span>
            <span>${tempPrice} VNĐ</span>
        `)
        $('.total__bill').append(`
            <span>Tổng tiền</span>
            <span>${totalPrice + 30000} VNĐ</span>
        `)
        i = 0
    } 
}

async function render() {
    try {
        detail_order.html('')
        const data = await $.ajax({
            url: '/carts/cartAll',
            type:'GET',
          })
        console.log(data.carts)
        
        // detail_order.html('')
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

// render()
