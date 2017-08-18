angular.module('foodtruck-app').config(config);

function config($stateProvider, $urlRouterProvider){

    $stateProvider
    .state('home', {
        url: '/home',
        templateUrl: '../views/home.html',
        controller: 'MainCtrl',
        resolve: {
            foodtruckPromise: ['foodtrucks', (foodtrucks) => {
                return foodtrucks.getAll();
            }]
        }
    })
    .state('login', {
        url: '/login',
        templateUrl: '../views/login.html',
        controller: 'AuthCtrl',
        onEnter: ['$state', 'auth', ($state, auth) => {
            if(auth.isLoggedIn()) {
                $state.go('home');
            }
        }]
    })
    .state('register', {
        url: '/register',
        templateUrl: '../views/register.html',
        controller: 'AuthCtrl',
        onEnter: ['$state', 'auth', function($state, auth) {
            if(auth.isLoggedIn()) {
                $state.go('home');
            }
        }]
    })
    .state('foodtrucks', {
        url: '/foodtruck/{id}',
        templateUrl: '../views/foodtruckDetail.html',
        controller: 'FoodtruckCtrl',
        resolve: {
            foodtruck: ['$stateParams', 'foodtrucks', function($stateParams, foodtrucks) {
                return foodtrucks.get($stateParams.id);
            }]
        }
    })

    $urlRouterProvider.otherwise('home');
}
