// importo la classe Reservation 
const Reservation = require("../models/reservation");

function index(req, res){
    res.json(Reservation.readAllReservations(req.params.event));
};


function store(req, res){
    const {firstName, lastName, email, eventId} = req.body;
    const reservationToSave = new Reservation(firstName, lastName, email, eventId);
    res.json(Reservation.addReservation(reservationToSave));
};

function destroy(req, res){
    const {reservation} = req.params;
    res.json(Reservation.deleteReservation(reservation));
};


module.exports = {
    index,
    store,
    destroy
}