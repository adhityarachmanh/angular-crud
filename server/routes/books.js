const router = require("express").Router()
const Book = require("../models/Book")



router.get("/", async (req, res) => {
    try {
        const books = await Book.find({})
        res.send(books)
    } catch (error) {
        res.status(400).send({ message: "books doesn't exists" })
    }
})

router.get("/:bookId", async (req, res) => {
    try {
        const book = await Book.findById(req.params.bookId)
        res.send(book)
    } catch (error) {
        res.status(400).send({ message: "book doesn't exists" })
    }
})

router.post("/", async (req, res) => {
    const book = new Book({
        title: req.body.title,
        genre: req.body.genre,
        authorID: req.body.authorID
    })
    try {
        const savedBook = await book.save()
        res.send(savedBook)
    } catch (error) {
        res.status(400).send({ message: "error create book" })
    }
})

router.put("/:bookId", async (req, res) => {
    console.log(req.body)

    try {
        const updateBook = await Book.updateOne({ _id: req.params.bookId }, {
            title: req.body.title,
            genre: req.body.genre,
            authorID: req.body.authorID
        })
        res.send(updateBook)
    } catch (error) {
        res.status(400).send({ message: "error create book" })
    }
})

router.delete("/:bookId", async (req, res) => {
    try {
        const removeBook = await Book.deleteOne({ _id: req.params.bookId })
        res.send(removeBook)
    } catch (error) {
        res.status(400).send({ message: "error delete book" })
    }
})

module.exports = router