const express = require("express");
const router = express.Router();
const ThoughtController = require("../controllers/ThoughtsController");

router.get("/", ThoughtController.showThoughts);

module.exports = router;
