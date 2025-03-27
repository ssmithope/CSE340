import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = express.Router();

router.use(express.static(path.join(__dirname, "../public")));
router.use("/css", express.static(path.join(__dirname, "../public/css")));
router.use("/js", express.static(path.join(__dirname, "../public/js")));
router.use("/images", express.static(path.join(__dirname, "../public/images")));

export default router;
