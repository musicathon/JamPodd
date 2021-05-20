import express from 'express';
import playlistControll from './playlist.controller.js';
// Add DAO that connects to the 'user_playlists' collection on mongo

const router = express.Router();

router
	.route('/')
	.get(playlistControll.apiGetPlaylists)
	.post(playlistControll.apiAddPlaylist); // for creating new playlists

router
	.route('/id/:id')
	.get(playlistControll.apiGetPlaylistById)
	.put(playlistControll.apiEditPlaylist) // for editing the playlist
	.delete(playlistControll.apiDeletePlaylist); // for deleting the playlist

export default router;
