import { useReducer, useEffect } from 'react';
import axios from 'axios';
import reducer from '../Credentials/Signup/useReducer/reducer';
import initialState from '../Credentials/Signup/useReducer/initialState';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';

const useVerification = props => {
    
    const [state, dispatch] = useReducer(reducer, initialState);
    const history = useHistory();
    
    useEffect(() => {
        dispatch({ type: 'LOADING' });
        const queryData = queryString.parse(props.location.search);
        const verify = async () => {
            try {
                const formData = new FormData();
                if (queryData.vkey) formData.append('vkey', queryData.vkey);
                else return history.push('/');
                const verified = await axios.post('/verifyRegistration.php', formData);
                if (verified.data === 'ERROR') throw new Error();
                dispatch({ type: 'SUCCESS' });
            }
            catch (e) {
                dispatch({ type: 'ERROR', errorMSG: 'Unable to verify your account... Please try again soon.' });
            }
        }
        verify();
    }, [props.location.search, history]);

    return state;
}

export default useVerification;