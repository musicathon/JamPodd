import './App.css';
import Footer from './components/Footer/Footer';

function App() {
	const tracks = [
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
			imageSrc: 'https://linkstorage.linkfire.com/medialinks/images/27a334a4-35f8-45f1-980f-6dc187a2132e/artwork-440x440.jpg'
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
			<Footer tracks={tracks} startingIndex={0} />
		</>
	);
}

export default App;
