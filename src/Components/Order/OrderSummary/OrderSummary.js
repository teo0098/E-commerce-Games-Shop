import React from 'react';
import styles from './OrderSummary.module.scss';
import { connect } from 'react-redux';

const OrderSummary = props => (
    <div className={styles.OrderSummary}>
        <div className={styles.OrderSummary__overview}>
            <div className={styles.OrderSummary__detail}>
                <span className={styles.OrderSummary__value}>Delivery price:</span>
                <span className={styles.OrderSummary__value}>{(+props.deliveryPrice).toFixed(2)}$</span>
            </div>
            <div className={styles.OrderSummary__detail}>
                <span className={styles.OrderSummary__value}>Total price:</span>
                <span className={styles.OrderSummary__value}>{(+props.totalPrice).toFixed(2)}$</span>
            </div>
        </div>
        {props.orderGames.map(order => {
            return (
                <section key={order.gameName} className={styles.OrderSummary__container}>
                    <div className={styles.OrderSummary__image} style={{ backgroundImage: `url('${order.imageURL}')` }}></div>
                    <div className={styles.OrderSummary__detail}>
                        <span>Product:</span>
                        <h3 className={styles.OrderSummary__gameName}>{order.gameName}</h3>
                    </div>
                    <div className={styles.OrderSummary__detail}>
                        <span>Product price:</span>
                        <span className={styles.OrderSummary__value}>{(+order.gamePrice).toFixed(2)}$</span>
                    </div>
                    <div className={styles.OrderSummary__detail}>
                        <span>Amount:</span>
                        <span className={styles.OrderSummary__value}>{order.amount}</span>
                    </div>
                    <div className={styles.OrderSummary__detail}>
                        <span>Ordered products price:</span>
                        <span className={styles.OrderSummary__value}>{(order.gamePrice * order.amount).toFixed(2)}$</span>
                    </div>
                </section>
            );
        })}
    </div>
);

const mapOrderStateToProps = state => {
    return {
        orderGames: state.order.games,
        deliveryPrice: state.order.deliveryPrice,
        totalPrice: state.order.totalPrice
    };
}

export default connect(mapOrderStateToProps)(OrderSummary);