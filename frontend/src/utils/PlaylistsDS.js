import http from '../http-common';

class PlayListsDS {
	getAll() {
		return http.get('/api/ver1/playlists/');
	}

	getById(id) {
		return http.get(`/api/ver1/playlists/id/${id}`);
	}

	create(title) {
		const data = { title };
		return http.post('/api/ver1/playlists/', data);
	}

	edit({ id, title, tracks }) {
		const data = { title, tracks };
		return http.put(`/api/ver1/playlists/id/${id}`, data);
	}

	delete(id) {
		return http.delete(`/api/ver1/playlists/id/${id}`);
	}
}

export default new PlayListsDS();
