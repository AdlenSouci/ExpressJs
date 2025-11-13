const mysql = require('mysql2');

// Connexion à ta base existante
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',        
  password: '',  
  database: 'kera6497_my-sneakers'
});

db.connect((err) => {
  if (err) throw err;
  console.log('✅ Connecté à MySQL !');
});

module.exports = db;
