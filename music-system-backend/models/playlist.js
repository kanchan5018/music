const mongoose = require('mongoose');

const playlistSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true // Name of the playlist
        },
        description: {
            type: String,
            required: true // Description of the playlist
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,  // Reference to the User model
            ref: 'User',  // Reference to the User collection
            required: true  // Each playlist is associated with a specific user
        },
        songs: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Song'  // Reference to the Song model, optional
        }]
    },
    {
        timestamps: true  // Automatically add createdAt and updatedAt fields
    }
);

// Create the model from the schema
module.exports = mongoose.model('Playlist', playlistSchema);
