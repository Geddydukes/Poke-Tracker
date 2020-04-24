const mongoose = require("mongoose");
const connectionString = "mongodb://localhost:27017/poke-tracker";
const configOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  UseFindAndModify: false,
};

mongoose
  .connect(connectionString, configOptions)
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.log(`Mongo error: ${err}`));
