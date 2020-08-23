const reducer = (state, action) => {
    switch (action.type) {
        case 'LOADING':
            return {
                loading: true,
                error: false,
                errorMSG: '',
                success: false
            };
        case 'ERROR':
            return {
                loading: false,
                error: true,
                errorMSG: action.errorMSG,
                success: false
            };
        case 'SUCCESS':
            return {
                loading: false,
                error: false,
                errorMSG: '',
                success: true
            };
        default:
            return state;
    }
}

export default reducer;