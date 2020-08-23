import React from 'react';
import styles from './Credentials.module.scss';
import { NavLink } from 'react-router-dom';

const Credentials = props => {
    return (
        <div className={styles.Credentials}>
            <div className={styles.Credentials__container}>
                <div className={styles.Credentials__links}>
                    <NavLink activeClassName={styles.Credentials__activeLink} className={styles.Credentials__link} to="/signin">
                        <i className={`fas fa-sign-in-alt ${styles.Credentials__icon}`}></i>
                        Sign in
                    </NavLink>
                    <NavLink activeClassName={styles.Credentials__activeLink} className={styles.Credentials__link} to="/signup">
                        <i className={`fas fa-user-plus ${styles.Credentials__icon}`}></i>
                        Sign up
                    </NavLink>
                </div>
                {props.children}
            </div>
        </div>
    )
}

export default Credentials;