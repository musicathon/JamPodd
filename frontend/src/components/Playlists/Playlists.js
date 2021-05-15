import './Playlists.css';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';

const Playlists = ({ playlists }) => {
	return (
		<main>
			<h4>Playlists</h4>

			<div className='playlists'>
				<article className='playlist add-playlist'>
					<div className='add-playlist__icon-cntr'>
						<IoMdAdd />
					</div>
				</article>
				{playlists.map((playlist, index) => (
					<article className='playlist' key={index}>
						<div className='playlist__img-cntr'>
							<img src={playlist.imgSrc} alt='playlist art' />
						</div>

						<div className='playlist__info'>
							<div className='playlist__title-cntr'>
								<h2>{playlist.title}</h2>
							</div>

							<div className='playlist__extra'>
								<span className='playlist__song-count'>
									{playlist.songCount} Songs
								</span>
								<button className='playlist__btn'>
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
