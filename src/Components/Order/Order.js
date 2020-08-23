import React, { useEffect } from 'react';
import styles from './Order.module.scss';
import mapOrderDispatchToProps from '../../store/orderReducer/mapDispatchToProps';
import { connect } from 'react-redux';
import OrderSummary from './OrderSummary/OrderSummary';
import OrderOptions from './OrderOptions/OrderOptions';
import { Redirect } from 'react-router-dom';

const Order = props => {

    useEffect(() => {
        return () => props.cancelOrder();
    }, [props]);

    return (
        props.ordered ?
            <div className={styles.Order}>
                <OrderOptions />
                <OrderSummary />
            </div>
        :
        <Redirect to='/' />
    )
}

const mapOrderStateToProps = state => {
    return {
        ordered: state.order.ordered
    };
}

export default connect(mapOrderStateToProps, mapOrderDispatchToProps)(Order);