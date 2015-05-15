var user = require('./userController.js');

//app is the twitterRouter injected from middleware.js
//POST requests expect an object with a "twitterHandle" key and corresponding value.
module.exports = function(app){

  app.get('/', user.getUserInfo);

}