import http from '../http-common';

class PlayListsDS {
	getAll() {
		return http.get('playlists/');
	}

	createNew(playlist_name) {
		const data = { playlist_name };
		return http.post('playlists/', data);
	}

	edit(id, playlist_name, tracks) {
		const data = { playlist_name, tracks };
		return http.put(`playlists/id/${id}`, data);
	}

	delete(id) {
		return http.delete(`playlists/id/${id}`);
	}

	getById(id) {
		return http.get(`playlists/id/${id}`);
	}
}

export default new PlayListsDS();
