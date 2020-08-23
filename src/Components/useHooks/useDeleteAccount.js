import { useReducer } from 'react';
import { useForm } from 'react-hook-form';
import reducer from '../Credentials/Signup/useReducer/reducer';
import initialState from '../Credentials/Signup/useReducer/initialState';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const useDeleteAccount = props => {
    
    const { register, handleSubmit, errors } = useForm();
    const [state, dispatch] = useReducer(reducer, initialState);
    const history = useHistory();

    const onSubmit = async data => {
        dispatch({ type: 'LOADING' });
        try {
            const formData = new FormData();
            formData.append('password', data.password);
            formData.append('nickname', props.nickname);
            formData.append('mode', 'customers');
            const deleted = await axios.post('/deleteData.php', formData);
            if (deleted.data === 'ERROR') throw new Error();
            dispatch({ type: 'SUCCESS' });
            setTimeout(() => {
                props.logout();
                history.push('/signin');
            }, 5000);
        }
        catch (e) {
            dispatch({ type: 'ERROR', errorMSG: 'Unable to delete your account...Please try again soon.' })
        }
    }

    return { register, handleSubmit, errors, state, onSubmit }
}

export default useDeleteAccount;