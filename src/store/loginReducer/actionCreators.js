import axios from 'axios';

export const clear = () => {
    return {
        type: 'CLEAR'
    };
}

export const logged = user => {
    return {
        type: 'LOGGED',
        user
    };
}

export const error = errorMSG => {
    return {
        type: 'ERROR',
        errorMSG
    };
}

export const loggedOut = () => {
    return {
        type: 'LOGGEDOUT'
    };
}

const loggingProcess = () => {
    return {
        type: 'LOGGING'
    };
}

export const logging = (login, password, mode) => {
    const userLogin = login;
    return async dispatch => {
        dispatch(loggingProcess());
        try {
            const formData = new FormData();
            formData.append('login', userLogin);
            formData.append('password', password);
            formData.append('mode', mode)
            const login = await axios.post('/signin.php', formData);
            if (login.data === 'ERROR') throw new Error();
            if (login.data === 'NOTEXISTS') return dispatch(error('Wrong credentials.'));
            dispatch(logged(login.data));
        }
        catch (e) {
            dispatch(error('Unable to sign you in... Please try again soon.'));
        }
    }
}

export const updateAccount = user => {
    return {
        type: 'UPDATEACCOUNT',
        user
    };
}