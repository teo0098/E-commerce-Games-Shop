import React from 'react';
import styles from './SignupPanel.module.scss';
import Name from '../../../Inputs/Name/Name';
import Lastname from '../../../Inputs/Lastname/Lastname';
import Phone from '../../../Inputs/Phone/Phone';
import Nickname from '../../../Inputs/Nickname/Nickname';
import Email from '../../../Inputs/Email/Email';
import Password from '../../../Inputs/Password/Password';

const SignupPanel = props => {
    return (
        <React.Fragment>
            <div className={styles.SignupPanel__cont}>
                <Name errors={props.errors} register={props.register} />
            </div>
            <div className={styles.SignupPanel__cont}>
                <Lastname errors={props.errors} register={props.register} />
            </div>
            <div className={styles.SignupPanel__cont}>
                <Phone errors={props.errors} register={props.register} />
            </div>
            <div className={styles.SignupPanel__cont}>
                <Nickname errors={props.errors} register={props.register} />
            </div>
            <div className={styles.SignupPanel__cont}>
                <Email errors={props.errors} register={props.register} />
            </div>
            <div className={styles.SignupPanel__cont}>
                <Password name="password" errors={props.errors} register={props.register} />
            </div>
        </React.Fragment>
    )
}

export default SignupPanel;