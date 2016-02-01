/**
 * Created by DugganJ on 05/11/2015.
 */
//angular
var app = angular.module('CVManager', ['ngRoute'])
    .config( ['$routeProvider', function($routeProvider) {

        $routeProvider
            .when('/upload', {
                templateUrl: 'js/views/upload.html'
            })
            .when('/search', {
                templateUrl: 'js/views/search.html'
            })
            .otherwise({
                redirectTo: '/upload'
            });
    }]);
