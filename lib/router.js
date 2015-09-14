//require login method
var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
};

Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    //wait for publication subscriptions before rendering app
    return [Meteor.subscribe('notifications')]
  }
});

Router.route('/post/:_id', {
  name: 'postPage',
  //wait for this post's comments before rendering
  waitOn: function() {
    return [
      Meteor.subscribe('singlePost', this.params._id),
      Meteor.subscribe('comments', this.params._id)
    ];
  },
  data: function(){
    return Posts.findOne(this.params._id);
  }
});
Router.onBeforeAction('dataNotFound', {only: 'postPage'});

Router.route('/posts/:_id/edit', {
  name: 'postEdit',
  waitOn: function() {
    return Meteor.subscribe('singlePost', this.params._id);
  },
  data: function() {
    return Posts.findOne(this.params._id);
  }
});

Router.route('/submit/', {
  name: 'postSubmit'
});


//generic posts list controller
PostsListController = RouteController.extend({
  template: 'postsList',
  increment: 10,
  postsLimit: function() {
    return parseInt(this.params.postsLimit) || this.increment;
  },
  findOptions: function() {
    return {sort: this.sort, limit: this.postsLimit()};
  },
  posts: function() {
    return Posts.find({}, this.findOptions());
  },
  subscriptions: function() {
    this.postsSub = Meteor.subscribe('posts', this.findOptions());
  },
  data: function() {
    var hasMore = this.posts().count() === this.postsLimit();
    return {
      posts: this.posts(),
      ready: this.postsSub.ready,
      nextPath: hasMore ? this.nextPath() : null
    };
  }
});

//extend posts list controller for new posts
NewPostsController = PostsListController.extend({
  //sort by newest
  sort: {
    submitted: -1,
    _id: -1
  },
  nextPath: function() {
    return Router.routes.newPosts.path({postsLimit: this.postsLimit() + this.increment})
  }
});
//extend posts list controller for best posts
BestPostsController = PostsListController.extend({
  //sort by most votes
  sort: {
    votes: -1,
    submitted: -1,
    _id: -1
  }
  ,
  nextPath: function() {
    return Router.routes.bestPosts.path({postsLimit: this.postsLimit() + this.increment})
  }
});

Router.route('/', {
  name: 'home',
  controller: NewPostsController
});
Router.route('/new/:postsLimit?', {
  name: 'newPosts',
  controller: NewPostsController
});
Router.route('/best/:postsLimit?', {
  name: 'bestPosts',
  controller: BestPostsController
});

//require login for postSubmit
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});

