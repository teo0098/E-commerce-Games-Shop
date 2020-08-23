import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import styles from './Cart.module.scss';
import mapCartDispatchToProps from '../../store/cartReducer/mapDispatchToProps';
import mapOrderDispatchToProps from '../../store/orderReducer/mapDispatchToProps';
import Alert from '@material-ui/lab/Alert';
import GamesAmountToBuy from '../RenderProps/gamesAmountToBuy';
import useCart from '../useHooks/useCart';

const btnSize = { fontSize: '16px' };

const Cart = props => {

    const { totalCart, buyAll } = useCart(props);

    return (
        <div className={styles.Cart}>
            {props.cartAmount < 1 ?
                <Alert style={{ fontSize: '17px', textAlign: 'left', marginTop: '5vh' }} severity="info">Your shopping cart is currently empty</Alert>
                :
                <React.Fragment>
                    <div className={`${styles.Cart__game} ${styles.Cart__totalContainer}`}>
                        <div className={styles.Cart__summary}>
                            <span className={styles.Cart__totalSpan}>Total:</span>
                            <span className={styles.Cart__totalPrice}>
                                {totalCart()}$
                            </span>
                        </div>
                        <div className={styles.Cart__total}>
                            <div className={styles.Cart__buyAll}>
                                <Button onClick={buyAll} style={btnSize} variant="contained" color="primary">
                                    Buy all
                                </Button>
                            </div>
                            <Button onClick={() => props.clearCart()} style={btnSize} variant="contained" color="secondary">
                                Clear cart
                            </Button>
                        </div>
                    </div>
                    {props.cartContent.map(game => (
                        <div className={styles.Cart__game} key={game.gameName}>
                            <div className={styles.Cart__image} style={{backgroundImage: `url('${game.imageURL}')`}}></div>
                            <Link className={styles.Cart__link} to={`/games/${game.gameName}`}>
                                {game.gameName}
                            </Link>
                            <GamesAmountToBuy cartContent={props.cartContent} game={game} gameAmount={game.amount} render={(amount, increaseAmount, decreaseAmount, buyGame) => (
                                <React.Fragment>
                                    <div className={styles.Cart__options}>
                                        <div className={styles.Cart__priceOption}>
                                            <Button onClick={decreaseAmount} style={{ ...btnSize, marginRight: '2vw' }} variant="contained" color="primary">
                                                <i className="fas fa-minus"></i>
                                            </Button>
                                            <span className={styles.Cart__amount}>
                                                {amount}
                                            </span>
                                            <Button onClick={increaseAmount} style={{ ...btnSize, marginLeft: '2vw' }} variant="contained" color="primary">
                                                <i className="fas fa-plus"></i>
                                            </Button>
                                        </div>
                                        <span className={styles.Cart__price}>
                                            {(game.gamePrice * amount).toFixed(2)}$
                                        </span>
                                        <div className={styles.Game__actions}>
                                            <Button onClick={() => buyGame(game, amount)} style={{ ...btnSize, margin: '0 2vw' }} variant="contained" color="primary">
                                                Buy now
                                            </Button>
                                            <i onClick={() => props.removeFromCart(props.cartContent, game)} className={`fas fa-trash-alt ${styles.Cart__trashBin}`}></i>
                                        </div>
                                    </div>
                                </React.Fragment>
                            )} />
                        </div>  
                    ))}
                </React.Fragment>
            }
        </div>
    ) 
}

const mapCartStateToProps = state => {
    return {
        cartAmount: state.cart.amount,
        cartContent: state.cart.content
    };
}

export default connect(null, mapOrderDispatchToProps)(connect(mapCartStateToProps, mapCartDispatchToProps)(Cart));