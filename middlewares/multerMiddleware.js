const multer = require("multer");

const storage = multer.diskStorage({
  // to tell on which place the file should be saved
  // cb means a call back function.
  //   callback fn is used to provide operations
  destination: (req, file, cb) => {

    cb(null, "./uploads");
  },
  //   custom name to the file
  filename: (req, file, cb) => {
    let date = Date.now();
    cb(null, `bookstore-${date}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const multerMiddleware = multer({ storage, fileFilter });

module.exports = multerMiddleware;
