import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Error from '../Error/Error';
import Spinner from '../Spinner/Spinner';
import Alert from '@material-ui/lab/Alert';
import useGetOrders from '../useHooks/useGetOrders';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import withAuth from '../HOC/withAuth';
import mapjwtTokenStateToProps from '../../store/loginReducer/mapjwtTokenStateToProps';
import styles from './OrdersHistory.module.scss';

const useStyles = makeStyles({
    table: {
      minWidth: 2500,
    },
});

const OrdersHistory = props => {

    const { state, splitOrderedGames } = useGetOrders(`/getOrders.php?mode=history&customer=${props.user}`);
    const classes = useStyles();

    return (
        <section className={styles.OrdersHistory}>
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
            {state.data.length !== 0 ?
                <TableContainer component={Paper}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="left">Ordered product</TableCell>
                            <TableCell align="left">Delivery type</TableCell>
                            <TableCell align="left">Customer's email</TableCell>
                            <TableCell align="left">Customer's phone</TableCell>
                            <TableCell align="left">Customer's name</TableCell>
                            <TableCell align="left">Customer's address</TableCell>
                            <TableCell align="left">Total price</TableCell>
                            <TableCell align="left">Payment method</TableCell>
                            <TableCell align="left">Status</TableCell>
                            <TableCell align="left">Ordered date</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {state.data.map((order, index) => (
                            <TableRow key={order.orderID}>
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell style={{ lineHeight: '2' }} align="left">
                                    {splitOrderedGames(order.product).map(game => (<span className={styles.OrdersHistory__gamesName} key={game}> {game} </span>))}
                                </TableCell>
                                <TableCell align="left">{order.delivery}</TableCell>
                                <TableCell align="left">{order.customerEmail}</TableCell>
                                <TableCell align="left">{order.customerPhone}</TableCell>
                                <TableCell style={{ textTransform: 'capitalize' }} align="left">{order.customerName}</TableCell>
                                <TableCell align="left">{order.customerAddress}</TableCell>
                                <TableCell align="left">{(+order.totalPrice).toFixed(2)}$</TableCell>
                                <TableCell align="left">{order.payment}</TableCell>
                                <TableCell align="left">{order.status}</TableCell>
                                <TableCell align="left">{order.orderDate}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                :
                !state.error && !state.loading ?
                <Alert style={{ textAlign: 'left' }} severity="info">No orders made at the moment.</Alert>
                :
                null
            }
        </section>
    )
}

const mapLoginStateToProps = state => {
    return {
        user: state.login.user[0].email
    }
}

export default connect(mapjwtTokenStateToProps)(withAuth(connect(mapLoginStateToProps)(OrdersHistory), "Customer"));