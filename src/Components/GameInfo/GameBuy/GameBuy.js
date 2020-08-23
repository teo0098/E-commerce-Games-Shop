import React from 'react';
import styles from './GameBuy.module.scss';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import mapCartDispatchToProps from '../../../store/cartReducer/mapDispatchToProps';
import GamesAmountToBuy from '../../RenderProps/gamesAmountToBuy';

const btnFont = { fontSize: '16px' };

const btnShoppingCartStyles = { margin: '3vh 0', fontSize: '16px',  backgroundColor: '#2E7D32' };

const GameBuy = props => {

    const renderCartOption = amount => {
        const game = props.cartContent.find(game => game.gameName === props.game[0].gameName);
        if (game === undefined)
            return (
                <Button onClick={() => props.addToCart(props.game[0], amount)} style={btnShoppingCartStyles} variant="contained" color="primary">
                    <i className={`fas fa-cart-plus ${styles.GameBuy__cartPlus}`}></i>
                    Add to shopping cart
                </Button>
            );
        else 
            return (
                <Button onClick={() => props.removeFromCart(props.cartContent, { ...props.game[0], amount: game.amount })} style={btnShoppingCartStyles} variant="contained" color="primary">
                    <i className={`fas fa-trash-alt ${styles.GameBuy__cartPlus}`}></i>
                    Remove from shopping cart
                </Button>
            );
    }

    return (
        <GamesAmountToBuy game={props.game[0]} gameAmount="1" render={(amount, increaseAmount, decreaseAmount, buyGame) => (
            <React.Fragment>
                <span className={styles.GameBuy__price}> {(props.game[0].gamePrice * amount).toFixed(2)}$ </span>
                {renderCartOption(amount)}
                <div className={styles.GameBuy__amount}>
                    <Button onClick={decreaseAmount} style={btnFont} variant="contained" color="primary">
                        <i className="fas fa-minus"></i>
                    </Button>
                    <span className={styles.GameBuy__span}>
                        {amount}
                    </span>
                    <Button onClick={increaseAmount} style={btnFont} variant="contained" color="primary">
                        <i className="fas fa-plus"></i>
                    </Button>
                </div>
                <Button onClick={() => buyGame(props.game[0], amount)} style={btnFont} variant="contained" color="primary">
                    Buy now
                </Button>
            </React.Fragment>
        )} />
    );
}

const mapCartStateToProps = state => {
    return {
        cartContent: state.cart.content
    };
}

export default connect(mapCartStateToProps, mapCartDispatchToProps)(GameBuy);