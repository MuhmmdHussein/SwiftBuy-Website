const initialState = {
    items: [],      
    itemCount: 0    
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        // Add item to cart
        case 'ADD_TO_CART':
            const newItem = action.payload;
            const index = state.items.findIndex(item => item.id === newItem.id);
            let updatedItems;
            if (index > -1) {
                // Item already in cart, update quantity
                updatedItems = [...state.items];
                updatedItems[index].quantity += newItem.quantity;
            } else {
                // Item not in cart, add new item
                updatedItems = [...state.items, newItem];
            }
            return {
                ...state,
                items: updatedItems,
                itemCount: updatedItems.reduce((count, item) => count + item.quantity, 0)
            };

        // Remove item from cart
        case 'REMOVE_FROM_CART':
            const itemId = action.payload;
            const filteredItems = state.items.filter(item => item.id !== itemId);
            return {
                ...state,
                items: filteredItems,
                itemCount: filteredItems.reduce((count, item) => count + item.quantity, 0)
            };

        // Update item quantity
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

        default:
            return state;
    }
};

export default cartReducer;
