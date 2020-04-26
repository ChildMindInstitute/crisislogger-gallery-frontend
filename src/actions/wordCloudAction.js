import ApiInterface from "../utils/ApiInterface";
import {
	FETCH_TRANSCRIPTIONS,
	FETCH_TRANSCRIPTIONS_FAIL,
	FETCH_TRANSCRIPTIONS_MORE,
	FETCH_TRANSCRIPTIONS_MORE_FAIL,
	FETCH_TRANSCRIPTIONS_MORE_SUCCESS,
	FETCH_TRANSCRIPTIONS_SUCCESS,
} from "./types";
import Utils from "../utils/Utils";


export function getTranscriptions(page) {
	return (dispatch) => {
		// dispatch({type: page === 1 ? FETCH_TRANSCRIPTIONS : FETCH_TRANSCRIPTIONS_MORE,});
		dispatch({type: FETCH_TRANSCRIPTIONS});

		ApiInterface.instance.getTranscriptions(page)
			.then(response => {
				let responseData = response.data;
				let dataList = [];
				responseData.data.forEach(element => {
					element.words = Utils.getWords(element.text);
					dataList.push(element);
				});
				responseData.data = dataList;
				dispatch({
					type: FETCH_TRANSCRIPTIONS_SUCCESS,
					// type: page === 1 ? FETCH_TRANSCRIPTIONS_SUCCESS : FETCH_TRANSCRIPTIONS_MORE_SUCCESS,
					payload: responseData,
				});
			})
			.catch((error) => {
				dispatch({
					type: FETCH_TRANSCRIPTIONS_FAIL,
					// type: page === 1 ? FETCH_TRANSCRIPTIONS_FAIL : FETCH_TRANSCRIPTIONS_MORE_FAIL,
					payload: error,
				});
			});
	};
}
