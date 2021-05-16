import './Playlists.css';
import { Link } from 'react-router-dom';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';

const Playlists = () => {
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
		<main className='playlists__main'>
			<h4>Playlists</h4>

			<div className='playlists__list'>
				<button className='plcard addpl'>
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
								<button className='plcard__btn'>
									<BiDotsHorizontalRounded />
								</button>
							</div>
						</div>
					</article>
				))}
			</div>
		</main>
	);
};

export default Playlists;
