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

const Employees = () => {
    return (
        <EditOrDeleteData mode="employees" url='/getUsers.php' 
        render={(classes, state, history, deleteState, deleteEmployee) => (
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
                                <TableCell align="left">Employee's name</TableCell>
                                <TableCell align="left">Employee's last name</TableCell>
                                <TableCell align="left">Employee's nickname</TableCell>
                                <TableCell align="left">Employee's phone number</TableCell>
                                <TableCell align="left">Employee's email</TableCell>
                                <TableCell align="right">Action</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {state.data.map(employee => (
                                <TableRow key={employee.employeeID}>
                                    <TableCell component="th" scope="row">
                                        {employee.employeeID}
                                    </TableCell>
                                    <TableCell style={{textTransform: 'capitalize'}} align="left">{employee.name}</TableCell>
                                    <TableCell style={{textTransform: 'capitalize'}} align="left">{employee.lastname}</TableCell>
                                    <TableCell align="left">{employee.nickname}</TableCell>
                                    <TableCell align="left">{employee.phone}</TableCell>
                                    <TableCell align="left">{employee.email}</TableCell>
                                    <TableCell align="right">
                                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <Button onClick={() => history.push(`/employees/edit/${employee.nickname}`)} type="submit" variant="contained" style={{ margin: '0 10px' }} color="primary">Edit</Button>
                                            {deleteState.loading && deleteState.dataID === employee.employeeID ?
                                                <Spinner />
                                                :
                                                <Button onClick={() => deleteEmployee(employee.employeeID)} type="submit" variant="contained" color="secondary">Delete</Button>
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
                    <Alert style={{ textAlign: 'left' }} severity="info">No employees hired at the moment.</Alert>
                    :
                    null
                }
            </section>
        )}>
            Unable to obtain your employees... Please try again soon.
        </EditOrDeleteData>
    )
}

export default connect(mapjwtTokenStateToProps)(withAuth(Employees, "Administrator"));