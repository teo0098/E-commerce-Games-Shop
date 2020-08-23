import React from 'react';
import { Alert } from '@material-ui/lab';
import alertStyles from '../../Credentials/alertStyles';
import textInputStyles from '../../Credentials/textInputStyles';
import TextField from '@material-ui/core/TextField';

const Phone = props => {
    return (
        <React.Fragment>
            <TextField defaultValue={props.defaultValue ? props.defaultValue : ''}
            inputRef={props.register({ required: true, pattern: { value: /^[\d]{4,13}$/ } })} 
            name="phone" style={props.styleoff ? {...textInputStyles, margin: '0'} : textInputStyles} label="Phone number" variant="filled" />
            {props.errors.phone && <Alert style={alertStyles} severity="error">Phone number must have from 4 up to 13 digits (no prefixes)</Alert>}
        </React.Fragment>
    )
}

export default Phone;