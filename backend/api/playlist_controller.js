import PlaylistDAO from './dao/playlistDAO.js';

export default class PlaylistController {
	static async apiGetPlaylists(req, res, next) {
		const user_id = req.query.user_id;

		const { playlistList, totalNumPlaylists } = await PlaylistDAO.getPlaylists(
			user_id
		);

		const response = {
			playlists: playlistList,
			total_results: totalNumPlaylists
		};
		res.json(response);
	}

	static async apiAddPlaylist(req, res, next) {
		try {
			const playlistId = req.body.playlist_id;
			const userInfo = req.body.user_id;
			const playlist_name = req.body.text;

			const displayPlaylist = await PlaylistDAO.addPlaylist(
				playlistId,
				userInfo,
				playlist_name
			);
			res.json({ status: 'success' });
		} catch (e) {
			res.status(500).json({ error: e.message });
		}
	}

	static async apiEditPlaylist(req, res, next) {
		try {
			const editId = req.body.edit_id;
			const userInfo = req.body.user_id;
			const playlist_name = req.body.playlist_name;

			const editPlaylist = await PlaylistDAO.editPlaylist(
				editId,
				userInfo,
				playlist_name
			);

			var { error } = editPlaylist;
			if (error) {
				res.status(400).json({ error });
			}

			if (editPlaylist.modifiedCount === 0) {
				throw new Error(
					'unable to update playlist - user may not be original poster'
				);
			}

			res.json({ status: 'success' });
		} catch (e) {
			res.status(500).json({ error: e.message });
		}
	}

	static async apiDeletePlaylist(req, res, next) {
		try {
			const deleteId = req.query.id;
			const userInfo = req.body.user_id;
			console.log(deleteId);
			const deletePlaylist = await PlaylistDAO.deletePlaylist(deleteId, userInfo);
			res.json({ status: 'success' });
		} catch (e) {
			res.status(500).json({ error: e.message });
		}
	}
}
