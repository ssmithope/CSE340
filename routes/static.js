const express = require("express");
const path = require("path");
const { fileURLToPath } = require("url");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = express.Router();

// Serve all static files from the public folder
router.use(express.static(path.join(__dirname, "../public")));

module.exports = router; // CommonJS export
