import React from 'react'
import styles from './Option.module.scss';
import { Link } from 'react-router-dom';

const Option = props => {
    return (
        <div className={styles.Option}>
            <h3>{props.title}</h3>
            <p className={styles.Option__p}> {props.children} </p>
            <Link className={styles.Option__link} to={`${props.url}`}>
                {props.function}
            </Link>
        </div>
    )
}

export default Option;
