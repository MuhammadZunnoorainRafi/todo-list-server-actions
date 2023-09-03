import mongoose from 'mongoose';

type Error = {
    message:string
};
export const connectDB = async () => {
  mongoose.set('strictQuery', true);
  let isConnected = false;
  if (isConnected) return console.log("already Connected")
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI!);
    console.log(`Connected:${conn.connection.host}`);
    isConnected= true
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
