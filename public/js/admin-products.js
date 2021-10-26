activeNavItem('products')

let productCodes = []
let total = 0

// get query
// page=1&search=jean&date=up&cost=down&left=down
const urlSearchParams = new URLSearchParams(window.location.search)
const query = Object.fromEntries(urlSearchParams.entries())

function showPagination(totalPages) {
	const containerPagination = document.querySelector('.pagination')

	// console.log(totalPages)
	let html = ''
	for (let i = 1; i <= totalPages; i++) {
		// console.log(i)
		html += `
			<a href="/admin/products?page=${i}" onclick="handlePagination(event)">
				${i}
			</a>
		`
		// if page  active thi them color
	}
	// console.log(html)
	containerPagination.innerHTML = html
}

function handlePagination(e) {
	e.preventDefault()
	// console.log(e)
	const page = e.target.innerHTML
	// console.log(page)
	// console.log(query.search)
	// const urlSearchParams = new URLSearchParams(window.location.search)
	// const query = Object.fromEntries(urlSearchParams.entries())
	// console.log(query)
	inputSearch.val('')
	getProducts(page)
}

// filter
function changeURL(page = 1, search = '') {
	if (!page) page = 1
	const state = {}
	// console.log(search)

	// const urlSearchParams = new URLSearchParams(window.location.search)
	// const query = Object.fromEntries(urlSearchParams.entries())

	// inputSearch.val('')
	const newURL = `/admin/products?page=${page}&search=${search}`

	history.pushState(state, '', newURL)
}

// firstly, call api list of products
async function getProducts(page, search = '') {
	// const urlSearchParams = new URLSearchParams(window.location.search)
	// const query = Object.fromEntries(urlSearchParams.entries())

	// if(query.search == 'undefined')
	// {
	// 	console.log('hello')
	// 	query.search = ''
	// }

	// console.log(query.search)
	const result = await $.ajax({
		url: `/products/api?page=${page}&search=${search}`,
		method: 'GET',
	})

	// console.log(result)
	productCodes = result.productCodes
	total = result.total
	changeURL(page)
	renderListOfProducts(productCodes)
	showPagination(result.totalPages)
}

if (query.page == '') {
	query.page = 1
}
getProducts(query.page)

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
	// console.log('ok')
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

	if (productCodes.length === 0) {
		table.querySelector('tbody').innerHTML =
			'<h2 style="margin-top: 10px;">Không tìm thấy sản phẩm</h2>'
	}

	document.querySelector('.total-products span').innerHTML = total
}

// renderListOfProducts(productCodes)

// debounce
function debounce(func, timeout = 300) {
	let timer
	return (...args) => {
		clearTimeout(timer)
		timer = setTimeout(() => {
			func.apply(this, args)
		}, timeout)
	}
}
const processChange = debounce(() => searchProduct())

// show more product
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

		// update products
		productCodes = productCodes.filter((item) => {
			return item._id !== idProduct
		})

		let totalProducts = 0
		productCodes.forEach((item) => {
			item.products.forEach((i) => (totalProducts += i.total))
		})

		document.querySelector('.total-products span').innerHTML = totalProducts
	} else {
		alert('Xóa sản phẩm thất bại')
	}
}

// search products
let inputSearch = $('.products-action .action-search input')
async function searchProduct() {
	const lazy = document.querySelector('.lazy-loading')
	lazy.classList.toggle('hide')

	const result = await $.ajax({
		url: `/products/api?search=${inputSearch.val()}`,
		type: 'GET',
	})
	
	console.log(result)
	// console.log(result.productCodes)
	productCodes = result.productCodes
	changeURL(page = '', inputSearch.val())
	renderListOfProducts(productCodes)

	lazy.classList.toggle('hide')
}

$('.products-action .action-search input').on('keyup', processChange)
$('.products-action .action-search i').on('click', processChange)

// filter follow cost
let statusCost = ''
const actionCost = document.querySelector('.action-cost')
actionCost.addEventListener('click', handleActionCost)
function handleActionCost() {
	if (statusCost == 'down' || statusCost == '') {
		productCodes = productCodes.sort((a, b) => a.cost - b.cost)
		statusCost = 'up'

		actionCost.querySelector('span').innerHTML =
			"<i class='fas fa-sort-amount-down-alt'></i>"
	} else if (statusCost == 'up') {
		productCodes = productCodes.sort((a, b) => b.cost - a.cost)
		statusCost = 'down'
		actionCost.querySelector('span').innerHTML =
			'<i class="fas fa-sort-amount-up"></i>'
	}

	renderListOfProducts(productCodes)
}

// filter follow date
let statusDate = ''
const actionDate = document.querySelector('.action-date')
actionDate.addEventListener('click', handleActionDate)
function handleActionDate() {
	if (statusDate == 'down' || statusDate == '') {
		productCodes = productCodes.sort(function (a, b) {
			return new Date(a.createdAt) - new Date(b.createdAt)
		})
		statusDate = 'up'
		actionDate.querySelector('span').innerHTML =
			'<i class="fas fa-sort-amount-down-alt"></i>'
	} else if (statusDate == 'up') {
		productCodes = productCodes.sort(function (a, b) {
			return new Date(b.createdAt) - new Date(a.createdAt)
		})

		statusDate = 'down'

		actionDate.querySelector('span').innerHTML =
			'<i class="fas fa-sort-amount-up"></i>'
	}

	renderListOfProducts(productCodes)
}

// filter follow left
let statusLeft = ''
const actionLeft = document.querySelector('.action-left')
actionLeft.addEventListener('click', handleActionLeft)
function handleActionLeft() {
	if (statusLeft == 'down' || statusLeft == '') {
		productCodes.sort((a, b) => a.total - b.total)

		statusLeft = 'up'

		actionLeft.querySelector('span').innerHTML =
			"<i class='fas fa-sort-amount-down-alt'></i>"
	} else if (statusLeft == 'up') {
		productCodes.sort((a, b) => b.total - a.total)
		statusLeft = 'down'
		actionLeft.querySelector('span').innerHTML =
			'<i class="fas fa-sort-amount-up"></i>'
	}

	renderListOfProducts(productCodes)
}
