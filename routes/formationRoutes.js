const express = require('express');
const router = express.Router();
const Formation = require('../models/Formation.js');

// Ajouter une formation
router.post('/', async (req, res) => {
    const { dateCreation, nomFormation, thematiqueFormation, nbMaxUtilisations, prixFormation, dateAjout } = req.body;

    if (!dateCreation || !nomFormation || !thematiqueFormation || !nbMaxUtilisations || !prixFormation || !dateAjout) {
        return res.status(400).json({ message: 'Tous les champs sont obligatoires' });
    }

    try {
        const newFormation = new Formation({
            dateCreation,
            nomFormation,
            thematiqueFormation,
            nbMaxUtilisations,
            prixFormation,
            dateAjout,
        });
        await newFormation.save();
        res.status(201).json(newFormation);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const formations = await Formation.find();
        res.json(formations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const formation = await Formation.findById(req.params.id);
        if (!formation) return res.status(404).json({ message: 'Formation non trouvée' });
        res.json(formation);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Modifier une formation
router.put('/:id', async (req, res) => {
    try {
        const { nomFormation, thematiqueFormation, nbMaxUtilisations, prixFormation } = req.body;

        const updatedFormation = await Formation.findByIdAndUpdate(
            req.params.id,
            { 
                nomFormation,
                thematiqueFormation,
                nbMaxUtilisations,
                prixFormation,
                dateModified: new Date() // Mise à jour automatique de la date
            },
            { new: true } // Retourne la formation mise à jour
        );

        if (!updatedFormation) {
            return res.status(404).json({ message: 'Formation non trouvée' });
        }

        res.status(200).json(updatedFormation);
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour', error: err.message });
    }
});



// Supprimer une formation
router.delete('/:id', async (req, res) => {
    try {
        await Formation.findByIdAndDelete(req.params.id);
        res.json({ message: 'Formation supprimée' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
