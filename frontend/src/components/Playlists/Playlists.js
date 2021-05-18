import './Playlists.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdModeEdit } from 'react-icons/md';
import { IoMdAdd, IoMdCheckmark } from 'react-icons/io';
import { AiFillDelete } from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';

const Playlists = () => {
	// transition on mount
	const [isMainShown, setIsMainShown] = useState(false);
	useEffect(() => setTimeout(() => setIsMainShown(true), 25), []);

	const [formPlName, setFormPlName] = useState('');
	const [showPlForm, setShowPlForm] = useState(false);

	// create new playlist
	const create = () => {
		setFormPlName('');
		setIsEditing(false);
		setShowPlForm(true);
	};

	// edit existing playlist
	const [isEditing, setIsEditing] = useState(false);
	const edit = (plId) => {
		setFormPlName(playlists[plId].title);
		setIsEditing(true);
		setShowPlForm(true);
	};

	// get from backend
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

	return (
		<>
			<form
				onSubmit={(e) => e.preventDefault()}
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
					<button
						type='button'
						className='btn --cancel'
						onClick={() => setShowPlForm(false)}
					>
						<IoClose />
						<span>Cancel</span>
					</button>

					{isEditing && (
						<button type='button' className='btn --delete'>
							<AiFillDelete />
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
				className={`playlists__main popup__behind ${isMainShown ? '--shown' : ''}
				${showPlForm ? '--defocus' : ''}`}
			>
				<h4>Playlists</h4>

				<div className='playlists__list'>
					<button className='plcard addplcard' onClick={create}>
						<IoMdAdd />
					</button>

					{playlists.map((playlist, index) => (
						<article className='plcard' key={index}>
							<div className='plcard__img-cntr'>
								<img src={playlist.imageSrc} alt='playlist art' />
							</div>

							<div className='plcard__info'>
								<Link to='/playlist' className='plcard__title-cntr'>
									<h2>{playlist.title}</h2>
								</Link>

								<div className='plcard__extra'>
									<span className='plcard__song-count'>
										{playlist.songCount} Songs
									</span>

									<button
										className='plcard__btn'
										onClick={() => edit(index)}
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
