const express = require('express');
const models = require('../models');

module.exports = {
  registerRouter() {
    const router = express.Router();

    
    router.get('/', this.index);
    router.post('/', this.logout);
    
    return router;
  },
  index(req, res){
	  res.json({
	  	msg: "Successful GET to route"
	  });
  },
   // Allows user to log out
  logout(req, res){

  }
};
