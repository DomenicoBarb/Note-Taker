// Var declaration/dependencies
const express = require('express');
const apiRoutes = require('./routes/apiRoutes/index.js');
const htmlRoutes = require('./routes/htmlRoutes/index.js');
const PORT = process.env.PORT || 3001;
const app = express();

// This line adds middleware to parse incoming request bodies with urlencoded payloads
app.use(express.urlencoded({ extended: true }));
// This line adds middleware to parse incoming request bodies with JSON payloads
app.use(express.json());
// This line serves static files from the 'public' directory in the root of the application
app.use(express.static('public'));

// Use apiRoutes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// This line starts the Express.js server and listens on a specified port (PORT)
app.listen(PORT, () => {
    // When the server starts, this callback function is called and logs a message to the console
    console.log(`API server now on port ${PORT}!`);
});
