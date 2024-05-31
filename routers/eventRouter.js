// importo express
const express = require("express");
const router = express.Router();
// importo il middleware di controllo dati
const postEventValidator = require("../middlewares/postEventValidator");
const postReservationValidator = require("../middlewares/postReservationValidator");
// importo i controller
const eventController = require("../controllers/eventController");
const reservationController = require("../controllers/reservationController");


// route di index
router.get("/", eventController.index);
// route di store
router.post("/", postEventValidator, eventController.store);
// la route dello show di ciascun post
router.get("/:event", eventController.show);
// route di update
router.put("/:event", postEventValidator, eventController.put);


// route di index delle reservation
// route di store di una reservation
router.post ("/:event/reservations", reservationController.store);
router.get ("/:event/reservations", postReservationValidator, reservationController.index);
// route di destroy di una reservation
router.delete ("/:event/reservations/:reservation", reservationController.destroy);


module.exports = router;