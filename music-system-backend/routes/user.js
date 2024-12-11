const router = require("express").Router();
const userAuth = require("../controller/user");

router.post("/login", userAuth.login);
router.post("/register", userAuth.register);

module.exports = router;