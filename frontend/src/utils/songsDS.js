import http from '../http-common';

class SongDS {
	getByKeyword(keyword) {
		return http.get(`songs?keyword=${keyword}`);
	}

	getByIds(ids) {
		return http.get(`songs/ids/${ids.join(',')}`);
	}
}

export default new SongDS();
