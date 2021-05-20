import PlaylistDAO from '../dao/playlistDAO.js';

export default class PlaylistController {
	static isUserAuth(user_id) {
		// add google JWT verification

		if (user_id) return true;
		return false;
	}

	static async apiGetPlaylists(req, res, next) {
		const user_id = req.header('user_id');

		if (!PlaylistController.isUserAuth(user_id)) {
			res.status(401).json({ error: 'not authorized' });
			return;
		}

		const { playlistList, totalNumPlaylists } = await PlaylistDAO.getPlaylists(
			user_id
		);

		const response = {
			playlistList,
			total_results: totalNumPlaylists
		};
		res.json(response);
	}

	static async apiGetPlaylistById(req, res) {
		const user_id = req.header('user_id');

		if (!PlaylistController.isUserAuth(user_id)) {
			res.status(401).json({ error: 'not authorized' });
			return;
		}

		const playlist_id = req.params.id;

		const playlist = await PlaylistDAO.getPlaylistById(user_id, playlist_id);

		const response = playlist;
		res.json(response);
	}

	static async apiAddPlaylist(req, res, next) {
		const user_id = req.header('user_id');

		if (!PlaylistController.isUserAuth(user_id)) {
			res.status(401).json({ error: 'not authorized' });
			return;
		}

		const playlist_name = req.body.playlist_name;
		if (!playlist_name) {
			res.json({ error: 'no playlist name' });
			return;
		}

		try {
			const { error } = await PlaylistDAO.addPlaylist(user_id, playlist_name);
			res.json({ status: 'success' });

			if (error) res.status(400).json({ error });
		} catch (e) {
			res.status(500).json({ error: e.message });
		}
	}

	static async apiEditPlaylist(req, res, next) {
		const user_id = req.header('user_id');

		if (!PlaylistController.isUserAuth(user_id)) {
			res.status(401).json({ error: 'not authorized' });
			return;
		}

		const playlist_id = req.params.id;
		const playlist_name = req.body.playlist_name;
		const tracks = req.body.tracks;

		try {
			const { error } = await PlaylistDAO.updatePlaylist(
				playlist_id,
				user_id,
				playlist_name,
				tracks
			);

			if (error) res.status(400).json({ error });

			res.json({ status: 'success' });
		} catch (e) {
			res.status(500).json({ error: e.message });
		}
	}

	static async apiDeletePlaylist(req, res, next) {
		const user_id = req.header('user_id');

		if (!PlaylistController.isUserAuth(user_id)) {
			res.status(401).json({ error: 'not authorized' });
			return;
		}

		const playlist_id = req.params.id;
		try {
			const { error } = await PlaylistDAO.deletePlaylist(playlist_id, user_id);

			if (error) res.status(400).json({ error });

			res.json({ status: 'success' });
		} catch (e) {
			res.status(500).json({ error: e.message });
		}
	}
}
