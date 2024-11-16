const Assignment = require('../models/assignment');
const User = require('../models/user');

//Upload an assignment
const uploadAssignment = async (req, res) => {
  try {
    const admin = await User.findById(req.body.admin);
    
    if (!admin || admin.role !== "admin") {
      return res.status(404).send({
        error: 'Admin not found or not an admin'
      });
    }

    const assignment = new Assignment({
      ...req.body,
      userId: req.user._id,
    });

    await assignment.save();
    res.status(201).send(assignment);
  } catch (error) {
    res.status(400).send({
      errorMessage: `Error uploading assignment`,
      details: error,
    });
  }
};

//Fetch an admin's assignments
const fetchAdminAssignments = async (req, res) => {
  try {
    await req.user.populate({
      path: "reviewedAssignments",
    });
    res.send(req.user.reviewedAssignments);
  } catch (error) {
    res.status(500).send({
      errorMessage: "Error fetching assignments",
      details: error,
    });
  }
};

//Accept or reject an assignment
const updateAssignmentStatus = async (req, res) => {
  const _id = req.params.id;
  const { status } = req.body;

  if (!["accepted", "rejected"].includes(status)) {
    return res.status(400).send({ error: "Invalid status." });
  }

  try {
    const assignment = await Assignment.findById(_id);
    if (!assignment) {
      return res.status(404).send({ error: "Assignment not found!" });
    }

    assignment.status = status;
    await assignment.save();
    res.send({ message: `Assignment ${status} successfully` });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      errorMessage: "Error updating assignment",
      details: error,
    });
  }
};

module.exports = {
  uploadAssignment,
  fetchAdminAssignments,
  updateAssignmentStatus
};