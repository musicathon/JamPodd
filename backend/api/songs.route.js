import express from 'express';
import MusicControl from "./music_controller.js"
// Add DAO that connects to the 'music' collection on mongo

const router = express.Router()

router.route("/").get(MusicControl.apiGetSongs)
//router.route("/id/:id").get(MusicControl.apiGetSongById)



export default router


