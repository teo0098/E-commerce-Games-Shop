import React from 'react';
import styles from './OrderOptions.module.scss';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import mapOrderDispatchToProps from '../../../store/orderReducer/mapDispatchToProps';
import { connect } from 'react-redux';
import { Alert } from '@material-ui/lab';
import alertStyles from '../../Credentials/alertStyles';
import SignupInfo from '../../Credentials/Signup/SignupInfo/SignupInfo';
import Recaptcha from '../../Recaptcha/Recaptcha';
import withRecaptcha from '../../HOC/withRecaptcha';
import useOrderOptions from '../../useHooks/useOrderOptions';
import Name from '../../Inputs/Name/Name';
import Lastname from '../../Inputs/Lastname/Lastname';
import Phone from '../../Inputs/Phone/Phone';
import Email from '../../Inputs/Email/Email';

const inputStyles = { width: '100%' };
const payBtnStyles = { fontSize: '17px' };

const OrderOptions = props => {

    const { register, handleSubmit, errors, state, changeDelivery, changePayment, onSubmit, payment } = useOrderOptions(props);

    return (
        <div className={styles.OrderOptions}>
            <form className={styles.OrderOptions__form} onSubmit={handleSubmit(onSubmit)} noValidate>
                <section className={styles.OrderOptions__section}>
                    <span className={styles.OrderOptions__span}>1. Personal information</span>
                    <div className={styles.OrderOptions__inputs}>
                        <div>
                            <Name styleoff={true} errors={errors} register={register} />
                        </div>
                        <div>
                            <Lastname styleoff={true} errors={errors} register={register} />
                        </div>
                        <div>
                            <Phone styleoff={true} errors={errors} register={register} />
                        </div>
                        <div>
                            <Email styleoff={true} errors={errors} register={register} />
                        </div>
                    </div>
                </section>
                <section className={styles.OrderOptions__section}>
                    <span className={styles.OrderOptions__span}>2. Delivery address</span>
                    <div className={styles.OrderOptions__inputs}>
                        <div>
                            <TextField inputRef={register({ required: true, pattern: { value: /^[A-Za-zęóąśłżźćńĘÓĄŚŁŻŹĆŃ\s]{2,40}$/ } })}
                                style={inputStyles} name="location" label="Location" variant="filled" />
                            {errors.location && <Alert style={alertStyles}
                                        severity="error">Location must have from 2 up to 40 letters (spaces included)</Alert>} 
                        </div>
                        <div>
                            <TextField inputRef={register({ required: true, pattern: { value: /^[A-Za-zęóąśłżźćńĘÓĄŚŁŻŹĆŃ\s]{2,40}$/ } })} 
                                style={inputStyles} name="street" label="Street" variant="filled" />
                            {errors.street && <Alert style={alertStyles}
                                        severity="error">Street must have from 2 up to 40 letters (spaces included)</Alert>}
                        </div>
                        <div>
                            <TextField inputRef={register({ required: true, pattern: { value: /^([0-9]{2,10}|([0-9]{2,6}-[0-9]{2,6}))$/ } })}
                                style={inputStyles} name="pcode" label="Postal code" variant="filled" />
                            {errors.pcode && <Alert style={alertStyles} severity="error">Invalid postal code</Alert>}
                        </div>
                        <div>
                            <TextField inputRef={register({ required: true, pattern: { value: /^[a-zA-Z0-9]{1,5}(\/?[a-zA-Z0-9]{1,5})?$/ } })}
                                style={inputStyles} name="houseNumber" label="Apartment number" variant="filled" />
                            {errors.houseNumber && <Alert style={alertStyles}
                                        severity="error">Letters, digits or one "/" are allowed and
                                        there must be from 1 up to 10 characters (if "/" used then maximal number is "5characters/5characters",
                                        example: 123A/46C)</Alert>} 
                        </div>
                    </div>
                </section>
                <section className={styles.OrderOptions__section}>
                    <span className={styles.OrderOptions__span}>3. Delivery type</span>
                    <RadioGroup 
                    value={props.deliveryType} 
                    onChange={e => changeDelivery(e.target)} 
                    aria-label="delivery type" name="delivery" >
                        <div className={styles.OrderOptions__radio}>
                            <FormControlLabel style={inputStyles} value="Self reclaim" control={<Radio color="primary" />} label="Reclaim personally in the shop" />
                            0.00$
                        </div>
                        <div className={styles.OrderOptions__radio}>
                            <FormControlLabel style={inputStyles} value="Certified letter" control={<Radio color="primary" />} label="Certified letter" />
                            5.00$
                        </div>
                        <div className={styles.OrderOptions__radio}>
                            <FormControlLabel style={inputStyles} value="Courier" control={<Radio color="primary" />} label="Courier delivery" />
                            10.00$
                        </div>
                    </RadioGroup>
                </section>
                <section className={styles.OrderOptions__section}>
                    <span className={styles.OrderOptions__span}>4. Payment method</span>
                    <RadioGroup 
                    value={payment} 
                    onChange={e => changePayment(e.target)}
                    aria-label="payment method" name="payment" >
                        <FormControlLabel value="At reclaim" control={<Radio color="primary" />} label="I want to pay reclaiming product" />
                        <FormControlLabel value="In advance" control={<Radio color="primary" />} label="I want to pay now via card" />
                    </RadioGroup>
                </section>
                <Recaptcha onChange={props.onChange} />
                <div style={{textAlign: 'center'}}>
                    <SignupInfo state={state}>
                        Your order has been accepted successfully.
                    </SignupInfo>
                </div>
                <div className={`${styles.OrderOptions__section} ${styles.OrderOptions__pay}`}>
                    <Button type="submit" style={payBtnStyles} variant="contained" color="primary">
                        <i className={`fas fa-wallet ${styles.OrderOptions__icon}`}></i>
                        Pay
                    </Button>
                </div>
            </form>
        </div>
    )
}

const mapOrderStateToProps = state => {
    return {
        deliveryType: state.order.deliveryType,
        orderGames: state.order.games,
        totalPrice: state.order.totalPrice,
        name: state.login.user[0] !== undefined ? state.login.user[0].name : '',
        lastname: state.login.user[0] !== undefined ? state.login.user[0].lastname : '',
        phone: state.login.user[0] !== undefined ? state.login.user[0].phone : '',
        email: state.login.user[0] !== undefined ? state.login.user[0].email : ''
    };
}

export default connect(mapOrderStateToProps, mapOrderDispatchToProps)(withRecaptcha(OrderOptions));