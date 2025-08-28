document.getElementById('mobile-menu').addEventListener('click', function () {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.toggle('active');

    // Toggle between hamburger and close icon
    const icon = this.querySelector('i');
    if (icon.classList.contains('fa-bars')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});