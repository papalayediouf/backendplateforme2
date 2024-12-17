require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const formationRoutes = require('./routes/formationRoutes'); 
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

// Connexion à la base de données
connectDB();

const app = express();

// Charger le fichier YAML Swagger
const swaggerDocument = YAML.load('./docs/swagger.yaml');

// Middleware
app.use(cors());
app.use(express.json());

// Ajouter la route Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use(formationRoutes);  

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
