import React from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import mapCartDispatchToProps from '../../../../store/cartReducer/mapDispatchToProps';
import styles from '../CheapGames.module.scss';

const btnShoppingCartStyles = { backgroundColor: '#2E7D32', fontSize: '18px' }

const blockButtons = e => {
    e.preventDefault();
    e.stopPropagation();
}

const ChangeButtons = props => {
    return (
        props.cartContent.find(gamee => gamee.gameName === props.game.gameName) === undefined ?
            <Button onClick={e => {
                blockButtons(e);
                props.addToCart(props.game, 1);
            }} 
            style={btnShoppingCartStyles} variant="contained" color="primary">
                <i className={`fas fa-cart-plus ${styles.CheapGames__i}`}></i>
            </Button>
            :
            <Button onClick={e => {
                blockButtons(e);
                props.removeFromCart(props.cartContent, { ...props.game, amount: props.cartContent.find(cartGame => cartGame.gameName === props.game.gameName).amount });
            }} 
            style={btnShoppingCartStyles} variant="contained" color="primary">
                <i className={`fas fa-trash-alt ${styles.CheapGames__i}`}></i>
            </Button>
        
    )
}

const mapCartStateToProps = state => {
    return {
        cartContent: state.cart.content
    };
}

export default connect(mapCartStateToProps, mapCartDispatchToProps)(ChangeButtons);