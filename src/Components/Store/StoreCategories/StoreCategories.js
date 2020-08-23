import React from 'react';
import styles from './StoreCategories.module.scss';
import { NavLink } from 'react-router-dom';
import queryString from 'query-string';

const categories = ["Action", "RPG", "Adventure", "FPS", "Strategy", "Sport", "Simulation"];

const StoreCategories = props => {
    return (
        <div className={styles.StoreCategories}>
            <div className={styles.StoreCategories__categories}>
                <NavLink activeClassName={queryString.parse(props.query).category === 'All' ? styles['StoreCategories__link--active'] : null} className={styles.StoreCategories__link} 
                exact to={`/store?category=All&page=1`}>
                    All
                </NavLink>
            </div>
            <div className={styles.StoreCategories__categories}>
                {categories.map(category => (
                    <NavLink activeClassName={queryString.parse(props.query).category === category ? styles['StoreCategories__link--active'] : null} className={styles.StoreCategories__link}
                    key={category} exact to={`/store?category=${category}&page=1`}>
                        {category}
                    </NavLink>
                ))}
            </div>
        </div>
    )
}

export default StoreCategories;