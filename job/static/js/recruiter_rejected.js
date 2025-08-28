document.addEventListener('DOMContentLoaded', function () {
    // Add interactive effects to table rows
    const tableRows = document.querySelectorAll('.data-table tr');
    tableRows.forEach(row => {
        row.addEventListener('click', function (e) {
            if (!e.target.closest('a')) {
                this.style.backgroundColor = 'rgba(108, 92, 231, 0.15)';
                setTimeout(() => {
                    this.style.backgroundColor = '';
                }, 300);
            }
        });
    });

    // Add confirmation for status change
    const statusButtons = document.querySelectorAll('.btn-success');
    statusButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            if (!confirm('Are you sure you want to change this recruiter\'s status?')) {
                e.preventDefault();
            }
        });
    });

    // Add sorting functionality
    const table = document.getElementById('recruiters-table');
    const headers = table.querySelectorAll('th');
    let sortDirection = 1;

    headers.forEach((header, index) => {
        if (index !== headers.length - 1) { // Don't add sorting to action column
            header.style.cursor = 'pointer';
            header.addEventListener('click', () => {
                sortTable(index);
            });
        }
    });

    function sortTable(column) {
        const tbody = table.querySelector('tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));

        rows.sort((a, b) => {
            const aValue = a.cells[column].textContent.trim();
            const bValue = b.cells[column].textContent.trim();

            // Check if values are numeric
            if (!isNaN(aValue) && !isNaN(bValue)) {
                return (parseFloat(aValue) - parseFloat(bValue)) * sortDirection;
            }

            return aValue.localeCompare(bValue) * sortDirection;
        });

        // Remove existing rows
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild);
        }

        // Add sorted rows
        rows.forEach(row => tbody.appendChild(row));

        // Toggle sort direction
        sortDirection *= -1;
    }
});