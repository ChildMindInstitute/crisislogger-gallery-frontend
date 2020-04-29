import React from "react";


function FooterComponent() {

	return (
		<div style={{backgroundColor: '#fff', padding: 0, margin: 0}}>
			<div style={{display: 'flex', flexDirection: 'row', flex: 1, maxWidth: 1140, margin: 'auto'}}>
				<img className={"headerImage"} src={require('../assets/logo_header.png')}/>
				<span style={{flexGrow: 1}}/>
				<a className={"headerBtn"} href={"https://crisislogger.org/capture/choice"}>
					Share your thoughts
				</a>
				<a className={"headerBtn"} href={"https://crisislogger.org/login"}>
					Login
				</a>
			</div>
		</div>
	);
}

export default FooterComponent;
