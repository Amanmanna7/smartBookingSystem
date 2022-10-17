const mongooose = require("mongoose");

mongooose.connect(
  //   "mongodb://localhost/test",
  "mongodb+srv://amanmanna7:amanmanna7@cluster0.5khjb7y.mongodb.net/test",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to mongodb");
    }
  }
);

module.exports = mongooose;
