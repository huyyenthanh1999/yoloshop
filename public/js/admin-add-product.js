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
	let files = $('#product-images').get(0).files
	// console.log(files)
	const previewImages = $('.preview-images')

	if (files.length > 0) {
		previewImages.empty()
	}

	for (let i = 0; i < files.length; i++) {
		const reader = new FileReader()

		reader.onload = function (e) {
			$('<img />', {
				src: e.target.result,
			}).appendTo(previewImages)
		}
		reader.readAsDataURL(files[i])
	}
})

// add product
const form = document.querySelector('form')
form.addEventListener('submit', async (e) => {
	e.preventDefault()
	const formData = new FormData(form)

	formData.append(
		'size',
		document.querySelector('#product-size > .active-size').innerText
	)

	formData.delete('images')

	// add images to formData
	const previewImages = document.querySelectorAll('.preview-images img')
	if (previewImages.length == 0) return alert('Vui lòng chọn ảnh')


	const src = []
	previewImages.forEach((img) => {
		src.push(img.src)
	})

	const blob = new Blob([src], { type: "'image/png'"});
	
	formData.append('images', src)

	// const imgBlob = new Blob([src], { type: 'image/jpeg' } );

    // formData.append('images', imgBlob);

	// add lazing add product
	const lazy = document.querySelector('.lazy-loading')
	lazy.classList.toggle('hide')

	// console.log(formData)
	let response = await fetch('/api/products', {
		method: 'POST',
		body: formData,
	})
	// let result = await response.json()

	if (response.status == 200) {
		lazy.classList.toggle('hide')
		alert('Thêm sản phẩm thành công')
	}
})
