function createCookie(name,value,days = 15) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/"; 
}

const form = document.querySelector('form')

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const user = document.querySelector('#user').value
    let email = phoneNumber = user

    const password = document.querySelector('#password').value

    const result = $.ajax({
        url: '/users/login',
        type: 'POST',
        data: {
            password, email, phoneNumber
        }
    })
        .then(data => {
            createCookie('tokenId', data.data.token)
            alert('Đăng nhập thành công')

            // chuyen localStorage ve cart
            // call api

            


            window.history.back()
        })
        .catch(error => {
            alert('Mật khẩu hoặc email/phone không đúng')
            // window.location.href = '/users/login'
        })

})

// khi dang nhap 
// jwt jsonwebtoken
// user, token 