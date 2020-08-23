import React, { useReducer, useEffect } from 'react';
import reducer from '../Credentials/Signup/useReducer/reducer';
import initialState from '../Credentials/Signup/useReducer/initialState';
import axios from 'axios';
import Error from '../Error/Error';
import Spinner from '../Spinner/Spinner';

const withAuth = (Component, role) => {
    return props => {

        const [state, dispatch] = useReducer(reducer, initialState);
        
        useEffect(() => {
            const isAuth = async () => {
                dispatch({ type: 'LOADING' });
                try {
                    const formData = new FormData();
                    formData.append('role', role);
                    formData.append('jwtToken', props.jwtToken);
                    const auth = await axios.post('/isAuth.php', formData);
                    if (auth.data === 'ERROR') throw new Error();
                    else if (auth.data === 'NOTAUTH') return dispatch({ type: 'ERROR', errorMSG: 'Unable to launch this webpage... Unauthorized access.' });
                    dispatch({ type: 'SUCCESS' });
                }
                catch (e) {
                    dispatch({ type: 'ERROR', errorMSG: 'Unable to launch this webpage... Please try again soon.' });
                }
            }
            isAuth();
        }, []);

        return (
            <React.Fragment>
                {state.error ?
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Error>
                            {state.errorMSG}
                        </Error>
                    </div>
                    :
                    null
                }
                {state.loading ?
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Spinner />
                    </div>
                    :
                    null
                }
                {state.success ?
                    <Component {...props} />
                    :
                    null
                }
            </React.Fragment>
        )
    }
}

export default withAuth;