const bookModel = require("../models/bookModel");

exports.addBookController = async (req, res) => {
  try {
    let {
      title,
      author,
      price,
      abstract,
      noOfPages,
      imageURL,

      discountPrice,
      publisher,
      language,
      ISBN,
      category,
    } = req.body;

    let userMail = req.userMail;
    console.log(userMail);
    console.log(
      title,
      author,
      price,
      abstract,
      noOfPages,
      imageURL,
      discountPrice,
      publisher,
      language,
      ISBN,
      category
    );
    // console.log(req.files);

    let uploadedImages = req.files.map((eachFile) => eachFile.filename);

    let existingBook = await bookModel.findOne({ title: title });

    if (existingBook) {
      res
        .status(409)
        .json({ message: "book with this title is already added." });
    } else {
      // logic to add book

      let newBook = new bookModel({
        title,
        author,
        price,
        abstract,
        noOfPages,
        imageURL,
        uploadedImages,
        discountPrice,
        publisher,
        language,
        ISBN,
        category,
        userMail,
      });
      await newBook.save();
      res
        .status(201)
        .json({ message: "Successfully created New Book", newBook });
    }
  } catch (error) {
    res.status(500).json({ message: "Error occurred in server" });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    let searchKey = req.query.search;
    let searchQuery = {
      title: {
        $regex: searchKey,
        $options: "i",
      },
    };

    let AllBooks = await bookModel.find(searchQuery);
    res.status(200).json({ message: "Book list is here", AllBooks });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error Occurred in Server" });
  }
};

exports.getLimitedBooks = async (req, res) => {
  try {
    let limitedBooks = await bookModel.find().limit(6);
    res
      .status(200)
      .json({ message: "List of limited books are here... ", limitedBooks });
  } catch (error) {
    res.status(500).json({ message: "Error occurred in server" });
  }
};

exports.getSingleBook = async (req, res) => {
  try {
    let { id } = req.params;
    let singleBook = await bookModel.findById({ _id: id });
    res.status(200).json(singleBook);
  } catch (error) {
    res.status(500).json({ message: "Error occurred in server" });
  }
};


