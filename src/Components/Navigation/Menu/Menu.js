import React, { useRef, useEffect } from 'react';
import styles from './Menu.module.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Menu = props => {

    const nav = useRef(null);

    useEffect(() => {
        if (props.searchEngineOn) nav.current.classList.add(`${styles['Menu--disabled']}`);
        else nav.current.classList.remove(`${styles['Menu--disabled']}`);
    }, [props.searchEngineOn]);

    return (
        <nav ref={nav} className={styles.Menu}>
            <Link className={styles.Menu__link} to="/store?category=All&page=1">
                <i className={`fas fa-store ${styles.Menu__i}`}></i>
                STORE
            </Link>
            <Link className={styles.Menu__link} to="/help">
                <i className={`fas fa-info ${styles.Menu__i}`}></i>
                HELP
            </Link>
            {props.user.length === 0 ?
                <Link className={styles.Menu__link} to="/signin">
                    <i className={`fas fa-sign-in-alt ${styles.Menu__i}`}></i>
                    SIGN IN
                </Link>
                :
                <Link className={styles.Menu__link} to="/signin">
                    <i className={`fas fa-user-circle ${styles.Menu__i}`}></i>
                    MY PROFILE
                </Link>
            }
        </nav>
    );
}

const mapLoginStateToProps = state => {
    return {
        user: state.login.user
    };
}

export default connect(mapLoginStateToProps)(Menu);