import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Tracklist from '../components/Tracklist';
import AddSongForm from './components/AddSongForm';
import { SongProvider } from './context/SongContext';

function App() {
    return (
        <Router>
            <SongProvider>
                <Switch>
                    <Route path="/" exact component={Tracklist} />
                    <Route path="/add" component={AddSongForm} />
                </Switch>
            </SongProvider>
        </Router>
    );
}

export default App;
