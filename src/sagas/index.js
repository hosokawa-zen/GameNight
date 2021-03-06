import { all } from 'redux-saga/effects';
import init from './init';
import login from './login';
import state from './state';
import preference from "./preference";
import notification from "./notification";

const root = function* root() {
	yield all([
		init(),
		login(),
		state(),
		preference(),
		notification()
	]);
};

export default root;
