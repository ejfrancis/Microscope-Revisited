## Microscope + KadiraHQ

Microscope rebuilt using the following packages

* kadira:flow-router
* arilla:flow-router-helpers
* kadira:blaze-layout
* meteorhacks:subs-manager
* meteorhacks:fast-render

Using a different router required a few changes from the original Microscope project, including:

* auth is implemented at template-level, with global template helpers 'canShow' and 'authInProcess'
* the PostsListController is now just a plain JavaScript function/class
* the postsList template JS file now includes a getCurrentPostsListController() method because the posts data cursor must be created within the template itself instead of at the router level
