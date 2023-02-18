const express = require("express")
const { createEvent, getevents, deleteEvenet } = require("../controllers/eventcontroller")
const Router = express.Router()
const { loginuser, createuser } = require("../controllers/usercontroller")

Router.post("/login", loginuser)
Router.post("/register", createuser)
Router.post("/createEvent", createEvent)
Router.get("/getevent/:id", getevents)
Router.post("/delete/:id", deleteEvenet)
module.exports = Router