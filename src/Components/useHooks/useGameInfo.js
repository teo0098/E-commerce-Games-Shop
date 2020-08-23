import { useReducer, useEffect } from 'react';
import axios from 'axios';
import initialState from '../GameInfo/useReducer/initialState';
import reducer from '../GameInfo/useReducer/reducer';

const useGameInfo = props => {

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        dispatch({ type: 'LOADING' });
        const getGame = async () => {
            try {
                const game = await axios.get(`/getSpecificGame.php?game=${props.match.params.game}`);
                if (game.data === 'ERROR') throw new Error();
                if (game.data === 'NOTFOUND') throw new Error();
                dispatch({ type: 'SUCCESS', data: game.data });
            }
            catch (error) {
                dispatch({ type: 'ERROR', error: `It seems like we were not able to retrieve ${props.match.params.game}... Please try again soon.` });
            }
        }
        getGame();
    }, [props.match.params.game]);

    return state;
}

export default useGameInfo;