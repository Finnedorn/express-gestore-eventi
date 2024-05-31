// importo express
const express = require("express");
const router = express.Router();

// route di index
router.get("/");
// route di store
router.post("/");
// route di update
router.put("/:event");

module.exports = router;