'use strict';
const express = require('express');
const router = express.Router();
const DashboardController = require('../controllers/dashboard');

// GET /v1/dashboard/user_engagement
router.get('/user_engagement', DashboardController.getUserEngagement);

// GET /v1/dashboard/drop_offs
router.get('/drop_offs', DashboardController.getDropOffs);

// GET /v1/dashboard/completed_users
router.get('/completed_users', DashboardController.getCompletedUsers);

module.exports = router;