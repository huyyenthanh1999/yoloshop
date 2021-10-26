activeNavItem('customers')
// console.log(customers)
let customers = []
let total = 0


function formatDate(time) {
	const date = new Date(time)
	return date.toLocaleDateString()
}

// render list of customers
function renderListOfCustomers(customers) {
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
        <td class="name-customer">${formatDate(customer.createdAt)}</td>
        <td class="phone-customer">${customer.phoneNumber}</td>
        <!-- <td class="sold-customer">10</td>  -->
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

	const table = document.querySelector('.admin-customers table')

	const oldTableBody = table.querySelector('tbody')
	oldTableBody && oldTableBody.remove()

	table.appendChild(tbody)

	document.querySelector('.total-customers span').innerHTML = total
}

async function getData(){
    const result = await $.ajax({
		url: `/users`,
		type: 'GET',
	})

	// console.log(result.productCodes)
    customers = result.users
	// changeURL(page = '', inputSearch.val())
	renderListOfCustomers(customers)
    console.log(customers)
}

getData()

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
const processChange = debounce(() => searchCustomer())

// search
let inputSearch = $('.customers-action .action-search input')
async function searchCustomer() {
	const result = await $.ajax({
		url: `/users?search=${inputSearch.val()}`,
		type: 'GET',
	})

	// console.log(result.productCodes)
	let customers = result.users
	// changeURL(page = '', inputSearch.val())
	renderListOfCustomers(customers)
    console.log(customers)
}

$('.customers-action .action-search input').on('keyup', processChange)
$('.customers-action .action-search i').on('click', processChange)