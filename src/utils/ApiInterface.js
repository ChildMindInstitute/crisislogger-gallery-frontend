import axios from "axios";
import {attach as raxAttach, getConfig as raxConfig} from 'retry-axios';

const singleton = Symbol();
const singletonEnforcer = Symbol();

class ApiInterface {
	static BASE_URL_API;

	constructor(enforcer) {
		if (enforcer !== singletonEnforcer) {
			throw new Error('Cannot construct singleton');
		}

		ApiInterface.BASE_URL_API = "http://crisislogger.org/api/";


		this.session = axios.create({
			baseURL: ApiInterface.BASE_URL_API,
			headers: {
				// 'Authorization': 'Bearer ' + Database.getUserJwtToken(),
				'Accept': 'application/json'
			},
		});
		this.session.defaults.timeout = 30 * 1000;
		this.session.defaults.validateStatus = (status) => (status >= 200 && status < 300);
		this.session.defaults.raxConfig = {
			instance: this.session,
			retry: 3,
			noResponseRetries: 3,
			httpMethodsToRetry: ['GET', 'HEAD', 'OPTIONS', 'DELETE', 'PUT', 'POST'],
			retryDelay: 500,
			httpStatusCodesToRetry: [[100, 199], [420, 429], [500, 599]],
			statusCodesToRetry: [[100, 199], [429, 429], [500, 599]],
			onRetryAttempt: (err) => {
				if (axios.defaults.timeout < 8000)
					axios.defaults.timeout = axios.defaults.timeout + 500;
				const cfg = raxConfig(err);
			},
		};
		raxAttach(this.session);


		this.session.interceptors.response.use(
			response => {
				return response;
			},
			error => {

				return Promise.reject(error);
			}
		);

		this.session.interceptors.request.use(request => {
			return request;
		});


	}

	static get instance() {
		// Try to get an efficient singleton
		if (!this[singleton]) {
			this[singleton] = new ApiInterface(singletonEnforcer);
		}

		return this[singleton];
	}

	static get reInstance() {
		this[singleton] = new ApiInterface(singletonEnforcer);
		return this[singleton];
	}

	get = (...params) => this.session.get(...params);
	post = (...params) => this.session.post(...params);
	put = (...params) => this.session.put(...params);
	patch = (...params) => this.session.patch(...params);
	remove = (...params) => this.session.delete(...params);


	getTranscriptions = (page, searchTxt) => this.session.get('transcriptions', {params: {page, searchTxt}});

}

export default ApiInterface;
