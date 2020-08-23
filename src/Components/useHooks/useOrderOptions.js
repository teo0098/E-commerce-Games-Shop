import { useState, useReducer } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import reducer from '../Credentials/Signup/useReducer/reducer';
import initialState from '../Credentials/Signup/useReducer/initialState';

const useOrderOptions = props => {
    
    const { register, handleSubmit, errors } = useForm({
        defaultValues: {
            name: props.name,
            lastname: props.lastname,
            phone: props.phone,
            email: props.email
        }
    });
    const [payment, setPayment] = useState('In advance');
    const [state, dispatch] = useReducer(reducer, initialState);

    const changeDelivery = target => {
        const { value } = target;
        let deliveryChange;
        if (value === 'Courier') {
            deliveryChange = { deliveryType: 'Courier', deliveryPrice: 10 };   
        }
        else if (value === 'Self reclaim') {
            deliveryChange = { deliveryType: 'Self reclaim', deliveryPrice: 0 }
        }
        else {
            deliveryChange = { deliveryType: 'Certified letter', deliveryPrice: 5 };
        }
        const totalPrice = props.orderGames.reduce((prevValue, currentValue) => {
            return prevValue + (currentValue.gamePrice * currentValue.amount);
        }, 0);
        props.changeDelivery(deliveryChange.deliveryType, deliveryChange.deliveryPrice, deliveryChange.deliveryPrice + totalPrice);
    }

    const changePayment = target => {
        const { value } = target;
        setPayment(value);
    }

    const onSubmit = async data => {
        dispatch({ type: 'LOADING' });
        try {
            data.name = data.name.toLowerCase();
            data.lastname = data.lastname.toLowerCase();
            const formData = new FormData();
            Object.keys(data).forEach(key => {
                data[key] = data[key].trim();
                formData.append(key, data[key]);
            });
            formData.append('delivery', props.deliveryType);
            formData.append('payment', payment);
            formData.append('totalPrice', props.totalPrice);
            const orderedGames = props.orderGames.map(game => {
                return { gameName: game.gameName, gamePrice: game.gamePrice, amount: game.amount };
            });
            orderedGames.forEach(game => {
                formData.append(`gamesNames[${game.gameName}]`, game.gameName);
                formData.append(`gamesPrices[${game.gameName}]`, game.gamePrice);
                formData.append(`gamesAmounts[${game.gameName}]`, game.amount);
            });
            formData.append('recaptcha', props.recaptcha);
            const order = await axios.post('/makeOrder.php', formData);
            console.log(order.data);
            if (order.data === 'ERROR') throw new Error();
            else if (order.data === 'RECAPTCHA') return dispatch({ type: 'ERROR', errorMSG: 'Confirm that you are a human.' });
            dispatch({ type: 'SUCCESS' });
        }
        catch (e) {
            dispatch({ type: 'ERROR', errorMSG: 'Unable to process your order... Please try again soon.' });
        }
    }

    return { register, handleSubmit, errors, state, changeDelivery, changePayment, onSubmit, payment }
}

export default useOrderOptions;