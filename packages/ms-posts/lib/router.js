Subs = new SubsManager();

//generic posts list controller
function PostsListController (){
  this.template = 'postsList';
  this.increment = 10;
  this.sort = undefined;

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

  //non-reactive version of findOptions so we can use it inside the flowrouter .subscriptions()
  this.findOptionsNonReactive = function(){
    var options = {
      sort: this.sort,
      limit: this.increment
    };

    return options;
  };

  this.getNextPath = function(){
    var localPostsCount = MS.collections.Posts.find({}, this.findOptions()).count();
    var postsLimit = this.postsLimit();
    var nextPath = this.nextPath();

    if(localPostsCount === postsLimit){
      return nextPath;
    }
  }
}

//extend posts list controller for new posts
MS.controllers.NewPostsController = new PostsListController();
MS.controllers.NewPostsController.name = 'postsListNew';
MS.controllers.NewPostsController.sort = {
  submitted: -1,
  _id: -1
};
MS.controllers.NewPostsController.nextPath = function() {
  var path = FlowRouter.path(MS.controllers.NewPostsController.name, {postsLimit: this.postsLimit() + this.increment});
  return path;
};


//extend posts list controller for best posts
MS.controllers.BestPostsController = new PostsListController();
MS.controllers.BestPostsController.name = 'postsListBest';
MS.controllers.BestPostsController.sort = {
  votes: -1,
  submitted: -1,
  _id: -1
};
MS.controllers.BestPostsController.nextPath = function() {
  var path = FlowRouter.path(MS.controllers.BestPostsController.name, {postsLimit: this.postsLimit() + this.increment});
  return path;
};


//global subscription
FlowRouter.subscriptions = function() {
  this.register('myCourses', Subs.subscribe('notifications'));
};

FlowRouter.route('/', {
  name: 'home',
  triggersEnter: [function(context, redirect) {
    redirect('/best/10');
  }]
});

FlowRouter.route('/new/:postsLimit', {
  name: MS.controllers.NewPostsController.name,
  subscriptions: function(params){
    this.register('posts', Subs.subscribe('posts', MS.controllers.NewPostsController.findOptionsNonReactive()));
  },
  action: function (params, queryParams) {
    BlazeLayout.render('layout', { content: MS.controllers.NewPostsController.template});
  }
});

FlowRouter.route('/best/:postsLimit', {
  name: MS.controllers.BestPostsController.name,
  subscriptions: function(params){
    this.register('posts', Subs.subscribe('posts', MS.controllers.BestPostsController.findOptionsNonReactive()));
  },
  action: function (params, queryParams) {
    BlazeLayout.render('layout', { content: MS.controllers.BestPostsController.template});
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