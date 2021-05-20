import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectID;
let songs;

export default class songsDAO {
	static async injectDB(conn) {
		if (songs) return;

		try {
			songs = await conn.db(process.env.MUSIC_NS).collection('songs');
		} catch (e) {
			console.error(`Unable to establish a collection handle in MusicDAO: ${e}`);
		}
	}

	static async getSongsBySearch(keyword = '', songsPerPage = 15) {
		const query = keyword
			? [
					{
						$search: {
							index: 'default',
							text: {
								query: keyword,
								path: {
									wildcard: '*'
								}
							}
						}
					}
			  ]
			: [{ $sample: { size: songsPerPage } }];

		let cursor;
		try {
			cursor = await songs.aggregate(query).limit(songsPerPage);
		} catch (e) {
			console.error(`Unable to issue aggregate command, ${e}`);
			return { songsList: [], totalNumSongs: 0 };
		}

		try {
			const songsList = await cursor.toArray();
			const totalNumSongs = songsList.length;

			return { songsList, totalNumSongs };
		} catch (e) {
			console.error(
				`Unable to convert cursor to array or problem counting documents, ${e}`
			);
			return { songsList: [], totalNumSongs: 0 };
		}
	}

	static async getSongsById(ids = []) {
		let cursor;
		try {
			const objIds = ids.map((id) => ObjectId(id));

			const query = objIds ? { _id: { $in: objIds } } : {};

			cursor = await songs.find(query);
		} catch (e) {
			console.error(`Unable to issue find command, ${e}`);
			return { songsList: [], totalNumSongs: 0 };
		}

		try {
			const songsList = await cursor.toArray();
			const totalNumSongs = songsList.length;

			return { songsList, totalNumSongs };
		} catch (e) {
			console.error(
				`Unable to convert cursor to array or problem counting documents, ${e}`
			);
			return { songsList: [], totalNumSongs: 0 };
		}
	}
}
