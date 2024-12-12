const Playlist = require("../models/playlist");
const Songs = require("../models/songs");

const { 
    CATCH_ERROR, 
    PLAYLIST_NOT_CREATED, 
    PLAYLIST_CREATED, 
    PLAYLIST_UPDATED, 
    PLAYLIST_DELETED 
} = require('../locale/messages');

// Create a new playlist
const newPlaylist = async (req, res) => {
    console.log("controller@playlist/newPlaylist");
    // Assuming req.user contains the logged-in user's information
    const { name, description } = req.body;
    console.log("req.user",req.user)
    const userId = req.user.id;  // The logged-in user's ID
    try {
        const createPlayList = await Playlist.create({
            name: name,
            description: description,
            user_id: userId,  // Associate playlist with the logged-in user
        });

        if (!createPlayList) {
            return res.json({ message: PLAYLIST_NOT_CREATED, success: false });
        }

        return res.json({ message: PLAYLIST_CREATED, success: true, data: createPlayList });
    } catch (error) {
        return res.json({ message: CATCH_ERROR, success: false, error: error.message });
    }
}

// Update an existing playlist
const updatePlaylist = async (req, res) => {
    const { name, description } = req.body;
    
    const userId = req.user.id;  // The logged-in user's ID

    try {
        const playlist = await Playlist.findOne({ _id: req.params.playlistId, user_id: userId });

        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found or not authorized', success: false });
        }

        playlist.name = name || playlist.name;
        playlist.description = description || playlist.description;

        await playlist.save();
        return res.json({ message: PLAYLIST_UPDATED, success: true, data: playlist });
    } catch (error) {
        return res.json({ message: CATCH_ERROR, success: false, error: error.message });
    }
}

// Delete a playlist
const deletePlaylist = async (req, res) => {
    const userId = req.user.id;  // The logged-in user's ID

    try {
        const playlist = await Playlist.findOne({ _id: req.params.id, user_id: userId });

        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found or not authorized', success: false });
        }

        await Playlist.deleteOne({ _id: req.params.id });
        await Songs.deleteMany({ playlist_id: req.params.id });

        return res.json({ message: PLAYLIST_DELETED, success: true });
    } catch (error) {
        return res.json({ message: CATCH_ERROR, success: false, error: error.message });
    }
}

// Get playlists for a specific user
const getPlaylistsById = async (req, res) => {
    const userId = req.user.id;  // The logged-in user's ID

    try {
        const playlists = await Playlist.find({ user_id: userId }).populate('songs');
        res.json(playlists);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch playlists', success: false });
    }
}

const getPlaylistDetails = async (req, res) => {
    try {
      const playlist = await Playlist.findById(req.params.id).populate('songs');
      if (!playlist) {
        return res.status(404).json({ message: 'Playlist not found', success: false });
      }
      res.json({ success: true, data: playlist });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
  const getAllSongs = async (req, res) => {
    try {
        // Find the playlist by ID and populate the songs field with details
        const playlist = await Playlist.findById(req.params.id).populate('songs');
        
        if (!playlist) {
            return res.status(404).send({ message: 'Playlist not found' });
        }

        // Send the full playlist object including the populated songs
        res.send(playlist);
    } catch (err) {
        // Handle any errors
        res.status(500).send({ error: err.message });
    }
};


  const addSongs = async (req, res) => {
    const {  name, artist, album , spotifyId} = req.body;
    try {
      // Check if the song already exists
      let song = await Songs.findOne({ spotifyId });
      if (!song) {
        song = new Songs({ spotifyId, name, artist, album });
        await song.save();
      }
  
      // Add song to playlist
      const playlist = await Playlist.findById(req.params.id);
      if (!playlist) return res.status(404).send({ message: 'Playlist not found' });
  
      if (!playlist.songs.includes(song._id)) {
        playlist.songs.push(song._id);
        await playlist.save();
      }
      res.send(playlist);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
  
module.exports = { newPlaylist, updatePlaylist, deletePlaylist, getPlaylistsById, getPlaylistDetails, getAllSongs, addSongs };
