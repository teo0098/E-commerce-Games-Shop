import { useReducer } from 'react';
import axios from 'axios';
import initialState from '../Credentials/Signup/useReducer/initialState';
import reducer from '../Credentials/Signup/useReducer/reducer';
import { connect } from 'react-redux';
import mapLoginDispatchToProps from '../../store/loginReducer/mapDispatchToProps';

const CreateUser = props => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const onSubmit = async data => {
        dispatch({ type: 'LOADING' });
        try {
            if (data.name) data.name = data.name.toLowerCase();
            if (data.lastname) data.lastname = data.lastname.toLowerCase()
            const formData = new FormData();
            Object.keys(data).forEach(key => {
                data[key] = data[key].trim();
                formData.append(key, data[key]);
            });
            formData.append('mode', props.mode);
            if (props.recaptcha !== null) formData.append('recaptcha', props.recaptcha)
            const register = await axios.post(props.url, formData);
            if (register.data === 'ERROR') throw new Error();
            else if (register.data === 'PHONEEXISTS') return dispatch({ type: 'ERROR', errorMSG: 'This phone number already exists in the database.' });
            else if (register.data === 'NICKNAMEEXISTS') return dispatch({ type: 'ERROR', errorMSG: 'This nickname already exists in the database.' });
            else if (register.data === 'EMAILEXISTS') return dispatch({ type: 'ERROR', errorMSG: 'This email already exists in the database.' });
            else if (register.data === 'RECAPTCHA') return dispatch({ type: 'ERROR', errorMSG: 'Confirm that you are a human.' });
            if (props.userUpdate) {
                const updatedUser = [{...data}, props.user[1], register.data];
                props.updateAccount(updatedUser);
            }
            dispatch({ type: 'SUCCESS' });
        }
        catch (e) {
            dispatch({ type: 'ERROR', errorMSG: props.children });
        }
    }

    return (
        props.render(onSubmit, state)
    )
}

const mapLoginStateToProps = state => {
    return {
        user: state.login.user
    };
}

export default connect(mapLoginStateToProps, mapLoginDispatchToProps)(CreateUser);