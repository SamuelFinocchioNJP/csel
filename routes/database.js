/**
 * Models routes
 */
//Dependencies
const express = require('express');
const router = express.Router();

router.use('/courses', require('./model/course'));
router.use('/resources', require('./model/resource'));
router.use('/users', require('./model/user'));

module.exports = router;
