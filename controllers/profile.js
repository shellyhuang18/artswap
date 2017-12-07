const express = require('express');
const Redirect = require('../middlewares/redirect');
const models = require('../models');

module.exports = {
  registerRouter() {
    const router = express.Router();

    router.get('/', Redirect.ifNotLoggedIn(), this.index);
    router.post('/', this.submit);

    return router;
  },
  index(req, res) {
    //req.user.userName
  	models.Social.findOne({
  		where: {
  			userName: req.user.userName
  		}
  	}).then((userSocial) => {
    	res.render('profile', {userSocial, layout: 'main', user: req.user, success: req.flash('success') })
      })
  },


  submit(req, res) {
  	models.Social.findOne({
  		where: {
  			userName: req.user.userName
  		}
  	}).then((userSocial) => {
  		userSocial.updateAttributes({
  			facebook: req.body.facebook,
  			twitter: req.body.twitter,
  			deviantart: req.body.deviantart,
  			github: req.body.github,
  			website: req.body.website
  		})
  	}).then(res.redirect('/'))

  },
};
