Package.describe({
  name: 'mstn:logger',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Npm.depends({
  'winston':'1.0.0'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1');
  api.use('underscore');
  api.addFiles('client/api.js', 'client');
  api.addFiles('server/api.js', 'server');
  api.export('Logger');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('mstn:logger');
  api.addFiles('tests/test-client.js', 'client');
});