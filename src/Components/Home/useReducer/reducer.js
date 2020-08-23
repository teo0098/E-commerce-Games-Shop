const reducer = (state, action) => {
    switch (action.type) {
        case 'LOADING':
            return {
                loading: true,
                error: false,
                errorMSG: '',
                data: []
            };
        case 'ERROR':
            return {
                loading: false,
                error: true,
                errorMSG: action.error,
                data: []
            };
        case 'SUCCESS':
            return {
                loading: false,
                error: false,
                errorMSG: '',
                data: [...action.data]
            };
        default:
            return state;
    }
}

export default reducer;