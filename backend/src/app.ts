import express from 'express';
import mongoose from 'mongoose';
import cors from "cors";
import userRoutes from './routes/userRoutes';
import voteRoutes from './routes/voteRoutes';
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb://localhost:27017/diakona');

// Use the Excel routes
app.use('/api/users', userRoutes);
app.use('/api/vote', voteRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});