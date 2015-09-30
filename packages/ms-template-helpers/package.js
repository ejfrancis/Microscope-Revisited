Package.describe({
  name: 'ms-template-helpers',
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
  api.use('blaze-html-templates','client');
  api.addFiles('client/ms-template-helpers.js','client');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('ms-template-helpers');
  api.addFiles('client/ms-template-helpers-tests.js');
});
