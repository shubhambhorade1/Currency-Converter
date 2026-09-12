let amount = document.getElementById("amount");
let fromCurrency = document.getElementById("fromCurrency");
let toCurrency = document.getElementById("toCurrency");

let convertButton = document.getElementById("convertButton");
let swapButton = document.getElementById("swapButton");
let result = document.getElementById("result");


// Convert currency
convertButton.addEventListener("click", function () {

    let enteredAmount = amount.value;

    if (enteredAmount === "" || enteredAmount <= 0) {
        result.innerText = "Please enter a valid amount";
        return;
    }

    let from = fromCurrency.value;
    let to = toCurrency.value;

    // If both currencies are the same
    if (from === to) {
        result.innerText = enteredAmount + " " + from + " = " +
            enteredAmount + " " + to;
        return;
    }

    result.innerText = "Converting...";

    fetch(`https://open.er-api.com/v6/latest/${from}`)
        .then(response => response.json())
        .then(data => {

            let rate = data.rates[to];
            let convertedAmount = enteredAmount * rate;

            result.innerText =
                enteredAmount + " " + from +
                " = " +
                convertedAmount.toFixed(2) + " " + to;

        })
        .catch(error => {

            result.innerText = "Something went wrong. Try again.";

        });

});


// Swap currencies
swapButton.addEventListener("click", function () {

    let oldFrom = fromCurrency.value;

    fromCurrency.value = toCurrency.value;
    toCurrency.value = oldFrom;

});
