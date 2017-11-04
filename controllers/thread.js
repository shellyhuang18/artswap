const express = require('express');
const models = require('../models');

module.exports = {
  registerRouter() {
    const router = express.Router();

    router.post('/', this.create);
    router.put('/', this.edit);
    router.delete('/', this.remove);

    return router;
  },

  // Allows user to post a response, iff thread doesn't belong to user
  create(req, res){
    
  },

  // Allows user to edit thread, iff thread belongs to user
  edit(req, res){

  },

  // Allows user to delete thread, iff thread belongs to user
  remove(req, res){

  }
};