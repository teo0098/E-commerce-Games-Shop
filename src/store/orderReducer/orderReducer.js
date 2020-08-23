const initialState = {
    games: [],
    ordered: false,
    deliveryType: 'Courier',
    deliveryPrice: 10,
    totalPrice: 10
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'BUY':
            return {
                ...state,
                games: [ action.alteredGame ],
                ordered: true,
                totalPrice: action.alteredGame.gamePrice * action.alteredGame.amount + initialState.deliveryPrice
            };
        case 'BUYALL':
            return {
                ...state,
                games: [ ...action.games ],
                ordered: true,
                totalPrice: state.deliveryPrice + Number(action.totalPrice)
            };
        case 'CANCEL':
            return {
                ...initialState
            };
        case 'DELIVERY':
            return {
                ...state,
                deliveryType: action.deliveryType,
                deliveryPrice: action.deliveryPrice,
                totalPrice: action.totalPrice
            };
        default:
            return state;
    }
}

export default reducer;