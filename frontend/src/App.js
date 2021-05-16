import './App.css';
import { useRef, useState } from 'react';
import { Switch } from 'react-router-dom';
import ConditionalRoute from './components/ConditionalRoute';
import LoginPage from './components/LoginPage/LoginPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Explore from './components/Explore/Explore';
import Playlists from './components/Playlists/Playlists';
import PlayListPage from './components/PlaylistPage/PlaylistPage';
import { useEffect } from 'react';

function App() {
	const [isAuth, setIsAuth] = useState(false);
	const [currentTrackIndex, setCurrentTrackIndex] = useState();
	const currentTrackList = useRef();

	// reset currentTrackIndex and currentTrackList on logout
	useEffect(() => {
		setCurrentTrackIndex(undefined);
		currentTrackList.current = undefined;
	}, [isAuth]);

	return (
		<>
			<Switch>
				<ConditionalRoute
					condition={!isAuth}
					exact
					path='/login'
					redirectPath='/'
				>
					<LoginPage setIsAuth={setIsAuth} />
				</ConditionalRoute>

				<ConditionalRoute condition={isAuth} path='/' redirectPath='/login'>
					<Header setIsAuth={setIsAuth} />
					<Switch>
						{/* redirect '/' to '/playlists' */}
						<ConditionalRoute
							condition={false}
							exact
							path='/'
							redirectPath='/playlists'
						/>
						<ConditionalRoute
							condition={isAuth}
							exact
							path='/explore'
							redirectPath='/login'
						>
							<Explore />
						</ConditionalRoute>
						<ConditionalRoute
							condition={isAuth}
							exact
							path='/playlists'
							redirectPath='/login'
						>
							<Playlists />
						</ConditionalRoute>
						<ConditionalRoute
							condition={isAuth}
							path='/playlist'
							redirectPath='/login'
						>
							<PlayListPage
								currentTrackList={currentTrackList}
								setCurrentTrackIndex={setCurrentTrackIndex}
							/>
						</ConditionalRoute>
					</Switch>
					{/* Only show Footer if a track list is playing */}
					{currentTrackList.current && (
						<Footer
							currentTrackIndex={currentTrackIndex}
							setCurrentTrackIndex={setCurrentTrackIndex}
							currentTrackList={currentTrackList.current}
						/>
					)}
				</ConditionalRoute>
			</Switch>
		</>
	);
}

export default App;
