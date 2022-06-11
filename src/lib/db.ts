import mongoose from "mongoose";
import "dotenv/config";

// if (!process.env.MONGO_URL) {
//   console.log(process.env.MONGO_URL);
//   throw new Error("Please add the MONGO_URL environment variable");
// }

mongoose.connect(
  `mongodb://${process.env.DB_UN}:${process.env.DB_PASS}@containers-us-west-51.railway.app:6839`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const database = mongoose.connection;

database.on(
  "error",
  console.error.bind(console, "❌ mongodb connection error")
);
database.once("open", () => console.log("✅ mongodb connected successfully"));

mongoose.Promise = Promise;
