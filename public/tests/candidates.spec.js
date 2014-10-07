'use strict';

(function() {
  // Candidates Controller Spec
  describe('MEAN controllers', function() {
    describe('CandidatesController', function() {
      // The $resource service augments the response object with methods for updating and deleting the resource.
      // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
      // the responses exactly. To solve the problem, we use a newly-defined toEqualData Jasmine matcher.
      // When the toEqualData matcher compares two objects, it takes only object properties into
      // account and ignores methods.
      beforeEach(function() {
        this.addMatchers({
          toEqualData: function(expected) {
            return angular.equals(this.actual, expected);
          }
        });
      });

      beforeEach(function() {
        module('mean');
        module('mean.system');
        module('mean.candidates');
      });

      // Initialize the controller and a mock scope
      var CandidatesController,
        scope,
        $httpBackend,
        $stateParams,
        $location;

      // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
      // This allows us to inject a service but then attach it to a variable
      // with the same name as the service.
      beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {

        scope = $rootScope.$new();

        CandidatesController = $controller('CandidatesController', {
          $scope: scope
        });

        $stateParams = _$stateParams_;

        $httpBackend = _$httpBackend_;

        $location = _$location_;

      }));

      it('$scope.find() should create an array with at least one candidate object ' +
        'fetched from XHR', function() {

          // test expected GET request
          $httpBackend.expectGET('candidates').respond([{
            firstname: 'New candidate',
            lastname: 'New candidate last name',
            email: 'new@candidate.com'
          }]);

          // run controller
          scope.find();
          $httpBackend.flush();

          // test scope value
          expect(scope.candidates).toEqualData([{
              firstname: 'New candidate',
              lastname: 'New candidate last name',
              email: 'new@candidate.com'
          }]);

        });

      it('$scope.findOne() should create an array with one candidate object fetched ' +
        'from XHR using a candidateld URL parameter', function() {
          // fixture URL parament
          $stateParams.candidateId = '525a8422f6d0f87f0e407a33';

          // fixture response object
          var testCandidateData = function() {
            return {
                firstname: 'New candidate',
                lastname: 'New candidate last name',
                email: 'new@candidate.com'
            };
          };

          // test expected GET request with response object
          $httpBackend.expectGET(/candidates\/([0-9a-fA-F]{24})$/).respond(testCandidateData());

          // run controller
          scope.findOne();
          $httpBackend.flush();

          // test scope value
          expect(scope.candidate).toEqualData(testCandidateData());

        });

      it('$scope.create() with valid form data should send a POST request ' +
        'with the form input values and then ' +
        'locate to new object URL', function() {

          // fixture expected POST data
          var postCandidateData = function() {
            return {
                firstname: 'New candidate',
                lastname: 'New candidate last name',
                email: 'new@candidate.com'
            };
          };

          // fixture expected response data
          var responseCandidateData = function() {
            return {
                _id: '525cf20451979dea2c000001',
                firstname: 'New candidate',
                lastname: 'New candidate last name',
                email: 'new@candidate.com'
            };
          };

          // fixture mock form input values
          scope.firstname= 'New candidate';
          scope.lastname= 'New candidate last name';
          scope.email= 'new@candidate.com';

          // test post request is sent
          $httpBackend.expectPOST('candidates', postCandidateData()).respond(responseCandidateData());

          // Run controller
          scope.create(true);
          $httpBackend.flush();

          // test form input(s) are reset
          expect(scope.firstname).toEqual('');
          expect(scope.lastname).toEqual('');
          expect(scope.email).toEqual('');

          // test URL location to new object
          expect($location.path()).toBe('/candidates/' + responseCandidateData()._id);
        });

      it('$scope.update(true) should update a valid candidate', inject(function(Candidates) {

        // fixture rideshare
        var putCandidateData = function() {
          return {
            _id: '525a8422f6d0f87f0e407a33',
            firstname: 'New candidate',
            lastname: 'New candidate last name',
            email: 'new@candidate.com'
          };
        };

        // mock candidate object from form
        var candidate = new Candidates(putCandidateData());

        // mock candidate in scope
        scope.candidate = candidate;

        // test PUT happens correctly
        $httpBackend.expectPUT(/candidates\/([0-9a-fA-F]{24})$/).respond();

        // run controller
        scope.update(true);
        $httpBackend.flush();

        // test URL location to new object
        expect($location.path()).toBe('/candidates/' + putCandidateData()._id);

      }));

      it('$scope.remove() should send a DELETE request with a valid candidateId ' +
        'and remove the candidate from the scope', inject(function(Candidates) {

          // fixture rideshare
          var candidate = new Candidates({
            _id: '525a8422f6d0f87f0e407a33'
          });

          // mock rideshares in scope
          scope.candidates = [];
          scope.candidates.push(candidate);

          // test expected rideshare DELETE request
          $httpBackend.expectDELETE(/candidates\/([0-9a-fA-F]{24})$/).respond(204);

          // run controller
          scope.remove(candidate);
          $httpBackend.flush();

          // test after successful delete URL location candidates list
          //expect($location.path()).toBe('/candidates');
          expect(scope.candidates.length).toBe(0);

        }));
    });
  });
}());
