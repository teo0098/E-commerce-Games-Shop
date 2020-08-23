const reducer = (state, action) => {
    switch (action.type) {
        case 'LOADING':
            return {
                loading: true,
                error: false,
                errorMsg: '',
                data: {}
            };
        case 'ERROR':
            return {
                loading: false,
                error: true,
                errorMsg: action.error,
                data: {}
            };
        case 'SUCCESS':
            return {
                loading: false,
                error: false,
                errorMsg: '',
                data: { ...action.data }
            };
        default:
            return state;
    }
}

export default reducer;