import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import FavoriteProduct from '../Reducer/Redusr';


const rootReducer = combineReducers({
    favoriteProduct: FavoriteProduct,
  });
  
 
  
  const store = createStore(rootReducer,composeWithDevTools());
  

//const store = createStore(rootReducer, composeWithDevTools());

export default store;