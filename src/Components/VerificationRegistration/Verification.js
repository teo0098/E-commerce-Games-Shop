import React from 'react';
import SignupInfo from '../Credentials/Signup/SignupInfo/SignupInfo';
import useVerification from '../useHooks/useVerification';

const Verification = props => {

    const state = useVerification(props);

    return (
        <div style={{textAlign: 'center', padding: '0 2vw'}}>
            <SignupInfo state={state} >
                You have been verified and signed up successfully.
            </SignupInfo>
        </div>
    )
}

export default Verification;