import React from 'react';
import styles from './Help.module.scss';
import Button from '@material-ui/core/Button';
import btnStyles from '../Credentials/buttonStyles';
import { Alert } from '@material-ui/lab';
import alertStyles from '../Credentials/alertStyles';
import Recaptcha from '../Recaptcha/Recaptcha';
import withRecaptcha from '../HOC/withRecaptcha';
import SignupInfo from '../Credentials/Signup/SignupInfo/SignupInfo';
import { connect } from 'react-redux';
import useHelp from '../useHooks/useHelp';
import Name from '../Inputs/Name/Name';
import Email from '../Inputs/Email/Email';

const Help = props => {

    const { state, register, handleSubmit, errors, onSubmit } = useHelp(props);

    return (
        <section className={styles.Help}>
            <header className={styles.Help__header}>
                <i className={`fas fa-envelope ${styles.Help__icon}`}></i>
                <h2 className={styles.Help__h2}>Contact us</h2>
            </header>
            <form className={styles.Help__form} onSubmit={handleSubmit(onSubmit)}>
                <Name errors={errors} register={register} />
                <Email errors={errors} register={register} />
                <div className={styles.Help__div}>
                    <label htmlFor="message" className={styles.Help__span}>Message</label>
                    <textarea id="message" name="message" ref={register({ required: true, validate: value => {
                            return value.match(/\b([A-Za-zęóąśłżźćńĘÓĄŚŁŻŹĆŃ]+)\b/g).length >= 5; } })} 
                        className={styles.Help__message}></textarea>

                    {errors.message && <Alert style={alertStyles} severity="error">Message should have at least 5 words</Alert>}
                </div>
                <Recaptcha onChange={props.onChange} />
                <SignupInfo state={state} color="#BDBDBD"> 
                    Your message has been sent successfully.
                </SignupInfo>
                <div style={{ textAlign: 'center' }}>
                    <Button type="submit" style={btnStyles} variant="contained" color="primary">
                        <i style={{ marginRight: '0.5vw' }} className="fas fa-paper-plane"></i>
                        Send
                    </Button>
                </div>
            </form>
        </section>
    );
}

const mapLoginStateToProps = state => {
    return {
        name: state.login.user[0] === undefined ? '' : state.login.user[0].name,
        email: state.login.user[0] === undefined ? '' : state.login.user[0].email
    };
}

export default connect(mapLoginStateToProps)(withRecaptcha(Help));