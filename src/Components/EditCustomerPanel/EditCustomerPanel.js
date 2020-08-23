import React from 'react';
import EditData from '../EditEmployeePanel/EditData/EditData';
import useUpdateUser from '../useHooks/useUpdateUser';
import CreateUser from '../RenderProps/createUser';
import { useForm } from 'react-hook-form';
import btnStyles from '../Credentials/buttonStyles';
import Button from '@material-ui/core/Button';
import SignupInfo from '../Credentials/Signup/SignupInfo/SignupInfo';
import { Alert } from '@material-ui/lab';
import alertStyles from '../Credentials/alertStyles';
import textInputStyles from '../Credentials/textInputStyles';
import TextField from '@material-ui/core/TextField';
import styles from './EditCustomerPanel.module.scss';
import { connect } from 'react-redux';
import withAuth from '../HOC/withAuth';
import mapjwtTokenStateToProps from '../../store/loginReducer/mapjwtTokenStateToProps';
import Password from '../Inputs/Password/Password';

const EditCustomerPanel = props => {

    const state = useUpdateUser(props.userNickname, "customers");
    const { register, handleSubmit, errors, watch } = useForm();

    return (
        <EditData 
        userUpdate={true}
        btn="Update my account"
        error="Unable to update informations... Please try again soon."
        success="Informations have been updated successfully."
        mode="customers" state={state} nickname={props.userNickname}>
            <CreateUser url="/updatePassword.php" mode="customers" render={(onSubmit, state2) => (
                <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                    <div className={styles.EditCustomerPanel}>
                        <div className={styles.EditCustomerPanel__cont}>
                            <Password name="oldpassword" errors={errors} register={register} />
                        </div>
                        <div className={styles.EditCustomerPanel__cont}>
                            <Password name="newpassword" errors={errors} register={register} />
                        </div>
                        <div className={styles.EditCustomerPanel__cont}>
                            <TextField inputRef={register({ required: true, validate: value => {
                                return value === watch('newpassword');
                            } })} 
                                name="rpassword" style={textInputStyles} label="Repeat new password" type="password" variant="filled" />

                            {errors.rpassword && <Alert style={alertStyles} severity="error">Passwords must be the same</Alert>}
                        </div>
                        <input ref={register()} type="text" readOnly value={state.data.customerID} hidden name="id" />
                    </div>
                    <SignupInfo state={state2}>
                        Password has been changed successfully.
                    </SignupInfo>
                    <Button type="submit" style={btnStyles} variant="contained" color="primary">
                        Change my password
                    </Button>
                </form>
            )}>
                Unable to change password... Please try again soon.
            </CreateUser>
        </EditData>
    )
}

const mapLoginStateToProps = state => {
    return {
        userNickname: state.login.user[0].nickname
    }
}

export default connect(mapjwtTokenStateToProps)(withAuth(connect(mapLoginStateToProps)(EditCustomerPanel), "Customer"));