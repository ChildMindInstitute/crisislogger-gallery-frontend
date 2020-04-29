import React, {Component} from 'react';
import {connect} from 'react-redux';
import './App.css';
import {getTranscriptions} from "./actions";
import ReactWebMediaPlayer from 'react-web-media-player';
import Audio from "./components/player/Audio";
import WordCloudComponent from "./components/WordCloudComponent";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import Row from "react-bootstrap/Row";
import ReactPlayer from 'react-player'

class App extends Component {
	state = {
		referralCode: '',
	};

	componentDidMount() {
		this.props.getTranscriptions(1);
	}

	render() {
		const {transcriptionsList} = this.props;
		console.log(transcriptionsList);
		let background = require('./assets/bg.jpg');
		return (
			<div className="App" style={{backgroundImage: `url(${background})`}}>

				<HeaderComponent/>

				<div className={"container"}>

					<div style={{display: 'flex', flexDirection: 'row', flex: 1, marginTop: 30, marginBottom: 30}}>
						{/*<span style={{width: 170, marginLeft: 50}}/>*/}

						<span style={{color: '#6e6e6e', fontSize: 30, flex: 1}}>
						CrisisLogger Gallery
					</span>

						{/*<span style={{width: 170, marginRight: 50, alignSelf: 'flex-end', color: '#1b1b1b', fontSize: 17, backgroundColor: '#fafafa', borderColor: '#3e3e3e', borderRadius: 20, borderWidth: 1, borderStyle: 'solid', paddingTop: 6, paddingBottom: 6}}>*/}
						{/*	Dynamic*/}
						{/*</span>*/}
					</div>

					<Col xs={12} md={6} lg={4} xl={3}>
						<div>
							<InputGroup className="mb-3">
								<FormControl
									placeholder="Referral"
									aria-label="Referral"
									aria-describedby="basic-addon2"
									value={this.state.referralCode}
									onChange={(referralCode) => {
										this.setState({referralCode: referralCode.target.value})
									}}
								/>
								<InputGroup.Append>
									<Button onClick={() => this.searchReferralCode()} variant="outline-secondary">Search</Button>
								</InputGroup.Append>
							</InputGroup>
						</div>
					</Col>


					<Row>
						{transcriptionsList.map((value, index) => {
							console.log('test', 'test');
							let isVideo = value.name.split(".")[1] === 'webm' || value.name.split(".")[1] === 'mkv' || value.name.split(".")[1] === 'mp4';
							console.log('test', isVideo);
							return (
								<Col xs={12} sm={6} md={4} lg={3} xl={3} style={{marginTop: 20}}>
									<div style={{borderRadius: 14, overflow: 'hidden', backgroundColor: '#fafafa', boxShadow: '0px 0px 1px 0px rgba(0,0,0,0.35)',}}>

										<WordCloudComponent text={value.text} words={value.words}/>

										<div style={{flexGrow: 1}}/>

										{isVideo ?
											// <Player>
											// 	<source src={"https://storage.googleapis.com/crisislogger_uploads/" + value.name}/>
											// </Player>

											<ReactWebMediaPlayer
												width={'100%'}
												height={205}
												style={{margin: 0}}
												video={"https://storage.googleapis.com/crisislogger_uploads/" + value.name}
											/>
											:
											<div>
												<Audio link={"https://storage.googleapis.com/crisislogger_uploads/" + value.name}/>
												{/*<ReactWebMediaPlayer*/}
												{/*	width={'100%'}*/}
												{/*	height={205}*/}
												{/*	style={{margin: 0}}*/}
												{/*	video={"https://storage.googleapis.com/crisislogger_uploads/" + value.name}*/}
												{/*/>*/}
												{/*<ReactPlayer url={"https://storage.googleapis.com/crisislogger_uploads/" + value.name} controls={true} />*/}
											</div>
										}
									</div>
								</Col>
							)
						})}
					</Row>

					<div style={{display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 40}}>

						<div onClick={() => this.previousPage()} style={{backgroundColor: '#6e6e6e', width: 35, height: 35, borderRadius: 35, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',}}>
							<img style={{width: 12, height: 12}} src={require('./assets/left-arrow.png')}/>
						</div>
						<div style={{marginRight: 30, marginLeft: 30}}>{this.props.transcriptionsCurrentPage} of {this.props.transcriptionsTotal}</div>
						<div onClick={() => this.nextPage()} style={{backgroundColor: '#6e6e6e', width: 35, height: 35, borderRadius: 35, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',}}>
							<img style={{width: 12, height: 12}} src={require('./assets/next.png')}/>
						</div>
					</div>

				</div>
				<FooterComponent/>
			</div>
		);
	}

	nextPage() {
		if (this.props.transcriptionsCurrentPage < this.props.transcriptionsTotal) {
			this.props.getTranscriptions(this.props.transcriptionsCurrentPage + 1);
		}
	}

	previousPage() {
		if (this.props.transcriptionsCurrentPage > 1) {
			this.props.getTranscriptions(this.props.transcriptionsCurrentPage - 1);
		}
	}

	searchReferralCode() {
		this.props.getTranscriptions(1, this.state.referralCode);
	}

}

const mapStateToProps = state => {
	return {
		transcriptionsLoading: state.wordCloud.transcriptionsLoading,
		transcriptionsCurrentPage: state.wordCloud.transcriptionsCurrentPage,
		transcriptionsTotal: state.wordCloud.transcriptionsTotal,
		transcriptionsList: state.wordCloud.transcriptionsList,
		transcriptionsError: state.wordCloud.transcriptionsError,
		inProgressTranscriptionsCount: state.wordCloud.inProgressTranscriptionsCount,
	};
};

export default connect(mapStateToProps, {getTranscriptions})(App);
