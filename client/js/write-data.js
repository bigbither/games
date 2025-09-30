const submitButton = document.getElementById("submit-button");
const clearButton = document.getElementById("clear-button");

submitButton.addEventListener('click', function() {
    alert("Submit button was pressed");
});

clearButton.addEventListener('click', function () {
    document.getElementById("enter-data").reset();
});