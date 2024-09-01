import React, { createContext, useState, useContext } from 'react';

const SongContext = createContext();

export const SongProvider = ({ children }) => {
    const [songs, setSongs] = useState([]);

    return (
        <SongContext.Provider value={{ songs, setSongs }}>
            {children}
        </SongContext.Provider>
    );
};

export const useSongs = () => useContext(SongContext);
