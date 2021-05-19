import axios from 'axios';

export default axios.create({
	baseURL: 'http://localhost:5000/api/ver1/',
	headers: {
		'Content-type': 'application/json'
	}
});
