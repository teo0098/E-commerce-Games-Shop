import React from 'react';
import styles from './StoreGames.module.scss';
import queryString from 'query-string';
import GetHomeGames from '../../RenderProps/getHomeGames';
import Error from '../../Error/Error';
import Spinner from '../../Spinner/Spinner';
import Alert from '@material-ui/lab/Alert';
import Pagination from '@material-ui/lab/Pagination';
import { useHistory } from 'react-router-dom';
import ChangeButtons from '../../Home/CheapGames/ChangeButtons/ChangeButtons';
import { Link } from 'react-router-dom';
import useConvertDate from '../../useHooks/useConvertDate';

const StoreGames = props => {

    const history = useHistory();
    const convertDate = useConvertDate();

    const handleChangePage = (e, value) => history.push(`/store?category=${queryString.parse(props.query).category}&page=${value}`);

    return (
        <div className={styles.StoreGames}>
            <GetHomeGames type='searched' url={`/getStoreGames.php?category=${queryString.parse(props.query).category}&page=${queryString.parse(props.query).page}`} 
            render={state => (
                <React.Fragment>
                    {state.error ?
                        <Error>
                            {state.errorMSG}
                        </Error>
                        :
                        null
                    }
                    {state.loading ?
                        <Spinner />
                        :
                        null
                    }
                    {state.data[0] > 0 ?
                        <React.Fragment>
                            {state.data[1].map(game => (
                                <Link key={game.gameName} className={styles.StoreGames__link} to={`/games/${game.gameName}`}>
                                    <section className={styles.StoreGames__game}>
                                        <div className={styles.StoreGames__image} style={{ backgroundImage: `url('${game.imageURL}')` }}></div>
                                        <div className={styles.StoreGames__info}>
                                            <h3 className={styles.StoreGames__gameName}> {game.gameName} </h3>
                                            <span className={styles.StoreGames__date}> {convertDate(game.gameRel)} </span>
                                        </div>
                                        <div className={styles.StoreGames__options}>
                                            <span className={styles.StoreGames__span}>{game.gamePrice}$</span>
                                            <ChangeButtons game={game} />
                                        </div>
                                    </section>
                                </Link>
                            ))}
                            <Pagination style={{ margin: "5vh 0" }} 
                            page={Number(queryString.parse(props.query).page)} count={Math.ceil(Number(state.data[0]) / 5)} color="primary" onChange={handleChangePage} />
                        </React.Fragment>
                        :
                        !state.error && !state.loading ?
                        <Alert style={{ textAlign: 'left', margin: '2vh 0' }} severity="info">We are not equipped in these games.</Alert>
                        :
                        null
                    }
                </React.Fragment>
            )} />
        </div>
    )
}

export default StoreGames;