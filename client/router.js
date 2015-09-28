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
function PostsListController (){
  this.template = 'postsList';
  this.increment = 10;
  this.sort = {};

  this.postsLimit = function() {
    var limit = parseInt(FlowRouter.getParam('postsLimit')) || this.increment;
    return limit;
  };

  this.findOptions = function() {
    var options = {
      sort: this.sort,
      limit: this.postsLimit()
    };

    return options;
  };

  this.getNextPath = function(){
    var localPostsCount = Posts.find({}, this.findOptions()).count();
    var postsLimit = this.postsLimit();
    var nextPath = this.nextPath();

    if(localPostsCount === postsLimit){
      return nextPath;
    }
  }
}

//extend posts list controller for new posts
NewPostsController = new PostsListController();
NewPostsController.name = 'postsListNew';
NewPostsController.sort = {
  submitted: -1,
  _id: -1
};
NewPostsController.nextPath = function() {
  var path = FlowRouter.path(NewPostsController.name, {postsLimit: this.postsLimit() + this.increment});
  return path;
};


//extend posts list controller for best posts
BestPostsController = new PostsListController();
BestPostsController.name = 'postsListBest';
BestPostsController.sort = {
  votes: -1,
  submitted: -1,
  _id: -1
};
BestPostsController.nextPath = function() {
  var path = FlowRouter.path(BestPostsController.name, {postsLimit: this.postsLimit() + this.increment});
  return path;
};


FlowRouter.route('/', {
  name: 'home',
  triggersEnter: [function(context, redirect) {
    redirect('/best/10');
  }]
});

FlowRouter.route('/new/:postsLimit', {
  name: NewPostsController.name,
  subscriptions: function(params){
    console.log('router options:', NewPostsController.findOptions());
    this.register('posts', Subs.subscribe('posts', NewPostsController.findOptions()));
  },
  action: function (params, queryParams) {
    BlazeLayout.render('layout', { content: NewPostsController.template});
  }
});

FlowRouter.route('/best/:postsLimit', {
  name: BestPostsController.name,
  subscriptions: function(params){
    this.register('posts', Subs.subscribe('posts', BestPostsController.findOptions()));
  },
  action: function (params, queryParams) {
    BlazeLayout.render('layout', { content: BestPostsController.template});
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