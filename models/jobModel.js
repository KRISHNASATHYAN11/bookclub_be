const mongoose = require("mongoose");
const jobSchema = new mongoose.Schema({
  jobTitle: {
    required: true,
    type: String,
  },
  jobLocation: {
    required: true,
    type: String,
  },
  jobDescription: {
    required: true,
    type: String,
  },
  salary: {
    required: true,
    type: String,
  },

  experience: {
    required: true,
    type: String,
  },
  qualification: {
    required: true,
    type: String,
  },
  lastDate: {
    required: true,
    type: String,
  },
  publishedDate: {
    required: true,
    type: String,
  },
  contactMail: {
    type: String,
    default: "Admin@bookclub.com",
  },
});

const jobModel = mongoose.model("jobs", jobSchema);
module.exports = jobModel;
