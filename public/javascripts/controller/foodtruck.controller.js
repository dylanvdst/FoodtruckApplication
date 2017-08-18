angular.module('foodtruck-app').controller('FoodtruckCtrl', FoodtruckCtrl);

function FoodtruckCtrl($scope, foodtrucks, foodtruck, auth)
{
    $scope.foodtruck = foodtruck;
    $scope.isLoggedIn = auth.isLoggedIn;


}