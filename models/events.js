const { error } = require("console");
const fs = require("fs");
const path = require("path");


class Event {
    static Counter = 1;
    id;
    title;
    description;
    date;
    maxSeats;
    static #filePath = path.join(__dirname, "../db/db-events.json");
    static #events = require("../db/db-events.json");

    constructor(title, description, date, maxSeats){
        this.id = Event.Counter++;
        this.title = title;
        this.description = description;
        this.date = date;
        this.maxSeats = maxSeats;
    }

    static readAll() {
        return this.#events;
    }

    static read(idToShow) {
        let eventToShow = this.#events.find(event => event.id === parseInt(idToShow));
        if(eventToShow){
            return eventToShow;
        }else{
            throw new Error(`id non trovato o non corretto`);
        }
        
    }

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

    static update(id, content) {
        let eventIndex = this.#events.findIndex(event => event.id === parseInt(id));
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