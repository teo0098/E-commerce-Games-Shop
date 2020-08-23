import React, { useRef, useEffect, useContext } from 'react';
import styles from './SearchEngine.module.scss';
import isSearchEngineOnContext from '../../../../context/isSearchEngineOn';
import FocusInput from '../../../RenderProps/focusInput';
import Results from './Results/Results';

const SearchEngine = props => {

    const isSearchEngineOn = useContext(isSearchEngineOnContext);
    const searchEngine = useRef(null);

    useEffect(() => {
        if (isSearchEngineOn.on) searchEngine.current.classList.add(`${styles['SearchEngine--enabled']}`);
        else searchEngine.current.classList.remove(`${styles['SearchEngine--enabled']}`);
    }, [isSearchEngineOn.on]);

    return (
        <div ref={searchEngine} className={styles.SearchEngine}>
            <i className={`fas fa-search ${styles.SearchEngine__i} ${styles['SearchEngine__i--search']}`}></i>
            <FocusInput isSearchEngineOn={isSearchEngineOn.on} render={(inputSearch, searchGames, state, game) => (
                <Results inputSearch={inputSearch} searchGames={searchGames} game={game} changeMenu={props.changeMenu} state={state} />
            )} />
        </div>
    );
}

export default SearchEngine;