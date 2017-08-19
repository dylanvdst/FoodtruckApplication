angular
.module('foodtruck-app')
.controller('AuthCtrl', AuthCtrl);

function AuthCtrl($scope, $state, auth) {

$scope.account = {};

$scope.register = () => {
    auth.register($scope.account).error(error => {
        $scope.error = error;
    }).then(() => {
        $state.go('home');
    });
};

$scope.logIn = () => {
    auth.logIn($scope.account).error(error => {
        $scope.error = error;
    }).then(() => {
        $state.go('home');
    });
};

};