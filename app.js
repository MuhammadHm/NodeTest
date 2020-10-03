const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const routs = require("./routes")

app.use(routs);

app.listen(port);