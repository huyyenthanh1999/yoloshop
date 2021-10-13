activeNavItem('customers')
// console.log(customers)

// render list of customers
function renderListOfCustomers() {
	let html = ''
	customers.forEach((customer, index) => {
		html += `
        <tr>
        <td class="stt-customer">${index + 1}</td>
        <td class="id-customer">
            <a href="/users/${customer._id}">${customer._id}</a>
        </td>
        <td class="cover-customer">
            <img
                src="${customer.avatar}"
                alt=""
            />
        </td>
        <td class="name-customer">${customer.name}</td>
        <td class="sold-customer">10</td>
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
        <td class="action-customer">
            <a href="/admin/customers/${customer._id}">
                <button>
                    <i class="far fa-eye"></i>
                </button>
            </a>
            <a href="/admin/customers/${customer._id}">
                <button>
                    <i class="fas fa-edit"></i>
                </button>
            </a>
            <a href="#" onclick="deleteCustomer(event)">
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

	document.querySelector('.admin-customers table').appendChild(tbody)

	document.querySelector('.total-customers span').innerHTML = total
}

renderListOfCustomers()


async function deleteCustomer(event) {
	event.preventDefault()

	const tr = event.target.closest('tr')
	// console.log(tr)

	const idCustomer = tr.querySelector('.id-customer a').innerText
	const conf = confirm('Bạn chắc chắn muốn xóa khách hàng')
	// console.log(conf)
	if (!conf) return

    // add lazing add product
	const lazy = document.querySelector('.lazy-loading')
	lazy.classList.toggle('hide')

	const res = await $.ajax({
		url: `/users/${idCustomer}`,
		type: 'delete',
	})

	// console.log(res.status == 'success')
	if (res.status == 'success') {
        lazy.classList.toggle('hide')
		alert('Xóa khách hàng thành công')
		tr.remove()

		document.querySelector('.total-customers span').innerHTML--
	} else {
		alert('Xóa khách hàng thất bại')
	}
}
