var games = [];
var activeGame = 0;

var app = angular.module("browseGamesApp", []);


app.controller("browseGamesCtrl", function ($scope, $http) {

    $scope.games = [];
    $scope.activeGame = 0;

    $scope.get_records = function () {
        $http.get(libraryURL + "/api/view-data").then(function (response) {
            if (response.data.msg === "SUCCESS") {
                $scope.games = response.data.gamesData; 
                if ($scope.games.length > 0) {
                    $scope.activeGame = 0;
                    $scope.obj = $scope.games[$scope.activeGame];
                    $scope.showHide();
                }
            }
        }, function (err) {
            alert("Error connecting to server: " + err);
        });
    };

    $scope.get_records();

    $scope.changeGame = function (direction) {
        let newIndex = $scope.activeGame + direction;
        if (newIndex < 0 || newIndex >= $scope.games.length) return;
        $scope.activeGame = newIndex;
        $scope.obj = $scope.games[$scope.activeGame];
        $scope.showHide();
    };

    $scope.showHide = function () {
        $scope.hidePrev = $scope.activeGame === 0;
        $scope.hideNext = $scope.activeGame === $scope.games.length - 1;
    };
});