import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({inputChange, buttonClick}) => {
	return(
		<div>
			<p className="f4 center tc message">This Magic Brain will detect faces in your pictures. Give it a try!</p>
			<div className="center">
				<div className="form pa4 br3 shadow-5">
					<input 
						className="f4 pa2 w-70" 
						type="text" 
						onChange = {inputChange}/>
					<button 
						className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
						onClick = {buttonClick}>Detect</button>
				</div>
			</div>
		</div>
	)
}

export default ImageLinkForm;