const express = require("express");
const cors = require("cors");
const app = express();


var corsOptions = {
  origin: "*"
};

const plantStateRoutes = require("./src/routes/plantstate.route");

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});

app.use('/api/v1/states', plantStateRoutes);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});