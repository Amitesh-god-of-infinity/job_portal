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

    // Add status indicators based on dates (example logic)
    const today = new Date();
    rows.forEach(row => {
        const dateCell = row.querySelector('td:nth-child(3)');
        if (dateCell) {
            const statusElement = row.querySelector('.job-status');
            // This is example logic - you would need to implement actual status checking
            // based on your job model's start and end dates
            const creationDate = new Date(dateCell.textContent);
            const daysSinceCreation = Math.floor((today - creationDate) / (1000 * 60 * 60 * 24));

            if (daysSinceCreation > 30) {
                statusElement.className = 'job-status status-closed';
                statusElement.innerHTML = '<i class="fas fa-circle"></i> Closed';
            }
        }
    });
});