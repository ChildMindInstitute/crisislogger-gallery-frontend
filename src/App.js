import React, {Component} from 'react';
import {connect} from 'react-redux';
import './App.css';
import {getTranscriptions} from "./actions";
import WordCloudComponent from "./components/WordCloudComponent";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import ReactPlayer from 'react-player'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Spinner from 'react-bootstrap/Spinner'

class App extends Component {

	constructor() {
		super()
		this.state = {
			searchTxt: '',
			playing: false
		};
		this.changePlayState = this.changePlayState.bind()
	}

	componentDidMount() {
		this.props.getTranscriptions(1, this.state.searchTxt);
	}

	changePlayState = () => {
		this.setState({playing: false})
	}

	render() {
		const {transcriptionsList, transcriptionsLoading, transcriptionsError} = this.props;
		return (
			<div className="App">

				{/*<HeaderComponent/>*/}

				<div className="container">
					<Navbar collapseOnSelect={false} expand="xl" bg="light" variant="light" style={{display:'flex'}}>
						<Navbar.Brand href="https://crisislogger.org" style={{flex: 1, textAlign: 'left'}}>
							<img alt="crisislogger" src="https://crisislogger.org/media/logos/CrisisLogger_logo_border.png" style={{maxHeight: 48}}/>
						</Navbar.Brand>
						<span style={{color: '#6e6e6e', fontSize: 30, flex: 1}} className={'mobile-hide'}>
							CrisisLogger Gallery
						</span>
						<Navbar.Collapse id="navbar-nav " className="justify-content-end" style={{flex: 1}}>
							<Nav>
								<Nav.Link style={{fontSize: 16}} href="https://crisislogger.org/capture/choice">Share your thoughts</Nav.Link>
							</Nav>
						</Navbar.Collapse>
					</Navbar>
				</div>

				<div className={"container"}>

					<div style={{display: 'flex', flexDirection: 'row', flex: 1, marginTop: 30}}>
						{/*<span style={{width: 170, marginLeft: 50}}/>*/}
						<span style={{color: '#6e6e6e', fontSize: 30, flex: 1}} className={'mobile-show'}>
							CrisisLogger Gallery
						</span>
					</div>

					<div style={{display: 'flex', flexDirection: 'row', flex: 1, marginBottom: 30}}>
						{/*<span style={{width: 170, marginLeft: 50}}/>*/}

						<span style={{color: '#6e6e6e', fontSize: 14, flex: 1}}>
					---- A selection of recordings posted publicly ----
					</span>

					</div>
					<Col xs={12} md={6} lg={4} xl={3} style={{padding: 'unset'}}>
						<div>
							<InputGroup className="mb-3">
								<FormControl
									placeholder=""
									aria-label="search"
									aria-describedby="basic-addon2"
									value={this.state.searchTxt}
									onChange={(e) => {
										this.setState({searchTxt: e.target.value})
									}}
								/>
								<InputGroup.Append>
									<Button onClick={() => this.search()} className="default-outline-btn" variant="outline-default">Search</Button>
								</InputGroup.Append>
							</InputGroup>
						</div>
					</Col>
					

					<div style={{display: 'flex', flex: 1, flexWrap: 'wrap', justifyContent: 'center'}}>
						<div>
							{
								transcriptionsLoading && <Spinner animation="border"/>
							}
						</div>
					</div>
					{
						transcriptionsError? 
						<Alert color="warning">
							{'Something went wrong, please reload the page again'}
						</Alert>
						: null
					}
					<Row>
						{transcriptionsList.map((value, index) => {
							let isVideo = value.name.split(".")[1] === 'webm' || value.name.split(".")[1] === 'mkv' || value.name.split(".")[1] === 'mp4';
							let videoExtension = value.name.split(".")[1];
							return (
								<Col xs={12} sm={6} md={4} lg={3} xl={3} style={{marginTop: 20}} key={index}>
									<div style={{borderRadius: 14, overflow: 'hidden', backgroundColor: '#fafafa', boxShadow: '0px 0px 1px 0px rgba(0,0,0,0.35)',}}>

										<WordCloudComponent text={value.text} words={value.words}/>

										<div style={{flexGrow: 1}}/>

										{isVideo ?
											// <Player>
											// 	<source src={"https://storage.googleapis.com/crisislogger_uploads/" + value.name}/>
											// </Player>

											// <ReactWebMediaPlayer
											// 	width={'100%'}
											// 	height={205}
											// 	style={{margin: 0}}
											// 	video={"https://storage.googleapis.com/crisislogger_uploads/" + value.name}
											// />
											<ReactPlayer
												width={'100%'}
												height={205}
												style={{margin: 0}}
												controls={true}
												// onBufferEnd={this.changePlayState}
												// onReady={this.changePlayState}
												// playing={this.state.playing}
												muted={false}
												url={[
													{src: "https://storage.googleapis.com/crisislogger_uploads/" + value.name, type: 'video/' + videoExtension},
												]}
											/>
											:
											<div>
												{/*<Audio link={"https://storage.googleapis.com/crisislogger_uploads/" + value.name}/>*/}
												{/*<ReactWebMediaPlayer*/}
												{/*	width={'100%'}*/}
												{/*	height={205}*/}
												{/*	style={{margin: 0}}*/}
												{/*	video={"https://storage.googleapis.com/crisislogger_uploads/" + value.name}*/}
												{/*/>*/}
												<ReactPlayer height={50} width={'100%'} url={"https://storage.googleapis.com/crisislogger_uploads/" + value.name} controls={true}/>
											</div>
										}
									</div>
								</Col>
							)
						})}
					</Row>

					{
						!transcriptionsLoading ?
							<div style={{display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 40}}>

								<div onClick={() => this.previousPage()} style={{backgroundColor: '#6e6e6e', width: 35, height: 35, borderRadius: 35, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',}}>
									<img style={{width: 12, height: 12}} src={require('./assets/left-arrow.png')}/>
								</div>
								<div style={{marginRight: 30, marginLeft: 30}}>{this.props.transcriptionsCurrentPage} of {this.props.transcriptionsTotal}</div>
								<div onClick={() => this.nextPage()} style={{backgroundColor: '#6e6e6e', width: 35, height: 35, borderRadius: 35, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',}}>
									<img style={{width: 12, height: 12}} src={require('./assets/next.png')}/>
								</div>
							</div> :
							null
					}


					{/*<FooterComponent/>*/}

					<footer style={{marginTop: 40}} className="kt-footer  kt-grid__item kt-grid kt-grid--desktop kt-grid--ver-desktop" id="kt_footer">
						<div className="container  kt-container--fluid ">
							<div className="kt-footer__copyright" style={{width: '100%', paddingTop: 15}}>
								<div className="row text-center footer-row" style={{width: '100%', justifyContent: 'space-around'}}>
									<p className="" style={{fontSize: '1 rem'}}><a href="/privacy.html" style={{color: '#74788d'}}>Privacy</a></p>
									<p className=" " style={{fontSize: '1 rem', color: '#74788d'}}>©2020 Child Mind Institute</p>
									<a href="https://childmind.org"><img className="third-party-logos" src="https://crisislogger.org/media/logos/CMI_spot_logo.jpg" alt="" style={{minHeight: 40}}/></a>
									<a href="https://www.parents.com/"><img className="third-party-logos" src="https://crisislogger.org/media/logos/parents_magazine_logo.png" alt=""/></a>
									<a href="https://www.nimh.nih.gov/index.shtml"><img className="third-party-logos" src="https://crisislogger.org/media/logos/nimh-logo.png" alt="" style={{minHeight: 30}}/></a>
									<a href="https://www.openhumans.org/"><img className="third-party-logos" src="https://crisislogger.org/media/logos/open-humans.png" alt="" style={{maxHeight: 30}}/></a>
									<a href="https://cri-paris.org"><img className="third-party-logos" src="https://crisislogger.org/media/logos/CRI.png" alt="" style={{minHeight: 50}}/></a>
									<a href="https://mcgovern.mit.edu/"><img className="third-party-logos" src="https://crisislogger.org/media/logos/mcgovern_logo.png" alt="" style={{minHeight: 50, marginTop: -5}}/></a>

								</div>
							</div>
						</div>
					</footer>
				</div>
			</div>
		);
	}

	nextPage() {
		if (this.props.transcriptionsCurrentPage < this.props.transcriptionsTotal) {
			this.props.getTranscriptions(this.props.transcriptionsCurrentPage + 1, this.state.referralCode);
		}
	}

	previousPage() {
		if (this.props.transcriptionsCurrentPage > 1) {
			this.props.getTranscriptions(this.props.transcriptionsCurrentPage - 1, this.state.referralCode);
		}
	}


	search() {
		if(!this.state.searchTxt.length)
		{
			return true;
		}
		this.props.getTranscriptions(1, this.state.searchTxt);
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
