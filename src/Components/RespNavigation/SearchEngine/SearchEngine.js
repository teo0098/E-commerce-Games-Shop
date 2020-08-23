import React from 'react';
import styles from './SearchEngine.module.scss'
import FocusInput from '../../RenderProps/focusInput';
import Results from '../../Navigation/SearchPanel/SearchEngine/Results/Results';

const SearchEngine = props => {
    return (
        <div className={styles.SearchEngine}>
            <i className={`fas fa-search ${styles.SearchEngine__i} ${styles['SearchEngine__i--search']}`}></i>
            <FocusInput isSearchEngineOn={props.setSearchEngine} render={(inputSearch, searchGames, state, game) => (
                <Results inputSearch={inputSearch} searchGames={searchGames} game={game} changeMenu={props.setSearchEngine} state={state} />
            )} />
            <i onClick={props.setSearchEngine} className={`far fa-window-close ${styles.SearchEngine__i} ${styles['SearchEngine__i--RespClose']}`}></i>
        </div>
    );
}

export default SearchEngine;