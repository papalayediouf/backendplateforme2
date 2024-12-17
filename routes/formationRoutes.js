const express = require('express');
const router = express.Router();
const Formation = require('../models/Formation');

// Route POST pour ajouter une formation
router.post('/formations', async (req, res) => {
    const { dateCreation, nomFormation, thematiqueFormation, nbMaxUtilisations, prixFormation, dateAjout } = req.body;
    
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
  

// Autres routes pour récupérer et manipuler les formations
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
        if (!formation) return res.status(404).json({ message: 'Formation not found' });
        res.json(formation);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedFormation = await Formation.findByIdAndUpdate(
            req.params.id,
            { ...req.body, dateModified: Date.now() },
            { new: true }
        );
        res.json(updatedFormation);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Formation.findByIdAndDelete(req.params.id);
        res.json({ message: 'Formation deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
