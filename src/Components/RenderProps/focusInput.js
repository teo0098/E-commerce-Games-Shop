import { useRef, useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import reducer from '../Home/useReducer/reducer';
import initialState from '../Home/useReducer/initialState';

const FocusInput = props => {

    const inputSearch = useRef(null);
    const [state, dispatch] = useReducer(reducer, initialState);
    const [game, setGame] = useState('');

    const searchGames = async value => {
        setGame(value);
        if (value.trim() !== '') {
            dispatch({ type: 'LOADING' });
            try {
                const games = await axios.get(`/getSearchedGames.php?gameName=${value}`);
                if (games.data === 'ERROR') throw new Error();
                dispatch({ type: 'SUCCESS', data: games.data });            
            }
            catch (e) {
                dispatch({ type: 'ERROR', error: 'Unable to search for games... Please try again soon.' });
            }
        }
    }

    useEffect(() => {
        if (props.isSearchEngineOn) inputSearch.current.focus();
        else {
            inputSearch.current.value = "";
            setTimeout(() => {
                if (!props.isSearchEngineOn) setGame('');
            }, 200);
        }
    }, [props.isSearchEngineOn]);

    return (
        props.render(inputSearch, searchGames, state, game)
    );
}

export default FocusInput;