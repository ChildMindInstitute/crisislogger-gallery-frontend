import React from "react";
import {Col, Row} from "react-bootstrap";


function FooterComponent() {

	return (
		<div className={"footer"}>
			<div className={"container"}>
				<div className={"kt-footer"}>

					<Row style={{width: '100%', justifyContent: 'space-around', alignItems: 'center'}} className={"text-center"}>
						<Col lg={3} md={12} sm={12}>
							<Row style={{width: '100%', justifyContent: 'space-around', alignItems: 'center', marginBottom: 10}} className={"text-center"}>

								<Col lg={4} md={6} sm={6} style={{fontSize: 15}}>
									<a href={"/privacy.html"} style={{color: '#74788d'}}>Privacy</a>
								</Col>
								<Col lg={8} md={6} sm={6} style={{fontSize: 15}}>
									©2020 Child Mind Institute
								</Col>
							</Row>
						</Col>

						<Col lg={9} md={12} sm={12}>
							{/*<div style="width: 100%;justify-content: space-around;" className="row text-center footer-row">*/}
							<Row style={{width: '100%', justifyContent: 'space-around', alignItems: 'center'}} className={"text-center"}>

								<Col lg={2} md={4} sm={6}>
									<a href="" style={{width: '100%'}}>
										<img className="third-party-logos" src="https://crisislogger.org/media/logos/CMI_spot_logo.jpg" alt="" style={{maxHeight: 40}}/>
									</a>
								</Col>
								<Col lg={2} md={4} sm={6}>
									<a href="https://www.parents.com/" style={{width: '100%'}}>
										<img className="third-party-logos" src="https://crisislogger.org/media/logos/parents_magazine_logo.png" alt="" style={{maxHeight: 30}}/>
									</a>
								</Col>
								<Col lg={2} md={4} sm={6}>
									<a href="https://www.nimh.nih.gov/index.shtml" style={{width: '100%'}}>
										<img className="third-party-logos" src="https://crisislogger.org/media/logos/nimh-logo.png" alt="" style={{maxHeight: 30}}/>
									</a>
								</Col>
								<Col lg={2} md={4} sm={6}>
									<a href="https://www.openhumans.org/" style={{width: '100%'}}>
										<img className="third-party-logos" src="https://crisislogger.org/media/logos/open-humans.png" alt="" style={{maxHeight: 30}}/>
									</a>
								</Col>
								<Col lg={2} md={4} sm={6}>
									<a href="https://cri-paris.org" style={{width: '100%'}}>
										<img className="third-party-logos" src="https://crisislogger.org/media/logos/CRI.png" alt="" style={{maxHeight: 55}}/>
									</a>
								</Col>
								<Col lg={2} md={4} sm={6}>
									<a href="https://mcgovern.mit.edu/" style={{width: '100%'}}>
										<img className="third-party-logos" src="https://crisislogger.org/media/logos/mcgovern_logo.png" alt="" style={{maxHeight: 60, marginTop: -5}}/>
									</a>
								</Col>
							</Row>
						</Col>
					</Row>

				</div>
			</div>
		</div>
	);
}

export default FooterComponent;
