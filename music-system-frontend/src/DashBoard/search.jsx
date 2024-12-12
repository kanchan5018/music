import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import './DashBoard.css'

const SongSearch = () => {
  let { playlistId } = useParams();
  const navigate = useNavigate(); // Hook to navigate between routes

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playlistSongs, setPlaylistSongs] = useState([]);
  const BACKEND_API = "https://music-server-theta.vercel.app";

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
      const response = await axios.get(`${BACKEND_API}/playlist/getallsong/${playlistId}`);
      setPlaylistSongs(response.data?.songs);
    } catch (error) {
      console.error("Error fetching playlist songs:", error);
    }
  };

  // Add a song to the playlist
  const addSongToPlaylist = async (song) => {
    try {
      await axios.post(`${BACKEND_API}/playlist/playlists/${playlistId}/songs`, {
        spotifyId: song.name,
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
      <button className="btn btn-gradient-primary mt-3 mb-3" onClick={() => navigate(-1)}>
        Back
      </button>

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
