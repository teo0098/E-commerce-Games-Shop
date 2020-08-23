import React from 'react';
import styles from './Logo.module.scss';
import { Link } from 'react-router-dom';

const Logo = () => (
    <Link to="/" className={styles.Logo}>
        <i className={`fas fa-gamepad ${styles.Logo__i}`}></i>
    </Link>
);

export default Logo;