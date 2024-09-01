CREATE DATABASE musicverse;

USE musicverse;

CREATE TABLE Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Songs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  artist VARCHAR(255) NOT NULL,
  album VARCHAR(255) NOT NULL,
  genre VARCHAR(255) NOT NULL,
  duration INT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE user_preferences (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    favorite_genres VARCHAR(255),
    recently_played JSON,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE artists (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    genre VARCHAR(255)
);

CREATE TABLE albums (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    release_date DATE,
    artist_id INT,
    FOREIGN KEY (artist_id) REFERENCES artists(id)
);


CREATE TABLE playlists (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE playlist_songs (
    playlist_id INT,
    song_id INT,
    PRIMARY KEY (playlist_id, song_id),
    FOREIGN KEY (playlist_id) REFERENCES playlists(id),
    FOREIGN KEY (song_id) REFERENCES songs(id)
);

CREATE TABLE user_favorites (
    user_id INT,
    artist_id INT,
    PRIMARY KEY (user_id, artist_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (artist_id) REFERENCES artists(id)
);

--Adding indexes to columns that are frequently searched or used in JOINs.
CREATE INDEX idx_song_title ON songs(title);
CREATE INDEX idx_artist_name ON artists(name);
CREATE INDEX idx_album_title ON albums(title);

--Ensuring no duplicate song entries and consistent data types.
ALTER TABLE songs ADD UNIQUE (title, album_id);

--Data Integrity Checks
ALTER TABLE playlists ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

--Pagination: Implement queries with LIMIT and OFFSET for paginated results.
SELECT * FROM songs LIMIT 10 OFFSET 0;

-- Total number of songs by an artist
SELECT artist_id, COUNT(*) AS total_songs
FROM songs
GROUP BY artist_id;

-- Average duration of songs in a playlist
SELECT playlist_id, AVG(TIME_TO_SEC(duration)) AS avg_duration
FROM playlist_songs
JOIN songs ON playlist_songs.song_id = songs.id
GROUP BY playlist_id;
