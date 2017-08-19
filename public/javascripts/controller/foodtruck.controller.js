angular.module('foodtruck-app').controller('FoodtruckCtrl', FoodtruckCtrl);

function FoodtruckCtrl($scope, foodtrucks, foodtruck, auth)
{
    $scope.foodtruck = foodtruck;
    console.log(foodtruck);
    console.log(foodtruck.reviews);
    $scope.isLoggedIn = auth.isLoggedIn;

    $scope.addReview = () => {
        if(!$scope.title || $scope.title === ''){return;}

        foodtrucks.addReview(foodtruck._id, {
            title: $scope.title,
            text: $scope.text
        }).success(review => {
            $scope.foodtruck.reviews.push(review);
        });

        $scope.title = '';
        $scope.text = '';
    };

    $scope.editFoodtruck = () => {
        foodtrucks.edit(foodtruck._id, {
            name: $scope.name,
            avgcost: $scope.avgcost,
            foodtype: $scope.foodtype
        }).success(updatedFoodtruck => {
            $scope.foodtruck = updatedFoodtruck;
        });
    }
};