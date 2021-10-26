activeNavItem('orders')
// console.log(orders)
let orders = []
let total = 0

function formatDate(time) {
	const date = new Date(time)
	return date.toLocaleDateString()
}

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

// render list of orders
function renderListOfOrders(orders) {
	let html = ''
	orders.forEach((order, i) => {
		html += `
        <tr>
                    <td> ${i+1} </td>
                    <td>
                        ${ order.receiverName}
                    </td>
                    <td>
                        ${ order.phoneNumber}
                    </td>
                    <td>
                        ${order.products.length} sản phẩm
                    </td>
                    <td> ${formatDate(order.createdAt)}</td>
                    <td> ${order.totalCost} </td>
                    <td> ${order.payment == 'cod'? 'Ship cod' : 'Chuyển khoản'} </td>
                    <td> ${order.status} </td>
                    <td>
                        <button class="detail-order">
                            <a href="/admin/orders/${order._id}">
                                Chi tiết
                            </a>
                        </button>
                        <button class="delivery-order ">
                            Giao hàng
                        </button>
                        <button class="delete-order">
                            Hủy đơn hàng
                        </button>
                    </td>
                </tr>
        
        `
	})

	// create tbody
	const tbody = document.createElement('tbody')
	tbody.innerHTML = html

	const table = document.querySelector('.admin-orders table')

	const oldTableBody = table.querySelector('tbody')
	oldTableBody && oldTableBody.remove()

	table.appendChild(tbody)

	if (orders.length === 0) {
		table.querySelector('tbody').innerHTML =
			'<h2 style="margin-top: 10px;">Không tìm thấy đơn hàng</h2>'
	}

	document.querySelector('.total-orders span').innerHTML = total
}

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

async function getOrders(page = 1, search = '') {
	const result = await $.ajax({
		url: `/orders/api?page=${page}&search=${search}`,
		method: 'GET',
	})

	// console.log(result)
	orders = result.orders
	total = result.total
	console.log(orders)
	// changeURL(page)
	renderListOfOrders(orders)
	showPagination(result.totalPages)
}

getOrders()

// renderListOfOrders()

// async function deleteOrder(event) {
// 	event.preventDefault()

// 	const tr = event.target.closest('tr')
// 	// console.log(tr)

// 	const idorder = tr.querySelector('.id-order a').innerText
// 	const conf = confirm('Bạn chắc chắn muốn xóa khách hàng')
// 	// console.log(conf)
// 	if (!conf) return

//     // add lazing add product
// 	const lazy = document.querySelector('.lazy-loading')
// 	lazy.classList.toggle('hide')

// 	const res = await $.ajax({
// 		url: `/users/${idorder}`,
// 		type: 'delete',
// 	})

// 	// console.log(res.status == 'success')
// 	if (res.status == 'success') {
//         lazy.classList.toggle('hide')
// 		alert('Xóa khách hàng thành công')
// 		tr.remove()

// 		document.querySelector('.total-orders span').innerHTML--
// 	} else {
// 		alert('Xóa khách hàng thất bại')
// 	}
// }
