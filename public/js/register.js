const form = document.querySelector('#form-register')
// console.log(form)
form.addEventListener('submit', (e) => {
	e.preventDefault()

	const formData = new FormData(form)
	// for (let i of formData.entries()) console.log(i)

	fetch('/auth/register', {
		method: 'POST',
		body: formData,
	})
		.then((response) => response.json())
		.then((result) => {
			console.log('Success:', result)
			if(result.status = 'fail')
				alert('User đã tồn tại')
			
			else {
				alert('Đăng kí thành công')
				window.location.href = '/auth/login'
			}
		})
		.catch((error) => {
			console.log('Error:', error)
		})
})
