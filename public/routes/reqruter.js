'use strict';

angular.module('mean.reqruter').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('reqruter example page', {
      url: '/reqruter/example',
      templateUrl: 'reqruter/views/index.html'
    });
  }
]);
