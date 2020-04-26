import React, {Component} from 'react';
import {connect} from 'react-redux';
import './App.css';
import {getTranscriptions} from "./actions";
import ReactWebMediaPlayer from 'react-web-media-player';
import Audio from "./components/player/Audio";
import {Player} from 'video-react';
import ReactTextCollapse from 'react-text-collapse'
import WordCloudComponent from "./components/WordCloudComponent";

class App extends Component {

	componentDidMount() {
		this.props.getTranscriptions(1);
	}

	render() {
		const {transcriptionsList} = this.props;
		return (
			<div className="App" style={{paddingRight: 20, paddingLeft: 20}}>

				<div style={{display: 'flex', flexDirection: 'row', paddingTop: 15, flex: 1, paddingRight: 40, paddingLeft: 40}}>
					<a href="https://crisislogger.org">
						<img alt="crisislogger" src="https://crisislogger.org/media/logos/CrisisLogger_logo_border.png" style={{maxHeight: 60}} />
					</a>
					<span style={{flexGrow: 1}}/>
					<div style={{margin: 'auto', padding: 10}}>
						<a href={"https://crisislogger.org/capture/choice"}
						   className={'btn-primary btn btn-wide btn-lg mr-5'}
						   style={{backgroundColor: '#0067a0', padding: '0.3rem 1rem'}}
						>
						<span style={{color: '#fff', fontSize: 16}}>
							Share your thoughts
						</span>
						</a>
						<a
							href={"https://crisislogger.org/login"}
						>
							<span style={{color: '#1b1b1b', fontSize: 16}}>
								Login
							</span>
						</a>
					</div>
				</div>

				<div style={{display: 'flex', flexDirection: 'row', flex: 1, marginTop: 30, marginBottom: 30}}>
					{/*<span style={{width: 170, marginLeft: 50}}/>*/}

					<span style={{color: '#6e6e6e', fontSize: 30, flex: 1}}>
						CrisisLogger Gallery
					</span>

					{/*<span style={{width: 170, marginRight: 50, alignSelf: 'flex-end', color: '#1b1b1b', fontSize: 17, backgroundColor: '#fafafa', borderColor: '#3e3e3e', borderRadius: 20, borderWidth: 1, borderStyle: 'solid', paddingTop: 6, paddingBottom: 6}}>*/}
					{/*	Dynamic*/}
					{/*</span>*/}
				</div>


				<div style={{display: 'flex', flex: 1, flexWrap: 'wrap', justifyContent: 'center'}}>
					{transcriptionsList.map((value, index) => {
						let isVideo = value.name.split(".")[1] === 'webm' || value.name.split(".")[1] === 'mkv';
						return (
							<div style={{margin: 20, width: 250}} key={index}>
								{/*// <Col xs={12} md={4} lg={3} xl={2}>*/}
								<div style={{borderRadius: 14, overflow: 'hidden', backgroundColor: '#fafafa', boxShadow: '0px 0px 1px 0px rgba(0,0,0,0.35)',}}>

									<WordCloudComponent text={value.text} words={value.words}/>

									<div style={{flexGrow: 1}}/>

									{isVideo ?
										// <Player>
										// 	<source src={"https://storage.googleapis.com/crisislogger_uploads/" + value.name}/>
										// </Player>

										<ReactWebMediaPlayer
											width={250}
											height={205}
											style={{margin: 0}}
											video={"https://storage.googleapis.com/crisislogger_uploads/" + value.name}
										/>
										:
										<Audio link={"https://storage.googleapis.com/crisislogger_uploads/" + value.name}/>
									}
								</div>
							</div>
						)
					})}
				</div>

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

export default connect(mapStateToProps, {getTranscriptions})(App);
