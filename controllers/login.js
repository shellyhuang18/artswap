const express = require('express');
const models = require('../models');

module.exports = {
  registerRouter() {
    const router = express.Router();

    router.post('/', this.login);

    return router;
  },

   // Allows user to log in 
  login(req, res){

  }
};
