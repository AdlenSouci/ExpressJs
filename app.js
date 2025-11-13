require('dotenv').config();
const express = require('express');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const couleurRoutes = require('./routes/couleurRoutes'); // ✅ import du fichier des routes couleurs

const app = express();

// Middleware

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// Dossier statique (pour tes fichiers HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'views')));

// Routes API
app.use('/api/users', userRoutes);
app.use('/api/couleurs', couleurRoutes); // ✅ ici on monte les routes des couleurs

// Routes pour servir les pages HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/register.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

app.get('/couleurs.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'couleurs.html'));
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Lien : http://${ip.address()}:${PORT}`);
  console.log(`🚀 Serveur lancé sur le port ${PORT}`);


});