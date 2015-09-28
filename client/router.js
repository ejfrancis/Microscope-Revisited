Subs = new SubsManager();
/*
///require login method/
// /var requireLogin = function() {
//  if (! Meteor.user()) {
//    if (Meteor.loggingIn()) {
//      this.render(this.loadingTemplate);
//    } else {
//      this.render('accessDenied');
//    }
//  } else {
//    this.next();
//  }
//};

//Router.configure({
//  layoutTemplate: 'layout',
//  loadingTemplate: 'loading',
//  notFoundTemplate: 'notFound',
//  waitOn: function() {
//    //wait for publication subscriptions before rendering app
//    return [Meteor.subscribe('notifications')]
//  }
//});

//
//Router.route('/post/:_id', {
//  name: 'postPage',
//  //wait for this post's comments before rendering
//  waitOn: function() {
//    return [
//      Meteor.subscribe('singlePost', this.params._id),
//      Meteor.subscribe('comments', this.params._id)
//    ];
//  },
//  data: function(){
//    return Posts.findOne(this.params._id);
//  }
//});
//Router.onBeforeAction('dataNotFound', {only: 'postPage'});

//Router.route('/posts/:_id/edit', {
//  name: 'postEdit',
//  waitOn: function() {
//    return Meteor.subscribe('singlePost', this.params._id);
//  },
//  data: function() {
//    return Posts.findOne(this.params._id);
//  }
//});

//Router.route('/submit/', {
//  name: 'postSubmit'
//});



//FlowRouter.route('/post/:_id', {
//  subscriptions: function(params){
//    this.register('singlePost', Meteor.subscribe('singlePost'), params._id);
//    this.register('comments', Meteor.subscribe('comments'), params._id);
//  },
//  action: function(params, queryParams){
//    BlazeLayout.render('layout', {content: 'postPage'})
//  }
//});



//FlowRouter.route('/new', {
//  name: 'new',
//  subscriptions: function(params){
//    this.register('posts', Meteor.subscribe('posts'));
//  },
//  action: function(params, queryParams){
//    BlazeLayout.render('layout', {content: 'postsList'})
//  }
//});

//Router.route('/', {
//  name: 'home',
//  controller: NewPostsController
//});
//Router.route('/new/:postsLimit?', {
//  name: 'newPosts',
//  controller: NewPostsController
//});
//Router.route('/best/:postsLimit?', {
//  name: 'bestPosts',
//  controller: BestPostsController
//});

//require login for postSubmit
//Router.onBeforeAction(requireLogin, {only: 'postSubmit'});


*/

//Router.route('/post/:_id', {
//  name: 'postPage',
//  //wait for this post's comments before rendering
//  waitOn: function() {
//    return [
//      Meteor.subscribe('singlePost', this.params._id),
//      Meteor.subscribe('comments', this.params._id)
//    ];
//  },
//  data: function(){
//    return Posts.findOne(this.params._id);
//  }
//});

//generic posts list controller
//PostsListController = RouteController.extend({
//  template: 'postsList',
//  increment: 10,
//  postsLimit: function() {
//    return parseInt(this.params.postsLimit) || this.increment;
//  },
//  findOptions: function() {
//    return {sort: this.sort, limit: this.postsLimit()};
//  },
//  posts: function() {
//    return Posts.find({}, this.findOptions());
//  },
//  subscriptions: function() {
//    this.postsSub = Meteor.subscribe('posts', this.findOptions());
//  },
//  data: function() {
//    var hasMore = this.posts().count() === this.postsLimit();
//    return {
//      posts: this.posts(),
//      ready: this.postsSub.ready,
//      nextPath: hasMore ? this.nextPath() : null
//    };
//  }
//});

//generic posts list controller
PostsListController = {
  template: 'postsList',
  increment: 10,
  postsLimit: function() {
    return parseInt(FlowRouter.getParam('postsLimit')) || this.increment;
  },
  findOptions: function() {
    return {sort: this.sort, limit: this.postsLimit()};
  }
};

//extend posts list controller for new posts
NewPostsController = _.extend({
  name: 'postsListNew',
  //sort by newest
  sort: {
    submitted: -1,
    _id: -1
  },
  nextPath: function() {
    return Router.routes.newPosts.path({postsLimit: this.postsLimit() + this.increment})
  }
}, PostsListController);

//extend posts list controller for best posts
BestPostsController = _.extend({
  name: 'postsListBest',
  //sort by most votes
  sort: {
    votes: -1,
    submitted: -1,
    _id: -1
  },
  nextPath: function() {
    return Router.routes.bestPosts.path({postsLimit: this.postsLimit() + this.increment})
  }
},PostsListController);



FlowRouter.route('/', {
  triggersEnter: [function(context, redirect) {
    redirect('/best');
  }]
});

FlowRouter.route('/new', {
  name: NewPostsController.name,
  subscriptions: function(params){
    this.register('posts', Subs.subscribe('posts', NewPostsController.findOptions()));
  },
  action: function (params, queryParams) {
    BlazeLayout.render('layout', { content: 'postsList'});
  }
});

FlowRouter.route('/best', {
  name: BestPostsController.name,
  triggersEnter: [function(){
    //force subs to refetch so Posts doesn't return same data. not sure if this is the best approach
    //Subs.clear();
  }],
  subscriptions: function(params){
    this.register('posts', Subs.subscribe('posts', BestPostsController.findOptions()));
  },
  action: function (params, queryParams) {
    BlazeLayout.render('layout', { content: 'postsList'});
  }
});



FlowRouter.route('/post/:_id', {
  name: 'postPage',
  subscriptions: function(params){
    this.register('singlePost', Subs.subscribe('singlePost', params._id));
    this.register('comments', Subs.subscribe('comments', params._id) );
  },
  action: function(params, queryParams){
    BlazeLayout.render('layout', { content: 'postPage' });
  }
});

FlowRouter.route('/postSubmit', {
  name: 'postSubmit',
  action: function(params, queryParams){
    BlazeLayout.render('layout', { content: 'postSubmit' });
  }
});

FlowRouter.route('/posts/:_id/edit', {
  name: 'postEdit',
  subscriptions: function(params){
    this.register('singlePost', Subs.subscribe('singlePost',params._id));
  },
  action: function(params, queryParams){
    BlazeLayout.render('layout', { content: 'postEdit' });
  }
});
//});

//404 page
FlowRouter.notFound = {
  // Subscriptions registered here don't have Fast Render support.
  subscriptions: function() {

  },
  action: function() {
    BlazeLayout.render('layout', { content: 'notFound'});
  }
};