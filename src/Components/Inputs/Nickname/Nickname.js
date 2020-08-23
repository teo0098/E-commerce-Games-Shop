import React from 'react';
import { Alert } from '@material-ui/lab';
import alertStyles from '../../Credentials/alertStyles';
import textInputStyles from '../../Credentials/textInputStyles';
import TextField from '@material-ui/core/TextField';

const Nickname = props => {
    return (
        <React.Fragment>
            <TextField defaultValue={props.defaultValue ? props.defaultValue : ''}
            inputRef={props.register({ required: true, pattern: { value: /^[A-Z0-9a-z]{5,15}$/ } })} 
            name="nickname" style={textInputStyles} label="Nickname" variant="filled" />
            {props.errors.nickname && <Alert style={alertStyles} severity="error">Nickname must have from 5 up to 15 alphanumeric characters</Alert>}
        </React.Fragment>
    )
}

export default Nickname;