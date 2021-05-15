// TODO: Add logout button

import './Header.css';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../LogoutButton/LogoutButton';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoAlbums } from 'react-icons/io5';

const Header = ({ setIsAuth }) => {
	return (
		<header>
			<div className='logo'>
				<span className='logo__title'>JamPodd</span>
			</div>

			<nav className='nav'>
				<ul>
					<li>
						<NavLink exact to='/explore' activeClassName='--active'>
							<div className='nav__icon-cntr'>
								<AiOutlineSearch />
							</div>
							<span>Explore</span>
						</NavLink>
					</li>
					<li>
						<NavLink exact to='/playlists' activeClassName='--active'>
							<div className='nav__icon-cntr'>
								<IoAlbums />
							</div>
							<span>Playlists</span>
						</NavLink>
					</li>
				</ul>
			</nav>

			{/* temp */}
			<div className='logout'>
				<LogoutButton setIsAuth={setIsAuth} />
			</div>
		</header>
	);
};

export default Header;