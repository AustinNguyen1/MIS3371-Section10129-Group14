

const DIRECTOR_APPROVAL_THRESHOLD = 5000;

function requiresDirectorApproval(amount) {
    return amount > DIRECTOR_APPROVAL_THRESHOLD;
}

const expenseAmountInput = document.querySelector("#amount");
const approvalMessage = document.querySelector("#approvalMessage");

expenseAmountInput.addEventListener("input", function () {
    const inputValue = expenseAmountInput.value;

    if (inputValue === "") {
        approvalMessage.textContent = "";
        return;
    }

    const amount = Number(inputValue);

    if (requiresDirectorApproval(amount)) {
        approvalMessage.textContent = "Director approval will be required.";
    } else {
        approvalMessage.textContent = "Standard approval path.";
    }
});


