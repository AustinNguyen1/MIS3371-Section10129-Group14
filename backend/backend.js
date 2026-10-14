const processExpenses = (expense) => {
    // Validate the expense object
    if (!expense.employeeId || !expense.expenseType || !expense.amount || !expense.date) {
        throw new Error("Invalid expense object");
    }
    
    console.log(`Processing expense for employee ${expense.employeeId}: ${expense.expenseType} - $${expense.amount} on ${expense.date}`);
}

module.exports = { processExpenses };