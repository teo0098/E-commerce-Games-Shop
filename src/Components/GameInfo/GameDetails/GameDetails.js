import React from 'react'
import styles from './GameDetails.module.scss';
import useConvertDate from '../../useHooks/useConvertDate';

const GameDetails = props => {

    const convertDate = useConvertDate();

    return (
        <div className={styles.GameDetails}>
            <article className={styles.GameDetails__desc}>
                <header className={styles.GameDetails__header}>
                    <i className={`fas fa-edit ${styles.GameDetails__icon}`}></i>
                    <h3 className={styles.GameDetails__h3}>Description</h3>
                </header>
                <p className={styles.GameDetails__p}>{props.game[0].gameDesc}</p>
            </article>
            <section className={styles.GameDetails__details}>
                <header className={styles.GameDetails__header}>
                    <i className="fas fa-clipboard-list"></i>
                    <h3 className={styles.GameDetails__h3}>Details</h3>
                </header>
                <section className={styles.GameDetails__detail}>
                    <span>Game's released date:</span>
                    <span>{convertDate(props.game[0].gameRel)}</span>
                </section>
                <section className={styles.GameDetails__detail}>
                    <span>Game's genres:</span>
                    <div>
                        {props.game[1].map((genre, index) => (
                            <span key={genre.category}> {genre.category}{index < props.game[1].length - 1 ? "," : null} </span>
                        ))}
                    </div>
                </section>
                <section className={styles.GameDetails__detail}>
                    <span>Game's consoles:</span>
                    <div>
                        {props.game[2].map((console, index) => (
                            <span key={console.console}> {console.console}{index < props.game[2].length - 1 ? "," : null} </span>
                        ))}
                    </div>
                </section>
            </section>
        </div>
    )
}

export default GameDetails