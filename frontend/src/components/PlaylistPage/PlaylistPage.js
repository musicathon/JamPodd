import './PlaylistPage.css';
import SongFull from '../SongFull/SongFull';
import { AiFillPlayCircle } from 'react-icons/ai';
import { IoShuffleOutline } from 'react-icons/io5';

const PlaylistPage = ({ playlistToPlay, setStartingIndex }) => {
	// get from backend
	const playlist = {
		title: 'Indie',
		songCount: 65,
		tracks: [
			{
				title: 'Detergent',
				artist: 'Dylan Sitts',
				album: 'Venture',
				duration: { min: 6, sec: 5 },
				audioSrc: 'http://130.211.5.196/det.mp3',
				imageSrc:
					'https://d34qmkt8w5wll9.cloudfront.net/commercial-releases/cover_art/jpeg/3730.jpg'
			},
			{
				title: 'Hot Heat',
				artist: 'Topher Mohr',
				album: 'Youtube Audio Library',
				duration: { min: 3, sec: 24 },
				audioSrc: 'http://130.211.5.196/hh.mp3',
				imageSrc: 'https://source.unsplash.com/random/200x200'
			},
			{
				title: 'Waiting For Nothing',
				artist: 'Day Wave',
				album: 'Waiting For Nothing',
				duration: { min: 2, sec: 56 },
				audioSrc: 'http://130.211.5.196/wfn.mp3',
				imageSrc: 'https://source.unsplash.com/random/201x201'
			},
			{
				title: 'Sky High',
				artist: 'Electronomia',
				album: 'NCS Release',
				duration: { min: 5, sec: 24 },
				audioSrc: 'http://130.211.5.196/sh.mp3',
				imageSrc:
					'https://linkstorage.linkfire.com/medialinks/images/27a334a4-35f8-45f1-980f-6dc187a2132e/artwork-440x440.jpg'
			},
			{
				title: 'Another World',
				artist: 'Vybloom',
				album: 'No Limits',
				duration: { min: 4, sec: 20 },
				audioSrc: 'http://130.211.5.196/aw.mp3',
				imageSrc: 'https://source.unsplash.com/random/199x199'
			}
		],
		imgSrc: 'https://source.unsplash.com/random/'
	};

	return (
		<main className='plpage__main'>
			<div className=' plinfo'>
				<h4>Playlist</h4>

				<div className='plinfo__img-cntr'>
					<img src={playlist.imgSrc} alt='' />
				</div>

				<h1 className='plinfo__title'>{playlist.title}</h1>

				<div className='plinfo__extra'>
					<span className='plinfo__song-count'>{playlist.songCount} Songs</span>
					<div className='plinfo__btns'>
						<button className='plinfo__btn --shuffle'>
							<IoShuffleOutline />
						</button>
						<button className='plinfo__btn --play'>
							<AiFillPlayCircle />
						</button>
					</div>
				</div>
			</div>
			<div className='songlist'>
				{playlist.tracks.map((track, index) => (
					<SongFull
						song={track}
						key={index}
						onPlay={() => {
							playlistToPlay.current = playlist.tracks;
							setStartingIndex(index);
						}}
					/>
				))}
			</div>
		</main>
	);
};

export default PlaylistPage;
