'use strict';
require('angular/angular');
require('angular-route');

var mmmApp = angular.module('mmmApp', ['ngRoute']);

require('./calc/controllers/calc-controller')(mmmApp);

mmmApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/index.html',
      controller: 'calcController'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);
