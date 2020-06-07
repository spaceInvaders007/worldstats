const express = require("express");
const app = express();
const db = require("../database/index.js");
var cors = require("cors");
const path = require("path");

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

express.static(path.join(__dirname, "/public"));
app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

// app.get("/", async (req, res) => {
//   console.log("reached server line 16");
//   db.selectAllCountries((err, countries) => {
//     if (err) throw err;
//     res.send(countries);
//   });
// });

//countries
app.get("/countries", async (req, res) => {
  db.selectAllCountries((err, countries) => {
    if (err) throw err;
    res.send(countries);
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});
// app.post("/patients", async (req, res) => {
//   db.insertOnePatient(req.body);
//   res.sendStatus(201).end();
// });

// //beds
// app.get("/beds", async (req, res) => {
//   console.log("this is beds response");
//   db.selectAllBeds((err, patients) => {
//     if (err) throw err;
//     res.json(patients);
//   });
// });

// //doctors
// app.get("/doctors", async (req, res) => {
//   console.log("this is doctors response");
//   db.selectAllDoctors((err, doctors) => {
//     if (err) throw err;
//     res.json(doctors);
//   });
// });

// //areas
// app.get("/areas", async (req, res) => {
//   console.log("this is areas response");
//   db.selectAllAreas((err, areas) => {
//     if (err) throw err;
//     res.json(areas);
//   });
// });

// app.get("/areas/:id", async (req, res) => {
//   db.readOneArea(req.params.id, (err, area) => {
//     if (area) {
//       res.status(200).json(area);
//     } else {
//       res.sendStatus(404);
//     }
//   });
// });

// //results
// app.get("/results", async (req, res) => {
//   console.log("this is results response");
//   db.selectAllResults((err, results) => {
//     if (err) throw err;
//     res.json(results);
//   });
// });
