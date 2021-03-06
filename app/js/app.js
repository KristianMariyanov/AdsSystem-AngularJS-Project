'use strict';

var app = angular.module('app', ['ngRoute', 'ngResource', 'ui.bootstrap.pagination']);

app.constant('baseServiceUrl', 'http://localhost:1337');
app.constant('pageSize', 2);

app.config(function ($routeProvider) {

    $routeProvider.when('/', {
        templateUrl: 'templates/home.html',
        controller: 'HomeController'
    });

    $routeProvider.when('/login', {
        templateUrl: 'templates/login.html',
        controller: 'LoginController'
    });

    $routeProvider.when('/register', {
        templateUrl: 'templates/register.html',
        controller: 'RegisterController'
    });

    $routeProvider.when('/user/publish', {
        templateUrl: 'templates/user/publish-new-ad.html',
        controller: 'UserPublishNewAdController'
    });

    $routeProvider.when('/user/ads', {
        templateUrl: 'templates/user/user-ads.html',
        controller: 'UserAdsController'
    });

    $routeProvider.when('/user/ads/:id', {
        templateUrl: 'templates/user/user-ads.html',
        controller: 'UserAdsController'
    });

    $routeProvider.when('/user/delete/:id', {
        templateUrl: 'templates/user/delete-ad.html',
        controller: 'DeleteAdController'
    });

    $routeProvider.when('/user/edit/:id', {
        templateUrl: 'templates/user/edit-ad.html',
        controller: 'EditAdController'
    });

    $routeProvider.when('/user/editProfile', {
        templateUrl: 'templates/user/edit-profile.html',
        controller: 'EditProfileController'
    });

    // admin routes

    $routeProvider.when('/admin/home', {
        templateUrl: 'templates/admin/admin-ads.html',
        controller: 'AdminAdsController'
    });

    $routeProvider.when('/admin/home/:id', {
        templateUrl: 'templates/admin/admin-ads.html',
        controller: 'AdminAdsController'
    });

    $routeProvider.otherwise(
        { redirectTo: '/' }
    );

});
app.run(function ($rootScope, $location, authService) {
    $rootScope.$on('$locationChangeStart', function (event) {
        if ($location.path().indexOf("/user/") != -1 && !authService.isLoggedIn()) {
            // Authorization check: anonymous site visitors cannot access user routes
            $location.path("/");
        }

        if ($location.path() == '/' && authService.isAdmin()) {
            $location.path("/admin/home");
        }
    });
});

