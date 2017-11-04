const express = require('express');
const models = require('../models');


module.exports = {
  registerRouter() {
    const router = express.Router();

    router.post('/thread', this.create);

    return router;
  },

  // Allows user to create a thread 
  create(req, res){
 
  }
};

