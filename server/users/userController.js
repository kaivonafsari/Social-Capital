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