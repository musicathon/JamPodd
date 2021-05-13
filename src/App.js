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
