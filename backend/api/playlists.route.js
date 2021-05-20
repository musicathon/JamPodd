import express from 'express';
import PlaylistControl from './playlist_controller.js'
// Add DAO that connects to the 'user_playlists' collection on mongo

const router = express.Router();

router
	.route('/')
	.get(PlaylistControl.apiGetPlaylists)
	.post(PlaylistControl.apiAddPlaylist); // for creating new playlists

router
	.route('/id/:id')
	.get((req, res) => res.send('playlist with given id will show here'))
	.put(PlaylistControl.apiEditPlaylist) // for editing the playlist
	.delete(PlaylistControl.apiDeletePlaylist); // for deleting the playlist

export default router;
