import './App.css';
import { useState } from 'react';
import { Switch } from 'react-router-dom';
import ConditionalRoute from './components/ConditionalRoute';
import LoginPage from './components/LoginPage/LoginPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Explore from './components/Explore/Explore';
import Playlists from './components/Playlists/Playlists';

function App() {
	const [isAuth, setIsAuth] = useState(false);

	const tracks = [
		{
			title: 'Detergent',
			artist: 'Dylan Sitts',
			audioSrc: '/assets/det.mp3',
			imageSrc:
				'https://d34qmkt8w5wll9.cloudfront.net/commercial-releases/cover_art/jpeg/3730.jpg'
		},
		{
			title: 'Hot Heat',
			artist: 'Youtube Audio Library',
			audioSrc: '/assets/hh.mp3',
			imageSrc: 'https://source.unsplash.com/random/200x200'
		},
		{
			title: 'Waiting For Nothing',
			artist: 'Day Wave',
			audioSrc: '/assets/wfn.mp3',
			imageSrc: 'https://source.unsplash.com/random/201x201'
		},
		{
			title: 'Sky High',
			artist: 'Electronomia',
			audioSrc: '/assets/sh.mp3',
			imageSrc:
				'https://linkstorage.linkfire.com/medialinks/images/27a334a4-35f8-45f1-980f-6dc187a2132e/artwork-440x440.jpg'
		},
		{
			title: 'Another World',
			artist: 'Vybloom',
			audioSrc: '/assets/aw.mp3',
			imageSrc: 'https://source.unsplash.com/random/199x199'
		}
	];

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
							A Playlist
						</ConditionalRoute>
					</Switch>
					<Footer tracks={tracks} />
				</ConditionalRoute>
			</Switch>
		</>
	);
}

export default App;
