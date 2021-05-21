import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectID;
import SongsDAO from './songsDAO.js';

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

	static async addPlaylist(user_id, title) {
		const newPlaylist = {
			user_id,
			title
		};

		try {
			return await playlist.insertOne(newPlaylist);
		} catch (e) {
			console.error(`Unable to add playlist: ${e}`);
			return { error: e };
		}
	}

	static async updatePlaylist(playlist_id, user_id, title, tracks) {
		let setObj = {};

		if (tracks) {
			setObj.tracks = tracks;

			if (tracks.length > 0) {
				const { songsList } = await SongsDAO.getSongsById([tracks[0]]);
				setObj.imageSrc = songsList[0].imageSrc;
			} else {
				setObj.imageSrc = null;
			}
		}

		if (title) setObj.title = title;

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
