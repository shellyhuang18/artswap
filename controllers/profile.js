const express = require('express');
const models = require('../models');

module.exports = {
  registerRouter() {
    const router = express.Router();

    router.post('/', this.new);

    return router;
  },

   // Allows user to update portfolio - upload images to add more to his repitoire
  new(req, res){

  }
};
