const AdminProducts = {
	data() {
		return {
			productCodes: [],
            total: 0,
            query: ''
		}
	},
    computed: {
        
    }
}

Vue.createApp(AdminProducts).mount('.admin-products')
