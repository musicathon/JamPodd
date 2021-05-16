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

function App() {
	const [isAuth, setIsAuth] = useState(true);
	const [startingIndex, setStartingIndex] = useState();
	const playlistToPlay = useRef();

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
						{/* redirect '/' to '/explore' */}
						<ConditionalRoute
							condition={false}
							exact
							path='/'
							redirectPath='/explore'
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
								playlistToPlay={playlistToPlay}
								setStartingIndex={setStartingIndex}
							/>
						</ConditionalRoute>
					</Switch>
					<Footer
						tracks={playlistToPlay.current}
						startingIndex={startingIndex}
					/>
				</ConditionalRoute>
			</Switch>
		</>
	);
}

export default App;
