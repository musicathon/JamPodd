import express from 'express';
// Add DAO that connects to the 'user_playlists' collection on mongo

const router = express.Router();

router
	.route('/')
	.get((req, res) => res.send("list of the user's playlists will show here"))
	.post(); // for creating new playlists

router
	.route('/id/:id')
	.get((req, res) => res.send('playlist with given id will show here'))
	.put() // for editing the playlist
	.delete(); // for deleting the playlist

export default router;
