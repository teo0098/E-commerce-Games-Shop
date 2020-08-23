import { useReducer, useEffect } from 'react';
import reducer from '../GameInfo/useReducer/reducer';
import initialState from '../GameInfo/useReducer/initialState';
import axios from 'axios';

const useEditGamePanel = props => {

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
            catch (e) {
                dispatch({ type: 'ERROR', error: `It seems like we were not able to retrieve ${props.match.params.game}... Please try again soon.` });
            }
        }
        getGame();
    }, [props.match.params.game]);

    return state;
}

export default useEditGamePanel;