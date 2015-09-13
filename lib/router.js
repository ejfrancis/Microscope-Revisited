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
    return Meteor.subscribe('posts')
  }
});

Router.route('/', {
  name: 'postsList'
});

Router.route('/post/:_id', {
  name: 'postPage',
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


//require login for postSubmit
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});

