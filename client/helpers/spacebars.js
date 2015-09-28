Template.registerHelper('pluralize', function(n,thing){
  var res;
  if (n === 1){
    res = '1 ' + thing;
  } else {
    res = n + ' ' + thing + 's';
  }
  return res;
});