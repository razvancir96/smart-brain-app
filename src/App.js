import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import Rank from './components/Rank/Rank.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import FaceRecognitionImage from './components/FaceRecognitionImage/FaceRecognitionImage.js';
import SignIn from './components/SignIn/SignIn.js'
import Register from './components/Register/Register.js'
import DisplayError from './components/DisplayError/DisplayError.js'
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
			url: '',
			box: [],
			route: 'signin',
			userData: {
				id: 0,
				name: '',
				entries: 0
			},
			error: ''
		}
	}

	onRouteChange = (route) => {
		if ( route === 'signin') {
			this.setState({route: 'signin'});
		} else if (route === 'register') {
			this.setState({route: 'register'});
		} else if (route === 'home'){
			this.setState({route: 'home'});
		} else {
			this.setState({route: '404'});
		}
	}

	getProfile = (id) => {
		fetch(`http://localhost:3000/profile/${Number(id)}`)
		.then(response => response.json())
		.then(user => {
			const currentUser = {
				id: user.id,
				name: user.name,
				entries: user.entries
			};
			// when a user gets his profile, images or errors have to be reset
			this.setState({userData: currentUser, url: '', error: ''});
		})
		.catch(err => {
			console.log(err);
		})
	}

	onInputChange = (event) => {
		this.setState({imageInput: event.target.value});
	}

	onButtonClick = () => {
		// clarifai request
		fetch('http://localhost:3000/apiRequest', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				imageUrl: this.state.imageInput
			})
		})
		.then(response => response.json())
		.then((response) => {
			// if the url we entered does not exist
			if (response === 'badLink') {
				this.setState({url: '', box: []});
				this.setState({error: 'badLink'});
			// if we have faces
			} else if (response.outputs[0].data.regions) {
				// we grab the regions of the faces
				const facesArray = response.outputs[0].data.regions;
				// before we display the faces we display the image
				this.setState({url: this.state.imageInput});
				// for each face region
				let coordinatesObject;
				let translatedCoordinatesObject;
				facesArray.forEach(face => {
					coordinatesObject = face.region_info.bounding_box;
					translatedCoordinatesObject = {
						top: coordinatesObject.top_row * 100 + '%',
						left: coordinatesObject.left_col * 100 + '%',
						bottom: 100 - coordinatesObject.bottom_row * 100 + '%',
						right: 100 - coordinatesObject.right_col * 100 + '%'
					};
					// update the state for the face regions array
					this.setState(prevState => ({
						box: [...prevState.box, translatedCoordinatesObject]
					}));
					// increment number of entries
					fetch('http://localhost:3000/image', {
						method: 'PUT',
						body: JSON.stringify({
							id: this.state.userData.id
						}),
						headers: {
							'Content-Type': 'application/json' 
						}
					})
					.then(response => response.json())
					.then(data => {
						if (data === "success") {
							this.setState({error: ''})
							// update entries
							this.setState(prevState => ({
								userData: {
									...prevState.userData,
									entries: prevState.userData.entries + 1
								}
							}));
						}
					})
					.catch(err => {
						// update fails
					});
				});
			// if we do not have faces in our response
			} else {
				this.setState({url: this.state.imageInput, box: []});
				this.setState({error: ''});
			}
		})
	}

	render() {
		return (
			<div>
				<Particles params={particlesParams} className="particles"/>
				<Navigation onRouteChange={this.onRouteChange} currentRoute={this.state.route}/>
				{
				// if route is signin
				this.state.route === 'signin' ?
				<SignIn onRouteChange={this.onRouteChange} getProfile={this.getProfile}/> :
				// if route is register
				this.state.route === 'register' ?
				<Register onRouteChange={this.onRouteChange}/> :
				// if route is home
				<div>
					<Logo />
					{
					this.state.userData.name ?
					<Rank name={this.state.userData.name} entries={this.state.userData.entries}/> :
					<DisplayError message={'You are not logged in. Please log in.'} />
					}
					<ImageLinkForm inputChange={this.onInputChange} buttonClick={this.onButtonClick}/>
					{
					this.state.error === "badLink" ?
					<DisplayError message={'You have not entered a valid url.'}/> :
					<FaceRecognitionImage url={this.state.url} boxCoordinates={this.state.box}/>
					}
				</div>
				}
			</div>
		);
	}
}

export default App;
