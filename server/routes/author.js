const router = require("express").Router()
const Author = require("../models/Author")
const Books = require("../models/Book")
router.post("/", async (req, res) => {
    const author = new Author({
        name: req.body.name,
        age: req.body.age
    })
    try {
        const savedAuthor = await author.save()
        res.send(savedAuthor)
    } catch (error) {
        res.send(error)
    }
})
router.get("/", async (req, res) => {

    try {
        const authors = await Author.find({})
        res.send(authors)
    } catch (error) {
        res.send(error)
    }
})

router.get("/:authorID", async (req, res) => {

    try {
        const author = await Author.findById(req.params.authorID)
        res.send(author)
    } catch (error) {
        res.send(error)
    }
})




module.exports = router