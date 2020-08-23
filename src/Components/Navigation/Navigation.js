import React, { useState } from 'react';
import styles from './Navigation.module.scss';
import Logo from './Logo/Logo';
import Menu from './Menu/Menu';
import SearchPanel from './SearchPanel/SearchPanel';
import ShoppingCart from './ShoppingCart/ShoppingCart';
import isSearchEngineOnContext from '../../context/isSearchEngineOn';

const Navigation = () => {
    
    const [searchEngineOn, setSearchEngine] = useState(false);

    const showSearchEngine = () => searchEngineOn ? setSearchEngine(false) : setSearchEngine(true);

    return (
        <header className={styles.Navigation}>
            <Logo />
            <Menu searchEngineOn={searchEngineOn} />
            <div className={styles.Navigation__rightSide}>
                <isSearchEngineOnContext.Provider value={{ on: searchEngineOn, setSearchEngine: showSearchEngine }}>
                    <SearchPanel />
                </isSearchEngineOnContext.Provider>
                <ShoppingCart />
            </div>
        </header>
    );
}

export default Navigation;