import React from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import styles from './Recaptcha.module.scss';

const Recaptcha = props => (
    <div className={styles.Recaptcha}>
        <ReCAPTCHA
            size="compact"
            sitekey="6LebXfsUAAAAABRsSsKMyjRbwp9m2fNYTkNtKmmV"
            onChange={props.onChange}
        />
    </div>
)

export default Recaptcha;