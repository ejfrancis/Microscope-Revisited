Package.describe({
  name: 'ms-layout',
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
  api.use('efrancis:errors','client');

  api.addFiles('client/layout/layout.html','client');
  api.addFiles('client/layout/layout.js','client');

  api.addFiles('client/header/header.html','client');
  api.addFiles('client/header/header.js','client');


  api.addFiles('client/not_found/not_found.html','client');

  //api.addFiles('client/access-denied.js');

});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('ms-layout');
  api.addFiles('ms-layout-tests.js');
});
