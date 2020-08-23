import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Error from '../Error/Error';
import Spinner from '../Spinner/Spinner';
import Alert from '@material-ui/lab/Alert';
import EditOrDeleteData from '../RenderProps/editOrDeleteData';
import withAuth from '../HOC/withAuth';
import { connect } from 'react-redux';
import mapjwtTokenStateToProps from '../../store/loginReducer/mapjwtTokenStateToProps';
import styles from '../OrdersHistory/OrdersHistory.module.scss';

const Games = () => {
    return (
        <EditOrDeleteData mode="games" url='/getGames.php' 
        render={(classes, state, history, deleteState, deleteGame) => (
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
                                <TableCell align="left">Game's name</TableCell>
                                <TableCell align="left">Game's price</TableCell>
                                <TableCell align="left">Game's released date</TableCell>
                                <TableCell align="left">Game's items amount</TableCell>
                                <TableCell align="right">Action</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {state.data.map(game => (
                                <TableRow key={game.gameID}>
                                    <TableCell component="th" scope="row">
                                        {game.gameID}
                                    </TableCell>
                                    <TableCell align="left">{game.gameName}</TableCell>
                                    <TableCell align="left">{game.gamePrice}$</TableCell>
                                    <TableCell align="left">{game.gameRel}</TableCell>
                                    <TableCell align="left">{game.itemsAmount}</TableCell>
                                    <TableCell align="right">
                                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <Button onClick={() => history.push(`/games/edit/${game.gameName}`)} type="submit" variant="contained" style={{ margin: '0 10px' }} color="primary">Edit</Button>
                                            {deleteState.loading && deleteState.dataID === game.gameID ?
                                                <Spinner />
                                                :
                                                <Button onClick={() => deleteGame(game.gameID)} type="submit" variant="contained" color="secondary">Delete</Button>
                                            }
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    :
                    state.error === false && state.loading === false ?
                    <Alert style={{ textAlign: 'left' }} severity="info">No games in the shop at the moment.</Alert>
                    :
                    null
                }
            </section>
        )}>
            Unable to obtain games... Please try again soon.
        </EditOrDeleteData>
    )
}

export default connect(mapjwtTokenStateToProps)(withAuth(Games, "Employee"));