const express = require('express');
const models = require('../models');

module.exports = {
  registerRouter() {
    const router = express.Router();

    router.post('/', this.submit);

    return router;
  },

  // Allows user create an account
  submit(req, res){

  }
};
