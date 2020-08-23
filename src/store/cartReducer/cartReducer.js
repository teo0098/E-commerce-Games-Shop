const initialState = {
    amount: 0,
    content: []
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD':
            return {
                amount: state.amount + action.game.amount,
                content: [
                    ...state.content,
                    action.game
                ]
            };
        case 'REMOVE':
            return {
                amount: state.amount - action.gameToRemove.amount,
                content: [...action.content]
            };
        case 'UPDATE':
            return {
                amount: state.amount + action.amount,
                content: [...action.content]
            };
        case 'CLEARCART':
            return {
                ...initialState
            };
        default:
            return state;
    }
}

export default cartReducer;