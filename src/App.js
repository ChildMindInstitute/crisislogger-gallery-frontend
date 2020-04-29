import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { getTranscriptions } from "./actions";
import Audio from "./components/player/Audio";
import { Player } from 'video-react';
import ReactTextCollapse from 'react-text-collapse'
import WordCloudComponent from "./components/WordCloudComponent";
import ReactPlayer from 'react-player';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Spinner from 'react-bootstrap/Spinner'
class App extends Component {

	componentDidMount() {
		this.props.getTranscriptions(1);
	}

	render() {
		const { transcriptionsList, transcriptionsLoading, transcriptionsError } = this.props;
		return (
			<div className="App" style={{ paddingRight: 20, paddingLeft: 20, }}>
				<div className="container">
					<Navbar collapseOnSelect expand="xl" bg="light" variant="light">
						<Navbar.Brand href="https://crisislogger.org">
							<img alt="crisislogger" src="https://crisislogger.org/media/logos/CrisisLogger_logo_border.png" style={{ maxHeight: 50 }} />
						</Navbar.Brand>
						<Navbar.Toggle aria-controls="responsive-navbar-nav" />
						<Navbar.Collapse id="responsive-navbar-nav " className="justify-content-end">
							<Nav>
								<Nav.Link href="https://crisislogger.org/capture/choice">Share your thoughts</Nav.Link>
								<Nav.Link eventKey={2} href="https://crisislogger.org/login">
									Login
								</Nav.Link>
							</Nav>
						</Navbar.Collapse>
					</Navbar>
				</div>
				<div style={{ display: 'flex', flexDirection: 'row', flex: 1, marginTop: 30}}>
					{/*<span style={{width: 170, marginLeft: 50}}/>*/}

					<span style={{ color: '#6e6e6e', fontSize: 30, flex: 1 }}>
						CrisisLogger Gallery
					</span>
					
				</div>
				<div style={{ display: 'flex', flexDirection: 'row', flex: 1, marginBottom: 30 }}>
					{/*<span style={{width: 170, marginLeft: 50}}/>*/}

					<span style={{ color: '#6e6e6e', fontSize: 14, flex: 1 }}>
					---- A selection of recordings posted publicly ----
					</span>
					
				</div>

				<div style={{ display: 'flex', flex: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
					<div>
						{
							transcriptionsLoading && <Spinner animation="border" />
						}
					</div>
					{transcriptionsList.map((value, index) => {
						let isVideo = value.name.split(".")[1] === 'webm' || value.name.split(".")[1] === 'mkv' || value.name.split(".")[1] === 'mp4';
						let videoExtension = value.name.split(".")[1];
						return (
							<div style={{ margin: 20, width: 250 }} key={index}>
								{/*// <Col xs={12} md={4} lg={3} xl={2}>*/}
								<div style={{ borderRadius: 14, overflow: 'hidden', backgroundColor: '#fafafa', boxShadow: '0px 0px 1px 0px rgba(0,0,0,0.35)', }}>

									<WordCloudComponent text={value.text} words={value.words} />

									<div style={{ flexGrow: 1 }} />

									{isVideo ?
										// <Player>
										// 	<source src={"https://storage.googleapis.com/crisislogger_uploads/" + value.name}/>
										// </Player>

										<ReactPlayer
											width={250}
											height={205}
											playing={false}
											style={{ margin: 0 }}
											controls={true}
											url={[
												{ src: "https://storage.googleapis.com/crisislogger_uploads/" + value.name, type: 'video/' + videoExtension },
											]}
										/>
										:
										<Audio link={"https://storage.googleapis.com/crisislogger_uploads/" + value.name} />
									}
								</div>
							</div>
						)
					})}
				</div>
				{
					!transcriptionsLoading ?
						<div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 40 }}>

							<div onClick={() => this.previousPage()} style={{ backgroundColor: '#6e6e6e', width: 35, height: 35, borderRadius: 35, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
								<img style={{ width: 12, height: 12 }} src={require('./assets/left-arrow.png')} />
							</div>
							<div style={{ marginRight: 30, marginLeft: 30 }}>{this.props.transcriptionsCurrentPage} of {this.props.transcriptionsTotal}</div>
							<div onClick={() => this.nextPage()} style={{ backgroundColor: '#6e6e6e', width: 35, height: 35, borderRadius: 35, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
								<img style={{ width: 12, height: 12 }} src={require('./assets/next.png')} />
							</div>
						</div> :
						null
				}


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

export default connect(mapStateToProps, { getTranscriptions })(App);
