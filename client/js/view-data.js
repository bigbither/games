

function retrieveData()
{
    fetch(libraryURL + "/api/view-data", {

        method: "GET"
    })
        .then(response => {
            if (!response.ok) throw new Error("FAILED: " + response.statusText);
            return response.json();
        })
        .then(data => {
            if (data.msg === "SUCCESS")
                showTable(data.gamesData);
            else {
                console.error("ERROR: ", data.msg);
            }
        })
}
function showTable(gameData) {
    let htmlString = "";
    for (let i = 0; i < gameData.length; i++) {
        htmlString += "<tr>";
        htmlString += "<td>" + gameData[i].id + "</td>";
        htmlString += "<td>" + gameData[i].gameName + "</td>";
        htmlString += "<td>" + gameData[i].rating + "</td>";
        htmlString += "<td>" + gameData[i].storyLength + "</td>";
        htmlString += "<td>" + gameData[i].playerCount + "</td>";
        htmlString += "<td>" + gameData[i].gameDeveloper + "</td>";
        htmlString += "<td>" + gameData[i].releaseDate + "</td>";
        htmlString += "<td>" + gameData[i].recentUpdates + "</td>";
        htmlString += `<td><button class="delete-button" data-id="${gameData[i].id}">Delete</button></td>`;
        htmlString += "</tr>";
    }

    document.getElementById("gamesTable").innerHTML = htmlString;

    activateDelete();
}


function activateDelete() {
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            const deleteID = this.getAttribute("data-id");
            handleDelete(deleteID);
        });
    });
}


retrieveData();

async function handleDelete(deleteID) {
    try {
        const res = await fetch("/delete-record", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: deleteID })
        });

        const data = await res.json();

        if (data.msg === "SUCCESS") {
            alert("Game deleted successfully!");
            retrieveData();
        } else {
            alert("Delete failed: " + data.msg);
        }
    } catch (err) {
        console.error("Error deleting:", err);
        alert("Error deleting game");
    }
}
