Template.header.helpers({
  activeRouteClass: function (/* route names */) {
    //convert
    var args = Array.prototype.slice.call(arguments,0);
    args.pop(); //remove the last arg added by spacebars

    //if the current route's name matches any of the arguments passed in, it's active
    var active = _.any(args, function(name){
      return FlowRouter.getRouteName() === name
    });
    
    return active && 'active';
  }
});