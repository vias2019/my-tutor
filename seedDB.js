const mongoose = require("mongoose");
const db = require("../models");

// This file empties the maindatabase collection and inserts the users below

mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost/reactreadinglist"
  );
  
  const maindatabaseSeed = [
    {

    }
  
    ];
    
    db.createSchema
  .remove({})
  .then(() => db.createSchema.collection.insertMany(maindatabaseSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

