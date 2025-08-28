document.addEventListener('DOMContentLoaded', function () {
    const detailRows = document.querySelectorAll('.detail-row');
    const logo = document.querySelector('.company-logo');

    // Add staggered animation to detail rows
    detailRows.forEach((row, index) => {
        row.style.animationDelay = `${index * 0.1}s`;
        row.style.animation = 'fadeIn 0.5s ease-out forwards';
        row.style.opacity = '0';
    });
});