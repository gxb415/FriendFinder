var friends = require('../data/friends');

module.exports = function(app) {

    app.get("/api/friends", function(request, response) {
        response.json(friends);
    });

    app.post("/api/friends", function(request, response) {
        var bestMatch = {
            name: "",
            photo: "",
            friendDiff: 1000
        };

        var userData = request.body;
        var userScores = userData['scores[]'];
        var totalDiff;


        for (var i = 0; i < friends.length; i++) {
            var currentFriend = friends[i];
            totalDiff = 0;

            console.log(currentFriend.name);

            for (var j = 0; j < currentFriend.scores.length; j++) {
                var currentFriendScore = currentFriend.scores[j];
                var currentUserScore = userScores[j];

                totalDiff += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
            }

            if (totalDiff <= bestMatch.friendDiff) {
                bestMatch.name = currentFriend.name;
                bestMatch.photo = currentFriend.photo;
                bestMatch.friendDiff = totalDiff;
            }
        }

        friends.push(userData);
        response.json(bestMatch);

    });
};