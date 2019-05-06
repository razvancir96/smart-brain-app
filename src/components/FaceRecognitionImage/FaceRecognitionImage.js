import React from 'react';
const Clarifai = require('clarifai');

const FaceRecognitionImage = ({url}) => {
	// initialize with your api key. This will also work in your browser via http://browserify.org/
	const app = new Clarifai.App({
		apiKey: 'b5624aafd619411f8accfc04e257cd73'
	});

	let translatedCoordinatesObject = {
		top: 0,
		left: 0,
		bottom: 0,
		right: 0
	}

	app.models.predict("a403429f2ddf4b49b307e318f00e528b", url).then(
	    function(response) {
	      // do something with response
	      console.log(response);
	      console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
	      const coordinatesObject = response.outputs[0].data.regions[0].region_info.bounding_box;
	      translatedCoordinatesObject = {
	      	top: coordinatesObject.top_row * 100,
	      	left: coordinatesObject.left_col * 100,
	      	bottom: 100 - coordinatesObject.bottom_row * 100,
	      	right: 100 - coordinatesObject.right_col * 100
	      }
	    },
	    function(err) {
	      // there was an error
	      console.log(err);
	    }
	);

	return(
		<div>
			{ url ?
				(<div className="center ma4">
					<img src={url} alt="Bad link." className="displayed-image"/>
					<div className="bounding-box" style={top, bottom, left, right}></div>
				</div>) :
				(<p className="center f3 white">Your image will be displayed here.</p>)
			}
		</div>
	);
}

export default FaceRecognitionImage;