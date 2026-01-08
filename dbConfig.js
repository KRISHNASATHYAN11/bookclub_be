const mongoose = require("mongoose");
// process in node
// env

const connectionString = process.env.connectionString;
mongoose
  .connect(connectionString)
  .then(() => {
    console.log("successfully connected to mongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
