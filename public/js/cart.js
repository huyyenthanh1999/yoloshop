let addCartInfo = () => {
	document.querySelector('.cart__info__txt').innerHTML += `
  <p>
      Bạn đang có
      <span>${cart.length}</span>
      sản phẩm trong giỏ hàng
  </p>
  <div class="cart__info__txt__price">
      <span>Thành tiền:</span>
      <span>${totalMoney} VNĐ</span>
  </div>
  `
}

addCartInfo()

// let i = 0
let addCartList = (product, index) => {
	document.querySelector('.cart__list').innerHTML += `
    <div class="cart__item">
    <div class="cart__item__image">
        <img src="${product.idProductCode.images[0]}" alt="">
    </div>
      <div class="cart__item__info">
          <div class="cart__item__info__name">
              <a href="${product._id}">${product.idProductCode.name} - ${product.color} - ${product.size}</a>
          </div>
          <div class="cart__item__info__price">${
						product.idProductCode.cost * listData[index].quantity
					}</div>
          <div class="cart__item__info__quantity">
              <div class="product__info__item__quantity">
                  <button class="product__info__item__quantity__btn dec__btn">
                      <i class="bx bx-minus"></i>
                  </button>
                  <div class="product__info__item__quantity__input">${listData[index].quantity}</div>
                  <button class="product__info__item__quantity__btn inc__btn">
                      <i class="bx bx-plus"></i>
                  </button>
              </div>
          </div>
          <div class="cart__item__del">
              <i class="bx bx-trash"></i>
          </div>
      </div>
    </div>
    `
}