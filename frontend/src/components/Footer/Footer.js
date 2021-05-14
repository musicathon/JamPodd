// TODO: Add shuffle, and repeat

import { useState, useEffect, useRef } from 'react';
import './Footer.css';
import { AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai';
import { BiSkipNext, BiSkipPrevious } from 'react-icons/bi';
import { IoShuffleOutline, IoRepeatOutline, IoVolumeMedium } from 'react-icons/io5';

const Footer = ({ tracks, startingIndex }) => {
	const [trackIndex, setTrackIndex] = useState(startingIndex); // index of the track in tracks
	const [trackProgress, setTrackProgress] = useState(0); // stores track progress in seconds
	const [volume, setVolume] = useState(1); // stores volume
	const [isPlaying, setIsPlaying] = useState(false); // play/pause state
	const [isReady, setIsReady] = useState(false); // simply prevents playback on page load

	const { title, artist, audioSrc, imageSrc } = tracks[trackIndex]; // get current track info

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
		}, [1000]);
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
	}, [isPlaying]);

	// change tracks
	const toPrevTrack = () => {
		if (trackIndex === 0) setTrackIndex(tracks.length - 1);
		else setTrackIndex(trackIndex - 1);
	};

	const toNextTrack = () => {
		if (trackIndex === tracks.length - 1) setTrackIndex(0);
		else setTrackIndex(trackIndex + 1);
	};

	useEffect(() => {
		// stop current playback
		audioRef.current.pause();

		audioRef.current = new Audio(audioSrc);

		if (isReady) {
			audioRef.current.play();
			setIsPlaying(true);
			startUpdatingSeek();
		} else {
			setIsReady(true);
		}
	}, [trackIndex]);

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
		<footer className='footer'>
			<div className='footer__cntr song'>
				<div className='song__img-cntr'>
					<img src={imageSrc} alt='song art' />
				</div>
				<div className='song__info'>
					<span className='song__name'>{title}</span>
					<span className='song__artist'>{artist}</span>
				</div>
			</div>

			<div className='footer__cntr player'>
				<div className='player__btns'>
					<button className='player__btn --tertiary'>
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
					<button className='player__btn --tertiary'>
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

			<div className='footer__cntr volume'>
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
					onMouseUp={onSeekEnd}
				/>
			</div>
		</footer>
	);
};

Footer.defaultProps = {
	tracks: {},
	startingIndex: 0
};

export default Footer;
