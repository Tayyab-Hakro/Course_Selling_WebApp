import express from "express"
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from "./routes/UserRoute.js";
import cors from 'cors'
dotenv.config();
const app = express();

app.use(express.json()); // Middleware to parse JSON
app.use(cors())
// Connect DB
mongoose.connect(process.env.MONGO_URI, {
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Routes
app.use('/api/auth', router);


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
