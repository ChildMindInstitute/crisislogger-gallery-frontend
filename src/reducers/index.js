import {combineReducers} from 'redux';
import WordCloudReducer from './wordCloudReducer';

export default combineReducers({
	wordCloud: WordCloudReducer,
});
