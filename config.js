module.exports = function(app, express) {
  var config = this;
  var stylus = require('stylus')
  var nib = require('nib')

  function styl_compile (str, path) {
    return stylus(str)
      .set('filename', path)
      .set('compress', true)
      .use(nib());
  }

  app.set('views', __dirname + '/views')
  app.set('view engine', 'jade')

  app.use(express.logger('dev'))

  app.use("/images", express.static(__dirname + "/public/images"))
  app.use("/scripts", express.static(__dirname + "/public/scripts"))
  app.use("/stylesheets", express.static(__dirname + "/public/stylesheets"))
  app.use(stylus.middleware({
      src: __dirname + '/assets/',
      dest: __dirname + '/public/',
      compile: styl_compile
    }
  ))

}
