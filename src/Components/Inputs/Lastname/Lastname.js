import React from 'react';
import { Alert } from '@material-ui/lab';
import alertStyles from '../../Credentials/alertStyles';
import textInputStyles from '../../Credentials/textInputStyles';
import TextField from '@material-ui/core/TextField';

const Lastname = props => {
    return (
        <React.Fragment>
            <TextField defaultValue={props.defaultValue ? props.defaultValue : ''}
            inputRef={props.register({ required: true, pattern: { value: /^[A-Za-zęóąśłżźćńĘÓĄŚŁŻŹĆŃ\s]{2,30}$/ } })} 
            name="lastname" style={props.styleoff ? {...textInputStyles, margin: '0'} : textInputStyles} label="Last name" variant="filled" />
            {props.errors.lastname && <Alert style={alertStyles} severity="error">Last name must have from 2 up to 30 letters (spaces and polish letters included)</Alert>}
        </React.Fragment>
    )
}

export default Lastname;