const postReservationValidator = (req, res, next) => {

    const { firstName, lastName, email } = req.body;

    if (!firstName) {
        return res.status(404).json({ error: "Il campo 'First Name' è richiesto!" });
    } else if (typeof firstName !== 'string') {
        return res.status(400).json({ error: "Il campo 'First Name' deve essere una stringa." });
    }

    if (!lastName) {
        return res.status(404).json({ error: "Il campo 'Last Name' è richiesto!" });
    } else if (typeof lastName !== 'string') {
        return res.status(400).json({ error: "Il campo 'Last name' deve essere una stringa." });
    }

    if (!email) {
        return res.status(404).json({ error: "Il campo 'email' è richiesto!" });
    } else if (typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(value)) {
        return res.status(400).json({ error: "Il campo 'email' deve essere una stringa priva di caratteri speciali." });
    }    
    

    next();
};

module.exports = postReservationValidator;