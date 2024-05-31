// importo express
const express = require("express");
const router = express.Router();
// importo il middleware di controllo dati
const postDataValidator = require("../middlewares/postDataValidator");
// importo il controller
const eventController = require("../controllers/eventController");


// route di index
router.get("/", eventController.index);
// route di store
router.post("/", postDataValidator, eventController.store);

// la route dello show di ciascun post
router.get("/:id", eventController.show);

// route di update
router.put("/:event", postDataValidator, eventController.put);

module.exports = router;