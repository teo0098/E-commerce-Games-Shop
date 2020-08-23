import { useEffect, useReducer } from 'react';
import reducer from '../Home/useReducer/reducer';
import initialState from '../Home/useReducer/initialState';
import axios from 'axios';
import statusReducer from '../Employees/deleteReducer/reducer';
import statusInitialState from '../Employees/deleteReducer/initialState';

const useGetOrders = (url) => {

    const [state, dispatch] = useReducer(reducer, initialState);
    const [statusState, statusDispatch] = useReducer(statusReducer, statusInitialState);

    useEffect(() => {
        dispatch({ type: 'LOADING' });
        const getOrders = async () => {
            try {
                const orders = await axios.get(url);
                if (orders.data === 'ERROR') throw new Error();
                dispatch({ type: 'SUCCESS', data: orders.data });
            }
            catch (e) {
                dispatch({ type: 'ERROR', error: 'Unable to retrieve orders... Please try again soon.' });
            }
        }
        getOrders();
    }, []);

    const setOrderStatus = async (status, orderID) => {
        statusDispatch({ type: 'LOADING', dataID: orderID });
        try {
            const formData = new FormData();
            formData.append('status', status);
            formData.append('orderID', orderID);
            const changeOrder = await axios.post('/changeOrderStatus.php', formData);
            if (changeOrder.data === 'ERROR') throw new Error();
            statusDispatch({ type: 'SUCCESS' });
            dispatch({ type: 'SUCCESS', data: changeOrder.data });
        }
        catch (e) {
            statusDispatch({ type: 'ERROR' });
        }
    }

    const splitOrderedGames = games => games.split(';');

    return { state, splitOrderedGames, setOrderStatus, statusState };
}

export default useGetOrders;