import http from '../http-common';

class PlayListsDS {
	getAll() {
		return http.get('playlists/');
	}

	getById(id) {
		return http.get(`playlists/id/${id}`);
	}

	create(title) {
		const data = { title };
		return http.post('playlists/', data);
	}

	edit({ id, title, tracks }) {
		const data = { title, tracks };
		return http.put(`playlists/id/${id}`, data);
	}

	delete(id) {
		return http.delete(`playlists/id/${id}`);
	}
}

export default new PlayListsDS();
