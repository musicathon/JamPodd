import { useState } from 'react';
import './SongFull.css';
import { AiFillDelete } from 'react-icons/ai';
import { IoPlay } from 'react-icons/io5';

const SongFull = ({ song, onPlay }) => {
	const [isHovering, setIsHovering] = useState(false);

	return (
		<div
			className={`songfull ${isHovering ? '--hover' : ''}`}
			onMouseOver={() => setIsHovering(true)}
			onMouseOut={() => setIsHovering(false)}
		>
			<div className='songfull__cntr --expand songsmall'>
				<div className='songsmall__img-cntr'>
					<img src={song.imageSrc} alt='song art' />
					<button className='songfull__btn --play' onClick={onPlay}>
						<IoPlay />
					</button>
				</div>
				<div className='songsmall__info'>
					<span className='songsmall__name'>{song.title}</span>
					<span className='songsmall__artist'>{song.artist}</span>
				</div>
			</div>

			<span className='songfull__cntr --expand songfull__album'>{song.album}</span>

			<div className='songfull__cntr --placeholder'>
				{isHovering ? (
					<button className='songfull__btn --delete'>
						<AiFillDelete />
					</button>
				) : (
					<span className='songfull__duration'>
						{song.duration.min}:
						{song.duration.sec.toString().padStart(2, '0')}
					</span>
				)}
			</div>
		</div>
	);
};

export default SongFull;
