import express from 'express';
// Add DAO that connects to the 'music' collection on mongo

const router = express.Router();

router.route('/').get((req, res) => res.send('song list based on query will show here'));
router
	.route('/ids/:ids')
	.get((req, res) => res.send('song list based on ids will show here'));

export default router;
