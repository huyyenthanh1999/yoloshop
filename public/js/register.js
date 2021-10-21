const form = document.querySelector('#form-register')
console.log(form)
form.addEventListener('submit', (e) => {
	e.preventDefault()

	const formData = new FormData(form)
	for (let i of formData.entries()) console.log(i)

	fetch('/users/register', {
		method: 'POST',
		body: formData,
		// headers: { 'Content-Type': 'application/json' },
		headers: {
			// 'Content-Type': 'application/json',
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
	})
		.then((response) => response.json())
		.then((result) => {
			console.log('Success:', result)
		})
		.catch((error) => {
			console.log('Error:', error)
		})
	// $.ajax({
	// 	url: '/users/register',
	// 	data: formData,
	// 	contentType: 'application/json',
	// 	type: 'POST',
	// })
	// .then(data => {
	//     console.log(data)
	// })
})
