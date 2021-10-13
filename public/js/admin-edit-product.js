const name = document.querySelector('#product-name')
const cost = document.querySelector('#product-cost')
const type = document.querySelector('#product-type')
const color = document.querySelector('#product-color')
const size = document.querySelector('#product-size')
const total = document.querySelector('#product-total')
const description = document.querySelector('#product-description')
const images = document.querySelector('#product-images')


const formData = new FormData()
const form = document.querySelector('form')
const previewImages = $('.preview-images')



// change color
color.addEventListener('input', () => {
	const previewColor = color.previousElementSibling
	// console.log(previewColor)
	previewColor.style.backgroundColor = color.value
})

// change size
const sizeInputs = document.querySelectorAll('.wrap-size > div')
// console.log(sizeInputs)
sizeInputs.forEach((size) => {
	size.addEventListener('click', (e) => {
		sizeInputs.forEach((size) => {
			size.classList.remove('active-size')
		})

		e.currentTarget.classList.add('active-size')
	})
})


const url = window.location.href.split('/')
let idProduct = url[url.length - 1]



async function getInfoProduct() {
	const response = await fetch(`/products/api/${idProduct}`)

	let product = await response.json()
	product = product.data.product
	// console.log(product)

	// add product to html
	document.querySelector('.title-header').innerHTML = 'Thông tin sản phẩm'
	document.querySelector('.add-product-button').innerHTML = 'Sửa sản phẩm'

	name.value = product.idProductCode.name
	cost.value = product.idProductCode.cost
	type.value = product.idProductCode.type
	color.value = product.color
	document.querySelector('.preview-color').style.backgroundColor = color.value

	size.querySelector(`.size-${product.size}`).classList.add('active-size')

	total.value = product.total
	description.value = product.idProductCode.description

	// images
    const files = product.idProductCode.images
    for (let i = 0; i < files.length; i++) {
        $('<img />', {
            src: files[i],
        }).appendTo(previewImages)
    }

}

getInfoProduct()


// add images
$('#product-images').on('change', function () {
	let files = this.files
	// console.log(files)
	if (files.length == 0) return

	previewImages.empty()
	formData.delete('images')

	for (let i = 0; i < files.length; i++) {
		$('<img />', {
			src: URL.createObjectURL(files[i]),
		}).appendTo(previewImages)

		// append img to formData
		formData.append('images', files[i])
	}
})



// add product
form.addEventListener('submit', async (e) => {
	e.preventDefault()

	const sizeActive = document.querySelector('#product-size > .active-size')
	if (!sizeActive) {
		alert('Vui lòng nhập kích thước sản phẩm')
		return
	}

	formData.set('size', sizeActive.innerText)

	formData.set('name', name.value)
	formData.set('cost', cost.value)
	formData.set('type', type.value)
	formData.set('color', color.value)
	formData.set('total', total.value)
	formData.set('description', description.value)

	// warning when missing images of the product
	const previewImages = $('.preview-images img')
	if(previewImages.length == 0) 
	{
		alert('Vui lòng chọn ảnh sản phẩm')
		return
	}

	for(let i of formData.entries())
		console.log(i)

	// add lazing add product
	const lazy = document.querySelector('.lazy-loading')
	lazy.classList.toggle('hide')

	let response = await fetch('/products/api/' + idProduct, {
		method: 'PUT',
		body: formData,
	})
	// let result = await response.json()

	// console.log(result)
	if (response.status == 200) {
		lazy.classList.toggle('hide')
		alert('Sửa sản phẩm thành công')
        // window.location.href = '/admin/products'
	}
})