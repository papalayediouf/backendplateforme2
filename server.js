require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const formationRoutes = require('./routes/formationRoutes'); 

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); 
// Routes
app.use(formationRoutes);  

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Serveur demarre sur le port ${PORT}`);
});
