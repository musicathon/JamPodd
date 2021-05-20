import express from 'express';
import songsControl from './songs.controller.js';

const router = express.Router();

router.route('/').get(songsControl.apiGetSongsBySearch);
router.route('/ids/:ids').get(songsControl.apiGetSongsByIds);

export default router;
