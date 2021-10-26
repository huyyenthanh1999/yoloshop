activeNavItem('customers')
// console.log(customers)
let customers = []
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
			<a href="/admin/customers?page=${i}" onclick="handlePagination(event)">
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
	getUsers(page)
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

// filter
function changeURL(page = 1, search = '') {
	if (!page) page = 1
	const state = {}
	// console.log(search)

	// const urlSearchParams = new URLSearchParams(window.location.search)
	// const query = Object.fromEntries(urlSearchParams.entries())

	// inputSearch.val('')
	const newURL = `/admin/customers?page=${page}&search=${search}`

	history.pushState(state, '', newURL)
}


async function getUsers(page){
	if(!page) page = 1
	console.log(page)
    const result = await $.ajax({
		url: `/users?page=${page}`,
		type: 'GET',
	})

	// console.log(result.productCodes)
    customers = result.users
	total = result.total
	changeURL(page, inputSearch.val())
	renderListOfCustomers(customers)
	showPagination(result.totalPages)
    // console.log(customers)
}

getUsers()

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