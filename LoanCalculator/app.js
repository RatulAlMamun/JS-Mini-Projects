// Form Submit Event
document.getElementById('loanForm').addEventListener('submit', function (e) {
    e.preventDefault();
    // Fetch the form data
    const amount = parseFloat(document.getElementById('amount').value);
    const interest = parseFloat(document.getElementById('interest').value);
    const year = parseFloat(document.getElementById('year').value);

    // UI Element
    const monthlyPayment = document.getElementById('monthlyPayment');
    const totalPayment = document.getElementById('totalPayment');
    const totalInterest = document.getElementById('totalInterest');

    // Calculation
    let totalPay = (amount + (amount * (interest / 100))).toFixed(2);
    let monthlyPay = (totalPay / (year * 12)).toFixed(2);
    let totalInterestAmount = totalPay - amount;
    
    // Check if there is any calculation error
    if (isFinite(monthlyPay)) {
        // Set value to specific UI
        totalPayment.textContent = totalPay;
        monthlyPayment.textContent = monthlyPay;
        totalInterest.textContent = totalInterestAmount;
    } else {
        // Handling Error by showing error message
        const heading = document.querySelector('#heading');
        const card = document.querySelector('.card');
        
        // Creating Error Div
        let errorDiv = document.createElement('div');
        errorDiv.className = 'alert alert-danger';
        errorDiv.appendChild(document.createTextNode('Please check your numbers.'));
        card.insertBefore(errorDiv, heading);
        
        // Remove Error Message after 3 second
        setInterval(function() {
            document.querySelector('.alert').remove();
        }, 3000)
    }
});
