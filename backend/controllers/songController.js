const Song = require('../models/Song');

exports.getSong = async (req, res) => {
  try {
    const song = await Song.findByPk(req.params.id);
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }
    res.json(song);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching song', error });
  }
};

exports.addSong = async (req, res) => {
  try {
    const song = await Song.create(req.body);
    res.status(201).json(song);
  } catch (error) {
    res.status(500).json({ message: 'Error adding song', error });
  }
};
