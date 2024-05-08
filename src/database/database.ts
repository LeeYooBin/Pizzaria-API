import mongoose, { ConnectOptions } from "mongoose";

const connection = (): void => {
  mongoose
    .connect(`${process.env.DB_STRING}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions)
    .then(() => console.log("MongoDB connected"))
    .catch((e) => console.log(`DB connection error: ${e}`));
};

export default connection;
