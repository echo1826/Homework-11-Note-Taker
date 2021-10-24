const express = require('express');
const path = require('path');

const api = require('./routes/index');

const PORT = process.env.PORT || 3001;

const app = express();
// middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use('/api', api);
//get route for homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});
// get route for the next page when user clicks on the button that sends them to the url
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`)
});