import songsDAO from '../dao/songsDAO.js';

export default class MusicController {
	static async apiGetSongsBySearch(req, res, next) {
		const songsPerPage = req.query.songsPerPage
			? parseInt(req.query.songsPerPage, 10)
			: 15;

		let filters = {};
		if (req.query.keyword) filters.keyword = req.query.keyword;

		const { songsList, totalNumSongs } = await songsDAO.getSongs({
			filters,
			songsPerPage
		});

		let response = {
			songs: songsList,
			total_results: totalNumSongs
		};
		res.json(response);
	}
}
