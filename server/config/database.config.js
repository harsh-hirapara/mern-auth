import mongoose from "mongoose";

async function connectDatabase() {
  try {
    const dbConnection = await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully");
  } catch (err) {
    console.log("Error while connecting database :", err.message);
  }
}

export default connectDatabase;
