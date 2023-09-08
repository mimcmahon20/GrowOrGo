const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const workoutRoutes = require('./routes/workoutRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

connectDB();  // Calling the function to connect to the database

app.use('/api/users', userRoutes);
app.use('/api/workouts', workoutRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
