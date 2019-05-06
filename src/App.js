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

// Clarifai API
const Clarifai = require('clarifai');
const app = new Clarifai.App({
	apiKey: 'b5624aafd619411f8accfc04e257cd73'
});


class App extends Component {

	constructor() {
		super();
		this.state = {
			imageInput: '',
			url: '',
			box: {
				top: 0,
				left: 0,
				bottom: 0,
				right: 0
			}
		}
	}

	onInputChange = (event) => {
		this.setState({imageInput: event.target.value});
	}

	onButtonClick = () => {
		// when the submit button is clicked, we pass the url to Clarifai
		app.models.predict("a403429f2ddf4b49b307e318f00e528b", this.state.imageInput).then(
		    (response) => {
				// do something with response
				const coordinatesObject = response.outputs[0].data.regions[0].region_info.bounding_box;
				const translatedCoordinatesObject = {
					top: coordinatesObject.top_row * 100 + '%',
					left: coordinatesObject.left_col * 100 + '%',
					bottom: 100 - coordinatesObject.bottom_row * 100 + '%',
					right: 100 - coordinatesObject.right_col * 100 + '%'
				}
				// we set the url state, so the render method is triggered
				this.setState({url: this.state.imageInput, box: translatedCoordinatesObject});
		    },
		    function(err) {
		      // there was an error
		      console.log(err);
		    }
		);		
	}

	render() {
		return (
		  <div>
		  	<Particles params={particlesParams} className="particles"/>
		    <Navigation />
		    <Logo />
		    <Rank />
		    <ImageLinkForm inputChange={this.onInputChange} buttonClick={this.onButtonClick}/>
		  	{/* we pass the image url and the face recognition box coordinates */}
		    <FaceRecognitionImage url={this.state.url} boxCoordinates={this.state.box}/>
		  </div>
		);
	}
}

export default App;
