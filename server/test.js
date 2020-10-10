const app = require("./app");
const request = require("supertest");

// standard entrypoint
request(app)
    .get("/")
    .expect(200)
    .expect("Content-Type", "text/html; charset=utf-8")
    .end(function(err, res) {
        if (err) throw err;
    });

// nonexistant entrypoint
request(app)
    .get("/oops")
    .expect(404)
    .end(function(err, res) {
        if (err) throw err;
    });

// schools api with property formatted url
request(app)
    .post("/schools/0/state/NY/sort/school.name/order/asc")
    .expect(200)
    .expect("Content-Type", "text/html; charset=utf-8")
    .end(function(err, res) {
        if (err) throw err;
    })

// schools api with imporoperty formatted url
request(app)
    .post("/schools/blah/state/undefined/sort/undefined/order/undefined")
    .expect(500)
    .end(function(err, res) {
        if (err) throw err;
    })