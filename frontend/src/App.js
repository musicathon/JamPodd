import './App.css';
import { useEffect, useRef, useState } from 'react';
import { Switch } from 'react-router-dom';
import ConditionalRoute from './components/ConditionalRoute';
import LoginPage from './components/LoginPage/LoginPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Explore from './components/Explore/Explore';
import Playlists from './components/Playlists/Playlists';
import PlayListPage from './components/PlaylistPage/PlaylistPage';

function App() {
	const [gAuthRef, setGAuthRef] = useState();
	const [currentTrackIndex, setCurrentTrackIndex] = useState();
	const currentTrackList = useRef();

	// reset currentTrackIndex and currentTrackList on when footer unmounts
	useEffect(() => {
		return () => {
			setCurrentTrackIndex(undefined);
			currentTrackList.current = undefined;
		};
	}, [gAuthRef]);

	return (
		<Switch>
			<ConditionalRoute condition={!gAuthRef} exact path='/login' redirectPath='/'>
				<LoginPage setGAuthRef={setGAuthRef} />
			</ConditionalRoute>

			<ConditionalRoute condition={!!gAuthRef} path='/' redirectPath='/login'>
				<Header
					setGAuthRef={setGAuthRef}
					DPSrc={gAuthRef ? gAuthRef.profileObj.imageUrl : ''}
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
						condition={!!gAuthRef}
						exact
						path='/explore'
						redirectPath='/login'
					>
						<Explore />
					</ConditionalRoute>
					<ConditionalRoute
						condition={!!gAuthRef}
						exact
						path='/playlists'
						redirectPath='/login'
					>
						<Playlists />
					</ConditionalRoute>
					<ConditionalRoute
						condition={!!gAuthRef}
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
	);
}

export default App;
