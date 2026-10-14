const { processExpenses, processTrade } = require("./backend");

const tests = [
    {
        employeeId: "E001",
        expenseType: "Travel",
        amount: 500,
        date: "2023-10-01"
    },
    {
        employeeId: "E002",
        expenseType: "Meals",
        amount: 200,
        date: "2023-10-02"
    }
];

for (const test of tests) {
    processExpenses(test);
}
console.log("\n--- TRADE TESTS ---");

const tradeTests = [
    {
        symbol: "AAPL",
        tradeType: "Buy",
        quantity: 5,
        price: 200,
        cash: 5000,
        sharesOwned: 10
    },
    {
        symbol: "AAPL",
        tradeType: "Buy",
        quantity: 0.5,
        price: 200,
        cash: 5000,
        sharesOwned: 10
    },
    {
        symbol: "AAPL",
        tradeType: "Sell",
        quantity: 15,
        price: 200,
        cash: 5000,
        sharesOwned: 10
    }
];

for (const trade of tradeTests) {
    console.log(processTrade(trade));
}