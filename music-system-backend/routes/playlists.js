const router = require("express").Router();
const Auth = require("../Auth/auth");
const { newPlaylist, updatePlaylist, getPlaylistsById,getAllSongs, deletePlaylist,addSongs, getPlaylistDetails } = require("../controller/playlist");

router.get("/playlists/:userId", Auth, getPlaylistsById);
router.post("/create", Auth, newPlaylist);
router.post("/update/:playlistId", Auth, updatePlaylist);
router.delete("/delete/:id", Auth, deletePlaylist);
router.get('/playlist/:id', getPlaylistDetails);
router.get('/getallsong/:id',getAllSongs);
router.post('/playlists/:id/songs',addSongs)

module.exports = router;