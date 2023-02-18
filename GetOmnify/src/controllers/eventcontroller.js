const eventModule = require("../models/eventmodel")
const moment = require('moment')

module.exports = {

    createEvent: async (req, res) => {
        try {
            let current = moment().format("YYYY-MM-DD")
            var after90day = moment().add(90, "days").format("YYYY-MM-DD")
            let arr = []
            for (var m = moment(current); m.isBefore(after90day); m.add(1, 'days')) {
                if (m.format('dddd') === req.body.Day)
                    arr.push(m.format('DD-MM-YYYY'));
            }
            req.body.events = arr

            let createdEvent = await eventModule.create(req.body)
            res.status(201).send(createdEvent)
        } catch (error) {
            res.status(500).send(error.message)
        }
    },
    getevents: async (req, res) => {

        let events = await eventModule.findOne({ Userid: req.params.id })

        res.status(200).send(events)
    },
    deleteEvenet: async (req, res) => {
        try {
            await eventModule.findOneAndRemove({ Userid: req.params.id })
            res.status(200).send({ message: " Event Deleted successfully !" })
        } catch (error) {
            res.status(500).send(error.message)
        }

    }
}