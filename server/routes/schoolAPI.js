let express = require("express");
let router = express.Router();

router.get("/", function(req, res, next) {
	res.send("testing 1 2 3");
});

module.exports = router;