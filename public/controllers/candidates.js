'use strict';

angular.module('mean.reqruter').controller('CandidatesController', ['$scope', '$stateParams', '$location', 'Global', 'Candidates',
  function($scope, $stateParams, $location, Global, Candidates) {
    $scope.global = Global;

    $scope.hasAuthorization = function(candidate) {
      return $scope.global.isAdmin;
    };

  $scope.openDatepicker = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
  };
    $scope.create = function(isValid) {
      if (isValid) {
        var candidate = new Candidates({
          firstname: this.firstname,
          lastname: this.lastname,
          dateofbirth: this.dateofbirth,
          email: this.email,
          phone: this.phone,
          yearsofexperience: this.yearsofexperience,
          note: this.note
        });
        candidate.$save(function(response) {
          $location.path('candidates/' + response._id);
        });

        this.firstname='';
        this.lastname='';
        this.dateofbirth='';
        this.email='';
        this.phone='';
        this.yearsofexperience='';
        this.note='';
      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(candidate) {
      if (candidate) {
        candidate.$remove();

        for (var i in $scope.candidates) {
          if ($scope.candidates[i] === candidate) {
            $scope.candidates.splice(i, 1);
          }
        }
      } else {
        $scope.candidate.$remove(function(response) {
          $location.path('candidates');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var candidate = $scope.candidate;
        if (!candidate.updated) {
          candidate.updated = [];
        }
        candidate.updated.push(new Date().getTime());

        candidate.$update(function() {
          $location.path('candidates/' + candidate._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      Candidates.query(function(candidates) {
        $scope.candidates = candidates;
      });
    };

    $scope.findOne = function() {
      Candidates.get({
        candidateId: $stateParams.candidateId
      }, function(candidate) {
        $scope.candidate = candidate;
      });
    };
  }
]);
