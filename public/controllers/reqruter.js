'use strict';

angular.module('mean.reqruter').controller('ReqruterController', ['$scope', 'Global', 'Reqruter',
  function($scope, Global, Reqruter) {
    $scope.global = Global;
    $scope.package = {
      name: 'reqruter'
    };
  }
]);
