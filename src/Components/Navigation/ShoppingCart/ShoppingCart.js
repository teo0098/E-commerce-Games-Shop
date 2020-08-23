import React from 'react';
import styles from './ShoppingCart.module.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const ShoppingCart = props => {
    return (
        <Link to="/cart" className={styles.ShopBasket}>
            <i className={`fas fa-shopping-cart ${styles.ShopBasket_i}`}></i>
            <span className={styles.ShopBasket__span}> { props.cartAmount } </span>
        </Link>
    );
}

const mapCartStateToProps = state => {
    return {
        cartAmount: state.cart.amount
    };
}

export default connect(mapCartStateToProps)(ShoppingCart);