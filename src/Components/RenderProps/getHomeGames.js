import { useReducer, useEffect } from 'react';
import initialState from '../Home/useReducer/initialState';
import reducer from '../Home/useReducer/reducer';
import axios from 'axios';

const GetHomeGames = props => {

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        dispatch({ type: 'LOADING' });
        const getGames = async () => {
            try {
                const games = await axios.get(props.url);
                if (games.data === 'ERROR') throw new Error();
                dispatch({ type: 'SUCCESS', data: games.data });
            }
            catch (error) {
                dispatch({ type: 'ERROR', error: `It seems like we were not able to retrieve ${props.type} games... Please try again soon.` });
            }
        }
        getGames();
    }, [props.url, props.type]);

    return (
        props.render(state)
    );
}

export default GetHomeGames;