import React from 'react'
import Credentials from '../Credentials';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import textInputStyles from '../textInputStyles';
import btnStyles from '../buttonStyles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { connect } from 'react-redux';
import mapLoginDispatchToProps from '../../../store/loginReducer/mapDispatchToProps';
import Spinner from '../../Spinner/Spinner';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Redirect } from 'react-router-dom';
import useSignIn from '../../useHooks/useSignIn';
import styles from './Signin.module.scss';

const radioStyles = { color: '#BDBDBD' };

const Signin = props => {

    const { register, handleSubmit, loginInput, onSubmit, configMode, mode } = useSignIn(props);

    return (
        props.user.length === 0 ?
        <Credentials>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.Signin__form} noValidate autoComplete="off">
                <TextField ref={loginInput} inputRef={register({ required: true })}
                    style={textInputStyles} name="login" label="Email or Nickname" variant="filled" />
                <TextField inputRef={register({ required: true })}
                    style={textInputStyles} name="password" label="Password" type="password" variant="filled" />
                <span className={styles.Signin__mode}>
                    Sign in as...
                </span>
                <RadioGroup style={radioStyles}
                value={mode}
                onChange={e => configMode(e.target)}
                aria-label="delivery type" name="mode">
                    <FormControlLabel value="Customer" control={<Radio style={radioStyles} color="primary" />} label="Casual customer" />
                    <FormControlLabel value="Employee" control={<Radio style={radioStyles} color="primary" />} label="Employee" />               
                    <FormControlLabel value="Administrator" control={<Radio style={radioStyles} color="primary" />} label="Administrator" />     
                </RadioGroup>

                {props.error ?
                   <Alert style={textInputStyles} severity="error">
                        <AlertTitle>Oh no!</AlertTitle>
                        {props.errorMSG}
                    </Alert>
                    :
                    null
                }

                {props.userLogging ?
                    <Spinner color="#BDBDBD" />
                    :
                    null
                }

                <Button type="submit" style={btnStyles} variant="contained" color="primary">
                    Sign in
                </Button>
            </form>
        </Credentials>
        :
        <Redirect to={`/my-profile/${props.user[1].toLowerCase()}`} />
    )
}

const mapLoginStateToProps = state => {
    return {
        userLogging: state.login.logging,
        user: state.login.user,
        error: state.login.error,
        errorMSG: state.login.errorMSG
    };
}

export default connect(mapLoginStateToProps, mapLoginDispatchToProps)(Signin);