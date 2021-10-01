const app = Vue.createApp({
	data() {
		return {
			navItemCurrent: 'dashboard',
			adminNavItem: document.querySelectorAll('.admin-nav a'),
		}
	},
	mounted() {
		// click nav item
		this.adminNavItem.forEach((item) => {
			item.addEventListener('click', (e) => {
				// xoa het active
				this.adminNavItem.forEach((item) => item.classList.remove('nav-active'))

				// set active cho item duoc click
				e.currentTarget.classList.add('nav-active')

				// change nav item current
				this.navItemCurrent = e.target.className.split(' ')[0]
				console.log(this.navItemCurrent)
			})
		})
	},
})
app.mount('.admin-content')
