document.addEventListener('DOMContentLoaded', function () {
    const fileInput = document.getElementById('logo');
    const previewContainer = document.getElementById('preview-container');
    const imagePreview = document.getElementById('image-preview');

    // Live preview of selected image
    fileInput.addEventListener('change', function (e) {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();

            reader.onload = function (e) {
                imagePreview.src = e.target.result;
                previewContainer.style.display = 'block';

                // Smooth scroll to preview
                setTimeout(() => {
                    previewContainer.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }, 300);
            }

            reader.readAsDataURL(e.target.files[0]);
        } else {
            previewContainer.style.display = 'none';
        }
    });

    // Form validation
    const form = document.querySelector('form');
    form.addEventListener('submit', function (e) {
        const file = fileInput.files[0];
        if (!file) {
            e.preventDefault();
            alert('Please select a logo image to upload.');
            fileInput.focus();
            return;
        }

        // Check file type
        const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'];
        if (!validTypes.includes(file.type)) {
            e.preventDefault();
            alert('Please select a valid image file (JPEG, PNG, GIF, or SVG).');
            fileInput.value = '';
            previewContainer.style.display = 'none';
            return;
        }

        // Check file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            e.preventDefault();
            alert('File size must be less than 5MB.');
            fileInput.value = '';
            previewContainer.style.display = 'none';
            return;
        }
    });
});