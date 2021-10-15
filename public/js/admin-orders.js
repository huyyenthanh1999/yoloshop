activeNavItem('orders')
// console.log(orders)

// render list of orders
function renderListOfOrders() {
	let html = ''
	orders.forEach((order, index) => {
		html += `
        <tr>
        <td class="stt-order">${index + 1}</td>
        <td class="id-order">
            <a href="/users/${order._id}">${order._id}</a>
        </td>
        <td class="cover-order">
            <img
                src="${order.avatar}"
                alt=""
            />
        </td>
        <td class="name-order">${order.name}</td>
        <td class="sold-order">10</td>
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
        <td class="action-order">
            <a href="/admin/orders/${order._id}">
                <button>
                    <i class="far fa-eye"></i>
                </button>
            </a>
            <a href="/admin/orders/${order._id}">
                <button>
                    <i class="fas fa-edit"></i>
                </button>
            </a>
            <a href="#" onclick="deleteOrder(event)">
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

	document.querySelector('.admin-orders table').appendChild(tbody)

	document.querySelector('.total-orders span').innerHTML = total
}

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
