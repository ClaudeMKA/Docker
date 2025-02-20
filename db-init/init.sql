-- Table des utilisateurs
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL UNIQUE,
  `email` varchar(255) NOT NULL UNIQUE,
  `password` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table des livres
CREATE TABLE IF NOT EXISTS `books` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `isbn` varchar(13),
  `description` text,
  `published_year` int(4),
  `image_url` varchar(255),
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int(11),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Utilisateur de test
INSERT INTO users (username, email, password) VALUES
('admin', 'admin@example.com', '$2b$10$ZYPfPBnB/k8K8qzJ5WBxB.h1uuJ8PtX3VRbR/H1.7tzMhNyVYD4Oe'); -- mot de passe: admin123

-- Livres de test avec des liens réels
INSERT INTO books (title, author, isbn, description, published_year, image_url, user_id) VALUES
('Le Petit Prince', 'Antoine de Saint-Exupéry', '9780156012195', 'Un conte philosophique pour enfants et adultes', 1943, 'https://upload.wikimedia.org/wikipedia/commons/5/5e/LPP_cover_-_first_ed_1943.jpg', 1),
('1984', 'George Orwell', '9780451524935', 'Une dystopie sur la surveillance de masse', 1949, 'https://m.media-amazon.com/images/I/41HXI6gm5eL.jpg', 1),
('Notre-Dame de Paris', 'Victor Hugo', '9780140443530', 'Un roman historique sur Paris au XVe siècle', 1831, 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Notre-Dame_de_Paris_1st_ed_1831.jpg', 1),
('Moby Dick', 'Herman Melville', '9781503280786', 'L\'histoire de la chasse à la baleine', 1851, 'https://m.media-amazon.com/images/I/81HtRshEjML.jpg', 1),
('Guerre et Paix', 'Léon Tolstoï', '9780199232765', 'Un roman épique sur la société russe', 1869, 'https://upload.wikimedia.org/wikipedia/commons/7/7c/War_and_Peace_First_Edition.jpg', 1),
('Pride and Prejudice', 'Jane Austen', '9780141439518', 'A classic novel about manners and marriage', 1813, 'https://m.media-amazon.com/images/I/51YFxiX-qtL.jpg', 1),
('To Kill a Mockingbird', 'Harper Lee', '9780061120084', 'A novel about racial injustice in the Deep South', 1960, 'https://upload.wikimedia.org/wikipedia/en/7/79/To_Kill_a_Mockingbird.JPG', 1),
('The Great Gatsby', 'F. Scott Fitzgerald', '9780743273565', 'A story of the Jazz Age in the United States', 1925, 'https://upload.wikimedia.org/wikipedia/commons/f/f7/TheGreatGatsby_1925jacket.jpeg', 1),
('Crime and Punishment', 'Fyodor Dostoevsky', '9780140449136', 'A psychological novel about crime and guilt', 1866, 'https://upload.wikimedia.org/wikipedia/commons/d/dc/Crimeandpunishmentcover.png', 1),
('The Catcher in the Rye', 'J.D. Salinger', '9780316769488', 'A novel about teenage rebellion and angst', 1951, 'https://upload.wikimedia.org/wikipedia/en/3/32/Rye_catcher.jpg', 1),
('Brave New World', 'Aldous Huxley', '9780060850524', 'A dystopian novel about a future society', 1932, 'https://upload.wikimedia.org/wikipedia/en/6/62/BraveNewWorld_FirstEdition.jpg', 1),
('The Hobbit', 'J.R.R. Tolkien', '9780547928227', 'A fantasy novel about the journey of Bilbo Baggins', 1937, 'https://upload.wikimedia.org/wikipedia/en/4/4a/TheHobbit_FirstEdition.jpg', 1),
('Fahrenheit 451', 'Ray Bradbury', '9781451673319', 'A dystopian novel about a future American society', 1953, 'https://upload.wikimedia.org/wikipedia/en/d/db/Fahrenheit_451_1st_ed_cover.jpg', 1),
('Jane Eyre', 'Charlotte Brontë', '9780141441146', 'A novel about the experiences of the titular character', 1847, 'https://upload.wikimedia.org/wikipedia/commons/9/98/Jane_Eyre_title_page.jpg', 1),
('Wuthering Heights', 'Emily Brontë', '9780141439556', 'A novel about the intense and destructive love between Catherine and Heathcliff', 1847, 'https://upload.wikimedia.org/wikipedia/commons/0/06/Wuthering_Heights_first_edition.jpg', 1),
('The Odyssey', 'Homer', '9780140268867', 'An epic poem about the journey of Odysseus', -800, 'https://upload.wikimedia.org/wikipedia/commons/7/72/Homer_Odyssey_British_Library.jpg', 1),
('The Iliad', 'Homer', '9780140275360', 'An epic poem about the Trojan War', -750, 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Iliad_manuscript.jpg', 1),
('The Divine Comedy', 'Dante Alighieri', '9780142437223', 'An epic poem about the journey through Hell, Purgatory, and Paradise', 1320, 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Divine_Comedy_Cover.jpg', 1),
('The Brothers Karamazov', 'Fyodor Dostoevsky', '9780374528379', 'A novel about the moral struggles of faith, doubt, and reason', 1880, 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Brothers_Karamazov_Cover.jpg', 1),
('War and Peace', 'Leo Tolstoy', '9780199232765', 'A novel about the history of the French invasion of Russia', 1869, 'https://upload.wikimedia.org/wikipedia/commons/7/7c/War_and_Peace_First_Edition.jpg', 1);
