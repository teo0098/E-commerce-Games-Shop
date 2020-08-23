import React from 'react'
import styles from './Heading.module.scss';

const Heading = props => {
    return (
        <div className={styles.Heading}>
            <section className={styles.Heading__section}>
                <span className={`${styles.Heading__span} ${styles.Heading__nickname}`}>
                    {props.name} {props.lastname}
                </span>
                <div onClick={props.logout} className={styles.Heading__logout}>
                    <i className={`fas fa-sign-out-alt ${styles.Heading__icon}`}></i>
                    <span className={styles.Heading__span}>Log out</span>
                </div>
            </section>
            <section className={styles.Heading__section}>
                <span className={styles.Heading__span}>Role: </span>
                <span className={styles.Heading__span}>{ props.mode }</span>
            </section>
        </div>
    )
}

export default Heading;