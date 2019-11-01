const path = require("path");
const router = require("express").Router();
const apiRoutes = require('./api');

// Register API Routes
// All API route paths will begin with "/api"

router.use("/api", apiRoutes);

module.exports = router;