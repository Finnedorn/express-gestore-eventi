// importo la classe Event 
const Event = require("../models/events");


function index(req, res){
    res.json(Event.readAll());
};

function store(req, res){
    const {title, description, date, maxSeats} = req.body;
    const eventToSave = new Event (title, description, date, maxSeats);
    res.json(Event.save(eventToSave));
};

function show(req, res){
    res.json(Event.read(req.params.id));
}

function put(req, res){
    res.json(Event.update(req.params.event, req.body));
}


module.exports = {
    index,
    store,
    show,
    put
}