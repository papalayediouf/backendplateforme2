const mongoose = require('mongoose');

const FormationSchema = new mongoose.Schema({
  dateCreation: { type: Date, required: true },
  nomFormation: { type: String, required: true },
  thematiqueFormation: { type: String, required: true },
  nbMaxUtilisations: { type: Number, required: true },
  prixFormation: { type: Number, required: true },
  dateAjout: { type: Date, required: true },
  dateModified: { type: Date, default: null },
  image: { type: String, required: false },  // Nouveau champ pour l'image (chemin ou URL)
});

module.exports = mongoose.model('Formation', FormationSchema);
