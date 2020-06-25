'use strict';

const express = require('express');
const router = express.Router();
const TechController = require('../controllers/technology');

router.get('/tweetdata', TechController.getAll);

module.exports = router;
