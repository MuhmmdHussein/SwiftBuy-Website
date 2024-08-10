import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import FavoriteProduct from '../Reducer/Redusr';
import cartReducer from '../Reducer/cartReducer';

const rootReducer = combineReducers({
    favoriteProduct: FavoriteProduct,
    Cart: cartReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;
