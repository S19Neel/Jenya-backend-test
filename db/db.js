const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

function dbConnect() {
     const dbUri = process.env.MONGODB_URI;

    mongoose.connect(dbUri).then(() => {
        console.log('Connected to MongoDB');
    }).catch((err) => console.log(err));
}

module.exports = dbConnect;