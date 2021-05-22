import http from '../http-common';

class SongsDS {
	getByKeyword(keyword) {
		return http.get(`/api/ver1/songs?keyword=${keyword}`);
	}

	getByIds(ids) {
		return http.get(`/api/ver1/songs/ids/${ids.join(',')}`);
	}
}

export default new SongsDS();
