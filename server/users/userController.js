<<<<<<< HEAD
var User = require('./userModel.js');

module.exports = function(){
  User.findOne({
    provider_id: req.session.passport.user
  }, function(err, data){

    if (err) throw (err);

    if(!err & data != null){
      console.log('data about user', data);
      res.json(data);
    }

  });
}
=======
var User = require('userModel.js');

module.exports = {

  
  getUserInfo: function(req, res) {
      User.findOne({
        provider_id: profile.id
      }, function (err, user) {
        // console.log('ERROR in finding user on login: ', err);
        if (err) throw (err);
        // console.log('LOGIN no error, user: ', user);
        if (!err && user != null) return done(null, user);

        var user = new User({
          provider_id: profile.id,
          provider: profile.provider,
          name: profile.displayName,
          screen_name: profile.username,
          photo: profile.photos[0].value
        });
        user.save(function (err) {
          if (err) console.log('ERROR in user creation on login: ', err);
          if (err) throw err;
          done(null, user);
        });
      });
   


  
};
>>>>>>> Before big update!
