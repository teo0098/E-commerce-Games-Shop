import { useRef, useContext, useEffect } from 'react';
import isSearchEngineOnContext from '../../context/isSearchEngineOn';
import styles from '../Navigation/SearchPanel/SearchPanel.module.scss';

const useSearchPanel = () => {
    
    const searchIcon = useRef(null);
    const closeIcon = useRef(null);
    const searchEngineRef = useRef(null);
    const isSearchEngineOn = useContext(isSearchEngineOnContext);

    useEffect(() => {
        document.addEventListener('click', e => {
            if (isSearchEngineOn.on && !searchEngineRef.current.contains(e.target)) {
                changeIcons();
                isSearchEngineOn.setSearchEngine();
            }
        });
    }, [isSearchEngineOn.on]);

    const changeIcons = () => {
        if (!isSearchEngineOn.on) {
            searchIcon.current.classList.add(`${styles['SearchPanel__i--disabled']}`);
            closeIcon.current.classList.remove(`${styles['SearchPanel__i--disabled']}`);
        }
        else {
            searchIcon.current.classList.remove(`${styles['SearchPanel__i--disabled']}`);
            closeIcon.current.classList.add(`${styles['SearchPanel__i--disabled']}`);
        }
        isSearchEngineOn.setSearchEngine();
    }

    return { searchIcon, closeIcon, searchEngineRef, changeIcons }
}

export default useSearchPanel;