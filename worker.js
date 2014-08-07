var _ = require('lodash');

var deep_value = function(obj, path){
  for (var i=0, path=path.split('.'), len=path.length; i<len; i++){
    obj = obj[path[i]];
  };
  return obj;
};

module.exports = {
  init: function (config, job, context, done) {
    var c = config || {}
    done(null, {
      env: _.zipObject(_.keys(c), _.map(_.values(c), function (v) {
        return deep_value(job, v);
      }))
    })
  }
}

