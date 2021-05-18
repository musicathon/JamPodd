import './Explore.css';
import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoMdAdd } from 'react-icons/io';
import { IoPlay, IoClose } from 'react-icons/io5';

const Explore = ({ setCurrentTrackIndex, setCurrentTrackList }) => {
	// get from backend
	const tracks = [
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
	];

	const playlists = [
		{
			title: 'Indie',
			songCount: 65,
			imageSrc: 'https://source.unsplash.com/random/'
		},
		{
			title: 'Truth or Consequences',
			songCount: 9,
			imageSrc:
				'https://media.pitchfork.com/photos/5e6bb1b2690af00008f803fa/1:1/w_600/Truth%20or%20Consequences_Yumi%20Zouma.jpg'
		},
		{
			title: 'Safety',
			songCount: 6,
			imageSrc:
				'https://i1.sndcdn.com/artworks-vXenm8RPv3AE8grN-5tyRHQ-t500x500.jpg'
		},
		{
			title: 'lofi',
			songCount: 47,
			imageSrc:
				'https://is2-ssl.mzstatic.com/image/thumb/Music124/v4/eb/09/35/eb0935a7-d940-2583-51ca-ed4007752e3b/cover.jpg/400x400bb.jpeg'
		},
		{
			title: 'Attack on Titan',
			songCount: 7,
			imageSrc: 'https://wallpaperaccess.com/full/279058.jpg'
		}
	];

	const [query, setQuery] = useState('');
	const [checkedSongs, setCheckedSongs] = useState({});
	const [isAnySongChecked, setIsAnySongChecked] = useState(false);

	const [showPlSelector, setShowPlSelector] = useState(false);

	const onCheck = (e) => {
		const newObj = checkedSongs;
		newObj[e.target.name] = e.target.checked;
		setCheckedSongs(newObj);

		setIsAnySongChecked(Object.values(checkedSongs).some((value) => value === true));
	};

	const onPlSelect = (index) => {
		// send index and checkedSongs to backend
		setShowPlSelector(false);
	};

	const onPlay = (index) => {
		setCurrentTrackList(tracks);
		setCurrentTrackIndex(index);
	};

	return (
		<>
			<div className={`selectpl popup ${showPlSelector ? '--shown' : ''}`}>
				<h2>Select a Playlist</h2>

				{playlists.length > 0 ? (
					<div className='selectpl__cntr'>
						{playlists.map((playlist, index) => (
							<button
								type='button'
								className='selectpl__pl'
								key={index}
								onClick={() => onPlSelect(index)}
							>
								<div className='selectpl__img-cntr'>
									<img src={playlist.imageSrc} alt='playlist art' />
								</div>

								<span className='selectpl__title'>{playlist.title}</span>
							</button>
						))}
					</div>
				) : (
					<span className='error'>No Playlists Created</span>
				)}

				<button
					type='button'
					className='btn --cancel'
					onClick={() => setShowPlSelector(false)}
				>
					<IoClose />
					<span>Cancel</span>
				</button>
			</div>

			<main
				className={`explore__main popup__behind 
				${showPlSelector ? '--defocus' : ''}`}
			>
				<h4>Explore</h4>

				<form onSubmit={(e) => e.preventDefault()} className='search'>
					<input
						type='text'
						onChange={(e) => setQuery(e.target.value)}
						value={query}
					/>
					<button type='submit'>
						<AiOutlineSearch />
					</button>
				</form>

				{tracks.length > 0 ? (
					<>
						<div className='addtopl'>
							<span className='addtopl__prompt'>
								Select Songs to Add to a Playlist
							</span>
							<button
								type='button'
								className='btn --submit'
								disabled={isAnySongChecked ? false : true}
								onClick={() => setShowPlSelector(true)}
							>
								<IoMdAdd />
								<span>Add to Playlist</span>
							</button>
						</div>
						<div className='results'>
							{tracks.map((track, index) => (
								<div className={`songfull`} key={index}>
									<div className='songfull__cntr songsmall'>
										<div className='songsmall__img-cntr'>
											<img src={track.imageSrc} alt='song art' />
											<button
												type='button'
												className='songfull__btn --play'
												onClick={() => onPlay(index)}
											>
												<IoPlay />
											</button>
										</div>

										<div className='songsmall__info'>
											<span className='songsmall__name'>
												{track.title}
											</span>
											<span className='songsmall__artist'>
												{track.artist}
											</span>
										</div>
									</div>

									<span className='songfull__cntr songfull__album'>
										{track.album}
									</span>

									<input
										className='songfull__cntr songfull__checkbox'
										type='checkbox'
										name={index}
										onChange={onCheck}
									/>
								</div>
							))}
						</div>
					</>
				) : (
					<h2 className='error'>No Results Found</h2>
				)}
			</main>
		</>
	);
};

export default Explore;
