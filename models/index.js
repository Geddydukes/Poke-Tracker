require("dotenv").config();

const mongoose = require("mongoose");
const connectionString =
  process.env.MONGODB_URI;
const configOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

mongoose
  .connect(connectionString, configOptions)
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.log(`Mongo error: ${err}`));

module.exports = {
  Pokemon: require("./Pokemon"),
  Trainer: require("./Trainer"),
  User: require("./User"),
};
