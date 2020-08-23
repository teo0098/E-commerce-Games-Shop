import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import styles from '../OrdersHistory/OrdersHistory.module.scss';
import Error from '../Error/Error';
import Spinner from '../Spinner/Spinner';
import Alert from '@material-ui/lab/Alert';
import useGetOrders from '../useHooks/useGetOrders';
import { makeStyles } from '@material-ui/core/styles';
import withAuth from '../HOC/withAuth';
import { connect } from 'react-redux';
import mapjwtTokenStateToProps from '../../store/loginReducer/mapjwtTokenStateToProps';

const useStyles = makeStyles({
    table: {
      minWidth: 3000,
    },
});

const Orders = () => {

    const { state, splitOrderedGames, statusState, setOrderStatus } = useGetOrders('/getOrders.php');
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
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {state.data.map(order => (
                            <TableRow key={order.orderID}>
                                <TableCell component="th" scope="row">
                                    {order.orderID}
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
                                <TableCell align="right">
                                    <div className="Orders__btns">
                                        {statusState.loading && statusState.dataID === order.orderID ?
                                            <Spinner />
                                            :
                                            <React.Fragment>
                                                <Button onClick={() => setOrderStatus('PENDING', order.orderID)} type="submit" variant="contained" color="primary">Start</Button>
                                                <Button onClick={() => setOrderStatus('FINISHED', order.orderID)} style={{ margin: '0 10px' }} type="submit" variant="contained" color="primary">Finish</Button>
                                                <Button onClick={() => setOrderStatus('CANCELED', order.orderID)} type="submit" variant="contained" color="primary">Cancel</Button>
                                            </React.Fragment>
                                        }
                                    </div>
                                </TableCell>
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

export default connect(mapjwtTokenStateToProps)(withAuth(Orders, "Employee"));