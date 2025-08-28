document.addEventListener('DOMContentLoaded', function () {
    const rows = document.querySelectorAll('tbody tr');
    rows.forEach(row => {
        row.addEventListener('click', function (e) {
            if (!e.target.closest('a')) {
                this.style.backgroundColor = 'rgba(108, 92, 231, 0.15)';
                setTimeout(() => {
                    this.style.backgroundColor = '';
                }, 300);
            }
        });
    });
});