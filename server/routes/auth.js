const router = require("express").Router();
const User = require("../models/User");
const {
    registerValidation,
    loginValidation
} = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


router.post("/register", async (req, res) => {
    const sendError = (payload) => res.status(400).send(payload)
    const sendSuccess = (payload) => res.status(200).send(payload)

    //validate data before input
    const { error } = registerValidation(req.body);
    if (error) return sendError(error.details[0].message)

    //check email exists
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) return sendError("email already exists")

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    //if not error
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    try {
        const savedUser = await user.save()
        sendSuccess({ user: user._id })
    } catch (err) {
        sendError(err)
    }
})

router.post("/login", async (req, res) => {
    const sendError = (payload) => res.status(400).send(payload)
    const sendSuccess = (payload) => res.status(200).send(payload)

    //validate data before input
    const { error } = loginValidation(req.body)
    if (error) return sendError(error.details[0].message)

    //check email exists
    const user = await User.findOne({ email: req.body.email })
    if (!user) return sendError("Email Is Not Found")

    //if not error
    //valid pass
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) return sendError("Invalid Password")

    //create token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
 

    try {
        res.header('auth-token', token).send(token)
        // sendSuccess("Login Success")
    } catch (err) {
        sendError(err)
    }
})


module.exports = router