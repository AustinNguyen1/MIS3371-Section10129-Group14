const DIRECTOR_APPROVAL_THRESHOLD = 5000;

function requiresDirectorApproval(amount) {
  return amount > DIRECTOR_APPROVAL_THRESHOLD;
}

const amount = document.querySelector("#amount");
const message = document.querySelector("#approvalMessage");

amount.addEventListener("input", function () {
  const expenseAmount = Number(amount.value);

  if (amount.value === "") {
    message.textContent = "";
  } else if (requiresDirectorApproval(expenseAmount)) {
    message.textContent = "Director approval will be required.";
  } else {
    message.textContent = "Standard approval path.";
  }
});