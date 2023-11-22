const mongoose = require("mongoose");

const connection = () => {
  mongoose.connect(`${process.env.DB_STRING}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log("MongoDB connected"))
    .catch(e => console.log(`DB connection error: ${e}`));
}

module.exports = connection;