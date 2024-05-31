const fs = require("fs");
const path = require("path");


class Event {
    static #filePath = path.join(__dirname, "../db/db-events.json");
    static #events = require("../db/db-events.json");
    // controllo se l'array di events ha almeno un elemento
    // se si, counter (e quindi l'id) assume il valore di 1
    // altrimenti ricerco il valore massimo massimo di id contenuto nell'array e lo incremento di 1 
    // così che l'id generato abbia sempre un valore maggiore dei precedenti 
    static Counter = Event.#events.length > 0 ? Math.max(...Event.#events.map(event=> event.id)) + 1 : 1;

    constructor(title, description, date, maxSeats){
        this.id = Event.Counter++;
        this.title = title;
        this.description = description;
        this.date = date;
        this.maxSeats = maxSeats;
    }

    // getter e setter

    // title
    get title() {
        return this._title;
    }

    set title(value) {
        if (!value || typeof value !== "string") throw new Error("il campo 'title' è obbligatorio e deve essere di tipo 'string'");
        this._title = value;
    }

    // description
    get description() {
        return this._description;
    }

    set description(value) {
        if (!value || typeof value !== "string") throw new Error("il campo 'description' è obbligatorio e deve essere di tipo 'string'");
        this._description = value;
    }

    // date
    get date() {
        return this._date;
    }

    set date(value) {
        if (!value || typeof value !== "string") throw new Error("il campo 'date' è obbligatorio e deve essere di tipo 'string'");
        this._date = value;
    }

    // maxSeats
    get maxSeats() {
        return this._maxSeats;
    }

    set maxSeats(value) {
        if (!value || typeof value !== "number") throw new Error("il campo 'maxSeats' è obbligatorio e deve essere di tipo numerico");
        this._maxSeats = value;
    }



    // funzione per leggere tutti gli eventi nell'array (index)
    static readAll() {
        return this.#events;
    }
    // funzione per ricercare e stampare l'elemento in array con id selezionato (show)
    static read(idToShow) {
        // uso parseInt in quanto req.params.id mi restituisce una stringa e non un valore numerico 
        let eventToShow = this.#events.find(event => event.id === parseInt(idToShow));
        if(eventToShow){
            return eventToShow;
        }else{
            throw new Error(`id non trovato o non corretto`);
        }
        
    }
    // funzione per aggiungere un elemento in array (store)
    static save(event) {
        const newContent = {
            id: event.id,
            title: event.title,
            description: event.description,
            date: event.date,
            maxSeats: event.maxSeats
        };
        this.#events.push(newContent);
        fs.writeFileSync(this.#filePath, JSON.stringify(this.#events, null, 2));
        return this.#events;
    }
    // funzione per sostituire un elemento in array con uno differente (put)
    static update(id, content) {
        // trova l'elemento con id uguale a quello specificato
        let eventIndex = this.#events.findIndex(event => event.id === parseInt(id));
        // sostituisco i valori dell'elemento in array con quelli della req.body
        if (eventIndex) {
            this.#events[eventIndex].title = content.title;
            this.#events[eventIndex].description = content.description;
            this.#events[eventIndex].date = content.date;
            this.#events[eventIndex].maxSeats = content.maxSeats;
            fs.writeFileSync(this.#filePath, JSON.stringify(this.#events, null, 2));
            return this.#events[eventIndex];
        } else {
            throw new Error(`id non trovato o non corretto`);
        }
    }

}

module.exports = Event;



