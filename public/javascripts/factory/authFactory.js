angular
.module('foodtruck-app')
.factory('auth', authFactory);

function authFactory($http, $window) {
var auth = {};

auth.saveToken = token => {
    $window.localStorage['foodtruck-token'] = token;
};

auth.getToken = function() {
    return $window.localStorage['foodtruck-token'];
};

auth.isLoggedIn = function() {
    var token = auth.getToken();

    if(token) {
        var playload = JSON.parse($window.atob(token.split('.')[1]));
        return playload.exp > Date.now() / 1000;
    } else {
        return false;
    }
};

auth.currentAccount = function() {
    if(auth.isLoggedIn()) {
        var token = auth.getToken();
        var playload = JSON.parse($window.atob(token.split('.')[1]));
        return playload.email;
    }
};

auth.currentAccountId = function() {
    if(auth.isLoggedIn()) {
        var token = auth.getToken();
        var playload = JSON.parse($window.atob(token.split('.')[1]));
        return playload._id;
    }
};

auth.register = account => {
    return $http.post('/v1/account/register', account).success(function(data) {
        auth.saveToken(data.token);
    });
};

auth.logIn = account => {
    return $http.post('/v1/account/login', account).success(function(data) {
        auth.saveToken(data.token);
    });
};

auth.logOut = function() {
    $window.localStorage.removeItem('foodtruck-token');
};

return auth;
};
