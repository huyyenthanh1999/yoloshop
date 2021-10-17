function createCookie(name, value, days = 15) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

const form = document.querySelector('form')
form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const confirm = document.querySelector('#confirm').value
    const password = document.querySelector('#password').value

    // check 2 
    if (password != confirm) {
        alert('Mat khau khong khop')
        return
    }

    const name = document.querySelector('#user').value
    const phoneNumber = document.querySelector('#phoneNumber').value
    const email = document.querySelector('#email').value


    // const password = document.querySelector('#password').value
    $.ajax({
        url: '/users/register',
        data: {
            name, phoneNumber, email, password
        },
        // processData: false,
        type: 'POST',
    })
        .then(data => {
            createCookie('tokenId', data.data.token)
            alert('Đăng kí thành công')

            window.location.href = '/'

        })
        .catch(error => {
            alert('Mật khẩu hoặc email/phone không đúng')
        })
})