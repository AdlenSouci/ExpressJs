const express = require('express');
const db = require('../database');
const jwt = require('jsonwebtoken');
const requireLogin = require('../middleware/requireLogin');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

// ➤ Inscription
router.post('/', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ error: 'Champs requis' });

  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length > 0)
      return res.status(400).json({ error: 'Email déjà utilisé' });

    db.query(
      'INSERT INTO users (name, email, password, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())',
      [name, email, password],
      (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({
          id: result.insertId,
          name,
          email,
          message: 'Utilisateur ajouté avec succès',
        });
      }
    );
  });
});

// ➤ Connexion
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: 'Champs requis' });

  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0 || results[0].password !== password)
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });

    const user = results[0];
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Connexion réussie',
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  });
});

// ➤ Route protégée pour vérifier le token
router.get('/me', requireLogin, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
