const initialState = {
    logging: false,
    error: false,
    errorMSG: '',
    user: []
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGGING':
            return {
                ...initialState,
                logging: true
            };
        case 'ERROR':
            return {
                ...initialState,
                error: true,
                errorMSG: action.errorMSG
            };
        case 'LOGGED':
            return {
                ...initialState,
                user: action.user
            };
        case 'CLEAR':
            return {
                ...state,
                error: false,
                errorMSG: ''
            };
        case 'LOGGEDOUT':
            return {
                ...initialState
            };
        case 'UPDATEACCOUNT':
            return {
                ...state,
                user: [...action.user]
            };
        default:
            return state;
    }
}

export default loginReducer;