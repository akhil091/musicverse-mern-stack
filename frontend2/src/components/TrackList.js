import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Tracklist = () => {
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await axios.get('/api/songs');
                setSongs(response.data);
            } catch (error) {
                console.error('Error fetching songs:', error);
            }
        };

        fetchSongs();
    }, []);

    const removeSong = (id) => {
        setSongs(songs.filter(song => song.id !== id));
    };

    return (
        <div>
            <h2>Tracklist</h2>
            <ul>
                {songs.map(song => (
                    <li key={song.id}>
                        {song.title} by {song.artist}
                        <button aria-label="Remove song" onClick={() => removeSong(song.id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Tracklist;
