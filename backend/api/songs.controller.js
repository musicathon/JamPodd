import songsDAO from '../dao/songsDAO.js';

export default class MusicController {
	static async apiGetSongsBySearch(req, res, next) {
		const songsPerPage = req.query.limit ? parseInt(req.query.limit, 10) : 15;
		const keyword = req.query.keyword || '';

		const { songsList, totalNumSongs } = await songsDAO.getSongsBySearch(
			keyword,
			songsPerPage
		);

		let response = {
			songs: songsList,
			total_results: totalNumSongs
		};
		res.json(response);
	}

	static async apiGetSongsByIds(req, res, next) {
		const ids = req.params.ids ? req.params.ids.split(',') : [];

		const { songsList, totalNumSongs } = await songsDAO.getSongsById(ids);

		let response = {
			songs: songsList,
			total_results: totalNumSongs
		};
		res.json(response);
	}
}
