const notes = require('express').Router();
const {readFromFile, readAppend, writeToFile} = require('../helper/fsHelper');
const ShortUniqueId = require('short-unique-id');
// get route to display the data in the db.json
notes.get('/', (req, res) => {
    console.log(`${req.method} received`);
    // res.status(200).json(notesData);
    readFromFile('./db/db.json').then((data) => {
        res.json(JSON.parse(data));
    });
});
// post route to add data to db.json
notes.post('/', (req, res) => {
    console.log(`${req.method} received`);
    // destructures the body given from the fetch
    const {title, text} = req.body;
    if(title && text) {
        const uid = new ShortUniqueId({length:4});
        // creates the object that's going to be stored in db.json
        const newNote = {title, text, id: uid()};
        console.log(newNote);
        readAppend(newNote, './db/db.json');

        const response = {
            status: "success",
            body: newNote
        };
        // gives the response object made above back
        res.json(response);
    }else {
        res.json("Error in posting note");
    }
});
// delete route deletes data from db.json
notes.delete('/:id', (req, res) => {
    // TODO: readFile, filter array (note.id !== :id), return new array
    if(req.params.id) {
        console.log(`${req.method} received`);
        const noteId = req.params.id;
        const filteredDbArr = [];
        readFromFile('./db/db.json').then((data) => {
            dbArr = JSON.parse(data);
            // takes filtered array takes in rest of the elements that doesn't match the id given in the parameter
            filteredDbArr.push(...dbArr.filter((obj) => obj.id != noteId));
            writeToFile('./db/db.json', filteredDbArr);
            // gives the updated array stored back into db.json
            res.json(filteredDbArr);
        })
    }else {
        res.json("Error in deleting note");
    }
});

module.exports = notes;

