Package.describe({
  name: 'ms-posts-ui',
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
  api.use('meteorhacks:subs-manager');
  api.use('ms-posts');

  api.addFiles([
    'client/post_edit/post_edit.html',
    'client/post_edit/post_edit.js'
  ],'client');
  api.addFiles([
    'client/post_item/post_item.html',
    'client/post_item/post_item.js'
  ],'client');
  api.addFiles([
    'client/post_page/post_page.html',
    'client/post_page/post_page.js'
  ],'client');
  api.addFiles([
    'client/post_submit/post_submit.html',
    'client/post_submit/post_submit.js'
  ],'client');
  api.addFiles([
    'client/posts_list/posts_list.html',
    'client/posts_list/posts_list.js'
  ],'client');

});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('ms-posts-ui');
  api.addFiles('ms-posts-ui-tests.js');
});
