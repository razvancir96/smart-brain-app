import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import Rank from './components/Rank/Rank.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import FaceRecognitionImage from './components/FaceRecognitionImage/FaceRecognitionImage.js';
import './App.css';


const particlesParams = {
	particles: {
		number: {
			value: 50,
			density: {
				enable: true,
				value_area: 800
			}
		}
	}
};

class App extends Component {

	constructor() {
		super();
		this.state = {
			imageInput: '',
			url: ''
		}
	}

	onInputChange = (event) => {
		this.setState({imageInput: event.target.value});
	}

	onButtonClick = () => {
		this.setState({url: this.state.imageInput});
	}

	render() {
		return (
		  <div>
		  	<Particles params={particlesParams} className="particles"/>
		    <Navigation />
		    <Logo />
		    <Rank />
		    <ImageLinkForm inputChange={this.onInputChange} buttonClick={this.onButtonClick}/>
		    <FaceRecognitionImage url={this.state.url}/>
		  </div>
		);
	}
}

export default App;
