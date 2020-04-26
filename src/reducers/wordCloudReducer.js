import {
	FETCH_TRANSCRIPTIONS,
	FETCH_TRANSCRIPTIONS_FAIL,
	FETCH_TRANSCRIPTIONS_MORE_FAIL,
	FETCH_TRANSCRIPTIONS_MORE_SUCCESS,
	FETCH_TRANSCRIPTIONS_SUCCESS,
	FETCH_TRANSCRIPTIONS_MORE,
} from "../actions/types";

const INITIAL_STATE = {
	transcriptionsLoading: false,
	transcriptionsCurrentPage: 0,
	transcriptionsTotal: 1,
	transcriptionsList: [],
	transcriptionsError: '',
	inProgressTranscriptionsCount: 0,
};

export default (state = INITIAL_STATE, action) => {
	console.log(action);

	switch (action.type) {

		case FETCH_TRANSCRIPTIONS:
			return {
				...state,
				transcriptionsLoading: true,
				transcriptionsCurrentPage: 0,
				transcriptionsTotal: 1,
				transcriptionsList: [],
				transcriptionsError: '',
				inProgressTranscriptionsCount: 0,
			};
		case FETCH_TRANSCRIPTIONS_SUCCESS:
			return {
				...state,
				transcriptionsLoading: false,
				transcriptionsError: '',
				transcriptionsList: action.payload.data,
				transcriptionsCurrentPage: action.payload.current_page,
				transcriptionsTotal: action.payload.last_page,
				inProgressTranscriptionsCount: action.payload.inProgressTranscriptionsCount
			};
		case FETCH_TRANSCRIPTIONS_FAIL:
			return {
				...state,
				transcriptionsLoading: false,
				transcriptionsError: action.payload
			};
		case FETCH_TRANSCRIPTIONS_MORE:
			return {
				...state,
				transcriptionsLoading: true,
				transcriptionsError: ''
			};
		case FETCH_TRANSCRIPTIONS_MORE_SUCCESS:
			return {
				...state,
				transcriptionsLoading: false,
				transcriptionsError: '',
				transcriptionsList: [...state.transcriptionsList, ...action.payload.data],
				transcriptionsCurrentPage: action.payload.current_page,
				transcriptionsTotal: action.payload.last_page,
				inProgressTranscriptionsCount: action.payload.inProgressTranscriptionsCount
			};
		case FETCH_TRANSCRIPTIONS_MORE_FAIL:
			return {
				...state,
				transcriptionsLoading: false,
				transcriptionsError: action.payload
			};

		default:
			return state;
	}
};
