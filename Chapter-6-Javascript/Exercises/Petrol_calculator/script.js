document.addEventListener('DOMContentLoaded', function() {
    // Getting references to various elements in the document
    const costInput = document.getElementById('cost');
    const litersInput = document.getElementById('liters');
    const calculateBtn = document.getElementById('calculate-btn');
    const totalCost = document.getElementById('total-cost');

    // Adding an event listener to the calculate button
    calculateBtn.addEventListener('click', function() {
        // Getting the value of cost per liter and liters purchased from inputs
        const costPerLiter = parseFloat(costInput.value);
        const litersPurchased = parseFloat(litersInput.value);
        // Calculating the total cost
        const totalPrice = costPerLiter * litersPurchased;
        // Displaying the total cost in the designated area
        totalCost.textContent = `Total Cost: $${totalPrice.toFixed(2)}`;
    });
});
