import { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';

const useSignIn = props => {

    const { register, handleSubmit } = useForm();
    const [mode, setMode] = useState('Customer');
    const loginInput = useRef(null);

    useEffect(() => {
        return () => props.error ? props.clear() : null;
    }, [props]);

    const onSubmit = data => {
        const { login, password } = data;
        props.logging(login, password, mode);
    }

    const configMode = target => {
        const { value } = target;
        switch (value) {
            case 'Administrator': return setMode('Administrator');
            case 'Employee': return setMode('Employee');
            case 'Customer': return setMode('Customer');
            default: return value;
        }
    }

    return { register, handleSubmit, loginInput, onSubmit, configMode, mode }
}

export default useSignIn;