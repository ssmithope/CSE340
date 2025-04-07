const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");

router.post("/add", wishlistController.addToWishlist);
router.get("/:user_id", wishlistController.getWishlist);

module.exports = router;
