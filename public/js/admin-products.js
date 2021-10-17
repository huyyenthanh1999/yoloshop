activeNavItem('products')

// click add product button
document.querySelector('.action-add').addEventListener('click', (e) => {
	window.location.href = '/admin/add-product'
})

// render list of products
function renderListOfProducts() {
	let html = ''
	products.forEach((product, index) => {
		html += `
        <tr>
        <td class="stt-product">${index + 1}</td>
        <td class="id-product">
            <a href="/products/${product._id}">${product._id}</a>
        </td>
        <td class="cover-product">
            <img
                src="${product.idProductCode.images[0]}"
                alt=""
            />
        </td>
        <td class="name-product">${product.idProductCode.name}</td>
        <td class="cost-product">${product.idProductCode.cost}</td>
        <td class="sold-product">10</td>
        <td class="last-product">${product.total}</td>
        <td>
            <div class="form-check form-switch">
                <input
                    class="form-check-input"
                    type="checkbox"
                    id="flexSwitchCheckDefault"
                    checked
                />
            </div>
        </td>
        <td class="action-product">
            <a href="/admin/products/${product._id}">
                <button>
                    <i class="far fa-eye"></i>
                </button>
            </a>
            <a href="/admin/products/${product._id}">
                <button>
                    <i class="fas fa-edit"></i>
                </button>
            </a>
            <a href="#" onclick="deleteProduct(event)">
                <button>
                    <i class="far fa-trash-alt"></i>
                </button>
            </a>
            
        </td>
    </tr>
        
        `
	})

	// create tbody
	const tbody = document.createElement('tbody')
	tbody.innerHTML = html

	document.querySelector('.admin-products table').appendChild(tbody)

	document.querySelector('.total-products span').innerHTML = total
}

renderListOfProducts()


async function deleteProduct(event) {
	event.preventDefault()

	const tr = event.target.closest('tr')
	// console.log(tr)

	const idProduct = tr.querySelector('.id-product a').innerText
	// console.log(idProduct)
	const conf = confirm('Bạn chắc chắn muốn xóa sản phẩm')
	// console.log(conf)
	if (!conf) return

    // add lazing add product
	const lazy = document.querySelector('.lazy-loading')
	lazy.classList.toggle('hide')

	const res = await $.ajax({
		url: `/products/api/${idProduct}`,
		type: 'delete',
	})

	// console.log(res.status == 'success')
	if (res.status == 'success') {
        lazy.classList.toggle('hide')
		alert('Xóa sản phẩm thành công')
		tr.remove()

		document.querySelector('.total-products span').innerHTML--
	} else {
		alert('Xóa sản phẩm thất bại')
	}
}
