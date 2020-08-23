import { useEffect, useReducer } from 'react';
import reducer from '../GameInfo/useReducer/reducer';
import initialState from '../GameInfo/useReducer/initialState';
import axios from 'axios';

const useUpdateUser = (nickname, mode) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        dispatch({ type: 'LOADING' });
        const getUser = async () => {
            try {
                const user = await axios.get(`/getUser.php?user=${nickname}&mode=${mode}`);
                if (user.data === 'ERROR') throw new Error();
                dispatch({ type: 'SUCCESS', data: user.data});
            }
            catch (e) {
                dispatch({ type: 'ERROR', error: `Unable to retrieve user of ${nickname} nickname... Please try again soon.` });
            }
        }
        getUser();
    }, []);

    return state;
}

export default useUpdateUser;