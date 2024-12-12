const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
 spotifyId: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  artist: { type: String, required: true },
  album: { type: String, required: true }
});

// Check if the model is already defined to avoid overwriting
module.exports = mongoose.models.Song || mongoose.model('Song', songSchema);
