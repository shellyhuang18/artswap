const express = require('express');
const models = require('../models');

const router = express.Router();

// Allows user to create a thread 
router.post('/thread', (req, res) => {
  res.json({
    msg: "Successful POST to '/' route"
  });
});



module.exports = router;
