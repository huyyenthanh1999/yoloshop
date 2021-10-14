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


// submit -> preven
// get data -> formData
// 
