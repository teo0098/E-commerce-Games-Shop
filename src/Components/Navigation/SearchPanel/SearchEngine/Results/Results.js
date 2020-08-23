import React from 'react';
import Error from '../../../../Error/Error';
import Spinner from '../../../../Spinner/Spinner';
import Alert from '@material-ui/lab/Alert';
import { Link } from 'react-router-dom';
import styles from './Results.module.scss';

const Results = props => {
    return (
        <div style={{ width: '100%' }}>
            <input onChange={e => props.searchGames(e.target.value)} spellCheck="false" ref={props.inputSearch} className={styles.Results} type="text"/>
            {props.game.trim() === '' ?
                null
                :
                <div onClick={props.changeMenu} className={styles.Results__outcome}>
                    {props.state.error ?
                        <Error>
                            {props.state.errorMSG}
                        </Error>
                        :
                        null
                    }
                    {props.state.loading ? 
                        <Spinner />
                        :
                        null
                    }
                    {props.state.data.length !== 0 ?
                        props.state.data.map(game => (
                            <Link key={game.gameName} className={styles.Results__link} to={`/games/${game.gameName}`}>
                                <section className={styles.Results__result}>
                                    <div className={styles.Results__div}>
                                        <div className={styles.Results__image} style={{ backgroundImage: `url('${game.imageURL}')` }}></div>
                                        <h4 className={styles.Results__gameName}> {game.gameName} </h4>
                                    </div>
                                    <span className={styles.Results__gamePrice}> {game.gamePrice}$ </span>
                                </section>
                            </Link>
                        ))
                        :
                        !props.state.error && !props.state.loading ?
                        <Alert style={{ textAlign: 'left' }} severity="info">We are not equipped in this game...</Alert>
                        :
                        null
                    }
                </div>
            }
        </div>
    )
}

export default Results;