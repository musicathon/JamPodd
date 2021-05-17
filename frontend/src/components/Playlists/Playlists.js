import './Playlists.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdModeEdit } from 'react-icons/md';
import { IoMdAdd } from 'react-icons/io';
import { AiFillDelete } from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';

const Playlists = () => {
	// transition on mount
	const [isMainShown, setIsMainShown] = useState(false);
	useEffect(() => setTimeout(() => setIsMainShown(true), 25), []);

	const [formPlName, setFormPlName] = useState('');
	const [formPlImgSrc, setFormPlImgSrc] = useState('');

	const [showPlForm, setShowPlForm] = useState(false);

	// create new playlist
	const create = () => {
		setFormPlName('');
		setFormPlImgSrc('');
		setIsEditing(false);
		setShowPlForm(true);
	};

	// edit existing playlist
	const [isEditing, setIsEditing] = useState(false);
	const edit = (plId) => {
		setFormPlName(playlists[plId].title);
		setFormPlImgSrc(playlists[plId].imgSrc);
		setIsEditing(true);
		setShowPlForm(true);
	};

	// get from backend
	const playlists = [
		{
			title: 'Indie',
			songCount: 65,
			imgSrc: 'https://source.unsplash.com/random/'
		},
		{
			title: 'Truth or Consequences',
			songCount: 9,
			imgSrc: 'https://media.pitchfork.com/photos/5e6bb1b2690af00008f803fa/1:1/w_600/Truth%20or%20Consequences_Yumi%20Zouma.jpg'
		},
		{
			title: 'Safety',
			songCount: 6,
			imgSrc: 'https://i1.sndcdn.com/artworks-vXenm8RPv3AE8grN-5tyRHQ-t500x500.jpg'
		},
		{
			title: 'lofi',
			songCount: 47,
			imgSrc: 'https://is2-ssl.mzstatic.com/image/thumb/Music124/v4/eb/09/35/eb0935a7-d940-2583-51ca-ed4007752e3b/cover.jpg/400x400bb.jpeg'
		},
		{
			title: 'Attack on Titan',
			songCount: 7,
			imgSrc: 'https://wallpaperaccess.com/full/279058.jpg'
		}
	];

	return (
		<>
			<form action='' className={`plform ${showPlForm ? '--shown' : ''}`}>
				<h2>{isEditing ? 'Edit' : 'Create a'} Playlist</h2>
				<div className='plform__cntr'>
					<label htmlFor='name'>Playlist Name</label>
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
				</div>
				<div className='plform__cntr'>
					<label htmlFor='imgsrc'>Image URL</label>
					<input
						type='url'
						name='imgsrc'
						id='imgsrc'
						placeholder='Leave empty for random img'
						value={formPlImgSrc}
						onChange={(e) => setFormPlImgSrc(e.target.value)}
					/>
				</div>
				<div className='plform__cntr --row'>
					{isEditing && (
						<button className='btn --delete'>
							<AiFillDelete />
							<span>Delete</span>
						</button>
					)}
					<button
						type='button'
						className='btn --cancel'
						onClick={() => setShowPlForm(false)}
					>
						<IoClose />
						<span>Cancel</span>
					</button>
					<button type='button' className='btn --submit'>
						<IoMdAdd />
						<span>Create</span>
					</button>
				</div>
			</form>

			<main
				className={`playlists__main ${isMainShown ? '--shown' : ''}
				${showPlForm ? '--blur' : ''}`}
			>
				<h4>Playlists</h4>

				<div className='playlists__list'>
					<button className='plcard addplcard' onClick={create}>
						<IoMdAdd />
					</button>
					{playlists.map((playlist, index) => (
						<article className='plcard' key={index}>
							<div className='plcard__img-cntr'>
								<img src={playlist.imgSrc} alt='playlist art' />
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
