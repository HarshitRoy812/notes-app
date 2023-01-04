const express = require('express');
const app = express();
const routes = require('./routes/routes');
const connectDB = require('./db/connection');
require('dotenv').config();

app.use(express.json());
app.use(express.static('./public'));

app.use('/',routes);


const port = process.env.PORT || 3000;


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port,console.log(`server is listening on port ${port}`));
    } catch (err) {
        console.log(err);
    }
}

start();


