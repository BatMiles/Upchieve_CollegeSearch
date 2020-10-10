let express = require("express");
var got = require("got");
let router = express.Router();

router.get("/:page", async function(req, res, next) {
    try {
    	const api_root = "https://api.data.gov/ed/collegescorecard/v1/schools";
    	const api_key = "ms2nkkFXSyOmc8JPWhiiNUCnu24mvVrqDdALFD8X";
    	const fields = "id,school.state,school.name,latest.admissions.admission_rate.overall,latest.student.size";

    	const page = req.params.page;
    	const state = "NY";
    	const program = "latest.academics.program.bachelors.education";

    	const url = api_root + "?school.state=" + state + "&" + program + "=1&_fields=" + fields + "&page=" + page + "&api_key=" + api_key;
        let data = await got(url);
        res.json(data.body);
    } catch(e) {

    }
});

module.exports = router;