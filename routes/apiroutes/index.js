// Require the necessary modules
const router = require('express').Router(); // The Router module from the Express.js framework
const fs = require('fs'); // The built-in File System module in Node.js
const { post } = require('../htmlRoutes'); // Import the post function from htmlRoutes.js
let uniqueID = 1 // Initialize a variable to track the unique ID of each note

// Define two helper functions for reading and writing notes from/to the db.json file
function getNotes(){
    const notes = fs.readFileSync("db/db.json", "utf8"); // Read the contents of db.json file and return a string
    return JSON.parse(notes); // Convert the string to a JavaScript object and return it
}

function saveNotes(notes){
    console.log(`NOTE SAVED`); // Log a message to the console when a note is saved
    fs.writeFileSync("db/db.json", JSON.stringify(notes), "utf8"); // Write the notes to db.json file in string format
}

// Define three routes using the Router module
router.get("/notes", (req, res) => { // Handle GET requests to /notes route
    const notes = getNotes(); // Get all the notes from the db.json file
    res.json(notes); // Send the notes as a JSON response
});

router.delete("/notes/:id", (req, res) => { // Handle DELETE requests to /notes/:id route
    const notes = getNotes(); // Get all the notes from the db.json file
    const unpdatedNotes = notes.filter(note => note.id !== req.params.id); // Filter out the note with the requested ID
    saveNotes(unpdatedNotes); // Save the updated notes array to db.json file
    res.status.json({ // Send a JSON response with status 200 OK
        ok : true
    });
});

router.post("/notes",(req,res) => { // Handle POST requests to /notes route
    const note = req.body; // Get the new note data from the request body
    const {title,text} = note; // Extract the title and text properties from the new note object
    const newNote = {title,text,id:(uniqueID++).toString()}; // Create a new note object with a unique ID
    const notes = getNotes(); // Get all the notes from the db.json file
    notes.push(newNote); // Add the new note to the notes array
    saveNotes(notes); // Save the updated notes array to db.json file
    res.json(newNote); // Send the newly created note object as a JSON response
})

// Export the router object to be used by other modules
module.exports = router;
