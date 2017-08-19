angular.module('foodtruck-app')
.factory('foodtrucks', foodtruckFactory);

function foodtruckFactory($http, auth) {
    let o = {
        foodtrucks: []
    }

    o.get = id => {
        return $http.get('/v1/foodtruck/'+id, {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        }).then(res => {
            return res.data;
        });
    };

    o.getAll = () => {
        return $http.get('/v1/foodtruck').success(data => {
            console.log('foodtruckFactory Get All');
            angular.copy(data, o.foodtrucks);
        });
    };

    o.create = foodtruck => {
        foodtruck.accountId = auth.currentAccountId();
        console.log(foodtruck.accountId);
        console.log('Foodtruck create');
        console.log(foodtruck);
        return $http.post('/v1/foodtruck/add', foodtruck, {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        }).success(data => {
            o.foodtrucks.push(data);
        });
    };

    o.edit = (id, foodtruck) => {
        console.log(auth.getToken());
        return $http.put('/v1/foodtruck/'+id, foodtruck, {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        }).success(data => {
            let index = o.foodtrucks.findIndex(x => x._id == foodtruck.id);
            o.foodtrucks[index] = data;
        });
    };

    o.delete = foodtruck => {
        return $http.delete('/v1/foodtruck/'+ foodtruck._id, {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        }).success(() =>{
            o.foodtrucks.splice(o.foodtrucks.indexOf(foodtruck), 1);
        })
    };

    o.addReview = (id, review) => {
        console.log('add review');
        review.accountId = auth.currentAccountId();
        return $http.post('/v1/foodtruck/reviews/add/'+id, review, {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        });
    };

    return o;
}