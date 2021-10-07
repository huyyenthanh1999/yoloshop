const name = document.querySelector('#product-name')
const cost = document.querySelector('#product-cost')
const type = document.querySelector('#product-type')
const color = document.querySelector('#product-color')
const size = document.querySelector('#product-size')
const total = document.querySelector('#product-total')
const description = document.querySelector('#product-description')
const images = document.querySelector('#product-images')



async function getInfoProduct() {
	const url = window.location.href.split('/')

	// see and edit product
	if (url[url.length - 1] == 'add-product') return

	const response = await fetch(`/api/products/${url[url.length - 1]}`)

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

}

getInfoProduct()
