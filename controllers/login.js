const express = require('express');
const passport = require('../middlewares/authentication');
const Redirect = require('../middlewares/redirect');

module.exports = {
  registerRouter() {
    const router = express.Router();


    router.get('/', Redirect.ifLoggedIn('/profile'), this.index);
    router.post('/', this.login);


    return router;
  },
  index(req, res) {
    res.render('login', { error: req.flash('error'), layout: 'noNavigation'});
  },
  login(req, res) {
    req.body.email = req.body.email.toLowerCase();
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true,
      successFlash: true,
    })(req, res);
  },
};
