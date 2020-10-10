let express = require("express");
var got = require("got");

const redis = require("redis");
const port_redis = process.env.PORT || 6379;
const redis_client = redis.createClient(port_redis);

let router = express.Router();

// caching middleware
checkCache = function(req, res, next) {
    const url = req.url;

    redis_client.get(url, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        }

        if (data != null) {
            res.send(data);
        } else {
            next();
        }
    });
};

router.post("/:page/state/:state/sort/:sort/order/:order", checkCache, async function(req, res, next) {
    try {
        const api_root = "https://api.data.gov/ed/collegescorecard/v1/schools";
        const api_key = "ms2nkkFXSyOmc8JPWhiiNUCnu24mvVrqDdALFD8X";
        const fields = "id,school.state,school.name,latest.admissions.admission_rate.overall,latest.student.size";

        const page = req.params.page;
        const sort = req.params.sort;
        const order = req.params.order;
        const state = req.params.state;

        const program = "latest.academics.program.bachelors.education";
        let sortString = "";

        if (sort && order) {
            sortString = `${sort}:${order}`
        }

        const url = api_root + "?school.state=" + state + "&" + program + "=1&_fields=" + fields + "&sort=" + sortString + "&page=" + page + "&api_key=" + api_key;
        let data = await got(url);
        redis_client.setex(req.url, 3600, JSON.stringify(data.body));

        return res.json(data.body);
    } catch(e) {
        console.log(e);
          return res.status(500).json(e);
    }
});

module.exports = router;