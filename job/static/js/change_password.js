function checkpass() {
    if (document.changepassword.newpassword.value != document.changepassword.confirmpassword.value) {
        alert('New Password and Confirm Password do not match');
        document.changepassword.newpassword.focus();
        return false;
    }
    return true;
}