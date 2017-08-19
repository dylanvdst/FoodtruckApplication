angular
.module('foodtruck-app')
.factory('auth', authFactory);

function authFactory($http, $window) {
var auth = {};

auth.saveToken = token => {
    $window.localStorage['foodtruck-token'] = token;
};

auth.getToken = () => {
    return $window.localStorage['foodtruck-token'];
};

auth.isLoggedIn = () => {
    let token = auth.getToken();

    if(token) {
        let playload = JSON.parse($window.atob(token.split('.')[1]));
        return playload.exp > Date.now() / 1000;
    } else {
        return false;
    }
};

auth.currentAccount = () => {
    if(auth.isLoggedIn()) {
        let token = auth.getToken();
        let playload = JSON.parse($window.atob(token.split('.')[1]));
        return playload.email;
    }
};

auth.currentAccountId = () => {
    if(auth.isLoggedIn()) {
        let token = auth.getToken();
        let playload = JSON.parse($window.atob(token.split('.')[1]));
        return playload.id;
    }
};

auth.register = account => {
    return $http.post('/v1/account/register', account).success(data => {
        auth.saveToken(data.token);
    });
};

auth.logIn = account => {
    return $http.post('/v1/account/login', account).success(data => {
        auth.saveToken(data.token);
    });
};

auth.logOut = () => {
    $window.localStorage.removeItem('foodtruck-token');
};

return auth;
};
