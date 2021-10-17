const form = document.querySelector('form')
form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const formData = new FormData(form)
    // for (let i of formData.entries())
    // console.log(i)

    // const result = $.ajax({
    //     url: '/users/register',
    //     type: 'POST',
    //     data: formData
    // })
    // .then(data => {
    //     // createCookie('tokenId', data.data.token)
    //     // alert('Đăng nhập thành công')

    //     // chuyen localStorage ve cart
    //     // call api
    //     console.log(123)
    //     console.log(data)


    //     // window.history.back()
    // })
    // .catch(error => {
    //     alert('Mật khẩu hoặc email/phone không đúng')
    //     // window.location.href = '/users/login'
    // })
    // const response = await fetch('/users/register', {
    //     method: 'POST', // *GET, POST, PUT, DELETE, etc.
    //     // mode: 'cors', // no-cors, *cors, same-origin
    //     // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //     // credentials: 'same-origin', // include, *same-origin, omit
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Content-Type': 'application/x-www-form-urlencoded',
    //     },
    //     // redirect: 'follow', // manual, *follow, error
    //     // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    //     body: formData // body data type must match "Content-Type" header
    //     // body: formData// body data type must match "Content-Type" header
    // });
    // console.log(await response.json());

    // const result = await $.ajax({

    //     type: "POST",

    //     // enctype: 'multipart/form-data',

    //     url: "/users/register",

    //     data: formData,
    // })
    // console.log(result)
    $.ajax({
        url: '/users/register',
        data: formData,
        // processData: false,
        type: 'POST',
        success: function (data) {
            console.log(data)
        }
    });

})