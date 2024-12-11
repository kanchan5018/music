import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const SongSearch = () => {
  let {playlistId} = useParams();
  console.log('playlistId',playlistId)
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playlistSongs, setPlaylistSongs] = useState([]);
  const BACKEND_API = 'https://music-3hs6.vercel.app/';

  // Fetch Spotify Access Token
  const getSpotifyToken = async () => {
    const clientId = "0221bd70abd24d5993038e236b7de819";
    const clientSecret = "5c5462fcebca4a589c42d68566ed2fb0";
    const tokenUrl = "https://accounts.spotify.com/api/token";

    const response = await axios.post(
      tokenUrl,
      new URLSearchParams({ grant_type: "client_credentials" }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
        },
      }
    );

    return response.data.access_token;
  };

  // Search for songs
  const handleSearch = async () => {
    if (!searchQuery) {
      setSearchResults([]);
      return;
    }

    const token = await getSpotifyToken();
    const response = await axios.get(`https://api.spotify.com/v1/search`, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        q: searchQuery,
        type: "track",
        limit: 10,
      },
    });

    setSearchResults(response.data.tracks.items);
  };

  // Real-time search
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  // Fetch songs in the playlist
  const fetchPlaylistSongs = async () => {
    try {
      const response = await axios.get(`${BACKEND_API}/playlist/playlists/${playlistId}/songs`);
      setPlaylistSongs(response.data);
    } catch (error) {
      console.error("Error fetching playlist songs:", error);
    }
  };

  // Add a song to the playlist
  const addSongToPlaylist = async (song) => {
    try {
      await axios.post(`${BACKEND_API}/playlist/playlists/${playlistId}/songs`, {
        name: song.name,
        artist: song.artists[0].name,
        album: song.album.name,
      });
      alert("Song added to the playlist!");
      fetchPlaylistSongs(); // Refresh the playlist songs
    } catch (error) {
      console.error("Error adding song to playlist:", error);
      alert("Failed to add song to the playlist.");
    }
  };

  // Load playlist songs on component mount
  useEffect(() => {
    fetchPlaylistSongs();
  }, [playlistId]);

  return (
    <div className="container">
      <h3>Playlist Songs</h3>
      <ul className="list-group mb-4">
        {playlistSongs.length > 0 ? (
          playlistSongs.map((song) => (
            <li key={song._id} className="list-group-item">
              <strong>{song.name}</strong> by {song.artist} ({song.album})
            </li>
          ))
        ) : (
          <p>No songs in this playlist.</p>
        )}
      </ul>

      <h3>Search Songs</h3>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search for songs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="mt-4">
        {searchResults.length > 0 ? (
          <ul className="list-group">
            {searchResults.map((song) => (
              <li
                key={song.id}
                className="list-group-item d-flex justify-content-between"
              >
                <span>
                  <strong>{song.name}</strong> by {song.artists[0].name} (
                  {song.album.name})
                </span>
                <button
                  className="btn btn-success"
                  onClick={() => addSongToPlaylist(song)}
                >
                  Add to Playlist
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SongSearch;
