// const urlSearchParams = new URLSearchParams(window.location.search)
// const params = Object.fromEntries(urlSearchParams.entries())

// let type = [],
// 	color = [],
// 	size = [],
// 	page = 1,
// 	totalPages = 0,
// 	search = ''

// if (params.type) type = params.type.split(',')
// if (params.color) color = params.color.split(',')
// if (params.size) size = params.size.split(',')
// if (params.page) page = params.page
// if (params.search) search = params.search

// // console.log(type, color, size)

// function render(products) {
// 	$('.product-content').html('')
// 	$('.product-content').append('<div class="grid-rows"></div>')

// 	if (products.length == 0)
// 		$('.product-content .grid-rows').append(
// 			'<p style="font-size: 30px;">Không tìm thấy sản phẩm</p>'
// 		)

// 	for (var i = 0; i <= products.length - 1; i++) {
// 		$('.product-content .grid-rows').append(`
//                     <div class="grid-col-3 md-grid-col-2">
//                         <div class="product-card pb-2">
//                             <a href="/products/detail/${products[i]._id}">
//                                 <div class="product-card__image">
//                                     <img src="${
// 																			products[i].images[0]
// 																		}" alt="" />
//                                     <img src="${
// 																			products[i].images[1]
// 																		}" alt="" />
//                                 </div>
//                                 <h3 class="product-card__name">${
// 																	products[i].name
// 																}</h3>
//                                 <div class="product-card__price">${products[
// 																	i
// 																].cost.toLocaleString()}</div>
//                             </a>
//                             <div class="product-card__btn">
//                                 <a href="/products/detail/${products[i]._id}">
// 									<button class="btn btn-primary btn-small">
// 										<span class="btn-txt">Chọn mua</span>
// 										<span class="btn-icon">
// 											<i class="bx bx-cart bx-tada"></i>
// 										</span>
// 									</button>
// 								</a>
//                             </div>
//                         </div>
//                     </div>
//                 `)
// 	}

// 	$('.product-content').append('<div class="pagination"></div>')
// 	showPaginationForProductsPage()
// 	autoCheckInput()
// }

// $('.custom-checkbox input').change(async (e) => {
// 	// type
// 	type = []
// 	document
// 		.querySelectorAll('.product-filter-section__content.type input:checked')
// 		.forEach((item) => type.push(item.value))

// 	if (type.length > 0) search = ''

// 	// color
// 	color = []
// 	document
// 		.querySelectorAll('.product-filter-section__content.color input:checked')
// 		.forEach((item) => color.push(item.value))

// 	// size
// 	size = []
// 	document
// 		.querySelectorAll('.product-filter-section__content.size input:checked')
// 		.forEach((item) => size.push(item.value))
// 	getProducts()
// })

// function changeURL(url) {
// 	history.pushState(null, null, url)
// }

// function autoCheckInput() {
// 	// type
// 	type.forEach((item) => {
// 		$(`.product-filter-section__content.type input[value=${item}]`).prop(
// 			'checked',
// 			true
// 		)
// 	})
// 	// color
// 	color.forEach((item) => {
// 		$(`.product-filter-section__content.color input[value=${item}]`).prop(
// 			'checked',
// 			true
// 		)
// 	})
// 	// size
// 	size.forEach((item) => {
// 		$(`.product-filter-section__content.size input[value=${item}]`).prop(
// 			'checked',
// 			true
// 		)
// 	})
// }

// function showPaginationForProductsPage() {
// 	// const containerPagination = document.querySelector('.pagination')
// 	// let html = ''
// 	// for (let i = 1; i <= totalPages; i++) {
// 	// 	html += `
// 	// 		<a href="/products?page=${page}&type=${type}&color=${color}&size=${size}" onclick="handlePagination(event)" class="${
// 	// 		page == i ? 'active' : ''
// 	// 	}">
// 	// 			${i}
// 	// 		</a>
// 	// 	`
// 	// }
// 	// containerPagination.innerHTML = html

// 	$('.pagination').html('')
// 	if (totalPages > 0) {
// 		$('.pagination').append('<ul class="list-number__pages"></ul>')
// 		//first item
// 		if (current == 1) {
// 			$('.list-number__pages').append(`
// 				<li class="disabled">
// 					<a>First</a>
// 		  		</li>
// 			`)
// 		} else {
// 			$('.list-number__pages').append(`
// 				<li>
// 					<a onclick="getProducts(${1})">First</a>
// 		  		</li>
// 			`)
// 		}

// 		//item
// 		var i = Number(current) > 3 ? Number(current) - 2 : 1
// 		if (i !== 1) {
// 			$('.list-number__pages').append(`
// 				<li class="disabled">
// 					<a>...</a>
// 				</li>
// 			`)
// 		}
// 		for (; i <= Number(current) + 2 && i <= totalPages; i++) {
// 			if (i == current) {
// 				$('.list-number__pages').append(`
// 					<li class="active">
// 						<a onclick="getProducts(${i})">
// 						${i}
// 						</a>
// 					</li>`)
// 			} else {
// 				$('.list-number__pages').append(`
// 					<li>
// 						<a onclick="getProducts(${i})">
// 							${i}
// 						</a>
// 					</li>
// 				`)
// 			}
// 			if (i == Number(current) + 2 && i < totalPages) {
// 				$('.list-number__pages').append(`
// 					<li class="disabled">
// 						<a>...</a>
// 					</li>
// 				`)
// 			}
// 		}

// 		//last item
// 		if (current == totalPages) {
// 			$('.list-number__pages').append(`
// 				<li class="disabled">
// 					<a>Last</a>
// 		  		</li>
// 			`)
// 		} else {
// 			$('.list-number__pages').append(`
// 				<li>
// 					<a onclick="getProducts(${totalPages})">Last</a>
// 		  		</li>
// 			`)
// 		}
// 	}
// }

// function handlePagination(e) {
// 	e.preventDefault()
// 	page = +e.target.innerHTML
// 	getProducts()
// }

// // call api
// async function getProducts() {
// 	showLazy()
// 	const url = `/products?search=${search}&page=${page}&type=${type}&color=${color}&size=${size}`
// 	const result = await $.ajax({
// 		url,
// 		type: 'post',
// 	})

// 	hideLazy()
// 	totalPages = result.pages
// 	// console.log(result)
// 	products = result.products

// 	// console.log(products)
// 	changeURL(
// 		`/products?search=${search}&page=${page}&type=${type}&color=${color}&size=${size}`
// 	)
// 	render(products)
// }

// getProducts()
