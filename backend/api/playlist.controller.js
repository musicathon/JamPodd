import PlaylistDAO from '../dao/playlistDAO.js';

export default class PlaylistController {
	static async apiGetPlaylists(req, res, next) {
		const user_id = res.locals.user_id;

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
		const user_id = res.locals.user_id;

		const playlist_id = req.params.id;

		const playlist = await PlaylistDAO.getPlaylistById(user_id, playlist_id);

		const response = playlist;
		res.json(response);
	}

	static async apiAddPlaylist(req, res, next) {
		const user_id = res.locals.user_id;

		const title = req.body.title;
		if (!title) {
			res.status(400).json({ error: 'no playlist title' });
			return;
		}

		try {
			const { error } = await PlaylistDAO.addPlaylist(user_id, title);

			if (error) {
				res.status(400).json({ error });
				return;
			}

			res.json({ status: 'success' });
		} catch (e) {
			res.status(500).json({ error: e.message });
		}
	}

	static async apiEditPlaylist(req, res, next) {
		const user_id = res.locals.user_id;

		const playlist_id = req.params.id;
		const title = req.body.title;
		const tracks = req.body.tracks;

		try {
			const { error } = await PlaylistDAO.updatePlaylist(
				playlist_id,
				user_id,
				title,
				tracks
			);

			if (error) {
				res.status(400).json({ error });
				return;
			}

			res.json({ status: 'success' });
		} catch (e) {
			res.status(500).json({ error: e.message });
		}
	}

	static async apiDeletePlaylist(req, res, next) {
		const user_id = res.locals.user_id;

		const playlist_id = req.params.id;
		try {
			const { error } = await PlaylistDAO.deletePlaylist(playlist_id, user_id);

			if (error) {
				res.status(400).json({ error });
				return;
			}

			res.json({ status: 'success' });
		} catch (e) {
			res.status(500).json({ error: e.message });
		}
	}
}
