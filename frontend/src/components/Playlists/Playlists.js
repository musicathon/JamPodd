import './Playlists.css';
import { useState, useEffect } from 'react';
import playlistsDS from '../../utils/PlaylistsDS';
import { Link } from 'react-router-dom';
import { MdModeEdit } from 'react-icons/md';
import { IoMdAdd, IoMdCheckmark } from 'react-icons/io';
import { CgTrashEmpty } from 'react-icons/cg';
import { IoClose } from 'react-icons/io5';

const Playlists = () => {
	const [playlists, setPlaylists] = useState([]);

	const refreshPlaylists = async () =>
		await playlistsDS
			.getAll()
			.then((res) => setPlaylists(res.data.playlistList))
			.catch((e) => console.error(e));

	useEffect(() => refreshPlaylists(), []);

	const [showPlForm, setShowPlForm] = useState(false);
	const [formPlName, setFormPlName] = useState('');
	const [isEditing, setIsEditing] = useState(false);
	const [editingPlaylistId, setEditingPlaylistId] = useState();

	const showPopup = (plId) => {
		if (plId) {
			setFormPlName(playlists.find((playlist) => playlist._id === plId).title);
			setIsEditing(true);
			setEditingPlaylistId(plId);
		} else {
			setFormPlName('');
			setIsEditing(false);
			setEditingPlaylistId(undefined);
		}

		setShowPlForm(true);
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		if (isEditing)
			await playlistsDS
				.edit(editingPlaylistId, formPlName)
				.catch((e) => console.error(e));
		else await playlistsDS.create(formPlName).catch((e) => console.error(e));

		refreshPlaylists();
		setShowPlForm(false);
	};

	const onDelete = async () => {
		await playlistsDS.delete(editingPlaylistId).catch((e) => console.error(e));

		refreshPlaylists();
		setShowPlForm(false);
	};

	const onCancel = () => {
		setFormPlName('');
		setIsEditing(false);
		setEditingPlaylistId(undefined);
		setShowPlForm(false);
	};

	return (
		<>
			<form
				onSubmit={onSubmit}
				className={`plform popup ${showPlForm ? '--shown' : ''}`}
			>
				<h2>{isEditing ? 'Edit' : 'Create a'} Playlist</h2>

				<input
					type='text'
					name='name'
					id='name'
					maxLength='24'
					placeholder='Enter Name'
					required
					value={formPlName}
					onChange={(e) => setFormPlName(e.target.value)}
				/>

				<div className='plform__btns'>
					<button type='button' className='btn --cancel' onClick={onCancel}>
						<IoClose />
						<span>Cancel</span>
					</button>

					{isEditing && (
						<button type='button' className='btn --delete' onClick={onDelete}>
							<CgTrashEmpty />
							<span>Delete</span>
						</button>
					)}

					<button type='submit' className='btn --submit'>
						{isEditing ? <IoMdCheckmark /> : <IoMdAdd />}
						<span>{isEditing ? 'Edit' : 'Create'}</span>
					</button>
				</div>
			</form>

			<main
				className={`playlists__main popup__behind 
				${showPlForm ? '--defocus' : ''}`}
			>
				<h4>Playlists</h4>

				<div className='playlists__list'>
					<button className='plcard addplcard' onClick={() => showPopup()}>
						<IoMdAdd />
					</button>

					{playlists.map((playlist) => (
						<article className='plcard' key={playlist._id}>
							<Link to='/playlist' className='plcard__img-cntr'>
								<img
									src={playlist.imageSrc || 'no-pl-img.jpg'}
									alt='playlist art'
								/>
							</Link>

							<div className='plcard__info'>
								<Link to='/playlist' className='plcard__title-cntr'>
									<h2>{playlist.title}</h2>
								</Link>

								<div className='plcard__extra'>
									<span className='plcard__song-count'>
										{playlist.tracks ? playlist.tracks.length : 0}
										{' Songs'}
									</span>

									<button
										className='plcard__btn'
										onClick={() => showPopup(playlist._id)}
									>
										<MdModeEdit />
									</button>
								</div>
							</div>
						</article>
					))}
				</div>
			</main>
		</>
	);
};

export default Playlists;
