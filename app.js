var express = require("express");
var path = require("path");
var app = express();
var PORT = process.env.PORT || 8080;
let fs = require("fs");
let notes = require("./db/db.json");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(`public`));
const { v4: uuidv4 } = require('uuid');



app.get("/" , function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"))
});

app.get("/notes" , function (req, res) {
    res.sendFile(path.join(__dirnam, "public/notes.html"))
})

app.get("/api/notes" , function (req, res) {
    res.json(notes);
})
app.post("/api/notes/" , function (req, res) {
    let newNote = req.body;
    newNote.id = uuidv4();
    notes.push(newNote)
    fs.writeFile(`./db/db.json`, JSON.stringify(notes) , (err, data) => { 
        console.log(newNote);
        res.sendFile(path.join(__dirname, "public/index.html"))

    })
})

app.delete("/api/notes/:id" , function (req, res) {
   let note = req.params.id;
   notes.splice(note , 1)
   fs.writeFile(`./db/db.json`, JSON.stringify(notes) , (err, data) => { 
    console.log("note deleted " + note)
    res.sendFile(path.join(__dirname, "public/index.html"))
})
})
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"))
})
app.listen(PORT, function () {
    console.log(" listening on PORT " + PORT);
})