'use strict';

// The Package is past automatically as first parameter
module.exports = function(Reqruter, app, auth, database) {

  app.get('/reqruter/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/reqruter/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/reqruter/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/reqruter/example/render', function(req, res, next) {
    Reqruter.render('index', {
      package: 'reqruter'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};
