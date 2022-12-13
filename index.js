// ======================
//  App initialization 
// ======================

const express = require("express");
const app = express();
const cors = require('cors');
let port = process.env.PORT || 4000;

// =====================
//  Use Middlewares
// =====================

app.use(cors())
app.use(express.json());
app.use(express.static("Public"));

// =====================
//  Initialize Routes
// =====================

const routes = require('./routes');

// =====================
//  Use Routes
// =====================

app.use('/api', routes)

// =====================
//  Start Server
// =====================

app.listen(port, () => {
  console.log("Aplikasi kita Tersambung di localhost:" + port + " Yang Mulia !!");
});
