let totalProduct = 0
let totalCost = 0
let total = []
// let _userId = req.user  // Ham check dang nhap -> neu da dang nhap tra ve userId

const btn_order = $('.btn-order')
const btn_cart = $('.btn-cart')
let cart_list = $('.cart__list')

let addCartInfo = () => {
  $('.total__product').html(`${totalProduct}`)
  $('.total__price').html(`${totalCost} VNĐ`)
}

let i = 0
let addCartList = (product, index, _listData) => {
	i++
  let div = `
    <table class='tb1'>
      <tr>
          <td class='td1 cart__item__image'>
            <img src='${product.idProductCode.images[0]}' alt=''>
          </td>
          <td class='td1 cart__item__info__name'>
            <a href='/products/detail/${product.idProductCode._id}'>${product.idProductCode.name} - ${product.color} - ${product.size}</a>
            <p class='product__id'>${product._id}</p>
          </td>
          <td class='td1 cart__item__info__price'>
            ${product.idProductCode.cost * _listData[index].quantity}
          </td>
          <td class='td1 product_quantity'>
            <div class='product__info__item__quantity'>
              <button class='product__info__item__quantity__btn dec__btn'>
                  <i class='bx bx-minus'></i>
              </button>
              <div class='product__info__item__quantity__input'>${_listData[index].quantity}</div>
              <button class='product__info__item__quantity__btn inc__btn'>
                  <i class='bx bx-plus'></i>
              </button>
            </div>
          </td>
          <td class='td1'>
            <button class='cart__item__del'>
              <i class='bx bx-trash'></i>
            </button>
          </td>
      </tr>
    </table>
  `
  cart_list.append(div)
  totalCost += product.idProductCode.cost * _listData[index].quantity
  if (i == _listData.length) {
    addCartInfo()
    i = 0
  }

  // Delete button
  $($('.cart__item__del')[index]).on('click', () => {
    let _productId = $('.product__id')[index].innerHTML
    console.log(_productId)
    const temp = $.ajax({
      url: '/cart',
      type: 'DELETE',
      data: { _productId }
    })
    renderCart()
    console.log('123')
  })

  // Decrease button
  $($('.dec__btn')[index]).on('click', () => {
    let _productId = $('.product__id')[index].innerHTML
    let _quantity = $('.product__info__item__quantity__input')[index].innerHTML
    let _price = parseInt($('.cart__item__info__price')[index].innerHTML)
    let _cost = parseInt(_price)/parseInt(_quantity)
    if (_quantity > 1) {
      _quantity--
      _price -= _cost
      totalProduct--
      totalCost -= _cost
    }
    else {
      alert('Không thể chọn số lượng nhỏ hơn!')
    }
    $('.product__info__item__quantity__input')[index].innerHTML = _quantity
    $('.cart__item__info__price')[index].innerHTML = _price
    addCartInfo()

    const temp = $.ajax({
      url: '/cart',
      type: 'PUT',
      data: { _productId, _quantity }
    })
  })

  // Increase button
  $($('.inc__btn')[index]).on('click', () => {
    let _productId = $('.product__id')[index].innerHTML
    let _quantity = $('.product__info__item__quantity__input')[index].innerHTML
    let _price = parseInt($('.cart__item__info__price')[index].innerHTML)
    let _cost = parseInt(_price)/parseInt(_quantity)
    if (_quantity < total[index]) {
      _quantity++
      _price += _cost
      totalProduct++
      totalCost += _cost
    }
    else {
      alert('Số lượng là tối đa!')
    }
    $('.product__info__item__quantity__input')[index].innerHTML = _quantity
    $('.cart__item__info__price')[index].innerHTML = _price
    addCartInfo()

    const temp = $.ajax({
      url: '/cart',
      type: 'PUT',
      data: { _productId, _quantity }
    })
  })
}

async function renderCart() {
	try {
    cart_list.html('')
    totalProduct = 0
    totalCost = 0
    const data = await $.ajax({
      url: '/cart/detailCart',
      type: 'GET',
    })
    console.log(data)

    if (data.cart.products.length == 0) {
      $('.cart__info').attr('style', 'display:none')
      cart_list.html(`
        <div class='empty__cart'>  
          <img src='../../public/images/EmptyCart.png' alt='EmptyCart'>
          <h2>
            Giỏ hàng của bạn còn trống!
          </h2>
          <a href='/products'>
            <button class='btn btn-small'>
              <span class='btn-txt-cart'>MUA NGAY</span>
            </button>
          </a>
        </div>
      `)
      $('.empty__cart').attr('style', 'width:150%')
      return
    }

    data.cart.products.map((item) => {
      totalProduct += item.quantity
    })
  
    cart_list.html('')
    data.cart.products.map(async (item, index) => {
      const result = await $.ajax({
        url: `products/api/detail/${item.productId}`,
        type: 'GET',
      })

      total[index] = result.data.product.total
      addCartList(result.data.product, index, data.cart.products)
    })
  } catch (error) {
    console.log(error);
  }
}

renderCart()

function getCookie(cname) {
  let name = cname + '=';
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

$(btn_order).on('click', (e) => {
  e.preventDefault()
	window.location.href = '/checkout'
})

$(btn_cart).on('click', (e) => {
  e.preventDefault()
  window.location.href = '/products'
})

// chua dang nhap -> datalist = local
  // get api -> idProdct -> get



/*
+ Đã đăng nhập -> ấn chọn sản phẩm -> lưu vào cart db, vào trang cart, product ton kho -> render + đọc bảng cart -> ấn đặt hàng -> render trang đặt hàng

    detailProducts.push(result)
    console.log(result)
    addCartList(result.data.product, index)

    
  })
}

+ Chưa đăng nhập -> ấn chọn sản phẩm, số lượng (thông tin sản phẩm, total) -> lưu vào localStorage -> vào trang cart + đọc local -> login(nhận local + id) => lưu cart -> ấn đặt hàng 
*/
