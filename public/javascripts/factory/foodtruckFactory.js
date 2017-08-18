angular.module('foodtruck-app')
.factory('foodtrucks', foodtruckFactory);

function foodtruckFactory($http, auth) {
    let o = {
        foodtrucks: []
    }

    o.get = id => {
        return $http.get('/v1/foodtruck/'+id).then(res => {
            return res.data;
        });
    };

    o.getAll = function(){
        return $http.get('/v1/foodtruck').success(data => {
            console.log('foodtruckFactory Get All');
            angular.copy(data, o.foodtrucks);
        });
    };

    o.create = foodtruck => {
        console.log('foodtruck create');
        return $http.post('/v1/foodtruck/add', foodtruck, {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        }).success(data => {
            o.foodtrucks.push(data);
        });
    };

    return o;
}