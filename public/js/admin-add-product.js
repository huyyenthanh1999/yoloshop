const form = document.querySelector('form')
const formData = new FormData(form)

// change color
const colorInput = document.querySelector('#product-color')

colorInput.addEventListener('input', () => {
	const previewColor = colorInput.previousElementSibling
	// console.log(previewColor)
	previewColor.style.backgroundColor = colorInput.value
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

// add images
$('#product-images').on('change', function () {
	let files = this.files
	// console.log(files)
	if (files.length == 0) return

	const previewImages = $('.preview-images')

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

	formData.append('size', sizeActive.innerText)

	const name = document.querySelector('#product-name')
	const cost = document.querySelector('#product-cost')
	const type = document.querySelector('#product-type')
	const color = document.querySelector('#product-color')
	const total = document.querySelector('#product-total')
	const description = document.querySelector('#product-description')

	formData.set('name', name.value)
	formData.set('cost', cost.value)
	formData.set('type', type.value)
	formData.set('color', color.value)
	formData.set('total', total.value)
	formData.set('description', description.value)

	// add lazing add product
	const lazy = document.querySelector('.lazy-loading')
	lazy.classList.toggle('hide')

	let response = await fetch('/products/api', {
		method: 'POST',
		body: formData,
	})
	// let result = await response.json()

	// console.log(result)
	if (response.status == 200) {
		lazy.classList.toggle('hide')
		alert('Thêm sản phẩm thành công')
	}
})
