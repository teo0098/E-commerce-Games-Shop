import React, { useState, useEffect, useRef } from 'react';
import styles from './RespNavigation.module.scss';
import Logo from '../Navigation/Logo/Logo';
import ShoppingCart from '../Navigation/ShoppingCart/ShoppingCart';
import SearchEngine from './SearchEngine/SearchEngine';
import { Transition } from 'react-spring/renderprops';
import Menu from '../Navigation/Menu/Menu';

const RespNavigation = () => {

    const [searchEngineOn, setSearchEngine] = useState(false);
    const [respMenu, setRespMenu] = useState(false);
    const searchEngineRef = useRef(null);

    const showSearchEngine = () => searchEngineOn ? setSearchEngine(false) : setSearchEngine(true);

    const closeRespMenu = event => event.target.id !== "menuIcon" ? setRespMenu(false) : null;

    useEffect(() => {
        document.addEventListener('click', e => searchEngineOn && !searchEngineRef.current.contains(e.target) ? showSearchEngine() : null);
    }, [searchEngineOn]);
    
    return (
        <header ref={searchEngineRef} onClick={closeRespMenu} className={styles.RespNavigation}>
            <Transition
                items={searchEngineOn}
                from={{ position: 'absolute', opacity: 0 }}
                enter={{ opacity: 1 }}
                leave={{ opacity: 0 }}
                config={{ duration: 200 }}
            >
                {searchEngineOn => !searchEngineOn ?
                    props => 
                        <div style={props} className={styles.RespNavigation__animation}>
                            <Logo />
                            <ShoppingCart />
                            <div className={styles.RespNavigation__rightSide}>
                                <i onClick={showSearchEngine} className={`fas fa-search ${styles.RespNavigation__i} ${styles['RespNavigation__i--searchIcon']}`}></i>
                                <i id="menuIcon" onClick={() => setRespMenu(!respMenu)} className={`fas fa-bars ${styles.RespNavigation__menuIcon}`}></i>
                            </div>
                            <Transition
                                items={respMenu}
                                from={{ opacity: 0 }}
                                enter={{ opacity: 1 }}
                                leave={{ opacity: 0 }}
                                config={{ duration: 100 }}
                            >
                                {respMenu => respMenu && (props =>
                                    <div style={props} className={styles.RespNavigation__menu}>
                                        <Menu />
                                    </div>
                                )}
                            </Transition>
                        </div>
                    :
                    props => 
                        <div className={styles.RespNavigation__animation} style={props}>
                            <SearchEngine setSearchEngine={showSearchEngine} />
                        </div>
                }
            </Transition>
        </header>
    );
}

export default RespNavigation;