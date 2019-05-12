import React from 'react';
import './FaceRecognitionImage.css'

const FaceRecognitionImage = ({url, boxCoordinates}) => {

	const boxList = boxCoordinates.map(boxObject => {
		return <div className="bounding-box" style={boxObject}></div>
	});

	return(
		<div>
			{ url ?
				(<div className="center ma4">
					<div className="absolute">
						<img src={url} alt="Bad link." className="displayed-image"/>
						{boxList}			
					</div>
				</div>) :
				(<p className="center f3 white">Your image will be displayed here.</p>)
			}
		</div>
	);
}

export default FaceRecognitionImage;