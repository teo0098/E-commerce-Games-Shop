import React from 'react';
import StoreCategories from './StoreCategories/StoreCategories';
import StoreGames from './StoreGames/StoreGames';
import styles from './Store.module.scss';

const Store = props => {
    return (
        <div className={styles.Store}>
            <StoreCategories query={props.location.search} />
            <StoreGames query={props.location.search} />
        </div>
    )
}

export default Store;