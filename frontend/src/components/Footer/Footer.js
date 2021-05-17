// TODO: Add shuffle, duration

import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './Footer.css';
import { AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai';
import { BiSkipNext, BiSkipPrevious } from 'react-icons/bi';
import { IoShuffleOutline, IoRepeatOutline, IoVolumeMedium } from 'react-icons/io5';

const Footer = ({ currentTrackIndex, setCurrentTrackIndex, currentTrackList }) => {
	// animate on mount
	const [isShown, setIsShown] = useState(false);
	useEffect(() => setInterval(setIsShown(true), 25), []);

	const [trackProgress, setTrackProgress] = useState(0); // stores track progress in seconds
	const [volume, setVolume] = useState(0.75); // stores volume
	const [isPlaying, setIsPlaying] = useState(false); // play/pause state
	const [doShuffle, setDoShuffle] = useState(false); // shuffle state
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

	// pause/play song
	const pausePlay = () => setIsPlaying(!isPlaying);

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

	const toggleRepeat = () => setDoRepeat(!doRepeat);

	// change tracks
	const toPrevTrack = () => {
		if (trackProgress > 5 || doRepeat) {
			audioRef.current.currentTime = 0;
			audioRef.current.play();
		} else if (currentTrackIndex === 0)
			setCurrentTrackIndex(currentTrackList.length - 1);
		else setCurrentTrackIndex(currentTrackIndex - 1);
	};

	const toNextTrack = () => {
		if (doRepeat) {
			audioRef.current.currentTime = 0;
			audioRef.current.play();
		} else if (currentTrackIndex === currentTrackList.length - 1)
			setCurrentTrackIndex(0);
		else setCurrentTrackIndex(currentTrackIndex + 1);
	};

	// reset audio source when currentTrackIndex or currentTrackList change
	useEffect(() => {
		audioRef.current = new Audio(audioSrc);

		audioRef.current.play();
		setIsPlaying(true);
		startUpdatingSeek();

		// stop previous playback
		return () => audioRef.current.pause();

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

	const onVolumeChange = (value) => {
		audioRef.current.volume = value;
		setVolume(value);
	};

	// get % of track progress
	const { duration } = audioRef.current;
	const trackPerc = duration ? (trackProgress / duration) * 100 : 0,
		volumePerc = volume * 100;

	// range input styling because css sux
	const seekStyle = `
  		-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${trackPerc}%, #ef3355), color-stop(${trackPerc}%, rgba(218, 218, 218, 0.2)))
		`;

	const volumeBarStyle = `
  		-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${volumePerc}%, #ef3355), color-stop(${volumePerc}%, rgba(218, 218, 218, 0.2)))
		`;

	return (
		<footer className={isShown ? '--shown' : ''}>
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
						className={`player__btn --tertiary  ${
							doRepeat ? '--active' : ''
						}`}
						onClick={toggleRepeat}
					>
						<IoRepeatOutline />
					</button>
					<button className='player__btn --secondary' onClick={toPrevTrack}>
						<BiSkipPrevious />
					</button>
					<button
						className={`player__btn --primary ${isPlaying ? '--active' : ''}`}
						onClick={pausePlay}
					>
						{isPlaying ? <AiFillPauseCircle /> : <AiFillPlayCircle />}
					</button>
					<button className='player__btn --secondary' onClick={toNextTrack}>
						<BiSkipNext />
					</button>
					<button className={`player__btn --tertiary`}>
						<IoShuffleOutline />
					</button>
				</div>
				<input
					type='range'
					value={trackProgress}
					step='0.5'
					min='0'
					max={duration ? duration : `${duration}`}
					style={{ background: seekStyle }}
					className='player__bar bar'
					onChange={(e) => onSeek(e.target.value)}
					onMouseUp={onSeekEnd}
					onKeyUp={onSeekEnd}
				/>
			</div>

			<div className='volume'>
				<button className='volume__btn'>
					<IoVolumeMedium />
				</button>
				<input
					type='range'
					value={volume}
					step='0.02'
					min='0'
					max='1'
					style={{ background: volumeBarStyle }}
					className='volume__bar bar'
					onChange={(e) => onVolumeChange(e.target.value)}
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
