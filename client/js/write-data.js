const submitButton = document.getElementById("submit-button");
const clearButton = document.getElementById("clear-button");

submitButton.addEventListener('click', function(event) {
    event.preventDefault();
    alert("Submit button was pressed");
});

clearButton.addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById("enter-data").reset();
}); 