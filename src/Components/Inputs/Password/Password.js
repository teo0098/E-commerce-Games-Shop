import React from 'react';
import { Alert } from '@material-ui/lab';
import alertStyles from '../../Credentials/alertStyles';
import textInputStyles from '../../Credentials/textInputStyles';
import TextField from '@material-ui/core/TextField';

const Password = props => {
    return (
        <React.Fragment>
            <TextField inputRef={props.register({ required: true, pattern: { value: /^[A-Z0-9a-z!@#$_]{8,20}$/ } })} 
                    name={props.name} style={textInputStyles} label="Password" type="password" variant="filled" />
                {props.errors[props.name] && <Alert style={alertStyles} severity="error">Password must consist of 8 up to 30 characters like (@ ! $ # _ letters digits)</Alert>}
        </React.Fragment>
    )
}

export default Password;