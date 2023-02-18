const express = require("express")
const app = express()
const mongoose = require("mongoose")
const route = require("./Router/router")
const cors = require("cors")

app.use(cors())
app.use(express.json())
mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://Sushant_Bhaiswar_30:WBYUu1bCYmxmZUmg@cluster0.jui41on.mongodb.net/omnify?retryWrites=true&w=majority")
    .then(() => {
        console.log("Mongodb is connected !");
    })
    .catch((err) => {
        console.log(err);
    })

app.use("/", route)
app.listen(3001, () => {
    console.log("Express app running on Port 3001");
})