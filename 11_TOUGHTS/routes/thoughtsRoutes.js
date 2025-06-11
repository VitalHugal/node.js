const express = require("express");
const router = express.Router();
const ThoughtController = require("../controllers/ThoughtsController");

//hellpers
const checkAuth = require('../helpers/auth').checkAuth

router.get("/add", checkAuth, ThoughtController.createThoughts);
router.post("/add", checkAuth, ThoughtController.createThoughtsSave);
router.get("/edit/:id", checkAuth, ThoughtController.updateThoughts);
router.post("/edit", checkAuth, ThoughtController.updateThoughtsSave);
router.get("/dashboard", checkAuth, ThoughtController.dashboard);
router.get("/", ThoughtController.showThoughts);
router.post("/remove", checkAuth, ThoughtController.removeThoughts);

module.exports = router;
