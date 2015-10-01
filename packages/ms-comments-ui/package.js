Package.describe({
  name: 'ms-comments-ui',
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
  api.use('blaze-html-templates');

  api.addFiles([
    'client/comment_item/comment_item.html',
    'client/comment_item/comment_item.js'
  ],['client']);

  api.addFiles([
    'client/comment_submit/comment_submit.html',
    'client/comment_submit/comment_submit.js'
  ],['client']);
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('ms-comments-ui');
});
