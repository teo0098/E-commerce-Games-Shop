import { useReducer } from 'react';
import { useForm } from 'react-hook-form';
import reducer from '../Credentials/Signup/useReducer/reducer';
import initialState from '../Credentials/Signup/useReducer/initialState';
import axios from 'axios';

const useHelp = props => {
    
    const [state, dispatch] = useReducer(reducer, initialState);
    const { register, handleSubmit, errors } = useForm({
        defaultValues: {
            name: props.name,
            email: props.email
        }
    });

    const onSubmit = async data => {
        dispatch({ type: 'LOADING' });
        try {
            const formData = new FormData();
            formData.append('recaptcha', props.recaptcha);
            formData.append('from', data.email);
            formData.append('msg', data.message);
            formData.append('name', data.name);
            const msg = await axios.post('/sendMessage.php', formData);
            if (msg.data === 'ERROR') throw new Error();
            else if (msg.data === 'RECAPTCHA') return dispatch({ type: 'ERROR', errorMSG: 'Confirm that you are a human.' });
            dispatch({ type: 'SUCCESS' });
        }
        catch (e) {
            dispatch({ type: 'ERROR', errorMSG: 'Unable to send your message... Please try again soon.' });
        }
    };

    return { state, register, handleSubmit, errors, onSubmit }
}

export default useHelp;