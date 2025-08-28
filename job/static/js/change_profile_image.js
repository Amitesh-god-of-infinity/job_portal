document.addEventListener('DOMContentLoaded', function () {
    const fileInput = document.getElementById('image');
    const profileImg = document.querySelector('.profile-img');

    fileInput.addEventListener('change', function (e) {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();

            reader.onload = function (e) {
                profileImg.src = e.target.result;
            }

            reader.readAsDataURL(e.target.files[0]);
        }
    });

    // Add animation to the container on load
    const container = document.querySelector('.profile-container');
    container.style.animation = 'fadeIn 0.6s ease-out';
});