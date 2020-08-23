import React from 'react';
import styles from './SearchPanel.module.scss';
import SearchEngine from './SearchEngine/SearchEngine';
import useSearchPanel from '../../useHooks/useSearchPanel';

const SearchPanel = () => {

    const { searchIcon, closeIcon, searchEngineRef, changeIcons } = useSearchPanel();

    return (
        <div ref={searchEngineRef}>
            <SearchEngine changeMenu={changeIcons} />
            <div className={styles.SearchPanel}>
                <i ref={searchIcon} onClick={changeIcons} className={`fas fa-search ${styles.SearchPanel__i} ${styles['SearchPanel__i--1']}`}></i>
                <i ref={closeIcon} onClick={changeIcons} className={`far fa-window-close ${styles.SearchPanel__i} ${styles['SearchPanel__i--2']} ${styles['SearchPanel__i--disabled']}`}></i>
            </div>
        </div>
    );
}

export default SearchPanel;