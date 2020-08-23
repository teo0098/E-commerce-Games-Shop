import React from 'react';
import btnStyles from '../Credentials/buttonStyles';
import Button from '@material-ui/core/Button';
import SignupInfo from '../Credentials/Signup/SignupInfo/SignupInfo';
import styles from './DeleteAccountPanel.module.scss';
import { connect } from 'react-redux';
import mapLoginDispatchToProps from '../../store/loginReducer/mapDispatchToProps';
import withAuth from '../HOC/withAuth';
import mapjwtTokenStateToProps from '../../store/loginReducer/mapjwtTokenStateToProps';
import useDeleteAccount from '../useHooks/useDeleteAccount';
import Password from '../Inputs/Password/Password';

const DeleteAccountPanel = props => {

    const { register, handleSubmit, errors, state, onSubmit } = useDeleteAccount(props);

    return (
        <div className={styles.DeleteAccountPanel}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className={styles.DeleteAccountPanel__div}>
                    <div className={styles.DeleteAccountPanel__pass}>
                        <Password name="password" errors={errors} register={register} />
                    </div>
                    <Button type="submit" style={btnStyles} variant="contained" color="secondary">
                        Delete my account
                    </Button>
                </div>
                <SignupInfo state={state}>
                    Your account has been deleted successfully... You will be logged out in a moment.
                </SignupInfo>
            </form>
        </div>
    )
}

const mapLoginStateToProps = state => {
    return {
        nickname: state.login.user[0] === undefined ? null : state.login.user[0].nickname
    }
}

export default connect(mapjwtTokenStateToProps)(withAuth(connect(mapLoginStateToProps, mapLoginDispatchToProps)(DeleteAccountPanel), "Customer"));