let express = require("express");
var got = require("got");
let router = express.Router();

function containsData(object) {
	return Object.keys(object).length > 0;
}

router.post("/:page", async function(req, res, next) {
    try {
    	const api_root = "https://api.data.gov/ed/collegescorecard/v1/schools";
    	const api_key = "ms2nkkFXSyOmc8JPWhiiNUCnu24mvVrqDdALFD8X";
    	const fields = "id,school.state,school.name,latest.admissions.admission_rate.overall,latest.student.size";

    	const page = req.params.page;
    	const state = "NY";
    	const program = "latest.academics.program.bachelors.education";
    	let sort = "";

    	if (containsData(req.body)) {
    		sort = `${req.body.field}:${req.body.direction}`
    	}

    	const url = api_root + "?school.state=" + state + "&" + program + "=1&_fields=" + fields + "&sort=" + sort + "&page=" + page + "&api_key=" + api_key;
        let data = await got(url);
        res.json(data.body);
    } catch(e) {

    }
});

module.exports = router;