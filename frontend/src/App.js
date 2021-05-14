import './App.css';
import Footer from './components/Footer/Footer';
import LoginHook from './components/LoginHook';
import LogoutHook from './components/LogoutHook';

function App() {
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
			<LoginHook />
			<br></br>
			<LogoutHook />
			<Footer tracks={tracks} startingIndex={0} />
		</>
	);
}

export default App;
