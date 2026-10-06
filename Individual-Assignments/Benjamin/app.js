const DIRECTOR_APPROVAL_THRESHOLD = 5000;

const amountInput = document.querySelector("#amount");
const approvalMessage = document.querySelector("#approvalMessage");

function requiresDirectorApproval(amount) {
return amount > DIRECTOR_APPROVAL_THRESHOLD;
}

amountInput.addEventListener("input", function () {
const value = amountInput.value;

if (value === "") {
approvalMessage.textContent = "";
return;
}

const amount = Number(value);

if (requiresDirectorApproval(amount)) {
approvalMessage.textContent = "Director approval will be required.";
} else {
approvalMessage.textContent = "Standard approval path.";
}
});

function handleDemoSubmit(event) {
event.preventDefault();
console.log("Demo submit intercepted");
}
form.addEventListener("submit", handleDemoSubmit);
