import React from 'react';
import styles from './GameInfo.module.scss';
import GameBuy from './GameBuy/GameBuy';
import GameDetails from './GameDetails/GameDetails';
import Error from '../Error/Error';
import Spinner from '../Spinner/Spinner';
import useGameInfo from '../useHooks/useGameInfo';

const GameInfo = props => {

    const state = useGameInfo(props);

    const renderComponent = () => {
        if (state.error)
            return (
                <Error>
                    {state.errorMsg}
                </Error>
            );
        if (state.loading)
            return (
                <div style={{ textAlign: 'center' }}>
                    <Spinner />
                </div>
            );
        if (!state.error && !state.loading)
            return (
                <React.Fragment>
                    <div className={styles.GameInfo} style={{ backgroundImage: `url('${state.data[0].imageURL}')`  }}>
                        <header className={styles.GameInfo__header}>
                            <h1 className={styles.GameInfo__gameName}> {state.data[0].gameName} </h1>
                            <section className={styles.GameInfo__section}>
                                <GameBuy game={state.data} />
                            </section>
                        </header>
                    </div>
                    <section className={styles.GameInfo__sectionResp}>
                        <GameBuy game={state.data} />
                    </section>
                    <GameDetails game={state.data} />
                </React.Fragment>
            );
    }

    return (
        renderComponent()
    );
}

export default GameInfo;