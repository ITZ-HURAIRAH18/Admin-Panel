// Modal functionality
const modal = document.getElementById('editModal');
const closeModal = document.querySelector('.close-btn');
const editButtons = document.querySelectorAll('.edit');
const deleteButtons = document.querySelectorAll('.delete');  // Add delete buttons
const editForm = document.getElementById('editForm');
const productTable = document.getElementById('productTable');


// Open modal and pre-fill form with product data
editButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const row = e.target.closest('tr'); // Get the row of the clicked edit button
        const productName = row.querySelector('.product-name').textContent;
        const productType = row.querySelector('.product-type').textContent;
        const productInventory = row.querySelector('.product-inventory').textContent;

        // Pre-fill the modal with the current product details
        document.getElementById('editProductName').value = productName;
        document.getElementById('editProductType').value = productType;
        document.getElementById('editProductInventory').value = productInventory;

        // Save the row for later editing
        modal.dataset.productId = row.dataset.productId;

        // Open the modal
        modal.style.display = 'block';
    });
});

// Close modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close modal if the user clicks outside of the modal content
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Handle form submission to save the changes
// Handle form submission to save the changes
editForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const productId = modal.dataset.productId;
    const productName = document.getElementById('editProductName').value;
    const productType = document.getElementById('editProductType').value;
    let productInventory = document.getElementById('editProductInventory').value;

    // Strip out any dollar signs and other non-numeric characters (if any)
    productInventory = productInventory.replace(/[^0-9.-]+/g, ''); // Remove non-numeric characters

    // Format the price (productInventory) to include the $ symbol
    const formattedPrice = `$${parseFloat(productInventory).toFixed(2)}`;

    // Find the product row by productId
    const row = productTable.querySelector(`tr[data-product-id="${productId}"]`);

    // Update the row with the new data
    row.querySelector('.product-name').textContent = productName;
    row.querySelector('.product-type').textContent = productType;
    row.querySelector('.product-inventory').textContent = formattedPrice; // Display price with $ sign

    // Close the modal
    modal.style.display = 'none';
});


// Delete functionality
deleteButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Find the product row of the clicked delete button
        const row = e.target.closest('tr');
        
        // Confirm if the user wants to delete the product
        if (confirm("Are you sure you want to delete this product?")) {
            // Remove the row from the table
            row.remove();
        }
    });
});

// Search functionality
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase(); // Get search query and convert to lowercase
    const rows = productTable.querySelectorAll('tr'); // Get all product rows

    rows.forEach(row => {
        const productName = row.querySelector('.product-name').textContent.toLowerCase(); // Get product name in lowercase

        // If the product name matches the search query, display the row, otherwise hide it
        if (productName.includes(query)) {
            row.style.display = '';  // Show row
        } else {
            row.style.display = 'none';  // Hide row
        }
    });
});


// search 
// Search functionality
// Search functionality with button
// Wait for the DOM to load completely before running the code
document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput'); // Get the search input
    const searchButton = document.getElementById('searchButton'); // Get the search button
    const productTable = document.getElementById('productTable'); // Get the product table

    // Search functionality with the Search button
    searchButton.addEventListener('click', function () {
        const query = searchInput.value.toLowerCase(); // Get the search query and convert it to lowercase
        const rows = productTable.querySelectorAll('tbody tr'); // Get all rows inside the table body

        rows.forEach(function (row) {
            const productName = row.querySelector('.product-name').textContent.toLowerCase(); // Get product name in lowercase

            // Show the row if the product name includes the query, otherwise hide it
            if (productName.includes(query)) {
                row.style.display = ''; // Show the row
            } else {
                row.style.display = 'none'; // Hide the row
            }
        });
    });
});