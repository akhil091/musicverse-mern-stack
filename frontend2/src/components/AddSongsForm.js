import React, { useState } from 'react';
import axios from 'axios';

const AddSongForm = () => {
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('/api/songs', { title, artist });
            setTitle('');
            setArtist('');
        } catch (error) {
            console.error('Error adding song:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Song Title"
                required
            />
            <input
                type="text"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                placeholder="Artist"
                required
            />
            <button type="submit">Add Song</button>
        </form>
    );
};

export default AddSongForm;
