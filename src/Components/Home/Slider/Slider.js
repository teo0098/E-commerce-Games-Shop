import React, { useRef } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderAnimation from "react-slick";
import styles from './Slider.module.scss';
import Error from '../../Error/Error';
import Spinner from '../../Spinner/Spinner';
import { Link } from 'react-router-dom';
import settings from './SliderSettings';
import GetHomeGames from '../../RenderProps/getHomeGames';
import Heading from '../Heading/Heading';

const Slider = () => {

    const slider = useRef(null);

    const goNext = () => slider.current.slickNext();

    const goPrev = () => slider.current.slickPrev();

    return (
        <div className={styles.Slider}>
            <Heading>
                What's new?
            </Heading>
            <GetHomeGames type='new' url='/getNewGames.php' render={state => (
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
                        <SliderAnimation ref={slider} className={styles.Slider__animation} {...settings}>
                            {state.data.map(game => (
                                <div key={game.gameName} className={styles.Slider__slide}>
                                    <i onClick={goNext} className={`fas fa-arrow-alt-circle-right ${styles.Slider__go} ${styles.Slider__next}`}></i>
                                    <i onClick={goPrev} className={`fas fa-arrow-alt-circle-left ${styles.Slider__go} ${styles.Slider__prev}`}></i>
                                    <div style={{ backgroundImage: `url('${game.imageURL}')` }} className={styles.Slider__slideChild}>
                                        <section className={styles.Slider__section}>
                                            <h2 className={styles.Slider__gameName}> {game.gameName} </h2>
                                            <div className={styles.Slider__sectionRight}>
                                                <span className={styles.Slider__price}> {game.gamePrice}$ </span>
                                                <Link className={styles.Slider__link} to={`/games/${game.gameName}`}>
                                                    EXPLORE
                                                </Link>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            ))}
                        </SliderAnimation>
                    }
                </React.Fragment>
            )} />
        </div>
    );
}

export default Slider;