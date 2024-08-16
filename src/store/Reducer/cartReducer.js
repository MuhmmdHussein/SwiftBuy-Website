const initialState = {
    items: [],      
    itemCount: 0    
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const newItem = action.payload;
            const index = state.items.findIndex(item => item.id === newItem.id);
            let updatedItems;
            if (index > -1) {
                updatedItems = [...state.items];
                updatedItems[index].quantity += newItem.quantity;
            } else {
                updatedItems = [...state.items, newItem];
            }
            return {
                ...state,
                items: updatedItems,
                itemCount: updatedItems.reduce((count, item) => count + item.quantity, 0)
            };

        case 'REMOVE_FROM_CART':
            const itemId = action.payload;
            const filteredItems = state.items.filter(item => item.id !== itemId);
            return {
                ...state,
                items: filteredItems,
                itemCount: filteredItems.reduce((count, item) => count + item.quantity, 0)
            };

        case 'UPDATE_QUANTITY':
            const newItemUpdate = action.payload;
            const updatedQuantityItems = state.items.map(item =>
                item.id === newItemUpdate.id
                    ? { ...item, quantity: newItemUpdate.quantity }
                    : item
            ).filter(item => item.quantity > 0);  // Remove items with zero quantity
            return {
                ...state,
                items: updatedQuantityItems,
                itemCount: updatedQuantityItems.reduce((count, item) => count + item.quantity, 0)
            };

        case 'CLEAR_CART':
            return {
                ...state,
                items: [],
                itemCount: 0  // Ensure itemCount is also reset
            };

        default:
            return state;
    }
};

export default cartReducer;
