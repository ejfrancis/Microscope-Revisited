## Microscope Revisited

[Discovering Meteor's Microscope](https://github.com/DiscoverMeteor/Microscope) upgraded to Meteor 1.2 and rebuilt using the following packages:

* `kadira:flow-router`
* `arilla:flow-router-helpers`
* `kadira:blaze-layout`
* `meteorhacks:subs-manager`
* `meteorhacks:fast-render`
* `meteorhacks:cluster`


There are different branches for the different steps of refactoring:

* `v1` is the complete Microscope project from DiscoveringMeteor (written by me as I read the book so there may be slight differences)
* `v2-w/karidahq-packages` is rebuilt using the kadira/meteorhacks packages listed above
* `v3-local-packages` [COMING] is refactored so that all code is inside local packages
* `v4-microservices` [COMING] is rebuilt with microservices using `meteorhacks:cluster`

---

## Changes for FlowRouter 
Using a different router required a few changes from the original Microscope project, including:

* auth is implemented at template-level, with global template helpers 'canShow' and 'authInProcess'
* the PostsListController is now just a plain JavaScript function/class
* the postsList template JS file now includes a getCurrentPostsListController() method because the posts cursor is created within the template itself instead of at the router level when postsLimit changes in the URL. Ideally all subscriptions would be at the template level, but registering them in the router is required for `kadira:fast-render` (for now)

## Starting the app
Since the app is running on all available cores using the `meteorhacks:cluster` package using the envrionment variables API, to start the app a shell script `.start-app` is used. So to run the app, run:

 `sh .start-app`


