module.exports = {
  init: function (config, job, context, done) {
    config = config || {}
    done(null, {
      env: config
    })
  }
}

