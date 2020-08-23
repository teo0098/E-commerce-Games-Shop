import React from 'react';
import { useForm } from 'react-hook-form';
import btnStyles from '../Credentials/buttonStyles';
import Button from '@material-ui/core/Button';
import styles from './AddEmployeePanel.module.scss';
import CreateUser from '../RenderProps/createUser';
import SignupPanel from '../Credentials/Signup/SignupPanel/SignupPanel';
import SignupInfo from '../Credentials/Signup/SignupInfo/SignupInfo';
import withAuth from '../HOC/withAuth';
import { connect } from 'react-redux';
import mapjwtTokenStateToProps from '../../store/loginReducer/mapjwtTokenStateToProps';

const AddEmployeePanel = () => {

    const { register, handleSubmit, errors } = useForm();

    return (
        <div className={styles.AddEmployeePanel}>
            <CreateUser url="/signup.php" mode="employees" render={(onSubmit, state) => (
                <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                    <div className={styles.AddEmployeePanel__grid}>
                        <SignupPanel register={register} errors={errors} state={state} />
                    </div>
                    <SignupInfo state={state}>
                        You have signed up a new employee successfully.
                    </SignupInfo>
                    <Button type="submit" style={btnStyles} variant="contained" color="primary">
                        Add employee
                    </Button>
                </form>
            )}>
                Unable to sign new employee up... Please try again soon.
            </CreateUser>
        </div>
    )
}

export default connect(mapjwtTokenStateToProps)(withAuth(AddEmployeePanel, "Administrator"));