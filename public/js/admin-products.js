activeNavItem('products')

// click add product button
document.querySelector('.action-add').addEventListener('click', (e) => {
	window.location.href = '/admin/add-product'
})

function formatDate(time) {
	const date = new Date(time)
	return date.toLocaleDateString()
}

// render list of products
function renderListOfProducts(productCodes) {
	let html = ''
	productCodes.forEach((productCode, index) => {
		let productHTML = ''
		productCode.products.forEach((item) => {
			productHTML += `
                <tr>
                    <td>${item.color}</td>
                    <td>${item.size}</td>
                    <td>${item.total}</td>
                </tr>
            `
		})

		html += `
        <tr>
        <td class="stt-product">${index + 1}</td>
        <td class="id-product">
            <a href="/admin/products/${productCode._id}">${productCode._id}</a>
        </td>
        <td class="cover-product">
            <img
                src="${productCode.images[0]}"
                alt=""
            />
        </td>
        <td class="name-product">${productCode.name}</td>
        <td>${formatDate(productCode.createdAt)}</td>
        <td class="cost-product">${productCode.cost}</td>
        <td class="sold-product">${productCode.type}</td>
        <td class="last-product">${productCode.total}</td>
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
            <button onclick="showMoreProduct(event)">
                <i class="fas fa-chevron-down"></i>
            </button>
            <a href="/admin/products/${productCode._id}">
                <button>
                    <i class="fas fa-edit"></i>
                </button>
            </a>
            <a href="#" onclick="deleteProductCode(event)">
                <button>
                    <i class="far fa-trash-alt"></i>
                </button>
            </a>
            
        </td>
    </tr>
    <tr class="more-product-table">
        <td></td>
        <td></td>
        <td colspan="3">
            <table class="table table-border">
                <tr>
                    <th>Màu sắc</th>
                    <th>Kích thước</th>
                    <th>Số lượng</th>
                </tr>
                ${productHTML}
            </table>
        </td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    `
	})

	// create tbody
	const tbody = document.createElement('tbody')
	tbody.innerHTML = html

	const table = document.querySelector('.admin-products table')

	const oldTableBody = table.querySelector('tbody')
	oldTableBody && oldTableBody.remove()

	table.appendChild(tbody)

	document.querySelector('.total-products span').innerHTML = total
}

renderListOfProducts(productCodes)

function showMoreProduct(event) {
	const moreProduct = event.currentTarget.closest('tr').nextElementSibling
	// console.log(moreProduct)
	$(moreProduct).toggle(100)
}

async function deleteProductCode(event) {
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
		url: `/products/code/api/${idProduct}`,
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

// filter

function changeURL(search = '', sortCost = '') {
	const state = {}
	const newURL = `/admin/products?search=${search}&cost=${sortCost}`

	history.pushState(state, '', newURL)
}

// search products
const inputSearch = document.querySelector('.products-action .action-search')

$(inputSearch).on('keyup', async function (e) {
	if (e.key === 'Enter' || e.keyCode === 13) {
		// call api and change the list of products

		const result = await $.ajax({
			url: `/products/api?search=${e.target.value}`,
			type: 'GET',
		})

		// console.log(result.productCodes)
		productCodes = result.productCodes
		changeURL(e.target.value)
		renderListOfProducts(productCodes)
	}
})

// filter follow cost
let statusCost = 'down'
const actionCost = document.querySelector('.action-cost')
actionCost.addEventListener('click', (e) => {
	if (statusCost == 'down') {
		productCodes = productCodes.sort((a, b) => a.cost - b.cost)
		statusCost = 'up'

		actionCost.querySelector('span').innerHTML =
			"<i class='fas fa-sort-amount-down-alt'></i>"
	} else {
		productCodes = productCodes.sort((a, b) => b.cost - a.cost)
		statusCost = 'down'
		actionCost.querySelector('span').innerHTML =
			'<i class="fas fa-sort-amount-up"></i>'
	}

	renderListOfProducts(productCodes)
})

// filter follow date
let statusDate = 'down'
const actionDate = document.querySelector('.action-date')
actionDate.addEventListener('click', (e) => {
	if (statusDate == 'down') {
		productCodes = productCodes.sort(function (a, b) {
			return new Date(a.createdAt) - new Date(b.createdAt)
		})
		statusDate = 'up'
		actionDate.querySelector('span').innerHTML =
			'<i class="fas fa-sort-amount-up"></i>'
	} else {
		productCodes = productCodes.sort(function (a, b) {
			return new Date(b.createdAt) - new Date(a.createdAt)
		})

		statusDate = 'down'

		actionDate.querySelector('span').innerHTML =
			"<i class='fas fa-sort-amount-down-alt'></i>"
	}

	renderListOfProducts(productCodes)
})

// filter follow left
let statusLeft = 'down'
const actionLeft = document.querySelector('.action-left')
actionLeft.addEventListener('click', (e) => {
	if (statusLeft == 'down') {
		productCodes = productCodes.sort((a, b) => a.cost - b.cost)

		statusLeft = 'up'

		actionLeft.querySelector('span').innerHTML =
			"<i class='fas fa-sort-amount-down-alt'></i>"
	} else {
		productCodes = productCodes.sort((a, b) => b.cost - a.cost)
		statusLeft = 'down'
		actionLeft.querySelector('span').innerHTML =
			'<i class="fas fa-sort-amount-up"></i>'
	}

	renderListOfProducts(productCodes)
})
