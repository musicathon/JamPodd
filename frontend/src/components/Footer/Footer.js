import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './Footer.css';
import { AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai';
import { BiSkipNext, BiSkipPrevious } from 'react-icons/bi';
import {
	IoShuffleOutline,
	IoRepeatOutline,
	IoVolumeOff,
	IoVolumeLow,
	IoVolumeMedium,
	IoVolumeHigh
} from 'react-icons/io5';

const Footer = ({
	currentTrackIndex,
	setCurrentTrackIndex,
	doShuffle,
	setDoShuffle,
	currentTrackList
}) => {
	const [trackProgress, setTrackProgress] = useState(0); // stores track progress in seconds
	const [volume, setVolume] = useState(0.75); // stores volume
	const [isPlaying, setIsPlaying] = useState(false); // play/pause state
	const [doRepeat, setDoRepeat] = useState(false); // repeat state. when true, repeats the same track

	const { title, artist, audioSrc, imageSrc } = currentTrackList[currentTrackIndex]; // get current track info

	const audioRef = useRef(new Audio(audioSrc)); // current track Audio object
	const intervalRef = useRef(); // stores IDs of setInterval

	// autoplayback and seek-bar updater
	const stopUpdatingSeek = () => clearInterval(intervalRef.current);

	const startUpdatingSeek = () => {
		// Clears any currently running updaters
		stopUpdatingSeek();

		// checks every second if the song has ended, and updates the seek bar.
		intervalRef.current = setInterval(() => {
			if (audioRef.current.ended) toNextTrack();
			else setTrackProgress(audioRef.current.currentTime);
		}, [500]);
	};

	useEffect(() => {
		if (isPlaying) {
			audioRef.current.play();
			startUpdatingSeek();
		} else {
			audioRef.current.pause();
			stopUpdatingSeek();
		}

		// stfu linter:
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isPlaying]);

	// refresh audioref and play it
	const refreshAudio = () => {
		audioRef.current.volume = volume;
		audioRef.current
			.play()
			.then(() => {
				setIsPlaying(true);
				startUpdatingSeek();
			})
			.catch((e) => null);
	};

	// change tracks
	const toPrevTrack = () => {
		if (trackProgress > 5 || doRepeat) {
			audioRef.current.currentTime = 0;
			refreshAudio();
		} else if (doShuffle) setCurrentTrackIndex(getRandomTrackIndex());
		else if (currentTrackIndex === 0)
			setCurrentTrackIndex(currentTrackList.length - 1);
		else setCurrentTrackIndex(currentTrackIndex - 1);
	};

	const toNextTrack = () => {
		if (doRepeat) {
			audioRef.current.currentTime = 0;
			refreshAudio();
		} else if (doShuffle) setCurrentTrackIndex(getRandomTrackIndex());
		else if (currentTrackIndex === currentTrackList.length - 1)
			setCurrentTrackIndex(0);
		else setCurrentTrackIndex(currentTrackIndex + 1);
	};

	const getRandomTrackIndex = () => {
		// prevent infinite loop when currentTrackList has 1 song or less
		if (currentTrackList.length <= 1) return currentTrackIndex;

		let randomTrackIndex;

		do {
			randomTrackIndex = Math.floor(Math.random() * currentTrackList.length);
		} while (randomTrackIndex === currentTrackIndex);

		return randomTrackIndex;
	};

	// reset audio source when currentTrackIndex or currentTrackList change
	useEffect(() => {
		audioRef.current = new Audio(audioSrc);
		refreshAudio();

		// reload audioRef
		return () => audioRef.current.load();

		// stfu linter:
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentTrackIndex, currentTrackList]);

	// scrubbing functionality
	const onSeek = (value) => {
		stopUpdatingSeek();

		audioRef.current.currentTime = value;
		setTrackProgress(value);
	};

	const onSeekEnd = () => {
		// If not already playing, start
		if (!isPlaying) setIsPlaying(true);

		startUpdatingSeek();
	};

	const toggleMute = () => (volume === 0 ? setVolume(0.75) : setVolume(0));
	useEffect(() => (audioRef.current.volume = volume), [volume]);

	const parseTime = (timeInSec) => {
		if (!timeInSec) return NaN;

		const mins = Math.floor(timeInSec / 60).toString();
		const seconds = Math.floor(timeInSec % 60)
			.toString()
			.padStart(2, '0');

		return `${mins}:${seconds}`;
	};

	// get % of track progress
	const { duration } = audioRef.current;
	const trackPerc = duration ? (trackProgress / duration) * 100 : 0,
		volumePerc = volume * 100;

	let volumeIcon;
	if (volume > 0.75) volumeIcon = <IoVolumeHigh />;
	else if (volume > 0.35) volumeIcon = <IoVolumeMedium />;
	else if (volume > 0) volumeIcon = <IoVolumeLow />;
	else volumeIcon = <IoVolumeOff />;

	// range input styling because css sux
	const seekStyle = `
  		-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${trackPerc}%, #ef3355), color-stop(${trackPerc}%, rgba(218, 218, 218, 0.2)))
		`;

	const volumeBarStyle = `
  		-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${volumePerc}%, #ef3355), color-stop(${volumePerc}%, rgba(218, 218, 218, 0.2)))
		`;

	return (
		<footer>
			<div className='songsmall'>
				<div className='songsmall__img-cntr'>
					<img src={imageSrc} alt='song art' />
				</div>
				<div className='songsmall__info'>
					<span className='songsmall__name'>{title}</span>
					<span className='songsmall__artist'>{artist}</span>
				</div>
			</div>

			<div className='player'>
				<div className='player__btns'>
					<button
						className={`player__btn --tertiary 
						${doRepeat ? '--active' : ''}`}
						onClick={() => setDoRepeat(!doRepeat)}
					>
						<IoRepeatOutline />
					</button>
					<button className='player__btn --secondary' onClick={toPrevTrack}>
						<BiSkipPrevious />
					</button>
					<button
						className={`player__btn --primary ${isPlaying ? '--active' : ''}`}
						onClick={() => setIsPlaying(!isPlaying)}
					>
						{isPlaying ? <AiFillPauseCircle /> : <AiFillPlayCircle />}
					</button>
					<button className='player__btn --secondary' onClick={toNextTrack}>
						<BiSkipNext />
					</button>
					<button
						className={`player__btn --tertiary 
						${doShuffle ? '--active' : ''}`}
						onClick={() => setDoShuffle(!doShuffle)}
					>
						<IoShuffleOutline />
					</button>
				</div>
				<div className='player__bar'>
					<span className='player__duration'>
						{parseTime(trackProgress) || '0:00'}
					</span>
					<input
						type='range'
						value={trackProgress}
						step='0.5'
						min='0'
						max={duration ? duration : ``}
						style={{ background: seekStyle }}
						className='bar'
						onChange={(e) => onSeek(e.target.value)}
						onMouseUp={onSeekEnd}
						onKeyUp={onSeekEnd}
					/>
					<span className='player__duration'>
						{parseTime(duration) || '0:00'}
					</span>
				</div>
			</div>

			<div className='volume'>
				<button className='volume__btn' onClick={toggleMute}>
					{volumeIcon}
				</button>
				<input
					type='range'
					value={volume}
					step='0.02'
					min='0'
					max='1'
					style={{ background: volumeBarStyle }}
					className='volume__bar bar'
					onChange={(e) => setVolume(e.target.value)}
				/>
			</div>
		</footer>
	);
};

Footer.propTypes = {
	currentTrackIndex: PropTypes.number,
	setCurrentTrackIndex: PropTypes.func.isRequired,
	currentTrackList: PropTypes.array.isRequired
};

export default Footer;
