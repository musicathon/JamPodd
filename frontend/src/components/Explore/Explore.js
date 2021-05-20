import './Explore.css';
import songsDS from '../../utils/songsDS';
import playlistsDS from '../../utils/PlaylistsDS';
import { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoMdAdd } from 'react-icons/io';
import { IoPlay, IoClose } from 'react-icons/io5';

const Explore = ({ setCurrentTrackIndex, setCurrentTrackList }) => {
	const [queriedTracks, setQueriedTracks] = useState(); // server response
	const [query, setQuery] = useState('');

	const [checkedSongs, setCheckedSongs] = useState({});
	const [isAnySongChecked, setIsAnySongChecked] = useState(false);

	const [playlists, setPlaylists] = useState();
	const [showPlSelector, setShowPlSelector] = useState(false);

	const onSearch = async (e) => {
		e.preventDefault();

		await songsDS
			.getByKeyword(query)
			.then((res) => setQueriedTracks(res.data.songs))
			.catch((e) => console.error(e));
	};

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
		setCurrentTrackList(queriedTracks);
		setCurrentTrackIndex(index);
	};

	let searchResults;
	if (queriedTracks) {
		// If server actually responded with a tracks array
		if (queriedTracks.length > 0) {
			// If the tracks array has any results
			searchResults = (
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
						{queriedTracks.map((track, index) => (
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
			);
		} else {
			searchResults = <h2 className='error'>No Results Found</h2>;
		}
	} else {
		// If the server failed to return an array of 0 or more results
		searchResults = '';
	}

	return (
		<>
			<div className={`selectpl popup ${showPlSelector ? '--shown' : ''}`}>
				<h2>Select a Playlist</h2>

				{playlists ? (
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

				<form onSubmit={onSearch} className='search'>
					<input
						type='text'
						onChange={(e) => setQuery(e.target.value)}
						value={query}
					/>
					<button type='submit'>
						<AiOutlineSearch />
					</button>
				</form>

				{searchResults}
			</main>
		</>
	);
};

export default Explore;
