activeNavItem('products')

// click add product button
document.querySelector('.action-add').addEventListener('click', (e) => {
	window.location.href = '/admin/add-product'
})

// render list of products
function renderListOfProducts(products) {
	let html = ''
	// console.log(products)
	products.forEach((product, index) => {
		// console.log(product, index)
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
            <a href="">
                <button>
                    <i class="far fa-trash-alt"></i>
                </button>
            </a>
            
        </td>
    </tr>
        
        `
	})

	// console.log(html)
	return html
}

// fetch list of products
function getAllProducts() {
	$.ajax({
		url: '/api/products',
	}).then((data) => {
		// console.log(data.data.products)
		const html = renderListOfProducts(data.data.products)
		// console.log(html)

		// create tbody
		const tbody = document.createElement('tbody')
		tbody.innerHTML = html

		document.querySelector('.admin-products table').appendChild(tbody)
		document.querySelector('.admin-products table tbody').innerHTML =
			renderListOfProducts(data.data.products)

		document.querySelector('.total-products span').innerHTML =
			data.data.products.length
	})
}

getAllProducts()
