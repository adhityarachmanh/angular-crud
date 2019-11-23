const booksRouter = require("./books");
const userRouter = require("./auth");
const authorsRouter = require("./author")

const express = require("express")
const app = express()

app.use("/api/books", booksRouter)
app.use("/api/authors", authorsRouter)
app.use("/api/user", userRouter)

module.exports = app