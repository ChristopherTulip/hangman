
PagesController = function () {};

PagesController.prototype.landing = function(req, res) {
  res.render('index', {
    title : 'Chris'
  })
};

module.exports = new PagesController();

