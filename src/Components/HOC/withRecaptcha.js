import React, { useState } from 'react';

const withRecaptcha = Component => {
    return props => {

        const [recaptcha, setRecaptcha] = useState(null);

        const onChange = value => setRecaptcha(value);

        return (
            <Component {...props} recaptcha={recaptcha} onChange={onChange} />
        )
    }
}

export default withRecaptcha;