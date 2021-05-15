import express from 'express'
import cors from 'cors'
import music_data from './api/music_data.route.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/ver1/JamPodd", music_data)
app.use("*", (req,res) =>res.status(404).json({error:"not found"}))

export default app