'use strict';

var meanMedianMode = require('../../mean-median-mode.js');

module.exports = function(app) {
  app.controller('calcController', function($scope) {
    $scope.getMMM = function(input) {
      var mmm = new meanMedianMode();
      $scope.report = mmm.go(input);
    };
  });
};