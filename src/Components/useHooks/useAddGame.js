import { useState, useRef, useReducer } from 'react';
import reducer from '../Credentials/Signup/useReducer/reducer';
import initialState from '../Credentials/Signup/useReducer/initialState';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const useAddGame = props => {

    const { register, handleSubmit, errors } = useForm({
        defaultValues: {
            gameName: props.values === '' ? props.values : props.values[0].gameName,
            itemsAmount: props.values === '' ? props.values : props.values[0].itemsAmount,
            gamePrice: props.values === '' ? props.values : props.values[0].gamePrice,
            gameDate: props.values === '' ? props.values : props.values[0].gameRel,
            gameDesc: props.values === '' ? props.values : props.values[0].gameDesc
        }
    });
    const [checked, setChecked] = useState({ category: 0, console: 0 });
    const [ticked, setTicked] = useState({ category: false, console: false });
    const [file, setFile] = useState({ image: null, error: false, errorMSG: '' });
    const imageUpload = useRef(null);
    const [state, dispatch] = useReducer(reducer, initialState);

    const isCategoryChecked = e => {
        setTicked({ ...ticked, category: true });
        if (e.target.checked) setChecked(prevState => ({ ...prevState, category: ++prevState.category }));
        else setChecked(prevState => ({ ...prevState, category: --prevState.category }));
    }

    const isConsoleChecked = e => {
        setTicked({ ...ticked, console: true });
        if (e.target.checked) setChecked(prevState => ({ ...prevState, console: ++prevState.console }));
        else setChecked(prevState => ({ ...prevState, console: --prevState.console }));
    }

    const uploadImage = () => {
        if (imageUpload.current.value) {
            const type = imageUpload.current.files[0].type.split('/');
            if (type[0] !== 'image' && (type[1] !== 'jpeg' || type[1] !== 'jpg' || type[1] !== 'png')) return setFile({ image: null, error: true, errorMSG: 'Wrong image format.' });
            if (imageUpload.current.files[0].size >= 1000000) return setFile({ image: null, error: true, errorMSG: 'File is too large.' });
            setFile({ image: imageUpload.current.files[0], error: false, errorMSG: '' });
        }
    }

    const onSubmit = async data => {
        if (file.image === null) return setFile({ ...file, error: true, errorMSG: 'Upload some image of the game.'});
        setTicked({ category: true, console: true });
        if (checked.category === 0 || checked.console === 0) return;
        dispatch({ type: 'LOADING' });
        try {
            const formData = new FormData();
            Object.keys(data).forEach(key => formData.append(key, data[key]));
            if (props.values !== '') formData.append('gameID', props.values[0].gameID);
            formData.append('image', file.image, file.image.name);
            const game = await axios.post(props.url, formData, { headers: { 'content-type': 'multipart/form-data' } });
            if (game.data === 'ERROR') throw new Error();
            if (game.data === 'EXISTS') return dispatch({ type: 'ERROR', errorMSG: 'This game already exists in our shop.' });
            dispatch({ type: 'SUCCESS' });
        }
        catch (e) {
            dispatch({ type: 'ERROR', errorMSG: props.errorMSG });
        }
    }

    return { register, handleSubmit, errors, state, isCategoryChecked, 
        isConsoleChecked, uploadImage, onSubmit, checked, ticked, file, imageUpload };
}

export default useAddGame;