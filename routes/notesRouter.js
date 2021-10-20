const notes = require('express').Router();
const {readFromFile, readAppend} = require('../helper/fsHelper');

notes.get('/', (req, res) => {
    console.log(`${req.method} received`);
    // res.status(200).json(notesData);
    readFromFile('./db/db.json').then((data) => {
        res.json(JSON.parse(data));
    });
});

notes.post('/', (req, res) => {
    console.log(`${req.method} received`);
    res.send(`${req.method} received`)
});

notes.delete('/:id', (req, res) => {
    console.log(`${req.method} received`);
    res.send(`${req.method} received`)
});

module.exports = notes;

