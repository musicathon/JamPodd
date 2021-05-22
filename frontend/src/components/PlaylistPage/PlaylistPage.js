import './PlaylistPage.css';
import { useParams } from 'react-router-dom';
import playlistsDS from '../../utils/PlaylistsDS';
import songsDS from '../../utils/songsDS';
import { AiFillPlayCircle } from 'react-icons/ai';
import { CgTrashEmpty } from 'react-icons/cg';
import { IoShuffleOutline, IoPlay } from 'react-icons/io5';
import { useEffect, useState } from 'react';

const PlaylistPage = ({ setCurrentTrackIndex, setCurrentTrackList, setDoShuffle }) => {
	const { id: plId } = useParams();
	const [playlist, setPlaylist] = useState({});
	const [tracks, setTracks] = useState([]);

	const refreshPlaylist = async () => {
		const trackIds = await playlistsDS
			.getById(plId)
			.then((res) => {
				setPlaylist(res.data);
				return res.data.tracks;
			})
			.catch((e) => console.error(e));

		if (trackIds && trackIds.length > 0)
			songsDS
				.getByIds(trackIds)
				.then((res) => setTracks(res.data.songs))
				.catch((e) => console.error(e));
		else setTracks([]);
	};

	// stfu linter:
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => refreshPlaylist(), []);

	const onPlay = (index) => {
		setCurrentTrackList(tracks);
		setCurrentTrackIndex(index);
	};

	const onShuffle = () => {
		setDoShuffle(true);
		onPlay(Math.floor(Math.random() * tracks.length));
	};

	const onDelete = async (id) => {
		const updatedTrackIds = playlist.tracks.filter((trackId) => trackId !== id);
		await playlistsDS
			.edit({ id: playlist._id, tracks: updatedTrackIds })
			.catch((e) => console.error(e));
		refreshPlaylist();
	};

	return (
		<main className='plpage__main'>
			<div className=' plinfo'>
				<h4>Playlist</h4>

				<div className='plinfo__img-cntr'>
					<img src={playlist.imageSrc || '/no-pl-img.jpg'} alt='' />
				</div>

				<h1 className='plinfo__title'>{playlist.title}</h1>

				<div className='plinfo__extra'>
					<span className='plinfo__song-count'>{tracks.length} Songs</span>

					<div className='plinfo__btns'>
						<button
							className='plinfo__btn --shuffle'
							disabled={!tracks.length}
							onClick={onShuffle}
						>
							<IoShuffleOutline />
						</button>
						<button
							className='plinfo__btn --play'
							disabled={!tracks.length}
							onClick={() => onPlay(0)}
						>
							<AiFillPlayCircle />
						</button>
					</div>
				</div>
			</div>

			<div className='songlist'>
				{tracks.map((track, index) => (
					<div className={`songfull`} key={track._id}>
						<div className='songfull__cntr songsmall'>
							<div className='songsmall__img-cntr'>
								<img src={track.imageSrc} alt='song art' />
								<button
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

						<div className='songfull__cntr --fixed-width'>
							<button
								className='songfull__btn --delete'
								onClick={() => onDelete(track._id)}
							>
								<CgTrashEmpty />
							</button>

							<span className='songfull__duration'>
								{track.duration.min}:
								{track.duration.sec.toString().padStart(2, '0')}
							</span>
						</div>
					</div>
				))}
				<span className='songlist__addmore'>Add Songs from the Explore tab!</span>
			</div>
		</main>
	);
};

export default PlaylistPage;
