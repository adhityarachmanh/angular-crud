const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");
require('dotenv/config')
//middleware
app.use(cors())
app.use(express.json())


//ROUTER
app.get("/api", (req, res) => {
    res.send("we are on home")
})
app.use(routes)


//DB
mongoose.connect(
    `mongodb://localhost:27017/first-db`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => {
    console.log("db connect")
})


app.listen(process.env.PORT || 4000, () => {
    console.log("server connect")
})