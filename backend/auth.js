import { config } from 'dotenv';
config();

import { OAuth2Client } from 'google-auth-library';
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export default async (idToken) => {
	return await client
		.verifyIdToken({
			idToken,
			audience: process.env.GOOGLE_OAUTH_ID
		})
		.then((res) => {
			const { email, hd } = res.getPayload();
			if (hd === 'goa.bits-pilani.ac.in') return { verified: true, email };
		})
		.catch((e) => ({ verified: false }));
};
