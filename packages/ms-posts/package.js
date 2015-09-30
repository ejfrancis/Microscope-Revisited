Package.describe({
  name: 'ms-posts',
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
  api.use('meteorhacks:subs-manager');
  api.use('kadira:flow-router@2.0.0');
  api.addFiles([
    'lib/router.js',
    'lib/collection.js'
    ], ['client','server']);
  api.addFiles([
    'server/publications.js'
  ], 'server');

  //make posts list controllers available for ms-posts-ui package
  api.export(['PostsListController','NewPostsController','BestPostsController'],['client']);
  api.export('Posts');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('ms-posts');
});
