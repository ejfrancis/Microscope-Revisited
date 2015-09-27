Template.registerHelper('pluralize', function(n,thing){
  console.log('n:',n);
  console.log('thing:',thing);
  var res;
  if (n === 1){
    res = '1 ' + thing;
  } else {
    res = n + ' ' + thing + 's';
  }
  console.log('res:',res);
  return res;
});