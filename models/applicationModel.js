const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  resume: {
    type: String,
    required: true,
  },
  jobRole: {
    type: String,
    required: true,
  },
  jobID: {
    type: String,
    required: true,
  },
});

const applicationModel = mongoose.model('applications',applicationSchema)

module.exports = applicationModel