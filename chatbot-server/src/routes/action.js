'use strict';
const express = require('express');
const router = express.Router();
const ActionController = require('../controllers/action');

// GET /v1/action
router.post('/', ActionController.postAction);

module.exports = router;