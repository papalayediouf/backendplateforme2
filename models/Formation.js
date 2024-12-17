const mongoose = require('mongoose');

const formationSchema = new mongoose.Schema({
  dateCreation: {
    type: Date,
    required: true,
  },
  nomFormation: {
    type: String,
    required: true,
  },
  thematiqueFormation: {
    type: String,
    required: true,
  },
  nbMaxUtilisations: {
    type: Number,
    required: true,
  },
  prixFormation: {
    type: Number,
    required: true,
  },
  dateAjout: {
    type: Date,
    required: true,
  },
});

const Formation = mongoose.model('Formation', formationSchema);
module.exports = Formation;
