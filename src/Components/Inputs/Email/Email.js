import React from 'react';
import { Alert } from '@material-ui/lab';
import alertStyles from '../../Credentials/alertStyles';
import textInputStyles from '../../Credentials/textInputStyles';
import TextField from '@material-ui/core/TextField';
import validator from 'validator';

const Email = props => {
    return (
        <React.Fragment>
            <TextField defaultValue={props.defaultValue ? props.defaultValue : ''}
            inputRef={props.register({ required: true, validate: value => {
                return validator.isEmail(value); } })} 
            name="email" style={props.styleoff ? {...textInputStyles, margin: '0'} : textInputStyles} label="Email" variant="filled" />
            {props.errors.email && <Alert style={alertStyles} severity="error">Invalid email</Alert>}
        </React.Fragment>
    )
}

export default Email;