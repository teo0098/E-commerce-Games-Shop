const reducer = (state, action) => {
    switch (action.type) {
        case 'LOADING':
            return {
                loading: true,
                error: false,
                success: false,
                dataID: action.dataID
            };
        case 'ERROR':
            return {
                loading: false,
                error: true,
                success: false,
                dataID: null
            };
        case 'SUCCESS':
            return {
                loading: false,
                error: false,
                success: true,
                dataID: null
            };
        default:
            return state;
    }
}

export default reducer;