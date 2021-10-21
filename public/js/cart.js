let detailProducts = []
let lisData = undefined
let totalProduct = 0
let totalPrice = 0
let productName = ''
let _quantity = 0
const btn_order = $('.btn-order')
const btn_cart = $(".btn-cart")
let cart_list = $('.cart__list')

let addCartInfo = () => {
  $('.cart__info__txt').html('')
  let _div = `
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
  $('.cart__info__txt').append(_div)
}

let i = 0
// let addCartList = (product, index) => {
// 	i++
//   let div = `
//     <table class="tb1">
//       <tr>
//           <td class="td1 cart__item__image">
//             <img src="${product.idProductCode.images[0]}" alt="">
//           </td>
//           <td class="td1 cart__item__info__name">
//             <a href="${product._id}">${product.idProductCode.name} - ${product.color} - ${product.size}</a>
//           </td>
//           <td class="td1 cart__item__info__price">
//             ${product.idProductCode.cost * listData[index].quantity}
//           </td>
//           <td class="td1 product_quantity">
//             <div class="product__info__item__quantity">
//               <button class="product__info__item__quantity__btn dec__btn">
//                   <i class="bx bx-minus"></i>
//               </button>
//               <div class="product__info__item__quantity__input">${listData[index].quantity}</div>
//               <button class="product__info__item__quantity__btn inc__btn">
//                   <i class="bx bx-plus"></i>
//               </button>
//             </div>
//           </td>
//           <td class="td1">
//             <button class="cart__item__del">
//               <i class="bx bx-trash"></i>
//             </button>
//           </td>
//       </tr>
//     </table>
//   `
//   cart_list.append(div)
//   totalPrice += product.idProductCode.cost * listData[index].quantity
//   console.log(totalPrice)
//   if (i == listData.length) {
//     addCartInfo()
//     i = 0
//   } 

//   // Delete button
//   $($('.cart__item__del')[index]).on('click', () => {
//     console.log(68, index)
//     productName = $('.cart__item__info__name')[index].innerHTML
//     // console.log(productName)
//     let _productId = productName.slice(22, 46)
//     console.log(_productId);
//     const temp = $.ajax({
//       url: '/carts/',
//       type: 'DELETE',
//       data: { productId: _productId }
//     })
//   })

//   // Decrease button
//   $($('.dec__btn')[index]).on('click', () => {
//     console.log(83, index)
//     productName = $('.cart__item__info__name')[index].innerHTML
//     // console.log(productName)
//     let _productId = productName.slice(22, 46)
//     console.log(_productId);
//     _quantity = $('.product__info__item__quantity__input')[index].innerHTML
//     console.log(_quantity);
//     if (_quantity > 1)
//       _quantity--
//     $('.product__info__item__quantity__input')[index].innerHTML = _quantity
//     listData[index].quantity = _quantity

//     const temp = $.ajax({
//       url: '/carts/',
//       type: 'PUT',
//       data: { _productId, _quantity }
//     })
//     // render()
//   })

//   // Increase button
//   $($('.inc__btn')[index]).on('click', () => {
//     console.log(102, index)
//     productName = $('.cart__item__info__name')[index].innerHTML
//     // console.log(productName)
//     let _productId = productName.slice(22, 46)
//     console.log(_productId);
//     _quantity = $('.product__info__item__quantity__input')[index].innerHTML
//     console.log(_quantity);
//     _quantity++
//     $('.product__info__item__quantity__input')[index].innerHTML = _quantity
//     listData[index].quantity = _quantity

//     const temp = $.ajax({
//       url: '/carts/',
//       type: 'PUT',
//       data: { _productId, _quantity }
//     })
//     // render()
//   })

// }

let addCartList = (product, index, _listData) => {
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
            ${product.idProductCode.cost * _listData[index].quantity}
          </td>
          <td class="td1 product_quantity">
            <div class="product__info__item__quantity">
              <button class="product__info__item__quantity__btn dec__btn">
                  <i class="bx bx-minus"></i>
              </button>
              <div class="product__info__item__quantity__input">${_listData[index].quantity}</div>
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
  cart_list.append(div)
  totalPrice += product.idProductCode.cost * _listData[index].quantity
  console.log(totalPrice)
  if (i == _listData.length) {
    addCartInfo()
    i = 0
  } 

  // Delete button
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
    // renderCart()
  })

  // Decrease button
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
    // $('.product__info__item__quantity__input')[index].innerHTML = _quantity
    // $('.cart__item__info__price')[index].innerHTML = product.idProductCode.cost * _quantity
    // _listData[index].quantity = _quantity
    // addCartList1(product, index, _listData)

    const temp = $.ajax({
      url: '/carts/',
      type: 'PUT',
      data: { _productId, _quantity }
    })
    totalProduct = 0
    totalPrice = 0
    renderCart()
  })

  // Increase button
  $($('.inc__btn')[index]).on('click', () => {
    console.log(102, index)
    productName = $('.cart__item__info__name')[index].innerHTML
    // console.log(productName)
    let _productId = productName.slice(22, 46)
    console.log(_productId);
    _quantity = $('.product__info__item__quantity__input')[index].innerHTML
    console.log(_quantity);
    _quantity++
    // $('.product__info__item__quantity__input')[index].innerHTML = _quantity
    // $('.cart__item__info__price')[index].innerHTML = product.idProductCode.cost * _quantity
    // _listData[index].quantity = _quantity
    // addCartList1(product, index, _listData)

    const temp = $.ajax({
      url: '/carts/',
      type: 'PUT',
      data: { _productId, _quantity }
    })
    totalProduct = 0
    totalPrice = 0
    renderCart()
  })

}

async function render() {
	// bien du lieu
	listData = JSON.parse(localStorage.getItem('listData')) || []

  if (listData.length == 0) {
    $('.cart__info').setAttribute('style', 'display:none')
    $('.cart__list').innerHTML = `
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

	cart_list.html('')
  listData.forEach(async (item, index) => {
      const result = await $.ajax({
        url: `/products/api/${item.productId}`,
        type: 'GET',
      })
      
      addCartList(result.data.product, index)
  })
}

// render()

async function renderCart() {
	try {
    cart_list.html('');
    const data = await $.ajax({
      url: '/carts/cartAll',
      type:'GET',
    })
    console.log(data)
    console.log(data.carts)

    // if (data.length == 0) {
    //   $('.cart__info').setAttribute('style', 'display:none')
    //   $('.cart__list').innerHTML = `
    //   <div class="empty__cart">  
    //     <img src="../../public/images/EmptyCart.png" alt="EmptyCart">
    //     <h2>Giỏ hàng của bạn còn trống!</h2>
    //     <a href="/">
    //         <button class="btn btn-small">
    //             <span class="btn-txt-cart">MUA NGAY</span>
    //         </button>
    //     </a>
    //   </div>
    //   `
    //   return
    // }

    data.carts.map((item) => {
      totalProduct += item.quantity
    })
    console.log(totalProduct)
  
    cart_list.html('')
    data.carts.map(async (item, index) => {
        const result = await $.ajax({
          url: `/products/api/${item.productId}`,
          type: 'GET',
        })
        
        addCartList(result.data.product, index, data.carts)
    })
  } catch (error) {
    console.log(error);
  }
}

renderCart()

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

$(btn_order).on('click', (e) => {
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

// console.log($('.cart__info__btn'));

$(btn_cart).on('click', (e) => {
  e.preventDefault()
  window.location.href = '/'
})
