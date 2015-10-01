Package.describe({
  name: 'ms-core',
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
  api.addFiles('lib/namespace.js',['client','server']);
  api.export('MS',['client','server']);
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('ms-core');
});
