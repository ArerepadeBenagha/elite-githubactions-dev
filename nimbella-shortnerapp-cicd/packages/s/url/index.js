const mongoose = require("mongoose"); // package to interact with mongodb
const { nanoid } = require("nanoid"); //package to generate unique id

const DB_Username = process.env.DB_Username; //getting credentials from Environment variables
const DB_Password = process.env.DB_Password;
const DB_Name = process.env.DB_Name;
const DB_ClusterUri = process.env.DB_ClusterUri;
const DATABASEURI = `mongodb+srv://${DB_Username}:${DB_Password}@${DB_ClusterUri}/${DB_Name}?retryWrites=true&w=majority`; //DB URI
mongoose.Promise = global.Promise;

const Url = mongoose.model("urls", {
  //Creating URL Model
  short_url: { type: String },
  actual_url: { type: String },
});

mongoose
  .connect(DATABASEURI, {
    //Establishing connection with MongoDB
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to mongo database"))
  .catch((e) => console.error(e));

async function main(args) {
  //Main function to return response for client request
  response = new Object();
  try {
    if (args.__ow_path) {
      //Checking the path param of url
      path = args.__ow_path.toString().replace("/", "");
      // Url.short_url=path
      const URL = await Url.findOne({ short_url: path });

      console.log(URL);
      if (URL) {
        (response.headers = { location: URL.actual_url }),
          (response.statusCode = 302);
      } else {
        response.body = { message: "short url not found ", success: false };
        response.statusCode = 200;
      }
    } //shortening the url if path param is not found
    else {
      result = await Url.findOne({ actual_url: args.actual_url }); //Checks whether the URL to shorten exists already in DB
      if (result) {
        response.body = {
          message: "short url has been created already",
          success: true,
          short_url: process.env.BASE_URL + "/" + result.short_url,
        };
        response.statusCode = 200;
      } else {
        var url = new Url({
          actual_url: args.actual_url,
          short_url: nanoid(11),
        });

        insertionResponse = await url.save(); //inserrting the URL into DB

        console.log(insertionResponse);
        if (insertionResponse.actual_url) {
          response.body = {
            message: "Short url has been created successfully",
            success: true,
            short_url: process.env.BASE_URL + "/" + insertionResponse.short_url,
          };
        } else {
          response.body = { message: "Error Inserting Url", success: false };
        }
        response.statusCode = 200;
      }
    }
  } catch (e) {
    response.body = {
      message: "Exception has occured while processing",
      exception: e.message,
      success: false,
    };
    response.statusCode = 400;
  }
  return response;
}

module.exports = { main };
