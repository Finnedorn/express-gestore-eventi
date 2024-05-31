// funzione middleware per controllare che i dati inviati dall'utente siano validi
const postEventValidator = (req, res, next) => {

    const { title, description, date, maxSeats } = req.body;

    if (!title) {
        return res.status(404).json({ error: "Il campo 'title' è richiesto!" });
    } else if (typeof title !== 'string') {
        return res.status(400).json({ error: "Il campo 'title' deve essere una stringa." });
    }

    if (!description) {
        return res.status(404).json({ error: "Il campo 'description' è richiesto!" });
    } else if (typeof description !== 'string') {
        return res.status(400).json({ error: "Il campo 'description' deve essere una stringa." });
    }

    if (!date) {
        return res.status(404).json({ error: "Il campo 'date' è richiesto!" });
    } else if (typeof date !== 'string') {
        return res.status(400).json({ error: "Il campo 'date' deve essere una stringa." });
    }

    if (!maxSeats) {
        return res.status(404).json({ error: "Il campo 'maxSeats' è richiesto!" });
    } else if (typeof maxSeats !== "number") {
        return res.status(400).json({ error: "Il campo 'maxSeats' deve essere una stringa." });
    }
    

    next();
};

module.exports = postEventValidator;