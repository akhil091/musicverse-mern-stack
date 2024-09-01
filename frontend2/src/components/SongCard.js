import React from 'react';

const SongCard = React.memo(({ song }) => {
    return (
        <div className="song-card">
            <h3>{song.title}</h3>
            <p>{song.artist}</p>
        </div>
    );
});

export default SongCard;
