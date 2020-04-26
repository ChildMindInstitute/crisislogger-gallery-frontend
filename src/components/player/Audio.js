import React from "react";

import Play from "./Play";
import Pause from "./Pause";
import Bar from "./Bar";
import './styles.scss';

import useAudioPlayer from './useAudioPlayer';

function Audio({link}) {
	let audioId = "audio" + (Math.ceil(Math.random() * 10000));
	const {curTime, duration, playing, setPlaying, setClickedTime} = useAudioPlayer(audioId);

	return (
		<div className="player">
			<audio id={audioId}>
				<source src={link}/>
				Your browser does not support the <code>audio</code> element.
			</audio>
			<div className="controls">
				{playing ?
					<Pause handleClick={() => setPlaying(false)}/> :
					<Play handleClick={() => setPlaying(true)}/>
				}
				<Bar curTime={curTime} duration={duration} onTimeUpdate={(time) => setClickedTime(time)}/>
			</div>
		</div>
	);
}

export default Audio;
