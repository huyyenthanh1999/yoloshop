let detailProducts = []
let lisData = undefined
let totalProduct = 0
let totalPrice = 0
let productName = ''
let _quantity = 0
const btn_order = document.querySelector('.btn-order')
const btn_cart = document.querySelector(".btn-cart")
const cart_list = document.querySelector('.cart__list')

let addCartInfo = () => {
	document.querySelector('.cart__info__txt').innerHTML += `
  <p>
      Bạn đang có
      <span>${totalProduct}</span>
      sản phẩm trong giỏ hàng
  </p>
  <div class="cart__info__txt__price">
      <span>Thành tiền:</span>
      <span>${totalPrice} VNĐ</span>
  </div>
  `
}

let i = 0
let addCartList = (product, index) => {
	i++
  let div = `
    <table class="tb1">
      <tr>
          <td class="td1 cart__item__image">
            <img src="${product.idProductCode.images[0]}" alt="">
          </td>
          <td class="td1 cart__item__info__name">
            <a href="${product._id}">${product.idProductCode.name} - ${product.color} - ${product.size}</a>
          </td>
          <td class="td1 cart__item__info__price">
            ${product.idProductCode.cost * listData[index].quantity}
          </td>
          <td class="td1 product_quantity">
            <div class="product__info__item__quantity">
              <button class="product__info__item__quantity__btn dec__btn">
                  <i class="bx bx-minus"></i>
              </button>
              <div class="product__info__item__quantity__input">${listData[index].quantity}</div>
              <button class="product__info__item__quantity__btn inc__btn">
                  <i class="bx bx-plus"></i>
              </button>
            </div>
          </td>
          <td class="td1">
            <button class="cart__item__del">
              <i class="bx bx-trash"></i>
            </button>
          </td>
      </tr>
    </table>
  `
  $('.cart__list').append(div)
  totalPrice += product.idProductCode.cost * listData[index].quantity
  console.log(totalPrice)
  if (i == listData.length) {
    addCartInfo()
    i = 0
  } 

  // Delete
  $($('.cart__item__del')[index]).on('click', () => {
    console.log(68, index)
    productName = $('.cart__item__info__name')[index].innerHTML
    // console.log(productName)
    let _productId = productName.slice(22, 46)
    console.log(_productId);
    const temp = $.ajax({
      url: '/carts/',
      type: 'DELETE',
      data: { productId: _productId }
    })
  })

  // Decrease
  $($('.dec__btn')[index]).on('click', () => {
    console.log(83, index)
    productName = $('.cart__item__info__name')[index].innerHTML
    // console.log(productName)
    let _productId = productName.slice(22, 46)
    console.log(_productId);
    _quantity = $('.product__info__item__quantity__input')[index].innerHTML
    console.log(_quantity);
    if (_quantity > 1)
      _quantity--
    $('.product__info__item__quantity__input')[index].innerHTML = _quantity

    const temp = $.ajax({
      url: '/carts/',
      type: 'PUT',
      data: { _productId, _quantity }
    })
  })

  // Increase
  $($('.inc__btn')[index]).on('click', () => {
    console.log(102, index)
    productName = $('.cart__item__info__name')[index].innerHTML
    // console.log(productName)
    let _productId = productName.slice(22, 46)
    console.log(_productId);
    _quantity = $('.product__info__item__quantity__input')[index].innerHTML
    console.log(_quantity);
    _quantity++
    $('.product__info__item__quantity__input')[index].innerHTML = _quantity

    const temp = $.ajax({
      url: '/carts/',
      type: 'PUT',
      data: { _productId, _quantity }
    })
  })

}

async function render() {
	// bien du lieu
	listData = JSON.parse(localStorage.getItem('listData')) || []

  if (listData.length == 0) {
    document.querySelector('.cart__info').setAttribute('style', 'display:none')
    document.querySelector('.cart__list').innerHTML = `
    <div class="empty__cart">  
      <img src="../../public/images/EmptyCart.png" alt="EmptyCart">
      <h2>Giỏ hàng của bạn còn trống!</h2>
      <a href="/">
          <button class="btn btn-small">
              <span class="btn-txt-cart">MUA NGAY</span>
          </button>
      </a>
    </div>
    `
    return
  }
	listData.forEach((item) => {
		totalProduct += item.quantity
	})
	// console.log(totalProduct)

	cart_list.innerHTML = ''
  listData.forEach(async (item, index) => {
      const result = await $.ajax({
        url: `/products/api/${item.productId}`,
        type: 'GET',
      })
      
      addCartList(result.data.product, index)
  })
}

render()

function getCookie(cname) {
  let name = cname + "=";
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
  return "";
}

btn_order.addEventListener('click', (e) => {
	e.preventDefault()
	window.location.href = '/checkout'
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

// console.log(document.querySelector('.cart__info__btn'));

btn_cart.addEventListener('click', (e) => {
  e.preventDefault()
  window.location.href = '/'
})
