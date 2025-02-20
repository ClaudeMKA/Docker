const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const booksController = require('./controllers/booksController'); // Importer le contrôleur

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
    host: 'db',
    user: 'user',
    password: 'password',
    database: 'db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

db.getConnection((err, connection) => {
    if (err) {
        console.error('Erreur de connexion à la base de données:', err);
        return;
    }
    console.log('Connecté à la base de données MySQL');
    connection.release();
});

// Créer la table users si elle n'existe pas
db.query(`
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`, (err) => {
    if (err) {
        console.error('Erreur lors de la création de la table:', err);
        return;
    }
    console.log('Table users prête');
});

// Créer la table books si elle n'existe pas
db.query(`
    CREATE TABLE IF NOT EXISTS books (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        isbn VARCHAR(255),
        description TEXT,
        published_year INT,
        user_id INT
    )
`, (err) => {
    if (err) {
        console.error('Erreur lors de la création de la table:', err);
        return;
    }
    console.log('Table books prête');
});

// Middleware pour logger les requêtes
app.use((req, res, next) => {
    console.log('Requête reçue:', req.method, req.path);
    next();
});

// Route de test
app.get('/api', (req, res) => {
    res.json({ message: 'API is working' });
});

// Route pour obtenir tous les utilisateurs
app.get('/api/users', (req, res) => {
    console.log('Requête reçue sur /api/users');
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            console.error('Erreur lors de la requête:', err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        console.log('Résultats trouvés:', results);
        res.json(results);
    });
});

// Route pour créer un nouvel utilisateur
app.post('/api/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Tous les champs sont requis' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        db.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashedPassword],
            (err, result) => {
                if (err) {
                    if (err.code === 'ER_DUP_ENTRY') {
                        return res.status(400).json({ error: 'Nom d\'utilisateur ou email déjà utilisé' });
                    }
                    return res.status(500).json({ error: 'Erreur serveur' });
                }
                res.status(201).json({ message: 'Utilisateur créé avec succès' });
            }
        );
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Route de connexion
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email et mot de passe requis' });
    }

    db.query(
        'SELECT * FROM users WHERE email = ?',
        [email],
        async (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Erreur serveur' });
            }
            if (results.length === 0) {
                return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
            }

            const user = results[0];
            const validPassword = await bcrypt.compare(password, user.password);

            if (!validPassword) {
                return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
            }

            const token = jwt.sign(
                { id: user.id, username: user.username },
                JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.json({
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email
                }
            });
        }
    );
});

// Routes pour les livres
app.get('/api/books', booksController.getAllBooks);
app.get('/api/books/:id', booksController.getBookById);
app.post('/api/books', booksController.addBook);
app.put('/api/books/:id', booksController.updateBook);
app.delete('/api/books/:id', booksController.deleteBook);

// Route pour obtenir les livres filtrés
app.get('/api/books/filter', booksController.getFilteredBooks);

// Route par défaut pour les 404
app.use((req, res) => {
    console.log('Route non trouvée:', req.method, req.path);
    res.status(404).json({ error: 'Route non trouvée' });
});

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});