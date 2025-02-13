import { mongoose } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const db = async () => {
  try {
    const mongodbUrl = process.env.MONGODB_URL;
    await mongoose.connect(mongodbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const { connection } = mongoose;
    connection.once('open', () => {
      console.log('MongoDB Connection Success!');
    });
  } catch (err) {
    console.log('Database connection error:', err);
  }
};

export default db;