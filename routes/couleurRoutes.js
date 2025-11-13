const express = require('express');
const db = require('../database');
const requireLogin = require('../middleware/requireLogin');
const router = express.Router();

// Récupérer toutes les couleurs
router.get('/', requireLogin, (req, res) => {
    db.query('SELECT * FROM couleurs', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Ajouter une couleur
router.post('/', requireLogin, (req, res) => {
    const { nom_couleur } = req.body;
    if (!nom_couleur) return res.status(400).json({ error: 'Nom obligatoire' });

    db.query('INSERT INTO couleurs (nom_couleur) VALUES (?)', [nom_couleur], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: result.insertId, nom_couleur });
    });
});

// Modifier une couleur
router.put('/:id', requireLogin, (req, res) => {
    const { id } = req.params;
    const { nom_couleur } = req.body;
    if (!nom_couleur) return res.status(400).json({ error: 'Nom obligatoire' });

    db.query('UPDATE couleurs SET nom_couleur = ? WHERE id = ?', [nom_couleur, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Couleur modifiée' });
    });
});

// Supprimer une couleur
router.delete('/:id', requireLogin, (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM couleurs WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Couleur supprimée' });
    });
});

module.exports = router;
