
var gameData = JSON.stringify([
    {
        gameName: "Escape From Tarkov",
        rating: "5/5 Stars",
        storyLength: "No story mode",
        playerCount: "Multiplayer",
        gameDeveloper: "Battlestate Games",
        releaseDate: "08/04/2016",
        recentUpdates: "Patch 0.14.5"
    },
    {
        gameName: "Rainbow Six Siege",
        rating: "4.5/5 Stars",
        storyLength: "No campaign",
        playerCount: "Multiplayer",
        gameDeveloper: "Ubisoft",
        releaseDate: "12/01/2015",
        recentUpdates: "Year 8 Season 3"
    },
    {
        gameName: "Minecraft",
        rating: "5/5 Stars",
        storyLength: "Open-ended sandbox",
        playerCount: "Single & Multiplayer",
        gameDeveloper: "Mojang Studios",
        releaseDate: "11/18/2011",
        recentUpdates: "1.20 Trails & Tales"
    },
    {
        gameName: "Terraria",
        rating: "4.8/5 Stars",
        storyLength: "50+ Hours",
        playerCount: "Single & Multiplayer",
        gameDeveloper: "Re-Logic",
        releaseDate: "05/16/2011",
        recentUpdates: "Labor of Love Update"
    },
    {
        gameName: "PUBG",
        rating: "4.2/5 Stars",
        storyLength: "No story mode",
        playerCount: "100 Player Battle Royale",
        gameDeveloper: "PUBG Studios",
        releaseDate: "12/20/2017",
        recentUpdates: "Update 29.1"
    },
    {
        gameName: "Stardew Valley",
        rating: "4.9/5 Stars",
        storyLength: "50+ Hours",
        playerCount: "Single & Multiplayer",
        gameDeveloper: "ConcernedApe",
        releaseDate: "11/26/2016",
        recentUpdates: "1.6 In Development"
    }
]); var jsonGameDataObj = JSON.parse(gameData);

main();

function main()
{
    console.log(jsonGameDataObj);
    console.log(jsonGameDataObj.length);
    console.log(JSON.stringify(jsonGameDataObj));

    showTable();
}

function showTable()
{
    let htmlString = "";
    for (var i = 0; i < jsonGameDataObj.length; i++)
    {
        htmlString += "<tr>";
        htmlString += "<td>" + jsonGameDataObj[i].gameName + "</td>";
        htmlString += "<td>" + jsonGameDataObj[i].rating + "</td>";
        htmlString += "<td>" + jsonGameDataObj[i].storyLength + "</td>";
        htmlString += "<td>" + jsonGameDataObj[i].playerCount + "</td>";
        htmlString += "<td>" + jsonGameDataObj[i].gameDeveloper + "</td>";
        htmlString += "<td>" + jsonGameDataObj[i].releaseDate + "</td>";
        htmlString += "<td>" + jsonGameDataObj[i].recentUpdates + "</td>";
        htmlString += "</tr>"
    }

    var tableBodyObj = document.getElementById("gamesTable");
    tableBodyObj.innerHTML = htmlString;
}