'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Candidate = mongoose.model('Candidate');

/**
 * Globals
 */
var user;
var candidate;

/**
 * Test Suites
 */
describe('<Unit Test>', function() {
  describe('Model Candidate:', function() {
    beforeEach(function(done) {
      user = new User({
        name: 'Full name',
        email: 'test@test.com',
        username: 'user',
        password: 'password'
      });

      user.save(function() {
        candidate = new Candidate({
          firstname: 'Candidate name',
          lastname: 'Candidate last name',
          dateofbirth: new Date(),
          email: 'candidate@email.com',
          phone: '+381645551112',
          note: 'Candidate note',
          cv: undefined,
          yearsofexperience: 5,
          user: user
        });

        done();
      });
    });

    describe('Method Save', function() {
      it('should be able to save without problems', function(done) {
        return candidate.save(function(err) {
            should.not.exist(err);
            candidate.firstname.should.equal('Candidate name');
            candidate.lastname.should.equal('Candidate last name');
            candidate.dateofbirth.should.not.have.length(0);
            candidate.email.should.equal('candidate@email.com');
            candidate.phone.should.equal('+381645551112');
            candidate.note.should.equal('Candidate note');
            //candidate.cv.should.equal(undefined);
            candidate.yearsofexperience.should.equal(5);
            candidate.user.should.not.have.length(0);
            candidate.created.should.not.have.length(0);
          done();
        });
      });

      it('should be able to show an error when try to save without first name', function(done) {
        candidate.firstname = '';

        return candidate.save(function(err) {
          should.exist(err);
          done();
        });
      });

      it('should be able to show an error when try to save without last name', function(done) {
        candidate.lastname = '';

        return candidate.save(function(err) {
          should.exist(err);
          done();
        });
      });
      it('should be able to show an error when try to save without email', function(done) {
          candidate.email = '';

          return candidate.save(function(err) {
              should.exist(err);
              done();
           });
      });

      it('should be able to show an error when try to save without user', function(done) {
        candidate.user = {};

        return candidate.save(function(err) {
          should.exist(err);
          done();
        });
      });

    });

    afterEach(function(done) {
      candidate.remove();
      user.remove();
      done();
    });
  });
});
