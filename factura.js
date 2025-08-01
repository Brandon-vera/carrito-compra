// This function would be called from tienda.js after a successful purchase
function generateReceipt() {
    const receiptContent = document.getElementById('receiptContent');
    receiptContent.innerHTML = ''; // Clear previous content

    const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');
    let subtotal = 0;
    const taxRate = 0.12; // Example 12% tax rate
    const shippingCost = 5.00; // Example fixed shipping cost

    let receiptHTML = `
        <div class="container-fluid">
            <h4 class="text-center mb-4">Detalle de su Compra</h4>
            <p><strong>Fecha:</strong> ${new Date().toLocaleDateString()}</p>
            <p><strong>Hora:</strong> ${new Date().toLocaleTimeString()}</p>
            <hr>
            <h5>Productos:</h5>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio Unitario</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
    `;

    shoppingCartItems.forEach(item => {
        const title = item.querySelector('.shoppingCartItemTitle').textContent;
        const price = Number(item.querySelector('.shoppingCartItemPrice').textContent.replace('€', ''));
        const quantity = Number(item.querySelector('.shoppingCartItemQuantity').value);
        const itemTotal = price * quantity;
        subtotal += itemTotal;

        receiptHTML += `
            <tr>
                <td>${title}</td>
                <td>${quantity}</td>
                <td>${price.toFixed(2)}€</td>
                <td>${itemTotal.toFixed(2)}€</td>
            </tr>
        `;
    });

    const taxAmount = subtotal * taxRate;
    const grandTotal = subtotal + taxAmount + shippingCost;

    receiptHTML += `
                </tbody>
            </table>
            <hr>
            <div class="d-flex justify-content-end flex-column align-items-end">
                <p class="mb-1"><strong>Subtotal:</strong> ${subtotal.toFixed(2)}€</p>
                <p class="mb-1"><strong>Impuestos (${(taxRate * 100).toFixed(0)}%):</strong> ${taxAmount.toFixed(2)}€</p>
                <p class="mb-1"><strong>Costo de Envío:</strong> ${shippingCost.toFixed(2)}€</p>
                <h4 class="mt-2"><strong>Total Final:</strong> ${grandTotal.toFixed(2)}€</h4>
            </div>
            <p class="text-center mt-4">¡Gracias por su compra!</p>
        </div>
    `;

    receiptContent.innerHTML = receiptHTML;
    $('#receiptModal').modal('show'); // Show the receipt modal

    // Add event listener for printing
    document.getElementById('printReceiptButton').addEventListener('click', () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write('<html><head><title>Recibo de Compra</title>');
        printWindow.document.write('<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">'); // Include Bootstrap for styling
        printWindow.document.write('</head><body>');
        printWindow.document.write(receiptHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    });
}

// You would modify the comprarButtonClicked function in tienda.js to call generateReceipt()
// instead of just clearing the cart.
/*
// Inside tienda.js
function comprarButtonClicked() {
  // First, generate and display the receipt
  generateReceipt();

  // Then, clear the cart after a short delay or confirmation
  setTimeout(() => {
    shoppingCartItemsContainer.innerHTML = '';
    updateShoppingCartTotal();
  }, 500); // Small delay for the user to see the purchase confirmation modal
}
*/