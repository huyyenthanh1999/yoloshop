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
			size.style.borderColor = '#ccc'
			size.classList.remove('active-size')
		})

		e.currentTarget.style.borderColor = 'var(--main-color)'
		e.currentTarget.classList.add('active-size')
	})
})

// add images
$('#product-images').on('change', function () {
	//Get count of selected files
	const countFiles = $(this)[0].files.length
	const imgPath = $(this)[0].value
	const ext = imgPath.substring(imgPath.lastIndexOf('.') + 1).toLowerCase()
	const previewImages = $('.preview-images')
	previewImages.empty()
	if (ext == 'gif' || ext == 'png' || ext == 'jpg' || ext == 'jpeg') {
		// add images
		for (let i = 0; i < countFiles; i++) {
			const reader = new FileReader()
			reader.onload = function (e) {
				$('<img />', {
					src: e.target.result,
					class: 'thumb-image',
				}).appendTo(previewImages)
			}
			previewImages.show()
			reader.readAsDataURL($(this)[0].files[i])
		}
	} else {
		alert('Vui lòng chọn ảnh')
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
	// console.log(formData)
	let response = await fetch('/api/products', {
		method: 'POST',
		body: formData,
	})
	// let result = await response.json()

	if (response.status == 200) {
		alert('Thêm sản phẩm thành công')
		window.location.href = '/'
	}
})
