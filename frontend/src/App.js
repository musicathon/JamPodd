import './App.css';
import http from './http-common';
import { useEffect, useState } from 'react';
import { Switch } from 'react-router-dom';
import ConditionalRoute from './components/ConditionalRoute';
import LoginPage from './components/LoginPage/LoginPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Explore from './components/Explore/Explore';
import Playlists from './components/Playlists/Playlists';
import PlayListPage from './components/PlaylistPage/PlaylistPage';

function App() {
	const [gToken, setGToken] = useState();
	const [currentTrackIndex, setCurrentTrackIndex] = useState();
	const [currentTrackList, setCurrentTrackList] = useState([]);
	const [doShuffle, setDoShuffle] = useState(false); // shuffle state

	useEffect(() => {
		if (gToken) http.defaults.headers.common['user_id'] = gToken.profileObj.email;
		else delete http.defaults.headers.common['user_id'];

		// reset currentTrackIndex and currentTrackList on when footer unmounts
		return () => {
			setCurrentTrackIndex(undefined);
			setCurrentTrackList([]);
		};
	}, [gToken]);

	return (
		<Switch>
			<ConditionalRoute condition={!gToken} exact path='/login' redirectPath='/'>
				<LoginPage setGToken={setGToken} />
			</ConditionalRoute>

			<ConditionalRoute condition={!!gToken} path='/' redirectPath='/login'>
				<Header
					setGToken={setGToken}
					DPSrc={gToken ? gToken.profileObj.imageUrl : ''}
				/>
				<Switch>
					{/* redirect '/' to '/playlists' */}
					<ConditionalRoute
						condition={false}
						exact
						path='/'
						redirectPath='/playlists'
					/>
					<ConditionalRoute
						condition={!!gToken}
						exact
						path='/explore'
						redirectPath='/login'
					>
						<Explore
							setCurrentTrackList={setCurrentTrackList}
							setCurrentTrackIndex={setCurrentTrackIndex}
						/>
					</ConditionalRoute>
					<ConditionalRoute
						condition={!!gToken}
						exact
						path='/playlists'
						redirectPath='/login'
					>
						<Playlists />
					</ConditionalRoute>
					<ConditionalRoute
						condition={!!gToken}
						path='/playlist'
						redirectPath='/login'
					>
						<PlayListPage
							setCurrentTrackList={setCurrentTrackList}
							setCurrentTrackIndex={setCurrentTrackIndex}
							setDoShuffle={setDoShuffle}
						/>
					</ConditionalRoute>
				</Switch>
				{/* Only show Footer if a track list is playing */}
				{currentTrackList.length > 0 && (
					<Footer
						currentTrackIndex={currentTrackIndex}
						setCurrentTrackIndex={setCurrentTrackIndex}
						doShuffle={doShuffle}
						setDoShuffle={setDoShuffle}
						currentTrackList={currentTrackList}
					/>
				)}
			</ConditionalRoute>
		</Switch>
	);
}

export default App;
