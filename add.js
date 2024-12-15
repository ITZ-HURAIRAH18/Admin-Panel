const modal = document.getElementById('editModal');
const closeModal = document.querySelector('.close-btn');
const editForm = document.getElementById('editForm');
const productTable = document.getElementById('productTable');
const createButton = document.querySelector('.create-button');
const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');

let productIdCounter = 0; // Unique ID for new products

// Add file input dynamically for image
const imageInput = document.createElement('input');
imageInput.type = 'file';
imageInput.accept = 'image/*';
imageInput.style.display = 'none'; // Hide the input
document.body.appendChild(imageInput);

let selectedImage = ''; // To hold the image data

// Open file selector for image upload
function uploadImage(callback) {
  imageInput.click(); // Open the file input dialog

  imageInput.onchange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        selectedImage = reader.result; // Convert image to base64
        callback(selectedImage); // Pass the image to the callback
      };
      reader.readAsDataURL(file); // Read the image file
    }
  };
}

// Create Product functionality
createButton.addEventListener('click', () => {
  // Trigger image upload
  uploadImage((image) => {
    const newProduct = {
      id: `product-${++productIdCounter}`, // Unique ID
      name: "New Product", // Replace with dynamic input if needed
      type: "New Brand",   // Replace with dynamic input if needed
      inventory: "$0.00",  // Replace with dynamic input if needed
      image: image || "https://via.placeholder.com/50" // Use uploaded image or placeholder
    };

    const newRow = document.createElement('tr');
    newRow.setAttribute('data-product-id', newProduct.id);
    newRow.innerHTML = `
      <td><img src="${newProduct.image}" alt="Product Image" class="product-image" style="width: 50px; height: 50px;"/></td>
      <td class="product-name">${newProduct.name}</td>
      <td class="product-type">${newProduct.type}</td>
      <td class="product-inventory">${newProduct.inventory}</td>
      <td>
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
      </td>
    `;

    const tableBody = productTable.querySelector('tbody');
    tableBody.appendChild(newRow);

    // Add event listeners for the new row
    addRowEventListeners(newRow);
  });
});

// Add event listeners to all rows (existing and new)
function addRowEventListeners(row) {
  const editButton = row.querySelector('.edit');
  const deleteButton = row.querySelector('.delete');

  // Edit button functionality
  editButton.addEventListener('click', (e) => {
    const productRow = e.target.closest('tr');
    const productId = productRow.dataset.productId;
    const productImage = productRow.querySelector('.product-image').src;
    const productName = productRow.querySelector('.product-name').textContent;
    const productType = productRow.querySelector('.product-type').textContent;
    const productInventory = productRow.querySelector('.product-inventory').textContent;

    document.getElementById('editProductName').value = productName;
    document.getElementById('editProductType').value = productType;
    document.getElementById('editProductInventory').value = productInventory.replace('$', '');

    modal.dataset.productId = productId;
    modal.style.display = 'block';

    // Update the selected image if user wants to edit
    selectedImage = productImage;
  });

  // Delete button functionality
  deleteButton.addEventListener('click', (e) => {
    const productRow = e.target.closest('tr');
    if (confirm("Are you sure you want to delete this product?")) {
      productRow.remove();
    }
  });
}

// Attach event listeners to all existing rows on page load
document.addEventListener('DOMContentLoaded', () => {
  const rows = productTable.querySelectorAll('tbody tr');
  rows.forEach(row => addRowEventListeners(row));
});

// Modal close functionality
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

// Handle form submission to save changes to product
editForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const productId = modal.dataset.productId;
  const productName = document.getElementById('editProductName').value;
  const productType = document.getElementById('editProductType').value;
  const productInventory = document.getElementById('editProductInventory').value;

  const row = productTable.querySelector(`tr[data-product-id="${productId}"]`);

  if (row) {
    row.querySelector('.product-image').src = selectedImage;
    row.querySelector('.product-name').textContent = productName;
    row.querySelector('.product-type').textContent = productType;
    row.querySelector('.product-inventory').textContent = `$${productInventory}`;
  }

  modal.style.display = 'none';
});

// Search functionality on button click
searchButton.addEventListener('click', () => {
  const searchQuery = searchInput.value.toLowerCase();
  const rows = productTable.querySelectorAll('tbody tr');

  rows.forEach(row => {
    const productName = row.querySelector('.product-name').textContent.toLowerCase();
    const productType = row.querySelector('.product-type').textContent.toLowerCase();
    const productInventory = row.querySelector('.product-inventory').textContent.toLowerCase();

    // If any of the columns match the search query, show the row, otherwise hide it
    if (productName.includes(searchQuery) || productType.includes(searchQuery) || productInventory.includes(searchQuery)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
});
