'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Reqruter = new Module('reqruter');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Reqruter.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Reqruter.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Reqruter.menus.add({
    'roles': ['authenticated'],
    'title': 'Candidates',
    'link': 'all candidates',
    'items': [{
      'roles': ['authenticated'],
      'title': 'Candidates',
      'link': 'all candidates'
      },
      {
        'roles': ['authenticated'],
        'title': 'Create New Candidate',
        'link': 'create candidate'
      }
    ]
  },
    {
      'roles': ['interviewer'],
      'title': 'Questions',
      'link': 'all question sets',
      'items': [{
        'roles': ['interviewer'],
        'title': 'Question Sets',
        'link': 'all question sets'
      },
        {
          'roles': ['interviewer'],
          'title': 'Create Question Set',
          'link': 'create question set'
        }
      ]
    });
  
  Reqruter.aggregateAsset('css', 'reqruter.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Reqruter.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Reqruter.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Reqruter.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Reqruter;
});
