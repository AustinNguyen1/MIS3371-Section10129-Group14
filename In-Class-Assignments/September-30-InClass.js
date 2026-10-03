function submitTrade() {
    const form = document.querySelector("form");

    // Let the browser show its own messages for missing/invalid fields
    if (!form.checkValidity()) {
        return;
    }

    const symbol = document.getElementById("symbol").value.toUpperCase();
    const trade = document.getElementById("trade").value;
    const shares = document.getElementById("shares").value;
    const order = document.getElementById("order").value;
    const price = document.getElementById("price").value;

    const summary =
        "Trade submitted!\n\n" +
        "Symbol: " + symbol + "\n" +
        "Trade: " + trade + "\n" +
        "Shares: " + shares + "\n" +
        "Order: " + order + "\n" +
        "Price: " + (price || "N/A");

    console.log(summary);
    alert(summary);
}
// Business Rule:
// A trade must have at least 1 share.

function isValidShareQuantity(shares) {
    return shares >= 1;
}

// Test cases
console.log("0 shares:", isValidShareQuantity(0));
console.log("1 share:", isValidShareQuantity(1));
console.log("5 shares:", isValidShareQuantity(5));

