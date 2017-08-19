angular.module('foodtruck-app').controller('MainCtrl', MainCtrl).directive('mydirective', MyDirective);

function MainCtrl($scope, $filter, foodtrucks, NgTableParams, auth)
{
    $scope.foodtrucks = foodtrucks.foodtrucks;
    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.tableParams = new NgTableParams({
        page: 1,
        count: 5
        });

    $scope.searchByType = () => {
        if(!$scope.searchType || $scope.searchType === '') {foodtrucks.getAll();
        return;}
        foodtrucks.filter($scope.searchType);
    }

    $scope.addFoodTruck = () =>{
        if(!$scope.name || $scope.name === '') {return;}

        foodtrucks.create({
            "name": $scope.name,
            "foodtype": $scope.foodtype,
            "avgcost": $scope.avgcost
        });

        foodtrucks.getAll();

        $scope.name = '';
        $scope.foodtype = '';
        $scope.avgcost = 0;
    };

    $scope.favourite = function(foodtruck) {
        console.log('favourite');
        foodtrucks.favourite(foodtruck);
        foodtrucks.getAll();
	};

	$scope.unfavourite = function(foodtruck) {
        console.log('unfavourite');
        foodtrucks.unfavourite(foodtruck);
        foodtrucks.getAll();
    };
    
    $scope.favourited = foodtruck => {
        if(foodtruck.favouritedBy){
            return foodtruck.favouritedBy.includes(auth.currentAccountId());
        }
        return false; 
    }

    $scope.isFoodtruckOwner = foodtruck => {
		return foodtruck.accountId === auth.currentAccountId();
    };
    
    $scope.deleteFoodtruck = foodtruck => {
		foodtrucks.delete(foodtruck);
    };
}

function MyDirective()
{
    return {
        templateUrl: './javascripts/directives/myDirective.html'
    };
}