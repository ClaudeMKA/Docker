// Fonction pour charger les utilisateurs
async function loadUsers() {
    try {
        const response = await fetch('/api/users');
        const users = await response.json();
        const usersList = document.getElementById('usersList');
        usersList.innerHTML = '';
        
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${new Date(user.created_at).toLocaleString()}</td>
            `;
            usersList.appendChild(row);
        });
    } catch (error) {
        console.error('Erreur lors du chargement des utilisateurs:', error);
        alert('Erreur lors du chargement des utilisateurs');
    }
}

// Gérer la soumission du formulaire
document.getElementById('userForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const userData = {
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    try {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la création de l\'utilisateur');
        }

        // Réinitialiser le formulaire
        document.getElementById('userForm').reset();
        
        // Recharger la liste des utilisateurs
        loadUsers();
        
        alert('Utilisateur créé avec succès!');
    } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de la création de l\'utilisateur');
    }
});

// Charger les utilisateurs au chargement de la page
document.addEventListener('DOMContentLoaded', loadUsers);
