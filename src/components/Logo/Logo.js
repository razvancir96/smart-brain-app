import React from 'react';
import './Logo.css';
import logo from './brain.png';
import Tilt from 'react-tilt';

const Logo = () => {
	return(
		<div className="logo-wrapper">
			<Tilt className="Tilt" options={{ max : 55 }} style={{ height: 150, width: 150 }}>
				<div className="Tilt-inner">
					<img className="logo-image" src={logo} alt="SMART BRAIN" />
				</div>
			</Tilt>
		</div>
	);
}

export default Logo;