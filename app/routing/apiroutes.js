var path = require("path");
var friendsList = require('../data/friends.js');

module.exports = function(app) {
    app.get("/api/friends", function(request, response) {
        response.json(friendsList);
    });

    app.post("/api/friends", function(request, response) {
        var newUser = request.body;
        var currentDiff = 41;
        var bestMatch;

        for (var i = 0; i < friendsList.length; i++) {
            for (var j = 0; j < newUser.scores.length; j++) {
                totalDiff += Math.abs(friendsList[i].scores[j] - newUser.scores[j]);
            }
            if (totalDiff < currentDiff) {
                bestMatch = i;
                currentDiff = totalDiff;
                matchName = friendsList[i].name;
                matchPhoto = friendsList[i].photo;
            }
        }
        response.json({
            name: matchName,
            photo: matchPhoto,
        })
        friendsList.push(request.body);
    });
}