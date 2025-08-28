// Add interactive effects
document.addEventListener('DOMContentLoaded', function () {
    const rows = document.querySelectorAll('tbody tr');
    rows.forEach(row => {
        row.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.01)';
            this.style.zIndex = '1';
        });

        row.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)';
            this.style.zIndex = '0';
        });
    });
});