function logout() {
    document.cookie = "tokenId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    alert('Bạn đã đăng xuất')
    window.location.reload();
}
