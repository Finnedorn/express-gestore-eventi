const fs = require("fs");
const path = require("path");


class Reservation {
    static #reservations = require("../db/db-reservations.json");
    static #pathReservations = path.join(__dirname, "../db/db-reservations.json");
    static #events = require("../db/db-events.json");
    // incremento il counter basandomi sul valore massimo di id presente in array
    static Counter = Reservation.#reservations.length > 0 ? Math.max(...Reservation.#reservations.map(res=> res.id)) + 1 : 1;

    constructor(firstName, lastName, email, eventId) {
        this.id = Reservation.Counter++;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        // applico la funzione alla creazione di eventId
        this.eventId = Reservation.checkEventId(eventId);
    }
    
    
    // getter e setter
    
    // firstName
    get firstName() {
        return this._firstName;
    }

    set firstName(value) {
        if (!value || typeof value !== "string") throw new Error("il campo 'First Name' è obbligatorio e deve essere di tipo 'string'");
        this._firstName = value;
    }
    
    // lastName
    get lastName() {
        return this._lastName;
    }
    
    set lastName(value) {
        if (!value || typeof value !== "string") throw new Error("il campo 'Last Name' è obbligatorio e deve essere di tipo 'string'");
        this._lastName = value;
    }
    
    // email
    get email() {
        return this._email;
    }
    
    set email(value) {
        if (!value || !/^\S+@\S+\.\S+$/.test(value) || typeof value !== "string") throw new Error("il campo 'email' è obbligatorio e deve essere di tipo 'string', e non può contenere caratteri speciali");
        this._email = value;
    }
    
    // eventId
    get eventId() {
        return this._eventId;
    }
    
    set eventId(value) {
        this._eventId = Reservation.checkEventId(value);
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

    


    
    // ritorno tutti gli elementi di reservation per quell'eventId (index)
    static readAllReservations(Id) {
        return this.#reservations.filter(reservation => reservation.eventId === parseInt(Id));
    }
    
    // aggiungo una reservation al db (store)
    static addReservation(reservation) {
        this.#reservations.push(reservation);
        fs.writeFileSync(this.#pathReservations, JSON.stringify(this.#reservations, null, 2));
        return this.#reservations;
    }
    
    // rimuovo una reservation dal db (destroy)
    static deleteReservation(id) {
        this.#reservations = this.#reservations.filter(reservation => reservation.id !== parseInt(id));
        fs.writeFileSync(this.#pathReservations, JSON.stringify(this.#reservations, null, 2));
        return this.#reservations;
    }
}

module.exports = Reservation;