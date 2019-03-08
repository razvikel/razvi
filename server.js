const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
app.use(cors())
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";
const ObjectId = require('mongodb').ObjectID

MongoClient.connect(url, { useNewUrlParser: true }).then(client => {
    let db = client.db('eli')
    console.log("connected to db!")

    app.get('/conversations', async (req, res) => {
        try {
            let conversations = await db.collection('conversations').find({}).toArray()
            console.log('got conversations from db')
            res.send(conversations)
        } catch (err) {
            console.log(error)
            res.sendStatus(500)
        }
    })

    app.post('/conversation', async (req, res) => {
        try {
            await db.collection('conversations').insertOne(req.body.conversation)
            console.log(`added conversation to db`)
            res.send()
        } catch (err) {
            console.log(error)
            res.sendStatus(500)
        }
    })

    app.post('/answer/:conversationId', async (req, res) => {
        try {
            await db.collection('conversations').updateOne({ _id: ObjectId(req.params.conversationId) }, { $set: { answer: req.body.answer } })
            console.log(`updated answer for conversation ${req.params.conversationId}`)
            res.send()
        } catch (err) {
            console.log(err)
            res.sendStatus(500)
        }
    })

    app.delete('/conversation/:conversationId', async (req, res) => {
        try {
            await db.collection('conversations').deleteOne({ _id: ObjectId(req.params.conversationId) })
            console.log(`deleted conversation ${req.params.conversationId} from db`)
            res.send()
        } catch (err) {
            console.log(error)
            res.sendStatus(500)
        }
    })
}).catch(console.error)

app.listen(port, () => console.log(`listening on port ${port}!`))