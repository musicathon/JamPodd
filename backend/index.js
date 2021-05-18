import app from './server.js'
import mongodb from 'mongodb'
import dotenv from 'dotenv'
import musicDAO from './api/dao/music_dataDAO.js'
dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000

MongoClient.connect(
    process.env.MUSIC_DATA_URI,
    {
        poolSize: 100,
        wtimeout:2500,
        useNewUrlParse: true
    })
    .catch(err => {
        console.error(err.stack)
        process.exit(1)
    })
    .then(async client => {
        await musicDAO.injectDB(client)
        app.listen(port, () => {
            console.log('listening on port ' + port)
        })
    })

