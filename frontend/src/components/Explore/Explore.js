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

	const onAddPlClick = async () => {
		setShowPlSelector(true);

		await playlistsDS
			.getAll()
			.then((res) => {
				setPlaylists(res.data.playlistList);
			})
			.catch((e) => console.error(e));
	};

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

	const onPlSelect = async (id) => {
		setShowPlSelector(false);

		const playlist = playlists.find((playlist) => playlist._id === id);
		let trackIds = playlist.tracks || [],
			newTrackIds = Object.keys(checkedSongs).filter((key) => checkedSongs[key]);

		newTrackIds = newTrackIds.filter((newTrackId) => !trackIds.includes(newTrackId));
		trackIds.push(...newTrackIds);

		await playlistsDS.edit(playlist._id, trackIds).catch((e) => console.error(e));
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
							onClick={onAddPlClick}
						>
							<IoMdAdd />
							<span>Add to Playlist</span>
						</button>
					</div>
					<div className='results'>
						{queriedTracks.map((track, index) => (
							<div className={`songfull`} key={track._id}>
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
									name={track._id}
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

				{playlists && playlists.length > 0 ? (
					<div className='selectpl__cntr'>
						{playlists.map((playlist) => (
							<button
								type='button'
								className='selectpl__pl'
								key={playlist._id}
								onClick={() => onPlSelect(playlist._id)}
							>
								<div className='selectpl__img-cntr'>
									<img
										src={playlist.imageSrc || 'no-pl-img.jpg'}
										alt='playlist art'
									/>
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
