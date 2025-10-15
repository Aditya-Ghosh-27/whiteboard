const mongoose = require('mongoose');

const url = process.env.MONGO_URL;

// const connectionParams = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// };

const connectToDatabase = async () => {
    try {
        await mongoose.connect(url);
        console.log('Connected to Database');
    } catch(err) {
        console.error(`Error connecting to database: ${err}`);
    }
};


module.exports = connectToDatabase;