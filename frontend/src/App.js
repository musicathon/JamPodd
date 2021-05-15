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
	const [isAuth, setIsAuth] = useState(true);

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

	const playlists = [
		{
			title: 'Indie',
			songCount: 65,
			imgSrc: 'https://source.unsplash.com/random/'
		},
		{
			title: 'Truth or Consequences',
			songCount: 9,
			imgSrc: 'https://media.pitchfork.com/photos/5e6bb1b2690af00008f803fa/1:1/w_600/Truth%20or%20Consequences_Yumi%20Zouma.jpg'
		},
		{
			title: 'Safety',
			songCount: 6,
			imgSrc: 'https://i1.sndcdn.com/artworks-vXenm8RPv3AE8grN-5tyRHQ-t500x500.jpg'
		},
		{
			title: 'lofi',
			songCount: 47,
			imgSrc: 'https://is2-ssl.mzstatic.com/image/thumb/Music124/v4/eb/09/35/eb0935a7-d940-2583-51ca-ed4007752e3b/cover.jpg/400x400bb.jpeg'
		},
		{
			title: 'Attack on Titan',
			songCount: 7,
			imgSrc: 'https://wallpaperaccess.com/full/279058.jpg'
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
							<Playlists playlists={playlists} />
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
