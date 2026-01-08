const express = require("express");

const userController = require("./controllers/userController");

const jwtMiddleware = require("./middlewares/jwtMiddleware");

const bookController = require("./controllers/bookController");

const multerMiddleware = require("./middlewares/multerMiddleware");

const jwtAdminMiddleware = require("./middlewares/jwtAdminMiddleware");

const adminController = require("./controllers/adminController");

const jobController = require('./controllers/jobController');

const resumeMulterMiddleware = require("./middlewares/resumeMulterMiddleware");

const purchaseController = require('./controllers/purchaseController')

const applicationController = require('./controllers/applicationController')

const router = new express.Router();

router.post("/registerUser", userController.registerUser);

router.post("/loginUser", userController.loginUser);

router.post("/googleAuth", userController.googleLogin);

router.post(
  "/addBook",
  jwtMiddleware,
  multerMiddleware.array("uploadedImages"),
  bookController.addBookController
);

router.get("/getAllBooks", jwtMiddleware, bookController.getAllBooks);

router.get("/getLimitedBooks", bookController.getLimitedBooks);

router.get("/:id/getSingleBook", jwtMiddleware, bookController.getSingleBook);

router.patch(
  "/:id/updateProfile",
  jwtMiddleware,
  multerMiddleware.single("profilePic"),
  userController.updateProfile
);

router.get("/getAllUsers", jwtAdminMiddleware, adminController.getAllUsers);

router.post('/addJob',jwtAdminMiddleware,jobController.addJobController)

router.get('/getAllJobs',jobController.getAllJobs)

router.delete('/:id/deleteJob',jwtAdminMiddleware,jobController.deleteJob)

router.post('/applyJob',resumeMulterMiddleware.single('resume'), applicationController.applyJobController)

router.get('/getAllJobApplications',jwtAdminMiddleware,applicationController.getAllApplications)

router.post('/makePayment',jwtMiddleware,purchaseController.buyBook)


router.get('/getSoldBooksByUser',jwtMiddleware,purchaseController.getSoldBooksByUser)

router.get('/getBuyBooksByUser',jwtMiddleware,purchaseController.getBuyBooksByUser)

module.exports = router;


