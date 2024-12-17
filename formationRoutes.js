const express = require('express');
const router = express.Router();
const Formation = require('../models/Formation');

// Ajouter une formation
router.post('/', async (req, res) => {
    const { title, description, category } = req.body;
    try {
        const newFormation = new Formation({ title, description, category });
        await newFormation.save();
        res.status(201).json(newFormation);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Récupérer toutes les formations
router.get('/', async (req, res) => {
    try {
        const formations = await Formation.find();
        res.json(formations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Récupérer une formation par ID
router.get('/:id', async (req, res) => {
    try {
        const formation = await Formation.findById(req.params.id);
        if (!formation) return res.status(404).json({ message: 'Formation not found' });
        res.json(formation);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Modifier une formation
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

// Supprimer une formation
router.delete('/:id', async (req, res) => {
    try {
        await Formation.findByIdAndDelete(req.params.id);
        res.json({ message: 'Formation deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
