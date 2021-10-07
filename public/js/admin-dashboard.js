const boxes = document.querySelectorAll('.admin-statistical .box')
boxes.forEach((box) => {
	box.addEventListener('click', (e) => {
		window.location.href = '/admin/' + e.currentTarget.getAttribute('name-nav')
	})
})

activeNavItem('dashboard')

$.ajax({
    url: '/admin/adminDashboardData'
})
.then(data => {
    // console.log(data);
	document.querySelector('.admin-statistical .box[name-nav="products"] .text').innerHTML = data.data.productsCount;
	document.querySelector('.admin-statistical .box[name-nav="customers"] .text').innerHTML = data.data.customersCount;
	document.querySelector('.admin-statistical .box[name-nav="orders"] .text').innerHTML = data.data.ordersCount;
	document.querySelector('.admin-statistical .box[name-nav="sales"] .text').innerHTML = data.data.salesCount;
})
