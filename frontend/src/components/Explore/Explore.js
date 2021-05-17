import './Explore.css';
import { useState, useEffect } from 'react';

const Explore = () => {
	// transition on mount
	const [isShown, setIsShown] = useState(false);
	useEffect(() => setTimeout(() => setIsShown(true), 25), []);

	return <main className={`temp ${isShown ? '--shown' : ''}`}>Explore</main>;
};

export default Explore;
