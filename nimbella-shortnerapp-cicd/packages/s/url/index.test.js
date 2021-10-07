const { Mongoose } = require("mongoose");
const app = require("./index");
const mongoose = require('mongoose')
describe("Validates Response when URL Shortner is Requested", () => {
  test("Validates Response URL shortner for Positive flow", async () => {
    var requestBody = {
      actual_url:
        "https://nimbella.com/blog/how-to-deploy-node-js-functions-on-nimbella",
    };
    var appResponse = await app.main(requestBody);
    
    expect(appResponse.body.success).toBe(true);
    expect(appResponse.statusCode).toBe(200);
  });
});

afterAll(async done => {
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.connection.close();
  done();
});
