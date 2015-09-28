Template.postsList.helpers({
  subsReady: function(){
    return Subs.ready();
  },
  posts: function(){
    //update subscription so client always has entier subset needed when changing limit
    Subs.subscribe('posts', getCurrentPostsListController().findOptions());
    var findOptions = getCurrentPostsListController().findOptions();
    var postsCursor = Posts.find({}, findOptions);
    console.log('options:', findOptions);
    console.log('posts count:', postsCursor.count());
    return postsCursor;
  },

  nextPath: function(){
    var nextPath = getCurrentPostsListController().nextPath();
    return nextPath;
  }
});

function getCurrentPostsListController(){
  var ctrl;

  // sort posts depending on route
  switch(FlowRouter.getRouteName()) {
    case NewPostsController.name:
      ctrl = NewPostsController;
      break;
    case BestPostsController.name:
      ctrl = BestPostsController;
  }

  return ctrl;
}

Template.postsList.onRendered(function () {
  //this.find('.wrapper')._uihooks = {
  //  moveElement: function (node, next) {
  //    var $node = $(node);
  //    var $next = $(next);
  //    var oldTop = $node.offset().top;
  //    var height = $node.outerHeight(true);
  //
  //    // find all the elements between next and node
  //    var $inBetween = $next.nextUntil(node);
  //    if ($inBetween.length === 0) {
  //      $inBetween = $node.nextUntil(next);
  //    }
  //    // now put node in place
  //    $node.insertBefore(next);
  //
  //    // measure new top
  //    var newTop = $node.offset().top;
  //
  //    // move node *back* to where it was before
  //    $node
  //      .removeClass('animate')
  //      .css('top', oldTop - newTop);
  //
  //    // push every other element down (or up) to put them back
  //    $inBetween
  //      .removeClass('animate')
  //      .css('top', oldTop < newTop ? height : -1 * height)
  //
  //
  //    // force a redraw
  //    $node.offset();
  //
  //    // reset everything to 0, animated
  //    $node.addClass('animate').css('top', 0);
  //    $inBetween.addClass('animate').css('top', 0);
  //  },
  //
  //  insertElement: function (node, next) {
  //    $(node)
  //      .hide()
  //      .insertBefore(next)
  //      .fadeIn();
  //  },
  //  removeElement: function(node) {
  //    $(node).fadeOut(function() {
  //      $(this).remove();
  //    });
  //  }
  //}
});