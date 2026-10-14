const {processExpenses} = require('./backend');

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
