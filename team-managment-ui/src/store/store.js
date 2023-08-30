import { createStore,combineReducers  } from 'redux';
import userReducer from './userReducer';
import loadingReducer from './loadingReducer'


const rootReducer = combineReducers({
    loading: loadingReducer,
    user: userReducer    
  });
  const store = createStore(  rootReducer);
export default store;