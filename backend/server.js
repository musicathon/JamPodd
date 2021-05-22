import express from 'express';
import cors from 'cors';
import songs from './api/songs.route.js';
import playlists from './api/playlists.route.js';
import verifyToken from './auth.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use(async (req, res, next) => {
	const authHeader = req.header('authorization');
	let authres;

	if (authHeader) {
		const idToken = authHeader.split(/[ ]+/)[1];
		authres = await verifyToken(idToken)
			.then((authres) => authres)
			.catch((e) => console.error(e));
	}

	if (authres && authres.verified) {
		res.locals.user_id = authres.email;
		next();
	} else {
		res.status(401).json({ error: 'not authorized' });
	}
});
app.use('/api/ver1/songs', songs);
app.use('/api/ver1/playlists', playlists);
app.use('*', (req, res) => res.status(404).json({ error: 'not found' }));

/* ===========
	Summary:
	
	/api/ver1/songs/ - will return a list of songs, based on a query/search
	/api/ver1/songs/ids/:ids - will return the list of songs corresponding to the ids
	
	/api/ver1/playlists/ - will return the list of the user's playlists
							   - can create new playlists
	/api/ver1/playlists/id/:id - will return the playlist corresponding to the id
									 - can edit the playlist corresponding to the id
									 - can delete the playlist corresponding to the id
									 
	==========
	*/

export default app;
