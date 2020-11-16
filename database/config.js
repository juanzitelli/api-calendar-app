const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("DB online ✅");
  } catch (error) {
    console.error(error)
    throw new Error("Error a la hora de inicializar la base de datos");
  }
};

module.exports = { dbConnection };
