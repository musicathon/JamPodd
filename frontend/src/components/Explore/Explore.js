import './Explore.css';
import { useState, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoMdAdd } from 'react-icons/io';
import { IoPlay } from 'react-icons/io5';

const Explore = () => {
	// transition on mount
	const [isShown, setIsShown] = useState(false);
	useEffect(() => setTimeout(() => setIsShown(true), 25), []);

	const [checkedSongs, setCheckedSongs] = useState({});
	const [isAnySongChecked, setIsAnySongChecked] = useState(false);

	const onCheck = (e) => {
		const newObj = checkedSongs;
		newObj[e.target.name] = e.target.checked;
		setCheckedSongs(newObj);

		setIsAnySongChecked(Object.values(checkedSongs).some((value) => value === true));
	};

	const onPlay = () => {};

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
		<main className={`explore__main ${isShown ? '--shown' : ''}`}>
			<h4>Explore</h4>

			<form action='' className='search'>
				<input type='text' />
				<button type='button'>
					<AiOutlineSearch />
				</button>
			</form>

			<div className='addtopl'>
				<span className='addtopl__prompt'>Select Songs to Add to a Playlist</span>
				<button
					type='button'
					className='btn --submit'
					disabled={isAnySongChecked ? false : true}
				>
					<IoMdAdd />
					<span>Add to Playlist</span>
				</button>
			</div>

			<form className='results'>
				{playlist.tracks.map((track, index) => (
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
								<span className='songsmall__name'>{track.title}</span>
								<span className='songsmall__artist'>{track.artist}</span>
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
			</form>
		</main>
	);
};

export default Explore;
