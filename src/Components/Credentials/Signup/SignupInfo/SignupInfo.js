import React from 'react'
import { Alert, AlertTitle } from '@material-ui/lab';
import Spinner from '../../../Spinner/Spinner';
import textInputStyles from '../../textInputStyles';

const SignupInfo = props => {
    return (
        <React.Fragment>
            {props.state.error ?
                <Alert style={textInputStyles} severity="error">
                    <AlertTitle>Oh no!</AlertTitle>
                    {props.state.errorMSG}
                </Alert>
                :
                null
            }

            {props.state.loading ?
                <Spinner color={props.color} />
                :
                null
            }

            {props.state.success ?
                <Alert style={textInputStyles} severity="success"> {props.children} </Alert>
                :
                null
            }
        </React.Fragment>
    )
}

export default SignupInfo;