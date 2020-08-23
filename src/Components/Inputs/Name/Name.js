import React from 'react';
import { Alert } from '@material-ui/lab';
import alertStyles from '../../Credentials/alertStyles';
import textInputStyles from '../../Credentials/textInputStyles';
import TextField from '@material-ui/core/TextField';

const Name = props => {
    return (
        <React.Fragment>
            <TextField defaultValue={props.defaultValue ? props.defaultValue : ''} autoComplete="nope" 
            inputRef={props.register({ required: true, pattern: { value: /^[A-Za-zęóąśłżźćńĘÓĄŚŁŻŹĆŃ\s]{2,20}$/ } })} 
            name="name" style={props.styleoff ? {...textInputStyles, margin: '0'} : textInputStyles} label="Name" variant="filled" />
            {props.errors.name && <Alert style={alertStyles} severity="error">Name must have from 2 up to 20 letters (spaces and polish letters included)</Alert>}
        </React.Fragment>
    )
}

export default Name;