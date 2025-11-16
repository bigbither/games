const submitButton = document.getElementById("submit-button");
const clearButton = document.getElementById("clear-button");

submitButton.addEventListener('click', function (event) {
    event.preventDefault();
    alert("Submit button was pressed");

    const gameName = document.getElementById('gameName').value;
    const rating = document.getElementById('rating').value;
    const storyLength = document.getElementById('storyLength').value;
    const playerCount = document.getElementById('playerCount').value;
    const gameDeveloper = document.getElementById('gameDeveloper').value;
    const releaseDate = document.getElementById('releaseDate').value;
    const recentUpdates = document.getElementById('recentUpdates').value;

    if (!gameName || !rating || !storyLength || !playerCount || !gameDeveloper || !releaseDate || !recentUpdates) {
        alert("ERROR: Each field needs an input!");
        return;
    }

    const jsonObject = {
        gameName,
        rating,
        storyLength,
        playerCount,
        gameDeveloper,
        releaseDate,
        recentUpdates
    };

    fetch(libraryURL + "/enter-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jsonObject)
    })
        .then(response => {
            if (!response.ok) throw new Error("FAILED");
            return response.json();
        })
        .then(data => {
            alert(data.msg);
            if (data.msg === "SUCCESS") {
                document.getElementById("enter-data").reset();
                window.location.href = "/view-data";
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("FAILED");
        });
});

clearButton.addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById("enter-data").reset();
});