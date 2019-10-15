import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
export const store = createStore(
    function reducer(state ,action){
        return state;
    },
    applyMiddleware(createLogger())
);