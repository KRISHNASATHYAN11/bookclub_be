const purchaseModel = require("../models/purchaseModel");
const stripe = require("stripe")(process.env.stripeKey);

exports.buyBook = async (req, res) => {
  try {
    let {
      bookId,
      bookName,
      bookDesc,
      sellerMail,
      bookImage,
      price,
      discountPrice,
    } = req.body;
    let buyerMail = req.userMail;

    // payment gateway
    // lineitems (payment details )
    let actualAmount = price - discountPrice;
    const line_items = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: bookName,
            description: bookDesc,
            images: [bookImage],
            metadata: {
              title: bookName,
              sellerMail: sellerMail,
              bookId: bookId,
              price: price,
              discountPrice: discountPrice,
              buyerMail: buyerMail,
            },
          },
          // 1 dollar = 100 cent , round used to remove decimal points.
          unit_amount: Math.round(actualAmount * 100),
        },
        quantity: 1,
      },
    ];
    // Mode of payment ,

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: "https://bookclub-fe-91js.vercel.app/payment-success",
      cancel_url: "https://bookclub-fe-91js.vercel.app//payment-failure",
    });

    // mongodbupdate

    let newPurchase = new purchaseModel({
      bookId,
      bookName,
      bookDesc,
      sellerMail,
      bookImage,
      price,
      discountPrice,
      buyerMail,
    });
    await newPurchase.save();
    res.status(200).json({ session: session });

    // send res
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong in the server." });
  }
};

exports.getSoldBooksByUser = async (req, res) => {
  try {
    // we get email from token
    // login-token = sellermail
    let email = req.userMail;
    // to get all sold book from the user.
    let soldBooks = await purchaseModel.find({ sellerMail: email });
    res.status(200).json(soldBooks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong in the server." });
  }
};

exports.getBuyBooksByUser = async (req, res) => {
  try {
    let email = req.userMail;

    let buyBooks = await purchaseModel.find({ buyerMail : email });
    res.status(200).json(buyBooks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong in the server." });
  }
};
