// import { ADDTOFAVORITES, REMOVEFROMFAVORITES } from "../Actions/Action";
import { TOGGLE_FAVORITE } from "../Actions/Action";
const initialState = {
  favorites: [],
};

function FavoriteProduct(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const product = action.payload;
      const index = state.favorites.findIndex((fav) => fav.id === product.id);
      if (index === -1) {
        return { ...state, favorites: [...state.favorites, product] };
      } else {
        return { ...state, favorites: state.favorites.filter((fav) => fav.id !== product.id) };
      }
    default:
      return state;
  }
};

export default FavoriteProduct;
