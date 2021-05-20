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

	static async addPlaylist(_id, userInfo, playlist_name) {
		try {
			const addedPlaylist = {
				user_id: userInfo._id,
				playlist_name: playlist_name,
				playlistId: ObjectId(_id)
			};

			return await playlist.insertOne(addedPlaylist);
		} catch (e) {
			console.error(`Unable to add playlist: ${e}`);
			return { error: e };
		}
	}

	static async updatePlaylist(playlistId, userId, title) {
		try {
			const updatedPlaylist = await playlist.updateOne(
				{ user_id: userId, _id: ObjectId(playlistId) },
				{ $set: { title: title } }
			);

			return updatedPlaylist;
		} catch (e) {
			console.error(`Unable to edit playlist: ${e}`);
			return { error: e };
		}
	}

	static async deletePlaylist(playlistId, userId) {
		try {
			const deleteResponse = await playlist.deleteOne({
				_id: ObjectId(playlistId),
				user_id: userId
			});

			return deleteResponse;
		} catch (e) {
			console.error(`Unable to delete playlist: ${e}`);
			return { error: e };
		}
	}
}
