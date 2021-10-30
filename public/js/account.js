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
$('.show-pass').mousedown(function(){
  $(this).siblings().attr('type','text');
})
$('.show-pass').mouseup(function(){
  $(this).siblings().attr('type','password');
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
const form = document.querySelector('form')

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  const name = $('input[name="fullName"]').val();
  const phone = $('input[name="phoneNumber"]').val();
  const email = $('input[name="email"]').val();
  var oldPass, newPass, confirmPass;
  if ($('.changePass').is(':checked')) {
    const res1 = await $.ajax(
      {
        url: `/account/edit-info`,
        type: 'put',
        data: { name, phone, email }
      })
    if (res1.status == 'success') {
      alert('Cập nhật thông tin thành công')
    } else {
      alert('Cập nhật thông tin thất bại')
    }
    oldPass = $('input[name="user-account__oldPassword"]').val();
    newPass = $('input[name="user-account__newPassword"]').val();
    confirmPass = $('input[name="user-account__confirmPassword"]').val();
    if (newPass == confirmPass) {
      const res2 = await $.ajax(
        {
          url: `/account/edit-pass`,
          type: 'PUT',
          data: { oldPass, newPass, confirmPass }
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
    const res = await $.ajax(
      {
        url: `/account/edit-info`,
        type: 'put',
        data: { name, phone, email }
      })

    if (res.status == 'success') {
      alert('Cập nhật thông tin tài khoản thành công')
      location.reload()
    } else {
      alert('Cập nhật thông tin thất bại')
    }
  }
  // console.log(name, phone, email, oldPass, newPass, confirmPass)
})

//upload avatar
$('#uploadavatar').click(function(){
  $('#FileUploadAvatar').click()
})

//open avatar modal
$('.account-avatar img').click(function(){
  $('.avatar-modal').css('display','flex')
})

//hide avatar modal
$('.avatar-modal').click(function(){
  $(this).css('display','none')
})

$('#cancelavatar').click(function(){
  $('.avatar-modal').css('display','none')
})

$('.avatar-modal__inner').click(function(e){
  e.stopPropagation();
})

//change avatar
$('#FileUploadAvatar').change(function(){
  var fileName = $(this).val().split('\\')[$(this).val().split('\\').length - 1];
  console.log(fileName);
})