const fs = require("fs");
const path = require("path");
const fs = require("fs");


class Event {
    id;
    title;
    description;
    date;
    maxSeats;
    static #filePath = path.join(__dirname, "../db/db-events.json");
    static #events = require("../db/db-events.json");

    constructor(id, title, description, date, maxSeats){
        this.id = id.toString();
        this.title = title.toString();
        this.description = description.toString();
        this.date = date.toString();
        this.maxSeats = parseInt(maxSeats);
    }

    static index() {
        return this.#events;
    }

    static store(newContent) {
        fs.writeFileSync( this.#filePath, JSON.stringify([...this.#events, newContent], null, 2));
        return this.#events;
    }

    static put(content) {
        const contentToUpdate = this.#events.find(event => event.id === content.id);
        contentToUpdate = {
            id: content.id,
            title: content.title,
            description: content.description,
            date: content.date,
            maxSeats: content.maxSeats,
        };
        fs.writeFileSync( this.#filePath, JSON.stringify(this.#events, null, 2));
        return this.#events;
    }

}