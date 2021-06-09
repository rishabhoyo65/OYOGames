const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');



const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, '../build')));

mongoose
    .connect(
        "mongodb+srv://rishabhju65:manna1998@cluster0.mmhcn.mongodb.net/oyogame?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then(() => console.log('DB Connected Successfully'))
    .catch(err => console.log(err));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});


app.all('*', function (req, res, next) {
    if (req.url.startsWith('/api/')) return next();
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
})



app.use((error, req, res, next) => {
    console.log("\n###### Error ######## \n\n", error.stack);
    const status = error.statusCode || 500;
    const message = (error.message && error.message)
        || (error.hasOwnProperty('statusText') && error.statusText)
        || (error.hasOwnProperty('response') && error.response.hasOwnProperty('statusText') && error.response.statusText)
    const data = error.response && error.response.error;
    const customMessage = error.customMessage && error.customMessage
    res.status(status).json({ message: message, data: data, customMessage: customMessage });
})
app.listen(5000);