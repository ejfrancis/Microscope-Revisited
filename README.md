## Microscope Revisited

[Discovering Meteor's Microscope](https://github.com/DiscoverMeteor/Microscope) was a great way to get an introduction to the Meteor
framework. I wanted to continue learning , so I used the Microscope project as a test bed for teaching myself. 
 Hopefully it can be helpful to others who are looking to continue their education as well. 
 
## Changes
 This project is upgraded to Meteor 1.2 and rebuilt using the following packages:

* `kadira:flow-router` instead of `iron:router` for faster, client-side routing
* `arilla:flow-router-helpers`
* `kadira:blaze-layout` 
* `meteorhacks:subs-manager` for caching subscriptions on the client
* `meteorhacks:fast-render` to send initial DDP data to the client and decrease pageload time

##Branches
There are different branches in this repo for the different steps of refactoring:

* `v1` is the complete Microscope project from DiscoveringMeteor (written by me as I read through the book so there may be slight differences)
* `v2-w/karidahq-packages` is rebuilt using the kadira/meteorhacks packages listed above for better performance
* `v3-local-packages` is refactored so that all code is inside local packages for better code organization and separation of concerns
* `v4-microservices` *[COMING SOON]* is rebuilt with microservices using `meteorhacks:cluster`

---

## Changes for FlowRouter 
Using a different router required a few changes from the original Microscope project, including:

* auth is implemented at template-level, with global template helpers 'canShow' and 'authInProcess'
* the PostsListController is now just a plain JavaScript function/class
* the postsList template JS file now includes a getCurrentPostsListController() method because the posts cursor is 
created within the template itself instead of at the router level when postsLimit changes in the URL. Ideally all 
subscriptions would be at the template level, but registering them in the router is required for `kadira:fast-render` (for now).
