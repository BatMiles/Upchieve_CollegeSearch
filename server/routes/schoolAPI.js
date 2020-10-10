let express = require("express");
var got = require("got");
let router = express.Router();

router.get("/:page", async function(req, res, next) {
    try {
    	const page = req.params.page;
    	const api_root = "https://api.data.gov/ed/collegescorecard/v1/schools";
    	const api_key = "ms2nkkFXSyOmc8JPWhiiNUCnu24mvVrqDdALFD8X";
    	const url = api_root + "?school.state=NY&latest.academics.program.bachelors.education=1&_fields=id,school.state,school.name,latest.admissions.admission_rate.overall,latest.student.size&page="+page+"&api_key=" + api_key;
        let data = await got(url);
        res.json(data.body);
    } catch(e) {

    }
});

module.exports = router;