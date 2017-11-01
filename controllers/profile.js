const express = require('express');
const models = require('../models');

const router = express.Router();

// Allows user to update portfolio - upload images to add more to his repitoire
router.post('/', (req, res) => {
	res.render('profile');
})

module.exports = router;