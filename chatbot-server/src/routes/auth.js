'use strict';
const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth');

// GET /v1/jwt_auth/new_session
router.get('/new_session', AuthController.generateNewToken);

// GET /v1/jwt_auth/verify_session
router.post('/verify_session', AuthController.verifyToken);

module.exports = router;