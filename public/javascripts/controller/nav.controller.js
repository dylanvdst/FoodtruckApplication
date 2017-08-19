angular
.module('foodtruck-app')
.controller('NavCtrl', NavCtrl);

function NavCtrl($scope, auth) {

$scope.isLoggedIn = auth.isLoggedIn;
$scope.currentUser = auth.currentUser;
$scope.logOut = auth.logOut;

};