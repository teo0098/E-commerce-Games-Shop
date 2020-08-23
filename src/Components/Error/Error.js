import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';

const Error = props => (
    <Alert style={{ margin: '5vh 5vw', textAlign: 'left' }} severity="error">
        <AlertTitle>Oh no!</AlertTitle>
        {props.children}
    </Alert>
);

export default Error;