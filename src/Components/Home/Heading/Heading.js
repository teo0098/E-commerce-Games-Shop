import React from 'react'
import styles from './Heading.module.scss';

const Heading = props => {
    return (
        <header className={styles.Heading}>
            <i className={`fas fa-newspaper ${styles.Heading__i}`}></i>
            <h3 className={styles.Heading__h3}> {props.children} </h3>
        </header>
    )
}

export default Heading
