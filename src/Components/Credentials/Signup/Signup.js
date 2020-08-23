import React from 'react';
import Credentials from '../Credentials';
import Button from '@material-ui/core/Button';
import btnStyles from '../buttonStyles';
import { useForm } from 'react-hook-form';
import CreateUser from '../../RenderProps/createUser';
import SignupPanel from './SignupPanel/SignupPanel';
import alertStyles from '../alertStyles';
import textInputStyles from '../textInputStyles';
import TextField from '@material-ui/core/TextField';
import { Alert } from '@material-ui/lab';
import SignupInfo from './SignupInfo/SignupInfo';
import Recaptcha from '../../Recaptcha/Recaptcha';
import withRecaptcha from '../../HOC/withRecaptcha';
import styles from './Signup.module.scss';

const Signup = props => {

    const { register, handleSubmit, errors, watch } = useForm();

    return (
        <Credentials>
            <CreateUser recaptcha={props.recaptcha} url="/signup.php" mode="customers" render={(onSubmit, state) => (
                    <form onSubmit={handleSubmit(onSubmit)} className={styles.Signup__form} noValidate autoComplete="off">
                        <SignupPanel color="#BDBDBD" register={register} errors={errors} state={state} />
                        <div className={styles.Signup__cont}>
                            <TextField inputRef={register({ required: true, validate: value => {
                                    return value === watch('password'); } })} 
                                name="rpassword" style={textInputStyles} label="Repeat password" type="password" variant="filled" />
    
                            {errors.rpassword && !errors.password && <Alert style={alertStyles} severity="error">Passwords must be the same</Alert>}
                        </div>  
                        <Recaptcha onChange={props.onChange} />
                        <SignupInfo state={state} color="#BDBDBD"> 
                            We have sent an verification email to your mailbox in order to sign you up.
                        </SignupInfo>
                        <Button type="submit" style={btnStyles} variant="contained" color="primary">
                            Sign up
                        </Button>
                    </form>
                )}>
                    Unable to sign you up... Please try again soon.
                </CreateUser>
        </Credentials>
    )
}

export default withRecaptcha(Signup);