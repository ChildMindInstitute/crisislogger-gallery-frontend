import React, {Component} from 'react';
import ReactTextCollapse from "react-text-collapse";
import ReactWordcloud from "react-wordcloud";
import WordcloudIcon from '@material-ui/icons/CloudQueue';
import Popup from "reactjs-popup";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

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
	deterministic: true,
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

	constructor(props) {
		super(props);
		this.state = {
			showWordCloud: true,
			open: false,
		};
	}


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
					<span
						onClick={() => this.openModal()}
						style={{fontSize: 14, cursor: 'pointer', color: '#6e6e6e', fontFamily: 'sans-serif',}}
					>
						show more
					</span>

					<Dialog
						open={this.state.open}
						fullWidth={true}
						maxWidth={'lg'}

						scroll={'body'}
					>
						<DialogContent dividers={false} style={{borderRadius: 15}}>
							<DialogContentText
								style={{textAlign: 'justify', lineHeight: 1.2}}
								id="scroll-dialog-description"
								tabIndex={-1}
							>
								"{this.props.text}"
							</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button
								onClick={() => this.closeModal()}
								style={{color: '#ff8b8b'}}
							>
								Close
							</Button>
						</DialogActions>
					</Dialog>

					<WordcloudIcon
						onClick={() => this.toggleShowWordCloud()}
						style={{fontSize: 22, color: '#333', cursor: 'pointer'}}
					/>
				</div>
			</div>
		);
	}

	toggleShowWordCloud() {
		this.setState({
			showWordCloud: !this.state.showWordCloud,
		})
	}


	openModal() {
		this.setState({
			open: true,
		})
	}

	closeModal() {
		this.setState({
			open: false,
		})
	}

}

export default WordCloudComponent;

