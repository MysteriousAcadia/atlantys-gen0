var express = require("express");
const cors = require("cors");

//JWT Secret:this_is_my_key_no_one_knows
var corsOptions = {
  // origin: "http://localhost:8081"
};
var app = express();

// var PORT = 4193;
var PORT = process.env.PORT || 4193;

const metadataWhales = require("./metadata-whales.json");
app.use(cors(corsOptions));

app.get("/image/:id", async (req, res) => {
  try {
    let { id } = req.params;
    id = id?.split(".")[0];
    if (isNaN(id)) {
      console.log(id);
      return;
    }
    return res.redirect(
      `https://ipfs.fleek.co/ipfs/QmUDakMq7bDA6ymndudBJCbJVfo2pj2A7fKZmg1h3NmjKx/images/${id}.png`
    );
  } catch (e) {
    console.log(e);
    return res.send({});
  }
});
app.get("/metadata/:id", async (req, res) => {
  try {
    let { id } = req.params;
    id = id?.split(".")[0];
    if (isNaN(id)) {
      return;
    }
    if (id < 0 || id > 2250) {
      return;
    }
    return res.send({ ...metadataWhales[id] });
  } catch (e) {
    console.log(e);
    return res.send({});
  }
});

app.listen(PORT, function () {
  console.log("Server is running on PORT:", PORT);
});
