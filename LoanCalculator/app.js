// Form Submit Event
document.getElementById("loanForm").addEventListener("submit", function (e) {
  e.preventDefault();
  // Hide Result and Loader
  document.getElementById("result").style.display = "none";
  document.getElementById("loader").style.display = "block";

  // Delay result for 1.5 second
  setTimeout(function (e) {
    // Fetch the form data
    const amount = parseFloat(document.getElementById("amount").value);
    const interest = parseFloat(document.getElementById("interest").value);
    const year = parseFloat(document.getElementById("year").value);

    // UI Element
    const monthlyPayment = document.getElementById("monthlyPayment");
    const totalPayment = document.getElementById("totalPayment");
    const totalInterest = document.getElementById("totalInterest");

    // Calculation
    const principal = amount;
    const calculatedInterest = interest / 100 / 12;
    const calculatedPayments = year * 12;
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    // Check if there is any calculation error
    if (isFinite(monthly)) {
      // Set value to specific UI
      monthlyPayment.textContent = monthly.toFixed(2);
      totalPayment.textContent = (monthly * calculatedPayments).toFixed(2);
      totalInterest.textContent = (
        monthly * calculatedPayments -
        principal
      ).toFixed(2);

      // Hide Result and Loader
      document.getElementById("result").style.display = "block";
      document.getElementById("loader").style.display = "none";
    } else {
      // Handling Error by showing error message
      const heading = document.querySelector("#heading");
      const card = document.querySelector(".card");

      // Creating Error Div
      let errorDiv = document.createElement("div");
      errorDiv.className = "alert alert-danger";
      errorDiv.appendChild(
        document.createTextNode("Please check your numbers.")
      );
      card.insertBefore(errorDiv, heading);

      // Hide Result and Loader
      document.getElementById("result").style.display = "none";
      document.getElementById("loader").style.display = "none";

      // Remove Error Message after 3 second
      setInterval(function () {
        document.querySelector(".alert").remove();
      }, 3000);
    }
  }, 1500);
});
