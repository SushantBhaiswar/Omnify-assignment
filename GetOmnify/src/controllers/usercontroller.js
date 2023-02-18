const UserModel = require("../models/usermodel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
module.exports = {
    createuser: async (req, res) => {
        try {

            let checkunique_email = await UserModel.findOne({ email: req.body.email })
            if (checkunique_email) return res.status(400).send({ message: "Email Address Already exists!" })

            let salt = await bcrypt.genSalt(10)
            let hashpass = await bcrypt.hash(req.body.password, salt)
            req.body.password = hashpass
            let createUserdata = await UserModel.create(req.body)
            res.status(201).send({ data: createUserdata })
        } catch (error) {
            res.status(500).send(error.message)
        }
    },
    loginuser: async (req, res) => {
        try {

            let { email, password } = req.body
            let findUser = await UserModel.findOne({ email: email });
            if (!findUser) return res.status(404).send({ status: false, message: "emailId or password is incorrect" })
            let pass = await bcrypt.compare(password, findUser.password)
            if (!pass) return res.status(404).send({ status: false, message: "emailId or password is incorrect" })

            let token = jwt.sign({
                userId: findUser._id
            },
                "omnify-assignment", { expiresIn: "1d" })

            res.status(200).send(findUser._id)
        } catch (error) {
            res.status(500).send(error.message)
        }
    },
}