import React from 'react';
import CreateUser from '../RenderProps/createUser';
import { useForm } from 'react-hook-form';
import btnStyles from '../Credentials/buttonStyles';
import Button from '@material-ui/core/Button';
import SignupInfo from '../Credentials/Signup/SignupInfo/SignupInfo';
import styles from './EditEmployeePanel.module.scss';
import EditData from './EditData/EditData';
import useUpdateUser from '../useHooks/useUpdateUser';
import withAuth from '../HOC/withAuth';
import { connect } from 'react-redux';
import mapjwtTokenStateToProps from '../../store/loginReducer/mapjwtTokenStateToProps';
import Password from '../Inputs/Password/Password';

const EditEmployeePanel = props => {
    
    const state = useUpdateUser(props.match.params.nickname, "employees");
    const { register, handleSubmit, errors } = useForm();
    
    return (
        <EditData 
        btn="Update employee"
        error="Unable to update informations about an employee... Please try again soon."
        success="Informations about employee have been updated successfully."
        mode="employees" state={state} nickname={props.match.params.nickname}>
            <CreateUser url="/updatePassword.php" mode="employees" render={(onSubmit, state2) => (
                <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                    <div className={styles.EditEmployeePanel__pass}>
                        <div className={`${styles.EditEmployeePanel__cont} ${styles.EditEmployeePanel__input}`}>
                            <Password name="password" errors={errors} register={register} />
                        </div>
                        <input ref={register()} type="text" readOnly value={state.data.employeeID} hidden name="id" />
                    </div>
                    <SignupInfo state={state2}>
                        Password of an employee has been changed successfully.
                    </SignupInfo>
                    <Button type="submit" style={btnStyles} variant="contained" color="primary">
                        Change employee's password
                    </Button>
                </form>
            )}>
                Unable to change password of an employee... Please try again soon.
            </CreateUser>
        </EditData>
    )
}

export default connect(mapjwtTokenStateToProps)(withAuth(EditEmployeePanel, "Administrator"));