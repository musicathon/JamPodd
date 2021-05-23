import { config } from 'dotenv';
config();

const gOauthId = process.env.GOOGLE_OAUTH_ID;

import { OAuth2Client } from 'google-auth-library';
const client = new OAuth2Client(gOauthId);

export default async (idToken) => {
	return await client
		.verifyIdToken({
			idToken,
			audience: gOauthId
		})
		.then((res) => {
			const { email, hd } = res.getPayload();
			if (hd === 'goa.bits-pilani.ac.in') return { verified: true, email };
		})
		.catch((e) => ({ verified: false }));
};
