const express = require('express');
const models = require('../models');

const router = express.Router();

// Allows user to delete thread, iff thread belongs to user
router.delete('/', (req, res) => {

})

// Allows user to edit thread, iff thread belongs to user
router.put('/', (req, res) => {

})

// Allows user to post a response, iff thread doesn't belong to user
router.post('/', (req, res) => {

})
