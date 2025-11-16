

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

    console.log("Table element:", document.getElementById("gamesTable"));
    let htmlString = "";
    for (let i = 0; i < gameData.length; i++) {
        htmlString += "<tr>";
        htmlString += "<td>" + gameData[i].gameName + "</td>";
        htmlString += "<td>" + gameData[i].rating + "</td>";
        htmlString += "<td>" + gameData[i].storyLength + "</td>";
        htmlString += "<td>" + gameData[i].playerCount + "</td>";
        htmlString += "<td>" + gameData[i].gameDeveloper + "</td>";
        htmlString += "<td>" + gameData[i].releaseDate + "</td>";
        htmlString += "<td>" + gameData[i].recentUpdates + "</td>";
        htmlString += "</tr>";
    }

    document.getElementById("gamesTable").innerHTML = htmlString;
}

retrieveData();