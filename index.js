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
    if (isNaN(id) || id < 0 || id > 2250) {
      console.log(id);
      return;
    }
    return res.sendFile(`images/${id}.png`, { root: __dirname });
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
    return res.send({
      ...metadataWhales[id],
      image: `https://gen0.atlantys.one/image/${id}`,
    });
  } catch (e) {
    console.log(e);
    return res.send({});
  }
});

app.listen(PORT, function () {
  console.log("Server is running on PORT:", PORT);
});
