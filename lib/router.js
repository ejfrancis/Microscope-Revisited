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


Router.route('/:postsLimit?', {
  name: 'postsList',
  waitOn: function() {
    var limit = parseInt(this.params.postsLimit) || 5;
    return Meteor.subscribe('posts', {submitted: -1}, limit);
  },
  data: function() {
    var limit = parseInt(this.params.postsLimit) || 5;
    //set data context to name 'posts'
    return {
      posts: Posts.find({}, {sort: {submitted: -1}, limit: limit})
    };
  }
});

//require login for postSubmit
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});

