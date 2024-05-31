const fs = require("fs");
const path = require("path");


class Reservation {
    static #reservations = require("../db/db-reservations.json");
    static #pathReservations = path.join(__dirname, "../db/db-reservations.json");
    static #events = require("../db/db-events.json");
    static Counter = Reservation.#reservations.length > 0 ? Math.max(...Reservation.#reservations.map(res=> res.id)) + 1 : 1;

    constructor(firstName, lastName, email, eventId) {
        this.id = Reservation.Counter++;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.eventId = Reservation.checkEventId(eventId);
    }

    // controllo che l'eventId creato corrisponda ad un id esistente in db-events.json
    static checkEventId(eventId) {
       const eventIdToCheck = this.#events.find(event => event.id === parseInt(eventId));
       if(eventIdToCheck) {
            return eventIdToCheck.id;
       }else {
            throw new Error(`eventId non in db o non corretto`);
       }
    }


    // ritorno tutti gli elementi di reservation per quell'eventId
    static readAllReservations(Id) {
        return this.#reservations.filter(reservation => reservation.eventId === parseInt(Id));
    }

    // aggiungo una reservation al db
    static addReservation(reservation) {
        this.#reservations.push(reservation);
        fs.writeFileSync(this.#pathReservations, JSON.stringify(this.#reservations, null, 2));
        return this.#reservations;
    }

    // rimuovo una reservation dal db
    static deleteReservation(id) {
        this.#reservations = this.#reservations.filter(reservation => reservation.id !== parseInt(id));
        fs.writeFileSync(this.#pathReservations, JSON.stringify(this.#reservations, null, 2));
        return this.#reservations;
    }
}

module.exports = Reservation;