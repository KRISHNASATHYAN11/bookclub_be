const applicationModel = require("../models/applicationModel");

exports.applyJobController = async (req, res) => {
  try {
    let { name, email, phoneNumber, qualification, jobRole, jobID } = req.body;
    let resume = req.file.filename;

    let newApplication = new applicationModel({
      name,
      email,
      phoneNumber,
      qualification,
      jobRole,
      jobID,
      resume,
    });

    await newApplication.save();
    res.status(201).json({ message: "Successfully applied", newApplication });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong in the  server" });
  }
};

exports.getAllApplications = async (req, res) => {
  try {
    let allApplications = await applicationModel.find();
    res.status(200).json({ message: "Successfully Fetched", allApplications });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong in server" });
  }
};
