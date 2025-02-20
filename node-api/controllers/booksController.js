const db = require('../db'); // Assurez-vous que le chemin est correct

// Obtenir tous les livres
exports.getAllBooks = (req, res) => {
    db.query('SELECT * FROM books', (err, results) => {
        if (err) {
            console.error('Erreur lors de la requête:', err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        res.json(results);
    });
};

// Obtenir un livre par ID
exports.getBookById = (req, res) => {
    db.query('SELECT * FROM books WHERE id = ?', [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Livre non trouvé' });
        }
        res.json(results[0]);
    });
};

// Ajouter un nouveau livre
exports.addBook = (req, res) => {
    const { title, author, isbn, description, published_year } = req.body;
    
    console.log('Données reçues:', req.body);

    if (!title || !author) {
        return res.status(400).json({ error: 'Titre et auteur requis' });
    }

    db.query(
        'INSERT INTO books (title, author, isbn, description, published_year, user_id) VALUES (?, ?, ?, ?, ?, ?)',
        [title, author, isbn, description, published_year, 1], // Utilisateur par défaut
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Erreur serveur' });
            }
            res.status(201).json({
                id: result.insertId,
                ...req.body,
                user_id: 1
            });
        }
    );
};

// Mettre à jour un livre
exports.updateBook = (req, res) => {
    const { title, author, isbn, description, published_year } = req.body;
    
    if (!title || !author) {
        return res.status(400).json({ error: 'Titre et auteur requis' });
    }

    db.query(
        'UPDATE books SET title = ?, author = ?, isbn = ?, description = ?, published_year = ? WHERE id = ?',
        [title, author, isbn, description, published_year, req.params.id],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Erreur serveur' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Livre non trouvé' });
            }
            res.json({
                id: req.params.id,
                ...req.body,
                user_id: 1
            });
        }
    );
};

// Supprimer un livre
exports.deleteBook = (req, res) => {
    db.query(
        'DELETE FROM books WHERE id = ?',
        [req.params.id],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Erreur serveur' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Livre non trouvé' });
            }
            res.status(204).send();
        }
    );
};

// Obtenir tous les livres avec filtrage
exports.getFilteredBooks = (req, res) => {
    const { title, author, isbn } = req.query;
    let query = 'SELECT * FROM books WHERE 1=1';
    const params = [];

    if (title && title.trim() !== '') {
        query += ' AND title LIKE ?';
        params.push(`%${title.trim()}%`);
    }
    if (author && author.trim() !== '') {
        query += ' AND author LIKE ?';
        params.push(`%${author.trim()}%`);
    }
    if (isbn && isbn.trim() !== '') {
        query += ' AND isbn LIKE ?';
        params.push(`%${isbn.trim()}%`);
    }

    db.query(query, params, (err, results) => {
        if (err) {
            console.error('Erreur lors de la requête:', err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        res.json(results);
    });
}; 