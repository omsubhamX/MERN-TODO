const mongoose = require("mongoose");

const conn = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://sahuomsubham:N8fGbJCNAm8Dj5qM@cluster0.cjkz7dj.mongodb.net/test?retryWrites=true&w=majority",
      // { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  }
};

conn();
