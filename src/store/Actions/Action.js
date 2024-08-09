export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';

export function toggleFavorite(product) {
  return {
    type: TOGGLE_FAVORITE,
    payload: product,
  };
}



