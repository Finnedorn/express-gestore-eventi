// importo express
const express = require('express');
const app = express();
const port = 8080;
// setto i middleware
app.use(express.json());
const errorFormatter = require('./middlewares/errorFormatter');
const morgan = require('morgan');
// importo le routes
const eventRouter = require("./routers/eventRouter");

app.use(morgan('dev'));

app.get('/', (req, res)=>{
    res.redirect("/events");
});

app.use("/events", eventRouter);

app.use(errorFormatter);

app.listen(port, () => {
    console.log(`Sto runnando il server su http://localhost:${port}`);
});


