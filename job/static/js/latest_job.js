// Add interactive effects
document.addEventListener('DOMContentLoaded', function () {
    const rows = document.querySelectorAll('tbody tr');
    const today = new Date();

    rows.forEach(row => {
        // Add hover effects
        row.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.01)';
            this.style.zIndex = '1';
        });

        row.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)';
            this.style.zIndex = '0';
        });

        // Check job status based on end date
        const dateCell = row.querySelector('td:nth-child(3)');
        if (dateCell) {
            const endDate = new Date(dateCell.textContent);
            if (endDate < today) {
                const statusElement = row.querySelector('.job-status');
                if (statusElement) {
                    statusElement.className = 'job-status status-expired';
                    statusElement.innerHTML = '<i class="fas fa-circle"></i> Expired';

                    // Disable apply button for expired jobs
                    const applyBtn = row.querySelector('.btn-apply');
                    if (applyBtn) {
                        applyBtn.style.opacity = '0.6';
                        applyBtn.style.pointerEvents = 'none';
                        applyBtn.title = 'This job has expired';
                    }
                }
            }
        }
    });
});