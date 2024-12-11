const router = require("express").Router();
const { newSong, getSongsById, deleteSong } = require("../controller/songs");

router.get("/all/:id", getSongsById);
router.post("/create", newSong);
router.delete("/delete/:id", deleteSong);

module.exports = router;