Template.postsList.helpers({
  posts: function(){
    return Posts.find();
  }
});

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