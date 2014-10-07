'use strict';

var candidates = require('../controllers/candidates');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin /*&& req.candidate.user.id !== req.user.id*/) { //all users can see all candidates
    return res.send(401, 'User is not authorized');
  }
  next();
};

module.exports = function(Candidates, app, auth) {

  app.route('/candidates')
    .get(candidates.all)
    .post(auth.requiresLogin, candidates.create);
  app.route('/candidates/:candidateId')
    .get(candidates.show)
    .put(auth.requiresLogin, hasAuthorization, candidates.update)
    .delete(auth.requiresLogin, hasAuthorization, candidates.destroy);

  // Finish with setting up the articleId param
  app.param('candidateId', candidates.candidate);
};
