import React from 'react';
import styles from './CheapGames.module.scss';
import Heading from '../Heading/Heading';
import GetHomeGames from '../../RenderProps/getHomeGames';
import Error from '../../Error/Error';
import { Link } from 'react-router-dom';
import ChangeButtons from './ChangeButtons/ChangeButtons';

const CheapGames = () => {
    return (
        <div className={styles.CheapGames}>
            <Heading>
                Cheap games!
            </Heading>
            <GetHomeGames type='cheap' url='/getCheapGames.php' render={state => (
                <React.Fragment>
                    {state.error ?
                        <Error>
                            {state.errorMSG}
                        </Error>
                        :
                        <div className={styles.CheapGames__games}>
                            {state.data.map(game => (
                                <section className={styles.CheapGames__section} key={game.gameName}>
                                    <div className={styles.CheapGames__div}>
                                        <div className={styles.CheapGames__image} style={{ backgroundImage: `url('${game.imageURL}')` }}></div>
                                        <Link className={styles.CheapGames__link} to={`/games/${game.gameName}`}>
                                            {game.gameName}
                                        </Link>
                                    </div>
                                    <div className={styles.CheapGames__div}>
                                        <span className={styles.CheapGames__span}>{game.gamePrice}$</span>
                                        <ChangeButtons game={game} />
                                    </div>
                                </section>
                            ))}
                        </div>
                    }
                </React.Fragment>
            )} />
        </div>
    );
}

export default CheapGames;