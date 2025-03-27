import express from "express";
const router = express.Router();

// Route for the homepage
router.get("/", (req, res) => {
    res.render("home", { title: "CSE Motors - Welcome" });
});

export default router;
