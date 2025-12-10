const { MongoClient } = require('mongodb');
const dbURL = "mongodb://127.0.0.1";
const path = require('path');
const seedFile = path.join(__dirname, "files/data.txt");

const fs = require('fs');
//const database_file = path.join(__dirname + "/files/data.txt");

const client = new MongoClient(dbURL);

var services = function (server) {
    server.post('/enter-data', async function (req, res) {
        const newGame =
        {
            id: "game" + Date.now(),
            gameName: req.body.gameName,
            rating: req.body.rating,
            storyLength: req.body.storyLength,
            playerCount: req.body.playerCount,
            gameDeveloper: req.body.gameDeveloper,
            releaseDate: req.body.releaseDate,
            recentUpdates: req.body.recentUpdates
        };

        try {
            const conn = await client.connect();
            const db = conn.db("gamesDb");
            const coll = db.collection("games");

            await coll.insertOne(newGame);
            await conn.close();

            return res.json({ msg: "SUCCESS" });
        }
        catch (err) {
            return res.json({ msg: "Error: " + err });
        }
    });

    server.get("/api/view-data", async function (req, res) {
        try {
            const conn = await client.connect();
            const db = conn.db("gamesDb");
            const coll = db.collection("games");

            const games = await coll.find().sort({ gameName: 1 }).toArray();

            await conn.close();
            return res.json({ msg: "SUCCESS", gamesData: games });
        }
        catch (err) {
            return res.json({ msg: "Error: " + err });
        }
    })

    server.delete("/delete-record", async (req, res) => {
        const idToDelete = req.body.id;

        try {
            const conn = await client.connect();
            const db = conn.db("gamesDb");
            const coll = db.collection("games");

            await coll.deleteOne({ id: idToDelete });

            await conn.close();
            return res.json({ msg: "SUCCESS" });
        }
        catch (err) {
            return res.json({ msg: "Error: " + err });
        }
    });


    

        

}
var initializeMongoDB = async function () {
    try {
        const conn = await client.connect();
        const db = conn.db("gamesDb");
        const coll = db.collection("games");

        await coll.createIndex({ id: 1 }, { unique: true });

        const data = await coll.find().toArray();

        if (data.length === 0) {
            console.log("Games DB empty loading from data.txt:", seedFile);

            if (!fs.existsSync(seedFile)) {
                console.log("Data.txt NOT FOUND");
                await conn.close();
                return;
            }

            // Read and parse JSON from file
            const fileData = fs.readFileSync(seedFile, "utf-8");
            const seedGames = JSON.parse(fileData);

            // Insert into DB
            await coll.insertMany(seedGames);
            console.log("Loaded games from data.txt");
        }

        await conn.close();
    }
    catch (err) {
        console.log("Error initializing db:", err);
    }
};

module.exports = { services, initializeMongoDB };
