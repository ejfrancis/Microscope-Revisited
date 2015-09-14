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
    return Meteor.subscribe('comments', this.params._id);
  },
  data: function(){
    return Posts.findOne(this.params._id);
  }
});
Router.onBeforeAction('dataNotFound', {only: 'postPage'});

Router.route('/posts/:_id/edit', {
  name: 'postEdit',
  data: function() {
    return Posts.findOne(this.params._id);
  }
});

Router.route('/submit/', {
  name: 'postSubmit'
});

PostsListController = RouteController.extend({
  template: 'postsList',
  increment: 5,
  postsLimit: function() {
    return parseInt(this.params.postsLimit) || this.increment;
  },
  findOptions: function() {
    return {sort: {submitted: -1}, limit: this.postsLimit()};
  },
  posts: function() {
    return Posts.find({}, this.findOptions());
  },
  subscriptions: function() {
    this.postsSub = Meteor.subscribe('posts', this.findOptions());
  },
  data: function() {
    var hasMore = this.posts().count() === this.postsLimit();
    var nextPath = this.route.path({postsLimit: this.postsLimit() + this.increment});
    return {
      posts: this.posts(),
      ready: this.postsSub.ready,
      nextPath: hasMore ? nextPath : null
    };
  }
});


Router.route('/:postsLimit?', {
  name: 'postsList'
});

//require login for postSubmit
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});

