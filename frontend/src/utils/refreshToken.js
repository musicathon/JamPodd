export const refreshTokenSetup = (res, setGToken) => {
	const refreshToken = async () => {
		const newAuthRes = await res.reloadAuthResponse();
		refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;

		setGToken(newAuthRes);

		// Setup the other timer after the first one
		setTimeout(refreshToken, refreshTiming);
	};

	// Timing to renew access token
	let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

	// Setup first refresh timer
	setTimeout(refreshToken, refreshTiming);
};
