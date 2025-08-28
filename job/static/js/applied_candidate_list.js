document.addEventListener('DOMContentLoaded', function() {
        const rows = document.querySelectorAll('tbody tr');
        rows.forEach(row => {
            row.addEventListener('click', function(e) {
                if (!e.target.closest('a')) {
                    this.style.backgroundColor = 'rgba(108, 92, 231, 0.15)';
                    setTimeout(() => {
                        this.style.backgroundColor = '';
                    }, 300);
                }
            });
        });

        // Calculate average experience for the stats card
        const experienceElements = document.querySelectorAll('td:nth-child(5)');
        if (experienceElements.length > 0) {
            let totalExp = 0;
            experienceElements.forEach(td => {
                const expText = td.textContent.trim();
                const expValue = parseFloat(expText);
                if (!isNaN(expValue)) {
                    totalExp += expValue;
                }
            });
            
            const avgExp = totalExp / experienceElements.length;
            document.querySelector('.stat-card:nth-child(3) p').textContent = avgExp.toFixed(1) + ' yrs';
        }
    });