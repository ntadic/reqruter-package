'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Candidate = mongoose.model('Candidate'),
  _ = require('lodash');


/**
 * Find candidate by id
 */
exports.candidate = function(req, res, next, id) {
  Candidate.load(id, function(err, candidate) {
    if (err) return next(err);
    if (!candidate) return next(new Error('Failed to load candidate ' + id));
    req.candidate = candidate;
    next();
  });
};

/**
 * Create an candidate
 */
exports.create = function(req, res) {
  var candidate = new Candidate(req.body);
  candidate.user = req.user;

  candidate.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot save the candidate'
      });
    }
    res.json(candidate);

  });
};

/**
 * Update an candidate
 */
exports.update = function(req, res) {
  var candidate = req.candidate;

  candidate = _.extend(candidate, req.body);

  candidate.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot update the candidate'
      });
    }
    res.json(candidate);

  });
};

/**
 * Delete an candidate
 */
exports.destroy = function(req, res) {
  var candidate = req.candidate;

  candidate.remove(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot delete the candidate'
      });
    }
    res.json(candidate);

  });
};

/**
 * Show an candidate
 */
exports.show = function(req, res) {
  res.json(req.candidate);
};

/**
 * List of Candidates
 */
exports.all = function(req, res) {
  Candidate.find().sort('-created').populate('user', 'name username').exec(function(err, candidates) {
    if (err) {
      return res.json(500, {
        error: 'Cannot list the candidates'
      });
    }
    res.json(candidates);

  });
};
