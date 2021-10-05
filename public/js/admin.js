let navCurrentItem = 'dashboard'

function showAdminContent() {
	const contents = document.querySelectorAll('.admin-content > div')

	// hide all content
	contents.forEach((content) => {
		content.classList.add('hide')
	})

	// show current content that has nav item active
	document
		.querySelector(`.admin-content > .admin-${navCurrentItem}`)
		.classList.remove('hide')
}

showAdminContent()

// when click and change content of admin
const navItems = document.querySelectorAll('.admin-nav a')

navItems.forEach((item) => {
	item.addEventListener('click', (e) => {
		// xoa het active
		navItems.forEach((item) => item.classList.remove('nav-active'))

		// set active cho item duoc click
		e.currentTarget.classList.add('nav-active')

		// change nav item current
		navCurrentItem = e.currentTarget.getAttribute('name-nav')
		// console.log(navCurrentItem)
		showAdminContent()
	})
})
