const express = require("express");
const bodyParser = require('body-parser');
const routes = require('./routes/apiRoutes');
const mongoose = require('mongoose');
const cors = require('cors');



/**Set up express app*/
const app = express();
/**connect to mongoDB */
mongoose.connect('mongodb://localhost/carbondb');
mongoose.Promise = global.Promise;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**use api routes */
app.use('/api', routes);

/**listen for requests */

app.listen(process.env.process || 8080, () => { 
    console.log("listening to port 8080...");
})




