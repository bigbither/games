const fs = require('fs');
const path = require('path');

const database_file = path.join(__dirname + "/files/data.txt");

var services = function (server) {
    server.post('/enter-data', function (req, res) {
        var id = "game" + Date.now();

        var gameData = {
            id: id,
            gameName: req.body.gameName,
            rating: req.body.rating,
            storyLength: req.body.storyLength,
            playerCount: req.body.playerCount,
            gameDeveloper: req.body.gameDeveloper,
            releaseDate: req.body.releaseDate,
            recentUpdates: req.body.recentUpdates
        };

        let gamesData = [];

        if (fs.existsSync(database_file)) {
            // READ data
            fs.readFile(database_file, "utf-8", function (err, data) {
                if (err) {
                    res.send(JSON.stringify({ msg: err }));
                } else {
                    gamesData = JSON.parse(data);
                    gamesData.push(gameData);

                    fs.writeFile(database_file, JSON.stringify(gamesData), function (err) {
                        if (err) {
                            res.send(JSON.stringify({ msg: err }));
                        } else {
                            res.send(JSON.stringify({ msg: "SUCCESS", gamesData: gamesData }));
                        }
                    });
                }
            });
        } else {
            gamesData.push(gameData);

            fs.writeFile(database_file, JSON.stringify(gamesData), function (err) {
                if (err) {
                    res.send(JSON.stringify({ msg: "Error" + err }));
                } else {
                    res.send(JSON.stringify({ msg: "SUCCESS", gamesData: gamesData}));
                }
            });
        }
    });

    server.get("/api/view-data", function (req, res) {
        if (fs.existsSync(database_file))
        {
            fs.readFile(database_file, "utf-8", function (err, data) {
                if (err)
                {
                    res.json({ msg: err });
                }
                else
                {
                    let gamesData = JSON.parse(data);
                    res.json({ msg: "SUCCESS", gamesData: gamesData });
                }
            })
        }
        else
        {
            let gamesData = [];
            res.json({ msg: "SUCCESS", gamesData: gamesData });
        }
    })

    server.delete("/delete-record", (req, res) => {
        const idToDelete = req.body.id;

        if (!fs.existsSync(database_file)) 
            return res.status(404).json({ msg: "Database file not found" });


        fs.readFile(database_file, "utf-8", (err, data) => {
            if (err) return res.json({ msg: err });

            let gamesData;
            try {
                gamesData = JSON.parse(data);
            } catch (parseErr) {
                return res.json({ msg: "Error parsing database file" });
            }

            const index = gamesData.findIndex(g => g.id === idToDelete);
            gamesData.splice(index, 1);

            fs.writeFile(database_file, JSON.stringify(gamesData), "utf-8", (writeErr) => {
                if (writeErr)
                    return res.json({ msg: "Error writing database file" });
                res.json({ msg: "SUCCESS", gamesData });
            });
        });
    });



        

}

module.exports = services;