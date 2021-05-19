import express from 'express';
import songsControl from './songs.controller.js';
// Add DAO that connects to the 'music' collection on mongo

const router = express.Router();

router.route('/').get(songsControl.apiGetSongsBySearch);
// router.route('/ids/:ids').get(MusicControl.apiGetSongByIds);

export default router;
