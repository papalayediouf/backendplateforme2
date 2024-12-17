require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const formationRoutes = require('./routes/formationRoutes');
const path = require('path');

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Pour les requêtes JSON

// Servir les fichiers téléchargés depuis le dossier 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/formations', formationRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
