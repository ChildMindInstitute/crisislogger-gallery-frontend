import React, {Component} from 'react';
import ReactTextCollapse from "react-text-collapse";
import ReactWordcloud from "react-wordcloud";
import WordcloudIcon from '@material-ui/icons/CloudQueue';
import Popup from "reactjs-popup";

const TEXT_COLLAPSE_OPTIONS = {
	collapse: false, // default state when component rendered
	collapseText: '... show more', // text to show when collapsed
	expandText: 'show less', // text to show when expanded
	minHeight: 195, // component height when closed
	maxHeight: 340, // expanded to
	textStyle: { // pass the css for the collapseText and expandText here
		color: "#333",
		fontSize: "14px",
		marginLeft: "9px",
	}
};

const options = {
	colors: ['#6e6e6e'],
	enableTooltip: false,
	deterministic: false,
	fontStyle: 'normal',
	fontWeight: 'normal',
	fontSizes: [15, 30],
	padding: 1,
	rotations: 3,
	rotationAngles: [0],
	scale: 'sqrt',
	spiral: 'archimedean',
	transitionDuration: 1000,
};


class WordCloudComponent extends Component {
	state = {
		showWordCloud: false,
	};

	render() {
		return (
			<div style={{padding: 17, paddingBottom: 0}}>
				<div style={{maxHeight: 210, overflow: "hidden"}}>
					{this.state.showWordCloud ?
						<div style={{height: 210, width: '100%'}}>
							<ReactWordcloud
								options={options}
								words={this.props.words}
								maxWords={20}
							/>
						</div>
						:
						<div>
							<p style={{fontSize: 14, color: '#6e6e6e', fontFamily: 'sans-serif', textAlign: 'left', lineHeight: 1.1}}>
								{this.props.text}
							</p>
						</div>
					}
				</div>


				<div style={{display: 'flex', justifyContent: 'space-between', marginTop: 5, marginBottom: 5}}>

					<Popup
						trigger={<span style={{fontSize: 14, cursor: 'pointer', color: '#6e6e6e', fontFamily: 'sans-serif',}}>show more</span>}
						modal
						closeOnDocumentClick
						contentStyle={{borderRadius: 14, backgroundColor: '#fafafa', fontFamily: 'sans-serif', boxShadow: '0px 0px 1px 0px rgba(0,0,0,0.35)', maxHeight: '95vh', overflow: 'scroll'}}
					>
						{close => (
							<div>
								<p style={{textAlign: 'justify', color: '#6e6e6e', lineHeight: 1.2, padding: 20,}}>
									{this.props.text}
								</p>

								<button className={"btn"} onClick={() => close()}>Close
								</button>
							</div>
						)}
					</Popup>
					<WordcloudIcon style={{fontSize: 22, color: '#333', cursor: 'pointer'}} onClick={() => this.toggleShowWordCloud()}/>
				</div>
			</div>
		);
	}

	toggleShowWordCloud() {
		this.setState({
			showWordCloud: !this.state.showWordCloud,
		})
	}

}

export default WordCloudComponent;
