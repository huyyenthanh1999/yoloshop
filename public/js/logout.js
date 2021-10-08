console.log(123)

function Logout() {
    // document.cookie = "tokenID=''";
    localStorage.removeItem('tokenId')
    window.location.href = '/'
}