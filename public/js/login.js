const form = document.querySelector('form')

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const user = document.querySelector('#user').value
    let email = phoneNumber = user

    const password = document.querySelector('#password').value


    const result = $.ajax({
        url: '/api/users/login',
        type: 'POST',
        data: {
            password, email, phoneNumber
        }
    })
        .then(data => {
            console.log(data)
            localStorage.setItem('tokenId', data.data.token)
            // document.cookie = `tokenID=${data.data.token}`
            window.location.href = '/'
        })
        .catch(error => {
            alert('Mật khẩu hoặc email/phone không đúng')
            // window.location.href = '/users/login'
        })

})

// khi dang nhap 
// jwt jsonwebtoken
// user, token 