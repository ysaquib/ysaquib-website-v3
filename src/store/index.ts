import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import authReducer from './reducers/authReducer';
import {aboutReducer, bannerReducer, blogReducer, projectReducer} from './reducers/dataReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    banner: bannerReducer,
    about: aboutReducer,
    projects: projectReducer,
    blogs: blogReducer
});

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);
composeWithDevTools(applyMiddleware(thunk))

export type RootState = ReturnType<typeof rootReducer>;

export default store;