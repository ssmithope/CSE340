const wishlistModel = require("../models/wishlist-model");
const utilities = require("../utilities");

const wishlistController = {};

// Add a vehicle to the wishlist
wishlistController.addToWishlist = async function (req, res, next) {
  try {
    const { user_id, inv_id } = req.body; // Assuming user ID is included in the request body
    if (!user_id || !inv_id) {
      throw new Error("User ID and Vehicle ID are required.");
    }

    const wishlistItem = await wishlistModel.addToWishlist(user_id, inv_id);
    req.flash("info", "Vehicle added to your wishlist!");
    res.redirect(`/wishlist/${user_id}`);
  } catch (error) {
    next(error);
  }
};

// Fetch user's wishlist
wishlistController.getWishlist = async function (req, res, next) {
  try {
    const user_id = req.params.user_id;
    const wishlist = await wishlistModel.getWishlistByUserId(user_id);

    let nav = await utilities.getNav();
    res.render("wishlist", {
      title: "Your Wishlist",
      nav,
      wishlist,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = wishlistController;
