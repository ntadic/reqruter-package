'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Candidate Schema
 */
var CandidateSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    dateofbirth: {
        type: Date
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    note: {
        type: String,
        trim: true
    },
    cv: {
        type: Buffer/*,
        required: true*/
    },
    yearsofexperience: {
        type: Number
    },
    user: {
    type: Schema.ObjectId,
    ref: 'User'
    }
});

/**
 * Validations
 */
CandidateSchema.path('firstname').validate(function(firstname) {
  return !!firstname;
}, 'Firstname cannot be blank');

CandidateSchema.path('lastname').validate(function(lastname) {
  return !!lastname;
}, 'Lastname cannot be blank');

CandidateSchema.path('email').validate(function(email) {
    return !!email;
}, 'Email cannot be blank');

/**
 * Statics
 */
CandidateSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};

mongoose.model('Candidate', CandidateSchema);
