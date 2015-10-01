Package.describe({
  name: 'ms-comments',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.1');
  api.use('ecmascript');
  api.use('mongo');
  api.use('ms-core',['client','server']);

  api.addFiles('lib/collections.js',['client','server']);
  api.addFiles('server/publications.js',['server']);
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('ms-comments');
  api.addFiles('ms-comments-tests.js');
});
