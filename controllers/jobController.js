const jobModel = require("../models/jobModel");

exports.addJobController = async (req, res) => {
  try {
    let {
      jobTitle,
      jobLocation,
      jobDescription,
      salary,
      experience,
      qualification,
      lastDate,
      publishedDate,
    } = req.body;

    if (
      jobTitle &&
      jobLocation &&
      jobDescription &&
      salary &&
      experience &&
      qualification &&
      lastDate &&
      publishedDate
    ) {
      // proceed to api call
      let newJob = new jobModel({
        jobTitle,
        jobLocation,
        jobDescription,
        salary,
        experience,
        qualification,
        lastDate,
        publishedDate,
      });
      await newJob.save();
      res.status(201).json({ message: "Successfully added" }, newJob);
    } else {
      res.status(400).json({ message: "please fill the form" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong in server" });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    let AllJobs = await jobModel.find();
    res.status(200).json(AllJobs);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: " something went wrong in getting all job" });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    let { id } = req.params;
     await jobModel.findByIdAndDelete({ _id: id });
    res.status(200).json({message:"Successfully deleted"})



  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong in server" });
  }
};
