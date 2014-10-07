'use strict';

//Setting up route
angular.module('mean.reqruter').config(['$stateProvider',
    function($stateProvider) {
        // Check if the user is connected
        var checkLoggedin = function($q, $timeout, $http, $location) {
            // Initialize a new promise
            var deferred = $q.defer();

            // Make an AJAX call to check if the user is logged in
            $http.get('/loggedin').success(function(user) {
                // Authenticated
                if (user !== '0') $timeout(deferred.resolve);

                // Not Authenticated
                else {
                    $timeout(deferred.reject);
                    $location.url('/login');
                }
            });

            return deferred.promise;
        };

        // states for my app
        $stateProvider
            .state('all candidates', {
                url: '/candidates',
                templateUrl: 'reqruter/views/list.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('create candidate', {
                url: '/candidates/create',
                templateUrl: 'reqruter/views/create.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('edit candidate', {
                url: '/candidates/:candidateId/edit',
                templateUrl: 'reqruter/views/edit.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('candidate by id', {
                url: '/candidates/:candidateId',
                templateUrl: 'reqruter/views/view.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            });
    }
]);
