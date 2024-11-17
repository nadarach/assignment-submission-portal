const express = require('express');
const authenticate = require('../middleware/authenticate');
const { authorizeAdmin } = require('../middleware/authorize');
const Assignment = require('../models/assignment');
const { uploadAssignment, fetchAdminAssignments, updateAssignmentStatus } = require("../controllers/assignmentController");

const router = new express.Router();

//route for uploading an assignment
router.post('/upload', authenticate, uploadAssignment);

//Route for viewing assignments tagged to the admin
router.get('', authenticate, authorizeAdmin, fetchAdminAssignments);

//Route for accepting an assignment
router.post('/:id/accept', authenticate, authorizeAdmin, updateAssignmentStatus);

//Route for rejecting an assignment
router.post("/:id/reject", authenticate, authorizeAdmin, updateAssignmentStatus);

module.exports = router;