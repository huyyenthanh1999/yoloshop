const monthNames = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
]
let qntYears = 60
let selectYear = $('#year')
let selectMonth = $('#month')
let selectDay = $('#day')
let currentYear = new Date().getFullYear()

for (var y = 0; y < qntYears; y++) {
	let date = new Date(currentYear)
	let yearElem = document.createElement('option')
	yearElem.value = currentYear
	yearElem.textContent = currentYear
	selectYear.append(yearElem)
	currentYear--
}

for (var m = 0; m < 12; m++) {
	let month = monthNames[m]
	let monthElem = document.createElement('option')
	monthElem.value = m
	monthElem.textContent = month
	selectMonth.append(monthElem)
}

var d = new Date()
var month = d.getMonth()
var year = d.getFullYear()
var day = d.getDate()

selectYear.val(year)
// selectYear.on("change", AdjustDays);
selectMonth.val(month)
// selectMonth.on("change", AdjustDays);

AdjustDays()
selectDay.val(day)

function AdjustDays() {
	var year = selectYear.val()
	var month = parseInt(selectMonth.val()) + 1
	selectDay.empty()

	//get the last day, so the number of days in that month
	var days = new Date(year, month, 0).getDate()

	//lets create the days of that month
	for (var d = 1; d <= days; d++) {
		var dayElem = document.createElement('option')
		dayElem.value = d
		dayElem.textContent = d
		selectDay.append(dayElem)
	}
}

//show change pass info
function changePassActive() {
	if ($('.changePass').is(':checked')) {
		$('#showChangePass').attr('checked', true)
		$(
			"[name='user-account__oldPassword'], [name='user-account__newPassword'], [name='user-account__passwordConfirm']"
		).prop('required', true)
		$('#showChangePass:checked ~ .form-control').css(
			'display',
			'flex !important'
		)
	} else {
		$('#showChangePass').removeAttr('checked')
		$(
			"[name='user-account__oldPassword'], [name='user-account__newPassword'], [name='user-account__passwordConfirm']"
		).prop('required', false)
		$('#showChangePass:checked ~ .form-control').css('display', 'none')
	}
}

//show/hide password
$('.show-pass').mousedown(function () {
	$(this).siblings().attr('type', 'text')
})
$('.show-pass').mouseup(function () {
	$(this).siblings().attr('type', 'password')
})

// change active account_action item
var accountActionItems = document.querySelectorAll('.account-action__item')
var acountRights = document.querySelectorAll('.account-right')
accountActionItems[0].classList.add('active')
acountRights[0].classList.add('active')
accountActionItems.forEach((accountActionItem, index) => {
	accountActionItem.addEventListener('click', () => {
		removeActiveAction()
		accountActionItem.classList.add('active')
		acountRights[index].classList.add('active')
	})
})

//remove active account_action item
function removeActiveAction() {
	accountActionItems.forEach((accountActionItem) => {
		accountActionItem.classList.remove('active')
	})
	acountRights.forEach((acountRight) => {
		acountRight.classList.remove('active')
	})
}

var url = window.location.search
url = url.replace('?', '')
if (url == 'orders') {
	$('.my-orders').click()
}

// submit -> preven
// get data -> formData
//

const formData = new FormData()
const form = document.querySelector('form.info')

form.addEventListener('submit', async (e) => {
	e.preventDefault()
	const name = $('input[name="fullName"]').val()
	const phone = $('input[name="phoneNumber"]').val()
	const email = $('input[name="email"]').val()
	var oldPass, newPass, confirmPass
	if ($('.changePass').is(':checked')) {
		const res1 = await $.ajax({
			url: `/account/edit-info`,
			type: 'put',
			data: { name, phone, email },
		})
		if (res1.status == 'success') {
			alert('Cập nhật thông tin thành công')
		} else {
			alert('Cập nhật thông tin thất bại')
		}
		oldPass = $('input[name="user-account__oldPassword"]').val()
		newPass = $('input[name="user-account__newPassword"]').val()
		confirmPass = $('input[name="user-account__confirmPassword"]').val()
		if (newPass == confirmPass) {
			const res2 = await $.ajax({
				url: `/account/edit-pass`,
				type: 'PUT',
				data: { oldPass, newPass, confirmPass },
			})
			if (res2.status == 'success') {
				alert(res2.message)
				location.reload()
			} else {
				alert(res2.message)
			}
		} else {
			alert('Mật khẩu mới không trùng khớp')
		}
	} else {
		const res = await $.ajax({
			url: `/account/edit-info`,
			type: 'put',
			data: { name, phone, email },
		})

		if (res.status == 'success') {
			alert('Cập nhật thông tin tài khoản thành công')
			location.reload()
		} else {
			alert('Cập nhật thông tin thất bại')
		}
	}
})

//upload avatar
$('#uploadavatar').click(function () {
	$('#FileUploadAvatar').click()
})

//open avatar modal
$('.account-avatar img').click(function () {
	$('.avatar-modal').css('display', 'flex')
})

//hide avatar modal
$('.avatar-modal').click(function () {
	$(this).css('display', 'none')
})

$('#cancelavatar').click(function () {
	$('.avatar-modal').css('display', 'none')
})

$('.avatar-modal__inner').click(function (e) {
	e.stopPropagation()
})

//change avatar
const lazy = document.querySelector('.circle-loading')
$('#FileUploadAvatar').change(async function () {
	let [file] = this.files
	if (file) {
		// upload preview avatar
		$('.avatar-preview img').attr('src', URL.createObjectURL(file))
	}

	const formData = new FormData()
	formData.set('avatar', file)

	// add lazing avatar
	lazy.classList.toggle('hide')

	let response = await fetch('/account/edit-avatar', {
		method: 'PUT',
		body: formData,
	})

	if (response.status == 200) {
		lazy.classList.toggle('hide')
		alert('Sửa avatar thành công')
		//change avatar
		$('.account-avatar img').attr('src', URL.createObjectURL(file))
	} else {
		lazy.classList.toggle('hide')
		alert('Sửa avatar thất bại')
	}
})

//remove avatar
$('#removeavatar').click(async function () {
	if (confirm('Are you sure you want to delete current avatar?')) {
		var src = '/public/images/userImg/default-avatar.png'
		$('.avatar-preview img').attr('src', src)

		const formData = new FormData()
		formData.set('avatar', src)
		lazy.classList.toggle('hide')

		let response = await fetch('/account/edit-avatar', {
			method: 'PUT',
			body: formData,
		})

		if (response.status == 200) {
			lazy.classList.toggle('hide')
			alert('Xóa avatar thành công')
			//change avatar
			$('.account-avatar img').attr('src', src)
		} else {
			lazy.classList.toggle('hide')
			alert('Xóa avatar thất bại')
		}
	}
})

//cancel update avatar
$('#cancelavatar').click(function () {
	$('.avatar-modal').css('display', 'none')
})

async function cancelOrder(event) {
	event.preventDefault()
	const tr = event.target.closest('tr')

	const id = tr.querySelector('td').innerHTML

	const result = await $.ajax({
		url: `/orders/api/${id}/cancel`,
		type: 'put',
	})

	if (result.status == 'success') {
		alert(result.message)
		tr.querySelector('.order-status').innerHTML = 'cancelled'
	} else {
		alert('Hủy đơn hàng thất bại')
	}
}
