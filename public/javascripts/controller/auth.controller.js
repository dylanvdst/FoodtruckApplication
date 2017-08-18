angular
.module('foodtruck-app')
.controller('AuthCtrl', AuthCtrl);

function AuthCtrl($scope, $state, auth) {

$scope.account = {};

$scope.register = function() {
    auth.register($scope.account).error(function(error) {
        $scope.error = error;
    }).then(function() {
        $state.go('home');
    });
};

$scope.logIn = function() {
    auth.logIn($scope.account).error(function(error) {
        $scope.error = error;
    }).then(function() {
        $state.go('home');
    });
};

};