// Import the Express library and create a router object
const router = require('express').Router();
// Import the noteRoutes module
const noteRoutes = require('../apiRoutes/routes');

// Use the noteRoutes module for all routes on this router
router.use(noteRoutes);

// Export the router object for use in other modules
module.exports = router;
