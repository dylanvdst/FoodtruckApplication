angular.module('foodtruck-app').controller('MainCtrl', MainCtrl);

function MainCtrl($scope, foodtrucks, auth)
{
    $scope.foodtrucks = foodtrucks.foodtrucks;
    $scope.isLoggedIn = auth.isLoggedIn;
    console.log(foodtrucks);

    $scope.addFoodTruck = () =>{
        if(!$scope.name || $scope.name === '') {return;}
        console.log($scope.name);
        console.log($scope.avgcost);
        console.log($scope.foodtype);

        foodtrucks.create({
            "name": $scope.name,
            "foodtype": $scope.foodtype,
            "avgcost": $scope.avgcost
            //geometry: $scope.geometry
        });

        $scope.name = '';
        $scope.foodtype = '';
        $scope.avgcost = 0;
        //$scope.geometry = {};
    };

    $scope.isFoodtruckOwner = foodtruck => {
		return foodtruck.accountId === auth.currentAccountId();
    };
    
    $scope.deleteFoodtruck = foodtruck => {
		foodtrucks.delete(foodtruck);
    };
}