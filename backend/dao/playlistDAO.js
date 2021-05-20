import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectID;

let playlist;

export default class PlaylistDAO {
	static async injectDB(conn) {
		if (playlist) {
			return;
		}
		try {
			playlist = await conn.db(process.env.MUSIC_NS).collection('user_playlists');
		} catch (e) {
			console.error(`Unable to establish collection handles in userDAO: ${e}`);
		}
	}

	static async getPlaylists(user_id) {
		const query = { user_id: { $eq: user_id } };

		let cursor;
		try {
			cursor = await playlist.find(query);
		} catch (e) {
			console.error(`Unable to issue find command, ${e}`);
			return { playlistList: [], totalNumPlaylists: 0 };
		}

		try {
			const playlistList = await cursor.toArray();
			const totalNumPlaylists = playlistList.length;

			return { playlistList, totalNumPlaylists };
		} catch (e) {
			console.error(
				`Unable to convert cursor to array or problem counting documents, ${e}`
			);
			return { playlistList: [], totalNumPlaylists: 0 };
		}
	}

	static async getPlaylistById(user_id, playlist_id) {
		let cursor;

		try {
			const query = {
				user_id: { $eq: user_id },
				_id: { $eq: ObjectId(playlist_id) }
			};

			cursor = await playlist.find(query);
		} catch (e) {
			console.error(`Unable to issue find command, ${e}`);
			return {};
		}

		try {
			const playlist = await cursor.toArray();

			return playlist[0];
		} catch (e) {
			console.error(`Unable to convert cursor to array, ${e}`);
			return {};
		}
	}

	static async addPlaylist(user_id, playlist_name) {
		const newPlaylist = {
			user_id,
			playlist_name
		};

		try {
			return await playlist.insertOne(newPlaylist);
		} catch (e) {
			console.error(`Unable to add playlist: ${e}`);
			return { error: e };
		}
	}

	static async updatePlaylist(playlist_id, user_id, playlist_name, tracks) {
		let setObj = {};

		if (tracks) setObj.tracks = tracks;
		if (playlist_name) setObj.playlist_name = playlist_name;

		try {
			return await playlist.updateOne(
				{ user_id: user_id, _id: ObjectId(playlist_id) },
				{ $set: setObj }
			);
		} catch (e) {
			console.error(`Unable to edit playlist: ${e}`);
			return { error: e };
		}
	}

	static async deletePlaylist(playlist_id, user_id) {
		try {
			return await playlist.deleteOne({
				_id: ObjectId(playlist_id),
				user_id: user_id
			});
		} catch (e) {
			console.error(`Unable to delete playlist: ${e}`);
			return { error: e };
		}
	}
}
