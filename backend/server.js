import express from 'express'
import cors from 'cors'
import home from './api/music_data.route.js'
import explore from './api/explore_route.js'
import playlist from './api/playlists_route.js'
import id from './api/id_route.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/ver1/home", home)
app.use("/api/ver1/explore", explore)
app.use("/api/ver1/playlists", playlist)
app.use("/api/ver1/playlists/id", id)
app.use("*", (req,res) =>res.status(404).json({error:"not found"}))

export default app