Package.describe({
  name: 'ms-config',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.1');
  api.use('ecmascript');
  api.use('ian:accounts-ui-bootstrap-3','client');
  api.addFiles('lib/ms-config.js');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('ms-config');
  api.addFiles('lib/ms-config-tests.js');
});
