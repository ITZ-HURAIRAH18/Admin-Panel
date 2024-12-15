// Example of filtering functionality (optional)
const buttons = document.querySelectorAll('.filters button');
const rows = document.querySelectorAll('table tbody tr');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const status = button.textContent.toLowerCase();
        
        rows.forEach(row => {
            const paymentStatus = row.cells[3].textContent.toLowerCase();
            const fulfillmentStatus = row.cells[4].textContent.toLowerCase();
            
            if (status === 'all' || paymentStatus === status || fulfillmentStatus === status) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
});
